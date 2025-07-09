# Performance Optimization Guide

Learn how to optimize Syntha for production workloads and high-performance multi-agent systems.

## Overview

Syntha provides several optimization features for production deployments:

- **Indexing System**: 10x faster context lookups
- **Auto-Cleanup**: Automatic memory management
- **Batch Operations**: Atomic multi-operation transactions
- **Connection Pooling**: Efficient resource management
- **Caching Strategies**: Reduced latency for frequent operations

## Core Performance Features

### Enable Indexing

Enable indexing for significantly faster context operations:

```python
from syntha import ContextMesh, ToolHandler

# Enable indexing for production workloads
mesh = ContextMesh(enable_indexing=True)
handler = ToolHandler(mesh)

# Indexing provides 10x faster lookups for large datasets
for i in range(10000):
    handler.handle_tool_call(
        "push_context",
        agent_name="DataLoader",
        key=f"user_{i}",
        value={"id": i, "name": f"User{i}", "active": True}
    )

# Fast retrieval with indexing
user = handler.handle_tool_call(
    "get_context",
    agent_name="UserService",
    key="user_5000"
)
```

### Auto-Cleanup System

Enable automatic cleanup to prevent memory leaks:

```python
# Enable auto-cleanup for production
mesh = ContextMesh(
    enable_indexing=True,
    auto_cleanup=True,
    cleanup_interval=300  # Cleanup every 5 minutes
)

# Context with TTL will be automatically cleaned up
handler.handle_tool_call(
    "push_context",
    agent_name="SessionManager",
    key="temp_session_123",
    value={"user_id": 123, "expires": "soon"},
    ttl=600  # Auto-cleaned after 10 minutes
)
```

### Batch Operations

Use batch operations for multiple context changes:

```python
# Atomic batch operations
batch_result = handler.handle_tool_call(
    "batch_context_operation",
    agent_name="DataProcessor",
    operations=[
        {"type": "push", "key": "metric1", "value": 100},
        {"type": "push", "key": "metric2", "value": 200},
        {"type": "push", "key": "metric3", "value": 300},
        {"type": "get", "key": "baseline_metrics"}
    ],
    atomic=True  # All operations succeed or all fail
)

print(f"Batch completed: {batch_result['success']}")
```

## Advanced Optimization Techniques

### Connection Pooling

Reuse ContextMesh and ToolHandler instances:

```python
from threading import local
import threading

class SynthaConnectionPool:
    def __init__(self, max_connections=10):
        self.max_connections = max_connections
        self.connections = []
        self.lock = threading.Lock()
        self.local = local()

    def get_connection(self):
        """Get a connection from the pool"""
        if hasattr(self.local, 'handler'):
            return self.local.handler

        with self.lock:
            if self.connections:
                mesh, handler = self.connections.pop()
            else:
                mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
                handler = ToolHandler(mesh)

            self.local.handler = handler
            self.local.mesh = mesh
            return handler

    def return_connection(self, handler):
        """Return a connection to the pool"""
        with self.lock:
            if len(self.connections) < self.max_connections:
                self.connections.append((self.local.mesh, handler))

# Usage
pool = SynthaConnectionPool()

def agent_operation():
    handler = pool.get_connection()
    try:
        # Perform operations
        result = handler.handle_tool_call(
            "get_context",
            agent_name="Agent1",
            key="data"
        )
        return result
    finally:
        pool.return_connection(handler)
```

### Caching Strategies

Implement intelligent caching for frequently accessed data:

```python
from functools import lru_cache
from threading import Lock
import time

class ContextCache:
    def __init__(self, handler, cache_size=1000, default_ttl=300):
        self.handler = handler
        self.cache = {}
        self.cache_times = {}
        self.cache_size = cache_size
        self.default_ttl = default_ttl
        self.lock = Lock()

    def get_cached_context(self, agent_name, key, ttl=None):
        """Get context with caching"""
        cache_key = f"{agent_name}:{key}"
        current_time = time.time()
        ttl = ttl or self.default_ttl

        with self.lock:
            # Check cache
            if cache_key in self.cache:
                cached_time = self.cache_times[cache_key]
                if current_time - cached_time < ttl:
                    return self.cache[cache_key]
                else:
                    # Cache expired
                    del self.cache[cache_key]
                    del self.cache_times[cache_key]

        # Cache miss - fetch from context mesh
        try:
            result = self.handler.handle_tool_call(
                "get_context",
                agent_name=agent_name,
                key=key
            )

            with self.lock:
                # Add to cache
                if len(self.cache) >= self.cache_size:
                    # Remove oldest entry
                    oldest_key = min(self.cache_times.keys(),
                                   key=lambda k: self.cache_times[k])
                    del self.cache[oldest_key]
                    del self.cache_times[oldest_key]

                self.cache[cache_key] = result
                self.cache_times[cache_key] = current_time

            return result
        except Exception as e:
            return {"error": str(e)}

    def invalidate_cache(self, agent_name=None, key=None):
        """Invalidate cache entries"""
        with self.lock:
            if agent_name and key:
                cache_key = f"{agent_name}:{key}"
                self.cache.pop(cache_key, None)
                self.cache_times.pop(cache_key, None)
            elif agent_name:
                # Invalidate all entries for agent
                keys_to_remove = [k for k in self.cache.keys()
                                if k.startswith(f"{agent_name}:")]
                for key in keys_to_remove:
                    del self.cache[key]
                    del self.cache_times[key]
            else:
                # Clear entire cache
                self.cache.clear()
                self.cache_times.clear()
```

