import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App';
import { ArrowLeft, Download, Star, Eye, Tag, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/products/${slug}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('محصول یافت نشد');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fa-IR');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="spinner"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col" data-testid="product-detail-page">
      <Header />
      
      <main className="flex-grow">
        {/* Back Button */}
        <div className="glass-effect border-b border-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Button
              data-testid="back-button"
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4" />
              بازگشت
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4 fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-auto"
                />
                {product.salePrice && (
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-lg px-4 py-2">
                    تخفیف
                  </Badge>
                )}
              </div>
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {product.images.slice(0, 3).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6 slide-in">
              <div>
                <Badge className="mb-3">{product.category}</Badge>
                <h1 className="text-4xl font-bold mb-4 gradient-text">
                  {product.title}
                </h1>
                <p className="text-lg text-gray-600">{product.shortDescription}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>{product.downloads} دانلود</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating} امتیاز</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(product.createdAt)}</span>
                </div>
              </div>

              {/* Price */}
              <Card className="glass-effect border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      {product.salePrice ? (
                        <div>
                          <div className="text-3xl font-bold text-purple-600">
                            {formatPrice(product.salePrice)} تومان
                          </div>
                          <div className="text-lg text-gray-400 line-through">
                            {formatPrice(product.price)} تومان
                          </div>
                        </div>
                      ) : (
                        <div className="text-3xl font-bold text-purple-600">
                          {formatPrice(product.price)} تومان
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    data-testid="purchase-button"
                    className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 btn-hover"
                    onClick={() => toast.success('به زودی امکان خرید فعال می‌شود')}
                  >
                    خرید و دانلود
                  </Button>
                </CardContent>
              </Card>

              {/* Demo */}
              {product.demoUrl && (
                <Button
                  data-testid="demo-button"
                  variant="outline"
                  className="w-full h-12 border-purple-200 hover:bg-purple-50"
                  onClick={() => window.open(product.demoUrl, '_blank')}
                >
                  <Eye className="w-4 h-4 ml-2" />
                  مشاهده دموی زنده
                </Button>
              )}
            </div>
          </div>

          {/* Description & Features */}
          <div className="mt-16 space-y-12">
            <Card className="glass-effect border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">توضیحات</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {product.features && product.features.length > 0 && (
              <Card className="glass-effect border-0">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">ویژگی‌ها</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-purple-600 text-xl">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {product.tags && product.tags.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Tag className="w-6 h-6" />
                  برچسب‌ها
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="px-4 py-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;