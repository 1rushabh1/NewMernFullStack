# User Registration Endpoint Documentation

## POST `/users/register`

### Description

Registers a new user in the system. Accepts user details, validates them, hashes the password, and returns a JWT token upon successful registration.

### Request Body

Send a JSON object with the following structure:

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

Send a JSON object with the following structure:

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
