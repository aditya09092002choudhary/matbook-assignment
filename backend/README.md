# Dynamic Form Builder - Backend

## Overview
REST API backend for the dynamic form builder system built with Node.js and Express.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: In-memory
- **CORS**: Enabled for frontend communication

## Project Structure
```
backend/
├── src/
│   ├── server.js              # Entry point
│   ├── routes/
│   │   └── formRoutes.js      # API routes
│   ├── controllers/
│   │   ├── schemaController.js       # Schema endpoints
│   │   └── submissionController.js   # Submission endpoints
│   ├── middleware/
│   │   ├── validation.js      # Request validation
│   │   └── errorHandler.js    # Error handling
│   ├── store/
│   │   └── submissionStore.js # In-memory storage
│   └── data/
│       └── formSchema.js      # Form schema definition
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed

### Installation
```bash
cd backend
npm install
```

### Running the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### 1. GET /api/form-schema
Returns the Employee Onboarding form schema.

**Response**: 200 OK
```json
{
  "title": "Employee Onboarding Form",
  "description": "...",
  "fields": [...]
}
```

### 2. POST /api/submissions
Submit form data.

**Request Body**: Form data matching schema
**Response**: 201 Created (success) or 400 Bad Request (validation errors)

Success:
```json
{
  "success": true,
  "id": "SUB-000001",
  "createdAt": "2024-11-29T10:30:00.000Z"
}
```

Error:
```json
{
  "success": false,
  "errors": {
    "email": "Email Address is required",
    "age": "Age must be at least 18"
  }
}
```

### 3. GET /api/submissions
Get paginated submissions with optional search.

**Query Parameters**:
- `page` (default: 1)
- `limit` (default: 10, max: 100)
- `sortBy` (default: createdAt)
- `sortOrder` (asc/desc, default: desc)
- `search` (optional: search term)

**Response**: 200 OK
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 42,
    "itemsPerPage": 10
  }
}
```

### 4. GET /api/submissions/:id (BONUS)
Get a single submission by ID.

**Response**: 200 OK or 404 Not Found

### 5. PUT /api/submissions/:id (BONUS)
Update a submission.

**Request Body**: Updated form data
**Response**: 200 OK or 404 Not Found

### 6. DELETE /api/submissions/:id (BONUS)
Delete a submission.

**Response**: 200 OK or 404 Not Found

## Features Implemented

### Core Features ✅
- ✅ RESTful API design
- ✅ Form schema endpoint
- ✅ Submission creation with validation
- ✅ Server-side pagination
- ✅ Server-side sorting
- ✅ CORS support
- ✅ In-memory storage
- ✅ Proper error handling
- ✅ Validation middleware
- ✅ Unique submission IDs
- ✅ Timestamp generation

### Bonus Features ✅
- ✅ **Update submission** (PUT /api/submissions/:id)
- ✅ **Delete submission** (DELETE /api/submissions/:id)
- ✅ **Search/filter** submissions (query parameter)
- ✅ Get single submission by ID
- ✅ updatedAt timestamp on updates

### Validation Rules ✅
- ✅ Required fields
- ✅ minLength / maxLength
- ✅ Regex patterns
- ✅ min / max (numbers)
- ✅ minDate
- ✅ minSelected / maxSelected
- ✅ Option validation

## Assumptions
- Data is stored in-memory and will be lost on server restart
- Submission IDs are generated sequentially with format SUB-XXXXXX
- Maximum items per page is capped at 100
- Only sorting by `createdAt` is currently supported
- CORS is enabled for all origins (adjust for production)
- Search is case-insensitive and searches across all string and array fields

## Known Issues
- Data persistence is not available (in-memory only)
- No authentication/authorization
- Limited to single field sorting

## Environment Variables
None required. Server runs on port 3001 by default.

## Development Notes
- Uses ES modules (type: "module" in package.json)
- Node.js 18+ required for `--watch` flag
- All dates stored in ISO 8601 format
- Search functionality uses basic string matching