# PostgreSQL Testing Guide for Syntha SDK

## Overview

The Syntha SDK includes comprehensive PostgreSQL testing to ensure the persistence layer works correctly with PostgreSQL databases. This guide covers how to set up and run PostgreSQL tests.

## Available PostgreSQL Tests

The test suite includes **5 PostgreSQL-specific tests**:

### 1. Integration Tests (1 test)
- **`test_full_persistence_cycle[postgresql]`** - Tests complete persistence lifecycle with PostgreSQL

### 2. Backend Tests (2 tests)
- **`test_postgresql_backend_creation`** - Tests creating PostgreSQL backend
- **`test_postgresql_basic_operations`** - Tests basic PostgreSQL CRUD operations

### 3. Factory Tests (1 test)
- **`test_create_postgresql_backend`** - Tests creating PostgreSQL backend via factory

### 4. Error Handling Tests (1 test)
- **`test_postgresql_connection_failure`** - Tests PostgreSQL connection failure scenarios

## Prerequisites

1. **Python Package**: `psycopg2-binary` (already installed ✅)
2. **PostgreSQL Database**: Running PostgreSQL instance
3. **Environment Variable**: `POSTGRES_URL` set to connection string

## Setup Options

### Option A: Docker (Recommended)

#### 1. Start Docker Desktop
- Search for "Docker Desktop" in Windows Start menu
- Start Docker Desktop
- Wait for Docker whale icon to appear in system tray

#### 2. Run Setup Script
```powershell
python setup_postgres_tests.py
```

#### 3. Manual Docker Setup (Alternative)
```powershell
# Create and start PostgreSQL container
docker run -d --name syntha-postgres `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=syntha_test `
  -p 5432:5432 `
  postgres:13

# Wait for PostgreSQL to start
Start-Sleep -Seconds 5

# Set environment variable
$env:POSTGRES_URL = "postgresql://postgres:postgres@localhost:5432/syntha_test"

# Run tests
python -m pytest tests/ -k "postgresql" -v
```

### Option B: Local PostgreSQL Installation

#### 1. Install PostgreSQL
- Download from: https://www.postgresql.org/download/windows/
- Use these settings during installation:
  - Username: `postgres`
  - Password: `postgres`
  - Port: `5432`
  - Database: `postgres`

#### 2. Create Test Database
```sql
-- Connect to PostgreSQL as postgres user
CREATE DATABASE syntha_test;
```

#### 3. Set Environment Variable
```powershell
$env:POSTGRES_URL = "postgresql://postgres:postgres@localhost:5432/syntha_test"
```

#### 4. Run Tests
```powershell
python -m pytest tests/ -k "postgresql" -v
```

## Running Tests

### Run All PostgreSQL Tests
```powershell
$env:POSTGRES_URL = "postgresql://postgres:postgres@localhost:5432/syntha_test"
python -m pytest tests/ -k "postgresql" -v
```

### Run Specific Test Categories
```powershell
# Integration tests only
python -m pytest tests/integration/ -k "postgresql" -v

# Unit tests only
python -m pytest tests/unit/ -k "postgresql" -v

# Backend tests only
python -m pytest tests/unit/test_persistence.py::TestPostgreSQLBackend -v
```

### Run Single Test
```powershell
python -m pytest tests/unit/test_persistence.py::TestPostgreSQLBackend::test_postgresql_basic_operations -v
```

## Test Coverage

The PostgreSQL tests cover:

### ✅ Core Functionality
- Database connection and disconnection
- Schema initialization (tables, indexes)
- CRUD operations (Create, Read, Update, Delete)
- Agent topic subscriptions
- Agent permissions management

### ✅ Advanced Features
- TTL (Time To Live) cleanup
- Concurrent access handling
- JSONB data type usage
- Transaction management

### ✅ Error Handling
- Connection failures
- Invalid connection strings
- Database unavailability
- Data corruption scenarios

### ✅ Performance
- Bulk operations
- Index usage
- Query optimization

## Expected Test Results

When PostgreSQL is properly configured, you should see:

```
tests/integration/test_integration.py::TestDatabaseIntegration::test_full_persistence_cycle[postgresql] PASSED
tests/unit/test_persistence.py::TestPostgreSQLBackend::test_postgresql_backend_creation PASSED
tests/unit/test_persistence.py::TestPostgreSQLBackend::test_postgresql_basic_operations PASSED
tests/unit/test_persistence.py::TestDatabaseBackendFactory::test_create_postgresql_backend PASSED
tests/unit/test_persistence.py::TestDatabaseErrorHandling::test_postgresql_connection_failure PASSED

