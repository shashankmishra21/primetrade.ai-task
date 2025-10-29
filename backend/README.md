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

## Scalability Considerations

### Current Architecture
Monolithic REST API with PostgreSQL database, stateless JWT authentication, deployed on Render.

### Scaling Strategy

#### 1. **Horizontal Scaling (Load Balancing)**

Deploy multiple API instances behind a load balancer (Nginx/AWS ALB) to distribute traffic:

Client → Load Balancer → [API Instance 1, Instance 2, Instance 3] → Database


**Benefits:**
- **Stateless JWT design** already supports this (no session storage needed)
- Add/remove instances based on traffic
- Zero downtime deployments
- High availability (if one instance fails, others handle requests)

**Implementation:** AWS Auto Scaling or Render's horizontal scaling

#### 2. **Caching with Redis**

Reduce database queries by 60-70% with intelligent caching:

// Cache user tasks for 5 minutes
const cached = await redis.get(tasks:user:${userId});
if (cached) return JSON.parse(cached);

const tasks = await prisma.task.findMany({ where: { userId } });
await redis.setex(tasks:user:${userId}, 300, JSON.stringify(tasks));
return tasks;


**Cache invalidation:** Clear cache on create/update/delete operations

#### 3. **Database Optimization**

**Read Replicas:**
- Master database: Handles writes (POST, PUT, DELETE)
- Read replicas: Handle reads (GET requests)
- Reduces primary DB load by 50-80%

**Indexing for performance:**

CREATE INDEX idx_tasks_userId ON Task(userId);
CREATE INDEX idx_tasks_status ON Task(status);
CREATE INDEX idx_users_email ON User(email);


#### 4. **Microservices Architecture**

Break monolith into independent services:

**Current:**

API → [Auth + Tasks + Admin] → Single Database

**Future:**

API Gateway
├── Auth Service → User DB
├── Task Service → Task DB
└── Admin Service → Analytics DB


**Benefits:**
- Scale services independently (task service can have 5 instances, auth service 2)
- Technology flexibility per service
- Fault isolation (one service failure doesn't affect others)

#### 5. **Rate Limiting & API Gateway**

Prevent abuse and protect backend:

// Rate limiting example
app.use('/api/v1', rateLimit({
windowMs: 60000, // 1 minute
max: 100, // 100 requests per minute per user
message: 'Too many requests'
}));


**API Gateway features:**
- Centralized rate limiting
- Request throttling
- Authentication/authorization
- Request transformation

**Tools:** Kong, AWS API Gateway, Nginx

#### 6. **Asynchronous Processing**

Handle long-running tasks without blocking API:

**Use cases:**
- Email notifications
- Batch exports (CSV/PDF)
- Report generation

**Tools:** RabbitMQ, AWS SQS, Redis Queue

#### 7. **Monitoring & Observability**

Track performance and identify bottlenecks:

- **Metrics:** Prometheus + Grafana (response times, error rates, throughput)
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)
- **Alerting:** Real-time alerts for downtime, high error rates (>1%)

### Scalability Roadmap

**Short Term (1-3 months):**
- Redis caching
- Database read replicas
- Nginx load balancer
- Rate limiting

**Medium Term (3-6 months):**
- Microservices architecture
- Message queue for async tasks
- API gateway
- Monitoring (Prometheus/Grafana)

**Long Term (6-12 months):**
- Multi-region deployment
- Event-driven architecture
- Kubernetes orchestration

## Author

**Shashank Mishra**  

## License

MIT

---

**Primetrade.ai Backend Developer Internship Assignment • October 2025**