#!/usr/bin/env python3
"""
User Isolation Demo for Syntha

This demo shows how user contexts are properly isolated in both SQLite and PostgreSQL.
Each user's data is completely separate, even when using the same keys and agent names.
"""

import os
import tempfile

from syntha import ContextMesh


def demo_sqlite_user_isolation():
    """Demonstrate user isolation with SQLite backend."""
    print("🗃️  SQLite User Isolation Demo")
    print("=" * 40)

    # Create temporary database
    temp_db = tempfile.NamedTemporaryFile(delete=False, suffix=".db")
    temp_db.close()

    try:
        # Create two user contexts sharing the same database file
        alice_context = ContextMesh(
            user_id="alice@company.com",
            enable_persistence=True,
            db_backend="sqlite",
            db_path=temp_db.name,
        )

        bob_context = ContextMesh(
            user_id="bob@company.com",
            enable_persistence=True,
            db_backend="sqlite",
            db_path=temp_db.name,
        )

        print("👥 Created contexts for Alice and Bob")

        # Both users push data with the same key
        alice_context.push(
            "user_preferences",
            {"theme": "dark", "language": "en", "notifications": True},
        )

        bob_context.push(
            "user_preferences",
            {"theme": "light", "language": "es", "notifications": False},
        )

        print("📝 Both users stored 'user_preferences' with different values")

        # Each user retrieves their own data
        alice_prefs = alice_context.get("user_preferences", "alice_agent")
        bob_prefs = bob_context.get("user_preferences", "bob_agent")

        print(f"👩 Alice's preferences: {alice_prefs}")
        print(f"👨 Bob's preferences: {bob_prefs}")

        # Demonstrate topic isolation
        alice_context.register_agent_topics("sales_agent", ["alice_sales", "general"])
        bob_context.register_agent_topics("sales_agent", ["bob_sales", "general"])

        alice_topics = alice_context.get_topics_for_agent("sales_agent")
        bob_topics = bob_context.get_topics_for_agent("sales_agent")

        print(f"📋 Alice's sales agent topics: {alice_topics}")
        print(f"📋 Bob's sales agent topics: {bob_topics}")

        # Test persistence across restart
        alice_context.close()
        bob_context.close()

        print("🔄 Restarting contexts (simulating system restart)...")

        # Recreate contexts
        alice_context = ContextMesh(
            user_id="alice@company.com",
            enable_persistence=True,
            db_backend="sqlite",
            db_path=temp_db.name,
        )

        bob_context = ContextMesh(
            user_id="bob@company.com",
            enable_persistence=True,
            db_backend="sqlite",
            db_path=temp_db.name,
        )

        # Data should still be isolated
        alice_prefs_after = alice_context.get("user_preferences", "alice_agent")
        bob_prefs_after = bob_context.get("user_preferences", "bob_agent")

        print(f"✅ Alice's preferences after restart: {alice_prefs_after}")
        print(f"✅ Bob's preferences after restart: {bob_prefs_after}")

        # Verify isolation is maintained
        assert alice_prefs_after["theme"] == "dark"
        assert bob_prefs_after["theme"] == "light"
        print("🎉 User isolation working perfectly with SQLite!")

        alice_context.close()
        bob_context.close()

    finally:
        if os.path.exists(temp_db.name):
            os.unlink(temp_db.name)


