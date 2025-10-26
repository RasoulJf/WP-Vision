# 📦 راهنمای نصب و راه‌اندازی WP Vision

## پیش‌نیازها

قبل از شروع، مطمئن شوید که این موارد روی سیستم شما نصب است:

- **Node.js** (نسخه 18 یا بالاتر)
- **npm** یا **yarn**
- **MongoDB** (نسخه 5 یا بالاتر)

---

## مرحله 1: دانلود و استخراج فایل

1. فایل `wp-vision-project.zip` را دانلود کنید
2. فایل را در مسیر دلخواه extract کنید:

```bash
unzip wp-vision-project.zip -d ~/wp-vision
cd ~/wp-vision
```

---

## مرحله 2: راه‌اندازی MongoDB

### روش 1: نصب MongoDB به صورت Local (Linux/Mac)

```bash
# شروع MongoDB
sudo systemctl start mongodb
# یا
sudo service mongodb start

# بررسی وضعیت
sudo systemctl status mongodb
```

### روش 2: استفاده از Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### روش 3: MongoDB Atlas (Cloud)

اگر می‌خواهید از MongoDB Atlas استفاده کنید:
1. به [mongodb.com/atlas](https://www.mongodb.com/atlas) بروید
2. یک اکانت رایگان بسازید
3. یک cluster ایجاد کنید
4. Connection String را کپی کنید

---

## مرحله 3: نصب Backend (Node.js)

```bash
cd backend

# نصب dependencies با npm
npm install

# یا با yarn
yarn install
```

### تنظیم فایل .env

فایل `.env` در پوشه backend را ویرایش کنید:

```env
# MongoDB - اگر Local است:
MONGO_URL="mongodb://localhost:27017"

# یا اگر از MongoDB Atlas استفاده می‌کنید:
# MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/"

DB_NAME="wp_vision"
JWT_SECRET="your-secret-key-here"
PORT=8001
NODE_ENV="development"
CORS_ORIGINS="*"
```

**نکته مهم:** `JWT_SECRET` را به یک رشته امن تغییر دهید.

### ایجاد کاربر ادمین

```bash
node create_admin.js
```

این دستور یک کاربر ادمین با این اطلاعات می‌سازد:
- Email: `admin@wpvision.com`
- Password: `admin123456`

### (اختیاری) ایجاد محصولات نمونه

```bash
node create_sample_products.js
```

### اجرای Backend Server

```bash
# Development mode
npm start

# یا با nodemon برای auto-reload
npm install -g nodemon
nodemon server.js
```

سرور روی **http://localhost:8001** اجرا می‌شود.

---

## مرحله 4: نصب Frontend (React)

پنجره ترمینال جدید باز کنید:

```bash
cd frontend

# نصب dependencies با npm
npm install

# یا با yarn
yarn install
```

### تنظیم فایل .env

فایل `.env` در پوشه frontend را ویرایش کنید:

```env
# اگر backend روی localhost است:
REACT_APP_BACKEND_URL=http://localhost:8001

# سایر تنظیمات (نیازی به تغییر نیست)
WDS_SOCKET_PORT=443
REACT_APP_ENABLE_VISUAL_EDITS=true
ENABLE_HEALTH_CHECK=false
```

### اجرای Frontend

```bash
npm start
```

فرانت روی **http://localhost:3000** اجرا می‌شود و به صورت خودکار در مرورگر باز می‌شود.

---

## مرحله 5: تست سیستم

### 1. بررسی Backend API

در مرورگر یا با curl:

```bash
curl http://localhost:8001/api
```

باید پاسخ JSON دریافت کنید.

### 2. تست صفحه اصلی

به آدرس `http://localhost:3000` بروید و باید لیست محصولات را ببینید.

### 3. تست لاگین ادمین

1. روی دکمه "ورود ادمین" کلیک کنید
2. با این اطلاعات وارد شوید:
   - Email: `admin@wpvision.com`
   - Password: `admin123456`
3. باید وارد داشبورد ادمین شوید

---

## عیب‌یابی مشکلات رایج

### مشکل 1: سرور اجرا نمی‌شود

**خطا:** `Error: Cannot find module 'express'`
```bash
cd backend
npm install
```

**خطا:** `MongoServerError: connect ECONNREFUSED`
- MongoDB اجرا نیست. مرحله 2 را دوباره بررسی کنید
- یا `MONGO_URL` در `.env` را چک کنید

**خطا:** `Error: listen EADDRINUSE: address already in use :::8001`
- پورت 8001 استفاده شده است
- پورت را در `.env` تغییر دهید یا process قبلی را kill کنید:
```bash
lsof -ti:8001 | xargs kill -9
```

### مشکل 2: فرانت اجرا نمی‌شود

**خطا:** `Module not found: Can't resolve...`
```bash
cd frontend
rm -rf node_modules
npm install
```

### مشکل 3: خطای CORS

در فایل `backend/.env` این خط را اضافه کنید:
```env
CORS_ORIGINS="http://localhost:3000"
```

### مشکل 4: محصولات نمایش داده نمی‌شوند

1. بررسی کنید Backend اجرا است
2. Console مرورگر را چک کنید (F12)
3. `REACT_APP_BACKEND_URL` در `frontend/.env` را بررسی کنید

---

## دستورات مفید

### Backend

```bash
# نصب dependencies
npm install

# اجرای سرور
npm start

# ایجاد ادمین
node create_admin.js

# ایجاد محصولات نمونه
node create_sample_products.js
```

### Frontend

```bash
# نصب dependencies
npm install

# اجرای development server
npm start

# ساخت برای production
npm run build
```

### MongoDB

```bash
# اتصال به MongoDB shell
mongosh

# نمایش دیتابیس‌ها
show dbs

# استفاده از دیتابیس wp_vision
use wp_vision

# نمایش collections
show collections

# نمایش محصولات
db.products.find().pretty()

# نمایش کاربران
db.users.find().pretty()
```

---

## آماده‌سازی برای Production

### 1. تنظیم امنیتی

در `backend/.env`:
```env
NODE_ENV="production"
JWT_SECRET="رشته-طولانی-و-امن-برای-تولید"
CORS_ORIGINS="https://yourdomain.com"
```

### 2. Build فرانت

```bash
cd frontend
npm run build
```

### 3. استفاده از PM2 برای Backend

```bash
npm install -g pm2
cd backend
pm2 start server.js --name wp-vision-backend
pm2 save
pm2 startup
```

### 4. استفاده از Nginx

نمونه کانفیگ nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## پشتیبانی

اگر به مشکلی برخوردید:

1. فایل `README.md` را مطالعه کنید
2. فایل `API_DOCUMENTATION.md` برای اطلاعات API
3. فایل `ROUTES_LIST.md` برای لیست کامل روت‌ها

---

**موفق باشید! 🚀**
