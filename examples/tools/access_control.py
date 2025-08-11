"""
Tools - Access Control Example

This example demonstrates Syntha's access control system for tools,
including role-based permissions and restricted handlers.

Copy and run this code to see access control in action!
"""

from syntha import (
    PREDEFINED_ROLES,
    ContextMesh,
    ToolHandler,
    create_restricted_handler,
    create_role_based_handler,
    get_role_info,
)


def main():
    print("🚀 Tools - Access Control")
    print("=" * 40)

    # Create context mesh
    context = ContextMesh(user_id="secure_team")

    # Show predefined roles
    print("👥 Predefined roles available:")
    for role in PREDEFINED_ROLES:
        role_info = get_role_info(role)
        print(f"   - {role}: {role_info['description']}")

    # Create role-based handlers
    admin_handler = create_role_based_handler(context, "AdminAgent", "admin")
    viewer_handler = create_role_based_handler(context, "ViewerAgent", "readonly")

    print("\n✅ Role-based handlers created")

    # Admin can do everything
    admin_tools = [schema["name"] for schema in admin_handler.get_schemas()]
    print(f"\n🔑 Admin tools: {admin_tools}")

    # Viewer has limited access
    viewer_tools = [schema["name"] for schema in viewer_handler.get_schemas()]
    print(f"👁️  Viewer tools: {viewer_tools}")

    # Test admin operations
    admin_push = admin_handler.handle_tool_call(
        "push_context",
        key="admin_config",
        value={"max_users": 1000, "backup_enabled": True},
    )
    print(f"\n🔑 Admin push result: {admin_push['success']}")

    # Test viewer operations
    viewer_get = viewer_handler.handle_tool_call("get_context")
    print(f"👁️  Viewer get result: {viewer_get['success']}")

    # Try viewer push (should have limited access)
    try:
        viewer_push = viewer_handler.handle_tool_call(
            "push_context", key="viewer_attempt", value="This might not work"
        )
        print(f"👁️  Viewer push result: {viewer_push['success']}")
    except Exception as e:
        print(f"❌ Viewer push blocked: {str(e)}")

    # Create restricted handler (predefined levels: safe, minimal, readonly)
    restricted_handler = create_restricted_handler(context, "RestrictedAgent", "minimal")

    restricted_available = [
        schema["name"] for schema in restricted_handler.get_schemas()
    ]
    print(f"\n🚫 Restricted agent tools: {restricted_available}")

    # Test restricted operations
    restricted_get = restricted_handler.handle_tool_call("get_context")
    print(f"🚫 Restricted get result: {restricted_get['success']}")

    # Try restricted push (should fail)
    try:
        restricted_push = restricted_handler.handle_tool_call(
            "push_context", key="restricted_attempt", value="This should fail"
        )
        print(f"🚫 Restricted push result: {restricted_push['success']}")
    except Exception as e:
        print(f"❌ Restricted push blocked: Tool not available")

    # Show access control in action
    context.push("sensitive_data", "Top Secret Information", subscribers=["AdminAgent"])

    admin_sensitive = admin_handler.handle_tool_call(
        "get_context", keys=["sensitive_data"]
    )
    viewer_sensitive = viewer_handler.handle_tool_call(
        "get_context", keys=["sensitive_data"]
    )

    print(
        f"\n🔒 Admin can see sensitive data: {'sensitive_data' in admin_sensitive['context']}"
    )
    print(
        f"🔒 Viewer can see sensitive data: {'sensitive_data' in viewer_sensitive['context']}"
    )

    print("\n✅ Access control demonstration complete!")


if __name__ == "__main__":
    main()
