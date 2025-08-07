# Multi-Agent Setup

This example demonstrates how to set up and coordinate multiple AI agents using Syntha's context mesh, enabling sophisticated multi-agent workflows and communication.

## Overview

Multi-agent setups with Syntha enable:
- Shared context between multiple agents
- Coordinated workflows and task distribution
- Specialized agent roles and responsibilities
- Event-driven inter-agent communication

## Basic Multi-Agent Setup

```python
from syntha import ContextMesh, ToolHandler
from syntha.tool_factory import SynthaToolFactory

# Create shared context mesh
mesh = ContextMesh(user_id="multi_agent_system")

# Create multiple specialized agents
data_analyst = ToolHandler(mesh, "DataAnalyst")
report_writer = ToolHandler(mesh, "ReportWriter")
quality_checker = ToolHandler(mesh, "QualityChecker")
coordinator = ToolHandler(mesh, "Coordinator")

# Each agent gets their own tools
analyst_tools = SynthaToolFactory(data_analyst).create_tools("openai")
writer_tools = SynthaToolFactory(report_writer).create_tools("openai")
checker_tools = SynthaToolFactory(quality_checker).create_tools("openai")
coordinator_tools = SynthaToolFactory(coordinator).create_tools("openai")

print(f"Created {len(analyst_tools)} tools for DataAnalyst")
print(f"Created {len(writer_tools)} tools for ReportWriter")
print(f"Created {len(checker_tools)} tools for QualityChecker")
```

## Complete Multi-Agent Workflow

