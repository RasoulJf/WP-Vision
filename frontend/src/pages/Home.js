import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { Search, ShoppingCart, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory, searchTerm, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);
      if (sortBy && sortBy !== 'newest') params.append('sort', sortBy);
      
      const response = await axios.get(`${API}/products?${params.toString()}`);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('خطا در دریافت محصولات');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/products/categories/list`);
      setCategories([{ value: 'all', label: 'همه', icon: '🌟' }, ...response.data.data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center fade-in">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-purple-200">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">قالب‌های حرفه‌ای وردپرس</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">WP Vision</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                بهترین قالب‌های وردپرس برای وب‌سایت شما
              </p>
              
              {/* Search & Filter Section */}
              <div className="max-w-4xl mx-auto mb-8 space-y-4">
                <div className="flex gap-3 flex-col sm:flex-row">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      data-testid="search-input"
                      type="text"
                      placeholder="جستجوی قالب..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-12 h-14 text-lg glass-effect border-purple-200 focus:border-purple-400"
                    />
                  </div>
                  
                  {/* Sort Filter */}
                  <div className="w-full sm:w-48">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger 
                        data-testid="sort-select"
                        className="h-14 glass-effect border-purple-200 text-lg"
                      >
                        <div className="flex items-center gap-2">
                          <SlidersHorizontal className="w-4 h-4" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">جدیدترین</SelectItem>
                        <SelectItem value="popular">محبوب‌ترین</SelectItem>
                        <SelectItem value="price-low">ارزان‌ترین</SelectItem>
                        <SelectItem value="price-high">گران‌ترین</SelectItem>
                        <SelectItem value="rating">بالاترین امتیاز</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                data-testid={`category-${cat.value}`}
                onClick={() => setSelectedCategory(cat.value)}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                className={`whitespace-nowrap rounded-full px-6 transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    : 'hover:bg-purple-50 border-purple-200'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">محصولی یافت نشد</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product.slug}`}
                  data-testid={`product-card-${product.slug}`}
                >
                  <Card className="card-hover glass-effect border-0 h-full overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.salePrice && (
                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                          تخفیف
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.salePrice ? (
                            <div>
                              <span className="text-lg font-bold text-purple-600">
                                {formatPrice(product.salePrice)} تومان
                              </span>
                              <span className="text-sm text-gray-400 line-through mr-2">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-purple-600">
                              {formatPrice(product.price)} تومان
                            </span>
                          )}
                        </div>
                        <ShoppingCart className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;