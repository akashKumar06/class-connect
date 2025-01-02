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

### GET /api/users/profile

Get the current user's profile. Requires authentication.

#### Headers

```json
{
  "Authorization": "Bearer jwt_token"
}
```

#### Response

```json
{
  "success": true,
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

### GET /api/users/logout

Logout the current user. Requires authentication.

#### Headers

```json
{
  "Authorization": "Bearer jwt_token"
}
```

#### Response

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

### PATCH /api/users/update-avatar

Update user's avatar. Requires authentication.

#### Headers

```json
{
  "Authorization": "Bearer jwt_token",
  "Content-Type": "multipart/form-data"
}
```

#### Request Body

```
Form Data:
  avatar: File
```

#### Response

```json
{
  "success": true,
  "message": "avatar updated successfully",
  "user": {
    "_id": "user_id",
    "username": "exampleuser",
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "avatar": "new_avatar_url",
    "isCR": false,
    "class": "class_id",
    "folders": [],
    "files": [],
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```

### PATCH /api/users/update-password

Update user's password. Requires authentication.

#### Headers

```json
{
  "Authorization": "Bearer jwt_token"
}
```

#### Request Body

```json
{
  "oldPassword": "current_password",
  "newPassword": "new_password",
  "confirmPassword": "new_password"
}
```

#### Response

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```
