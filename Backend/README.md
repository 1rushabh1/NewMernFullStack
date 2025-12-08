# User Registration Endpoint Documentation

## POST `/users/register`

### Description

Registers a new user in the system. Accepts user details, validates them, hashes the password, and returns a JWT token upon successful registration.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required, min 3 chars)
- `fullname.lastname` (string, optional, min 3 chars if provided)
- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 chars)

### Responses

- **201 Created**
  - Registration successful.
  - Returns: `{ "token": "<jwt_token>", "user": { ...userData } }`
- **400 Bad Request**
  - Validation failed or missing required fields.
  - Returns: `{ "errors": [ ... ] }`
- **500 Internal Server Error**
  - Unexpected server error.

### Example Request

```bash
curl -X POST http://localhost:PORT/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "securepassword"
  }'
```

---

# User Login Endpoint Documentation

## POST `/users/login`

### Description

Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required, must be a valid email)
- `password` (string, required, min 6 chars)

### Responses

- **200 OK**
  - Login successful.
  - Returns: `{ "token": "<jwt_token>", "user": { ...userData } }`
- **400 Bad Request**
  - Validation failed or missing required fields.
  - Returns: `{ "errors": [ ... ] }`
- **401 Unauthorized**
  - Invalid email or password.
  - Returns: `{ "message": "Invalid email or password" }`
- **500 Internal Server Error**
  - Unexpected server error.

### Example Request

```bash
curl -X POST http://localhost:PORT/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "securepassword"
  }'
```

---

# User Profile Endpoint Documentation

## GET `/users/profile`

### Description

Returns the authenticated user's profile information. Requires authentication via JWT token (sent as a cookie or Authorization header).

### Authentication

- Requires a valid JWT token in the `Authorization: Bearer <token>` header or as a `token` cookie.

### Responses

- **200 OK**
  - Returns the user profile as JSON.
- **401 Unauthorized**
  - Missing or invalid token.

### Example Request

```bash
curl -X GET http://localhost:PORT/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

# User Logout Endpoint Documentation

## GET `/users/logout`

### Description

Logs out the authenticated user by clearing the authentication cookie and blacklisting the JWT token.

### Authentication

- Requires a valid JWT token in the `Authorization: Bearer <token>` header or as a `token` cookie.

### Responses

- **200 OK**
  - Logout successful.
  - Returns: `{ "message": "Logged out successfully" }`
- **401 Unauthorized**
  - Missing or invalid token.

### Example Request

```bash
curl -X GET http://localhost:PORT/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

# Captain Registration Endpoint Documentation

## POST `/captains/register`

### Description

Registers a new captain (driver) in the system with vehicle details. Accepts captain and vehicle information, validates them, and creates a new captain account.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",      // string, required, min 3 chars
    "lastname": "Doe"         // string, optional, min 3 chars if provided
  },
  "email": "john.doe@example.com", // string, required, must be a valid email
  "password": "yourpassword",      // string, required, min 6 chars
  "vehicle": {
    "color": "Red",               // string, required, min 3 chars
    "plate": "ABC123",            // string, required, min 3 chars
    "capacity": 4,                // integer, required, min 1
    "vehicleType": "car"          // string, required, one of: "car", "motorcycle", "auto"
  }
}
```

### Successful Response

```json
{
  "token": "<jwt_token>", // JWT token for authentication
  "captain": {
    "_id": "64f1c2e4b8e4b2a1c2e4b8e4",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    // ...other captain fields...
  }
}
```

### Error Responses

**400 Bad Request**

```json
{
  "errors": [
    // Array of validation errors, e.g.:
    { "msg": "Invalid Email", "param": "email", "location": "body" }
  ]
}
// or
{
  "message": "Captain already exists"
}
```

**500 Internal Server Error**

```json
{
  "message": "Internal server error"
}
```

### Example Request

```bash
curl -X POST http://localhost:PORT/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "jane.smith@example.com",
    "password": "securepassword",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ789",
      "capacity": 2,
      "vehicleType": "motorcycle"
    }
  }'
```
