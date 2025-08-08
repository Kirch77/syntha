"""
Prompts - System Prompts Example

This example demonstrates how to build context-aware system prompts
that automatically include relevant context for your agents.

Copy and run this code to see system prompts in action!
"""

from syntha import ContextMesh, build_custom_prompt, build_system_prompt


def main():
    print("🚀 Prompts - System Prompts")
    print("=" * 35)

    # Create context mesh with business scenario
    context = ContextMesh(user_id="business_team")

    # Add business context
    context.push(
        "company_profile",
        {
            "name": "InnovateTech Solutions",
            "industry": "B2B SaaS",
            "employees": 150,
            "founded": 2018,
            "mission": "Empowering businesses through intelligent automation",
        },
    )

    context.push(
        "current_goals",
        {
            "q1_revenue_target": 2500000,
            "customer_acquisition": 200,
            "product_launches": 2,
            "market_expansion": ["Europe", "Asia-Pacific"],
        },
    )

    context.push(
        "team_structure",
        {
            "engineering": 45,
            "sales": 25,
            "marketing": 20,
            "support": 15,
            "leadership": 10,
        },
    )

    # Add agent-specific context
    context.push(
        "sales_targets",
        {"monthly_quota": 200000, "conversion_rate": 0.15, "pipeline_value": 5000000},
        subscribers=["SalesAgent", "SalesManager"],
    )

    context.push(
        "product_roadmap",
        {
            "current_version": "2.1",
            "next_release": "2025-02-15",
            "features": ["AI Analytics", "Mobile App"],
        },
        subscribers=["ProductAgent", "EngineeringAgent"],
    )

    print("✅ Business context added to mesh")

    # 1. Build basic system prompts for different agents
    print("\n📝 Building system prompts for different agents:")

    sales_prompt = build_system_prompt("SalesAgent", context)
    product_prompt = build_system_prompt("ProductAgent", context)
    support_prompt = build_system_prompt("SupportAgent", context)

    print(f"   SalesAgent prompt: {len(sales_prompt)} characters")
    print(f"   ProductAgent prompt: {len(product_prompt)} characters")
    print(f"   SupportAgent prompt: {len(support_prompt)} characters")

    # 2. Show what's included in a sales agent prompt
    print("\n👤 SalesAgent System Prompt Preview:")
    print("─" * 50)
    print(sales_prompt[:300] + "..." if len(sales_prompt) > 300 else sales_prompt)
    print("─" * 50)

    # 3. Build custom prompts with specific instructions
    print("\n🎯 Building custom prompts:")

    sales_template = (
        "You are a senior sales consultant specializing in B2B SaaS.\n\n"
        "Customer profile: {company_profile}\n\n"
        "Goals: {current_goals}\n\n"
        "Team: {team_structure}\n"
    )
    custom_sales_prompt = build_custom_prompt(
        agent_name="SalesAgent",
        context_mesh=context,
        keys=["company_profile", "current_goals", "team_structure"],
        template=sales_template,
    )

    print(f"   Custom sales prompt: {len(custom_sales_prompt)} characters")

    # 4. Build prompts with topic filtering
    context.register_agent_topics("MarketingAgent", ["marketing", "campaigns"])
    context.push(
        "campaign_data", {"current": "Q1 Growth", "budget": 50000}, topics=["marketing"]
    )

    marketing_prompt = build_system_prompt("MarketingAgent", context)
    print(f"   Marketing prompt (topic-filtered): {len(marketing_prompt)} characters")

    # 5. Demonstrate prompt customization options
    print("\n⚙️  Prompt customization examples:")

    # Minimal prompt
    minimal_prompt = build_custom_prompt(
        agent_name="SimpleAgent",
        context_mesh=context,
        keys=["company_profile"],
        template="You are a helpful assistant. Context: {company_profile}",
    )
    print(f"   Minimal prompt: {len(minimal_prompt)} characters")

    # Detailed prompt with context
    detailed_template = (
        "You are an expert business analyst.\n\n"
        "Company: {company_profile}\n"
        "Roadmap: {product_roadmap}\n"
    )
    detailed_prompt = build_custom_prompt(
        agent_name="DetailedAgent",
        context_mesh=context,
        keys=["company_profile", "product_roadmap"],
        template=detailed_template,
    )
    print(f"   Detailed prompt: {len(detailed_prompt)} characters")

    # 6. Show how context changes affect prompts
    print("\n🔄 Dynamic prompt updates:")

    # Add new context
    context.push("breaking_news", "Major competitor acquired by tech giant")
    context.push("market_alert", "New regulations affecting SaaS industry")

    # Rebuild prompt - it now includes the new context
    updated_sales_prompt = build_system_prompt("SalesAgent", context)
    print(f"   Updated sales prompt: {len(updated_sales_prompt)} characters")
    print(
        f"   Change in length: {len(updated_sales_prompt) - len(sales_prompt):+d} characters"
    )

    # 7. Topic-based context filtering in prompts
    print("\n🎯 Topic-based prompt filtering:")

    # Subscribe to specific topics
    context.register_agent_topics("TechAgent", ["engineering", "product"])
    context.register_agent_topics("BusinessAgent", ["sales", "marketing", "business"])

    # Push topic-specific content
    context.push("tech_update", "New API endpoints released", topics=["engineering"])
    context.push(
        "business_metric", "Customer churn reduced by 15%", topics=["business"]
    )

    tech_prompt = build_system_prompt("TechAgent", context)
    business_prompt = build_system_prompt("BusinessAgent", context)

    print(f"   TechAgent sees technical context: {len(tech_prompt)} chars")
    print(f"   BusinessAgent sees business context: {len(business_prompt)} chars")

    # 8. Show prompt components
    print("\n🧩 Prompt components breakdown:")
    print("   System prompts typically include:")
    print("   - Agent role and capabilities")
    print("   - Available context summary")
    print("   - Custom instructions")
    print("   - Tool usage guidelines")
    print("   - Response format expectations")

    print("\n✅ System prompts example complete!")
    print("💡 Use these prompts directly with your LLM of choice")


if __name__ == "__main__":
    main()
