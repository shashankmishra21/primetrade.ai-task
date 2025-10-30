# Task Management API - Backend

REST API with JWT Authentication and Role-Based Access Control.

## Quick Links

- **Live API:** https://primetrade-ai-task.onrender.com
- **Swagger Docs:** https://primetrade-ai-task.onrender.com/api-docs
- **Frontend:** https://primetrade-ai-task.vercel.app

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login & get JWT token

### Tasks (Protected)
- `GET /api/v1/tasks` - Get user's tasks
- `POST /api/v1/tasks` - Create task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Admin (Admin Only)
- `GET /api/v1/admin/users` - Get all users
- `GET /api/v1/admin/tasks` - Get all tasks
- `DELETE /api/v1/admin/tasks/:id` - Delete any task

## Database Schema

### Users
- id, email (unique), password (hashed), name, role (USER/ADMIN)
- Relationships: One-to-many with Tasks

### Tasks
- id, title, description, status (PENDING/IN_PROGRESS/COMPLETED)
- Relationships: Many-to-one with User (userId)
