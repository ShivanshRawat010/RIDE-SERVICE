# Backend

This is the backend for the Uber Clone application. It is built using Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Navigate to the `Backend` folder
3. Install the dependencies

```sh
npm install
```

4. Create a `.env` file in the `Backend` folder and add the following environment variables:

```
MONGODB_URI=<your_mongodb_uri>
TOKEN_SECRET=<your_jwt_secret>
PORT=<your_port>
```

### Running the Server

```sh
npm start
```

The server will start on the port specified in the `.env` file.

## API Endpoints

### User Registration

#### Endpoint

`POST /users/register`

#### Description

Registers a new user.

#### Request Body

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Response

```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Example

```sh
curl -X POST http://localhost:<your_port>/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}'
```

### Error Handling

If there are validation errors, the response will be:

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

If any required fields are missing, the response will be:

```json
{
  "errors": [
    {
      "msg": "All fields are required"
    }
  ]
}
```