=================== 5 passed in X.XXs ===================
```

## Troubleshooting

### Common Issues

#### 1. "PostgreSQL not available" Error
```
pytest.skip("PostgreSQL not available")
```
**Solution**: Set the `POSTGRES_URL` environment variable:
```powershell
$env:POSTGRES_URL = "postgresql://postgres:postgres@localhost:5432/syntha_test"
```

#### 2. Connection Refused
```
psycopg2.OperationalError: connection to server at "localhost" (127.0.0.1), port 5432 failed
```
**Solution**: Ensure PostgreSQL is running on port 5432

#### 3. Database Does Not Exist
```
psycopg2.OperationalError: database "syntha_test" does not exist
```
**Solution**: Create the test database:
```sql
CREATE DATABASE syntha_test;
```

#### 4. Authentication Failed
```
psycopg2.OperationalError: FATAL: password authentication failed for user "postgres"
```
**Solution**: Check username/password in connection string

### Connection String Format

The connection string format is:
```
postgresql://username:password@host:port/database
```

Examples:
- Local: `postgresql://postgres:postgres@localhost:5432/syntha_test`
- Remote: `postgresql://user:pass@db.example.com:5432/syntha_test`
- With SSL: `postgresql://user:pass@host:5432/db?sslmode=require`

## Integration with CI/CD

For continuous integration, add these steps to your pipeline:

```yaml
# GitHub Actions example
- name: Start PostgreSQL
  run: |
    docker run -d --name postgres \
      -e POSTGRES_PASSWORD=postgres \
      -e POSTGRES_DB=syntha_test \
      -p 5432:5432 \
      postgres:13

- name: Wait for PostgreSQL
  run: sleep 10

- name: Run PostgreSQL Tests
  env:
    POSTGRES_URL: postgresql://postgres:postgres@localhost:5432/syntha_test
  run: python -m pytest tests/ -k "postgresql" -v
```

## Performance Considerations

PostgreSQL tests include performance verification:

- **Connection pooling**: Tests verify efficient connection management
- **Query optimization**: Tests ensure proper index usage
- **Bulk operations**: Tests verify batch insert/update performance
- **Concurrent access**: Tests verify thread-safe operations

## Database Schema

The tests create these PostgreSQL tables:

```sql
-- Context storage
CREATE TABLE context_items (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    subscribers JSONB NOT NULL,
    ttl REAL,
    created_at REAL NOT NULL
);

-- Agent topic subscriptions
CREATE TABLE agent_topics (
    agent_name TEXT PRIMARY KEY,
    topics JSONB NOT NULL
);

-- Agent permissions
CREATE TABLE agent_permissions (
    agent_name TEXT PRIMARY KEY,
    allowed_topics JSONB NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_context_created_at ON context_items(created_at);
CREATE INDEX idx_context_ttl ON context_items(ttl);
```

## Next Steps

1. **Set up PostgreSQL** using one of the methods above
2. **Run the tests** to verify everything works
3. **Integrate into CI/CD** for automated testing
4. **Monitor performance** in production environments

For questions or issues, check the troubleshooting section or review the test implementation in:
- `tests/unit/test_persistence.py`
- `tests/integration/test_integration.py`
- `syntha/persistence.py` 