def demo_postgresql_user_isolation():
    """Demonstrate user isolation with PostgreSQL backend."""
    print("\n🐘 PostgreSQL User Isolation Demo")
    print("=" * 40)

    # Check if PostgreSQL is available
    connection_string = os.getenv(
        "DEMO_POSTGRESQL_URL",
        "postgresql://postgres:password@localhost:5432/syntha_demo",
    )

    try:
        # Create two user contexts sharing the same PostgreSQL database
        alice_context = ContextMesh(
            user_id="alice@company.com",
            enable_persistence=True,
            db_backend="postgresql",
            connection_string=connection_string,
        )

        bob_context = ContextMesh(
            user_id="bob@company.com",
            enable_persistence=True,
            db_backend="postgresql",
            connection_string=connection_string,
        )

        # Clear any existing demo data
        alice_context.clear()
        bob_context.clear()

        print("👥 Created PostgreSQL contexts for Alice and Bob")

        # Both users push complex JSON data with the same key
        alice_context.push(
            "project_data",
            {
                "current_project": "AI Assistant",
                "tasks": ["design", "implement", "test"],
                "progress": 0.75,
                "team_members": ["Alice", "Charlie"],
            },
        )

        bob_context.push(
            "project_data",
            {
                "current_project": "Database Migration",
                "tasks": ["backup", "migrate", "verify"],
                "progress": 0.40,
                "team_members": ["Bob", "Diana"],
            },
        )

        print("📝 Both users stored 'project_data' with different JSON values")

        # Each user retrieves their own complex data
        alice_project = alice_context.get("project_data", "alice_agent")
        bob_project = bob_context.get("project_data", "bob_agent")

        print(
            f"👩 Alice's project: {alice_project['current_project']} ({alice_project['progress']:.0%} complete)"
        )
        print(
            f"👨 Bob's project: {bob_project['current_project']} ({bob_project['progress']:.0%} complete)"
        )

        # Demonstrate agent permissions isolation
        alice_context.set_agent_post_permissions(
            "project_manager", ["alice_team", "general"]
        )
        bob_context.set_agent_post_permissions(
            "project_manager", ["bob_team", "general"]
        )

        alice_perms = alice_context.get_agent_post_permissions("project_manager")
        bob_perms = bob_context.get_agent_post_permissions("project_manager")

        print(f"🔐 Alice's project manager permissions: {alice_perms}")
        print(f"🔐 Bob's project manager permissions: {bob_perms}")

        # Verify isolation is maintained
        assert alice_project["current_project"] == "AI Assistant"
        assert bob_project["current_project"] == "Database Migration"
        assert "alice_team" in alice_perms and "alice_team" not in bob_perms
        assert "bob_team" in bob_perms and "bob_team" not in alice_perms

        print("🎉 User isolation working perfectly with PostgreSQL!")

        alice_context.close()
        bob_context.close()

    except Exception as e:
        print(f"⚠️  PostgreSQL demo skipped: {e}")
        print("💡 To run PostgreSQL demo:")
        print("   1. Install PostgreSQL and psycopg2")
        print("   2. Create database: createdb syntha_demo")
        print("   3. Set DEMO_POSTGRESQL_URL environment variable")


def demo_user_isolation_benefits():
    """Show the benefits of user isolation."""
    print("\n🛡️  User Isolation Benefits")
    print("=" * 40)

    benefits = [
        "🔒 Complete data separation between users",
        "🏢 Multi-tenant applications support",
        "🔐 Privacy and security compliance",
        "📊 Per-user analytics and monitoring",
        "🧹 Individual user data cleanup",
        "⚡ Efficient shared database resources",
        "🔄 User-specific backup and restore",
        "📈 Scalable multi-user architectures",
    ]

    for benefit in benefits:
        print(f"  {benefit}")

    print("\n✨ Use Cases:")
    print("  • SaaS applications with multiple customers")
    print("  • Enterprise systems with department isolation")
    print("  • Development environments with user separation")
    print("  • AI agents serving different organizations")


def main():
    """Run all user isolation demos."""
    print("🎭 Syntha User Isolation Demo")
    print("=" * 50)
    print("This demo shows how Syntha isolates user data in both SQLite and PostgreSQL")
    print()

    # Run SQLite demo (always available)
    demo_sqlite_user_isolation()

    # Run PostgreSQL demo (if available)
    demo_postgresql_user_isolation()

    # Show benefits
    demo_user_isolation_benefits()

    print("\n🎯 Summary:")
    print("User isolation ensures that each user's context data is completely")
    print("separate, providing security, privacy, and multi-tenancy support.")
    print("This works seamlessly with both SQLite and PostgreSQL backends!")


if __name__ == "__main__":
    main()
