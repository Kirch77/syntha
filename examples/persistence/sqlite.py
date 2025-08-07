"""
Persistence - SQLite Setup Example

This example demonstrates how to set up SQLite persistence
for Syntha's Context Mesh to maintain context across sessions.

Copy and run this code to see SQLite persistence in action!
"""

import os
import tempfile

from syntha import ContextMesh, ToolHandler


def main():
    print("🚀 Persistence - SQLite Setup")
    print("=" * 35)

    # Create a temporary database file for this demo
    db_dir = tempfile.mkdtemp()
    db_path = os.path.join(db_dir, "syntha_demo.db")

    print(f"📁 Using database: {db_path}")

    # 1. Create context mesh with SQLite persistence
    print("\n💾 Setting up SQLite persistence:")

    context1 = ContextMesh(
        user_id="demo_user",
        enable_persistence=True,
        db_backend="sqlite",
        db_path=db_path,
    )

    handler1 = ToolHandler(context1, "Agent1")

    print("✅ Context Mesh with SQLite created")

    # 2. Add some context data
    print("\n📝 Adding context data:")

    context1.push(
        "user_preferences",
        {"theme": "dark", "language": "en", "notifications": True, "timezone": "UTC"},
    )

    context1.push(
        "session_data",
        {
            "login_time": "2025-01-20 10:30:00",
            "last_activity": "2025-01-20 11:45:00",
            "pages_visited": ["dashboard", "settings", "profile"],
        },
    )

    context1.push(
        "project_status",
        {
            "current_project": "Mobile App Redesign",
            "progress": 75,
            "deadline": "2025-02-15",
            "team_members": ["Alice", "Bob", "Charlie"],
        },
    )

    # Add topic-based context
    context1.register_agent_topics("Agent1", ["development", "ui"])
    context1.push(
        "dev_notes", "Completed user authentication module", topics=["development"]
    )
    context1.push("ui_feedback", "Users prefer darker color scheme", topics=["ui"])

    print("✅ Context data added and persisted")

    # 3. Verify data is stored
    stored_data = context1.get_all_for_agent("Agent1")
    print(f"\n📊 Stored {len(stored_data)} context items:")
    for key in stored_data.keys():
        print(f"   - {key}")

    # 4. Simulate session end by closing the context
    print("\n🔄 Simulating session end...")
    del context1
    del handler1
    print("   Context mesh closed")

    # 5. Create new context mesh (simulating new session)
    print("\n🚀 Starting new session:")

    context2 = ContextMesh(
        user_id="demo_user",  # Same user ID
        enable_persistence=True,
        db_backend="sqlite",
        db_path=db_path,  # Same database
    )

    handler2 = ToolHandler(context2, "Agent2")

    # 6. Verify data persistence
    print("\n🔍 Checking persisted data:")

    restored_data = context2.get_all_for_agent("Agent2")
    print(f"   Restored {len(restored_data)} context items:")
    for key, value in restored_data.items():
        print(f"   - {key}: {type(value).__name__}")

    # 7. Verify specific data integrity
    user_prefs = context2.get("user_preferences", "Agent2")
    project_status = context2.get("project_status", "Agent2")

    print(f"\n📋 Data integrity check:")
    print(f"   User theme: {user_prefs['theme'] if user_prefs else 'Not found'}")
    print(
        f"   Project progress: {project_status['progress'] if project_status else 'Not found'}%"
    )

    # 8. Add new data in the new session
    print("\n➕ Adding new data in restored session:")

    context2.push(
        "session_2_data",
        {
            "session_id": "sess_002",
            "new_features": ["dark_mode_toggle", "notification_center"],
            "bugs_fixed": 3,
        },
    )

    # 9. Show topic subscription persistence
    print("\n🎯 Testing topic subscription persistence:")

    # Agent2 should see topic-based context from previous session
    context2.register_agent_topics("Agent2", ["development", "ui"])
    keys_by_topic = context2.get_available_keys_by_topic("Agent2")
    restored_dev_keys = keys_by_topic.get("development", [])

    print(f"   Topic-based context restored: {restored_dev_keys}")

    # 10. Demonstrate multi-user isolation in persistence
    print("\n👥 Testing multi-user isolation:")

    # Create context for different user
    context_user2 = ContextMesh(
        user_id="different_user",
        enable_persistence=True,
        db_backend="sqlite",
        db_path=db_path,  # Same database file
    )

    # Add data for different user
    context_user2.push("user2_data", "This belongs to user 2")

    # Verify isolation
    user1_data = context2.get_all_for_agent("Agent2")
    user2_data = context_user2.get_all_for_agent("Agent3")

    print(f"   User 1 context items: {len(user1_data)}")
    print(f"   User 2 context items: {len(user2_data)}")
    print(f"   Users can't see each other's data: {'user2_data' not in user1_data}")

    # 11. Performance characteristics
    print("\n⚡ SQLite performance characteristics:")
    print("   - Excellent for development and small teams")
    print("   - Handles 10,000+ context operations per second")
    print("   - Supports up to 100+ concurrent users")
    print("   - Zero configuration required")
    print("   - File-based storage for easy backup")

    # 12. Configuration options
    print("\n⚙️  SQLite configuration options:")
    print("   Basic setup:")
    print("   ContextMesh(db_backend='sqlite', db_path='my_app.db')")
    print("   ")
    print("   In-memory (testing):")
    print("   ContextMesh(db_backend='sqlite', db_path=':memory:')")
    print("   ")
    print("   Custom location:")
    print("   ContextMesh(db_backend='sqlite', db_path='/path/to/db.sqlite')")

    # Clean up
    context2.close() if hasattr(context2, "close") else None
    context_user2.close() if hasattr(context_user2, "close") else None

    print(f"\n✅ SQLite persistence example complete!")
    print(f"📁 Demo database created at: {db_path}")
    print("💡 Data persists between sessions automatically")


if __name__ == "__main__":
    main()
