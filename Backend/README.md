# API Documentation

## POST /users/register

### Description
Registers a new user.

### Request Body
- `fullName` (object): The full name of the user.
  - `firstName` (string, required): The first name of the user.
  - `lastName` (string, optional): The last name of the user.
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user.

### Response
- `201 Created`: Returns the created user and an authentication token.
  - `token` (string): The authentication token.
  - `user` (object): The created user object.

### Example Request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4b8a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36F5l9e2y5K9E6y5K9E6y5K",
    "socketId": null
  }
}
```

### Validation Errors
- `400 Bad Request`: Returns validation errors if the request body is invalid.
  - `errors` (array): An array of validation error objects.
    - `msg` (string): The error message.
    - `param` (string): The parameter that caused the error.
    - `location` (string): The location of the parameter (e.g., "body").

### Example Validation Error Response
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## POST /users/login

### Description
Logs in an existing user.

### Request Body
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user.

### Response
- `200 OK`: Returns the authenticated user and an authentication token.
  - `token` (string): The authentication token.
  - `user` (object): The authenticated user object.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60c72b2f9b1e8b001c8e4b8a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Validation Errors
- `400 Bad Request`: Returns validation errors if the request body is invalid.
  - `errors` (array): An array of validation error objects.
    - `msg` (string): The error message.
    - `param` (string): The parameter that caused the error.
    - `location` (string): The location of the parameter (e.g., "body").

### Example Validation Error Response
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## GET /users/profile

### Description
Retrieves the profile of the authenticated user.

### Authentication
Requires a valid authentication token in the cookies.

### Response
- `200 OK`: Returns the user profile
  - `user` (object): The authenticated user's information

### Example Response
```json
{
  "_id": "60c72b2f9b1e8b001c8e4b8a",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

### Errors
- `401 Unauthorized`: Returns when the token is missing, invalid, or blacklisted
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## GET /users/logout

### Description
Logs out the current user by clearing their authentication token and blacklisting it.

### Authentication
Requires a valid authentication token in the cookies.

### Response
- `200 OK`: Returns a success message
  ```json
  {
    "message": "Logged Out"
  }
  ```

### Errors
- `401 Unauthorized`: Returns when the token is missing, invalid, or blacklisted
  ```json
  {
    "message": "Unauthorized"
  }
  ```