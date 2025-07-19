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

## MAP ROUTES

### GET /maps/get-suggested-places

**Description:**
Returns a list of suggested places based on a partial address or location input.

**Request Headers:**
- `address` (string, required): The partial address or location string to search for suggestions.
- `Authorization` (string, required): Bearer token for authentication.

**Response:**
- `200 OK`: Returns an array of suggested places.
  - Each item contains a `description` field with the place name or address.

**Example Response:**
```json
{
  "predictions": [
    { "description": "Connaught Place, Delhi, India" },
    { "description": "Connaught Circus, Delhi, India" }
  ]
}
```

**Errors:**
- `400 Bad Request`: Returns if the address header is missing or invalid.
  ```json
  { "message": "Address header is required" }
  ```
- `401 Unauthorized`: Returns if the authentication token is missing or invalid.
  ```json
  { "message": "Unauthorized" }
  ```

### GET /maps/get-distance-time

**Description:**
Returns the distance (in meters) and estimated duration (in seconds) between two locations.

**Request Query Parameters:**
- `pickup` (string, required): The pickup location address or coordinates.
- `destination` (string, required): The destination location address or coordinates.
- `Authorization` (string, required): Bearer token for authentication.

**Response:**
- `200 OK`: Returns the distance and duration between the two locations.
  - `distance` (number): Distance in meters.
  - `duration` (number): Duration in seconds.

**Example Response:**
```json
{
  "distance": 25300,
  "duration": 2712
}
```

**Errors:**
- `400 Bad Request`: Returns if pickup or destination is missing or invalid.
  ```json
  { "message": "Pickup and destination are required" }
  ```
- `401 Unauthorized`: Returns if the authentication token is missing or invalid.
  ```json
  { "message": "Unauthorized" }
  ```

---

## RIDE ROUTES

### GET /rides/get-fare

**Description:**
Calculates and returns the estimated fare for a trip between a pickup and destination location for all vehicle types.

**Request Query Parameters:**
- `pickup` (string, required): The pickup location address or coordinates.
- `destination` (string, required): The destination location address or coordinates.
- `Authorization` (string, required): Bearer token for authentication.

**Response:**
- `200 OK`: Returns the estimated fares for all vehicle types.
  - `car` (number): Estimated fare for car.
  - `auto` (number): Estimated fare for auto.
  - `motorcycle` (number): Estimated fare for motorcycle.

**Example Response:**
```json
{
  "car": 1151.57,
  "auto": 899.46,
  "motorcycle": 570.78
}
```

**Errors:**
- `400 Bad Request`: Returns if pickup or destination is missing or invalid.
  ```json
  { "message": "Pickup and destination are required" }
  ```
- `401 Unauthorized`: Returns if the authentication token is missing or invalid.
  ```json
  { "message": "Unauthorized" }
  ```

### POST /rides/create

**Description:**
Creates a new ride with the selected vehicle type, pickup, and destination.

**Request Body:**
- `pickup` (string, required): The pickup location address or coordinates.
- `destination` (string, required): The destination location address or coordinates.
- `vehicleType` (string, required): The type of vehicle selected (`car`, `auto`, or `motorcycle`).
- `user` (string, required): The user ID or user object.
- `Authorization` (string, required): Bearer token for authentication.

**Response:**
- `201 Created`: Returns the created ride object.
  - `user` (object): The user who created the ride.
  - `pickup` (string): The pickup location.
  - `destination` (string): The destination location.
  - `fare` (number): The fare for the selected vehicle type.
  - `distance` (number): The distance in kilometers.
  - `duration` (number): The duration in minutes.
  - `otp` (string): The OTP for the ride.

**Example Request:**
```json
{
  "pickup": "Connaught Place, Delhi",
  "destination": "Noida City Centre, Noida",
  "vehicleType": "car",
  "user": "60c72b2f9b1e8b001c8e4b8a"
}
```

**Example Response:**
```json
{
  "user": "60c72b2f9b1e8b001c8e4b8a",
  "pickup": "Connaught Place, Delhi",
  "destination": "Noida City Centre, Noida",
  "fare": 1151.57,
  "distance": 25.3,
  "duration": 45.2,
  "otp": "1234"
}
```

**Errors:**
- `400 Bad Request`: Returns if any required field is missing or invalid.
  ```json
  { "message": "Pickup, destination, and vehicle type are required" }
  ```
- `401 Unauthorized`: Returns if the authentication token is missing or invalid.
  ```json
  { "message": "Unauthorized" }
  ```