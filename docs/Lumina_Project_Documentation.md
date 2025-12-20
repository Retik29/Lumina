# Lumina Project Documentation

This document provides a comprehensive technical overview of the Lumina mental health support platform. It is designed to assist with your viva presentation by detailing every aspect of the system, from server-side logic to client-side interactions.

---

## 1. Project Overview & Architecture

**Lumina** is a full-stack web application designed to provide mental health support for students. It connects students with counselors, offers self-assessment tools, and provides an AI-powered chatbot for immediate support.

### **Tech Stack** (MERN)
-   **Frontend:** React (Vite 7.1), Tailwind CSS, Shadcn/ui
-   **Backend:** Node.js, Express.js (v5.2)
-   **Database:** MongoDB (using Mongoose v9.0)
-   **Authentication:** JWT (JSON Web Tokens)
-   **AI Integration:** Groq API (Llama 3.3 model)

### **Architecture: Client-Server Model**
The application follows a standard **Client-Server architecture**.
1.  **Client (Frontend):** Runs in the user's browser. It captures user actions (clicks, form submissions) and sends HTTP requests to the server.
2.  **Server (Backend):** Listens for these requests, processes them (logic, database access), and returns JSON responses.
3.  **Database:** Stores persistent data (Users, Appointments).

---

## 2. Backend Deep Dive (`/server`)

The backend is the "brain" of the application, handling logic, security, and data storage.

### **Key Dependencies (`package.json`)**
*   **`express`**: The web framework used to create the API server and routes.
*   **`mongoose`**: An Object Data Modeling (ODM) library that manages relationships between data and provides schema validation for MongoDB.
*   **`dotenv`**: Loads environment variables (like DB URI, API keys) from a `.env` file to keep secrets secure.
*   **`cors`**: (Cross-Origin Resource Sharing) Middleware that allows your frontend (likely running on port 5173) to communicate with your backend (running on port 5000). Without this, the browser would block the requests.
*   **`bcryptjs`**: Used for **hashing passwords**. We never store plain text passwords; `bcryptjs` turns them into secure strings that cannot be reversed.
*   **`jsonwebtoken`**: Generates and verifies **JWTs**. This is how we know a user is logged in.

### **Middleware Logic (`middleware/authMiddleware.js`)**
Middleware functions run *before* your route handlers.
*   **`protect`**: This is the gatekeeper.
    1.  Checks if the `Authorization` header starts with `Bearer`.
    2.  Extracts the token.
    3.  Verifies it using `jwt.verify(token, secret)`.
    4.  If valid, it **decodes** the token to get the user ID, fetches the user from DB (excluding password), and attaches it to `req.user`.
    5.  Calls `next()` to let the request proceed.
*   **`restrictTo`**: Handles Authorization (Roles).
    1.  Takes a list of allowed roles (e.g., `restrictTo('admin', 'counselor')`).
    2.  Checks if `req.user.role` is in that list.
    3.  If not, sends a 403 Forbidden error.

### **Internal Utilities (`utils/`)**
*   **`generateToken.js`**: Helper function to create JWTs. It signs a payload `{ id: user._id }` with the `JWT_SECRET` and sets an expiration (usually 30d).

### **Database Schema (`/models`)**
We use customizable Mongoose schemas to define the structure of our data.

#### **1. User Model (`models/User.js`)**
Stores all user types (Student, Counselor, Admin).
-   `name` (String): Full name.
-   `email` (String): Unique identifier.
-   `password` (String): Hashed password.
-   `role` (Enum: 'student', 'counselor', 'admin'): Defines what the user can do.
-   `speciality` & `credentials`: Optional fields, only used for Counselors.
-   `isApproved` (Boolean): Used for Counselor verification. Counselors cannot receive appointments until an Admin sets this to `true`.

#### **2. Appointment Model (`models/Appointment.js`)**
Connects a Student to a Counselor.
-   `userId`: Link to the Student (User model).
-   `counselorId`: Link to the Counselor (User model).
-   `date` & `time`: Scheduling details.
-   `concern`: Brief description of the issue.
-   `status` (Enum: 'pending', 'approved', 'rejected', 'completed'): Tracks the lifecycle of the booking.

### **API Connectivity & Routes (`/routes`)**
The server exposes RESTful API endpoints. All routes start with `/api`.

1.  **Auth Routes (`/api/auth`)**
    *   `POST /register`: Creates a new user. Hashes password.
    *   `POST /login`: Verifies email/password. Returns a JWT token.
    *   `GET /counselors`: Public endpoint to list available counselors.

2.  **Appointment Routes (`/api/appointment`)**
    *   `POST /book`: (Student only) Creates a new appointment request.
    *   `GET /my`: (Student only) Lists logged-in student's appointments.
    *   `GET /counselor`: (Counselor only) Lists appointments assigned to them.
    *   `PATCH /:id/status`: (Counselor only) Updates status.

3.  **Chatbot Routes (`/api/chatbot`)**
    *   `POST /message`: Sends user message to **Groq API** (Llama-3.3-70b model). Uses a custom "System Prompt" to ensure the AI acts as a mental health assistant.
    *   **Logic**: Captures conversation history (last 10 messages) for context awareness.

4.  **Admin Routes (`/api/admin`)**
    *   `GET /users`, `/pending-counselors`: Management lists.
    *   `PATCH /approve-counselor/:id`: Approve a counselor's account.

---

## 3. Frontend Deep Dive (`/client`)

The frontend is the "face" of the application, built for interactivity and user experience.

