# AssignHub - Assignment Management System

A modern, role-based assignment management dashboard built with React and Tailwind CSS. Features distinct interfaces for students and professors with real-time progress tracking.

##  Quick Start



### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd assignhub

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
assignhub/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Top navigation bar
│   │   ├── LoginScreen.jsx         # Authentication screen
│   │   ├── StatsCard.jsx          # Statistics display card
│   │   ├── AssignmentCard.jsx     # Assignment display (student/admin)
│   │   └── Modal.jsx              # Reusable modal component
│   ├── utils/
│   │   ├── storage.js             # LocalStorage utilities
│   │   └── helpers.js             # Helper functions
│   ├── constants/
│   │   └── index.js               # App constants & mock data
│   ├── App.jsx                    # Main application component
│   ├── index.js                   # Entry point
│   └── index.css                  # Global styles
├── package.json
└── README.md
```

## Architecture Overview

### Component Hierarchy

```
App
├── LoginScreen (Unauthenticated)
│   └── Student/Admin Selection
│
├── Student Dashboard (Student Role)
│   ├── Navigation
│   ├── Progress Card
│   ├── Assignment List
│   │   └── AssignmentCardStudent
│   └── Confirmation Modal
│
└── Admin Dashboard (Admin Role)
    ├── Navigation
    ├── Stats Grid
    │   └── StatsCard x3
    ├── Assignment List
    │   └── AssignmentCardAdmin
    └── Create Assignment Modal
```

### State Management

- **Local State**: React `useState` for UI state (modals, forms)
- **Persistent State**: localStorage for user data, assignments, submissions
- **No external state library** - keeps it simple and performant

### Data Flow

1. **Initial Load**: Data loaded from localStorage or mock data
2. **User Actions**: State updates → localStorage sync → UI re-render
3. **Role-Based Rendering**: Conditional rendering based on `user.role`


### UI/UX Principles

1. **Natural Feel**: Organic gradients, soft shadows, smooth transitions
2. **Visual Hierarchy**: Clear typography scale, strategic use of color
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Micro-interactions**: Hover states, scale transforms, color transitions
5. **Accessibility**: Proper contrast ratios, semantic HTML

### Key Features

#### Student View
- Progress tracking with animated percentage bar
- Assignment cards with submission status
- Double-confirmation modal for submissions
- Overdue assignment indicators
- Direct Drive link access

#### Admin View
- Overview statistics with trend indicators
- Per-assignment submission tracking
- Student-level progress bars
- Individual student submission status
- Assignment CRUD operations

##  Technical Highlights

### Performance Optimizations
- Conditional rendering to minimize DOM updates
- localStorage caching to reduce re-renders
- CSS transitions over JavaScript animations

### Code Organization
- **Separation of Concerns**: Components, utilities, constants
- **Reusable Components**: Modal, Cards, Navigation
- **Pure Functions**: Helper functions with no side effects
- **Consistent Naming**: camelCase for variables, PascalCase for components

### Browser Storage
All data persists in localStorage:
- `user` - Current user session
- `assignments` - Assignment list
- `students` - Student data with submissions

##  Features Checklist

-  Role-based authentication (Student/Admin)
-  Student: View assignments, submit confirmation
-  Admin: Create/delete assignments, track submissions
-  Progress visualization (bars, percentages)
-  Responsive design (mobile to desktop)
-  LocalStorage persistence
-  Clean component architecture
-  Modern UI with animations

##  Deployment

### Netlify
```bash
npm run build
# Drag 'build' folder to Netlify
```

### Vercel
```bash
vercel
```



##  Demo Credentials

**Professor**: Click "Continue as Professor"

**Students**: 
- Rohan Patil
- Diya Jain  
- Om Kapoor

##  Future Enhancements

- File upload integration
- Real-time notifications
- Email reminders for deadlines
- Assignment grading system
- Bulk operations for admins
- Export reports (CSV/PDF)

##  Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request