```python
#!/usr/bin/env python3
"""
Multi-Agent Coordination System

Demonstrates a complete workflow with multiple specialized agents
working together through shared context.
"""

from syntha import ContextMesh, ToolHandler
from syntha.tool_factory import SynthaToolFactory
import json
import time
from datetime import datetime
from typing import Dict, Any, List

class MultiAgentSystem:
    def __init__(self, user_id: str):
        self.mesh = ContextMesh(user_id=user_id)
        self.agents = {}
        self.workflows = {}
        self.setup_agents()
        self.setup_workflows()
    
    def setup_agents(self):
        """Create specialized agents with specific roles."""
        
        # Data Collection Agent
        self.agents['collector'] = ToolHandler(self.mesh, "DataCollector")
        
        # Data Analysis Agent
        self.agents['analyst'] = ToolHandler(self.mesh, "DataAnalyst")
        
        # Report Generation Agent
        self.agents['reporter'] = ToolHandler(self.mesh, "ReportWriter")
        
        # Quality Assurance Agent
        self.agents['qa'] = ToolHandler(self.mesh, "QualityChecker")
        
        # Coordination Agent
        self.agents['coordinator'] = ToolHandler(self.mesh, "WorkflowCoordinator")
        
        # Notification Agent
        self.agents['notifier'] = ToolHandler(self.mesh, "NotificationManager")
        
        print(f"✅ Created {len(self.agents)} specialized agents")
    
    def setup_workflows(self):
        """Set up inter-agent communication workflows."""
        
        # Data processing workflow
        self.agents['analyst'].subscribe_to_topic("raw_data", self.handle_data_analysis)
        self.agents['reporter'].subscribe_to_topic("analysis_complete", self.handle_report_generation)
        self.agents['qa'].subscribe_to_topic("report_draft", self.handle_quality_check)
        self.agents['notifier'].subscribe_to_topic("workflow_complete", self.handle_notifications)
        
        print("✅ Workflow subscriptions configured")
    
    def handle_data_analysis(self, topic: str, context_key: str, data: Any):
        """Data analyst processes raw data."""
        
        print(f"📊 DataAnalyst processing: {context_key}")
        
        # Simulate data analysis
        if "sales_data" in context_key:
            analysis_result = {
                "total_sales": sum(data.get("sales", [])),
                "average": sum(data.get("sales", [])) / len(data.get("sales", [1])),
                "trend": "increasing" if data.get("sales", [0, 1])[-1] > data.get("sales", [1, 0])[0] else "decreasing",
                "period": data.get("period", "unknown"),
                "analyzed_at": datetime.now().isoformat(),
                "analysis_agent": "DataAnalyst"
            }
            
            # Store analysis result
            self.agents['analyst'].push_context(
                f"analysis_{context_key}",
                analysis_result,
                topic="analysis_complete"
            )
            
            print(f"   ✅ Analysis complete: ${analysis_result['total_sales']:,.2f} total sales")
    
    def handle_report_generation(self, topic: str, context_key: str, data: Any):
        """Report writer generates reports from analysis."""
        
        print(f"📝 ReportWriter generating: {context_key}")
        
        # Generate report content
        report = {
            "title": f"Sales Analysis Report - {data.get('period', 'Unknown Period')}",
            "executive_summary": f"Total sales reached ${data.get('total_sales', 0):,.2f} with a {data.get('trend', 'stable')} trend.",
            "key_metrics": {
                "total_sales": data.get('total_sales', 0),
                "average_sales": data.get('average', 0),
                "trend": data.get('trend', 'unknown')
            },
            "recommendations": self.generate_recommendations(data),
            "generated_at": datetime.now().isoformat(),
            "generated_by": "ReportWriter",
            "source_analysis": context_key
        }
        
        # Store report draft
        self.agents['reporter'].push_context(
            f"report_draft_{int(time.time())}",
            report,
            topic="report_draft"
        )
        
        print(f"   ✅ Report draft generated: {report['title']}")
    
    def handle_quality_check(self, topic: str, context_key: str, data: Any):
        """Quality checker reviews reports."""
        
        print(f"🔍 QualityChecker reviewing: {context_key}")
        
        # Perform quality checks
        quality_score = self.calculate_quality_score(data)
        
        quality_report = {
            "report_id": context_key,
            "quality_score": quality_score,
            "checks_performed": [
                "grammar_check",
                "data_accuracy",
                "completeness",
                "formatting"
            ],
            "status": "approved" if quality_score >= 8.0 else "needs_revision",
            "feedback": self.generate_quality_feedback(quality_score),
            "reviewed_at": datetime.now().isoformat(),
            "reviewed_by": "QualityChecker"
        }
        
        # Store quality assessment
        self.agents['qa'].push_context(
            f"qa_{context_key}",
            quality_report,
            topic="quality_complete"
        )
        
        if quality_report["status"] == "approved":
            # Mark workflow as complete
            final_report = {
                "report": data,
                "quality_assessment": quality_report,
                "final_status": "completed",
                "completed_at": datetime.now().isoformat()
            }
            
            self.agents['qa'].push_context(
                f"final_{context_key}",
                final_report,
                topic="workflow_complete"
            )
        
        print(f"   ✅ Quality check complete: {quality_report['status']} (score: {quality_score}/10)")
    
    def handle_notifications(self, topic: str, context_key: str, data: Any):
        """Notification manager handles completed workflows."""
        
        print(f"📨 NotificationManager processing: {context_key}")
        
        notification = {
            "type": "workflow_completed",
            "workflow_id": context_key,
            "report_title": data["report"]["title"],
            "completion_time": data["completed_at"],
            "quality_score": data["quality_assessment"]["quality_score"],
            "stakeholders": ["management", "sales_team", "analysts"],
            "notification_sent_at": datetime.now().isoformat()
        }
        
        self.agents['notifier'].push_context(
            f"notification_{context_key}",
            notification,
            topic="notifications_sent"
        )
        
        print(f"   ✅ Notifications sent for: {notification['report_title']}")
    
    def generate_recommendations(self, analysis_data: Dict) -> List[str]:
        """Generate recommendations based on analysis."""
        
        recommendations = []
        trend = analysis_data.get('trend', 'stable')
        
        if trend == 'increasing':
            recommendations.extend([
                "Maintain current sales strategies",
                "Consider expanding successful product lines",
                "Invest in customer retention programs"
            ])
        elif trend == 'decreasing':
            recommendations.extend([
                "Review and adjust pricing strategies",
                "Analyze competitor activities",
                "Implement customer feedback programs",
                "Consider promotional campaigns"
            ])
        else:
            recommendations.extend([
                "Monitor market conditions closely",
                "Prepare contingency plans",
                "Focus on operational efficiency"
            ])
        
        return recommendations
    
    def calculate_quality_score(self, report_data: Dict) -> float:
        """Calculate quality score for a report."""
        
        score = 10.0
        
        # Check completeness
        required_fields = ['title', 'executive_summary', 'key_metrics', 'recommendations']
        missing_fields = [field for field in required_fields if not report_data.get(field)]
        score -= len(missing_fields) * 1.5
        
        # Check data validity
        if not report_data.get('key_metrics', {}).get('total_sales'):
            score -= 1.0
        
        # Check recommendations
        recommendations = report_data.get('recommendations', [])
        if len(recommendations) < 2:
            score -= 1.0
        
        return max(0.0, min(10.0, score))
    
    def generate_quality_feedback(self, score: float) -> str:
        """Generate quality feedback based on score."""
        
        if score >= 9.0:
            return "Excellent report quality. Ready for distribution."
        elif score >= 8.0:
            return "Good report quality. Minor improvements suggested."
        elif score >= 6.0:
            return "Acceptable quality with some areas needing attention."
        else:
            return "Report needs significant revision before approval."
    
    def run_workflow(self, sales_data: Dict):
        """Execute a complete multi-agent workflow."""
        
        print("\n🚀 Starting Multi-Agent Workflow")
        print("=" * 50)
        
        # Step 1: Data collection agent injects raw data
        print("1. Data Collection Phase")
        self.agents['collector'].push_context(
            "sales_data_q1_2024",
            sales_data,
            topic="raw_data"
        )
        
        # Allow time for async processing
        time.sleep(0.2)
        
        # Step 2: Monitor workflow progress
        print("\n2. Workflow Progress Monitoring")
        self.show_workflow_status()
        
        # Step 3: Show final results
        print("\n3. Workflow Results")
        self.show_final_results()
    
    def show_workflow_status(self):
        """Display current workflow status."""
        
        topics = ["raw_data", "analysis_complete", "report_draft", "quality_complete", "workflow_complete"]
        
        for topic in topics:
            context_data = self.agents['coordinator'].get_context_by_topic(topic)
            count = len(context_data) if context_data else 0
            status = "✅" if count > 0 else "⏳"
            print(f"   {status} {topic}: {count} items")
    
    def show_final_results(self):
        """Display final workflow results."""
        
        # Get completed workflows
        completed = self.agents['coordinator'].get_context_by_topic("workflow_complete")
        
        if completed:
            for key, data in completed.items():
                print(f"\n📊 Completed Workflow: {key}")
                print(f"   Report: {data['report']['title']}")
                print(f"   Quality Score: {data['quality_assessment']['quality_score']}/10")
                print(f"   Status: {data['final_status']}")
                print(f"   Completed: {data['completed_at']}")
        
        # Show notifications
        notifications = self.agents['coordinator'].get_context_by_topic("notifications_sent")
        if notifications:
            print(f"\n📨 Notifications Sent: {len(notifications)}")
    
    def get_agent_summary(self):
        """Get summary of all agent activities."""
        
        summary = {}
        
        for agent_name, handler in self.agents.items():
            keys = handler.list_context_keys()
            topics = handler.list_topics()
            
            summary[agent_name] = {
                "context_items": len(keys),
                "active_topics": len(topics),
                "agent_name": handler.agent_name
            }
        
        return summary
    
    def cleanup(self):
        """Clean up system resources."""
        self.mesh.close()
        print("🧹 System cleanup completed")

def main():
    """Run the multi-agent system demonstration."""
    
    # Create the multi-agent system
    system = MultiAgentSystem("multi_agent_demo")
    
    try:
        # Sample sales data
        sales_data = {
            "sales": [150000, 175000, 220000, 190000, 240000],
            "period": "Q1_2024",
            "currency": "USD",
            "region": "North America",
            "product_lines": ["Software", "Services", "Support"],
            "collected_at": datetime.now().isoformat()
        }
        
        # Run the workflow
        system.run_workflow(sales_data)
        
        # Show agent summary
        print("\n📋 Agent Summary:")
        summary = system.get_agent_summary()
        for agent, stats in summary.items():
            print(f"   {agent}: {stats['context_items']} items, {stats['active_topics']} topics")
        
    finally:
        system.cleanup()

if __name__ == "__main__":
    main()
```

