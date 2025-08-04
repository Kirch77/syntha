#!/usr/bin/env python3
"""
Performance benchmarks for Syntha framework integration.

Tests the performance of the new automatic framework integration system
including tool creation speed, caching efficiency, and memory usage.
"""

import time
import pytest
import sys
import psutil
import os
from typing import Dict, List, Any
from unittest.mock import patch

# Add the project root to path for imports
sys.path.insert(0, "..")

from syntha import ContextMesh, ToolHandler
from syntha.tool_factory import SynthaToolFactory
from syntha.framework_adapters import get_supported_frameworks


class PerformanceBenchmark:
    """Base class for performance benchmarks."""

    def __init__(self):
        self.results = {}

    def measure_time(self, func, *args, **kwargs):
        """Measure execution time of a function."""
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        return result, end_time - start_time

    def measure_memory(self, func, *args, **kwargs):
        """Measure memory usage of a function."""
        process = psutil.Process(os.getpid())
        mem_before = process.memory_info().rss / 1024 / 1024  # MB

        result = func(*args, **kwargs)

        mem_after = process.memory_info().rss / 1024 / 1024  # MB
        memory_delta = mem_after - mem_before

        return result, memory_delta

    def run_benchmark(self, name: str, func, iterations: int = 100, *args, **kwargs):
        """Run a benchmark multiple times and collect statistics."""
        times = []

        for _ in range(iterations):
            _, duration = self.measure_time(func, *args, **kwargs)
            times.append(duration)

        self.results[name] = {
            "iterations": iterations,
            "total_time": sum(times),
            "average_time": sum(times) / len(times),
            "min_time": min(times),
            "max_time": max(times),
            "times_per_second": iterations / sum(times) if sum(times) > 0 else 0,
        }

        return self.results[name]


class TestToolCreationPerformance:
    """Test performance of tool creation operations."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh()
        self.handler = ToolHandler(self.mesh, agent_name="PerfTestAgent")
        self.factory = SynthaToolFactory(self.handler)
        self.benchmark = PerformanceBenchmark()

    def test_single_tool_creation_speed(self):
        """Test speed of creating a single tool."""

        def create_openai_tool():
            return self.factory.create_tool("openai", "get_context")

        result = self.benchmark.run_benchmark(
            "single_tool_creation", create_openai_tool, iterations=1000
        )

        print(f"\n🚀 Single Tool Creation Performance:")
        print(f"  Average time: {result['average_time']*1000:.2f}ms")
        print(f"  Tools per second: {result['times_per_second']:.0f}")
        print(
            f"  Min/Max: {result['min_time']*1000:.2f}ms / {result['max_time']*1000:.2f}ms"
        )

        # Performance assertions
        assert result["average_time"] < 0.01  # Should be under 10ms
        assert result["times_per_second"] > 100  # Should create >100 tools/sec

    def test_multiple_tools_creation_speed(self):
        """Test speed of creating all tools for a framework."""

        def create_all_openai_tools():
            return self.factory.create_tools("openai")

        result = self.benchmark.run_benchmark(
            "all_tools_creation", create_all_openai_tools, iterations=100
        )

        tools = create_all_openai_tools()
        tool_count = len(tools)

        print(f"\n📦 All Tools Creation Performance ({tool_count} tools):")
        print(f"  Average time: {result['average_time']*1000:.2f}ms")
        print(f"  Tool sets per second: {result['times_per_second']:.1f}")
        print(f"  Time per tool: {result['average_time']/tool_count*1000:.2f}ms")

        # Performance assertions
        assert result["average_time"] < 0.1  # Should be under 100ms for all tools
        assert result["times_per_second"] > 10  # Should create >10 sets/sec

    def test_framework_comparison_speed(self):
        """Compare tool creation speed across frameworks."""
        frameworks = ["openai", "anthropic", "langgraph"]
        framework_results = {}

        for framework in frameworks:

            def create_framework_tools():
                return self.factory.create_tools(framework)

            result = self.benchmark.run_benchmark(
                f"{framework}_tools", create_framework_tools, iterations=50
            )
            framework_results[framework] = result

        print(f"\n⚖️  Framework Comparison:")
        for framework, result in framework_results.items():
            print(
                f"  {framework:>10}: {result['average_time']*1000:6.2f}ms avg, {result['times_per_second']:6.1f} sets/sec"
            )

        # All frameworks should be reasonably fast
        for framework, result in framework_results.items():
            assert result["average_time"] < 0.2, f"{framework} too slow"


class TestCachingPerformance:
    """Test performance of adapter caching system."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh()
        self.handler = ToolHandler(self.mesh, agent_name="CacheTestAgent")
        self.benchmark = PerformanceBenchmark()

    def test_cache_hit_vs_miss_performance(self):
        """Compare performance of cache hits vs misses."""
        factory = SynthaToolFactory(self.handler)

        # Measure cold start (cache miss)
        def create_adapter_cold():
            factory.clear_cache()
            return factory.get_adapter("openai")

        cold_result = self.benchmark.run_benchmark(
            "cache_miss", create_adapter_cold, iterations=100
        )

        # Warm up cache
        factory.get_adapter("openai")

        # Measure warm start (cache hit)
        def create_adapter_warm():
            return factory.get_adapter("openai")

        warm_result = self.benchmark.run_benchmark(
            "cache_hit", create_adapter_warm, iterations=1000
        )

        print(f"\n🗄️  Cache Performance:")
        print(f"  Cache miss: {cold_result['average_time']*1000:.2f}ms avg")
        print(f"  Cache hit:  {warm_result['average_time']*1000:.2f}ms avg")
        print(
            f"  Speedup:    {cold_result['average_time']/warm_result['average_time']:.1f}x"
        )

        # Cache hits should be significantly faster
        assert warm_result["average_time"] < cold_result["average_time"] / 2
        assert warm_result["average_time"] < 0.001  # Cache hits should be <1ms

    def test_multiple_framework_caching(self):
        """Test caching performance with multiple frameworks."""
        factory = SynthaToolFactory(self.handler)
        frameworks = ["openai", "anthropic", "langgraph"]

        # First run (cache misses)
        start_time = time.time()
        for framework in frameworks:
            factory.get_adapter(framework)
        first_run_time = time.time() - start_time

        # Second run (cache hits)
        start_time = time.time()
        for framework in frameworks:
            factory.get_adapter(framework)
        second_run_time = time.time() - start_time

        cache_info = factory.get_cache_info()

        print(f"\n🏎️  Multi-Framework Caching:")
        print(f"  First run (cold):  {first_run_time*1000:.2f}ms")
        print(f"  Second run (warm): {second_run_time*1000:.2f}ms")
        print(f"  Cache size:        {cache_info['cache_size']} adapters")
        print(f"  Speedup:           {first_run_time/second_run_time:.1f}x")

        assert cache_info["cache_size"] == len(frameworks)
        assert second_run_time < first_run_time / 3  # Should be at least 3x faster


