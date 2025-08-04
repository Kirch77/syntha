#!/usr/bin/env python3
"""
Real-World Usage Examples for Syntha Framework Integration

This file demonstrates practical, real-world usage patterns for integrating
Syntha with popular LLM frameworks. Each example shows complete, working
code that you can adapt for your own applications.

Examples include:
1. LangChain Agent with Syntha Context Management
2. OpenAI Function Calling with Context Sharing
3. Anthropic Claude with Syntha Tools
4. LangGraph Workflow with Context Routing
5. Multi-Framework Agent System
"""

import asyncio
import json
import sys
from typing import Any, Dict, List

# Add the parent directory to path for imports
sys.path.insert(0, "..")

from syntha import ContextMesh, ToolHandler


def setup_demo_context():
    """Set up demo context data for examples."""
    mesh = ContextMesh()

    # Add some realistic context data
    mesh.push(
        "customer_data",
        {
            "customer_id": "CUST_001",
            "name": "Alice Johnson",
            "tier": "premium",
            "preferences": {"communication": "email", "language": "en"},
        },
        topics=["customer_service", "sales"],
    )

    mesh.push(
        "product_catalog",
        {
            "featured_products": [
                {"id": "PROD_001", "name": "Pro Plan", "price": 99},
                {"id": "PROD_002", "name": "Enterprise Plan", "price": 299},
            ],
            "promotions": [
                {"code": "SAVE20", "discount": 0.2, "valid_until": "2024-12-31"}
            ],
        },
        topics=["sales", "marketing"],
    )

    mesh.push(
        "support_knowledge",
        {
            "common_issues": [
                {"issue": "login_problems", "solution": "Reset password via email"},
                {
                    "issue": "billing_questions",
                    "solution": "Check billing section in account",
                },
            ],
            "escalation_rules": {
                "premium_customers": "immediate_escalation",
                "billing_issues": "finance_team",
            },
        },
        topics=["customer_service", "support"],
    )

    return mesh


# =============================================================================
# 1. LANGCHAIN AGENT EXAMPLE
# =============================================================================


def langchain_agent_example():
    """
    Example: Customer Service Agent using LangChain with Syntha context.

    This example shows how to create a LangChain agent that can access
    and share context across different conversations and sessions.
    """
    print("🦜 LangChain Customer Service Agent Example")
    print("=" * 60)

    # Setup Syntha
    mesh = setup_demo_context()
    handler = ToolHandler(mesh, agent_name="CustomerServiceAgent")

    # Subscribe to relevant topics
    mesh.register_agent_topics("CustomerServiceAgent", ["customer_service", "support"])

    try:
        # Get LangChain tools
        langchain_tools = handler.get_langchain_tools()
        print(f"✅ Created {len(langchain_tools)} LangChain tools")

        # Show available tools
        print("\n📋 Available LangChain Tools:")
        for tool in langchain_tools:
            print(f"  • {tool.name}: {tool.description[:60]}...")

        # Simulate using the tools
        print("\n🤖 Simulating Customer Service Conversation:")

        # Agent checks what context is available
        list_context_tool = next(t for t in langchain_tools if t.name == "list_context")
        available_context = list_context_tool._run()
        print(
            f"📋 Available context: {json.loads(available_context)['total_keys']} items"
        )

        # Agent retrieves customer data
        get_context_tool = next(t for t in langchain_tools if t.name == "get_context")
        customer_info = get_context_tool._run(keys=["customer_data"])
        customer_data = json.loads(customer_info)
        print(f"👤 Customer: {customer_data['context']['customer_data']['name']}")
        print(f"🏆 Tier: {customer_data['context']['customer_data']['tier']}")

        # Agent adds interaction notes
        push_context_tool = next(t for t in langchain_tools if t.name == "push_context")
        interaction_notes = {
            "timestamp": "2024-01-15T10:30:00Z",
            "agent": "CustomerServiceAgent",
            "customer_id": "CUST_001",
            "interaction_type": "support_ticket",
            "issue": "Account access problem",
            "status": "resolved",
            "resolution": "Password reset completed",
        }

        result = push_context_tool._run(
            key="interaction_log_001",
            data=interaction_notes,
            topics=["customer_service", "analytics"],
        )
        print(f"📝 Logged interaction: {json.loads(result)['success']}")

        print("\n✨ LangChain Integration Benefits:")
        print("  • Automatic context sharing between agents")
        print("  • Persistent conversation history")
        print("  • Topic-based routing for team collaboration")
        print("  • Zero manual tool creation required")

        return langchain_tools

    except Exception as e:
        print(f"⚠️  LangChain not available: {e}")
        print("💡 Install with: pip install langchain")
        return []


