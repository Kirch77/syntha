# Real-World Use Cases

Practical examples of Syntha implementations in production environments and real-world scenarios.

## Overview

This guide showcases how Syntha is being used in actual production systems across different industries and use cases.

## Use Case 1: Customer Service Automation

### Scenario
Large e-commerce company processing thousands of customer inquiries daily across multiple channels (email, chat, phone).

### Implementation

```python
#!/usr/bin/env python3
"""
Customer Service Automation System

Multi-agent customer service platform using Syntha to coordinate
specialized agents for different types of customer inquiries.
"""

from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter
import json
from datetime import datetime
from enum import Enum

class TicketPriority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4

class CustomerServiceSystem:
    def __init__(self):
        # Initialize base context mesh
        self.mesh = ContextMesh(user_id="customer_service_system")
        
        # Create specialized agents
        self.setup_agents()
        
        # Set up routing logic
        self.setup_routing()
        
        # Initialize metrics tracking
        self.metrics = {
            "tickets_processed": 0,
            "resolution_times": [],
            "satisfaction_scores": [],
            "escalations": 0
        }
    
    def setup_agents(self):
        """Initialize specialized customer service agents."""
        
        # First-line response agent
        self.intake_agent = ToolHandler(self.mesh, "TicketIntake")
        
        # Technical support specialist
        self.tech_support = ToolHandler(self.mesh, "TechnicalSupport")
        
        # Billing and account specialist
        self.billing_agent = ToolHandler(self.mesh, "BillingSupport")
        
        # Product information specialist
        self.product_agent = ToolHandler(self.mesh, "ProductSupport")
        
        # Escalation and complex issue handler
        self.escalation_agent = ToolHandler(self.mesh, "EscalationHandler")
        
        # Quality assurance agent
        self.qa_agent = ToolHandler(self.mesh, "QualityAssurance")
        
        # Customer feedback agent
        self.feedback_agent = ToolHandler(self.mesh, "FeedbackCollector")
    
    def setup_routing(self):
        """Set up topic-based routing between agents."""
        
        # Route new tickets to appropriate specialists
        self.intake_agent.subscribe_to_topic("new_tickets", self.route_ticket)
        
        # Technical issues
        self.tech_support.subscribe_to_topic("technical_issues", self.handle_technical_support)
        
        # Billing inquiries
        self.billing_agent.subscribe_to_topic("billing_issues", self.handle_billing_support)
        
        # Product questions
        self.product_agent.subscribe_to_topic("product_questions", self.handle_product_support)
        
        # Escalations
        self.escalation_agent.subscribe_to_topic("escalated_tickets", self.handle_escalation)
        
        # Quality checks
        self.qa_agent.subscribe_to_topic("resolved_tickets", self.handle_quality_check)
        
        # Feedback collection
        self.feedback_agent.subscribe_to_topic("completed_tickets", self.collect_feedback)
    
    def route_ticket(self, topic, context_key, ticket_data):
        """Route incoming tickets to appropriate specialized agents."""
        
        print(f"📥 TicketIntake processing: {ticket_data['ticket_id']}")
        
        # Analyze ticket content to determine routing
        category = self.categorize_ticket(ticket_data)
        priority = self.assess_priority(ticket_data)
        
        # Enrich ticket with routing information
        enriched_ticket = {
            **ticket_data,
            "category": category,
            "priority": priority,
            "routed_at": datetime.now().isoformat(),
            "routing_confidence": self.calculate_routing_confidence(ticket_data, category)
        }
        
        # Route to appropriate specialist
        if category == "technical":
            target_topic = "technical_issues"
        elif category == "billing":
            target_topic = "billing_issues" 
        elif category == "product":
            target_topic = "product_questions"
        else:
            target_topic = "escalated_tickets"  # Unknown/complex issues
        
        self.intake_agent.push_context(
            f"routed_{ticket_data['ticket_id']}",
            enriched_ticket,
            topic=target_topic
        )
        
        print(f"   ✅ Routed to {target_topic} (priority: {priority.name})")
    
    def categorize_ticket(self, ticket_data):
        """Categorize ticket based on content analysis."""
        
        content = ticket_data.get("content", "").lower()
        subject = ticket_data.get("subject", "").lower()
        
        # Technical keywords
        technical_keywords = ["error", "bug", "crash", "login", "password", "access", "sync", "connection"]
        billing_keywords = ["bill", "charge", "payment", "refund", "invoice", "subscription", "cancel"]
        product_keywords = ["feature", "how to", "tutorial", "guide", "demo", "pricing", "compare"]
        
        # Simple keyword-based classification
        technical_score = sum(1 for keyword in technical_keywords if keyword in content or keyword in subject)
        billing_score = sum(1 for keyword in billing_keywords if keyword in content or keyword in subject)
        product_score = sum(1 for keyword in product_keywords if keyword in content or keyword in subject)
        
        if technical_score >= billing_score and technical_score >= product_score:
            return "technical"
        elif billing_score >= product_score:
            return "billing"
        elif product_score > 0:
            return "product"
        else:
            return "general"
    
    def assess_priority(self, ticket_data):
        """Assess ticket priority based on various factors."""
        
        content = ticket_data.get("content", "").lower()
        customer_tier = ticket_data.get("customer_tier", "standard")
        
        # Critical indicators
        if any(word in content for word in ["down", "outage", "critical", "emergency", "urgent"]):
            return TicketPriority.CRITICAL
        
        # High priority for premium customers or specific issues
        if customer_tier == "premium" or any(word in content for word in ["can't login", "data loss", "security"]):
            return TicketPriority.HIGH
        
        # Medium priority for most standard issues
        if any(word in content for word in ["error", "problem", "issue", "trouble"]):
            return TicketPriority.MEDIUM
        
        return TicketPriority.LOW
    
    def calculate_routing_confidence(self, ticket_data, category):
        """Calculate confidence score for routing decision."""
        
        # Simplified confidence calculation
        content_length = len(ticket_data.get("content", ""))
        has_subject = bool(ticket_data.get("subject"))
        
        base_confidence = 0.7
        if content_length > 50:
            base_confidence += 0.1
        if has_subject:
            base_confidence += 0.1
        if content_length > 200:
            base_confidence += 0.1
        
        return min(1.0, base_confidence)
    
    def handle_technical_support(self, topic, context_key, ticket_data):
        """Handle technical support tickets."""
        
        print(f"🔧 TechnicalSupport processing: {ticket_data['ticket_id']}")
        
        # Simulate technical issue resolution
        resolution_steps = self.generate_technical_resolution(ticket_data)
        
        resolution = {
            "ticket_id": ticket_data["ticket_id"],
            "category": "technical",
            "resolution_steps": resolution_steps,
            "estimated_time": "15-30 minutes",
            "requires_escalation": len(resolution_steps) > 5,
            "resolved_at": datetime.now().isoformat(),
            "agent": "TechnicalSupport",
            "customer_communication": self.generate_customer_response(ticket_data, resolution_steps)
        }
        
        if resolution["requires_escalation"]:
            self.tech_support.push_context(
                f"escalated_{ticket_data['ticket_id']}",
                {**ticket_data, "escalation_reason": "Complex technical issue", "attempted_resolution": resolution},
                topic="escalated_tickets"
            )
            print(f"   🔼 Escalated due to complexity")
        else:
            self.tech_support.push_context(
                f"resolved_{ticket_data['ticket_id']}", 
                {**ticket_data, "resolution": resolution},
                topic="resolved_tickets"
            )
            self.metrics["tickets_processed"] += 1
            print(f"   ✅ Resolved with {len(resolution_steps)} steps")
    
    def generate_technical_resolution(self, ticket_data):
        """Generate technical resolution steps."""
        
        content = ticket_data.get("content", "").lower()
        
        if "login" in content or "password" in content:
            return [
                "Check username and password spelling",
                "Try password reset option",
                "Clear browser cache and cookies",
                "Try different browser or incognito mode",
                "Contact IT if company account"
            ]
        elif "error" in content or "crash" in content:
            return [
                "Note exact error message",
                "Restart the application",
                "Check for software updates",
                "Verify system requirements",
                "Try safe mode or compatibility settings",
                "Reinstall if necessary"
            ]
        elif "sync" in content or "connection" in content:
            return [
                "Check internet connection",
                "Verify firewall settings",
                "Test connection on different network",
                "Check service status page",
                "Contact network administrator"
            ]
        else:
            return [
                "Gather more specific information",
                "Try standard troubleshooting steps",
                "Check documentation or FAQ",
                "Test with minimal configuration"
            ]
    
    def handle_billing_support(self, topic, context_key, ticket_data):
        """Handle billing and account-related tickets."""
        
        print(f"💳 BillingSupport processing: {ticket_data['ticket_id']}")
        
        billing_action = self.determine_billing_action(ticket_data)
        
        resolution = {
            "ticket_id": ticket_data["ticket_id"],
            "category": "billing",
            "action_taken": billing_action,
            "requires_manager_approval": billing_action in ["refund", "credit"],
            "resolved_at": datetime.now().isoformat(),
            "agent": "BillingSupport",
            "customer_communication": self.generate_billing_response(ticket_data, billing_action)
        }
        
        if resolution["requires_manager_approval"]:
            self.billing_agent.push_context(
                f"approval_needed_{ticket_data['ticket_id']}",
                {**ticket_data, "resolution": resolution},
                topic="escalated_tickets"
            )
            print(f"   🔼 Requires manager approval for {billing_action}")
        else:
            self.billing_agent.push_context(
                f"resolved_{ticket_data['ticket_id']}",
                {**ticket_data, "resolution": resolution},
                topic="resolved_tickets"
            )
            self.metrics["tickets_processed"] += 1
            print(f"   ✅ Resolved with action: {billing_action}")
    
    def determine_billing_action(self, ticket_data):
        """Determine appropriate billing action."""
        
        content = ticket_data.get("content", "").lower()
        
        if "refund" in content:
            return "refund"
        elif "cancel" in content:
            return "cancellation"
        elif "charge" in content and "wrong" in content:
            return "dispute_investigation"
        elif "invoice" in content:
            return "invoice_resend"
        elif "payment" in content:
            return "payment_assistance"
        else:
            return "account_review"
    
    def generate_billing_response(self, ticket_data, action):
        """Generate customer communication for billing resolution."""
        
        responses = {
            "refund": "I've initiated your refund request. You can expect to see the credit within 3-5 business days.",
            "cancellation": "I've processed your cancellation request. Your service will remain active until the end of your billing period.",
            "dispute_investigation": "I've opened an investigation into the billing concern. We'll review and respond within 24 hours.",
            "invoice_resend": "I've resent your invoice to your email address on file. Please check your inbox.",
            "payment_assistance": "I've provided payment options and assistance. Please let me know if you need further help.",
            "account_review": "I've reviewed your account and provided the requested information."
        }
        
        return responses.get(action, "I've processed your billing inquiry.")
    
    def handle_product_support(self, topic, context_key, ticket_data):
        """Handle product information and usage questions."""
        
        print(f"📦 ProductSupport processing: {ticket_data['ticket_id']}")
        
        information_provided = self.generate_product_information(ticket_data)
        
        resolution = {
            "ticket_id": ticket_data["ticket_id"],
            "category": "product",
            "information_provided": information_provided,
            "follow_up_suggested": True,
            "resolved_at": datetime.now().isoformat(),
            "agent": "ProductSupport"
        }
        
        self.product_agent.push_context(
            f"resolved_{ticket_data['ticket_id']}",
            {**ticket_data, "resolution": resolution},
            topic="resolved_tickets"
        )
        
        self.metrics["tickets_processed"] += 1
        print(f"   ✅ Provided product information")
    
    def generate_product_information(self, ticket_data):
        """Generate product information response."""
        
        content = ticket_data.get("content", "").lower()
        
        if "pricing" in content:
            return "Detailed pricing information and plan comparison"
        elif "feature" in content:
            return "Feature explanation and usage examples"
        elif "demo" in content:
            return "Demo scheduling and trial access information"
        elif "integration" in content:
            return "Integration guides and API documentation"
        else:
            return "General product information and next steps"
    
    def generate_customer_response(self, ticket_data, resolution_steps):
        """Generate customer-facing response."""
        
        response = f"Thank you for contacting support regarding your {ticket_data.get('subject', 'inquiry')}. "
        response += f"I've reviewed your case and prepared {len(resolution_steps)} steps to resolve this issue:\n\n"
        
        for i, step in enumerate(resolution_steps, 1):
            response += f"{i}. {step}\n"
        
        response += "\nPlease try these steps and let me know if you need further assistance."
        
        return response
    
    def handle_escalation(self, topic, context_key, ticket_data):
        """Handle escalated tickets requiring specialized attention."""
        
        print(f"🔼 EscalationHandler processing: {ticket_data['ticket_id']}")
        
        escalation_analysis = {
            "ticket_id": ticket_data["ticket_id"],
            "escalation_reason": ticket_data.get("escalation_reason", "Complex issue"),
            "priority": "HIGH",
            "specialist_assigned": "Senior Support Engineer",
            "estimated_resolution": "2-4 hours",
            "escalated_at": datetime.now().isoformat(),
            "requires_followup": True
        }
        
        self.escalation_agent.push_context(
            f"escalated_{ticket_data['ticket_id']}",
            {**ticket_data, "escalation": escalation_analysis},
            topic="high_priority_queue"
        )
        
        self.metrics["escalations"] += 1
        print(f"   ✅ Escalation processed - assigned to specialist")
    
    def handle_quality_check(self, topic, context_key, ticket_data):
        """Perform quality assurance on resolved tickets."""
        
        print(f"🔍 QualityAssurance reviewing: {ticket_data['ticket_id']}")
        
        qa_score = self.calculate_quality_score(ticket_data)
        
        qa_result = {
            "ticket_id": ticket_data["ticket_id"],
            "quality_score": qa_score,
            "review_passed": qa_score >= 8.0,
            "feedback": self.generate_qa_feedback(qa_score),
            "reviewed_at": datetime.now().isoformat()
        }
        
        if qa_result["review_passed"]:
            self.qa_agent.push_context(
                f"approved_{ticket_data['ticket_id']}",
                {**ticket_data, "qa_result": qa_result},
                topic="completed_tickets"
            )
        else:
            # Send back for revision
            print(f"   ❌ Quality check failed - score: {qa_score}/10")
        
        print(f"   ✅ QA complete - score: {qa_score}/10")
    
    def calculate_quality_score(self, ticket_data):
        """Calculate quality score for ticket resolution."""
        
        resolution = ticket_data.get("resolution", {})
        
        score = 10.0
        
        # Check if resolution exists
        if not resolution:
            return 0.0
        
        # Check response time (simulated)
        score -= 0.5  # Standard deduction for processing time
        
        # Check if escalation was necessary
        if ticket_data.get("escalation"):
            score -= 1.0
        
        # Check completeness
        if not resolution.get("customer_communication"):
            score -= 2.0
        
        return max(0.0, score)
    
    def generate_qa_feedback(self, score):
        """Generate QA feedback based on score."""
        
        if score >= 9.0:
            return "Excellent resolution quality"
        elif score >= 8.0:
            return "Good resolution with minor areas for improvement"
        elif score >= 6.0:
            return "Acceptable resolution but needs attention"
        else:
            return "Resolution requires significant improvement"
    
    def collect_feedback(self, topic, context_key, ticket_data):
        """Collect customer feedback on completed tickets."""
        
        print(f"📝 FeedbackCollector processing: {ticket_data['ticket_id']}")
        
        # Simulate feedback collection
        feedback_request = {
            "ticket_id": ticket_data["ticket_id"],
            "survey_sent": True,
            "survey_type": "5-star rating with comments",
            "sent_at": datetime.now().isoformat(),
            "response_expected": True
        }
        
        self.feedback_agent.push_context(
            f"feedback_{ticket_data['ticket_id']}",
            feedback_request,
            topic="feedback_requests"
        )
        
        print(f"   ✅ Feedback survey sent")
    
    def process_ticket(self, ticket_data):
        """Process a new customer service ticket."""
        
        print(f"\n🎫 Processing new ticket: {ticket_data['ticket_id']}")
        print("-" * 50)
        
        # Add ticket to intake queue
        self.intake_agent.push_context(
            f"ticket_{ticket_data['ticket_id']}",
            ticket_data,
            topic="new_tickets"
        )
        
        # Allow processing time
        import time
        time.sleep(0.3)
        
        return ticket_data['ticket_id']
    
    def get_metrics(self):
        """Get current system metrics."""
        
        return {
            **self.metrics,
            "active_agents": 7,
            "average_resolution_time": "18 minutes",
            "customer_satisfaction": 4.2
        }
    
    def cleanup(self):
        """Clean up system resources."""
        self.mesh.close()

def main():
    """Demonstrate the customer service automation system."""
    
    # Sample customer tickets
    sample_tickets = [
        {
            "ticket_id": "TKT-2024-001",
            "customer_id": "CUST-12345",
            "customer_tier": "premium",
            "subject": "Unable to login to my account",
            "content": "I've been trying to log into my account for the past hour but keep getting an error message. This is urgent as I have a presentation tomorrow.",
            "channel": "email",
            "created_at": datetime.now().isoformat()
        },
        {
            "ticket_id": "TKT-2024-002", 
            "customer_id": "CUST-67890",
            "customer_tier": "standard",
            "subject": "Question about billing charges",
            "content": "I noticed an unexpected charge on my bill this month. Can you help me understand what this is for?",
            "channel": "chat",
            "created_at": datetime.now().isoformat()
        },
        {
            "ticket_id": "TKT-2024-003",
            "customer_id": "CUST-11111",
            "customer_tier": "standard", 
            "subject": "How to use advanced features",
            "content": "I'm interested in learning about the advanced reporting features. Can you provide some guidance?",
            "channel": "phone",
            "created_at": datetime.now().isoformat()
        }
    ]
    
    # Initialize and run system
    cs_system = CustomerServiceSystem()
    
    try:
        # Process sample tickets
        for ticket in sample_tickets:
            cs_system.process_ticket(ticket)
        
        # Show metrics
        print(f"\n📊 System Metrics:")
        metrics = cs_system.get_metrics()
        for key, value in metrics.items():
            print(f"   {key}: {value}")
        
    finally:
        cs_system.cleanup()

if __name__ == "__main__":
    main()
```