class TestMemoryUsage:
    """Test memory usage of framework integration."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh()
        self.handler = ToolHandler(self.mesh, agent_name="MemoryTestAgent")
        self.benchmark = PerformanceBenchmark()

    def test_tool_creation_memory_usage(self):
        """Test memory usage during tool creation."""
        factory = SynthaToolFactory(self.handler)

        def create_many_tools():
            tools = []
            for _ in range(100):
                tools.extend(factory.create_tools("openai"))
            return tools

        tools, memory_delta = self.benchmark.measure_memory(create_many_tools)

        print(f"\n💾 Memory Usage:")
        print(f"  Tools created: {len(tools)}")
        print(f"  Memory delta:  {memory_delta:.2f} MB")
        print(f"  Memory per tool: {memory_delta/len(tools)*1024:.2f} KB")

        # Memory usage should be reasonable
        assert memory_delta < 50  # Should use less than 50MB
        assert memory_delta / len(tools) < 0.1  # Less than 100KB per tool

    def test_adapter_cache_memory_usage(self):
        """Test memory usage of adapter caching."""
        factory = SynthaToolFactory(self.handler)

        def create_cached_adapters():
            frameworks = get_supported_frameworks()
            for framework in frameworks:
                try:
                    factory.get_adapter(framework)
                except:
                    pass  # Skip frameworks with missing dependencies
            return factory.get_cache_info()

        cache_info, memory_delta = self.benchmark.measure_memory(create_cached_adapters)

        print(f"\n🗃️  Cache Memory Usage:")
        print(f"  Cached adapters: {cache_info['cache_size']}")
        print(f"  Memory delta:    {memory_delta:.2f} MB")
        print(
            f"  Memory per adapter: {memory_delta/max(cache_info['cache_size'], 1):.2f} MB"
        )

        # Cache should not use excessive memory
        assert memory_delta < 20  # Should use less than 20MB for cache


class TestScalabilityBenchmarks:
    """Test scalability with multiple handlers and tools."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh()
        self.benchmark = PerformanceBenchmark()

    def test_multiple_handlers_performance(self):
        """Test performance with multiple tool handlers."""

        def create_multiple_handlers(count):
            handlers = []
            for i in range(count):
                handler = ToolHandler(self.mesh, agent_name=f"Agent_{i}")
                factory = SynthaToolFactory(handler)
                tools = factory.create_tools("openai")
                handlers.append((handler, factory, tools))
            return handlers

        # Test with different numbers of handlers
        for count in [10, 50, 100]:
            result, duration = self.benchmark.measure_time(
                create_multiple_handlers, count
            )

            total_tools = sum(len(tools) for _, _, tools in result)

            print(f"\n👥 {count} Handlers Performance:")
            print(f"  Total time: {duration*1000:.2f}ms")
            print(f"  Time per handler: {duration/count*1000:.2f}ms")
            print(f"  Total tools: {total_tools}")
            print(f"  Tools per second: {total_tools/duration:.0f}")

            # Should scale reasonably
            assert duration < count * 0.1  # Less than 100ms per handler

    def test_concurrent_tool_creation(self):
        """Test concurrent tool creation performance."""
        import threading

        handlers = []
        for i in range(10):
            handler = ToolHandler(self.mesh, agent_name=f"ConcurrentAgent_{i}")
            handlers.append(handler)

        results = []

        def create_tools_for_handler(handler):
            factory = SynthaToolFactory(handler)
            start_time = time.time()
            tools = factory.create_tools("openai")
            duration = time.time() - start_time
            results.append((len(tools), duration))

        # Run concurrent tool creation
        start_time = time.time()
        threads = []
        for handler in handlers:
            thread = threading.Thread(target=create_tools_for_handler, args=(handler,))
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

        total_duration = time.time() - start_time

        total_tools = sum(tool_count for tool_count, _ in results)
        avg_duration = sum(duration for _, duration in results) / len(results)

        print(f"\n🧵 Concurrent Creation Performance:")
        print(f"  Threads: {len(threads)}")
        print(f"  Total time: {total_duration*1000:.2f}ms")
        print(f"  Avg thread time: {avg_duration*1000:.2f}ms")
        print(f"  Total tools: {total_tools}")
        print(f"  Concurrency benefit: {avg_duration/total_duration:.1f}x")

        # Concurrent execution should provide some benefit
        assert total_duration < avg_duration * 0.8  # Should be faster than sequential