# =============================================================================
# 2. OPENAI FUNCTION CALLING EXAMPLE
# =============================================================================


def openai_function_calling_example():
    """
    Example: Sales Assistant using OpenAI function calling with Syntha.

    Shows how to integrate Syntha with OpenAI's function calling for
    a sales assistant that can access product data and customer history.
    """
    print("\n\n🤖 OpenAI Sales Assistant Example")
    print("=" * 60)

    # Setup Syntha
    mesh = setup_demo_context()
    handler = ToolHandler(mesh, agent_name="SalesAssistant")

    # Subscribe to sales-related topics
    mesh.register_agent_topics(
        "SalesAssistant", ["sales", "marketing", "customer_service"]
    )

    # Get OpenAI function definitions
    openai_functions = handler.get_openai_functions()
    openai_handler = handler.get_framework_handler("openai")

    print(f"✅ Created {len(openai_functions)} OpenAI functions")

    # Show function structure
    print("\n📋 OpenAI Function Definitions:")
    for func in openai_functions[:3]:  # Show first 3
        func_def = func["function"]
        print(f"  • {func_def['name']}: {func_def['description'][:50]}...")

    # Simulate OpenAI conversation
    print("\n🤖 Simulating Sales Conversation:")

    # Step 1: Check available context
    result = openai_handler("list_context", "{}")
    print(f"📋 Available context: {result['total_keys']} items")

    # Step 2: Get customer and product information
    customer_result = openai_handler(
        "get_context", '{"keys": ["customer_data", "product_catalog"]}'
    )
    if customer_result["success"]:
        context = customer_result["context"]
        print(
            f"👤 Customer: {context['customer_data']['name']} ({context['customer_data']['tier']})"
        )
        print(
            f"📦 Featured products: {len(context['product_catalog']['featured_products'])}"
        )

    # Step 3: Create personalized recommendation
    recommendation = {
        "customer_id": "CUST_001",
        "recommended_products": ["PROD_002"],  # Enterprise plan for premium customer
        "reasoning": "Premium customer, recommended Enterprise plan",
        "discount_applied": "SAVE20",
        "total_savings": 59.8,  # 20% off $299
        "agent": "SalesAssistant",
        "timestamp": "2024-01-15T10:45:00Z",
    }

    # Step 4: Save recommendation for follow-up
    push_result = openai_handler(
        "push_context",
        json.dumps(
            {
                "key": "sales_recommendation_001",
                "data": recommendation,
                "topics": ["sales", "customer_service"],
            }
        ),
    )

    print(f"💡 Recommendation saved: {push_result['success']}")
    print(f"🎯 Recommended: Enterprise Plan with 20% discount")
    print(f"💰 Customer saves: ${recommendation['total_savings']}")

    print("\n✨ OpenAI Integration Benefits:")
    print("  • Native function calling support")
    print("  • Automatic parameter validation")
    print("  • Seamless context access in conversations")
    print("  • Real-time data sharing between agents")

    return openai_functions, openai_handler


# =============================================================================
# 3. ANTHROPIC CLAUDE EXAMPLE
# =============================================================================


