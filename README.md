# 🛍️ Multi-Vendor Marketplace Platform (MERN Stack)

> **Hinglish mein likha gaya hai taaki developers easily samajh sakein** 😄

---

## 📌 Project Kya Hai?

Yeh ek **full-stack e-commerce marketplace** hai jahan:
- **Buyers** products browse karke cart mein add kar sakte hain aur order place kar sakte hain
- **Vendors** apne products add/edit/delete kar sakte hain
- **Admin** vendors ko approve karta hai aur revenue stats dekhta hai

Tech Stack: **MongoDB + Express.js + React (Vite) + Node.js = MERN**

---

## 📁 Project Structure

```
appzeto-test/
├── server/          ← Backend (Node.js + Express)
├── client/          ← Frontend (React + Vite)
└── README.md        ← Ye wala file 👈
```

---

## ⚙️ Setup Kaise Karein?

### Prerequisites
- Node.js v18+
- MongoDB locally chal raha ho (port 27017 pe)
- Git

### 1. Repository Clone Karo
```bash
git clone <your-repo-url>
cd appzeto-test
```

### 2. Backend Dependencies Install Karo
```bash
cd server
npm install
```

### 3. Frontend Dependencies Install Karo
```bash
cd client
npm install
```

### 4. Environment Variables Set Karo

`server/.env` file mein yeh values ho:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/marketplace
JWT_SECRET=your_super_secret_jwt_key_here
```

### 5. Admin User Seed Karo (Ek Baar)
```bash
cd server
node seed.js
```
> Isse `admin@test.com / admin123` wala admin account ban jaata hai

---

## 🚀 Servers Kaise Chalayein?

**Backend** (ek terminal mein):
```bash
cd server
npm run dev
# http://localhost:5000 pe chalega
```

**Frontend** (doosre terminal mein):
```bash
cd client
npm run dev
# http://localhost:5173 pe chalega
```

> ✅ Vite automatically `/api` requests ko `localhost:5000` pe proxy karta hai — alag CORS setup ki zaroorat nahi

---

## 🔐 Roles & Access

| Role | Kya Kar Sakta Hai |
|------|-------------------|
| `buyer` | Products browse karo, cart mein add karo, orders place karo |
| `vendor` | Apne products manage karo (add/edit/delete) — admin approval ke baad |
| `admin` | Vendors approve karo, revenue/stats dekho |

---

## 🏗️ Backend Architecture

```
server/
├── config/
│   └── db.js              ← MongoDB connection
├── models/
│   ├── User.js            ← User schema (buyer/vendor/admin, password hashed)
│   ├── Product.js         ← Product schema (vendor se linked)
│   └── Order.js           ← Order schema (price snapshot + status)
├── middleware/
│   ├── auth.js            ← JWT verify karega, req.user set karega
│   ├── role.js            ← Role check karega (vendor/admin/buyer)
│   └── errorHandler.js    ← Global error handler
├── services/              ← Business logic yahan hoti hai (controllers mein nahi)
│   ├── authService.js
│   ├── vendorService.js
│   ├── buyerService.js
│   └── adminService.js
├── controllers/           ← Sirf req/res handle karta hai, service ko call karta hai
├── routes/                ← Express routes define hote hain
├── utils/
│   └── upload.js          ← Multer config (local disk storage)
├── uploads/               ← Product images yahan store hoti hain
├── seed.js                ← Admin user create karne ka script
└── server.js              ← Entry point
```

### Key Backend Points
- **JWT Authentication**: Register/Login pe token milta hai, protected routes pe `Authorization: Bearer <token>` header bhejna padta hai
- **Vendor Isolation**: Vendor sirf apne products access kar sakta hai — service layer mein `vendor: vendorId` filter lagta hai
- **Stock Deduction**: Order place hote waqt automatically stock kam hota hai, insufficient stock pe error aata hai
- **Multer**: Images local `uploads/` folder mein save hoti hain, AWS nahi

---

## 🖥️ Frontend Architecture

```
client/src/
├── context/
│   ├── AuthContext.jsx    ← User state + login/logout functions + localStorage
│   └── CartContext.jsx    ← Cart items global state
├── services/
│   └── api.js             ← Axios instance — token auto-attach hota hai
├── routes/
│   └── ProtectedRoute.jsx ← Auth + role check, unauthorized pe redirect
├── components/
│   └── Navbar.jsx         ← Role ke hisaab se links dikhata hai
└── pages/
    ├── Login.jsx
    ├── Register.jsx
    ├── Home.jsx            ← Public product listing
    ├── ProductDetail.jsx
    ├── Cart.jsx
    ├── Checkout.jsx
    ├── MyOrders.jsx
    ├── vendor/
    │   ├── VendorProducts.jsx
    │   ├── AddProduct.jsx
    │   └── EditProduct.jsx
    └── admin/
        ├── VendorApproval.jsx
        └── RevenueDashboard.jsx
```

### Key Frontend Points
- **JWT Storage**: `localStorage` mein token aur user info store hoti hai
- **Axios Interceptor**: Har request pe automatically `Bearer token` header lagta hai (`api.js` mein)
- **ProtectedRoute**: Role + auth check — unauthorized user ko `/login` ya `/` pe redirect karta hai
- **CartContext**: Cart state globally available hai, page reload pe reset ho jaata hai

---

## 🌐 API Endpoints Reference

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |

### Buyer
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/orders` | Buyer only |
| GET | `/api/orders/my` | Buyer only |

### Vendor
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/vendor/products` | Vendor only |
| POST | `/api/vendor/products` | Vendor only |
| PUT | `/api/vendor/products/:id` | Vendor only |
| DELETE | `/api/vendor/products/:id` | Vendor only |

### Admin
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/admin/vendors` | Admin only |
| PATCH | `/api/admin/vendors/:id/approve` | Admin only |
| GET | `/api/admin/stats` | Admin only |

---

## 🧪 Testing Flow (Step by Step)

```
1. node seed.js            → Admin bana lo pehle

2. Register → role: vendor → Login karega to error aayega "pending approval"

3. admin@test.com se login → /admin/vendors → Vendor approve karo

4. Vendor account se login → Products add karo

5. Register → role: buyer → Products browse karo → Cart → Checkout

6. /admin/stats pe jaao → Revenue aur orders dikh jayenge
```

---

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| MongoDB connect nahi ho raha | MongoDB service start karo: `mongod` |
| Vendor login pe "pending" error | Admin se pehle approve karwao |
| Images nahi dikh rahi | `server/uploads/` folder exist karo, Vite proxy check karo |
| CORS error | Backend `localhost:5000` pe chal raha hai na? |
| "Cannot find module" error | `npm install` dobara run karo |

---

## 👨‍💻 Developer Notes

- **No business logic in controllers** — sab logic `services/` folder mein hai
- **Vendor isolation** — koi bhi vendor doosre ka product access/edit/delete nahi kar sakta
- **Price snapshot** — Order mein price tab ki store hoti hai jab order hua, baad mein product price change ho toh order affect nahi hota
- **Multer** — Max 5 images per product, local storage use hoti hai
- **Nodemon** — Backend `npm run dev` pe auto-restart hota hai file save karte hi

---

*Banaya gaya hai ek junior MERN developer ke learning purpose ke liye 🚀*
