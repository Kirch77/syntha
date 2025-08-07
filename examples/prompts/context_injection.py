"""
Prompts - Context Injection Example

This example demonstrates how to inject context into custom prompts
and templates for more flexible prompt engineering.

Copy and run this code to see context injection in action!
"""

from syntha import ContextMesh, build_message_prompt, inject_context_into_prompt


def main():
    print("🚀 Prompts - Context Injection")
    print("=" * 35)

    # Create context mesh with customer service scenario
    context = ContextMesh(user_id="service_team")

    # Add customer service context
    context.push(
        "customer_profile",
        {
            "id": "CUST-12345",
            "name": "Sarah Johnson",
            "tier": "Premium",
            "account_value": 25000,
            "satisfaction_score": 4.2,
            "last_contact": "2025-01-10",
        },
    )

    context.push(
        "support_history",
        {
            "total_tickets": 8,
            "resolved_tickets": 7,
            "avg_resolution_time": "4.2 hours",
            "common_issues": ["billing", "feature_requests"],
            "escalations": 1,
        },
    )

    context.push(
        "current_issue",
        {
            "ticket_id": "TKT-9876",
            "category": "billing_inquiry",
            "priority": "high",
            "description": "Discrepancy in monthly invoice charges",
            "reported": "2025-01-20 14:30",
        },
    )

    print("✅ Customer service context added")

    # 1. Basic context injection into custom templates
    print("\n📝 Basic context injection:")

    custom_template = """
You are a customer service representative helping {customer_name}.

Customer Details:
- Account Tier: {customer_tier}
- Account Value: ${account_value:,}
- Satisfaction Score: {satisfaction_score}/5.0

Current Issue: {current_issue}

Please provide professional and empathetic assistance.
"""

    # Inject context into the template
    injected_prompt = inject_context_into_prompt(
        prompt_template=custom_template,
        context_mesh=context,
        agent_name="ServiceAgent",
        context_mappings={
            "customer_name": "customer_profile.name",
            "customer_tier": "customer_profile.tier",
            "account_value": "customer_profile.account_value",
            "satisfaction_score": "customer_profile.satisfaction_score",
            "current_issue": "current_issue.description",
        },
    )

    print("Custom template with injected context:")
    print("─" * 50)
    print(injected_prompt)
    print("─" * 50)

    # 2. Advanced context injection with conditional logic
    print("\n🧠 Advanced context injection:")

    advanced_template = """
Customer Service Agent Instructions

Customer: {customer_name} (ID: {customer_id})
Tier: {tier} | Value: ${value:,} | Satisfaction: {satisfaction}/5

{tier_specific_instructions}

Support History:
- Total tickets: {total_tickets}
- Resolution rate: {resolution_rate}%
- Average resolution: {avg_resolution}

Current Issue (Priority: {priority}):
{issue_description}

{priority_specific_guidance}
"""

    # Create conditional context
    tier_instructions = {
        "Premium": "Provide white-glove service with immediate escalation options.",
        "Standard": "Follow standard procedures with professional courtesy.",
        "Basic": "Provide efficient self-service guidance where possible.",
    }

    priority_guidance = {
        "high": "Escalate immediately if resolution isn't clear within 15 minutes.",
        "medium": "Aim for resolution within 2 hours.",
        "low": "Handle within standard SLA timeframes.",
    }

    # Get context values for conditional logic
    customer_data = context.get("customer_profile", "ServiceAgent")
    current_issue_data = context.get("current_issue", "ServiceAgent")
    support_data = context.get("support_history", "ServiceAgent")

    # Calculate resolution rate
    resolution_rate = int(
        (support_data["resolved_tickets"] / support_data["total_tickets"]) * 100
    )

    advanced_injected = inject_context_into_prompt(
        prompt_template=advanced_template,
        context_mesh=context,
        agent_name="ServiceAgent",
        context_mappings={
            "customer_name": "customer_profile.name",
            "customer_id": "customer_profile.id",
            "tier": "customer_profile.tier",
            "value": "customer_profile.account_value",
            "satisfaction": "customer_profile.satisfaction_score",
            "total_tickets": "support_history.total_tickets",
            "avg_resolution": "support_history.avg_resolution_time",
            "priority": "current_issue.priority",
            "issue_description": "current_issue.description",
        },
        additional_context={
            "tier_specific_instructions": tier_instructions.get(
                customer_data["tier"], ""
            ),
            "priority_specific_guidance": priority_guidance.get(
                current_issue_data["priority"], ""
            ),
            "resolution_rate": resolution_rate,
        },
    )

    print("Advanced template with conditional logic:")
    print("─" * 60)
    print(advanced_injected)
    print("─" * 60)

    # 3. Message-based prompt building
    print("\n💬 Message-based prompt building:")

    # Build a conversation-style prompt
    message_prompt = build_message_prompt(
        agent_name="ServiceAgent",
        context_mesh=context,
        system_message="You are a professional customer service representative.",
        user_message="I have a billing question about my recent invoice.",
        include_context=True,
    )

    print("Message-based prompt structure:")
    print("─" * 40)
    for message in message_prompt:
        print(f"Role: {message['role']}")
        print(f"Content: {message['content'][:100]}...")
        print("─" * 20)

    # 4. Dynamic context updates and re-injection
    print("\n🔄 Dynamic context updates:")

    # Add new context
    context.push(
        "agent_notes",
        {
            "previous_interaction": "Customer was satisfied with billing resolution",
            "preferred_contact": "email",
            "special_instructions": "VIP customer - handle with extra care",
        },
    )

    # Template that uses the new context
    updated_template = """
Agent: {agent_name}
Customer: {customer_name} ({tier} tier)

Previous Notes: {previous_interaction}
Preferred Contact: {preferred_contact}
Special Instructions: {special_instructions}

Please assist with: {current_issue}
"""

    updated_prompt = inject_context_into_prompt(
        prompt_template=updated_template,
        context_mesh=context,
        agent_name="ServiceAgent",
        context_mappings={
            "agent_name": "ServiceAgent",  # Static value
            "customer_name": "customer_profile.name",
            "tier": "customer_profile.tier",
            "previous_interaction": "agent_notes.previous_interaction",
            "preferred_contact": "agent_notes.preferred_contact",
            "special_instructions": "agent_notes.special_instructions",
            "current_issue": "current_issue.description",
        },
    )

    print("Updated prompt with new context:")
    print("─" * 50)
    print(updated_prompt)
    print("─" * 50)

    # 5. Error handling and fallbacks
    print("\n⚠️  Error handling in context injection:")

    # Template with potentially missing context
    fallback_template = """
Customer: {customer_name|Unknown Customer}
Issue: {missing_field|No issue specified}
Priority: {priority|normal}
"""

    # This would handle missing fields gracefully
    safe_prompt = inject_context_into_prompt(
        prompt_template=fallback_template,
        context_mesh=context,
        agent_name="ServiceAgent",
        context_mappings={
            "customer_name": "customer_profile.name",
            "missing_field": "nonexistent.field",  # This will use fallback
            "priority": "current_issue.priority",
        },
        use_fallbacks=True,
    )

    print("Prompt with fallback handling:")
    print("─" * 40)
    print(safe_prompt)
    print("─" * 40)

    print("\n✅ Context injection example complete!")
    print("💡 Use context injection for flexible, data-driven prompts")


if __name__ == "__main__":
    main()
