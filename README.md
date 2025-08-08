# The Bookery - Library Management System

![The Bookery](public/bookery.svg)

A minimal library management system built with React, Redux Toolkit Query (RTK Query), and TypeScript. This application allows users to view a list of books, perform CRUD operations, borrow books, and view a simple borrow summary—all without authentication.

## Live Demo

- **Frontend:** [https://library-management-minimal-web.vercel.app/](https://library-management-minimal-web.vercel.app/)
- **Backend API:** [https://library-management-minimal-server.vercel.app/](https://library-management-minimal-server.vercel.app/)

## Features

### Public Routes 🚀

All pages of this project are accessible without login or authentication. The focus is on essential book and borrowing features only.

### Book Management 🛠️

- **Book List:** Display all books in a responsive grid layout
- **Book Details:** View detailed information about a specific book
- **Add New Book:** Create new books with title, author, genre, ISBN, description, and copies
- **Edit Book:** Update existing book information
- **Delete Book:** Remove books from the library
- **Borrow Book:** Borrow books with quantity tracking and due date

### Borrow System 📚

- **Borrow Form:** Simple form to borrow books with quantity and due date
- **Availability Tracking:** Automatic availability status based on copies
- **Borrow Summary:** View aggregated list of all borrowed books

### UI/UX Features ✨

- **Responsive Design:** Fully responsive layout for mobile, tablet, and desktop
- **Dark/Light Mode:** Theme toggle for user preference
- **Toast Notifications:** User-friendly notifications for actions
- **Loading States:** Skeleton loaders for better user experience
- **Error Handling:** Comprehensive error handling with user-friendly messages

## Technology Stack

### Frontend

- **Framework:** React 19 with TypeScript
- **State Management:** Redux Toolkit with RTK Query
- **Routing:** React Router v7
- **Styling:** Tailwind CSS with shadcn/ui components
- **Form Handling:** React Hook Form with Zod validation
- **Notifications:** React Hot Toast

### Backend

- **Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Validation:** Zod
- **API Design:** RESTful API with proper error handling

## Pages

- `/` - Home page with introduction
- `/books` - Displays a list of all books with options to view, edit, delete, and borrow
- `/create-book` - Form interface to add a new book to the system
- `/books/:id` - Detailed view of a single book's information
- `/edit-book/:id` - Interface to update an existing book's details
- `/borrow-summary` - Displays an aggregated summary of all borrowed books

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/md-nasim-mondal/library-management-minimal-web.git
cd library-management-minimal-web
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

VITE_BASE_API_URL= https://library-management-minimal-server.vercel.app


Or use your local backend server if you're running it locally.

4. Start the development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## Backend Repository

The backend code is available at: [https://github.com/md-nasim-mondal/library-management-minimal-server](https://github.com/md-nasim-mondal/library-management-minimal-server)

## Project Structure

├── public/               # Static assets
├── src/
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable components
│   │   ├── book/         # Book-related components
│   │   ├── layouts/      # Layout components
│   │   ├── modals/       # Modal components
│   │   ├── theme/        # Theme components
│   │   └── ui/           # UI components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── layouts/          # Page layouts
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── providers/        # Provider components
│   ├── redux/            # Redux store and slices
│   │   ├── api/          # RTK Query API definitions
│   │   └── hooks.ts      # Redux hooks
│   ├── routes/           # Route definitions
│   ├── types/            # TypeScript type definitions
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .gitignore            # Git ignore file
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration



## Bonus Features Implemented

- ✅ **Optimistic UI Updates:** Immediate UI feedback before API response
- ✅ **Toast Notifications:** User-friendly notifications for actions
- ✅ **Responsive Layout:** Fully responsive design for all devices
- ✅ **Type-Safe Forms:** Form validation with TypeScript and Zod

## Author

- **Md. Nasim Mondal**
  - GitHub: [https://github.com/md-nasim-mondal](https://github.com/md-nasim-mondal)
  - Email: mdnasimmondal622@gmail.com

## Acknowledgments

- This project was created as an assignment for the Next Level Web Development Course
- UI inspiration from various library management systems