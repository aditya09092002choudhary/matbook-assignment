# Dynamic Form Builder - Full Stack Application

## Overview
A full-stack dynamic form builder system that allows for schema-driven form rendering, validation, and submission management with a modern tech stack.

## Milestone Completion Status

### ✅ Milestone 1 - Frontend Development
- ✅ Dynamic form schema fetching with loading/error states
- ✅ TanStack Query integration
- ✅ TanStack Form for form state management
- ✅ All 8 required field types implemented:
  - Text
  - Number
  - Select
  - Multi-select
  - Date
  - Textarea
  - Switch
- ✅ Complete validation rules:
  - minLength / maxLength
  - regex
  - min / max (numbers)
  - minDate
  - minSelected / maxSelected
  - Required fields
- ✅ Inline validation with error messages
- ✅ Disabled submit during submission
- ✅ Loading indicators
- ✅ Success/error messages
- ✅ Form clearing after success
- ✅ Navigation to submissions page
- ✅ TanStack Table implementation
- ✅ Server-side pagination
- ✅ Server-side sorting
- ✅ Items per page selector (10/20/50)
- ✅ Previous/Next navigation
- ✅ Total submissions count
- ✅ View submission modal
- ✅ Proper loading and error states
- ✅ Query invalidation after submission

### ✅ Milestone 2 - Backend Development
- ✅ GET /api/form-schema endpoint
- ✅ Employee Onboarding form schema
- ✅ POST /api/submissions with validation
- ✅ Unique submission ID generation
- ✅ Timestamp generation
- ✅ GET /api/submissions with pagination
- ✅ Server-side sorting by createdAt
- ✅ Proper HTTP status codes
- ✅ Validation middleware
- ✅ Error handling
- ✅ CORS support
- ✅ In-memory storage
- ✅ Clean code structure

### 🎁 Bonus Features Implemented

#### Backend Bonus Features ✅
- ✅ **Update Submission** (PUT /api/submissions/:id)
- ✅ **Delete Submission** (DELETE /api/submissions/:id)
- ✅ **Search/Filter** (query parameter support)
- ✅ Get single submission by ID
- ✅ updatedAt timestamp tracking

#### Frontend Bonus Features ✅
- ✅ **CSV Export** - Download submissions as CSV
- ✅ **Edit Submission** - Update submissions with modal form
- ✅ **Delete Submission** - Delete with confirmation modal
- ✅ **Dark Mode** - Theme toggle with localStorage persistence
- ✅ **Debounced Search** - Real-time search with 500ms debounce

## Tech Stack

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM 6
- **State Management**: TanStack Query 5
- **Form Library**: TanStack Form 0.29
- **Table Library**: TanStack Table 8
- **Styling**: Tailwind CSS 3 (with dark mode)
- **Icons**: Lucide React
- **Build Tool**: Vite 5

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4
- **CORS**: cors package
- **Storage**: In-memory (JavaScript objects)

## Project Structure
```
project-root/
├── backend/
│   ├── src/
│   │   ├── server.js                    # Entry point
│   │   ├── routes/
│   │   │   └── formRoutes.js           # API routes
│   │   ├── controllers/
│   │   │   ├── schemaController.js     # Schema endpoints
│   │   │   └── submissionController.js # Submission endpoints
│   │   ├── middleware/
│   │   │   ├── validation.js           # Request validation
│   │   │   └── errorHandler.js         # Error handling
│   │   ├── store/
│   │   │   └── submissionStore.js      # In-memory storage
│   │   └── data/
│   │       └── formSchema.js           # Form schema
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── DynamicForm.jsx
│   │   │   ├── FormField.jsx
│   │   │   ├── SubmissionsTable.jsx
│   │   │   ├── SubmissionModal.jsx
│   │   │   ├── EditSubmissionModal.jsx    # BONUS
│   │   │   ├── DeleteConfirmModal.jsx     # BONUS
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/
│   │   │   ├── FormPage.jsx
│   │   │   └── SubmissionsPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── validation.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── README.md
│
└── README.md (this file)
```

## Setup and Run Instructions

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm run dev

# Server will run on http://localhost:3001
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Application will run on http://localhost:3000
```

### Running Both Services
Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Then open your browser to `http://localhost:3000`

## API Endpoints

### Core Endpoints

#### 1. GET /api/form-schema
Returns the Employee Onboarding form schema.

**Response**: 200 OK
```json
{
  "title": "Employee Onboarding Form",
  "description": "...",
  "fields": [...]
}
```

#### 2. POST /api/submissions
Submit form data with validation.

**Success Response**: 201 Created
```json
{
  "success": true,
  "id": "SUB-000001",
  "createdAt": "2024-11-29T10:30:00.000Z"
}
```

