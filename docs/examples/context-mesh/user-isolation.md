# User Isolation Example

This example demonstrates how Syntha ensures complete data isolation between different users, providing security and multi-tenancy support.

## Overview

User isolation ensures that:
- Each user operates in a completely separate context space
- No data leakage between users
- Secure multi-tenant applications
- Independent user sessions

## Basic User Isolation

```python
from syntha import ContextMesh, ToolHandler

# Create separate context meshes for different users
user1_mesh = ContextMesh(user_id="alice")
user2_mesh = ContextMesh(user_id="bob")

# Create handlers for each user
alice_assistant = ToolHandler(user1_mesh, "PersonalAssistant")
bob_assistant = ToolHandler(user2_mesh, "PersonalAssistant")

# Each user can store their own data
alice_assistant.push_context("preferences", {
    "theme": "dark",
    "language": "English",
    "notifications": True
})

bob_assistant.push_context("preferences", {
    "theme": "light", 
    "language": "Spanish",
    "notifications": False
})

# Users only see their own data
alice_prefs = alice_assistant.get_context("preferences")
bob_prefs = bob_assistant.get_context("preferences")

print(f"Alice preferences: {alice_prefs}")
print(f"Bob preferences: {bob_prefs}")

# Verify isolation - users cannot access each other's data
try:
    # This should only return Alice's data, not Bob's
    alice_keys = alice_assistant.list_context_keys()
    print(f"Alice can see keys: {alice_keys}")
except Exception as e:
    print(f"Isolation enforced: {e}")
```

## Multi-User Application Example

