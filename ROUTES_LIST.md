# 📋 لیست کامل روت‌های API - WP Vision

## 🔗 Base URL
```
http://localhost:8001/api
```
یا
```
https://your-domain.com/api
```

---

## 🔐 احراز هویت (Authentication Routes)

### 1️⃣ ثبت‌نام کاربر جدید
```javascript
POST /api/auth/register

// Body
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "success": true,
  "data": {
    "id": "...",
    "username": "user123",
    "email": "user@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2️⃣ ورود کاربر (Login)
```javascript
POST /api/auth/login

// Body
{
  "email": "admin@wpvision.com",
  "password": "admin123456"
}

// Response
{
  "success": true,
  "data": {
    "id": "...",
    "username": "admin",
    "email": "admin@wpvision.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3️⃣ دریافت اطلاعات کاربر جاری
```javascript
GET /api/auth/me
Headers: {
  "Authorization": "Bearer <token>"
}

// Response
{
  "success": true,
  "data": {
    "id": "...",
    "username": "admin",
    "email": "admin@wpvision.com",
    "role": "admin"
  }
}
```

---

## 📦 محصولات (Products Routes) - عمومی

### 4️⃣ دریافت لیست محصولات
```javascript
GET /api/products

// Query Parameters (اختیاری):
// ?category=business
// ?search=مدرن
// ?sort=popular (popular, price-low, price-high, rating)
// ?limit=20
// ?page=1

// مثال:
GET /api/products?category=business&sort=popular&limit=10

// Response
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "قالب مدرن کسب و کار",
      "slug": "modern-business-theme",
      "description": "...",
      "shortDescription": "...",
      "price": 450000,
      "salePrice": 299000,
      "thumbnail": "https://...",
      "category": "business",
      "features": [...],
      "tags": [...],
      "downloads": 234,
      "rating": 4.8,
      "isActive": true
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  }
}
```

### 5️⃣ دریافت جزئیات یک محصول
```javascript
GET /api/products/:slug

// مثال:
GET /api/products/modern-business-theme

// Response
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "قالب مدرن کسب و کار",
    "slug": "modern-business-theme",
    "description": "...",
    "shortDescription": "...",
    "price": 450000,
    "salePrice": 299000,
    "thumbnail": "https://...",
    "images": ["https://...", "https://..."],
    "version": "2.1.0",
    "demoUrl": "https://...",
    "category": "business",
    "features": [...],
    "tags": [...],
    "downloads": 234,
    "rating": 4.8,
    "createdBy": {
      "_id": "...",
      "username": "admin"
    },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 6️⃣ دریافت لیست دسته‌بندی‌ها
```javascript
GET /api/products/categories/list

// Response
{
  "success": true,
  "data": [
    { "value": "business", "label": "کسب و کار", "icon": "💼" },
    { "value": "portfolio", "label": "نمونه کار", "icon": "🎨" },
    { "value": "ecommerce", "label": "فروشگاهی", "icon": "🛒" },
    { "value": "blog", "label": "وبلاگ", "icon": "📝" },
    { "value": "landing", "label": "لندینگ", "icon": "🚀" },
    { "value": "other", "label": "سایر", "icon": "📦" }
  ]
}
```

---

## 👨‍💼 پنل ادمین (Admin Routes)

**⚠️ همه روت‌های زیر نیازمند:**
- Header: `Authorization: Bearer <admin-token>`
- Role: `admin`

### 7️⃣ دریافت لیست محصولات (ادمین)
```javascript
GET /api/admin/products
Headers: {
  "Authorization": "Bearer <admin-token>"
}

// Response
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "...",
      "slug": "...",
      "downloadLink": "https://...",  // این فیلد فقط برای ادمین
      "isActive": true,
      "createdBy": {
        "_id": "...",
        "username": "admin",
        "email": "admin@wpvision.com"
      }
      // سایر فیلدها...
    }
  ]
}
```

### 8️⃣ ایجاد محصول جدید
```javascript
POST /api/admin/products
Headers: {
  "Authorization": "Bearer <admin-token>",
  "Content-Type": "application/json"
}

// Body
{
  "title": "قالب جدید",
  "slug": "new-theme",
  "description": "توضیحات کامل محصول",
  "shortDescription": "توضیحات کوتاه",
  "price": 500000,
  "salePrice": 350000,  // اختیاری
  "thumbnail": "https://example.com/image.jpg",
  "downloadLink": "https://example.com/download.zip",
  "version": "1.0.0",
  "demoUrl": "https://demo.example.com",  // اختیاری
  "category": "business",
  "features": ["ویژگی 1", "ویژگی 2"],
  "tags": ["تگ1", "تگ2"],
  "isActive": true
}