def anthropic_claude_example():
    """
    Example: Support Agent using Anthropic Claude with Syntha tools.

    Demonstrates how to use Syntha tools with Anthropic's Claude
    for intelligent customer support with context awareness.
    """
    print("\n\n🤖 Anthropic Claude Support Agent Example")
    print("=" * 60)

    # Setup Syntha
    mesh = setup_demo_context()
    handler = ToolHandler(mesh, agent_name="SupportAgent")

    # Subscribe to support topics
    mesh.register_agent_topics("SupportAgent", ["customer_service", "support"])

    # Get Anthropic tools
    anthropic_tools = handler.get_anthropic_tools()
    anthropic_handler = handler.get_framework_handler("anthropic")

    print(f"✅ Created {len(anthropic_tools)} Anthropic tools")

    # Show tool structure
    print("\n📋 Anthropic Tool Definitions:")
    for tool in anthropic_tools[:3]:  # Show first 3
        print(f"  • {tool['name']}: {tool['description'][:50]}...")

    # Simulate support conversation
    print("\n🤖 Simulating Support Conversation:")

    # Step 1: Agent discovers available topics and context
    topics_result = anthropic_handler("discover_topics", {})
    print(f"🔍 Available topics: {len(topics_result.get('topics', {}))}")

    # Step 2: Get customer information and support knowledge
    context_result = anthropic_handler(
        "get_context", {"keys": ["customer_data", "support_knowledge"]}
    )

    if context_result["success"]:
        context = context_result["context"]
        customer = context.get("customer_data", {})
        knowledge = context.get("support_knowledge", {})

        print(
            f"👤 Customer: {customer.get('name', 'Unknown')} ({customer.get('tier', 'standard')})"
        )
        print(
            f"📚 Knowledge base: {len(knowledge.get('common_issues', []))} common issues"
        )

    # Step 3: Log support interaction
    support_interaction = {
        "ticket_id": "TICKET_001",
        "customer_id": "CUST_001",
        "agent": "SupportAgent",
        "issue_type": "account_access",
        "priority": "high",  # Premium customer gets high priority
        "status": "in_progress",
        "steps_taken": [
            "Verified customer identity",
            "Checked account status",
            "Initiated password reset",
        ],
        "next_steps": "Follow up in 24 hours",
        "timestamp": "2024-01-15T11:00:00Z",
    }

    log_result = anthropic_handler(
        "push_context",
        {
            "key": "support_ticket_001",
            "data": support_interaction,
            "topics": ["customer_service", "analytics"],
        },
    )

    print(f"📝 Support ticket logged: {log_result['success']}")
    print(f"🎫 Ticket ID: {support_interaction['ticket_id']}")
    print(f"⚡ Priority: {support_interaction['priority']} (premium customer)")

    print("\n✨ Anthropic Integration Benefits:")
    print("  • Natural tool use in conversations")
    print("  • Context-aware support decisions")
    print("  • Automatic escalation based on customer tier")
    print("  • Comprehensive interaction logging")

    return anthropic_tools, anthropic_handler


# =============================================================================
# 4. LANGGRAPH WORKFLOW EXAMPLE
# =============================================================================


def langgraph_workflow_example():
    """
    Example: Order Processing Workflow using LangGraph with Syntha.

    Shows how to create a multi-step workflow using LangGraph
    where each step can access and update shared context.
    """
    print("\n\n🌐 LangGraph Order Processing Workflow Example")
    print("=" * 60)

    # Setup Syntha
    mesh = setup_demo_context()
    handler = ToolHandler(mesh, agent_name="OrderProcessingBot")

    # Subscribe to relevant topics
    mesh.register_agent_topics(
        "OrderProcessingBot", ["sales", "customer_service", "fulfillment"]
    )

    # Get LangGraph tools
    langgraph_tools = handler.get_langgraph_tools()

    print(f"✅ Created {len(langgraph_tools)} LangGraph tools")

    # Create tool lookup
    tools_dict = {tool["name"]: tool["function"] for tool in langgraph_tools}

    # Simulate order processing workflow
    print("\n🤖 Simulating Order Processing Workflow:")

    # Step 1: Validate customer and get information
    print("\n📋 Step 1: Customer Validation")
    customer_context = tools_dict["get_context"](keys=["customer_data"])
    customer_data = json.loads(customer_context)
    if customer_data["success"]:
        customer = customer_data["context"]["customer_data"]
        print(f"✅ Customer validated: {customer['name']} ({customer['tier']})")

    # Step 2: Get product information and pricing
    print("\n📦 Step 2: Product Information")
    product_context = tools_dict["get_context"](keys=["product_catalog"])
    product_data = json.loads(product_context)
    if product_data["success"]:
        catalog = product_data["context"]["product_catalog"]
        print(
            f"✅ Product catalog loaded: {len(catalog['featured_products'])} products"
        )

    # Step 3: Create order record
    print("\n🛒 Step 3: Order Creation")
    order_data = {
        "order_id": "ORDER_001",
        "customer_id": "CUST_001",
        "items": [
            {
                "product_id": "PROD_002",
                "name": "Enterprise Plan",
                "price": 299,
                "quantity": 1,
            }
        ],
        "discount_code": "SAVE20",
        "discount_amount": 59.8,
        "total": 239.2,
        "status": "pending_payment",
        "created_by": "OrderProcessingBot",
        "timestamp": "2024-01-15T11:15:00Z",
    }

    order_result = tools_dict["push_context"](
        key="order_001",
        data=order_data,
        topics=["sales", "fulfillment", "customer_service"],
    )
    order_response = json.loads(order_result)
    print(f"✅ Order created: {order_response['success']}")

    # Step 4: Subscribe to order updates
    print("\n🔔 Step 4: Workflow Subscriptions")
    subscription_result = tools_dict["subscribe_to_topics"](
        topics=["fulfillment", "payment"]
    )
    sub_response = json.loads(subscription_result)
    print(f"✅ Subscribed to updates: {sub_response['success']}")

    # Step 5: Generate summary
    print("\n📊 Step 5: Workflow Summary")
    summary = {
        "workflow_id": "WF_ORDER_001",
        "steps_completed": 4,
        "customer_tier": customer.get("tier", "standard"),
        "order_value": 239.2,
        "processing_time_seconds": 5,
        "next_actions": [
            "Await payment confirmation",
            "Send order confirmation email",
            "Schedule fulfillment",
        ],
        "completed_by": "OrderProcessingBot",
    }

    summary_result = tools_dict["push_context"](
        key="workflow_summary_001", data=summary, topics=["analytics", "management"]
    )
    summary_response = json.loads(summary_result)
    print(f"✅ Workflow summary saved: {summary_response['success']}")

    print(
        f"\n💰 Order Total: ${order_data['total']} (saved ${order_data['discount_amount']})"
    )
    print(f"⏱️  Processing time: {summary['processing_time_seconds']} seconds")

    print("\n✨ LangGraph Integration Benefits:")
    print("  • Stateful workflow execution")
    print("  • Context sharing between workflow steps")
    print("  • Automatic progress tracking")
    print("  • Multi-agent workflow coordination")

    return langgraph_tools


