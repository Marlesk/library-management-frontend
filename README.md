# 📚 Library Management Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Frontend for the **Library Management System**, built with **React.js (Vite)**.  
This application provides a user-friendly interface for both **users** and a single **admin**, interacting with the backend API.

---

## ✨ Features

### 👤 User
- Register and Login (supports **Google Login**).
- View detailed book information (availability, metadata).
- Request **one book at a time** and receive a **borrow code** to collect it from the library.
- Track borrowing history (Requested → Borrowed → Returned).
- Manage profile:
  - Update email
  - Delete account
- Send messages via the **contact form** (no login required).

### 🛠️ Admin
- **Single admin user** (predefined in the database).
- Manage books:
  - Add manually or via **Google Books API**
  - View, edit, delete, and search by title
- Manage users:
  - View and search users (by username/email)
  - Delete accounts
- Manage borrowing requests:
  - Approve requests with borrow code (Request → Borrow)
  - Update status from Borrow → Return using ISBN
- View all messages from the contact form.
- View own profile (cannot edit or delete).

### 📱 Responsive design 
  - User dashboard works on both desktop and mobile.  
  - Admin dashboard is optimized for desktop only.

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Marlesk/library-management-frontend.git
cd library-management-frontend
```
Install dependencies:

``` bash
npm install
```

Run development server:

``` bash
npm run dev
```

Build for production:

``` bash
npm run build
```

Preview production build:

``` bash
npm run preview
```

## 🔑 Environment Variables

Create a .env file in the root directory and add the following:

``` env
VITE_API_URL = your-backend-api-url
VITE_GOOGLE_CLIENT_ID = your-google-client-id
```

## 🧪 Demo Database

A **demo database** is provided to let you explore the application safely.

- The **demo admin account** is already created:
  - Username: `admin`
  - Password: `Demo123!`
- All other data (books, users) is **not pre-filled**, so you will need to:
  - Add books manually or via Google API
  - Register user accounts 
  - Make requests and test features
- The **demo database resets every 3 days**, so all data except the demo admin will be deleted automatically.

👉 Link to live demo: [Demo Frontend](https://libraryappdemofrontend.vercel.app)

## 🚀 Production Environment

- The production environment connects to the **real library database**.  
- A **real admin** already exists, but credentials are **not shared**.  
- Books already exist in the database.  
- Users can only:
  - Register new account
  - Log in
  - View available books
  - Make a request (borrow)
- Users **cannot see or edit admin data**.

👉 Link to production: [Production Frontend](https://libraryappfrontend.vercel.app)

## 🔗 Related Projects

- [Library Management Backend](https://github.com/Marlesk/library-management-backend.git)

## 👨‍💻 Author

Developed by **Maria Leska**.
Feel free to connect or open issues in this repository.