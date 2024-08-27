<div align="center">
    
  # Todo List API
  
  <img src="https://imgs.search.brave.com/4_9vkMJro_MQJM-Mnfme-ztBgKAYwH6GcTk1qrU-vZk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vZmljL2lt/YWdlcy9pY29ucy8y/NDQzL2J1bmNoX29m/X2Nvb2xfYmx1aXNo/X2ljb25zLzUxMi90/b2RvLnBuZz9mbXQ" height="100" alt="avatar" />
  
  [Overview](#🎯-overview) •
  [Features](#✨-features) •
  [Getting Started](#🚀-getting-started) •
  [Usage](#📘-usage) •
  [API](#📚-api)
  
  </div>
  
  ---
  
  ## 🎯 Overview
  
  The Todo List API is a RESTful API that allows users to manage their to-do lists. It provides endpoints for user registration, login, and CRUD operations for tasks. The API ensures that only authorized users can access and manage their to-do lists, with features like error handling, security measures, and proper data validation. This project is ideal for learning and practicing user authentication, schema design, RESTful API development, and more.
  
  ## ✨ Features
  
  - **User Authentication**: Secure user registration and login system with JWT-based authentication.
  - **Task Management**: Create, update, delete, and retrieve to-do items.
  - **Authorization**: Ensure that only authorized users can manage their tasks.
  - **Error Handling**: Robust error handling for invalid requests and unauthorized access.
  - **Data Validation**: Implement data validation for user inputs and requests.
  - **Pagination and Filtering**: Paginated and filterable endpoints for retrieving to-do items.
  
  ## 🚀 Getting Started
  
  To get a local copy up and running, follow these steps:
  
  ### Prerequisites
  
  Ensure you have the following installed:
  
  - Node.js
  - npm (Node Package Manager)
  - Git
  
  ### Installation
  
  1. Clone the repository:
  
     ```bash
     git clone https://github.com/hamza-140/todo-list-api.git
     cd todo-list-api
     ```
  
  2. Install dependencies:
  
     ```bash
     npm install
     ```
  
  3. Start the development server:
     ```bash
     node index.js
     ```
  
  ## 📘 Usage
  
  To use the API, make requests to the available endpoints using a tool like Postman or cURL. Here's an example of how to create a new to-do item:
  
  ```bash
  POST /todos
  Authorization: Bearer your-jwt-token
  
  {
    "title": "Buy groceries",
    "description": "Buy milk, eggs, and bread"
  }
  ```
  
  ## 📚 API
  
  This section documents the main endpoints of the API, including the required parameters, return values, and example requests.
  
  ### User Registration
  
  Register a new user:
  
  **Endpoint**: `POST /register`
  
  **Request Body**:
  
  ```json
  {
    "name": "John Doe",
    "email": "john@doe.com",
    "password": "password"
  }
  ```
  
  **Response**:
  
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
  ```
  
  ### User Login
  
  Authenticate a user:
  
  **Endpoint**: `POST /login`
  
  **Request Body**:
  
  ```json
  {
    "email": "john@doe.com",
    "password": "password"
  }
  ```
  
  **Response**:
  
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
  ```
  
  ### Create a To-Do Item
  
  Create a new to-do item:
  
  **Endpoint**: `POST /todos`
  
  **Headers**:
  
  ```json
  {
    "Authorization": "Bearer your-jwt-token"
  }
  ```
  
  **Request Body**:
  
  ```json
  {
    "title": "Buy groceries",
    "description": "Buy milk, eggs, and bread"
  }
  ```
  
  **Response**:
  
  ```json
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Buy milk, eggs, and bread"
  }
  ```
  
  ### Update a To-Do Item
  
  Update an existing to-do item:
  
  **Endpoint**: `PUT /todos/:id`
  
  **Headers**:
  
  ```json
  {
    "Authorization": "Bearer your-jwt-token"
  }
  ```
  
  **Request Body**:
  
  ```json
  {
    "title": "Buy groceries",
    "description": "Buy milk, eggs, bread, and cheese"
  }
  ```
  
  **Response**:
  
  ```json
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Buy milk, eggs, bread, and cheese"
  }
  ```
  
  ### Delete a To-Do Item
  
  Delete an existing to-do item:
  
  **Endpoint**: `DELETE /todos/:id`
  
  **Headers**:
  
  ```json
  {
    "Authorization": "Bearer your-jwt-token"
  }
  ```
  
  **Response**:
  
  - Status Code: `204 No Content`
  
  ### Get To-Do Items
  
  Retrieve a list of to-do items:
  
  **Endpoint**: `GET /todos?page=1&limit=10`
  
  **Headers**:
  
  ```json
  {
    "Authorization": "Bearer your-jwt-token"
  }
  ```
  
  **Response**:
  
  ```json
  {
    "data": [
      {
        "id": 1,
        "title": "Buy groceries",
        "description": "Buy milk, eggs, bread"
      },
      {
        "id": 2,
        "title": "Pay bills",
        "description": "Pay electricity and water bills"
      }
    ],
    "page": 1,
    "limit": 10,
    "total": 2
  }
  ```
  
  ---

## CC
https://roadmap.sh/projects/todo-list-api