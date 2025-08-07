# Topic-Based Routing

This example demonstrates how to use Syntha's topic-based routing system to organize and route context between different agents and workflows.

## Overview

Topic-based routing allows you to:
- Organize context by subject or workflow
- Route specific context to interested agents
- Create event-driven architectures
- Implement publish-subscribe patterns

## Basic Topic Operations

```python
from syntha import ContextMesh, ToolHandler

# Create context mesh and agents
mesh = ContextMesh(user_id="user123")
coordinator = ToolHandler(mesh, "Coordinator")
analyst = ToolHandler(mesh, "DataAnalyst")
reporter = ToolHandler(mesh, "Reporter")

# Push context to specific topics
coordinator.push_context("raw_data", {
    "sales": [100, 150, 200],
    "period": "Q1_2024"
}, topic="data_processing")

coordinator.push_context("requirements", {
    "format": "PDF",
    "charts": True,
    "deadline": "2024-01-15"
}, topic="report_generation")
```

## Topic Subscriptions

```python
# Set up topic subscriptions for different agents

# Data analyst subscribes to data processing topics
def handle_data_processing(topic, context_key, data):
    print(f"📊 Analyst received data: {context_key}")
    # Process the data
    if context_key == "raw_data":
        processed_data = {
            "total_sales": sum(data["sales"]),
            "average": sum(data["sales"]) / len(data["sales"]),
            "trend": "increasing"
        }
        analyst.push_context("processed_data", processed_data, topic="analysis_results")

analyst.subscribe_to_topic("data_processing", handle_data_processing)

# Reporter subscribes to analysis results and report requirements
def handle_report_generation(topic, context_key, data):
    print(f"📝 Reporter received: {context_key}")
    if context_key == "processed_data":
        # Generate report sections
        report_section = {
            "title": "Sales Analysis",
            "content": f"Total sales: {data['total_sales']}, Trend: {data['trend']}"
        }
        reporter.push_context("report_section", report_section, topic="final_report")

analyst.subscribe_to_topic("analysis_results", handle_report_generation)
reporter.subscribe_to_topic("report_generation", handle_report_generation)
```

## Multi-Step Workflow

```python
#!/usr/bin/env python3
"""
Topic-Based Routing Workflow Example

Demonstrates a complete data processing pipeline using topic routing.
"""

from syntha import ContextMesh, ToolHandler
import time
import json

class WorkflowDemo:
    def __init__(self):
        self.mesh = ContextMesh(user_id="workflow_demo")
        self.setup_agents()
        self.setup_subscriptions()
    
    def setup_agents(self):
        """Create specialized agents for different workflow steps."""
        self.data_collector = ToolHandler(self.mesh, "DataCollector")
        self.preprocessor = ToolHandler(self.mesh, "Preprocessor")
        self.analyzer = ToolHandler(self.mesh, "Analyzer")
        self.visualizer = ToolHandler(self.mesh, "Visualizer")
        self.reporter = ToolHandler(self.mesh, "Reporter")
    
    def setup_subscriptions(self):
        """Set up topic subscriptions for workflow routing."""
        
        # Preprocessor subscribes to raw data
        self.preprocessor.subscribe_to_topic("raw_data", self.preprocess_data)
        
        # Analyzer subscribes to cleaned data
        self.analyzer.subscribe_to_topic("cleaned_data", self.analyze_data)
        
        # Visualizer subscribes to analysis results
        self.visualizer.subscribe_to_topic("analysis_results", self.create_visualizations)
        
        # Reporter subscribes to visualizations and creates final output
        self.reporter.subscribe_to_topic("visualizations", self.generate_report)
    
    def preprocess_data(self, topic, context_key, data):
        """Clean and prepare raw data."""
        print(f"🧹 Preprocessing: {context_key}")
        
        # Simulate data cleaning
        cleaned_data = {
            "sales": [x for x in data["sales"] if x > 0],  # Remove negatives
            "period": data["period"],
            "clean_timestamp": time.time()
        }
        
        self.preprocessor.push_context("cleaned_sales", cleaned_data, topic="cleaned_data")
    
    def analyze_data(self, topic, context_key, data):
        """Perform statistical analysis."""
        print(f"📊 Analyzing: {context_key}")
        
        sales = data["sales"]
        analysis = {
            "total": sum(sales),
            "average": sum(sales) / len(sales),
            "min": min(sales),
            "max": max(sales),
            "growth_rate": (sales[-1] - sales[0]) / sales[0] * 100,
            "period": data["period"]
        }
        
        self.analyzer.push_context("sales_analysis", analysis, topic="analysis_results")
    
    def create_visualizations(self, topic, context_key, data):
        """Generate visualization specifications."""
        print(f"📈 Creating visualizations: {context_key}")
        
        viz_config = {
            "chart_type": "line",
            "title": f"Sales Trend - {data['period']}",
            "data_points": [
                {"x": "Month 1", "y": data["min"]},
                {"x": "Month 2", "y": data["average"]},
                {"x": "Month 3", "y": data["max"]}
            ],
            "summary": f"Growth rate: {data['growth_rate']:.1f}%"
        }
        
        self.visualizer.push_context("chart_config", viz_config, topic="visualizations")
    
    def generate_report(self, topic, context_key, data):
        """Generate final report."""
        print(f"📝 Generating report: {context_key}")
        
        # Get analysis data for context
        analysis = self.analyzer.get_context_by_topic("analysis_results")
        
        report = {
            "title": "Sales Performance Report",
            "summary": data["summary"],
            "chart": data,
            "analysis": analysis,
            "generated_at": time.time()
        }
        
        self.reporter.push_context("final_report", report, topic="completed_reports")
        print("✅ Report generation complete!")
    
    def run_workflow(self):
        """Execute the complete workflow."""
        print("🚀 Starting Topic-Based Workflow")
        print("=" * 50)
        
        # Step 1: Inject raw data
        raw_sales_data = {
            "sales": [150, 175, 220, 190, 240],
            "period": "Q1_2024",
            "source": "sales_system"
        }
        
        print("📥 Injecting raw data...")
        self.data_collector.push_context("quarterly_sales", raw_sales_data, topic="raw_data")
        
        # Allow time for async processing
        time.sleep(0.1)
        
        # Check final results
        print("\n📋 Workflow Results:")
        final_report = self.reporter.get_context_by_topic("completed_reports")
        if final_report:
            print(f"Final report generated: {json.dumps(final_report, indent=2)}")
        
        # Show topic activity
        print(f"\n📊 Topic Activity:")
        topics = self.mesh.list_topics()
        for topic in topics:
            context_data = self.data_collector.get_context_by_topic(topic)
            print(f"  {topic}: {len(context_data) if context_data else 0} items")
    
    def cleanup(self):
        """Clean up resources."""
        self.mesh.close()

def main():
    """Run the topic routing demo."""
    demo = WorkflowDemo()
    
    try:
        demo.run_workflow()
    finally:
        demo.cleanup()

if __name__ == "__main__":
    main()
```

