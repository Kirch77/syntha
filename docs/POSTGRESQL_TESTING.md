# PostgreSQL Testing Guide

## Overview

Testing with PostgreSQL provides advanced features and production-like conditions that SQLite cannot replicate. This guide covers setup, configuration, and best practices for PostgreSQL testing.

## Why PostgreSQL Testing Matters

SQLite is excellent for development, but PostgreSQL testing is essential for:

- **JSONB Support**: Advanced JSON operations and indexing
- **Advanced Features**: CTEs, window functions, and sophisticated queries
- **Concurrency**: Multiple connections without blocking
- **Production Parity**: Testing against your production database type

## PostgreSQL Installation

### Local Development Setup

#### Option 1: Docker (Recommended)
```bash
# Start PostgreSQL in Docker
docker run --name syntha-postgres-test \
  -e POSTGRES_PASSWORD=test123 \
  -e POSTGRES_DB=syntha_test \
  -p 5432:5432 \
  -d postgres:13
```

#### Option 2: Local Installation

**Ubuntu/Debian**:
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Create test database
sudo -u postgres createdb syntha_test
sudo -u postgres psql -c "CREATE USER test WITH PASSWORD 'test123';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE syntha_test TO test;"
```

**macOS**:
```bash
brew install postgresql
brew services start postgresql

# Create test database
createdb syntha_test
psql -d syntha_test -c "CREATE USER test WITH PASSWORD 'test123';"
psql -d syntha_test -c "GRANT ALL PRIVILEGES ON DATABASE syntha_test TO test;"
```

**Windows**:
```bash
# Download PostgreSQL installer from postgresql.org
# Follow the installation wizard
# Create test database using pgAdmin or psql
```

### Verification

```bash
# Test your connection
psql -h localhost -U test -d syntha_test -c "SELECT version();"
```

## Test Configuration

### Environment Variables

```bash
# Create .env.test file
SYNTHA_TEST_DB_TYPE=postgresql
SYNTHA_TEST_POSTGRES_URL=postgresql://test:test123@localhost:5432/syntha_test
SYNTHA_TEST_POSTGRES_HOST=localhost
SYNTHA_TEST_POSTGRES_PORT=5432
SYNTHA_TEST_POSTGRES_USER=test
SYNTHA_TEST_POSTGRES_PASSWORD=test123
SYNTHA_TEST_POSTGRES_DB=syntha_test
```

### pytest Configuration

```python
# tests/conftest.py
import pytest
import os
from syntha.persistence import create_database_backend

@pytest.fixture(scope="session")
def postgres_backend():
    """Create PostgreSQL backend for testing."""
    if not os.getenv("SYNTHA_TEST_POSTGRES_URL"):
        pytest.skip("PostgreSQL URL not configured")
    
    backend = create_database_backend(
        "postgresql",
        connection_string=os.getenv("SYNTHA_TEST_POSTGRES_URL")
    )
    
    backend.connect()
    backend.clear_all()
    
    yield backend
    
    backend.clear_all()
    backend.close()

@pytest.fixture
def clean_postgres_backend(postgres_backend):
    """Clean PostgreSQL backend for each test."""
    postgres_backend.clear_all()
    yield postgres_backend
    postgres_backend.clear_all()
```

## Running PostgreSQL Tests

### Basic Test Execution

```bash
# Run all tests with PostgreSQL
pytest tests/ -v --postgres

# Run specific test categories
pytest tests/integration/ -v --postgres
pytest tests/performance/ -v --postgres

# Run with coverage
pytest tests/ -v --postgres --cov=syntha --cov-report=html
```

### Test Markers

```python
# Mark tests for PostgreSQL
@pytest.mark.postgres
def test_postgresql_specific_feature():
    """Test PostgreSQL-specific functionality."""
    pass

@pytest.mark.skipif(
    not os.getenv("SYNTHA_TEST_POSTGRES_URL"),
    reason="PostgreSQL not configured"
)
def test_requires_postgres():
    """Test that requires PostgreSQL."""
    pass
```

## PostgreSQL-Specific Tests

### JSONB Testing

```python
def test_jsonb_storage(postgres_backend):
    """Test JSONB storage capabilities."""
    complex_data = {
        "user": {
            "id": 12345,
            "profile": {
                "name": "Test User",
                "settings": {
                    "theme": "dark",
                    "notifications": True,
                    "features": ["ai", "chat", "analytics"]
                }
            }
        }
    }
    
    postgres_backend.save_context_item(
        "user:12345",
        complex_data,
        ["agent1", "agent2"],
        None,
        time.time()
    )
    
    result = postgres_backend.get_context_item("user:12345")
    assert result is not None
    assert result[0] == complex_data
```

### Concurrency Testing

```python
import threading
import time

