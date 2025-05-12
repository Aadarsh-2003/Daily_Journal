
# 📝 Daily Journal App

A full-stack **MERN (MongoDB, Express, React, Node.js)** application that allows users to manage their personal journal entries with an intuitive UI. Users can **create**, **view**, **update**, **delete**, **search**, **filter**, and **sort** their daily journal entries.

---

## 🔍 Features

- ➕ **Create** new journal entries
- 📖 **Read** all entries in a clean table layout
- ✏️ **Update** existing entries
- ❌ **Delete** unwanted entries
- 🔎 **Search** entries by title
- 📆 **Filter** entries by selected date
- 🗂️ **Sort** entries by:
  - A-Z
  - Z-A
  - Newest to Oldest
  - Oldest to Newest
- 📊 UI with entry details view via modal popup

---

## 🧰 Tech Stack

- **Frontend:** React, React Router, Axios, DatePicker, Tailwind CSS 
- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose ODM)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/daily-journal-app.git
cd daily-journal-app
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=your_port_number
```

Then start the server:

```bash
npm start
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## ⭐️ Show your support

If you like this project, give it a ⭐
