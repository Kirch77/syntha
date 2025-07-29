#!/usr/bin/env python3
"""
Tool Access Control Example for Syntha

Demonstrates the various ways to control which tools AI agents can access,
including role-based access, custom restrictions, and multi-agent setups.
"""

import json
from syntha import (
    ContextMesh,
    ToolHandler,
    create_role_based_handler,
    create_restricted_handler,
    create_multi_agent_handlers,
    get_role_info,
    PREDEFINED_ROLES,
)


def demonstrate_basic_access_control():
    """Show basic tool access control patterns."""
    print("🔐 Basic Tool Access Control")
    print("=" * 50)

    mesh = ContextMesh(enable_persistence=False)

    # 1. Default handler (all tools)
    print("\n1. Default Handler (All Tools):")
    default_handler = ToolHandler(mesh, "admin")
    print(f"Available tools: {default_handler.get_available_tools()}")

    # 2. Restricted handler (only read operations)
    print("\n2. Read-Only Handler:")
    readonly_handler = ToolHandler(
        mesh, "reader", allowed_tools=["get_context", "list_context", "discover_topics"]
    )
    print(f"Available tools: {readonly_handler.get_available_tools()}")

    # 3. Safe handler (all except dangerous operations)
    print("\n3. Safe Handler (No Delete):")
    safe_handler = ToolHandler(mesh, "user", denied_tools=["delete_topic"])
    print(f"Available tools: {safe_handler.get_available_tools()}")

    # 4. Test access control
    print("\n4. Testing Access Control:")

    # Try to use an allowed tool
    result = readonly_handler.handle_tool_call("list_context")
    print(f"Allowed tool result: {result['success']}")

    # Try to use a denied tool
    result = readonly_handler.handle_tool_call(
        "delete_topic", topic="test", confirm=True
    )
    print(f"Denied tool result: {result}")


def demonstrate_role_based_access():
    """Show predefined role-based access control."""
    print("\n\n🎭 Role-Based Access Control")
    print("=" * 50)

    mesh = ContextMesh(enable_persistence=False)

    # 1. Show available roles
    print("\n1. Available Predefined Roles:")
    for role_name, role_info in PREDEFINED_ROLES.items():
        print(f"  {role_name}: {role_info['description']}")
        print(f"    Tools: {role_info['tools']}")

    # 2. Create handlers for different roles
    print("\n2. Creating Role-Based Handlers:")

    readonly_handler = create_role_based_handler(mesh, "viewer", "readonly")
    contributor_handler = create_role_based_handler(mesh, "developer", "contributor")
    admin_handler = create_role_based_handler(mesh, "admin", "admin")

    print(f"Readonly agent tools: {readonly_handler.get_available_tools()}")
    print(f"Contributor agent tools: {contributor_handler.get_available_tools()}")
    print(f"Admin agent tools: {admin_handler.get_available_tools()}")

    # 3. Test role access
    print("\n3. Testing Role Access:")

    # Contributor tries to push context (should work)
    result = contributor_handler.handle_tool_call(
        "push_context", key="test_data", value="test", topics=["development"]
    )
    print(f"Contributor push result: {result['success']}")

    # Readonly user tries to push context (should fail)
    result = readonly_handler.handle_tool_call(
        "push_context", key="test_data", value="test", topics=["development"]
    )
    print(f"Readonly push result: {result}")


