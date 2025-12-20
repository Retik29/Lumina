# Lumina Project - Viva Questions & Answers

This document contains a list of likely questions external examiners (external) might ask during your viva, along with the correct technical answers based on your specific implementation of Lumina.

---

## 🏗️ General & Architecture

**Q1: What is the MERN stack, and why did you choose it?**
*   **Answer:** MERN stands for MongoDB, Express.js, React, and Node.js. I chose it because it allows for **full-stack development using a single language (JavaScript)** across client and server. It's efficient, has a huge ecosystem, and handles JSON data natively, which is perfect for our API-driven architecture.

**Q2: Explain the architecture of your application.**
*   **Answer:** It follows a **Client-Server architecture**.
    *   The **Frontend (Client)** is a Single Page Application (SPA) built with React that runs in the browser.
    *   The **Backend (Server)** is a REST API built with Node/Express.
    *   They communicate via **HTTP requests** (GET, POST, PATCH, DELETE) using JSON data.

**Q3: What is the difference between a Library and a Framework? (Context: React vs Express)**
*   **Answer:** React is a *library* because it focuses only on the UI; I have to choose other tools for routing (React Router) or state management. Express is a minimalist web *framework* that provides a structure for handling HTTP requests and middleware but leaves architectural choices to me.

---

## 🔐 Authentication & Security

**Q4: How does your Login system work?**
*   **Answer:** It uses **JWT (JSON Web Tokens)**.
    1.  User sends email/password.
    2.  Server verifies credentials.
    3.  If correct, Server signs a token (using a secret key) and sends it back.
    4.  Client stores this token in `localStorage`.
    5.  For future requests, the Client sends this token in the `Authorization` header.

**Q5: You are storing passwords. Is that safe?**
*   **Answer:** We never store plain text passwords. We use **`bcryptjs`** to **hash** passwords before saving them to MongoDB. Hashing is a one-way process; even if the database is leaked, the original passwords cannot be easily retrieved.

**Q6: What is the purpose of the [protect](file:///c:/Users/Harmeet/Documents/Lumina/server/middleware/authMiddleware.js#4-26) middleware I see in your routes?**
*   **Answer:** It acts as a security gatekeeper. It intercepts requests, checks for a valid JWT in the headers, verifies it, and attaches the user's details to the request object (`req.user`). If the token is missing or invalid, it blocks the request with a 401 Unauthorized error.

---

## 🗄️ Backend (Node/Express) & Database

**Q7: Explain the MVC pattern. Did you use it?**
*   **Answer:** Yes. MVC stands for Model-View-Controller.
    *   **Models:** (`/models`) Define database schemas (User, Appointment).
    *   **Controllers:** (`/controllers`) Handle legitimate logic (calculating stats, fetching data).
    *   **Routes** (which essentially act as the View/Director in API terms): Map URLs to controller functions.

**Q8: What is the difference between `req.body` and `req.query` or `req.params`?**
*   **Answer:**
    *   `req.body`: Contains data sent via POST/PUT methods (e.g., form data in `registerUser`).
    *   `req.params`: Captures dynamic parts of the URL (e.g., the ID in `/api/user/:id` is accessed via `req.params.id`).
    *   `req.query`: Captures URL query strings (e.g., `?search=term`).

**Q9: Why use MongoDB over SQL (like MySQL)?**
*   **Answer:** MongoDB is a **NoSQL** database. It stores data in JSON-like documents. This is beneficial for us because:
    *   **Flexibility:** We can easily add fields (like `speciality` for counselors only) without strict table migrations.
    *   **Scalability:** It handles large volumes of unstructured data well.

**Q10: Explain the relationship between Users and Appointments.**
*   **Answer:** It's a relationship handled by **Referencing**. The [Appointment](file:///c:/Users/Harmeet/Documents/Lumina/client/src/pages/StudentDashboard.jsx#23-35) schema stores the `ObjectId` of a Student (`userId`) and a Counselor (`counselorId`). We use `.populate()` in Mongoose to replace these IDs with actual user data when querying.

---

## ⚛️ Frontend (React)

**Q11: Why did you use `Vite` instead of Create-React-App?**
*   **Answer:** Vite is significantly faster. It uses native ES modules in the browser during development, meaning the server starts almost instantly, unlike Webpack-based CRA which bundles the entire app before starting.

**Q12: What is the `useEffect` hook doing in your Dashboard code?**
*   **Answer:** It handles **side effects**. In my Dashboard, I use `useEffect` with an empty dependency array `[]` to trigger an API call ([fetchAppointments](file:///c:/Users/Harmeet/Documents/Lumina/client/src/pages/StudentDashboard.jsx#23-35)) *once* when the component mounts (loads on the screen).

**Q13: How do you handle "Prop Drilling"?**
*   **Answer:** Prop drilling is passing data through many layers of components. While I use props for simple parent-child communication, for global issues like the "Toast" notifications or User Authentication state, I use simpler solutions like **Custom Hooks** ([useToast](file:///c:/Users/Harmeet/Documents/Lumina/client/hooks/use-toast.ts#171-190)) or **LocalStorage** to make data accessible where needed without passing it down manually 10 levels deep.

**Q14: What is the Virtual DOM?**
*   **Answer:** It's a lightweight copy of the actual DOM in memory. When state changes, React updates the Virtual DOM first, compares it with the previous version (Diffing), and efficiently updates *only* the changed elements in the real DOM. This makes the app faster.

---

## 🤖 AI & Advanced Features

**Q15: How does the Chatbot working?**
*   **Answer:**
    1.  The frontend sends the user's message to my backend.
    2.  My backend prepends a **System Prompt** (instructions telling the AI strictly to be a "mental health assistant").
    3.  It sends this context to the **Groq API** (running Llama 3 models).
    4.  The generated response is returned to the user.
    *   *Note:* The backend acts as a proxy to keep my API keys secure; the frontend never talks to Groq directly.

**Q16: How do you handle CORS errors?**
*   **Answer:** I installed the `cors` middleware in Express (`app.use(cors())`). This explicitly tells the browser that my backend (port 5000) allows requests from my frontend (port 5173). Without this, the browser security policy would block the interaction.

---

## 🐛 Debugging & Testing

**Q17: If the login fails, how do you debug it?**
*   **Answer:**
    1.  Check the **Network Tab** in Chrome DevTools to see the request payload and the response status (e.g., 401 vs 500).
    2.  Check the **Backend Console** for server logs (I use `console.log(error)` in my catch blocks).
    3.  Verify the JWT token in the **Application Tab** > LocalStorage.

**Q18: What are status codes 401, 403, and 500?**
*   **Answer:**
    *   **401:** Unauthorized (Who are you? - e.g., Wrong password).
    *   **403:** Forbidden (I know who you are, but you can't come in - e.g., Student trying to access Admin page).
    *   **500:** Internal Server Error (Something broke in my code/logic).
