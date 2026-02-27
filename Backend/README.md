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
    { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }
    // additional errors…
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
    { "msg": "Error message", "param": "field_name", "location": "body" }
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

## Captain Routes

### POST /captains/register

**Description**  
Registers a new captain (driver) with vehicle details.

**HTTP Method**  
`POST`  
**URL** `/captains/register`  
**Authentication** Not required.

**Request Body (JSON)**  
```json
{
  "fullname": {                      // object: first and last name
    "firstname": "string",           // min 3 chars, required
    "lastname": "string"             // min 3 chars, required
  },
  "email": "string",                 // valid email, required
  "password": "string",              // min 6 chars, required
  "vehicles": {
    "color": "string",               // min 3 chars, required
    "plate": "string",               // min 6 chars, required
    "capacity": 0,                   // number ≥ 1, required
    "vehicleType": "string"          // one of: "car","motorcycle","auto rickshaw", required
  }
}
```

Example Request
```
POST /captains/register
Content-Type: application/json

{
  "fullname": { "firstname": "Alice", "lastname": "Smith" },
  "email": "alice.smith@example.com",
  "password": "securePassword123",
  "vehicles": {
    "color": "Blue",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

Validation Rules (as implemented)
- fullname.firstname: string, min length 3
- fullname.lastname: string, min length 3
- email: valid email
- password: min length 6
- vehicles.color: string, min length 3
- vehicles.plate: string, min length 6
- vehicles.capacity: integer >= 1
- vehicles.vehicleType: one of 'car', 'motorcycle', 'auto rickshaw'

Success Response
- Status: 201 Created
- Body:
```
{
  "token": "<jwt_token>",            // JWT used for future auth
  "captain": {
    "_id": "<captain_id>",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice.smith@example.com",
    "vehicles": {
      "color": "Blue",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
    // other fields: status, role, etc.
  }
}
```

Validation Error
- Status: 400 Bad Request
- Body:
```
{
  "errors": [
    { "msg": "Error message", "param": "field_name", "location": "body" }
    // ...
  ]
}
```

Duplicate Email
- Status: 400 Bad Request
- Body:
```
{ "error": "Captain with this email already exists" }
```

Server Error
- Status: 500 Internal Server Error
- Body:
```
{ "error": "Error message" }
```

POST /captains/login
Description
Authenticates a captain and returns a JWT token.

HTTP Method
POST
URL /captains/login
Authentication Not required.

Request Body
{
  "email": "string",               // valid email, required
  "password": "string"             // min 6 chars, required
}

Example
{
  "email": "alice.smith@example.com",
  "password": "securePassword123"
}

Responses
{
  "token": "<jwt_token>",
  "captain": {
    "_id": "<captain_id>",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice.smith@example.com"
    // password omitted
  }
}

400 Bad Request (validation error)
{ "errors": [ /* …same format as above… */ ] }
400 Bad Request (invalid credentials)
{ "error": "Invalid email or password" }
500 Internal Server Error
{ "error": "Error message" }


GET /captains/profile
Description
Returns authenticated captain’s profile.

HTTP Method
GET
URL /captains/profile
Authentication Required (Bearer token).

Request Body
None.

Responses
-200 OK
{
  "_id": "<captain_id>",
  "fullname": { "firstname": "Alice", "lastname": "Smith" },
  "email": "alice.smith@example.com",
  "vehicles": { /* … */ },
  "status": "available",
  "role": "captain"
}

-401 Unauthorized
{ "message": "Unauthorized access" }


GET /captains/logout
Description
Invalidates the token by adding it to blacklist, clears cookie.

HTTP Method
GET
URL /captains/logout
Authentication Required (Bearer token).

Request Body
None.

Responses

-200 OK
{ "message": "Logged out successfully" }

-401 Unauthorized
{ "message": "Unauthorized access" }


Notes
- Passwords are hashed before storage via the model/service.
- Register returns a JWT token generated by the captain model.
- Vehicle type spelling must match the validator ('auto rickshaw'); update routes/validators if you prefer 'auto rikshaw' spelling.
- Add further captain endpoints (login, profile, status updates) as implemented in controllers/routes when available.