### **Key Dependencies**
*   **`vite`**: The build tool.
*   **`react-router-dom`**: Manages navigation (`v7.10`).
*   **`axios`**: HTTP client for API requests.
*   **`tailwindcss`**: Utility-first CSS framework.
*   **`lucide-react`**: Icon library.
*   **`shadcn/ui`**: (Radix UI + Tailwind) Reusable components like Cards, Buttons, and Tabs located in `@/components/ui`.

### **Custom Hooks**
*   **`use-toast.ts`**: A custom implementation (inspired by react-hot-toast) to manage toast notifications. It uses a reducer to handle actions like `ADD_TOAST`, `REMOVE_TOAST`. It powers the pop-up alerts you see for success/error messages.

### **Component Details**
-   **`App.jsx`**: The main entry point defining `<Routes>`.
-   **`Navbar/Footer`**: Global layout components.

#### **Feature Pages & Components**
1.  **Emergency (`pages/Emergency.jsx` + `components/emergency/Emergency.jsx`)**
    -   **Purpose**: Immediate help for crisis situations.
    -   **Features**: Displays critical hotlines (Jeevan Aastha, Tele-MANAS). Includes a "Quick Coping Techniques" section (5-4-3-2-1 Grounding, Box Breathing) implemented as static lists in the component.

2.  **Community (`pages/Community.jsx` + `components/community/Community.jsx`)**
    -   **Purpose**: Anonymous peer support.
    -   **State**: Uses `useState` to manage a list of `posts`.
    -   **Interactivity**: Users can "Like" posts (toggles a Set of liked IDs) and add new posts. Currently, this simulated locally for the demo but designed to connect to a backend.

3.  **Resources (`pages/Resources.jsx` + `components/resources/Resources.jsx`)**
    -   **Purpose**: Self-help library.
    -   **Tabs**: Uses `Tabs` component to switch between 'Meditation', 'Exercises', and 'Strategies'.
    -   **Search**: Implements real-time filtering. `filteredResources` function filters the static data array based on the `searchTerm` input.

4.  **Dashboards (`StudentDashboard.jsx`, `CounselorDashboard.jsx`)**
    -   **Purpose**: Role-specific views.
    -   **Logic**: `useEffect` runs on mount to `fetchAppointments`.
    -   **Conditional Rendering**: Shows different buttons (Approve/Reject) based on status and role.

### **API Integration (`lib/api.js`)**
We use a **centralized Axios instance** in `src/lib/api.js`.
*   **Base URL**: `http://localhost:5000/api`.
*   **Interceptors**: Automatically attaches the JWT from `localStorage` to every request header (`Authorization: Bearer ...`). This ensures seamless authentication across the app.

---

## 4. End-to-End Functionality Flows

### **Flow 1: User Registration & Login**
1.  **User** fills out the form on `Register.jsx`.
2.  **Frontend** sends `POST /api/auth/register` with form data.
3.  **Backend** checks if email exists. If not, it hashes the password and saves the User.
4.  **Backend** returns success.
5.  **User** goes to Login. Fills credentials.
6.  **Frontend** sends `POST /api/auth/login`.
7.  **Backend** compares the hashed password. If match, it signs a **JWT** and sends it back.
8.  **Frontend** receives the token and stores it in `localStorage` ('user' key).
9.  **Frontend** redirects user to the appropriate Dashboard based on `role`.

### **Flow 2: Booking an Appointment**
1.  **Student** logs in (Token is in storage).
2.  **Student** goes to Counseling page, selects a counselor.
3.  **Frontend** sends `POST /api/appointment/book` with `{ counselorId, date, time, concern }`.
    *   *Interceptor adds the Token header.*
4.  **Backend** (`protect` middleware) verifies the token. Adds `req.user` to the request object.
5.  **Backend** creates the Appointment document linking `req.user._id` (Student) and `counselorId`.
6.  **Counselor** logs in. Visits their Dashboard.
7.  **Frontend** fetches `GET /api/appointment/counselor`.
8.  **Backend** finds all appointments wherein `counselorId` matches the logged-in counselor. Use `.populate('userId')` to fill in the student's name/email details.
9.  **Counselor** clicks "Approve". Frontend sends specific PATCH request to update status.

### **Flow 3: AI Chatbot**
1.  **User** types a message in the Chatbot interface.
2.  **Frontend** sends `POST /api/chatbot/message` with the message text.
3.  **Backend** receives this. It constructs a prompt history including a **System Prompt** ("You are a mental health assistant...").
4.  **Backend** sends this to **Groq API**.
5.  **Groq** returns a generated text response.
6.  **Backend** sends this text back to Frontend.
7.  **Frontend** displays the AI's reply.

---

## 5. Potential Viva Questions & Answers

**Q: How do you handle security?**
**A:** We use **JWT** for stateless authentication so cookies aren't required. Passwords are never stored plainly; they are hashed with **Bcrypt**. We also use **CORS** to control who can access our API.

**Q: Why did you choose MongoDB/NoSQL?**
**A:** Our data structure (Users, Appointments) is flexible. MongoDB allows us to easily nest data or change schemas (like adding new fields to the Appointment model) without strict table migrations.

**Q: How does the Frontend know a user is logged in?**
**A:** We check for the presence of the `user` object (containing the token) in the browser's `localStorage` on initial load (`useEffect`).

**Q: What happens if the AI service fails?**
**A:** The backend `try-catch` block in `chatbotController` handles errors (like timeouts or invalid keys) and returns a friendly 500 error message to the client, preventing the server from crashing.
