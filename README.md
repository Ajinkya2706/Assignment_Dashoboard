# AssignHub - Student & Professor Assignment Management System

A modern, role-based assignment management dashboard built with React, Tailwind CSS, and shadcn/ui components. Features distinct interfaces for students and professors with real-time progress tracking, group management, and JWT authentication.

##  Frontend Design Overview

### Design Philosophy
- **Minimalist White & Black Theme**: Clean, professional aesthetic with high contrast for excellent readability
- **Modern Typography**: Inter font family for crisp, contemporary text rendering
- **Component-Based Architecture**: Reusable shadcn/ui components for consistency
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Smooth Animations**: Subtle transitions, hover effects, and micro-interactions for polished UX

### Design Choices
- **Color Scheme**: White cards on light gray background (#f5f5f5), black text, black navigation bar
- **UI Components**: shadcn/ui for consistent, accessible components (Button, Card, Dialog, Input, Badge, Progress)
- **Icons**: Lucide React icons throughout for modern, scalable iconography
- **Feedback Systems**: Toast notifications for user actions, confirmation dialogs for critical operations
- **Visual Hierarchy**: Clear typography scale, strategic spacing, and color-coded status indicators

##  Quick Start

### Prerequisites
- Node.js 18+ and npm installed

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Student-Assignment-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173` (Vite default port)

### Build for Production

```bash
npm run build
npm run preview
```

##  Project Structure

```
Student-Assignment-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/                          # shadcn UI components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── progress.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── select.jsx
│   │   │   ├── textarea.jsx
│   │   │   └── toast.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── courses/
│   │   │   ├── CourseCard.jsx
│   │   │   ├── CourseGrid.jsx
│   │   │   └── CreateCourseModal.jsx
│   │   ├── assignments/
│   │   │   ├── AssignmentCard.jsx
│   │   │   ├── AssignmentForm.jsx
│   │   │   ├── AssignmentList.jsx
│   │   │   └── SubmissionProgress.jsx
│   │   ├── groups/
│   │   │   ├── GroupCard.jsx
│   │   │   ├── GroupFormModal.jsx
│   │   │   └── GroupMemberList.jsx
│   │   └── shared/
│   │       ├── Navigation.jsx
│   │       ├── ProtectedRoute.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── ConfirmDialog.jsx
│   ├── views/
│   │   ├── auth/
│   │   │   └── AuthPage.jsx
│   │   ├── professor/
│   │   │   ├── ProfessorDashboard.jsx
│   │   │   └── CourseAssignments.jsx
│   │   └── student/
│   │       ├── StudentDashboard.jsx
│   │       └── CourseAssignments.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useToast.js
│   ├── utils/
│   │   ├── storage.js
│   │   ├── helpers.js
│   │   └── mockData.js
│   ├── lib/
│   │   └── utils.js
│   ├── constants/
│   │   └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

##  Architecture Overview

### Component Hierarchy

```
App
├── AuthProvider
│   └── ToastProvider
│       └── Router
│           ├── AuthPage (Unauthenticated)
│           │   ├── LoginForm
│           │   └── RegisterForm
│           │
│           ├── ProfessorDashboard (Professor Role)
│           │   ├── Navigation
│           │   ├── CourseGrid
│           │   │   └── CourseCard
│           │   └── CourseAssignments
│           │       ├── Search & Filter
│           │       ├── AssignmentCardProfessor
│           │       │   └── SubmissionProgress
│           │       └── AssignmentForm (Modal)
│           │
│           └── StudentDashboard (Student Role)
│               ├── Navigation
│               ├── CourseGrid
│               │   └── CourseCard
│               └── CourseAssignments
│                   ├── Groups Section
│                   │   ├── GroupCard (if in group)
│                   │   ├── GroupMemberList
│                   │   ├── Join Group Buttons
│                   │   └── CreateGroupModal
│                   ├── AssignmentCard
│                   └── ConfirmDialog
```

### State Management
- **React Context**: `AuthContext` for global authentication state
- **Local State**: React `useState` for component-level UI state
- **Persistent Storage**: localStorage for assignments, submissions, groups, courses
- **No external state library** - lightweight and performant

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

## 🎯 Features Checklist

- ✅ Role-based authentication (Student/Admin)
- ✅ Student: View assignments, submit confirmation
- ✅ Admin: Create/delete assignments, track submissions
- ✅ Progress visualization (bars, percentages)
- ✅ Responsive design (mobile to desktop)
- ✅ LocalStorage persistence
- ✅ Clean component architecture
- ✅ Modern UI with animations

## 🚢 Deployment

### Build Command
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag 'dist' folder to Netlify or connect GitHub repo
```

##  Design System

### Colors
- **Background**: `#f5f5f5` (Light Gray)
- **Cards**: `#ffffff` (White)
- **Text**: `#000000` (Black)
- **Primary Actions**: `#000000` (Black buttons)
- **Success**: Green badges and borders
- **Warning**: Yellow badges for overdue
- **Navigation**: `#000000` (Black bar)

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold, varying sizes (xl, 2xl, 3xl)
- **Body**: Regular weight, gray-600 for secondary text


##  Future Enhancements

- Real backend API integration
- File upload for assignments
- Real-time notifications
- Email reminders for deadlines
- Assignment grading system
- Student analytics dashboard
- Export reports (CSV/PDF)
- Dark mode toggle
- Multi-language support

##  Development Notes

- All data persists in localStorage (no backend required for demo)
- Mock data initialized from `src/utils/mockData.js`
- JWT tokens are base64 encoded (demo implementation)
- Groups are course-specific
- Assignment submissions track timestamps
- Group leader acknowledgment updates all members

##  Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

##  License

This project is open source and available for educational purposes.

---

**Built with ❤️ using React, Tailwind CSS, and shadcn/ui**
