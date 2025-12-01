# Microservices Application

A complete microservices architecture application built with Next.js, Node.js Express, Kafka, MySQL, and Docker.

## Architecture

This application consists of:

- **Frontend**: Next.js application (Port 3000)
- **Product Service**: Node.js Express microservice for product management (Port 3001)
- **Sales Service**: Node.js Express microservice for sales tracking (Port 3002)
- **Nginx**: Reverse proxy for API routing (Port 8080)
- **Kafka**: Event streaming platform with Zookeeper
- **MySQL**: Database server (Port 3306)

## Technology Stack

- **Frontend**: Next.js 15.1.3, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js 20, Express 5.1.0, Prisma 5.22.0
- **Message Broker**: Apache Kafka with KafkaJS 2.2.4 (Port 9093)
- **Database**: MySQL 8.0
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### 1. Build and Start All Services

```bash
docker-compose up --build
```

This command will:
- Build all Docker images
- Start all services (MySQL, Kafka, Zookeeper, Nginx, Product Service, Sales Service, Frontend)
- Run database migrations automatically
- Set up networking between services

### 2. Access the Application

- **Frontend**: http://localhost:3000
- **Nginx API Gateway**: http://localhost:8080
- **Product Service Direct**: http://localhost:3001
- **Sales Service Direct**: http://localhost:3002

### 3. API Endpoints

#### Product Service (via Nginx)
- `GET http://localhost:8080/api/products` - List all products
- `POST http://localhost:8080/api/products` - Create a new product

#### Sales Service (via Nginx)
- `GET http://localhost:8080/api/sales` - List all sales
- `POST http://localhost:8080/api/sales` - Record a new sale

## Project Structure

```
microservicesApp/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx     # Home page
│   │       ├── products/    # Product management page
│   │       └── sales/       # Sales tracking page
│   └── Dockerfile
├── product-service/         # Product microservice
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   ├── index.js             # Express server
│   ├── start.sh             # Startup script with migrations
│   └── Dockerfile
├── sales-service/           # Sales microservice
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   ├── index.js             # Express server
│   ├── start.sh             # Startup script with migrations
│   └── Dockerfile
├── nginx/
│   └── nginx.conf           # Nginx configuration
├── docker-compose.yml       # Docker Compose configuration
└── init.sql                 # MySQL initialization script
```

## Features

### Product Management
- Create new products with name, description, and price
- View all products
- Products are stored in MySQL database
- Product creation events are published to Kafka

### Sales Tracking
- Record sales transactions
- Link sales to products
- Automatic total price calculation
- View sales history
- Sales service consumes product events from Kafka

### Event-Driven Architecture
- Product creation events are published to Kafka
- Sales service subscribes to product events
- Enables loose coupling between services

## Development

### Stop All Services

```bash
docker-compose down
```

### Stop and Remove Volumes (Clean Start)

```bash
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f product-service
docker-compose logs -f sales-service
docker-compose logs -f frontend
```

### Rebuild Specific Service

```bash
docker-compose up --build product-service
```

## Database

The application uses MySQL 8.0 with Prisma ORM. Database migrations are automatically run when services start.

### Database Credentials
- Host: localhost:3306
- Root Password: rootpassword
- Databases: product_db, sales_db

## Troubleshooting

### Services not starting
- Ensure Docker is running
- Check if ports 3000, 3001, 3002, 3306, 8080, 9092 are available
- Run `docker-compose down -v` to clean up and start fresh

### Database connection errors
- Wait for MySQL to fully initialize (takes ~10-15 seconds)
- Check logs: `docker-compose logs mysql`

### Kafka connection errors
- Ensure Zookeeper is running
- Check logs: `docker-compose logs kafka zookeeper`

## License

ISC
# firstproject
