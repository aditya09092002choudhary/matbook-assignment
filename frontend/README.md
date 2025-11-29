# Dynamic Form Builder - Frontend

## Overview
React-based frontend application for the dynamic form builder system with TanStack libraries.

## Tech Stack
- **Framework**: React 19
- **Routing**: React Router DOM 6
- **State Management**: TanStack Query (React Query)
- **Form Management**: TanStack Form
- **Table**: TanStack Table
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.jsx              # App layout with navigation
│   │   ├── DynamicForm.jsx         # Main form component
│   │   ├── FormField.jsx           # Individual field renderer
│   │   ├── SubmissionsTable.jsx    # Table with pagination
│   │   ├── SubmissionModal.jsx     # View submission details
│   │   ├── LoadingSpinner.jsx      # Loading state
│   │   └── ErrorMessage.jsx        # Error display
│   ├── pages/
│   │   ├── FormPage.jsx            # Form page
│   │   └── SubmissionsPage.jsx     # Submissions page
│   ├── services/
│   │   └── api.js                  # API client
│   ├── utils/
│   │   └── validation.js           # Form validation logic
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Backend server running on http://localhost:3001

### Installation
```bash
cd frontend
npm install
```

### Running the Application
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will start on `http://localhost:3000`

## Features Implemented

### Core Features ✅
- ✅ Dynamic form rendering from schema
- ✅ All 8 field types supported:
  - Text
  - Email
  - Number
  - Select
  - Multi-select
  - Date
  - Textarea
  - Switch
- ✅ Real-time inline validation
- ✅ TanStack Form integration
- ✅ TanStack Query for data fetching
- ✅ TanStack Table for submissions
- ✅ Server-side pagination
- ✅ Server-side sorting
- ✅ Loading states
- ✅ Error handling
- ✅ Success feedback
- ✅ Query invalidation after submission
- ✅ Form reset functionality
- ✅ Submission viewing modal
- ✅ Responsive design

### Validation Rules ✅
- ✅ Required fields
- ✅ minLength / maxLength
- ✅ Regex patterns
- ✅ min / max (numbers)
- ✅ minDate
- ✅ minSelected / maxSelected
- ✅ Real-time validation feedback

### User Experience ✅
- ✅ Disabled submit during submission
- ✅ Loading indicators
- ✅ Success/error messages
- ✅ Clear form after success
- ✅ Navigation to submissions
- ✅ Items per page selector (10/20/50)
- ✅ Previous/Next pagination
- ✅ Total submissions count
- ✅ Empty state handling

## Pages

### 1. Form Page (`/form`)
- Fetches form schema from API
- Renders dynamic form with all field types
- Validates input in real-time
- Submits to backend
- Shows success/error feedback
- Redirects to submissions on success

### 2. Submissions Page (`/submissions`)
- Displays all submissions in a table
- Server-side pagination
- Sortable by created date (asc/desc)
- Adjustable items per page
- View submission details in modal
- Shows page info and total count

## Component Architecture

### Layout
- Navigation bar with routes
- Responsive container
- Consistent styling

### DynamicForm
- Uses TanStack Form
- Manages form state
- Handles submission
- Shows errors and success messages

### FormField
- Renders field based on type
- Handles validation
- Shows error messages
- Supports all field types

### SubmissionsTable
- Uses TanStack Table
- Server-side pagination
- Sorting controls
- Items per page selector
- Opens modal for viewing

### SubmissionModal
- Displays all submission data
- Formats dates and arrays
- Responsive overlay

## API Integration

The frontend communicates with the backend API at `http://localhost:3001/api`:

- `GET /api/form-schema` - Fetch form structure
- `POST /api/submissions` - Submit form data
- `GET /api/submissions?page=1&limit=10&sortBy=createdAt&sortOrder=desc` - Get submissions

## Styling

- Tailwind CSS utility classes
- Consistent color scheme (blue primary)
- Hover and focus states
- Responsive breakpoints
- Accessible form controls

## Assumptions
- Backend is running on port 3001
- All API responses follow documented format
- Form schema contains all required validation rules
- Submissions are sorted by `createdAt` only

## Known Issues
None currently

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements (Optional)
- CSV export functionality
- Edit/Delete submissions
- Dark mode
- Search/filter submissions
- URL state synchronization
- Debounced search input