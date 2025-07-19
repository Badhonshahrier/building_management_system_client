#  Building Management System

A full-featured apartment/building management web application with user authentication, role-based access control, rent payments, coupon system, and announcement management.

##  Live URL
 [View Live Project](https://building-management-auth-61215.web.app/apartment)

---

##  Purpose

This project is built to streamline building management operations such as:
- Managing tenants (users & members)
- Rent collection and payment tracking
- Applying and managing discount coupons
- Posting important announcements
- Admin dashboard for centralized control

---

##  Key Features

###  Authentication & Roles
- Firebase Authentication (Email & Password)
- Role-based routing: `user`, `member`, and `admin`
- Protected dashboard views based on roles

###  Payment System
- Integrated Stripe for secure rent payments
- Discount coupon support with dynamic calculation
- Payment history tracking

###  Agreement Management
- Users can request agreements
- Admins can approve/decline agreement requests
- Members can view active agreements

###  Announcements
- Admins can create announcements
- All roles can view current announcements

###  Coupon System
- Admins can add/manage discount coupons
- Members can apply valid coupon codes for rent discounts

###  Apartment Info & Location
- Map section using Leaflet.js
- Landmarks and contact details provided

---

##  Tech Stack & Tools

###  Frontend
- **React.js** (with Vite)
- **React Router**
- **Tailwind CSS** + **DaisyUI**
- **Lottie** (for animations)
- **React Icons**
- **SweetAlert2** (user alerts)
- **Axios** (HTTP requests)

###  Backend
- **Express.js**
- **MongoDB**
- **Stripe Payment API**

###  NPM Packages Used

```bash
npm install axios react-router-dom firebase sweetalert2 react-icons lottie-react leaflet @stripe/react-stripe-js @stripe/stripe-js
