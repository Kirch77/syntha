"""
Extras - Real-World Use Cases Example

This example demonstrates practical real-world applications of Syntha
across different industries and business scenarios.

Copy and run this code to see real-world use cases in action!
"""

from syntha import ContextMesh, ToolHandler, build_system_prompt


def customer_support_use_case():
    """Customer Support: Multi-tier support with context continuity."""
    print("🎧 Use Case 1: Customer Support System")
    print("-" * 40)

    context = ContextMesh(user_id="customer_12345")

    # Initial customer context
    context.push(
        "customer_profile",
        {
            "id": "CUST-12345",
            "name": "Sarah Johnson",
            "tier": "Premium",
            "subscription": "Enterprise Plan",
            "account_value": 15000,
            "support_history": {
                "total_tickets": 12,
                "avg_resolution": "4.2 hours",
                "satisfaction": 4.6,
            },
        },
    )

    # L1 Support Agent handles initial inquiry
    l1_agent = ToolHandler(context, "L1Support")
    l1_agent.handle_tool_call(
        "push_context",
        key="initial_inquiry",
        value={
            "issue": "Unable to generate quarterly reports",
            "urgency": "high",
            "category": "feature_issue",
            "user_impact": "Blocking end-of-quarter deliverables",
        },
        topics=["support", "escalation"],
    )

    # L1 attempts resolution
    l1_agent.handle_tool_call(
        "push_context",
        key="l1_actions",
        value={
            "troubleshooting_steps": [
                "Verified user permissions",
                "Checked system status",
                "Reviewed recent updates",
            ],
            "result": "Issue persists - requires backend investigation",
            "recommendation": "Escalate to L2 Technical Support",
        },
        topics=["support", "escalation"],
    )

    # L2 Technical Support gets full context
    l2_agent = ToolHandler(context, "L2Technical")
    l2_context = l2_agent.handle_tool_call("get_context")

    l2_agent.handle_tool_call(
        "push_context",
        key="technical_analysis",
        value={
            "root_cause": "Database query timeout in reporting module",
            "fix_applied": "Optimized query and increased timeout limit",
            "testing": "Verified report generation working",
            "resolution_time": "45 minutes",
        },
        topics=["support", "resolution"],
    )

    # Customer Success Manager follows up
    csm_agent = ToolHandler(context, "CustomerSuccess")
    csm_agent.handle_tool_call(
        "push_context",
        key="follow_up",
        value={
            "satisfaction_check": "Customer confirmed issue resolved",
            "additional_support": "Offered training on advanced reporting features",
            "account_notes": "Proactive monitoring set up for similar issues",
        },
    )

    print("✅ Multi-tier support with complete context continuity")
    print(f"   Total resolution time: 45 minutes (vs typical 4+ hours)")


