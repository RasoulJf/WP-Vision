import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { 
  Plus, Edit, Trash2, LogOut, Package, BarChart3, 
  Save, X, Upload, Link as LinkIcon 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    salePrice: '',
    thumbnail: '',
    downloadLink: '',
    version: '1.0.0',
    demoUrl: '',
    category: 'business',
    features: '',
    tags: '',
    isActive: true
  });

  useEffect(() => {
    checkAuth();
    fetchProducts();
    fetchStats();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/admin/products`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
      toast.error('خطا در دریافت محصولات');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/admin/stats`);
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('خروج موفق');
    navigate('/admin/login');
  };

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        salePrice: product.salePrice || '',
        thumbnail: product.thumbnail,
        downloadLink: product.downloadLink,
        version: product.version,
        demoUrl: product.demoUrl || '',
        category: product.category,
        features: product.features?.join('\n') || '',
        tags: product.tags?.join(', ') || '',
        isActive: product.isActive
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        shortDescription: '',
        price: '',
        salePrice: '',
        thumbnail: '',
        downloadLink: '',
        version: '1.0.0',
        demoUrl: '',
        category: 'business',
        features: '',
        tags: '',
        isActive: true
      });
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
      features: formData.features.split('\n').filter(f => f.trim()),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      if (editingProduct) {
        await axios.put(`${API}/admin/products/${editingProduct._id}`, productData);
        toast.success('محصول با موفقیت بروزرسانی شد');
      } else {
        await axios.post(`${API}/admin/products`, productData);
        toast.success('محصول با موفقیت اضافه شد');
      }
      handleCloseDialog();
      fetchProducts();
      fetchStats();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'خطا در ذخیره محصول');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟')) {
      return;
    }

    try {
      await axios.delete(`${API}/admin/products/${id}`);
      toast.success('محصول با موفقیت حذف شد');
      fetchProducts();
      fetchStats();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('خطا در حذف محصول');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="admin-dashboard">
      {/* Header */}
      <div className="glass-effect border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">پنل مدیریت WP Vision</h1>
            <Button
              data-testid="logout-button"
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 hover:bg-red-50 border-red-200 text-red-600"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">کل محصولات</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalProducts}</p>
                  </div>
                  <Package className="w-12 h-12 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">محصولات فعال</p>
                    <p className="text-3xl font-bold text-green-600">{stats.activeProducts}</p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">کل دانلودها</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalDownloads}</p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Product Button */}
        <div className="mb-6">
          <Button
            data-testid="add-product-button"
            onClick={() => handleOpenDialog()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 btn-hover"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن محصول جدید
          </Button>
        </div>

        {/* Products Table */}
        <Card className="glass-effect border-0">
          <CardHeader>
            <CardTitle>لیست محصولات</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-500 py-12">محصولی یافت نشد</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-right py-3 px-4 font-semibold text-sm">تصویر</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">عنوان</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">دسته‌بندی</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">قیمت</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">وضعیت</th>
                      <th className="text-right py-3 px-4 font-semibold text-sm">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b border-gray-100 hover:bg-purple-50/30">
                        <td className="py-3 px-4">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.slug}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          {product.salePrice ? (
                            <div>
                              <div className="font-medium text-purple-600">
                                {formatPrice(product.salePrice)} تومان
                              </div>
                              <div className="text-sm text-gray-400 line-through">
                                {formatPrice(product.price)}
                              </div>
                            </div>
                          ) : (
                            <div className="font-medium">{formatPrice(product.price)} تومان</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={product.isActive ? 'default' : 'secondary'}>
                            {product.isActive ? 'فعال' : 'غیرفعال'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              data-testid={`edit-product-${product.slug}`}
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenDialog(product)}
                              className="hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              data-testid={`delete-product-${product.slug}`}
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(product._id)}
                              className="hover:bg-red-50 text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Product Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان *</Label>
                <Input
                  id="title"
                  data-testid="product-title-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">اسلاگ (URL) *</Label>
                <Input
                  id="slug"
                  data-testid="product-slug-input"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                  placeholder="product-slug"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">توضیحات کوتاه *</Label>
              <Input
                id="shortDescription"
                data-testid="product-short-desc-input"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">توضیحات کامل *</Label>
              <Textarea
                id="description"
                data-testid="product-description-input"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">قیمت (تومان) *</Label>
                <Input
                  id="price"
                  data-testid="product-price-input"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salePrice">قیمت تخفیف‌خورده</Label>
                <Input
                  id="salePrice"
                  data-testid="product-sale-price-input"
                  type="number"
                  value={formData.salePrice}
                  onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger data-testid="product-category-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">کسب و کار</SelectItem>
                    <SelectItem value="portfolio">نمونه کار</SelectItem>
                    <SelectItem value="ecommerce">فروشگاهی</SelectItem>
                    <SelectItem value="blog">وبلاگ</SelectItem>
                    <SelectItem value="landing">لندینگ</SelectItem>
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">لینک تصویر شاخص *</Label>
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-gray-400" />
                <Input
                  id="thumbnail"
                  data-testid="product-thumbnail-input"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="downloadLink">لینک دانلود فایل *</Label>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-gray-400" />
                <Input
                  id="downloadLink"
                  data-testid="product-download-link-input"
                  value={formData.downloadLink}
                  onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
                  placeholder="https://example.com/download.zip"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="version">نسخه</Label>
                <Input
                  id="version"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="demoUrl">لینک دمو</Label>
                <Input
                  id="demoUrl"
                  data-testid="product-demo-url-input"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  placeholder="https://demo.example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">ویژگی‌ها (هر خط یک ویژگی)</Label>
              <Textarea
                id="features"
                data-testid="product-features-input"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={4}
                placeholder="طراحی ریسپانسیو&#10;سرعت بالا&#10;سئو بهینه"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">برچسب‌ها (با کاما جدا کنید)</Label>
              <Input
                id="tags"
                data-testid="product-tags-input"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="وردپرس, قالب, مدرن"
              />
            </div>

            <div className="flex items-center gap-6 pt-4 border-t">
              <Button
                data-testid="save-product-button"
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Save className="w-4 h-4 ml-2" />
                {editingProduct ? 'بروزرسانی' : 'ذخیره'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                <X className="w-4 h-4 ml-2" />
                انصراف
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
