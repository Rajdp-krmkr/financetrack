# 🐖 FinanceTrack - Personal Finance Visualizer

## 🚀 Overview

FinanceTrack is a powerful personal finance management application that helps users track their income, expenses, and budget effectively. Built with Next.js, MongoDB, and Tailwind CSS, this app provides seamless transaction handling and budgeting to ensure financial stability.

## 🎯 Features

- 📊 **Track Transactions** - Add, edit, and delete transactions with ease.
- 💰 **Budget Management** - Set budgets for different categories and monitor your spending.
- 🔍 **Real-Time Data Updates** - Transactions automatically update your budget.
- 🛠 **Secure and Scalable** - Built with MongoDB and Next.js API routes.
- 📅 **Sort & Filter Transactions** - View transactions by date, category, and amount.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: NextAuth.js (Future implementation)

## 📂 Folder Structure

```
📂 financetrack
 ┣ 📂 app
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📂 transactions
 ┃ ┃ ┃ ┗ 📜 route.js    # API route for transaction handling
 ┣ 📂 models
 ┃ ┣ 📜 Transaction.js # Mongoose schema for transactions
 ┃ ┣ 📜 Budget.js      # Mongoose schema for budget
 ┣ 📂 lib
 ┃ ┣ 📜 dbConnect.js   # MongoDB connection utility
 ┣ 📜 package.json
 ┣ 📜 README.md
```

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/financetrack.git
cd financetrack
```

### 2️⃣ Install Dependencies

```bash
npm install  # or yarn install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file and configure your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
```

### 4️⃣ Run the Development Server

```bash
npm run dev  # or yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🔧 API Endpoints

### 📌 `GET /api/transactions`

Fetch all transactions sorted by date.

### 📌 `POST /api/transactions`

Create a new transaction and update the budget.

### 📌 `PUT /api/transactions`

Update an existing transaction and adjust the budget accordingly.

### 📌 `DELETE /api/transactions`

Delete a transaction and subtract the amount from the budget.

## 🔥 Contributing

We welcome contributions! Feel free to fork the repository and submit a pull request.

## 🤝 Connect with Us

📧 Email: rajdeepkarmakar2027@gmail.com

🌐 Website: [https://financetrack-six.vercel.app/](https://financetrack-six.vercel.app/)