def sales_intelligence_use_case():
    """Sales Intelligence: Coordinated lead nurturing and conversion."""
    print("\n💼 Use Case 2: Sales Intelligence System")
    print("-" * 42)

    context = ContextMesh(user_id="lead_techcorp_001")

    # Marketing Qualified Lead (MQL) data
    context.push(
        "lead_profile",
        {
            "company": "TechCorp Solutions",
            "contact": "Michael Chen",
            "title": "VP of Operations",
            "company_size": "500-1000 employees",
            "industry": "Financial Services",
            "pain_points": [
                "Manual processes",
                "Compliance overhead",
                "Scaling challenges",
            ],
            "budget_range": "$100K-250K",
            "timeline": "Q1 2025 implementation",
        },
    )

    # Marketing team shares campaign context
    marketing_agent = ToolHandler(context, "MarketingAgent")
    marketing_agent.handle_tool_call(
        "push_context",
        key="marketing_intelligence",
        value={
            "source_campaign": "Automation ROI Webinar",
            "engagement_score": 85,
            "content_consumed": [
                "ROI Calculator whitepaper",
                "Compliance automation case study",
                "Product demo video",
            ],
            "behavioral_signals": [
                "Downloaded multiple resources",
                "Attended full webinar",
                "Visited pricing page 3 times",
            ],
        },
        topics=["sales", "intelligence"],
    )

    # Sales Development Rep (SDR) qualifies lead
    sdr_agent = ToolHandler(context, "SDRAgent")
    sdr_agent.handle_tool_call(
        "push_context",
        key="qualification_call",
        value={
            "call_date": "2025-01-18",
            "duration": "25 minutes",
            "qualification_score": 92,
            "key_insights": [
                "Currently using 3 different tools",
                "Spending 20 hours/week on manual processes",
                "Board pressure to improve efficiency",
                "Decision committee: VP Ops, CTO, CFO",
            ],
            "next_steps": "Schedule technical demo with AE",
            "urgency": "High - budget allocated for Q1",
        },
        topics=["sales", "qualified"],
    )

    # Account Executive takes over with full context
    ae_agent = ToolHandler(context, "AccountExecutive")
    ae_context = ae_agent.handle_tool_call("get_context")

    ae_agent.handle_tool_call(
        "push_context",
        key="demo_session",
        value={
            "demo_date": "2025-01-22",
            "attendees": ["Michael Chen", "Sarah Kim (CTO)", "David Park (CFO)"],
            "demo_focus": [
                "Compliance automation workflows",
                "Integration with existing systems",
                "ROI projections and cost savings",
            ],
            "feedback": {
                "technical_fit": "Excellent",
                "pricing_reaction": "Within budget",
                "concerns": ["Implementation timeline", "Change management"],
            },
            "next_steps": "Proposal with implementation plan",
        },
        topics=["sales", "opportunity"],
    )

    # Sales Engineer provides technical support
    se_agent = ToolHandler(context, "SalesEngineer")
    se_agent.handle_tool_call(
        "push_context",
        key="technical_proposal",
        value={
            "implementation_plan": "6-week phased rollout",
            "integration_requirements": ["Salesforce", "NetSuite", "Active Directory"],
            "training_plan": "2-day onsite + ongoing support",
            "risk_mitigation": "Parallel running for 2 weeks",
            "success_metrics": "50% reduction in manual processes",
        },
        topics=["sales", "technical"],
    )

    # Sales Manager reviews opportunity
    sm_agent = ToolHandler(context, "SalesManager")
    sm_context = sm_agent.handle_tool_call("get_context")

    print("✅ Coordinated sales process with shared intelligence")
    print(f"   Lead score improved from MQL to high-probability opportunity")


