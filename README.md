
# Todo App

A simple and effective Todo application that helps users manage their tasks efficiently. This project includes both a backend API and a frontend interface.

## Backend

The backend of the Todo App is built using [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/). It provides a RESTful API to manage todos.

### Features

-   **Create Todos**: Add new tasks to your todo list.
-   **Read Todos**: Retrieve and view your tasks.
-   **Update Todos**: Edit existing tasks.
-   **Delete Todos**: Remove tasks from your list.

### Setup

To set up the backend, follow these steps:

1.  **Clone the Repository**
    
    ```bash
    git clone https://github.com/sahaniindrajit/todo-app.git
    ```
    
2.  **Navigate to the Backend Directory**
    
    ```bash
    cd todo-app/backend
    ```
3.  **Install Dependencies**
    
    ```bash   
    npm install bcrypt cookie-parser cors dotenv express jsonwebtoken mongoose zod nodemon
    ```
4.  **Set Up Environment Variables**
    
    Create a `.env` file in the `backend` directory with the following content (update with your own values):
    ```bash   
    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    JWT_PASSWORD=your-secrt
    ```

    
5.  **Start the Server**
    
    ```bash
    npm run dev 
    ```
    The backend server will be running on `http://localhost:8000`.
    

## Frontend

The frontend of the Todo App is designed to provide a unique user experience. I am currently working on creating a distinctive and engaging design for the application. As I am still learning and experimenting with various technologies, the frontend is under active development.

