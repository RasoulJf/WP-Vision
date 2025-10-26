import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-purple-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">درباره WP Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              فروشگاه قالب‌های حرفه‌ای وردپرس با کیفیت بالا و قیمت مناسب. ما بهترین قالب‌ها را برای کسب و کار شما ارائه می‌دهیم.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">لینک‌های سریع</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/" className="hover:text-purple-600 transition-colors">صفحه اصلی</a>
              </li>
              <li>
                <a href="/admin/login" className="hover:text-purple-600 transition-colors">ورود ادمین</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">تماس با ما</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors">درباره ما</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">تماس با ما</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <span>info@wpvision.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-600" />
                <span>021-12345678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span>تهران، ایران</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-purple-100 mt-8 pt-8 text-center text-gray-600">
          <p className="flex items-center justify-center gap-2">
            ساخته شده با 
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            برای WP Vision
          </p>
          <p className="mt-2 text-sm">
            © 2025 WP Vision. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;