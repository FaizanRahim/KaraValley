# KaraValley Marketplace

Responsive React + Tailwind CSS freelancer marketplace with two separate account areas.

## Features
- Public Home, About Us, Services, Freelancers and Contact pages
- Founder mission section with editable founder image
- Freelancer registration and separate freelancer login
- Freelancer dashboard for profile editing and approval status
- Admin login and admin dashboard
- Admin can approve/reject/delete freelancers
- Only approved freelancers appear publicly
- Admin can edit brand, hero, mission, about, phone, email and theme colors
- Contact form messages appear in the admin inbox
- Responsive mobile/tablet/desktop design
- Data persists in browser localStorage

## Default admin login
- Email: `admin@KaraValley.com`
- Password: `Admin@123`

Change these in `src/store.js` before production.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Important production note
This package is fully functional as a front-end prototype and stores users, passwords, approvals, content and messages in browser localStorage. For a public production deployment, connect it to a secure backend/database (Supabase, Firebase, Node/PostgreSQL, etc.), hash passwords, and use server-side authentication. LocalStorage authentication is not secure for real customer data.