def demonstrate_custom_roles():
    """Show custom role definitions."""
    print("\n\n🛠️ Custom Roles")
    print("=" * 50)

    mesh = ContextMesh(enable_persistence=False)

    # Define custom roles
    custom_roles = {
        "analyst": {
            "description": "Data analysis specialist",
            "tools": ["get_context", "list_context", "push_context"],
        },
        "moderator": {
            "description": "Community moderator with enhanced permissions",
            "tools": [
                "get_context",
                "list_context",
                "discover_topics",
                "push_context",
                "subscribe_to_topics",
                "unsubscribe_from_topics",
            ],
        },
        "bot": {
            "description": "Automated bot with limited access",
            "tools": ["get_context", "push_context"],
        },
    }

    print("\n1. Custom Role Definitions:")
    for role_name, role_info in custom_roles.items():
        print(f"  {role_name}: {role_info['description']}")
        print(f"    Tools: {role_info['tools']}")

    # Create handlers with custom roles
    print("\n2. Creating Custom Role Handlers:")

    analyst_handler = create_role_based_handler(
        mesh, "analyst1", "analyst", custom_roles
    )
    moderator_handler = create_role_based_handler(
        mesh, "mod1", "moderator", custom_roles
    )
    bot_handler = create_role_based_handler(mesh, "bot1", "bot", custom_roles)

    print(f"Analyst tools: {analyst_handler.get_available_tools()}")
    print(f"Moderator tools: {moderator_handler.get_available_tools()}")
    print(f"Bot tools: {bot_handler.get_available_tools()}")


def demonstrate_restriction_levels():
    """Show predefined restriction levels."""
    print("\n\n🚧 Restriction Levels")
    print("=" * 50)

    mesh = ContextMesh(enable_persistence=False)

    # Create handlers with different restriction levels
    print("\n1. Different Restriction Levels:")

    safe_handler = create_restricted_handler(mesh, "safe_agent", "safe")
    minimal_handler = create_restricted_handler(mesh, "minimal_agent", "minimal")
    readonly_handler = create_restricted_handler(mesh, "readonly_agent", "readonly")

    print(f"Safe mode tools: {safe_handler.get_available_tools()}")
    print(f"Minimal mode tools: {minimal_handler.get_available_tools()}")
    print(f"Readonly mode tools: {readonly_handler.get_available_tools()}")

    # Test restrictions
    print("\n2. Testing Restrictions:")

    # Safe agent tries to delete (should fail)
    result = safe_handler.handle_tool_call("delete_topic", topic="test", confirm=True)
    print(f"Safe agent delete attempt: {result}")

    # Minimal agent tries to subscribe (should fail)
    result = minimal_handler.handle_tool_call("subscribe_to_topics", topics=["test"])
    print(f"Minimal agent subscribe attempt: {result}")


def demonstrate_multi_agent_setup():
    """Show how to set up multiple agents with different access levels."""
    print("\n\n👥 Multi-Agent Setup")
    print("=" * 50)

    mesh = ContextMesh(enable_persistence=False)

    # Define agent configurations
    agent_configs = {
        "admin": {"role": "admin"},
        "developer": {"role": "contributor"},
        "viewer": {"role": "readonly"},
        "analyst": {"allowed_tools": ["get_context", "list_context", "push_context"]},
        "restricted_bot": {"denied_tools": ["delete_topic", "unsubscribe_from_topics"]},
        "qa_tester": {
            "allowed_tools": ["get_context", "push_context", "subscribe_to_topics"]
        },
    }

    print("\n1. Agent Configurations:")
    for agent_name, config in agent_configs.items():
        print(f"  {agent_name}: {config}")

    # Create all handlers at once
    handlers = create_multi_agent_handlers(mesh, agent_configs)

    print("\n2. Agent Tool Access:")
    for agent_name, handler in handlers.items():
        print(f"  {agent_name}: {handler.get_available_tools()}")

    # Show access summaries
    print("\n3. Access Summaries:")
    for agent_name, handler in handlers.items():
        summary = handler.get_access_summary()
        print(f"  {agent_name}:")
        print(f"    Role: {summary['agent_role']}")
        print(
            f"    Available tools: {summary['total_available']}/{summary['total_possible']}"
        )
        print(f"    Tools: {summary['available_tools']}")