### Asynchronous Operations

For high-throughput systems, use asynchronous patterns:

```python
import asyncio
from concurrent.futures import ThreadPoolExecutor
import threading

class AsyncSynthaManager:
    def __init__(self, max_workers=10):
        self.executor = ThreadPoolExecutor(max_workers=max_workers)
        self.handlers = {}
        self.lock = threading.Lock()

    def get_handler(self):
        """Get thread-local handler"""
        thread_id = threading.get_ident()
        if thread_id not in self.handlers:
            with self.lock:
                if thread_id not in self.handlers:
                    mesh = ContextMesh(enable_indexing=True, auto_cleanup=True)
                    self.handlers[thread_id] = ToolHandler(mesh)
        return self.handlers[thread_id]

    async def async_context_operation(self, tool_name, **kwargs):
        """Perform context operation asynchronously"""
        loop = asyncio.get_event_loop()

        def sync_operation():
            handler = self.get_handler()
            return handler.handle_tool_call(tool_name, **kwargs)

        return await loop.run_in_executor(self.executor, sync_operation)

    async def batch_async_operations(self, operations):
        """Perform multiple operations concurrently"""
        tasks = []
        for op in operations:
            task = self.async_context_operation(op["tool"], **op["args"])
            tasks.append(task)

        return await asyncio.gather(*tasks, return_exceptions=True)

# Usage
async def main():
    manager = AsyncSynthaManager()

    # Concurrent context operations
    operations = [
        {"tool": "get_context", "args": {"agent_name": "Agent1", "key": "data1"}},
        {"tool": "get_context", "args": {"agent_name": "Agent2", "key": "data2"}},
        {"tool": "push_context", "args": {"agent_name": "Agent3", "key": "result", "value": {"status": "complete"}}}
    ]

    results = await manager.batch_async_operations(operations)
    return results

# Run async operations
# results = asyncio.run(main())
```

## Memory Optimization

### Efficient Data Structures

Use efficient data structures for large datasets:

```python
import json
import pickle
import gzip

class OptimizedContext:
    def __init__(self, handler):
        self.handler = handler

    def store_compressed_data(self, agent_name, key, data, use_pickle=False):
        """Store large data with compression"""
        if use_pickle:
            # Use pickle for complex Python objects
            serialized = pickle.dumps(data)
        else:
            # Use JSON for simple data
            serialized = json.dumps(data).encode('utf-8')

        # Compress the data
        compressed = gzip.compress(serialized)

        # Store compressed data
        return self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"compressed.{key}",
            value={
                "data": compressed.hex(),  # Store as hex string
                "compression": "gzip",
                "serialization": "pickle" if use_pickle else "json",
                "original_size": len(serialized),
                "compressed_size": len(compressed)
            }
        )

    def get_compressed_data(self, agent_name, key):
        """Retrieve and decompress data"""
        result = self.handler.handle_tool_call(
            "get_context",
            agent_name=agent_name,
            key=f"compressed.{key}"
        )

        metadata = result["value"]
        compressed = bytes.fromhex(metadata["data"])

        # Decompress
        decompressed = gzip.decompress(compressed)

        # Deserialize
        if metadata["serialization"] == "pickle":
            return pickle.loads(decompressed)
        else:
            return json.loads(decompressed.decode('utf-8'))
```

### Memory Monitoring

Monitor memory usage and optimize accordingly:

