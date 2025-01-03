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

### POST /folders/create-folder

Create a new folder. Requires authentication.

#### Headers

```json
{
  "Authorization": "Bearer jwt_token"
}
```

#### Request Body

```json
{
  "name": "New Folder"
}
```

#### Response

```json
{
  "success": true,
  "message": "Folder created successfully.",
  "folder": {
    "_id": "folder_id",
    "name": "New Folder",
    "parent": null,
    "folders": [],
    "files": [],
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```

### GET /folders/

Get all folders and files of the current user. Requires authentication.

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
  "folders": [
    {
      "_id": "folder_id",
      "name": "Folder 1",
      "parent": null,
      "folders": [],
      "files": [],
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  ],
  "files": [
    {
      "_id": "file_id",
      "parent": null,
      "format": "jpg",
      "resource_type": "image",
      "url": "file_url",
      "original_filename": "file_name",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  ]
}
```

### GET /folders/:id

Get a folder by its ID. Requires authentication.

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
  "folder": {
    "_id": "folder_id",
    "name": "Folder 1",
    "parent": null,
    "folders": [],
    "files": [],
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```

### GET /folders/hierarchy/:id

Get the hierarchy of a folder by its ID. Requires authentication.

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
  "array": [
    {
      "name": "Root Folder",
      "id": "root_folder_id"
    },
    {
      "name": "Sub Folder",
      "id": "sub_folder_id"
    }
  ]
}
```

### POST /files/

Upload a new file. Requires authentication.

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
  file: File
```

#### Response

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "newFile": {
    "_id": "file_id",
    "parent": null,
    "format": "jpg",
    "resource_type": "image",
    "url": "file_url",
    "original_filename": "file_name",
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```

### POST /api/classes

Create a new class. Requires authentication.

#### Headers

```json
{
  "Authorization": "Bearer jwt_token"
}
```

#### Request Body

```json
{
  "name": "Class Name",
  "startYear": 2023,
  "endYear": 2024,
  "department": "Department Name"
}
```

#### Response

```json
{
  "success": true,
  "message": "Class created successfully",
  "data": {
    "_id": "class_id",
    "name": "Class Name",
    "startYear": 2023,
    "endYear": 2024,
    "department": "Department Name",
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```

### GET /api/classes

Get all classes. Requires authentication.

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
  "classes": [
    {
      "_id": "class_id",
      "name": "Class Name",
      "startYear": 2023,
      "endYear": 2024,
      "department": "Department Name",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    }
  ]
}
```

### GET /api/classes/:id

Get a class by its ID. Requires authentication.

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
  "message": "Class fetched successfully",
  "data": {
    "class": {
      "_id": "class_id",
      "name": "Class Name",
      "startYear": 2023,
      "endYear": 2024,
      "department": "Department Name",
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z"
    },
    "students": [
      {
        "_id": "student_id",
        "username": "student_username",
        "email": "student@example.com",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "class": "class_id",
        "avatar": "avatar_url",
        "createdAt": "2023-10-01T00:00:00.000Z",
        "updatedAt": "2023-10-01T00:00:00.000Z"
      }
    ]
  }
}
```

### PATCH /api/classes/:id

Edit a class by its ID. Requires authentication.

#### Headers

```json
{
  "Authorization": "Bearer jwt_token"
}
```

#### Request Body

```json
{
  "name": "Updated Class Name",
  "startYear": 2023,
  "endYear": 2024,
  "department": "Updated Department Name"
}
```

#### Response

```json
{
  "success": true,
  "message": "Class updated successfully",
  "data": {
    "_id": "class_id",
    "name": "Updated Class Name",
    "startYear": 2023,
    "endYear": 2024,
    "department": "Updated Department Name",
    "createdAt": "2023-10-01T00:00:00.000Z",
    "updatedAt": "2023-10-01T00:00:00.000Z"
  }
}
```

### DELETE /api/classes/:studentId

Remove a student from a class. Requires authentication.

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
  "message": "Student removed from class successfully"
}
```

### PATCH /api/classes/:classId/:studentId

Add a student to a class. Requires authentication.

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
  "message": "Student added to class successfully"
}
```
