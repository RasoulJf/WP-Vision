const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const sampleProducts = [
  {
    title: 'قالب مدرن کسب و کار',
    slug: 'modern-business-theme',
    description: 'قالب حرفه‌ای و مدرن برای کسب و کارها با امکانات فوق‌العاده. این قالب با تکنولوژی‌های روز طراحی شده و برای انواع کسب و کارها مناسب است.\n\nشامل صفحات:\n- صفحه اصلی با طراحی جذاب\n- درباره ما\n- خدمات\n- نمونه کارها\n- بلاگ\n- تماس با ما\n\nتکنولوژی‌ها:\n- Elementor Pro\n- WooCommerce Ready\n- WPML Ready\n- RTL Support',
    shortDescription: 'قالب مدرن و حرفه‌ای برای کسب و کارها با طراحی زیبا',
    price: 450000,
    salePrice: 299000,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    downloadLink: 'https://example.com/downloads/modern-business.zip',
    version: '2.1.0',
    demoUrl: 'https://demo.wpvision.com/modern-business',
    features: [
      'طراحی ریسپانسیو',
      'سرعت بارگذاری بالا',
      'سئو بهینه',
      'سازگار با آخرین نسخه وردپرس',
      'پشتیبانی از زبان فارسی',
      'داکیومنتیشن کامل'
    ],
    tags: ['کسب و کار', 'مدرن', 'حرفه‌ای', 'Elementor'],
    category: 'business',
    rating: 4.8,
    downloads: 234
  },
  {
    title: 'قالب نمونه کار عکاسی',
    slug: 'photography-portfolio',
    description: 'قالب زیبا و حرفه‌ای برای عکاسان و هنرمندان. با این قالب می‌توانید نمونه کارهای خود را به بهترین شکل به نمایش بگذارید.\n\nامکانات:\n- گالری تصاویر با کیفیت بالا\n- لایت‌باکس حرفه‌ای\n- فیلتر دسته‌بندی\n- صفحه درباره من\n- فرم تماس\n- بلاگ شخصی',
    shortDescription: 'قالب زیبا برای نمایش نمونه کارهای عکاسی و هنری',
    price: 350000,
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    downloadLink: 'https://example.com/downloads/photography.zip',
    version: '1.5.2',
    demoUrl: 'https://demo.wpvision.com/photography',
    features: [
      'گالری پیشرفته',
      'انیمیشن‌های نرم',
      'طراحی مینیمال',
      'بهینه سازی تصاویر',
      'Loading Lazy'
    ],
    tags: ['عکاسی', 'نمونه کار', 'گالری', 'هنری'],
    category: 'portfolio',
    rating: 4.9,
    downloads: 189
  },
  {
    title: 'قالب فروشگاهی فشن',
    slug: 'fashion-shop-theme',
    description: 'قالب فروشگاهی مدرن برای فروش محصولات مد و پوشاک. با ویژگی‌های ویژه برای فروشگاه‌های آنلاین.\n\nویژگی‌ها:\n- WooCommerce کامل\n- فیلترهای پیشرفته\n- مقایسه محصولات\n- لیست علاقه‌مندی‌ها\n- Quick View\n- مگامنو\n- چند ارز و زبان',
    shortDescription: 'قالب فروشگاهی حرفه‌ای برای محصولات مد و پوشاک',
    price: 550000,
    salePrice: 399000,
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    downloadLink: 'https://example.com/downloads/fashion-shop.zip',
    version: '3.2.0',
    demoUrl: 'https://demo.wpvision.com/fashion-shop',
    features: [
      'WooCommerce کامل',
      'صفحه محصول پیشرفته',
      'فیلترهای AJAX',
      'چند ارز',
      'درگاه پرداخت ایرانی'
    ],
    tags: ['فروشگاه', 'مد', 'پوشاک', 'WooCommerce'],
    category: 'ecommerce',
    rating: 4.7,
    downloads: 312
  },
  {
    title: 'قالب وبلاگ شخصی',
    slug: 'personal-blog-theme',
    description: 'قالب ساده و زیبا برای وبلاگ‌های شخصی. با تمرکز بر خوانایی و تجربه کاربری عالی.\n\nامکانات:\n- طراحی تمیز و خوانا\n- سیستم کامنت پیشرفته\n- اشتراک‌گذاری اجتماعی\n- خواندن سریع مطالب\n- نوار کناری دلخواه\n- ویجت‌های متنوع',
    shortDescription: 'قالب ساده و خوانا برای وبلاگ‌های شخصی',
    price: 250000,
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    downloadLink: 'https://example.com/downloads/personal-blog.zip',
    version: '1.8.0',
    demoUrl: 'https://demo.wpvision.com/personal-blog',
    features: [
      'طراحی مینیمال',
      'خوانایی عالی',
      'بهینه سازی سئو',
      'سرعت بالا',
      'موبایل فرندلی'
    ],
    tags: ['وبلاگ', 'شخصی', 'مطالب', 'نوشته'],
    category: 'blog',
    rating: 4.6,
    downloads: 156
  }
];

const createSampleProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME || 'wp_vision'
    });
    
    console.log('Connected to MongoDB');
    
    // Get admin user
    const admin = await User.findOne({ role: 'admin' });
    
    if (!admin) {
      console.error('❌ Admin user not found. Please create admin first.');
      process.exit(1);
    }
    
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts > 0) {
      console.log('Products already exist. Skipping...');
      process.exit(0);
    }
    
    // Create sample products
    for (const productData of sampleProducts) {
      await Product.create({
        ...productData,
        createdBy: admin._id
      });
      console.log(`✅ Created: ${productData.title}`);
    }
    
    console.log(`\n✅ ${sampleProducts.length} sample products created successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createSampleProducts();
