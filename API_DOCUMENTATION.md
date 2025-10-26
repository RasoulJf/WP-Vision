# WP Vision API Documentation

## مستندات کامل API فروشگاه قالب‌های وردپرس

---

## 🔐 احراز هویت (Authentication)

### Register - ثبت‌نام کاربر جدید
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}

Response (201):
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

### Login - ورود کاربر
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "admin@wpvision.com",
  "password": "admin123456"
}

Response (200):
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

### Get Current User - دریافت اطلاعات کاربر جاری
```
GET /api/auth/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "id": "...",
    "username": "admin",
    "email": "admin@wpvision.com",
    "role": "admin",
    "createdAt": "2025-01-26T..."
  }
}
```

---

## 📦 محصولات (Products) - عمومی

### Get All Products - دریافت لیست محصولات
```
GET /api/products
Query Parameters (اختیاری):
  - category: string (business, portfolio, ecommerce, blog, landing, other)
  - search: string (جستجو در عنوان، توضیحات، تگ‌ها)
  - sort: string (popular, price-low, price-high, rating)
  - limit: number (پیش‌فرض: 20)
  - page: number (پیش‌فرض: 1)

مثال:
GET /api/products?category=business&sort=popular&limit=10&page=1

Response (200):
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
      "version": "2.1.0",
      "demoUrl": "https://...",
      "category": "business",
      "features": [...],
      "tags": [...],
      "downloads": 234,
      "rating": 4.8,
      "isActive": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  }
}

نکته: فیلد downloadLink از لیست عمومی حذف می‌شود
```

### Get Single Product - دریافت جزئیات یک محصول
```
GET /api/products/:slug

مثال:
GET /api/products/modern-business-theme

Response (200):
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "قالب مدرن کسب و کار",
    "slug": "modern-business-theme",
    "description": "توضیحات کامل...",
    "shortDescription": "...",
    "price": 450000,
    "salePrice": 299000,
    "thumbnail": "https://...",
    "images": ["https://...", "https://..."],
    "version": "2.1.0",
    "demoUrl": "https://demo.example.com",
    "category": "business",
    "features": [
      "طراحی ریسپانسیو",
      "سرعت بارگذاری بالا",
      "سئو بهینه"
    ],
    "tags": ["کسب و کار", "مدرن", "حرفه‌ای"],
    "downloads": 234,
    "rating": 4.8,
    "isActive": true,
    "createdBy": {
      "_id": "...",
      "username": "admin"
    },
    "createdAt": "...",
    "updatedAt": "..."
  }
}

نکته: downloadLink از جزئیات عمومی هم حذف می‌شود (فقط ادمین)
```

### Get Categories - دریافت لیست دسته‌بندی‌ها
```
GET /api/products/categories/list

Response (200):
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

## 👨‍💼 پنل ادمین (Admin) - نیازمند احراز هویت

**تمام روت‌های زیر نیازمند:**
- Header: `Authorization: Bearer <token>`
- Role: `admin`

### Get All Products (Admin) - دریافت لیست محصولات (شامل غیرفعال)
```
GET /api/admin/products
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "...",
      "slug": "...",
      "downloadLink": "https://...",  // فیلد download link نمایش داده می‌شود
      "isActive": true,
      "createdBy": {
        "_id": "...",
        "username": "admin",
        "email": "admin@wpvision.com"
      },
      // سایر فیلدها...
    }
  ]
}
```

### Create Product - ایجاد محصول جدید
```
POST /api/admin/products
Authorization: Bearer <admin-token>
Content-Type: application/json

Body:
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

Response (201):
{
  "success": true,
  "data": {
    // محصول ایجاد شده
  }
}
```

### Update Product - بروزرسانی محصول
```
PUT /api/admin/products/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

مثال:
PUT /api/admin/products/507f1f77bcf86cd799439011

Body:
{
  "title": "عنوان جدید",
  "price": 600000,
  // سایر فیلدهای قابل بروزرسانی...
}

Response (200):
{
  "success": true,
  "data": {
    // محصول بروزرسانی شده
  }
}
```

### Delete Product - حذف محصول
```
DELETE /api/admin/products/:id
Authorization: Bearer <admin-token>

مثال:
DELETE /api/admin/products/507f1f77bcf86cd799439011

Response (200):
{
  "success": true,
  "message": "محصول با موفقیت حذف شد"
}
```

### Get Dashboard Stats - دریافت آمار داشبورد
```
GET /api/admin/stats
Authorization: Bearer <admin-token>

Response (200):
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

## 🔒 امنیت و JWT

### نحوه استفاده از Token
پس از لاگین موفق، token دریافت شده را در localStorage ذخیره کنید:

```javascript
// ذخیره token
localStorage.setItem('token', response.data.data.token);

// استفاده در axios
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### مدت اعتبار Token
- Token به مدت **30 روز** معتبر است
- پس از انقضا، کاربر باید مجدداً لاگین کند

---

## ⚠️ خطاها (Error Responses)

### خطای 400 - Bad Request
```json
{
  "success": false,
  "message": "پیام خطا",
  "errors": [
    {
      "msg": "عنوان الزامی است",
      "param": "title",
      "location": "body"
    }
  ]
}
```

### خطای 401 - Unauthorized
```json
{
  "success": false,
  "message": "دسترسی غیرمجاز - توکن یافت نشد"
}
```

### خطای 403 - Forbidden
```json
{
  "success": false,
  "message": "دسترسی غیرمجاز - فقط ادمین"
}
```

### خطای 404 - Not Found
```json
{
  "success": false,
  "message": "محصول یافت نشد"
}
```

### خطای 500 - Server Error
```json
{
  "success": false,
  "message": "خطای سرور",
  "error": "توضیحات خطا (فقط در development mode)"
}
```

---

## 📝 نکات مهم

1. **Base URL**: همه روت‌ها باید با `/api` شروع شوند
2. **MongoDB Connection**: در فایل `.env` تنظیم شود
3. **CORS**: برای development روی `*` تنظیم شده
4. **JWT Secret**: در `.env` قابل تنظیم است
5. **Slug Uniqueness**: هر محصول باید slug منحصر به فرد داشته باشه
6. **Admin User**: 
   - Email: `admin@wpvision.com`
   - Password: `admin123456`

---

## 🚀 مثال استفاده با Fetch

```javascript
// دریافت محصولات
const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:8001/api/products?category=business');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// لاگین و استفاده از token
const loginAndCreateProduct = async () => {
  // 1. Login
  const loginRes = await fetch('http://localhost:8001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@wpvision.com',
      password: 'admin123456'
    })
  });
  const loginData = await loginRes.json();
  const token = loginData.data.token;
  
  // 2. Create Product
  const productRes = await fetch('http://localhost:8001/api/admin/products', {
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
      thumbnail: 'https://...',
      downloadLink: 'https://...',
      category: 'other'
    })
  });
  const productData = await productRes.json();
  console.log(productData);
};
```

---

## 🌐 متغیرهای محیطی (.env)

```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="wp_vision"
CORS_ORIGINS="*"
JWT_SECRET="wp-vision-secret-key-2025"
PORT=8001
NODE_ENV="development"
```

---

**توسعه یافته با ❤️ برای WP Vision**