## Advanced Topic Patterns

### Topic Hierarchies
```python
# Organize topics hierarchically
coordinator.push_context("user_action", {"action": "login"}, topic="events.user.login")
coordinator.push_context("system_event", {"event": "backup"}, topic="events.system.backup")
coordinator.push_context("error_log", {"error": "timeout"}, topic="events.system.error")

# Subscribe to topic patterns
def handle_user_events(topic, context_key, data):
    print(f"User event: {topic} - {context_key}")

def handle_system_events(topic, context_key, data):
    print(f"System event: {topic} - {context_key}")

# Subscribe to topic patterns (if supported)
handler.subscribe_to_topic_pattern("events.user.*", handle_user_events)
handler.subscribe_to_topic_pattern("events.system.*", handle_system_events)
```

### Event Sourcing Pattern
```python
# Use topics for event sourcing
def record_event(event_type, event_data):
    event = {
        "type": event_type,
        "data": event_data,
        "timestamp": time.time(),
        "sequence": get_next_sequence()
    }
    coordinator.push_context(f"event_{event['sequence']}", event, topic="event_stream")

# Record business events
record_event("user_registered", {"user_id": "123", "email": "user@example.com"})
record_event("order_placed", {"order_id": "456", "amount": 99.99})
record_event("payment_processed", {"order_id": "456", "status": "success"})
```

### Fan-Out Pattern
```python
# Broadcast to multiple interested parties
def broadcast_update(update_data):
    """Send update to all interested subsystems."""
    topics = ["notifications", "analytics", "audit_log", "cache_invalidation"]
    
    for topic in topics:
        coordinator.push_context("system_update", update_data, topic=topic)

# Different handlers can process the same data differently
notification_handler.subscribe_to_topic("notifications", send_user_notification)
analytics_handler.subscribe_to_topic("analytics", update_metrics)
audit_handler.subscribe_to_topic("audit_log", log_system_change)
```

## Best Practices

1. **Descriptive Topic Names**: Use clear, hierarchical topic names
2. **Data Immutability**: Don't modify data in subscription handlers
3. **Error Handling**: Always handle exceptions in subscription callbacks
4. **Topic Cleanup**: Remove unused topics to prevent memory leaks
5. **Subscription Management**: Unsubscribe when agents are no longer needed

## See Also

- [Basic Usage Example](basic-usage.md)
- [Multi-Agent Setup](../tools/multi-agent.md)
- [Context Mesh Concepts](../../user-guide/concepts/context-mesh.md)
- [Complete Workflows](../extras/complete-workflows.md)
