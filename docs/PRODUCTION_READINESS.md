# Production Readiness Guide

## Introduction

Moving from development to production involves many considerations beyond just deploying code. This guide covers the essential steps to ensure your Syntha-based agent system is production-ready.

## Pre-Production Checklist

### Database Configuration

**SQLite in Production** (Not Recommended):
```python
# Avoid this for production workloads
backend = create_database_backend("sqlite", db_path="/tmp/my_important_data.db")
```

**PostgreSQL in Production** (Recommended):
```python
# Use PostgreSQL for production
backend = create_database_backend(
    "postgresql",
    connection_string="postgresql://user:password@db.example.com:5432/syntha_prod"
)
```

### Environment Variables

```bash
# Production environment configuration
SYNTHA_DB_TYPE=postgresql
SYNTHA_DB_URL=postgresql://user:password@db.example.com:5432/syntha_prod
SYNTHA_LOG_LEVEL=INFO
```

### Performance Optimization

**Connection Pooling**:
```python
# Configure connection pooling
backend = create_database_backend(
    "postgresql",
    connection_string=db_url,
    pool_size=20,
    max_overflow=10,
    pool_timeout=30
)
```

## Deployment Strategies

### Docker Deployment

**Dockerfile**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 syntha
USER syntha

# Expose port
EXPOSE 8000

CMD ["python", "-m", "syntha"]
```

**Docker Compose**:
```yaml
version: '3.8'

services:
  syntha-api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - SYNTHA_DB_URL=postgresql://syntha:password@db:5432/syntha_prod
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: syntha_prod
      POSTGRES_USER: syntha
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### Kubernetes Deployment

**Deployment YAML**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: syntha-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: syntha-api
  template:
    metadata:
      labels:
        app: syntha-api
    spec:
      containers:
      - name: syntha-api
        image: syntha:latest
        ports:
        - containerPort: 8000
        env:
        - name: SYNTHA_DB_URL
          valueFrom:
            secretKeyRef:
              name: syntha-secrets
              key: database-url
        resources:
          requests:
            cpu: 100m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi
```

## Monitoring and Observability

### Logging Configuration

```python
from syntha.logging import configure_logging

# Configure structured logging
configure_logging(
    level=logging.INFO,
    format='json',
    output='stdout'
)
```

### Performance Monitoring

```python
from syntha.logging import get_performance_logger

# Track performance
perf_logger = get_performance_logger("performance")
timer_id = perf_logger.start_timer("context_operation")
# ... operation ...
perf_logger.end_timer(timer_id)
```

## Database Optimization

### Connection Pooling

```python
# Configure PostgreSQL connection pool
import psycopg2.pool

pool = psycopg2.pool.ThreadedConnectionPool(
    minconn=5,
    maxconn=25,
    dsn=connection_string
)
```

### Query Optimization

```sql
-- Create indexes for common queries
CREATE INDEX idx_context_items_created_at ON context_items(created_at);
CREATE INDEX idx_context_items_ttl ON context_items(ttl) WHERE ttl IS NOT NULL;
CREATE INDEX idx_agent_topics_agent_name ON agent_topics(agent_name);
```

## Backup and Recovery

### Database Backups

```bash
#!/bin/bash
# Database backup script

BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="syntha_backup_${TIMESTAMP}.sql"

# Create backup
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > "${BACKUP_DIR}/${BACKUP_FILE}"

# Compress backup
gzip "${BACKUP_DIR}/${BACKUP_FILE}"

# Clean up old backups (keep last 30 days)
find $BACKUP_DIR -name "syntha_backup_*.sql.gz" -mtime +30 -delete
```

### Recovery Procedures

```bash
#!/bin/bash
# Database recovery script

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup_file>"
    exit 1
fi

# Restore database
gunzip -c "$BACKUP_FILE" | psql -h $DB_HOST -U $DB_USER -d $DB_NAME

echo "Recovery completed"
```

## Common Issues

### Out of Memory
- **Symptoms**: Application crashes, slow response times
- **Causes**: Memory leaks, large datasets, insufficient resources
- **Solutions**: Increase memory limits, optimize queries, implement pagination

### Database Connection Issues
- **Symptoms**: Connection timeouts, slow database operations
- **Causes**: Too many concurrent connections, connection leaks
- **Solutions**: Increase pool size, fix connection leaks, implement connection retry logic

### High CPU Usage
- **Symptoms**: Slow response times, high server load
- **Causes**: Inefficient algorithms, infinite loops, high concurrency
- **Solutions**: Profile code, optimize algorithms, implement appropriate limits

## Best Practices

Production deployment requires careful planning and consideration of:

1. **Start small** - Don't over-engineer for scale you don't have yet
2. **Monitor everything** - Use logging to track system behavior
3. **Plan for failure** - Things will break, be prepared
4. **Document everything** - Your future self will thank you
5. **Test thoroughly** - Use production-like environments for testing

Remember: "It works on my machine" isn't a deployment strategy. Plan, test, monitor, and always have a rollback plan. 