"""
Extras - Complete Workflows Example

This example demonstrates a complete end-to-end workflow using
all of Syntha's features together in a real-world scenario.

Scenario: E-commerce Product Launch Workflow
- Market Research Agent analyzes trends
- Product Manager defines requirements
- Engineering Agent plans development
- Marketing Agent creates campaign
- Sales Agent prepares materials

Copy and run this code to see complete workflows in action!
"""

import os
from syntha import ContextMesh, ToolHandler, build_system_prompt, create_multi_agent_handlers

def main():
    print("🚀 Extras - Complete E-commerce Product Launch Workflow")
    print("=" * 60)
    
    # 1. Initialize the workflow with persistence
    print("\n🏗️  Setting up workflow infrastructure:")
    
    context = ContextMesh(
        user_id="ecommerce_team",
        enable_persistence=True,
        db_backend="sqlite",
        db_path="product_launch.db"
    )
    
    # Define all agents involved in the workflow
    agent_configs = [
        {"name": "MarketResearcher", "role": "contributor", "topics": ["research", "market", "trends"]},
        {"name": "ProductManager", "role": "admin", "topics": ["product", "requirements", "strategy"]},
        {"name": "EngineeringLead", "role": "contributor", "topics": ["development", "technical", "timeline"]},
        {"name": "MarketingManager", "role": "contributor", "topics": ["marketing", "campaign", "launch"]},
        {"name": "SalesDirector", "role": "contributor", "topics": ["sales", "pricing", "materials"]},
        {"name": "ProjectCoordinator", "role": "admin", "topics": ["coordination", "status", "timeline"]}
    ]
    
    # Create all handlers
    handlers = create_multi_agent_handlers(context, agent_configs)
    
    print(f"✅ Created {len(handlers)} specialized agents")
    
    # 2. Phase 1: Market Research
    print("\n📊 Phase 1: Market Research")
    print("-" * 30)
    
    researcher = handlers["MarketResearcher"]
    
    # Market researcher gathers initial data
    researcher.handle_tool_call(
        "push_context",
        key="market_analysis",
        value={
            "target_market": "Eco-conscious millennials",
            "market_size": "$2.3B globally",
            "growth_rate": "15% annually",
            "key_competitors": ["GreenTech Co", "EcoSolutions", "SustainableLife"],
            "price_sensitivity": "Medium to high",
            "preferred_channels": ["online", "social_media", "influencer_marketing"]
        },
        topics=["research", "market"]
    )
    
    researcher.handle_tool_call(
        "push_context",
        key="consumer_insights",
        value={
            "primary_concerns": ["environmental_impact", "product_quality", "price_value"],
            "purchase_drivers": ["sustainability", "brand_reputation", "peer_recommendations"],
            "preferred_features": ["recyclable_packaging", "carbon_neutral", "local_sourcing"],
            "budget_range": "$25-75 per item"
        },
        topics=["research", "strategy"]
    )
    
    print("✅ Market research completed and shared")
    
    # 3. Phase 2: Product Requirements
    print("\n📋 Phase 2: Product Requirements Definition")
    print("-" * 45)
    
    pm = handlers["ProductManager"]
    
    # Product manager defines requirements based on research
    pm_context = pm.handle_tool_call("get_context")
    research_data = pm_context["context"]
    
    pm.handle_tool_call(
        "push_context",
        key="product_requirements",
        value={
            "product_name": "EcoSmart Water Bottle",
            "key_features": [
                "100% recycled materials",
                "Temperature retention 24h",
                "Smart hydration tracking",
                "Carbon-neutral shipping"
            ],
            "target_price": "$49.99",
            "launch_timeline": "Q2 2025",
            "success_metrics": {
                "revenue_target": 500000,
                "unit_sales": 10000,
                "market_share": "2%"
            }
        },
        topics=["product", "requirements", "strategy"]
    )
    
    pm.handle_tool_call(
        "push_context",
        key="technical_specs",
        value={
            "materials": "Recycled stainless steel, bio-plastic",
            "capacity": "750ml",
            "dimensions": "25cm x 8cm diameter",
            "weight": "320g",
            "features": {
                "smart_sensor": "Hydration tracking via app",
                "insulation": "Double-wall vacuum",
                "sustainability": "100% recyclable"
            }
        },
        topics=["technical", "development"]
    )
    
    print("✅ Product requirements defined and shared")
    
    # 4. Phase 3: Development Planning
    print("\n💻 Phase 3: Development Planning")
    print("-" * 35)
    
    eng = handlers["EngineeringLead"]
    
    # Engineering lead creates development plan
    eng_context = eng.handle_tool_call("get_context")
    
    eng.handle_tool_call(
        "push_context",
        key="development_plan",
        value={
            "phases": {
                "design": {"duration": "3 weeks", "team_size": 2},
                "prototyping": {"duration": "4 weeks", "team_size": 3},
                "testing": {"duration": "2 weeks", "team_size": 4},
                "manufacturing_setup": {"duration": "6 weeks", "team_size": 2}
            },
            "total_timeline": "15 weeks",
            "team_requirements": {
                "product_designers": 2,
                "mechanical_engineers": 2,
                "app_developers": 2,
                "quality_engineers": 1
            },
            "key_milestones": [
                {"week": 3, "milestone": "Design approval"},
                {"week": 7, "milestone": "Working prototype"},
                {"week": 9, "milestone": "Testing complete"},
                {"week": 15, "milestone": "Manufacturing ready"}
            ]
        },
        topics=["development", "timeline", "coordination"]
    )
    
    eng.handle_tool_call(
        "push_context",
        key="technical_risks",
        value={
            "high_risk": ["Smart sensor integration", "App connectivity"],
            "medium_risk": ["Material sourcing", "Manufacturing quality"],
            "low_risk": ["Basic insulation", "Standard components"],
            "mitigation_strategies": {
                "sensor_integration": "Partner with established IoT provider",
                "material_sourcing": "Secure multiple suppliers",
                "quality_control": "Implement rigorous testing protocols"
            }
        },
        topics=["technical", "strategy"]
    )
    
    print("✅ Development plan created and risks identified")
    
    # 5. Phase 4: Marketing Campaign
    print("\n📢 Phase 4: Marketing Campaign Development")
    print("-" * 45)
    
    marketing = handlers["MarketingManager"]
    
    # Marketing manager creates campaign based on all previous context
    marketing_context = marketing.handle_tool_call("get_context")
    
    marketing.handle_tool_call(
        "push_context",
        key="marketing_strategy",
        value={
            "campaign_theme": "Hydrate Sustainably, Live Responsibly",
            "key_messages": [
                "Track your hydration, reduce your footprint",
                "Smart technology meets sustainable design",
                "Join the eco-hydration revolution"
            ],
            "channels": {
                "social_media": {"budget": 50000, "platforms": ["Instagram", "TikTok", "LinkedIn"]},
                "influencer_partnerships": {"budget": 30000, "tier": "micro and macro"},
                "content_marketing": {"budget": 20000, "focus": "sustainability blogs"},
                "paid_advertising": {"budget": 40000, "platforms": ["Google", "Facebook"]}
            },
            "timeline": {
                "pre_launch": "8 weeks before launch",
                "launch_week": "Intensive campaign",
                "post_launch": "6 weeks sustained effort"
            }
        },
        topics=["marketing", "campaign", "launch"]
    )
    
    marketing.handle_tool_call(
        "push_context",
        key="content_calendar",
        value={
            "week_1": "Teaser campaign - sustainability focus",
            "week_2": "Product reveal - smart features highlight",
            "week_3": "Behind the scenes - development story",
            "week_4": "User testimonials - beta tester feedback",
            "launch_week": "Full campaign activation",
            "post_launch": "User-generated content and reviews"
        },
        topics=["marketing", "coordination"]
    )
    
    print("✅ Marketing campaign strategy developed")
    
    # 6. Phase 5: Sales Preparation
    print("\n💰 Phase 5: Sales Materials and Strategy")
    print("-" * 40)
    
    sales = handlers["SalesDirector"]
    
    # Sales director prepares materials and pricing strategy
    sales_context = sales.handle_tool_call("get_context")
    
    sales.handle_tool_call(
        "push_context",
        key="sales_strategy",
        value={
            "pricing_tiers": {
                "early_bird": {"price": 39.99, "period": "First 1000 units"},
                "launch_price": {"price": 49.99, "period": "First quarter"},
                "regular_price": {"price": 54.99, "period": "Ongoing"}
            },
            "distribution_channels": {
                "direct_to_consumer": {"commission": 0, "margin": "45%"},
                "retail_partnerships": {"commission": "15%", "margin": "30%"},
                "online_marketplaces": {"commission": "10%", "margin": "35%"}
            },
            "sales_targets": {
                "q2_2025": {"units": 2500, "revenue": 125000},
                "q3_2025": {"units": 4000, "revenue": 200000},
                "q4_2025": {"units": 3500, "revenue": 175000}
            }
        },
        topics=["sales", "pricing", "strategy"]
    )
    
    sales.handle_tool_call(
        "push_context",
        key="sales_materials",
        value={
            "product_sheets": "Technical specs and benefits overview",
            "demo_videos": "Product functionality and app integration",
            "comparison_charts": "Competitive analysis vs top 3 competitors",
            "roi_calculator": "Environmental impact and cost savings tool",
            "training_materials": "Sales team education on sustainability features"
        },
        topics=["sales", "materials"]
    )
    
    print("✅ Sales strategy and materials prepared")
    
    # 7. Phase 6: Project Coordination
    print("\n🎯 Phase 6: Project Coordination and Status")
    print("-" * 45)
    
    coordinator = handlers["ProjectCoordinator"]
    
    # Project coordinator gets comprehensive view
    coord_context = coordinator.handle_tool_call("get_context")
    all_context = coord_context["context"]
    
    # Generate project status report
    coordinator.handle_tool_call(
        "push_context",
        key="project_status",
        value={
            "overall_progress": "85% planning complete",
            "phase_status": {
                "market_research": "Complete ✅",
                "product_requirements": "Complete ✅", 
                "development_planning": "Complete ✅",
                "marketing_strategy": "Complete ✅",
                "sales_preparation": "Complete ✅",
                "execution": "Ready to begin 🚀"
            },
            "key_decisions_made": [
                "Product: EcoSmart Water Bottle ($49.99)",
                "Target: Eco-conscious millennials",
                "Timeline: 15 weeks development",
                "Budget: $140K marketing, $500K revenue target"
            ],
            "next_steps": [
                "Begin design phase",
                "Finalize supplier agreements", 
                "Start pre-launch marketing",
                "Prepare sales team training"
            ],
            "risks_to_monitor": [
                "Smart sensor integration complexity",
                "Material sourcing availability",
                "Market timing and competition"
            ]
        },
        topics=["coordination", "status", "timeline"]
    )
    
    print("✅ Project coordination complete")
    
    # 8. Workflow Summary and Handoffs
    print("\n📈 Workflow Summary and Next Steps")
    print("-" * 40)
    
    print(f"📊 Total context items created: {len(all_context)}")
    print("📋 Key deliverables:")
    
    key_deliverables = [
        "market_analysis", "product_requirements", "development_plan",
        "marketing_strategy", "sales_strategy", "project_status"
    ]
    
    for deliverable in key_deliverables:
        if deliverable in all_context:
            print(f"   ✅ {deliverable.replace('_', ' ').title()}")
    
    # Show agent visibility
    print(f"\n👥 Agent Context Visibility:")
    for agent_name, handler in handlers.items():
        agent_context = handler.handle_tool_call("get_context")
        context_count = len(agent_context["context"])
        print(f"   {agent_name}: {context_count} context items")
    
    # 9. Demonstrate workflow persistence
    print("\n💾 Workflow Persistence:")
    print("   All workflow data is automatically persisted")
    print("   Team can resume work after breaks or handoffs")
    print("   Context remains available for future product iterations")
    
    # 10. Success metrics and monitoring
    print("\n🎯 Success Metrics to Track:")
    print("   - Development timeline adherence")
    print("   - Marketing campaign performance")
    print("   - Sales target achievement")
    print("   - Customer satisfaction scores")
    print("   - Environmental impact metrics")
    
    print("\n✅ Complete product launch workflow ready!")
    print("🚀 All teams aligned and ready for execution")
    print("📊 Comprehensive context available for decision-making")

if __name__ == "__main__":
    main()