def demonstrate_dynamic_access_control():
    """Show how to dynamically modify access control."""
    print("\n\n⚡ Dynamic Access Control")
    print("=" * 50)

    mesh = ContextMesh(enable_persistence=False)

    # Start with basic handler
    handler = ToolHandler(mesh, "dynamic_agent")
    print(f"\n1. Initial tools: {handler.get_available_tools()}")

    # Restrict to read-only
    print("\n2. Restricting to read-only:")
    handler.set_allowed_tools(["get_context", "list_context", "discover_topics"])
    print(f"   Tools after restriction: {handler.get_available_tools()}")

    # Add back some write permissions
    print("\n3. Adding write permissions:")
    handler.add_allowed_tool("push_context")
    handler.add_allowed_tool("subscribe_to_topics")
    print(f"   Tools after adding: {handler.get_available_tools()}")

    # Deny a dangerous tool
    print("\n4. Denying dangerous operations:")
    handler.add_denied_tool("delete_topic")
    print(f"   Tools after denial: {handler.get_available_tools()}")

    # Change role
    print("\n5. Switching to admin role:")
    handler.set_agent_role("admin")
    print(f"   Role: {handler.agent_role}")
    print(f"   Tools: {handler.get_available_tools()}")

    # Show final summary
    print("\n6. Final Access Summary:")
    summary = handler.get_access_summary()
    for key, value in summary.items():
        print(f"   {key}: {value}")


def demonstrate_real_world_scenario():
    """Show a real-world multi-agent collaboration scenario."""
    print("\n\n🌐 Real-World Scenario: Development Team")
    print("=" * 50)

    mesh = ContextMesh(enable_persistence=False)

    # Set up development team with appropriate access levels
    team_configs = {
        "tech_lead": {"role": "admin"},
        "senior_dev": {"role": "contributor"},
        "junior_dev": {
            "allowed_tools": [
                "get_context",
                "push_context",
                "list_context",
                "subscribe_to_topics",
            ]
        },
        "qa_engineer": {
            "allowed_tools": [
                "get_context",
                "push_context",
                "list_context",
                "discover_topics",
            ]
        },
        "pm": {"allowed_tools": ["get_context", "list_context", "discover_topics"]},
        "deployment_bot": {"allowed_tools": ["get_context", "push_context"]},
        "monitoring_bot": {"allowed_tools": ["get_context", "list_context"]},
    }

    team_handlers = create_multi_agent_handlers(mesh, team_configs)

    print("\n1. Development Team Setup:")
    for role, handler in team_handlers.items():
        print(f"   {role}: {len(handler.get_available_tools())} tools")

    # Simulate some interactions
    print("\n2. Team Interactions:")

    # Tech lead sets up project context
    result = team_handlers["tech_lead"].handle_tool_call(
        "push_context",
        key="project_status",
        value="Sprint 1 - In Progress",
        topics=["development", "management"],
    )
    print(f"   Tech lead shares status: {result['success']}")

    # Senior dev subscribes to development topics
    result = team_handlers["senior_dev"].handle_tool_call(
        "subscribe_to_topics", topics=["development", "architecture"]
    )
    print(f"   Senior dev subscribes: {result['success']}")

    # PM tries to push code (should fail)
    result = team_handlers["pm"].handle_tool_call(
        "push_context",
        key="code_review",
        value="Ready for review",
        topics=["development"],
    )
    print(f"   PM tries to push code context: {result}")

    # Junior dev gets context
    result = team_handlers["junior_dev"].handle_tool_call("list_context")
    print(f"   Junior dev lists context: {result['success']}")


if __name__ == "__main__":
    print("🎯 Syntha Tool Access Control Examples")
    print("=" * 60)

    try:
        demonstrate_basic_access_control()
        demonstrate_role_based_access()
        demonstrate_custom_roles()
        demonstrate_restriction_levels()
        demonstrate_multi_agent_setup()
        demonstrate_dynamic_access_control()
        demonstrate_real_world_scenario()

        print("\n\n✅ All examples completed successfully!")
        print("\nKey takeaways:")
        print("• Use allowed_tools/denied_tools for basic access control")
        print("• Use predefined roles for common patterns")
        print("• Create custom roles for specific use cases")
        print("• Use restriction levels for quick setup")
        print("• Set up multi-agent systems with different access levels")
        print("• Dynamically modify access as needed")

    except Exception as e:
        print(f"\n❌ Error running examples: {e}")
        import traceback

        traceback.print_exc()
