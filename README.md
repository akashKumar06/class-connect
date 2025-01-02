# API Documentation

## Endpoints

### POST /api/users/register

Registers a new user.

#### Request Body

```json
{
  "username": "exampleuser",
  "email": "user@example.com",
  "password": "password123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

#### Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "user_id",
    "username": "exampleuser",
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "isCR": false,
    "class": "class_id",
    "avatar": "avatar_url",
    "folders": [],
    "files": [],
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```

### POST /api/users/login

Logs in an existing user using either username or email and password.

#### Request Body

```json
{
  "username": "exampleuser",
  "password": "password123"
}
// or
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response

```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "username": "exampleuser",
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "isCR": false,
    "class": "class_id",
    "avatar": "avatar_url",
    "folders": [],
    "files": [],
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```