## Agent Coordination Patterns

### Master-Slave Pattern
```python
def create_master_slave_setup():
    """Create a master-slave coordination pattern."""
    
    mesh = ContextMesh(user_id="master_slave")
    
    # Master agent coordinates everything
    master = ToolHandler(mesh, "Master")
    
    # Slave agents perform specific tasks
    slaves = [
        ToolHandler(mesh, f"Worker_{i}")
        for i in range(3)
    ]
    
    # Master distributes work
    work_items = ["task_1", "task_2", "task_3"]
    
    for i, task in enumerate(work_items):
        slaves[i].push_context(f"assigned_task", {
            "task_id": task,
            "assigned_by": "Master",
            "deadline": "2024-01-15"
        }, topic=f"worker_{i}_tasks")
    
    return master, slaves

# Usage
master, workers = create_master_slave_setup()
```

### Peer-to-Peer Pattern
```python
def create_peer_network():
    """Create a peer-to-peer agent network."""
    
    mesh = ContextMesh(user_id="peer_network")
    
    # Create peer agents
    peers = [
        ToolHandler(mesh, f"Peer_{i}")
        for i in range(4)
    ]
    
    # Set up peer communication
    for i, peer in enumerate(peers):
        # Each peer subscribes to broadcast messages
        peer.subscribe_to_topic("broadcast", lambda t, k, d: print(f"Peer {i} received: {k}"))
        
        # Each peer can send messages to others
        peer.push_context("introduction", {
            "peer_id": i,
            "capabilities": ["analyze", "report", "coordinate"],
            "status": "online"
        }, topic="broadcast")
    
    return peers
```

## Best Practices

1. **Agent Specialization**: Give each agent specific, well-defined roles
2. **Clear Communication**: Use descriptive topic names and context keys
3. **Error Handling**: Implement robust error handling in subscriptions
4. **Resource Management**: Monitor and limit resource usage per agent
5. **Coordination**: Use a coordinator agent for complex workflows

## See Also

- [Tool Basics](tool-basics.md)
- [Topic Routing](../context-mesh/topic-routing.md)
- [Access Control](access-control.md)
- [Complete Workflows](../extras/complete-workflows.md)
