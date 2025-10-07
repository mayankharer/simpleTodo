# Database Migration Guide: H2 to PostgreSQL

This guide explains how to migrate from H2 in-memory database to PostgreSQL for persistent storage.

## Prerequisites

1. **Install PostgreSQL** (version 12 or higher)
   - Download from: https://www.postgresql.org/download/
   - Or use Docker (see Docker Setup below)

2. **Java 17** (already configured in your project)

## Setup

### Local PostgreSQL Installation

1. **Follow the detailed installation guide:** `POSTGRESQL-SETUP.md`

2. **Run the database setup script:**
   ```cmd
   psql -U postgres -f setup-database.sql
   ```

3. **Verify the setup:**
   ```cmd
   psql -U todo_user -d tododb -h localhost
   ```

4. **Configure pgAdmin:** Follow the guide in `PGADMIN-SETUP.md`

## Configuration

### Database Credentials
- **Host:** localhost
- **Port:** 5432
- **Database:** tododb
- **Username:** todo_user
- **Password:** todo_password

### Environment Files
- Copy `.env.example` to `.env` and modify values as needed
- Different profiles use different configurations:
  - `application.properties` - Default configuration
  - `application-dev.properties` - Development configuration
  - `application-prod.properties` - Production configuration

## Running the Application

1. **Start PostgreSQL** (using Docker or local installation)

2. **Run the Spring Boot application:**
   ```bash
   ./mvnw spring-boot:run
   ```
   Or with specific profile:
   ```bash
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
   ```

## Data Migration

Since you're moving from H2 in-memory to PostgreSQL:
- **H2 data was temporary** and lost on restart
- **PostgreSQL data will persist** between application restarts
- The application will automatically create tables on first run (`hibernate.ddl-auto=update`)

## Troubleshooting

### Connection Issues
1. **Check PostgreSQL is running:**
   ```cmd
   sc query postgresql-x64-15
   ```

2. **Verify database exists:**
   ```cmd
   psql -U postgres -c "\l"
   ```

### Application Issues
1. **Check logs** for database connection errors
2. **Verify credentials** in application properties
3. **Ensure PostgreSQL driver** is in classpath (already configured in pom.xml)

## Production Deployment

For production, set the following environment variables:
- `DATABASE_URL` - Full PostgreSQL connection URL
- `FRONTEND_URL` - Your frontend application URL
- `PORT` - Server port (default: 8080)

Example:
```bash
export DATABASE_URL=postgresql://username:password@hostname:5432/database
export FRONTEND_URL=https://your-frontend-domain.com
export PORT=8080
```

## Benefits of PostgreSQL Migration

✅ **Persistent Data** - Data survives application restarts  
✅ **Production Ready** - Suitable for production environments  
✅ **Better Performance** - Optimized for concurrent operations  
✅ **Advanced Features** - JSON support, full-text search, etc.  
✅ **Scalability** - Better handling of large datasets  
✅ **ACID Compliance** - Reliable transactions  

## Next Steps

1. Start PostgreSQL using Docker or local installation
2. Run the application and verify it connects successfully
3. Test your Todo API endpoints to ensure data persistence
4. Consider adding database migrations for future schema changes