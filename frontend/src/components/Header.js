import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { LogIn, Home, ShoppingBag } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="glass-effect border-b border-purple-100 sticky top-0 z-50" data-testid="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold gradient-text">WP Vision</h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                صفحه اصلی
              </Button>
            </Link>
            
            <Button
              data-testid="admin-login-button"
              onClick={() => navigate('/admin/login')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 btn-hover flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              ورود ادمین
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;