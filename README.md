# 📝 Feedback Collector App

A full-stack feedback collection app built with **Vite + React**, styled using **Tailwind CSS + shadcn/ui**, and powered by **Netlify Functions** and **MongoDB**. Users can submit feedback, and admins can securely view all submissions after login.

---

## 🚀 Features

- ✅ User feedback form (name, email, message)
- 🔐 Admin login before accessing feedback list
- 🌗 Dark/light theme toggle
- 🕒 Timestamp for each submission
- ✔️ Form-level validation with user-friendly messages
- 🎯 Smooth animations and transitions
- 📱 Fully responsive design
- 🗃️ MongoDB Atlas for storage
- 🌍 Deployed on Netlify

---

## 🧱 Project Structure

```
feedback/
├── netlify/
│   └── functions/
│       ├── submit-feedback.js    # POST endpoint for feedback
│       └── get-feedbacks.js      # POST endpoint with admin auth
├── public/
├── src/
│   ├── components/
│   │   ├── FeedbackForm.tsx      # Feedback input form
│   │   ├── FeedbackList.tsx      # Admin feedback display
│   │   └── ThemeToggle.tsx       # Dark/light switch
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # React app entry point
│   └── index.css                 # Tailwind & global styles
├── .env                          # Secret variables (not committed)
├── netlify.toml                  # Netlify build/function settings
├── tailwind.config.ts
├── vite.config.ts
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🛠 Tech Stack

### Frontend

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

### Backend

- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 🔐 Admin Authentication

Before feedbacks can be viewed, admin credentials must be submitted.

Your `.env` file should contain:

```env
VITE_API_BASE_URL=/.netlify/functions
MONGODB_URI=your-mongodb-connection-uri
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
ADMIN_USERNAME=admin
```

> These credentials are checked via POST `/get-feedbacks`.

---

## 📦 Deployment Steps

### 1. Clone and Install

```bash
git clone https://github.com/Nishant0121/feedback.git
cd feedback
npm install
```

### 2. Add Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=/.netlify/functions
MONGODB_URI=your-mongodb-connection-uri
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin123
ADMIN_USERNAME=admin
```

### 3. Run Locally with Netlify CLI

```bash
npm install -g netlify-cli
netlify dev
```

Visit: `http://localhost:8888`

### 4. Deploy to Netlify

1. Push to GitHub
2. Go to [Netlify](https://netlify.com) and import from GitHub
3. Set:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

---

## 👤 Author Credit

Made with ❤️ by **Nishant Patil**
