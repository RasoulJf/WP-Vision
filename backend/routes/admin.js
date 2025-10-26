const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

// All admin routes are protected
router.use(protect);
router.use(admin);

// @route   GET /api/admin/products
// @desc    Get all products (admin view - includes inactive)
// @access  Private/Admin
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate('createdBy', 'username email');
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت محصولات',
      error: error.message
    });
  }
});

// @route   POST /api/admin/products
// @desc    Create new product
// @access  Private/Admin
router.post('/products',
  [
    body('title').trim().notEmpty().withMessage('عنوان الزامی است'),
    body('slug').trim().notEmpty().withMessage('اسلاگ الزامی است'),
    body('description').notEmpty().withMessage('توضیحات الزامی است'),
    body('price').isNumeric().withMessage('قیمت باید عدد باشد'),
    body('thumbnail').notEmpty().withMessage('تصویر شاخص الزامی است'),
    body('downloadLink').notEmpty().withMessage('لینک دانلود الزامی است'),
    body('category').notEmpty().withMessage('دسته‌بندی الزامی است')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Check if slug already exists
      const existingProduct = await Product.findOne({ slug: req.body.slug });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'محصول با این اسلاگ وجود دارد'
        });
      }

      const product = await Product.create({
        ...req.body,
        createdBy: req.user._id
      });

      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'خطا در ایجاد محصول',
        error: error.message
      });
    }
  }
);

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'محصول یافت نشد'
      });
    }

    // Check if slug is being changed and if it already exists
    if (req.body.slug && req.body.slug !== product.slug) {
      const existingProduct = await Product.findOne({ slug: req.body.slug });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'محصول با این اسلاگ وجود دارد'
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در بروزرسانی محصول',
      error: error.message
    });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'محصول یافت نشد'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'محصول با موفقیت حذف شد'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در حذف محصول',
      error: error.message
    });
  }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard stats
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const totalDownloads = await Product.aggregate([
      { $group: { _id: null, total: { $sum: '$downloads' } } }
    ]);
    
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title thumbnail price createdAt');

    res.json({
      success: true,
      data: {
        totalProducts,
        activeProducts,
        totalDownloads: totalDownloads[0]?.total || 0,
        recentProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت آمار',
      error: error.message
    });
  }
});

module.exports = router;