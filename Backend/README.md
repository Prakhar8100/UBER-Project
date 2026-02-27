# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description
Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user data.

### HTTP Method
'POST'

## Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
    // ...more errors
  ]
}
```

### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Error message"
}
```

## /users/login Endpoint Documentation

### Endpoint

`POST /users/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

### HTTP Method
'POST'

### Request Body
Send a JSON object with the following structure:

```
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example
```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "token": "<jwt_token>",
  "user": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
}
```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
```
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
    // ...more errors
  ]
}
```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Invalid email or password"
}
```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Error message"
}
```

## /users/profile Endpoint Documentation

### Endpoint

`GET /users/profile`

### Description
Retrieves the authenticated user's profile information. Requires a valid JWT token for authentication.

### HTTP Method
'GET'

### Authentication
- **Required:** Yes
- **Method:** Bearer Token (JWT)
- **Header:** `Authorization: Bearer <jwt_token>`

### Request Body
No body required.

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "_id": "<user_id>",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
  // ...other user fields
}
```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Unauthorized"
}
```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Error message"
}
```

## /users/logout Endpoint Documentation

### Endpoint

`GET /users/logout`

### Description
Logs out the authenticated user by invalidating their JWT token. The token is added to a blacklist to prevent further use.

### HTTP Method

'GET'

### Authentication
- **Required:** Yes
- **Method:** Bearer Token (JWT)
- **Header:** `Authorization: Bearer <jwt_token>`

### Request Body
No body required.

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
```
{
  "message": "Logged out successfully"
}
```

#### Authentication Error
- **Status Code:** `401 Unauthorized`
- **Body:**
```
{
  "message": "Unauthorized"
}
```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**
```
{
  "error": "Error message"
}
```

## Notes
- All fields are required unless specified otherwise.
- Passwords are securely hashed before storage.
- On success, a JWT token is returned for authentication in subsequent requests.
- The `/users/profile` endpoint requires authentication via JWT token.
- The `/users/logout` endpoint invalidates the JWT token by adding it to a blacklist.