**Error Response**: 400 Bad Request
```json
{
  "success": false,
  "errors": {
    "email": "Email Address is required",
    "age": "Age must be at least 18"
  }
}
```

#### 3. GET /api/submissions
Get paginated and sorted submissions with optional search.

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

### Bonus Endpoints

#### 4. GET /api/submissions/:id
Get a single submission by ID.

**Response**: 200 OK or 404 Not Found

#### 5. PUT /api/submissions/:id
Update an existing submission.

**Request Body**: Updated form data
**Response**: 200 OK or 404 Not Found

#### 6. DELETE /api/submissions/:id
Delete a submission.

**Response**: 200 OK or 404 Not Found

## Features

### Form Features
- 8 field types with proper rendering
- Real-time validation
- Error messages
- Required field indicators
- Placeholder text
- Disabled state during submission
- Success feedback
- Auto-redirect after submission

### Table Features
- Paginated display
- Sortable by date (ascending/descending)
- Adjustable items per page
- Page navigation
- Total count display
- View submission details
- **Edit submissions** (Bonus)
- **Delete submissions** (Bonus)
- **CSV Export** (Bonus)
- **Search functionality** (Bonus)
- Empty state handling

### UI/UX Features
- **Dark mode toggle** (Bonus)
- Responsive design
- Loading states
- Error handling
- Success notifications
- Confirmation modals
- Smooth transitions

### Validation Rules
- Required fields
- Minimum/maximum length
- Regex patterns
- Number ranges
- Date restrictions
- Multi-select limits

## Bonus Features Details

### CSV Export
- Export button in submissions table
- Downloads all visible submissions
- Handles arrays and special characters
- Filename includes timestamp
- Proper CSV formatting

### Edit Submission
- Edit button for each submission
- Opens modal with pre-filled form
- Full validation on update
- Success/error feedback
- Table refreshes automatically

### Delete Submission
- Delete button with trash icon
- Confirmation modal prevents accidents
- Shows submission ID for verification
- Loading state during deletion
- Table refreshes after deletion

### Dark Mode
- Toggle button in navigation
- Persists in localStorage
- Smooth theme transitions
- Applies to all components
- Sun/Moon icon indicator

### Debounced Search
- Search input in submissions page
- 500ms debounce delay
- Searches across all fields
- Case-insensitive matching
- Resets pagination on search
- Shows results count

## Assumptions
- Data is stored in-memory and will be lost on server restart
- Backend runs on port 3001, frontend on port 3000
- Form schema is static (Employee Onboarding)
- Only sorting by `createdAt` is supported
- CORS is enabled for all origins
- Submissions are identified by auto-generated IDs
- Search is case-insensitive and searches all string/array fields

## Known Issues
- No data persistence (in-memory storage only)
- No authentication/authorization
- Limited sorting options (createdAt only)

## Future Enhancements (Not Implemented)
- Database persistence (PostgreSQL, MongoDB)
- Authentication and authorization
- Multiple field sorting
- URL state synchronization
- Bulk operations
- Advanced filtering
- Export to JSON/Excel
- File upload support
- Email notifications
- Submission history/audit log

## Development Notes
- Backend uses ES modules (type: "module")
- Frontend uses Vite for fast development
- Tailwind CSS with dark mode support
- Component-based architecture
- Separation of concerns (services, components, pages)
- Proper error handling throughout
- TypeScript types recommended but not enforced

## Testing the Application

1. Start both backend and frontend servers
2. Navigate to http://localhost:3000
3. Toggle dark mode in the header
4. Fill out the Employee Onboarding form
5. Submit the form
6. View the submission in the Submissions page
7. Use search to filter submissions
8. Edit a submission
9. Delete a submission (with confirmation)
10. Export submissions to CSV
11. Test pagination and sorting

## Deployment Recommendations

### Backend
- Use environment variables for configuration
- Add database for persistence
- Implement authentication
- Add rate limiting
- Enable HTTPS
- Use PM2 or similar for process management

### Frontend
- Build optimized bundle: `npm run build`
- Deploy static files to CDN/Vercel/Netlify
- Configure environment-specific API URLs
- Enable HTTPS
- Add monitoring and analytics
- Implement error tracking (Sentry)

## License
MIT

## Author
MatBook Assignment Submission

---

## Summary of Implementation

✅ **All Core Requirements Met**
✅ **All Bonus Features Implemented**
- Backend: Update, Delete, Search
- Frontend: CSV Export, Edit, Delete, Dark Mode, Debounced Search

Total Features: **Core (100%) + Bonus (100%)**