# =============================================================================
# 5. MULTI-FRAMEWORK AGENT SYSTEM
# =============================================================================


def multi_framework_agent_system():
    """
    Example: Multi-Framework Agent System

    Demonstrates how different agents using different frameworks
    can collaborate through shared Syntha context.
    """
    print("\n\n🌟 Multi-Framework Agent System Example")
    print("=" * 60)

    # Setup shared context
    mesh = setup_demo_context()

    # Create agents using different frameworks
    agents = {}

    # OpenAI Sales Agent
    sales_agent = ToolHandler(mesh, agent_name="SalesAgent_OpenAI")
    mesh.register_agent_topics("SalesAgent_OpenAI", ["sales", "marketing"])
    agents["sales"] = {
        "handler": sales_agent,
        "framework": "openai",
        "tools": sales_agent.get_openai_functions(),
        "function_handler": sales_agent.get_framework_handler("openai"),
    }

    # Anthropic Support Agent
    support_agent = ToolHandler(mesh, agent_name="SupportAgent_Anthropic")
    mesh.register_agent_topics(
        "SupportAgent_Anthropic", ["customer_service", "support"]
    )
    agents["support"] = {
        "handler": support_agent,
        "framework": "anthropic",
        "tools": support_agent.get_anthropic_tools(),
        "function_handler": support_agent.get_framework_handler("anthropic"),
    }

    # LangGraph Analytics Agent
    analytics_agent = ToolHandler(mesh, agent_name="AnalyticsAgent_LangGraph")
    mesh.register_agent_topics(
        "AnalyticsAgent_LangGraph", ["analytics", "sales", "customer_service"]
    )
    langgraph_tools = analytics_agent.get_langgraph_tools()
    agents["analytics"] = {
        "handler": analytics_agent,
        "framework": "langgraph",
        "tools": langgraph_tools,
        "tools_dict": {tool["name"]: tool["function"] for tool in langgraph_tools},
    }

    print(f"✅ Created {len(agents)} agents using different frameworks")
    for name, agent in agents.items():
        print(
            f"  • {name.title()} Agent ({agent['framework']}): {len(agent['tools'])} tools"
        )

    # Simulate collaborative scenario
    print("\n🤖 Simulating Multi-Agent Collaboration:")

    # Sales agent creates lead
    print("\n💼 Sales Agent (OpenAI): Creating lead")
    lead_data = {
        "lead_id": "LEAD_001",
        "customer_id": "CUST_002",
        "source": "website_chat",
        "interest": "enterprise_plan",
        "budget": "high",
        "timeline": "immediate",
        "created_by": "SalesAgent_OpenAI",
    }

    sales_result = agents["sales"]["function_handler"](
        "push_context",
        json.dumps(
            {
                "key": "sales_lead_001",
                "data": lead_data,
                "topics": ["sales", "analytics"],
            }
        ),
    )
    print(f"✅ Lead created: {sales_result['success']}")

    # Analytics agent processes the lead
    print("\n📊 Analytics Agent (LangGraph): Processing lead data")
    analytics_tools = agents["analytics"]["tools_dict"]

    # Get all sales-related context
    sales_context = analytics_tools["get_context"](
        keys=["sales_lead_001", "product_catalog"]
    )
    context_data = json.loads(sales_context)

    if context_data["success"]:
        # Generate analytics
        analytics = {
            "lead_score": 85,  # High score for enterprise interest + high budget
            "conversion_probability": 0.75,
            "recommended_actions": [
                "Schedule demo within 24 hours",
                "Prepare enterprise pricing",
                "Assign senior sales rep",
            ],
            "processed_by": "AnalyticsAgent_LangGraph",
        }

        analytics_result = analytics_tools["push_context"](
            key="lead_analytics_001", data=analytics, topics=["sales", "management"]
        )
        analytics_response = json.loads(analytics_result)
        print(f"✅ Analytics generated: {analytics_response['success']}")
        print(f"📈 Lead score: {analytics['lead_score']}/100")
        print(f"🎯 Conversion probability: {analytics['conversion_probability']*100}%")

    # Support agent checks for any customer history
    print("\n🎧 Support Agent (Anthropic): Checking customer history")
    support_result = agents["support"]["function_handler"](
        "get_context", {"keys": ["customer_data"]}
    )

    if support_result["success"]:
        print("✅ Customer history retrieved")
        print("📋 No previous support tickets found")

    # Show final collaboration summary
    print("\n📊 Collaboration Summary:")

    # Get all context to show what was shared
    all_context = analytics_tools["list_context"]()
    context_summary = json.loads(all_context)

    print(f"📈 Total shared context items: {context_summary['total_keys']}")
    print(f"🔗 Active topics: {len(context_summary.get('keys_by_topic', {}))}")

    framework_participation = {}
    for agent_name, agent_data in agents.items():
        framework_participation[agent_data["framework"]] = agent_name

    print(f"🤝 Framework participation:")
    for framework, agent in framework_participation.items():
        print(f"  • {framework}: {agent} agent")

    print("\n✨ Multi-Framework Benefits:")
    print("  • Each agent uses its optimal framework")
    print("  • Seamless context sharing across frameworks")
    print("  • Coordinated workflows without tight coupling")
    print("  • Framework-agnostic data persistence")

    return agents


