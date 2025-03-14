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