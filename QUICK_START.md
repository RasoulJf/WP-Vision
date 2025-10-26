# 🚀 راهنمای سریع نصب WP Vision

## نصب سریع در 3 مرحله

### 1️⃣ Backend
```bash
cd backend
npm install
node create_admin.js
npm start
```

### 2️⃣ Frontend (ترمینال جدید)
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

### 3️⃣ تنظیمات MongoDB

در `backend/.env`:
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="wp_vision"
```

---

## ✅ تست

- Backend: http://localhost:8001/api
- Frontend: http://localhost:3000
- لاگین ادمین: admin@wpvision.com / admin123456

---

## ⚠️ رفع مشکل npm

اگر خطای dependency گرفتید:
```bash
cd frontend
npm install --legacy-peer-deps
```

---

## 📚 مستندات کامل

- `INSTALLATION_GUIDE.md` - راهنمای نصب کامل
- `TROUBLESHOOTING.md` - رفع مشکلات
- `API_DOCUMENTATION.md` - مستندات API
- `ROUTES_LIST.md` - لیست روت‌ها

---

**موفق باشید! 🎉**
