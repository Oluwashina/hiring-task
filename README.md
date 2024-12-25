# Home Assignment: Todo List Application

This repository is a **monorepo** containing both the backend and frontend code for the Hiring Task project. It is organized as follows:

```
hiring-task/
  ├── backend/   # Contains backend (server-side) code
  ├── frontend/  # Contains frontend (client-side) code
```

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

### Backend
The `backend` folder contains the server-side code. It is responsible for handling API requests, managing business logic, and database interactions.

### Frontend
The `frontend` folder contains the client-side React application. It is responsible for providing a user interface and consuming APIs from the backend.

---

## Technologies Used

### Backend
- **Node.js**
- **Express.js**
- **SQL** (or any database of your choice)
- **Other libraries/frameworks** (add as applicable)

### Frontend
- **React.js**
- **CSS Framework** (e.g., Tailwind, Bootstrap)

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm (>= 8.x) or yarn
- MongoDB (if used in the backend)

---

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     PORT=5000
     DATABASE_URL=<your_database_url>
     ```

4. Start the server:
   ```bash
   npm start
   ```

5. The backend server should now run at `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. The frontend app should now be running at `http://localhost:3000`.

---

## Scripts

### Backend
- `npm run dev` - Starts the server in development mode (if applicable).

### Frontend
- `npm start` - Starts the React development server.
- `npm run build` - Builds the production-ready frontend application.
