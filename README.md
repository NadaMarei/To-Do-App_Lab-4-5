# To-Do-App
This is a simple to-do list application built using Node.js, Express, and MongoDB. With authentcation, authorization and .env file to store sensitive data.

## Installation
1- Clone the repository.<br>
2- Install the dependencies.<br>
3- Create a `.env` file in the project root directory and add the MongoDB connection string and port.<br>
4- Start the server.<br>


## Usage
### Creating a Task

To create a new task, send a `POST` request to `/tasks` with a JSON payload containing the title of the task.<br>

### Retrieving Tasks

To retrieve a list of all tasks, send a `GET` request to `/tasks`.<br>
To retrieve a single task, send a `GET` request to `/tasks/:id`, replacing `:id` with the ID of the task.

### Updating a Task

To update a task, send a `PUT` request to `/tasks/:id` with a JSON payload containing the updated properties of the task.<br>

### Deleting a Task

To delete a task, send a `DELETE` request to `/tasks/:id`.<br>


## Authentication and Authorization

This application includes authentication and authorization using JSON Web Tokens (JWTs).
To create a new user, send a `POST` request to `/users` with a JSON payload containing the `username` and `password` of the user.
To authenticate a user, send a `POST` request to `/auth` with a JSON payload containing the `username` and `password` of the user.
The server will respond with a JWT that can be used to access protected endpoints.

### Protected endpoints include:

`/tasks`     - All tasks <br>
`/tasks/:id` - A single task <br>
`/users`     - All users (admin only) <br>
`/users/:id` - A single user (admin only) <br>

To grant admin privileges to a user, send a `PUT` request to `/users/:id` with a JSON payload containing `isAdmin: true`.
