# 🎨 WP Vision - فروشگاه قالب‌های وردپرس

یک فروشگاه کامل و حرفه‌ای برای فروش قالب‌های وردپرس با بک‌اند Node.js و فرانت React

---

## ✨ ویژگی‌ها

### 🎯 صفحه اصلی
- نمایش محصولات با طراحی مدرن و زیبا
- جستجوی پیشرفته در محصولات
- فیلتر بر اساس دسته‌بندی
- مرتب‌سازی (محبوب‌ترین، قیمت، امتیاز)
- کارت محصول با انیمیشن hover
- نمایش قیمت تخفیف‌خورده

### 📄 صفحه تک محصول
- نمایش کامل اطلاعات محصول
- گالری تصاویر
- نمایش ویژگی‌ها و برچسب‌ها
- لینک دمو زنده
- آمار دانلود و امتیاز
- دکمه خرید (آماده برای اتصال درگاه)

### 👨‍💼 پنل مدیریت ادمین
- داشبورد آماری
- مدیریت کامل محصولات (CRUD)
- افزودن محصول جدید
- ویرایش محصولات موجود
- حذف محصولات
- نمایش جدولی محصولات
- سیستم احراز هویت امن با JWT

### 🔐 احراز هویت
- ثبت‌نام کاربر
- ورود با ایمیل و رمز عبور
- JWT Token با اعتبار 30 روزه
- محافظت از روت‌های ادمین
- نقش‌های کاربری (admin, user)

---

## 🛠 تکنولوژی‌ها

### Backend (Node.js)
- **Express.js** - فریم‌ورک وب
- **MongoDB** - دیتابیس
- **Mongoose** - ODM برای MongoDB
- **JWT** - احراز هویت
- **bcryptjs** - هش کردن رمز عبور
- **express-validator** - اعتبارسنجی ورودی‌ها
- **CORS** - مدیریت Cross-Origin

### Frontend (React)
- **React 19** - کتابخانه UI
- **React Router v7** - مسیریابی
- **Axios** - HTTP Client
- **Tailwind CSS** - استایل‌دهی
- **Shadcn/UI** - کامپوننت‌های آماده
- **Lucide React** - آیکون‌ها
- **Sonner** - Toast notifications

---

## 🔑 اطلاعات ورود پیش‌فرض

### ادمین
- **ایمیل**: `admin@wpvision.com`
- **رمز عبور**: `admin123456`

---

## 📚 مستندات API

مستندات کامل API در فایل [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) موجود است.

### روت‌های اصلی:

#### عمومی
- `GET /api/products` - لیست محصولات
- `GET /api/products/:slug` - جزئیات محصول
- `GET /api/products/categories/list` - لیست دسته‌بندی‌ها

#### احراز هویت
- `POST /api/auth/register` - ثبت‌نام
- `POST /api/auth/login` - ورود
- `GET /api/auth/me` - اطلاعات کاربر

#### ادمین (نیازمند توکن)
- `GET /api/admin/products` - لیست محصولات (ادمین)
- `POST /api/admin/products` - ایجاد محصول
- `PUT /api/admin/products/:id` - بروزرسانی محصول
- `DELETE /api/admin/products/:id` - حذف محصول
- `GET /api/admin/stats` - آمار داشبورد

---

## 🗂 ساختار پروژه

```
/app
├── backend/
│   ├── models/
│   │   ├── User.js              # مدل کاربر
│   │   └── Product.js           # مدل محصول
│   ├── routes/
│   │   ├── auth.js              # روت‌های احراز هویت
│   │   ├── products.js          # روت‌های محصولات
│   │   └── admin.js             # روت‌های ادمین
│   ├── middleware/
│   │   └── auth.js              # middleware احراز هویت
│   ├── server.js                # نقطه ورود سرور
│   ├── package.json
│   ├── .env
│   ├── create_admin.js          # اسکریپت ایجاد ادمین
│   └── create_sample_products.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/              # کامپوننت‌های Shadcn
│   │   ├── pages/
│   │   │   ├── Home.js          # صفحه اصلی
│   │   │   ├── ProductDetail.js # جزئیات محصول
│   │   │   ├── AdminLogin.js    # لاگین ادمین
│   │   │   └── AdminDashboard.js # داشبورد ادمین
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
│
└── API_DOCUMENTATION.md         # مستندات کامل API
```

---

## 🎨 طراحی UI/UX

### رنگ‌بندی
- **پالت رنگی**: گرادینت‌های مدرن روشن (آبی-بنفش)
- **فونت اصلی**: Space Grotesk (عناوین) + Inter (متن)
- **افکت‌ها**: Glass-morphism, Backdrop blur
- **انیمیشن‌ها**: Smooth transitions, Hover effects

### ویژگی‌های بصری
- طراحی ریسپانسیو کامل
- افکت glass با backdrop blur
- انیمیشن‌های نرم و حرفه‌ای
- کارت‌های محصول با hover effect
- گرادینت‌های مدرن و زیبا
- آیکون‌های Lucide React

---

## 🚀 ویژگی‌های آتی

- [ ] سیستم پرداخت آنلاین
- [ ] سیستم نظرات و امتیازدهی
- [ ] پروفایل کاربری
- [ ] لیست علاقه‌مندی‌ها
- [ ] فیلترهای پیشرفته‌تر
- [ ] سیستم تخفیف و کوپن
- [ ] ارسال ایمیل خوش‌آمدگویی
- [ ] داشبورد کاربری
- [ ] تاریخچه خریدها

---

## 📞 پشتیبانی

برای سوالات یا مشکلات، لطفاً یک issue ایجاد کنید.

---

**نکته مهم**: این پروژه با Node.js بک‌اند ساخته شده (نه FastAPI). سرور Express.js روی پورت 8001 اجرا می‌شود و به MongoDB لوکال شما متصل می‌شود.

**ساخته شده با ❤️ برای WP Vision**
