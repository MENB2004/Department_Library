# Department Library Management System

A full-stack web application for managing academic resources, book circulations, and library history for the Computer Science department.

## 🚀 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (A running local instance or a MongoDB Atlas connection string)

---

## 📂 Project Structure

- `backend/`: Node.js/Express server logic and database models.
- `frontend/`: React/Vite application for the user interface.

---

## 🛠️ Setup & Installation

### 1. Extract the Project
Unzip the project file into your desired directory.

### 2. Backend Configuration
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (if it doesn't exist) and add your configuration:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *(Note: Use `npm run dev` if you have nodemon installed for development)*

### 3. Frontend Configuration
1. Open a **new** terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React application:
   ```bash
   npm run dev
   ```

---

## 🌐 Usage

Once both servers are running:
- The **Backend** will be accessible at `http://localhost:5001`.
- The **Frontend** will provide a URL in the terminal (usually `http://localhost:5173`). Open this in your browser to access the portal.

---

## 🔑 Default Roles & Access
The system supports the following roles:
- **Admin**: Full system control.
- **HOD**: Department and resource management.
- **Advisor**: Class-specific management and library access.
- **Faculty**: Academic resource view and recommendations.
- **Student**: Book browsing, syllabus exploration, and borrowing.

---

## 💰 Fine Policy
The system automatically calculates a fine of **₹2 per day** for any books returned after the designated due date.