// Response
{
  "success": true,
  "data": {
    // محصول ایجاد شده
  }
}
```

### 9️⃣ بروزرسانی محصول
```javascript
PUT /api/admin/products/:id
Headers: {
  "Authorization": "Bearer <admin-token>",
  "Content-Type": "application/json"
}

// مثال:
PUT /api/admin/products/507f1f77bcf86cd799439011

// Body (فقط فیلدهایی که می‌خواهید تغییر دهید)
{
  "title": "عنوان جدید",
  "price": 600000,
  "isActive": false
}

// Response
{
  "success": true,
  "data": {
    // محصول بروزرسانی شده
  }
}
```

### 🔟 حذف محصول
```javascript
DELETE /api/admin/products/:id
Headers: {
  "Authorization": "Bearer <admin-token>"
}

// مثال:
DELETE /api/admin/products/507f1f77bcf86cd799439011

// Response
{
  "success": true,
  "message": "محصول با موفقیت حذف شد"
}
```

### 1️⃣1️⃣ دریافت آمار داشبورد
```javascript
GET /api/admin/stats
Headers: {
  "Authorization": "Bearer <admin-token>"
}

// Response
{
  "success": true,
  "data": {
    "totalProducts": 15,
    "activeProducts": 12,
    "totalDownloads": 1234,
    "recentProducts": [
      {
        "_id": "...",
        "title": "...",
        "thumbnail": "...",
        "price": 500000,
        "createdAt": "..."
      }
    ]
  }
}
```

---

## 🚀 مثال‌های استفاده با Fetch/Axios

### مثال 1: دریافت محصولات با فیلتر
```javascript
const getProducts = async () => {
  try {
    const response = await fetch(
      'http://localhost:8001/api/products?category=business&sort=popular'
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### مثال 2: لاگین و دریافت توکن
```javascript
const login = async () => {
  try {
    const response = await fetch('http://localhost:8001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@wpvision.com',
        password: 'admin123456'
      })
    });
    const data = await response.json();
    const token = data.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### مثال 3: ایجاد محصول جدید (با توکن)
```javascript
const createProduct = async (token) => {
  try {
    const response = await fetch('http://localhost:8001/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'محصول تست',
        slug: 'test-product',
        description: 'توضیحات تست',
        shortDescription: 'کوتاه',
        price: 100000,
        thumbnail: 'https://example.com/image.jpg',
        downloadLink: 'https://example.com/file.zip',
        category: 'other'
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### مثال 4: با Axios
```javascript
import axios from 'axios';

const API = 'http://localhost:8001/api';

// تنظیم axios interceptor برای توکن
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// دریافت محصولات
const getProducts = async () => {
  const response = await axios.get(`${API}/products`);
  return response.data;
};

// لاگین
const login = async (email, password) => {
  const response = await axios.post(`${API}/auth/login`, { email, password });
  localStorage.setItem('token', response.data.data.token);
  return response.data;
};

// ایجاد محصول
const createProduct = async (productData) => {
  const response = await axios.post(`${API}/admin/products`, productData);
  return response.data;
};
```

---

## 📊 خلاصه روت‌ها

| روت | متد | نیاز به توکن | توضیحات |
|-----|-----|--------------|---------|
| `/api/auth/register` | POST | ❌ | ثبت‌نام کاربر |
| `/api/auth/login` | POST | ❌ | ورود کاربر |
| `/api/auth/me` | GET | ✅ | اطلاعات کاربر |
| `/api/products` | GET | ❌ | لیست محصولات |
| `/api/products/:slug` | GET | ❌ | جزئیات محصول |
| `/api/products/categories/list` | GET | ❌ | لیست دسته‌بندی |
| `/api/admin/products` | GET | ✅ (Admin) | لیست محصولات (ادمین) |
| `/api/admin/products` | POST | ✅ (Admin) | ایجاد محصول |
| `/api/admin/products/:id` | PUT | ✅ (Admin) | بروزرسانی محصول |
| `/api/admin/products/:id` | DELETE | ✅ (Admin) | حذف محصول |
| `/api/admin/stats` | GET | ✅ (Admin) | آمار داشبورد |

---

## 🔑 اطلاعات ورود پیش‌فرض

**ادمین:**
- Email: `admin@wpvision.com`
- Password: `admin123456`

---

**نکته**: همه روت‌ها باید با `/api` شروع شوند.
