# Archive of Archives

A Digital Humanities platform for documenting libraries through photographs, documents, and field notes. This application enables contributors to submit archival materials to library collections, with an admin approval workflow for quality control.

## Features

### Core Functionality
- **Library-Based Archive System**: Organize documents by library with rich metadata
- **Multi-Format Support**: Upload photographs, documents, and field notes
- **Submission Workflow**: Contributors submit materials → Admin reviews → Approved content published
- **Document Management**: View, search, filter, and delete documents
- **Admin Panel**: Create libraries, review pending submissions, manage content
- **Image Storage**: Secure file storage via ImageKit

### User Roles
- **Guest**: Browse libraries and view approved documents
- **Contributor**: Sign in to submit documents to libraries
- **Admin**: Full access to create libraries, approve/reject submissions, manage all content

### UI/UX Features
- **Archival Heritage Theme**: Gold (#b8860b) and serif typography for an elegant, museum-like aesthetic
- **Skeleton Loading System**: Structured loading states for all data-driven pages (no blank screens)
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **Smooth Animations**: Subtle fade transitions and hover effects throughout

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **ImageKit** - Cloud image storage and optimization

### Authentication
- JWT-based authentication
- Role-based access control (admin, contributor, guest)

## Project Structure

```
DelhiLibrary-v2/
├── client/                          # Frontend React application
│   ├── public/
│   │   ├── logo.png                # Archive logo
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/             # Navbar, Footer, MainLayout
│   │   │   ├── library/            # DocumentList, LibraryDetailsUI
│   │   │   ├── sections/           # Hero, LibrariesSection, Sidebar
│   │   │   └── skeleton/           # CardSkeleton, ListSkeleton, DetailSkeleton
│   │   ├── pages/                  # Route pages
│   │   │   ├── AdminPage.jsx
│   │   │   ├── DocumentsPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   └── Home.jsx
│   │   ├── services/               # API service layers
│   │   │   ├── adminService.js
│   │   │   ├── authService.js
│   │   │   ├── documentService.js
│   │   │   ├── libraryService.js
│   │   │   └── submissionService.js
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── useDebounce.js
│   │   ├── utils/                  # Helper utilities
│   │   │   └── dataHelpers.js
│   │   ├── App.jsx                 # Main app with routes
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                         # Backend Express application
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── adminSubmissionController.js
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   ├── libraryController.js
│   │   └── submissionController.js
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── adminMiddleware.js      # Admin role check
│   │   └── uploadMiddleware.js     # File upload handling
│   ├── models/
│   │   ├── Document.js
│   │   ├── Library.js
│   │   ├── Submission.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── libraryRoutes.js
│   │   └── submissionRoutes.js
│   ├── services/
│   │   └── imageKitService.js      # ImageKit integration
│   ├── .env.example
│   ├── package.json
│   └── server.js                   # Entry point
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- ImageKit account (for file storage)

### 1. Clone the Repository
```bash
git clone https://github.com/PiyushVerma0804/DelhiLibrary.git
cd DelhiLibrary-v2
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/delhi_library
JWT_SECRET=your_jwt_secret_key_here
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | Yes |
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT tokens | Yes |
| IMAGEKIT_PUBLIC_KEY | ImageKit public key | Yes |
| IMAGEKIT_PRIVATE_KEY | ImageKit private key | Yes |
| IMAGEKIT_URL_ENDPOINT | ImageKit URL endpoint | Yes |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Libraries
- `GET /api/libraries` - Get all libraries
- `GET /api/libraries/:id` - Get library details
- `POST /api/libraries` - Create new library (admin only)
- `DELETE /api/libraries/:id` - Delete library (admin only)

### Documents
- `GET /api/documents` - Get all documents (with optional filters)
- `GET /api/documents/:id` - Get document by ID
- `DELETE /api/documents/:id` - Delete document

### Submissions
- `POST /api/submissions` - Submit document to library
- `GET /api/submissions/pending` - Get pending submissions (admin only)
- `PUT /api/submissions/:id/approve` - Approve submission (admin only)
- `DELETE /api/submissions/:id` - Reject submission (admin only)

### Admin
- `GET /api/admin/submissions` - Get all pending submissions (admin only)

## User Roles & Permissions

### Guest
- View all libraries
- Browse approved documents
- No submission or management capabilities

### Contributor
- All guest permissions
- Sign in to account
- Submit documents to existing libraries
- View own submissions
- Cannot approve or delete content

### Admin
- All contributor permissions
- Create new libraries
- Approve/reject pending submissions
- Delete any document
- Delete any library
- Full content management access

## Development

### Running in Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd client && npm run build`
2. Deploy the `dist` folder
3. Update environment variables for production API URL

### Backend (Render/Railway/Heroku)
1. Deploy the `server` directory
2. Set all required environment variables
3. Ensure MongoDB is accessible (use MongoDB Atlas for cloud)
4. Configure ImageKit with production credentials

## Design System

### Color Palette
- **Primary Gold**: `#b8860b` (archival gold)
- **Hover Gold**: `#d4a017` (lighter gold)
- **Background**: White/Stone gray
- **Text**: Slate/Gray scale

### Typography
- **Headings**: Serif font (Cormorant Garamond / Playfair Display style)
- **Body**: Sans-serif (Inter / system fonts)
- **Weights**: Medium/Semibold for emphasis

### Components
- All buttons follow gold theme with hover lift effect
- Skeleton loaders for all async operations
- Responsive grid layouts
- Consistent spacing and sizing

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.
