# Backend Assignment - Primetrade.ai - **Task Management System**
Full-stack task management application with JWT authentication and role-based access control.

## 🚀 Live Demo

**Frontend:** https://primetrade-ai-task.vercel.app

**Backend API:** https://primetrade-ai-task.onrender.com

**API Documentation:** https://primetrade-ai-task.onrender.com/api-docs

## Demo Credentials

**Regular User:**
- Email: user@gmail.com
- Password: User@123

**Admin User:**
- Email: admin@gmail.com
- Password: Admin@123

## Tech Stack

### Backend
- Node.js + Express.js
- PostgreSQL with Prisma ORM
- JWT Authentication
- Swagger API Documentation
- Deployed on Render

### Frontend
- Next.js 14 (TypeScript)
- Tailwind CSS
- Axios for API calls
- Deployed on Vercel

## Features

- ✅ **User Authentication** - Secure registration and login with JWT tokens (24h expiration)
- ✅ **Role-Based Access Control** - Distinct User and Admin roles with permission management
- ✅ **Task Management** - Complete CRUD operations (Create, Read, Update, Delete)
- ✅ **Admin Dashboard** - Centralized management of all users and tasks
- ✅ **API Documentation** - Interactive Swagger UI with live testing capability
- ✅ **Responsive Design** - Mobile-first UI with modern, clean interface
- ✅ **Security** - bcrypt password hashing (10 salt rounds) and input sanitization
- ✅ **Error Handling** - Comprehensive validation with user-friendly error messages
- ✅ **PostgreSQL Database** - Serverless Neon database with Prisma ORM
- ✅ **API Versioning** - RESTful API with /api/v1/ versioning
- ✅ **CORS Protection** - Configured for secure cross-origin requests
- ✅ **Database Seeding** - Pre-populated demo data for quick testing

## 🚀 Quick Start

### Backend Setup
- cd backend
- npm install
- cp .env.example .env
- Edit .env with your database URL and JWT secret
- npx prisma migrate dev
- npx prisma db seed
- npm run swagger
- npm run dev

**Backend runs on: http://localhost:5000**

### Frontend Setup
- cd frontend
- npm install
- Create .env.local with:
- NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
- npm run dev

**Frontend runs on: http://localhost:3000**

- **API Docs: https://primetrade-ai-task.onrender.com/api-docs**

## Security Features

- JWT-based authentication with 24-hour expiration
- Password hashing using bcrypt
- Role-based authorization
- Input validation and sanitization
- CORS protection
- SQL injection prevention via Prisma ORM

## Scalability Considerations

Detailed scalability notes available in [backend/README.md](./backend/README.md):
- Microservices architecture
- Redis caching
- Load balancing
- Database optimization
- API Gateway
- Containerization with Docker

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user

### Tasks (Protected)
- `GET /api/v1/tasks` - Get user's tasks
- `POST /api/v1/tasks` - Create task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Admin (Protected - Admin Only)
- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/tasks` - Get all tasks
- `DELETE /api/v1/admin/tasks/:id` - Delete any task

## Testing

1. Visit https://primetrade-ai-task.onrender.com/api-docs
2. Try login endpoint with demo credentials
3. Copy JWT token
4. Click "Authorize" and enter token
5. Test protected endpoints

## 👤 Author

**Shashank Mishra**

- Email: mishrashashank2106@gmail.com
- GitHub: [https://github.com/shashankmishra21/](https://github.com/shashankmishra21/)
- Portfolio: [shashankmishraa.vercel.app ](https://shashankmishraa.vercel.app/)
- LinkedIn: [https://www.linkedin.com/in/mishrashashank2106](https://www.linkedin.com/in/mishrashashank2106)

## 📄 Assignment Details

**Company:** Primetrade.ai

**Position:** Backend Developer Intern

**Submission Date:** 3 days

**Assignment Requirements:**
- ✅ Backend APIs with authentication
- ✅ Role-based access control
- ✅ CRUD operations
- ✅ API documentation
- ✅ Frontend integration
- ✅ Deployment
- ✅ Scalability notes

## License

MIT
---
**Developed as part of Backend Developer Internship assignment for Primetrade.ai**
