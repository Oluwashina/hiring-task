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
- **SQL**
- **Other libraries/frameworks** (add as applicable)

### Frontend
- **React.js**
- **CSS Framework** (TailwindCss)

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm (>= 8.x) or yarn
- MySQL (if used in the backend)

---

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     DB_TYPE = "mysql"
     DB_HOST = "localhost"
     DB_USERNAME = "root"
     DB_PASSWORD = 
     DB_PORT = 3306
     DB_NAME = "todo_list"
     PORT = 8000
     SECRET_KEY = "todo_list"
     EXPIRE_TIME = 3600
     ```

4. Start the server:
   ```bash
   yarn run dev
   ```

5. The backend server should now run at `http://localhost:8000`.

6. The Postman API Documentation is at `https://documenter.getpostman.com/view/8738176/2sAYJ7fJac`.

---

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the React development server:
   ```bash
   yarn start
   ```

4. The frontend app should now be running at `http://localhost:3000`.

---

## Scripts

### Backend
- `yarn run dev` - Starts the server in development mode (if applicable).

### Frontend
- `yarn start` - Starts the React development server.
- `yarn run build` - Builds the production-ready frontend application.