class TestPerformanceRegression:
    """Test for performance regressions."""

    def setup_method(self):
        """Set up test fixtures."""
        self.mesh = ContextMesh()
        self.handler = ToolHandler(self.mesh, agent_name="RegressionTestAgent")
        self.benchmark = PerformanceBenchmark()

    def test_tool_creation_consistency(self):
        """Test that tool creation performance is consistent."""
        factory = SynthaToolFactory(self.handler)

        times = []
        for i in range(50):
            start_time = time.time()
            tools = factory.create_tools("openai")
            duration = time.time() - start_time
            times.append(duration)

        avg_time = sum(times) / len(times)
        max_deviation = max(abs(t - avg_time) for t in times)

        print(f"\n📊 Performance Consistency:")
        print(f"  Average time: {avg_time*1000:.2f}ms")
        print(f"  Max deviation: {max_deviation*1000:.2f}ms")
        print(f"  Coefficient of variation: {max_deviation/avg_time:.2%}")

        # Performance should be consistent (within 50% of average)
        assert max_deviation < avg_time * 0.5

    def test_memory_leak_detection(self):
        """Test for memory leaks during repeated operations."""
        import gc

        factory = SynthaToolFactory(self.handler)
        process = psutil.Process(os.getpid())

        # Initial memory measurement
        gc.collect()
        initial_memory = process.memory_info().rss / 1024 / 1024

        # Perform many operations
        for i in range(100):
            tools = factory.create_tools("openai")
            factory.clear_cache()
            del tools

            if i % 20 == 0:
                gc.collect()

        # Final memory measurement
        gc.collect()
        final_memory = process.memory_info().rss / 1024 / 1024
        memory_growth = final_memory - initial_memory

        print(f"\n🔍 Memory Leak Detection:")
        print(f"  Initial memory: {initial_memory:.2f} MB")
        print(f"  Final memory:   {final_memory:.2f} MB")
        print(f"  Memory growth:  {memory_growth:.2f} MB")
        print(f"  Growth per operation: {memory_growth/100*1024:.2f} KB")

        # Should not have significant memory growth
        assert memory_growth < 10  # Less than 10MB growth
        assert memory_growth / 100 < 0.1  # Less than 100KB per operation


def run_all_benchmarks():
    """Run all performance benchmarks and generate a report."""
    print("🏁 Syntha Framework Integration Performance Benchmarks")
    print("=" * 70)

    benchmark_classes = [
        TestToolCreationPerformance,
        TestCachingPerformance,
        TestMemoryUsage,
        TestScalabilityBenchmarks,
        TestPerformanceRegression,
    ]

    results = {}

    for benchmark_class in benchmark_classes:
        class_name = benchmark_class.__name__
        print(f"\n🧪 Running {class_name}...")

        try:
            benchmark = benchmark_class()
            benchmark.setup_method()

            # Run all test methods
            for method_name in dir(benchmark):
                if method_name.startswith("test_"):
                    print(f"\n  → {method_name}")
                    getattr(benchmark, method_name)()

            results[class_name] = "✅ PASSED"

        except Exception as e:
            print(f"❌ {class_name} failed: {e}")
            results[class_name] = f"❌ FAILED: {e}"

    # Generate summary report
    print(f"\n\n📋 Benchmark Summary")
    print("=" * 70)

    for class_name, result in results.items():
        print(f"  {result} {class_name}")

    passed = sum(1 for r in results.values() if r.startswith("✅"))
    total = len(results)

    print(f"\n📊 Overall Results: {passed}/{total} benchmark suites passed")

    if passed == total:
        print("🎉 All performance benchmarks passed!")
        print("💪 The framework integration system is performing well!")
    else:
        print("⚠️  Some benchmarks failed - performance review needed")


if __name__ == "__main__":
    run_all_benchmarks()