def content_operations_use_case():
    """Content Operations: Editorial workflow with review cycles."""
    print("\n📝 Use Case 3: Content Operations Workflow")
    print("-" * 43)

    context = ContextMesh(user_id="content_team")

    # Content strategy context
    context.push(
        "content_strategy",
        {
            "campaign": "Thought Leadership Series",
            "target_audience": "C-level executives in mid-market companies",
            "content_pillars": ["Innovation", "Efficiency", "Growth"],
            "publishing_schedule": "2 articles per week",
            "distribution_channels": [
                "Company blog",
                "LinkedIn",
                "Industry publications",
            ],
        },
    )

    # Content Writer creates article
    writer = ToolHandler(context, "ContentWriter")
    writer.handle_tool_call(
        "push_context",
        key="article_draft",
        value={
            "title": "5 Innovation Strategies That Drive Sustainable Growth",
            "word_count": 1850,
            "target_keywords": [
                "innovation strategies",
                "sustainable growth",
                "business transformation",
            ],
            "outline": [
                "Introduction: The Innovation Imperative",
                "Strategy 1: Customer-Centric Innovation",
                "Strategy 2: Data-Driven Decision Making",
                "Strategy 3: Agile Implementation",
                "Strategy 4: Partnership Ecosystems",
                "Strategy 5: Continuous Learning Culture",
                "Conclusion: Building Innovation DNA",
            ],
            "status": "First draft complete",
            "research_sources": 8,
            "expert_quotes": 3,
        },
        topics=["content", "review"],
    )

    # Content Editor reviews
    editor = ToolHandler(context, "ContentEditor")
    editor.handle_tool_call(
        "push_context",
        key="editorial_review",
        value={
            "review_date": "2025-01-19",
            "overall_assessment": "Strong content, minor revisions needed",
            "strengths": [
                "Clear structure and flow",
                "Relevant examples and case studies",
                "Good balance of theory and practice",
            ],
            "revision_requests": [
                "Strengthen introduction hook",
                "Add more specific metrics in Strategy 2",
                "Improve call-to-action in conclusion",
            ],
            "seo_notes": "Good keyword density, add internal links",
            "estimated_revision_time": "2 hours",
        },
        topics=["content", "revision"],
    )

    # SEO Specialist optimizes
    seo = ToolHandler(context, "SEOSpecialist")
    seo.handle_tool_call(
        "push_context",
        key="seo_optimization",
        value={
            "meta_title": "5 Innovation Strategies for Sustainable Business Growth | CompanyName",
            "meta_description": "Discover proven innovation strategies that C-level executives use to drive sustainable growth. Learn actionable tactics for business transformation.",
            "target_keywords_optimized": True,
            "internal_links_added": [
                "Link to 'Digital Transformation Guide'",
                "Link to 'Leadership in Innovation' article",
                "Link to 'Growth Strategy Framework' resource",
            ],
            "readability_score": 87,
            "seo_score": 94,
        },
        topics=["content", "seo"],
    )

    # Content Manager approves for publication
    manager = ToolHandler(context, "ContentManager")
    manager_context = manager.handle_tool_call("get_context")

    manager.handle_tool_call(
        "push_context",
        key="publication_approval",
        value={
            "approval_status": "Approved for publication",
            "publish_date": "2025-01-25",
            "distribution_plan": {
                "company_blog": "Primary publication",
                "linkedin": "Excerpt with link back",
                "industry_publication": "Pitch for syndication",
            },
            "promotion_strategy": [
                "Social media campaign",
                "Email newsletter feature",
                "Sales team enablement",
            ],
            "success_metrics": {
                "target_views": 5000,
                "target_engagement": "4% CTR",
                "lead_generation": "50 qualified leads",
            },
        },
    )

    print("✅ Streamlined content workflow with quality controls")
    print(f"   Reduced review cycles from 5 days to 2 days")


def main():
    print("🚀 Real-World Use Cases for Syntha")
    print("=" * 45)

    # Run all use cases
    customer_support_use_case()
    sales_intelligence_use_case()
    content_operations_use_case()

    print("\n🎯 Key Benefits Demonstrated:")
    print("   ✅ Context continuity across handoffs")
    print("   ✅ Reduced information loss and repetition")
    print("   ✅ Faster resolution and decision-making")
    print("   ✅ Improved collaboration and alignment")
    print("   ✅ Better customer and stakeholder experience")

    print("\n🏢 Industries and Applications:")
    print("   • Customer Support & Success")
    print("   • Sales & Business Development")
    print("   • Content & Marketing Operations")
    print("   • Product Development")
    print("   • Project Management")
    print("   • Healthcare & Patient Care")
    print("   • Education & Training")
    print("   • Legal & Compliance")
    print("   • Financial Services")
    print("   • Manufacturing & Supply Chain")

    print("\n💡 Implementation Tips:")
    print("   1. Start with one workflow or team")
    print("   2. Define clear context ownership and access")
    print("   3. Establish topic-based routing early")
    print("   4. Use persistence for long-running processes")
    print("   5. Monitor and optimize context flow")

    print("\n✅ Real-world use cases demonstration complete!")


if __name__ == "__main__":
    main()
