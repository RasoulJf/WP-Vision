# 🔧 راهنمای رفع مشکلات - WP Vision

## مشکلات npm و نصب Dependencies

### ❌ خطا: ERESOLVE unable to resolve dependency tree

**علت:** تضاد نسخه‌های dependency ها

**راه حل 1 (توصیه می‌شود):**
```bash
cd frontend
npm install --legacy-peer-deps
```

**راه حل 2:**
```bash
cd frontend
npm install --force
```

**راه حل 3:** پاک کردن cache و نصب مجدد
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

---

## مشکلات Backend

### ❌ خطا: Cannot find module 'express'

**راه حل:**
```bash
cd backend
npm install
```

### ❌ خطا: MongoServerError: connect ECONNREFUSED

**علت:** MongoDB اجرا نیست یا آدرس اشتباه است

**راه حل:**

1. بررسی کنید MongoDB اجرا است:
```bash
# Linux/Mac
sudo systemctl status mongodb
# یا
sudo service mongodb status

# Windows
net start MongoDB
```

2. MongoDB را اجرا کنید:
```bash
# Linux/Mac
sudo systemctl start mongodb
# یا
sudo service mongodb start

# Windows
net start MongoDB
```

3. بررسی کنید MONGO_URL در `.env` صحیح است:
```env
MONGO_URL="mongodb://localhost:27017"
```

### ❌ خطا: listen EADDRINUSE :::8001

**علت:** پورت 8001 در حال استفاده است

**راه حل:**

**Windows:**
```bash
netstat -ano | findstr :8001
taskkill /PID <PID_NUMBER> /F
```

**Linux/Mac:**
```bash
lsof -ti:8001 | xargs kill -9
# یا
sudo kill -9 $(sudo lsof -t -i:8001)
```

یا پورت را در `.env` تغییر دهید:
```env
PORT=8002
```

---

## مشکلات Frontend

### ❌ خطا: Module not found

**راه حل:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### ❌ خطا: CORS policy

**علت:** Backend CORS را به درستی تنظیم نکرده

**راه حل:**

در `backend/.env`:
```env
CORS_ORIGINS="http://localhost:3000"
```

یا برای development:
```env
CORS_ORIGINS="*"
```

سپس backend را restart کنید.

### ❌ صفحه سفید / Cannot GET /

**راه حل:**
```bash
cd frontend
npm start
```

اطمینان حاصل کنید که PORT در `.env` صحیح است:
```env
PORT=3000
```

---

## مشکلات دیتابیس

### ❌ خطا: Authentication failed

**علت:** نام کاربری و رمز MongoDB اشتباه است

**راه حل:**

اگر از MongoDB Atlas استفاده می‌کنید:
```env
MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/"
```

مطمئن شوید username و password صحیح است.

### ❌ Collection ها خالی هستند

**راه حل:**

1. کاربر ادمین بسازید:
```bash
cd backend
node create_admin.js
```

2. محصولات نمونه بسازید:
```bash
cd backend
node create_sample_products.js
```

---

## مشکلات لاگین

### ❌ نمی‌توانم وارد پنل ادمین شوم

**اطلاعات پیش‌فرض:**
- Email: `admin@wpvision.com`
- Password: `admin123456`

**بررسی:**

1. Backend اجرا است؟
```bash
curl http://localhost:8001/api
```

2. کاربر ادمین وجود دارد؟
```bash
cd backend
node create_admin.js
```

3. JWT_SECRET در `.env` تنظیم شده؟
```env
JWT_SECRET="your-secret-key"
```

### ❌ Token منقضی شده

**راه حل:**
```javascript
// از localStorage پاک کنید و دوباره لاگین کنید
localStorage.removeItem('token');
```

---

## مشکلات رایج Windows

### ❌ 'node' is not recognized

**راه حل:**

1. Node.js را نصب کنید: https://nodejs.org/
2. PATH را چک کنید
3. Command Prompt را restart کنید

### ❌ 'npm' is not recognized

**راه حل:**

مطمئن شوید Node.js به درستی نصب شده:
```bash
node --version
npm --version
```

---

## بررسی سلامت سیستم

### چک کردن Backend

```bash
curl http://localhost:8001/api
```

باید پاسخ JSON دریافت کنید.

### چک کردن Frontend

مرورگر را باز کنید:
```
http://localhost:3000
```

### چک کردن MongoDB

```bash
mongosh
# یا
mongo

# سپس:
show dbs
use wp_vision
show collections
```

---

## نصب مجدد کامل

اگر همه چیز خراب شد:

### Backend
```bash
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Frontend
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

---

## لاگ‌ها و دیباگ

### مشاهده لاگ Backend

```bash
# در ترمینالی که backend اجرا شده
# یا
node server.js
```

### مشاهده لاگ Frontend

```bash
# در ترمینالی که frontend اجرا شده
# یا
npm start
```

### دیباگ مرورگر

1. F12 را بزنید
2. Console را باز کنید
3. خطاها را بررسی کنید

---

## دریافت کمک

اگر مشکل شما حل نشد:

1. خطای دقیق را کپی کنید
2. لاگ‌ها را بررسی کنید
3. نسخه Node.js خود را چک کنید:
```bash
node --version
npm --version
```

4. مطمئن شوید تمام فایل‌های `.env` به درستی تنظیم شده‌اند

---

## پیش‌نیازها

مطمئن شوید این موارد نصب است:

- ✅ Node.js (v18+)
- ✅ npm (v8+)
- ✅ MongoDB (v5+)

بررسی نسخه‌ها:
```bash
node --version
npm --version
mongod --version
```

---

**موفق باشید! 🚀**