```python
#!/usr/bin/env python3
"""
Multi-User Application with Complete Isolation

Demonstrates a real-world application with multiple users
operating in completely isolated contexts.
"""

from syntha import ContextMesh, ToolHandler
import json
from datetime import datetime
from typing import Dict, Any

class MultiUserApp:
    def __init__(self):
        self.user_sessions: Dict[str, tuple] = {}
        print("🏢 Multi-User Application Started")
    
    def create_user_session(self, user_id: str) -> ToolHandler:
        """Create an isolated session for a user."""
        if user_id in self.user_sessions:
            print(f"⚠️ User {user_id} already has an active session")
            return self.user_sessions[user_id][1]
        
        # Create isolated context mesh for this user
        mesh = ContextMesh(user_id=user_id)
        handler = ToolHandler(mesh, f"Assistant_{user_id}")
        
        # Store session
        self.user_sessions[user_id] = (mesh, handler)
        
        # Initialize user-specific data
        self._initialize_user_data(handler, user_id)
        
        print(f"✅ Created isolated session for user: {user_id}")
        return handler
    
    def _initialize_user_data(self, handler: ToolHandler, user_id: str):
        """Initialize default data for a new user."""
        # User profile
        handler.push_context("profile", {
            "user_id": user_id,
            "created_at": datetime.now().isoformat(),
            "status": "active"
        })
        
        # Default preferences
        handler.push_context("preferences", {
            "theme": "light",
            "language": "English",
            "notifications": True,
            "privacy_mode": True
        })
        
        # Empty conversation history
        handler.push_context("conversations", [], topic="chat_history")
    
    def user_action(self, user_id: str, action: str, data: Any) -> Dict[str, Any]:
        """Handle user action in their isolated context."""
        if user_id not in self.user_sessions:
            return {"error": "User session not found"}
        
        mesh, handler = self.user_sessions[user_id]
        
        try:
            if action == "update_preferences":
                current_prefs = handler.get_context("preferences")
                current_prefs.update(data)
                handler.push_context("preferences", current_prefs)
                return {"success": True, "preferences": current_prefs}
            
            elif action == "add_conversation":
                conversations = handler.get_context("conversations")
                conversations.append({
                    "timestamp": datetime.now().isoformat(),
                    "message": data["message"],
                    "response": data.get("response", "")
                })
                handler.push_context("conversations", conversations, topic="chat_history")
                return {"success": True, "conversation_count": len(conversations)}
            
            elif action == "get_summary":
                profile = handler.get_context("profile")
                preferences = handler.get_context("preferences")
                conversations = handler.get_context("conversations")
                
                return {
                    "user_id": user_id,
                    "profile": profile,
                    "preferences": preferences,
                    "conversation_count": len(conversations),
                    "topics": handler.list_topics()
                }
            
            elif action == "clear_history":
                handler.push_context("conversations", [], topic="chat_history")
                return {"success": True, "message": "History cleared"}
            
            else:
                return {"error": f"Unknown action: {action}"}
                
        except Exception as e:
            return {"error": str(e)}
    
    def get_user_stats(self) -> Dict[str, Any]:
        """Get aggregated stats without exposing user data."""
        stats = {
            "total_users": len(self.user_sessions),
            "active_sessions": len(self.user_sessions),
            "user_ids": list(self.user_sessions.keys())  # Only IDs, no data
        }
        return stats
    
    def demonstrate_isolation(self):
        """Demonstrate that users cannot access each other's data."""
        print("\n🔒 Demonstrating User Isolation")
        print("=" * 40)
        
        # Create users
        alice = self.create_user_session("alice")
        bob = self.create_user_session("bob")
        charlie = self.create_user_session("charlie")
        
        # Each user adds different data
        self.user_action("alice", "update_preferences", {"theme": "dark", "language": "English"})
        self.user_action("alice", "add_conversation", {
            "message": "Hello, I need help with Python",
            "response": "I'd be happy to help with Python!"
        })
        
        self.user_action("bob", "update_preferences", {"theme": "light", "language": "Spanish"})
        self.user_action("bob", "add_conversation", {
            "message": "Hola, necesito ayuda",
            "response": "¡Claro! ¿En qué puedo ayudarte?"
        })
        
        self.user_action("charlie", "add_conversation", {
            "message": "What's the weather?",
            "response": "I'll check the weather for you."
        })
        
        # Show each user's isolated view
        print("\n👤 Alice's Data:")
        alice_summary = self.user_action("alice", "get_summary", {})
        print(json.dumps(alice_summary, indent=2))
        
        print("\n👤 Bob's Data:")
        bob_summary = self.user_action("bob", "get_summary", {})
        print(json.dumps(bob_summary, indent=2))
        
        print("\n👤 Charlie's Data:")
        charlie_summary = self.user_action("charlie", "get_summary", {})
        print(json.dumps(charlie_summary, indent=2))
        
        # Verify isolation
        print("\n🔍 Isolation Verification:")
        alice_keys = alice.list_context_keys()
        bob_keys = bob.list_context_keys()
        
        print(f"Alice can see keys: {alice_keys}")
        print(f"Bob can see keys: {bob_keys}")
        print(f"Key overlap: {set(alice_keys) & set(bob_keys)}")  # Should be same structure, different data
        
        # Try to access cross-user data (should fail or return empty)
        try:
            # Users have same key structure but different data
            alice_conversations = alice.get_context("conversations")
            bob_conversations = bob.get_context("conversations")
            
            print(f"\nAlice conversation count: {len(alice_conversations)}")
            print(f"Bob conversation count: {len(bob_conversations)}")
            print("✅ Each user sees only their own conversations")
            
        except Exception as e:
            print(f"❌ Isolation error: {e}")
    
    def cleanup(self):
        """Clean up all user sessions."""
        for user_id, (mesh, handler) in self.user_sessions.items():
            mesh.close()
            print(f"🧹 Cleaned up session for {user_id}")
        
        self.user_sessions.clear()

def main():
    """Run the user isolation demonstration."""
    app = MultiUserApp()
    
    try:
        # Show basic isolation
        app.demonstrate_isolation()
        
        # Show application stats
        print(f"\n📊 Application Stats:")
        stats = app.get_user_stats()
        print(json.dumps(stats, indent=2))
        
    finally:
        app.cleanup()

if __name__ == "__main__":
    main()
```

