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
│   │   ├── EditSubmissionModal.jsx # Edit submission (BONUS)
│   │   ├── DeleteConfirmModal.jsx  # Delete confirmation (BONUS)
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

### Bonus Features ✅
- ✅ **CSV Export** - Export all submissions to CSV file
- ✅ **Edit Submission** - Update existing submissions with validation
- ✅ **Delete Submission** - Delete submissions with confirmation modal
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Debounced Search** - Real-time search with 500ms debounce
- ✅ Search persists in localStorage

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
- ✅ Edit/Delete action buttons
- ✅ CSV download functionality
- ✅ Dark mode toggle in header
- ✅ Search with debouncing

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
- Search functionality with debouncing
- View submission details in modal
- Edit submission in modal
- Delete with confirmation
- Export to CSV
- Shows page info and total count

## Component Architecture

### Layout
- Navigation bar with routes
- Dark mode toggle
- Responsive container
- Consistent styling

### DynamicForm
- Uses TanStack Form
- Manages form state
- Handles submission
- Shows errors and success messages
- Supports initial values for editing

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
- Action buttons (View/Edit/Delete)
- CSV export button
- Opens modals for actions

### EditSubmissionModal
- Fetches form schema
- Populates form with current values
- Validates updates
- Saves changes to backend

### DeleteConfirmModal
- Confirms deletion
- Shows submission ID
- Prevents accidental deletion

## API Integration

The frontend communicates with the backend API at `http://localhost:3001/api`:

- `GET /api/form-schema` - Fetch form structure
- `POST /api/submissions` - Submit form data
- `GET /api/submissions?page=1&limit=10&sortBy=createdAt&sortOrder=desc&search=term` - Get submissions
- `GET /api/submissions/:id` - Get single submission
- `PUT /api/submissions/:id` - Update submission
- `DELETE /api/submissions/:id` - Delete submission

## Styling

- Tailwind CSS utility classes
- Dark mode support via `dark:` classes
- Consistent color scheme (blue primary)
- Hover and focus states
- Responsive breakpoints
- Accessible form controls

## Bonus Features Details

### CSV Export
- Exports all current page submissions
- Handles arrays and special characters
- Downloads with timestamp in filename
- Properly escapes CSV values

### Edit Functionality
- Opens modal with pre-filled form
- Validates updates against schema
- Shows success/error feedback
- Refreshes table after update

### Delete Functionality
- Confirmation modal prevents accidents
- Shows submission ID for verification
- Loading state during deletion
- Refreshes table after deletion

### Dark Mode
- Toggle in navigation bar
- Persists preference in localStorage
- Applies to all components
- Smooth transitions

### Debounced Search
- 500ms delay prevents excessive API calls
- Resets to page 1 on new search
- Shows "No results" for empty searches
- Searches across all fields

## Assumptions
- Backend is running on port 3001
- All API responses follow documented format
- Form schema contains all required validation rules
- Submissions are sorted by `createdAt` only
- Search is case-insensitive

## Known Issues
None currently

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements
- URL state synchronization for pagination/search
- Bulk operations (delete multiple)
- Advanced filtering options
- Export to other formats (JSON, Excel)
- Inline editing in table
- Submission history/audit log