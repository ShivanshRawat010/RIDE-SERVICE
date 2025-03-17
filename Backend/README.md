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

## POST /captains/register

### Description
Registers a new captain.

### Request Body
- `fullName` (object): The full name of the captain
  - `firstName` (string, required): The first name of the captain
  - `lastName` (string, optional): The last name of the captain
- `email` (string, required): The email address of the captain
- `password` (string, required): The password for the captain
- `vehicle` (object, required): The vehicle details
  - `color` (string, required): Color of the vehicle
  - `plate` (string, required): License plate number
  - `capacity` (number, required): Vehicle capacity (minimum: 1)
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'bike', or 'auto')

### Response
- `201 Created`: Returns the created captain and an authentication token
  - `token` (string): The authentication token
  - `captain` (object): The created captain object

### Example Request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Smith"
  },
  "email": "john.smith@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC-123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60c72b2f9b1e8b001c8e4b8a",
    "fullName": {
      "firstName": "John",
      "lastName": "Smith"
    },
    "email": "john.smith@example.com",
    "password": "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Validation Errors
- `400 Bad Request`: Returns validation errors if the request body is invalid
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
- `400 Bad Request`: Returns error if captain already exists
  ```json
  {
    "message": "Captain already exists"
  }
  ```

## POST /captains/login

### Description
Logs in an existing captain.

### Request Body
- `email` (string, required): The email address of the captain
- `password` (string, required): The password for the captain

### Response
- `200 OK`: Returns the authenticated captain and an authentication token
  - `token` (string): The authentication token
  - `captain` (object): The authenticated captain object

### Example Request
```json
{
  "email": "john.smith@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60c72b2f9b1e8b001c8e4b8a",
    "fullName": {
      "firstName": "John",
      "lastName": "Smith"
    },
    "email": "john.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Errors
- `401 Unauthorized`: Returns when credentials are invalid
  ```json
  {
    "message": "Invalid credentials"
  }
  ```
- `400 Bad Request`: Returns validation errors if email format is invalid
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

## GET /captains/profile

### Description
Retrieves the profile of the authenticated captain.

### Authentication
Requires a valid authentication token in the cookies.

### Response
- `200 OK`: Returns the captain profile
  - `captain` (object): The authenticated captain's information

### Example Response
```json
{
  "_id": "60c72b2f9b1e8b001c8e4b8a",
  "fullName": {
    "firstName": "John",
    "lastName": "Smith"
  },
  "email": "john.smith@example.com",
  "status": "inactive",
  "vehicle": {
    "color": "Black",
    "plate": "ABC-123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Errors
- `401 Unauthorized`: Returns when the token is missing, invalid, or blacklisted
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## GET /captains/logout

### Description
Logs out the current captain by clearing their authentication token and blacklisting it.

### Authentication
Requires a valid authentication token in the cookies.

### Response
- `200 OK`: Returns a success message
  ```json
  {
    "message": "Logged out"
  }
  ```

### Errors
- `401 Unauthorized`: Returns when the token is missing, invalid, or blacklisted
  ```json
  {
    "message": "Unauthorized"
  }
  ```