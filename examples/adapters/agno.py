"""
Framework Adapters - Agno Integration Example

This example demonstrates how to integrate Syntha with the Agno framework
for flexible multi-agent coordination with shared context.

Prerequisites:
- pip install agno (if using real Agno framework)
- Set OPENAI_API_KEY environment variable

Copy and run this code to see Agno integration in action!
"""

import os
from syntha import ContextMesh, ToolHandler, build_system_prompt

def simulate_agno_agent(name, tools, prompt):
    """
    Simulate Agno agent for demonstration.
    Replace this with actual Agno agent in real usage.
    """
    print(f"🤖 [SIMULATED] Agno Agent '{name}' Execution")
    print(f"   Available tools: {[tool['name'] for tool in tools[:3]]}...")
    print(f"   Prompt length: {len(prompt)} characters")
    
    # Simulate agent using tools
    return {
        "response": f"Agent {name} analyzed the context and completed the task.",
        "tools_used": ["get_context", "push_context"],
        "context_shared": True
    }

def real_agno_example():
    """
    Example of real Agno integration (commented out for demo).
    Uncomment and modify for actual usage.
    """
    # Uncomment these lines for real Agno usage:
    
    # from agno import Agent
    # 
    # agent = Agent(
    #     name="SynthaAgent",
    #     tools=agno_tools,
    #     instructions=system_prompt,
    #     model="gpt-4"
    # )
    # 
    # result = agent.run(user_message)
    # return result

def main():
    print("🚀 Framework Adapters - Agno Integration")
    print("=" * 45)
    
    # Check for API key (for real usage)
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        print("✅ OpenAI API key found for Agno")
    else:
        print("⚠️  No OpenAI API key found - using simulation mode")
        print("   Set OPENAI_API_KEY environment variable for real usage")
    
    # 1. Set up Syntha
    context = ContextMesh(user_id="content_team")
    
    # Create handlers for different content agents
    writer_handler = ToolHandler(context, "ContentWriter")
    editor_handler = ToolHandler(context, "ContentEditor")
    seo_handler = ToolHandler(context, "SEOSpecialist")
    
    # Add content project context
    context.push("content_strategy", {
        "campaign": "Product Launch Blog Series",
        "target_audience": "B2B software buyers",
        "content_types": ["blog_posts", "case_studies", "whitepapers"],
        "publishing_schedule": "3 posts per week",
        "duration": "8 weeks"
    })
    
    context.push("brand_guidelines", {
        "tone": "professional but approachable",
        "voice": "expert and helpful",
        "keywords": ["automation", "efficiency", "productivity", "ROI"],
        "avoid_terms": ["cheap", "basic", "simple"]
    })
    
    context.push("seo_targets", {
        "primary_keywords": ["business automation", "workflow optimization"],
        "secondary_keywords": ["productivity tools", "process improvement"],
        "target_length": "1500-2000 words",
        "internal_links": 3,
        "external_links": 2
    })
    
    print("✅ Content strategy context added to mesh")
    
    # 2. Get Agno-compatible tools for each agent
    writer_tools = writer_handler.get_tools_for_framework("agno")
    editor_tools = editor_handler.get_tools_for_framework("agno")
    seo_tools = seo_handler.get_tools_for_framework("agno")
    
    print(f"🔧 Created tools for 3 agents:")
    print(f"   Writer: {len(writer_tools)} tools")
    print(f"   Editor: {len(editor_tools)} tools")
    print(f"   SEO: {len(seo_tools)} tools")
    
    # 3. Build context-aware prompts for each agent
    writer_prompt = build_system_prompt("ContentWriter", context)
    editor_prompt = build_system_prompt("ContentEditor", context)
    seo_prompt = build_system_prompt("SEOSpecialist", context)
    
    # 4. Simulate Agno agents working together
    print("\n🔄 Multi-agent content workflow:")
    
    # Writer creates content
    writer_result = simulate_agno_agent("ContentWriter", writer_tools, writer_prompt)
    print(f"   ✍️  Writer: {writer_result['response']}")
    
    # Writer shares draft with team
    writer_handler.handle_tool_call(
        "push_context",
        key="draft_article",
        value={
            "title": "10 Ways Business Automation Transforms Your Workflow",
            "word_count": 1750,
            "status": "first_draft",
            "sections": ["Introduction", "Benefits", "Implementation", "Case Studies", "Conclusion"]
        },
        topics=["content", "review"]
    )
    
    # Editor reviews and provides feedback
    editor_result = simulate_agno_agent("ContentEditor", editor_tools, editor_prompt)
    print(f"   ✏️  Editor: {editor_result['response']}")
    
    # Editor shares feedback
    editor_handler.handle_tool_call(
        "push_context",
        key="editorial_feedback",
        value={
            "overall_rating": "good",
            "suggested_changes": [
                "Strengthen introduction hook",
                "Add more specific examples in section 2",
                "Improve conclusion call-to-action"
            ],
            "grammar_issues": 3,
            "structure_score": 8
        },
        topics=["content", "feedback"]
    )
    
    # SEO Specialist optimizes content
    seo_result = simulate_agno_agent("SEOSpecialist", seo_tools, seo_prompt)
    print(f"   🎯 SEO: {seo_result['response']}")
    
    # SEO shares optimization recommendations
    seo_handler.handle_tool_call(
        "push_context",
        key="seo_analysis",
        value={
            "keyword_density": "optimal",
            "meta_description": "Business automation tools can transform your workflow efficiency by 40%. Learn 10 proven strategies to optimize processes and boost ROI.",
            "suggested_tags": ["automation", "productivity", "business-tools"],
            "readability_score": 85,
            "seo_score": 92
        },
        topics=["content", "seo", "final"]
    )
    
    # 5. Show how all agents can access shared context
    print("\n📊 Final content status:")
    
    for agent_name, handler in [
        ("Writer", writer_handler),
        ("Editor", editor_handler),
        ("SEO", seo_handler)
    ]:
        agent_context = handler.handle_tool_call("get_context")
        context_keys = list(agent_context["context"].keys())
        print(f"   {agent_name} sees: {len(context_keys)} context items")
    
    # 6. Demonstrate Agno-specific features
    print("\n🎯 Agno-specific capabilities:")
    print("   - Tools formatted for Agno's agent system")
    print("   - Context-aware prompts for each agent role")
    print("   - Seamless multi-agent coordination")
    print("   - Flexible tool access control")
    
    # 7. Show workflow completion
    final_context = context.get_all_for_agent("ContentWriter")
    workflow_items = [key for key in final_context.keys() 
                     if key in ["draft_article", "editorial_feedback", "seo_analysis"]]
    
    print(f"\n✅ Content workflow completed:")
    print(f"   Workflow items: {workflow_items}")
    print("   Ready for publication with full team input")
    
    print("\n💡 Next steps for real integration:")
    print("1. Install: pip install agno")
    print("2. Set environment variable: export OPENAI_API_KEY='your-key-here'")
    print("3. Replace simulate_agno_agent() with real Agno agents")
    print("4. Use get_tools_for_framework('agno') for tool integration")
    print("5. Build complex multi-agent workflows with Agno's flexibility")
    
    print("\n✅ Agno integration example complete!")

if __name__ == "__main__":
    main()