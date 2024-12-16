# **CourseHub**  

CourseHub is a full-stack web application designed to provide a seamless educational experience for learners worldwide. It allows users to **browse**, **purchase**, and **manage courses** effectively. With a responsive user interface, secure payment handling, and integrated tools such as an online JavaScript code editor, CourseHub simplifies learning and empowers users to enhance their skills efficiently.

---

## **Features**

### 1. **Browse and Explore**  
   - View **best-selling courses**, and explore topics across various domains.  
   - Filter and search courses to personalize your learning experience.  

### 2. **Cart Management**  
   - Add courses to your cart for quick checkout.  
   - Update, remove, or review courses seamlessly before purchasing.

### 3. **Online Code Editor**  
   - Practice **JavaScript** directly within the platform, offering real-time coding practice.  

### 4. **REST API Integration**  
   - Backend APIs ensure smooth communication and efficient data retrieval, enabling scalability for thousands of users.  

---

## **Technologies Used**

| Component         | Technology                      |
|-------------------|---------------------------------|
| **Frontend**      | HTML5, CSS, JavaScript, React.js, Bootstrap |
| **Backend**       | Node.js, Express.js             |
| **Database**      | MongoDB                         |
| **Authentication**| JSON Web Tokens (JWT)           |
| **Security**      | SSL/TLS with HTTPS              |
| **APIs**          | RESTful APIs                    |

---

## **Setup Instructions**

Follow these steps to set up and run CourseHub on your local machine:

### **1. Prerequisites**  
Ensure you have the following installed:  
- **Node.js** (v14 or higher)  
- **npm** (comes with Node.js)  
- **MongoDB** (local or cloud instance)  

---

### **2. Installation**  

1. **Clone the Repository**  
   Use Git to clone the project:  
   ```bash
   git clone https://github.com/MIRYALA-NEHA/comp5130.git
   cd coursehub
   ```

2. **Install Dependencies**  
   Install both frontend and backend dependencies:  
   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   - Create `.env` files for both backend and frontend.  

   **Backend `.env`:**  
   ```bash
   DATABASE_URI=mongodb+srv://nehamiryala:db123@student.ihlvm.mongodb.net/CourseHubDB?retryWrites=true&w=majority&appName=student
   PORT=8000
   JWT_SECRET=s3cR3t!k3y$C0urs3Hub2024!
   ```

   **Frontend `.env`:**  
   ```bash
   REACT_APP_API_BASE_URL=https://localhost:8000
   HTTPS=true
   SSL_CRT_FILE=../certs/coursehub.crt
   SSL_KEY_FILE=../certs/coursehub.key
   ```

4. **Start the Application**  
   Run the following command to start the application:  
   ```bash
   npm start
   ```

---

## **How to Access the Application**

- **Frontend**: [http://localhost:3000](http://localhost:3000)  
- **Backend API Docs**: [http://localhost:8000/api-docs](http://localhost:8000/api-docs)  

---

## **Project Structure**

The folder structure of the CourseHub project is as follows:

```
CourseHub/
├── client/          # React.js frontend code
│   ├── public/        # Public assets
│   └── src/           # React components and logic
├── /                  # Node.js backend code
├── .env               # Environment variables
├── package.json       # Root package configuration
└── README.md          # Project documentation
```

---

## **Troubleshooting**

### 1. **Dependencies Not Installing**
   If you encounter issues with dependencies, run:  
   ```bash
   npm cache clean --force
   npm install
   ```

### 2. **Frontend/Backend Not Starting**
   - Verify `.env` files are configured properly.  
   - Ensure MongoDB is running locally or cloud URI is accessible.  

### 3. **Security Vulnerabilities**
   Fix security vulnerabilities with:  
   ```bash
   npm audit fix
   ```