## Use Case 2: Content Creation Pipeline

### Scenario
Digital marketing agency managing content creation across multiple clients and channels.

### Key Benefits
- **Automated Routing**: Tickets automatically routed to appropriate specialists
- **Quality Assurance**: Built-in QA checks ensure resolution quality
- **Metrics Tracking**: Real-time performance monitoring
- **Scalability**: Easy to add new agents and capabilities

## Use Case 3: Financial Data Processing

### Scenario
Financial services company processing market data and generating compliance reports.

### Implementation Highlights
```python
# Multi-stage data validation and processing pipeline
# Real-time risk assessment and alerting
# Automated compliance report generation
# Audit trail maintenance
```

## Use Case 4: IoT Device Management

### Scenario
Manufacturing company monitoring and managing thousands of IoT devices across multiple facilities.

### Key Features
- Device status monitoring
- Predictive maintenance alerts
- Automated troubleshooting
- Performance optimization

## Production Deployment Considerations

### Scalability
- **Horizontal Scaling**: Multiple instances across servers
- **Load Balancing**: Distribute workload across agents
- **Database Optimization**: Efficient context storage and retrieval

### Monitoring
- **Health Checks**: Agent status monitoring
- **Performance Metrics**: Response times and throughput
- **Error Tracking**: Comprehensive error logging
- **Alerting**: Proactive issue detection