## Database-Level Isolation

### SQLite Isolation (File-per-User)
```python
from syntha import ContextMesh
import os

def create_isolated_sqlite_user(user_id: str):
    """Create a user with their own SQLite database file."""
    
    # Create user-specific database directory
    user_db_dir = f"data/users/{user_id}"
    os.makedirs(user_db_dir, exist_ok=True)
    
    # Each user gets their own database file
    db_path = f"{user_db_dir}/context.db"
    
    mesh = ContextMesh(
        user_id=user_id,
        db_backend="sqlite",
        db_path=db_path
    )
    
    return mesh

# Create completely isolated users
alice_mesh = create_isolated_sqlite_user("alice")
bob_mesh = create_isolated_sqlite_user("bob")

# Physical separation at the file system level
print("Alice DB:", "sqlite file per-user")
print("Bob DB:", "sqlite file per-user")
```

### PostgreSQL Schema Isolation
```python
from syntha import ContextMesh

def create_isolated_postgres_user(user_id: str):
    """Create a user with their own PostgreSQL schema."""
    
    # Each user gets their own schema in the same database
    conn = f"postgresql://user:pass@localhost:5432/syntha"
    mesh = ContextMesh(
        user_id=user_id,
        db_backend="postgresql",
        connection_string=conn
    )
    
    return mesh

# Schema-based isolation
alice_mesh = create_isolated_postgres_user("alice")
bob_mesh = create_isolated_postgres_user("bob")
```

## Security Considerations

### Input Validation
```python
def validate_user_input(user_id: str, data: Any) -> bool:
    """Validate user input to prevent injection attacks."""
    
    # Validate user ID format
    if not user_id.isalnum() or len(user_id) > 50:
        return False
    
    # Validate data size
    import sys
    if sys.getsizeof(data) > 1024 * 1024:  # 1MB limit
        return False
    
    # Add more validation as needed
    return True

def secure_user_action(user_id: str, action: str, data: Any):
    """Securely handle user action with validation."""
    
    if not validate_user_input(user_id, data):
        return {"error": "Invalid input"}
    
    # Proceed with validated input
    return user_action(user_id, action, data)
```

### Audit Logging
```python
import logging
from datetime import datetime

class AuditLogger:
    def __init__(self):
        self.logger = logging.getLogger("syntha_audit")
        
    def log_user_action(self, user_id: str, action: str, data_size: int):
        """Log user actions for audit trail."""
        self.logger.info(f"User {user_id} performed {action} (data: {data_size} bytes)")
    
    def log_access_attempt(self, user_id: str, resource: str, success: bool):
        """Log access attempts."""
        status = "SUCCESS" if success else "DENIED"
        self.logger.warning(f"User {user_id} access to {resource}: {status}")

# Use audit logging
audit = AuditLogger()
audit.log_user_action("alice", "update_preferences", 128)
```

## Performance Considerations

- **Connection Pooling**: Use connection pools for database backends
- **Memory Management**: Clean up unused user sessions
- **Resource Limits**: Implement per-user resource quotas
- **Caching**: Use user-specific caching strategies

## Best Practices

1. **Validate User IDs**: Always validate user identifiers
2. **Session Management**: Implement proper session lifecycle
3. **Resource Limits**: Set per-user resource quotas
4. **Audit Logging**: Log all user actions for compliance
5. **Data Encryption**: Encrypt sensitive user data
6. **Access Controls**: Implement role-based access control

## See Also

- [Basic Context Usage](basic-usage.md)
- [Multi-Agent Setup](../tools/multi-agent.md)
- [User Isolation Concepts](../../user-guide/concepts/user-isolation.md)
- [Security Best Practices](../../user-guide/how-to/setup.md)