# =============================================================================
# MAIN DEMONSTRATION
# =============================================================================


def main():
    """Run all examples to demonstrate framework integration capabilities."""
    print("🎉 Syntha Framework Integration - Real-World Examples")
    print("=" * 70)
    print("This demonstration shows practical usage patterns for integrating")
    print("Syntha with popular LLM frameworks in real applications.")
    print()

    # Run all examples
    examples = [
        ("LangChain Customer Service", langchain_agent_example),
        ("OpenAI Sales Assistant", openai_function_calling_example),
        ("Anthropic Support Agent", anthropic_claude_example),
        ("LangGraph Order Processing", langgraph_workflow_example),
        ("Multi-Framework System", multi_framework_agent_system),
    ]

    results = {}

    for name, example_func in examples:
        try:
            print(f"\n{'='*70}")
            result = example_func()
            results[name] = {"status": "success", "result": result}
        except Exception as e:
            print(f"❌ {name} failed: {e}")
            results[name] = {"status": "error", "error": str(e)}

    # Summary
    print(f"\n\n🎊 Demo Complete!")
    print("=" * 70)
    print("Example Results:")

    for name, result in results.items():
        status = "✅" if result["status"] == "success" else "❌"
        print(f"  {status} {name}")

    successful = sum(1 for r in results.values() if r["status"] == "success")
    total = len(results)

    print(
        f"\n📊 Success Rate: {successful}/{total} examples ({successful/total*100:.1f}%)"
    )

    print("\n🚀 Key Takeaways:")
    print("  • Framework integration requires minimal code changes")
    print("  • Agents can collaborate across different frameworks")
    print("  • Context sharing enables sophisticated workflows")
    print("  • Each framework retains its unique strengths")
    print("  • Zero configuration required for basic usage")

    print(f"\n💡 Next Steps:")
    print("  • Choose the framework that best fits your use case")
    print("  • Use handler.get_[framework]_tools() to get started")
    print("  • Combine multiple frameworks for complex applications")
    print("  • Leverage topic-based routing for team collaboration")


if __name__ == "__main__":
    main()