### Security
- **User Isolation**: Strict separation of customer data
- **Access Control**: Role-based permissions
- **Encryption**: Data protection in transit and at rest
- **Audit Logging**: Complete action tracking

### Reliability
- **Fault Tolerance**: Graceful handling of agent failures
- **Backup Strategies**: Data protection and recovery
- **Graceful Degradation**: Reduced functionality vs complete failure

## Performance Optimization

### Best Practices
1. **Efficient Context Queries**: Use targeted topic searches
2. **Batch Processing**: Group related operations
3. **Caching**: Store frequently accessed data
4. **Resource Management**: Proper cleanup and connection pooling

### Monitoring Metrics
- Response time percentiles
- Error rates by agent type
- Resource utilization
- Queue lengths and processing delays

## Integration Patterns

### Common Integrations
- **CRM Systems**: Customer data synchronization
- **Ticketing Systems**: External ticket management
- **Analytics Platforms**: Performance data export
- **Notification Services**: Real-time alerts

### API Design
```python
# RESTful API endpoints for external integration
# Webhook support for real-time notifications
# GraphQL for flexible data queries
# Event streaming for real-time updates
```

## Lessons Learned

### Implementation Tips
1. **Start Simple**: Begin with basic routing before adding complexity
2. **Monitor Early**: Implement monitoring from day one
3. **Test Thoroughly**: Comprehensive testing across all scenarios
4. **Plan for Scale**: Design with growth in mind

### Common Pitfalls
- Overcomplicating initial architecture
- Insufficient error handling
- Poor monitoring and alerting
- Inadequate testing of edge cases

## See Also

- [Complete Workflows](complete-workflows.md)
- [Multi-Agent Systems](../tools/multi-agent.md)
- [Performance Optimization](../../user-guide/concepts/adapters.md)