```python
import psutil
import gc
from collections import defaultdict

class MemoryMonitor:
    def __init__(self, handler):
        self.handler = handler
        self.memory_stats = defaultdict(list)

    def get_memory_usage(self):
        """Get current memory usage"""
        process = psutil.Process()
        memory_info = process.memory_info()
        return {
            "rss": memory_info.rss,  # Resident Set Size
            "vms": memory_info.vms,  # Virtual Memory Size
            "percent": process.memory_percent()
        }

    def monitor_operation(self, operation_name, operation_func):
        """Monitor memory usage during operation"""
        # Measure before
        gc.collect()  # Force garbage collection
        before = self.get_memory_usage()

        # Perform operation
        start_time = time.time()
        result = operation_func()
        duration = time.time() - start_time

        # Measure after
        gc.collect()
        after = self.get_memory_usage()

        # Store stats
        stats = {
            "operation": operation_name,
            "duration": duration,
            "memory_before": before,
            "memory_after": after,
            "memory_delta": after["rss"] - before["rss"],
            "timestamp": time.time()
        }

        self.memory_stats[operation_name].append(stats)

        # Store in context for monitoring
        self.handler.handle_tool_call(
            "push_context",
            agent_name="MemoryMonitor",
            key=f"memory_stats.{operation_name}.{int(time.time())}",
            value=stats,
            ttl=3600  # Keep for 1 hour
        )

        return result

    def get_memory_report(self):
        """Generate memory usage report"""
        report = {}
        for operation, stats_list in self.memory_stats.items():
            if stats_list:
                avg_memory_delta = sum(s["memory_delta"] for s in stats_list) / len(stats_list)
                avg_duration = sum(s["duration"] for s in stats_list) / len(stats_list)

                report[operation] = {
                    "average_memory_delta": avg_memory_delta,
                    "average_duration": avg_duration,
                    "operation_count": len(stats_list),
                    "total_memory_impact": sum(s["memory_delta"] for s in stats_list)
                }

        return report

# Usage
monitor = MemoryMonitor(handler)

def expensive_operation():
    # Simulate memory-intensive operation
    data = list(range(100000))
    return handler.handle_tool_call(
        "push_context",
        agent_name="DataProcessor",
        key="large_dataset",
        value=data
    )

# Monitor the operation
result = monitor.monitor_operation("large_data_push", expensive_operation)
report = monitor.get_memory_report()
```

## Performance Benchmarking

### Benchmark Context Operations

```python
import time
import statistics
from concurrent.futures import ThreadPoolExecutor

class PerformanceBenchmark:
    def __init__(self, handler):
        self.handler = handler
        self.results = {}

    def benchmark_context_operations(self, num_operations=1000):
        """Benchmark basic context operations"""

        # Benchmark push operations
        start_time = time.time()
        for i in range(num_operations):
            self.handler.handle_tool_call(
                "push_context",
                agent_name="BenchmarkAgent",
                key=f"bench_key_{i}",
                value={"data": f"value_{i}", "index": i}
            )
        push_time = time.time() - start_time

        # Benchmark get operations
        start_time = time.time()
        for i in range(num_operations):
            self.handler.handle_tool_call(
                "get_context",
                agent_name="BenchmarkAgent",
                key=f"bench_key_{i}"
            )
        get_time = time.time() - start_time

        # Benchmark list operations
        start_time = time.time()
        self.handler.handle_tool_call(
            "list_context_keys",
            agent_name="BenchmarkAgent",
            pattern="bench_key_*"
        )
        list_time = time.time() - start_time

        return {
            "push_total_time": push_time,
            "push_ops_per_second": num_operations / push_time,
            "get_total_time": get_time,
            "get_ops_per_second": num_operations / get_time,
            "list_time": list_time,
            "total_operations": num_operations
        }

    def benchmark_concurrent_operations(self, num_threads=10, operations_per_thread=100):
        """Benchmark concurrent operations"""

        def worker_function(thread_id):
            thread_times = []
            for i in range(operations_per_thread):
                start = time.time()
                self.handler.handle_tool_call(
                    "push_context",
                    agent_name=f"ConcurrentAgent_{thread_id}",
                    key=f"concurrent_key_{thread_id}_{i}",
                    value={"thread": thread_id, "operation": i}
                )
                thread_times.append(time.time() - start)
            return thread_times

        start_time = time.time()
        with ThreadPoolExecutor(max_workers=num_threads) as executor:
            futures = [executor.submit(worker_function, i) for i in range(num_threads)]
            all_times = []
            for future in futures:
                all_times.extend(future.result())

        total_time = time.time() - start_time
        total_operations = num_threads * operations_per_thread

        return {
            "total_time": total_time,
            "total_operations": total_operations,
            "ops_per_second": total_operations / total_time,
            "average_operation_time": statistics.mean(all_times),
            "median_operation_time": statistics.median(all_times),
            "min_operation_time": min(all_times),
            "max_operation_time": max(all_times),
            "num_threads": num_threads
        }

    def benchmark_batch_operations(self, batch_sizes=[1, 10, 50, 100]):
        """Benchmark batch operation performance"""
        results = {}

        for batch_size in batch_sizes:
            operations = []
            for i in range(batch_size):
                operations.append({
                    "type": "push",
                    "key": f"batch_key_{i}",
                    "value": {"batch_item": i}
                })

            # Time batch operation
            start_time = time.time()
            self.handler.handle_tool_call(
                "batch_context_operation",
                agent_name="BatchAgent",
                operations=operations,
                atomic=True
            )
            batch_time = time.time() - start_time

            # Time individual operations
            start_time = time.time()
            for op in operations:
                self.handler.handle_tool_call(
                    "push_context",
                    agent_name="IndividualAgent",
                    key=op["key"] + "_individual",
                    value=op["value"]
                )
            individual_time = time.time() - start_time

            results[batch_size] = {
                "batch_time": batch_time,
                "individual_time": individual_time,
                "speedup": individual_time / batch_time if batch_time > 0 else 0,
                "batch_ops_per_second": batch_size / batch_time if batch_time > 0 else 0
            }

        return results

# Run benchmarks
benchmark = PerformanceBenchmark(handler)

print("Basic operations benchmark:")
basic_results = benchmark.benchmark_context_operations(1000)
for key, value in basic_results.items():
    print(f"  {key}: {value}")

print("\nConcurrent operations benchmark:")
concurrent_results = benchmark.benchmark_concurrent_operations(10, 100)
for key, value in concurrent_results.items():
    print(f"  {key}: {value}")

print("\nBatch operations benchmark:")
batch_results = benchmark.benchmark_batch_operations()
for batch_size, metrics in batch_results.items():
    print(f"  Batch size {batch_size}: {metrics['speedup']:.2f}x speedup")
```