def test_concurrent_access(postgres_backend):
    """Test concurrent database access."""
    errors = []
    
    def worker(worker_id):
        try:
            for i in range(100):
                key = f"worker_{worker_id}_item_{i}"
                postgres_backend.save_context_item(
                    key,
                    {"worker": worker_id, "item": i},
                    [],
                    None,
                    time.time()
                )
        except Exception as e:
            errors.append(e)
    
    threads = []
    for i in range(10):
        t = threading.Thread(target=worker, args=(i,))
        threads.append(t)
        t.start()
    
    for t in threads:
        t.join()
    
    assert len(errors) == 0, f"Concurrent access errors: {errors}"
    
    all_items = postgres_backend.get_all_context_items()
    assert len(all_items) == 1000
```

### Performance Testing

```python
def test_large_dataset_performance(postgres_backend):
    """Test performance with large datasets."""
    large_data = {
        "records": [
            {"id": i, "data": f"record_{i}" * 100}
            for i in range(1000)
        ]
    }
    
    start_time = time.time()
    postgres_backend.save_context_item(
        "large_dataset",
        large_data,
        [],
        None,
        time.time()
    )
    save_time = time.time() - start_time
    
    start_time = time.time()
    result = postgres_backend.get_context_item("large_dataset")
    retrieve_time = time.time() - start_time
    
    assert save_time < 1.0, f"Save took too long: {save_time}s"
    assert retrieve_time < 0.1, f"Retrieval took too long: {retrieve_time}s"
    assert result is not None
    assert len(result[0]["records"]) == 1000
```

## Common Issues

### Connection Problems

**Error**: `psycopg2.OperationalError: could not connect to server`

**Solutions**:
1. Check if PostgreSQL is running: `sudo service postgresql status`
2. Verify connection string format
3. Check firewall settings
4. Ensure database exists: `createdb syntha_test`

### Authentication Issues

**Error**: `psycopg2.OperationalError: FATAL: password authentication failed`

**Solutions**:
1. Create test user: `createuser -s test`
2. Set password: `psql -c "ALTER USER test PASSWORD 'test123';"`
3. Check pg_hba.conf settings

### Database Permissions

**Error**: `psycopg2.ProgrammingError: permission denied for table`

**Solutions**:
1. Grant permissions: `GRANT ALL PRIVILEGES ON DATABASE syntha_test TO test;`
2. Make user superuser: `ALTER USER test WITH SUPERUSER;`
3. Check object ownership and permissions

### Missing Dependencies

**Error**: `ImportError: No module named 'psycopg2'`

**Solutions**:
1. Install psycopg2: `pip install psycopg2-binary`
2. For development: `pip install psycopg2`
3. Check virtual environment is activated

## Best Practices

### Test Database Management

```python
# Clean database state for each test
@pytest.fixture(autouse=True)
def cleanup_database(postgres_backend):
    """Ensure clean database state for each test."""
    postgres_backend.clear_all()
    yield
    postgres_backend.clear_all()

# Use transactions for test isolation
@pytest.fixture
def transactional_test(postgres_backend):
    """Run test in transaction that gets rolled back."""
    with postgres_backend.connection.cursor() as cursor:
        cursor.execute("BEGIN")
        yield postgres_backend
        cursor.execute("ROLLBACK")
```

### Connection Management

```python
# Use connection pooling
from psycopg2 import pool

connection_pool = psycopg2.pool.ThreadedConnectionPool(
    minconn=1,
    maxconn=20,
    dsn=connection_string
)

# Always close connections
def test_with_proper_cleanup(postgres_backend):
    try:
        # Test logic here
        pass
    finally:
        postgres_backend.close()
```

### Performance Considerations

- Use indexes for frequently queried columns
- Batch operations when possible
- Monitor connection counts
- Use prepared statements for security and performance

## Troubleshooting

### Debug Mode

```python
# Enable PostgreSQL query logging
import logging
logging.getLogger("psycopg2").setLevel(logging.DEBUG)

# Run tests with verbose output
pytest tests/ -v -s --postgres --log-cli-level=DEBUG
```

### Manual Testing

```python
# Test PostgreSQL connection manually
import psycopg2

try:
    conn = psycopg2.connect(
        host="localhost",
        database="syntha_test",
        user="test",
        password="test123"
    )
    print("Connection successful!")
    conn.close()
except Exception as e:
    print(f"Connection failed: {e}")
```

### Common Fixes

1. Restart PostgreSQL: `sudo service postgresql restart`
2. Check logs: `sudo tail -f /var/log/postgresql/postgresql-*.log`
3. Reset test database: `dropdb syntha_test && createdb syntha_test`
4. Update dependencies: `pip install --upgrade psycopg2-binary`

## CI/CD Integration

### GitHub Actions

```yaml
services:
  postgres:
    image: postgres:13
    env:
      POSTGRES_PASSWORD: test123
      POSTGRES_DB: syntha_test
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5

steps:
  - name: Run PostgreSQL tests
    run: pytest tests/ -v --postgres
    env:
      SYNTHA_TEST_POSTGRES_URL: postgresql://postgres:test123@localhost:5432/syntha_test
```

PostgreSQL testing ensures your application works correctly in production-like conditions and takes advantage of advanced database features not available in SQLite. 