## Production Deployment Guidelines

### Configuration Best Practices

```python
# Production configuration
def create_production_context():
    return ContextMesh(
        enable_indexing=True,      # Essential for performance
        auto_cleanup=True,         # Prevent memory leaks
        cleanup_interval=300,      # Clean every 5 minutes
        max_memory_usage=1024,     # 1GB memory limit (if supported)
        enable_metrics=True        # Track performance metrics
    )

# Development configuration
def create_development_context():
    return ContextMesh(
        enable_indexing=False,     # Simpler debugging
        auto_cleanup=False,        # Manual cleanup for testing
        enable_metrics=True        # Track performance
    )
```

### Monitoring and Alerting

```python
class ProductionMonitor:
    def __init__(self, handler):
        self.handler = handler
        self.alert_thresholds = {
            "operation_time": 1.0,      # 1 second
            "memory_usage_mb": 512,     # 512 MB
            "error_rate": 0.05          # 5% error rate
        }

    def monitor_performance(self):
        """Monitor system performance"""
        start_time = time.time()

        try:
            # Test operation
            self.handler.handle_tool_call(
                "get_context",
                agent_name="HealthCheck",
                key="system_status"
            )

            operation_time = time.time() - start_time

            # Check thresholds
            if operation_time > self.alert_thresholds["operation_time"]:
                self.send_alert(f"Slow operation detected: {operation_time:.2f}s")

            # Check memory usage
            memory_usage = psutil.Process().memory_info().rss / 1024 / 1024  # MB
            if memory_usage > self.alert_thresholds["memory_usage_mb"]:
                self.send_alert(f"High memory usage: {memory_usage:.1f}MB")

            return {
                "status": "healthy",
                "operation_time": operation_time,
                "memory_usage_mb": memory_usage
            }

        except Exception as e:
            self.send_alert(f"System error: {str(e)}")
            return {"status": "error", "error": str(e)}

    def send_alert(self, message):
        """Send alert (implement your alerting system)"""
        print(f"ALERT: {message}")
        # Integrate with your monitoring system (PagerDuty, Slack, etc.)
```

## Next Steps

- Review [Security Guide](security.md) for production security considerations
- Check [Best Practices](best-practices.md) for deployment patterns
- Explore [Troubleshooting](troubleshooting.md) for common performance issues

## See Also

- [ContextMesh API](../api/context-mesh.md) - Core performance features
- [Batch Operations](../api/tool-schemas.md#7-batch_context_operation) - Atomic operations
- [Production Examples](../examples/) - Real-world optimized implementations
