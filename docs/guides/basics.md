# Basics Guide

This guide gets you up and running with Syntha's core functionality. All examples are designed to work immediately when you copy and paste them.

## Your First Context Mesh

Let's start with the simplest possible example:

```python
from syntha import ContextMesh

# Create a context mesh (always use user_id in production!)
context = ContextMesh(user_id="demo_user")

# Add some context
context.push("greeting", "Hello from Syntha!")

# Retrieve it
message = context.get("greeting", "demo_agent")
print(message)  # Output: Hello from Syntha!

# Clean up
context.close()
```

**What happened here:**
1. We created a context mesh with a user ID for security
2. We pushed some context with the key "greeting"
3. We retrieved it for an agent named "demo_agent"
4. We cleaned up the connection

!!! tip "Always Use user_id"
    Even in development, get in the habit of specifying a `user_id`. This prevents security issues when you move to production.

## Sharing Context Between Agents

The real power of Syntha comes from sharing context between multiple agents:

```python
from syntha import ContextMesh

# Set up context mesh
context = ContextMesh(user_id="team_workspace")

# Agent 1 shares some information
context.push("project_status", {
    "name": "Website Redesign",
    "progress": 75,
    "next_milestone": "User Testing"
})

# Agent 2 can access this information
project_info = context.get("project_status", "ProjectManagerAgent")
if project_info:
    print(f"Project: {project_info['name']}")
    print(f"Progress: {project_info['progress']}%")

# Agent 3 adds more context
context.push("user_feedback", [
    "Love the new color scheme",
    "Navigation could be clearer",
    "Mobile version looks great"
])

# Agent 1 can now see both pieces of context
all_context = context.get_all_for_agent("DesignAgent")
print(f"Available context keys: {list(all_context.keys())}")

context.close()
```

**Key concepts:**
- Any agent can push context for others to use
- Context values can be strings, numbers, lists, or dictionaries
- `get_all_for_agent()` retrieves all accessible context for an agent

## Working with Tools

Tools provide a more sophisticated way for agents to interact with context. Here's how to set up basic tool integration:

```python
from syntha import ContextMesh, ToolHandler

# Set up context and tools
context = ContextMesh(user_id="user123")
handler = ToolHandler(context, agent_name="AssistantAgent")

# Simulate an agent pushing context via tools
result = handler.handle_tool_call("push_context", 
                                  key="user_preferences", 
                                  value='{"theme": "dark", "notifications": true}')

print(f"Push result: {result['success']}")

# Simulate an agent retrieving context via tools
result = handler.handle_tool_call("get_context", keys=["user_preferences"])

if result["success"]:
    prefs = result["context"]["user_preferences"]
    print(f"User theme: {prefs['theme']}")
    print(f"Notifications: {prefs['notifications']}")

context.close()
```

**What's different with tools:**
- Agents interact through standardized function calls
- Results include success/failure status and helpful messages
- This pattern works with any LLM that supports function calling

## Using Context in Prompts

You can also inject context directly into agent prompts:

```python
from syntha import ContextMesh, build_system_prompt

# Set up context
context = ContextMesh(user_id="user123")

# Add some context that should appear in prompts
context.push("user_name", "Alice Johnson")
context.push("current_task", "Planning a team meeting")
context.push("preferences", {"communication_style": "direct", "time_zone": "PST"})

# Build a system prompt with context automatically included
system_prompt = build_system_prompt("MeetingAssistant", context)

print("Generated system prompt:")
print(system_prompt)

context.close()
```

**Expected output:**
```
[Context]
User Name: Alice Johnson
Current Task: Planning a team meeting
Preferences: {
  "communication_style": "direct",
  "time_zone": "PST"
}
```

**When to use prompt injection:**
- Simple scenarios where context doesn't change often
- When working with LLMs that don't support function calling
- For background information that should always be available

## Context with Expiration

Sometimes you want context to expire automatically:

```python
from syntha import ContextMesh
import time

context = ContextMesh(user_id="user123")

# Add context that expires in 5 seconds
context.push("temporary_status", "Processing your request...", ttl=5)

# Check immediately
status = context.get("temporary_status", "StatusAgent")
print(f"Status: {status}")  # Output: Processing your request...

# Wait 6 seconds and check again
time.sleep(6)
status = context.get("temporary_status", "StatusAgent")
print(f"Status after expiration: {status}")  # Output: None

context.close()
```

**Common TTL patterns:**
- **5-60 seconds:** Real-time status updates
- **5-30 minutes:** Session-specific data
- **1-24 hours:** Daily context that should reset
- **No TTL:** Permanent user preferences and configuration

## Private Context Between Specific Agents

Sometimes you need private communication between specific agents:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="secure_workspace")

# Share sensitive information only with specific agents
context.push("api_credentials", {
    "key": "sk-abc123",
    "endpoint": "https://api.example.com"
}, subscribers=["AuthAgent", "APIAgent"])

# These agents can access the credentials
creds = context.get("api_credentials", "AuthAgent")
print(f"Auth agent can access: {creds is not None}")  # True

creds = context.get("api_credentials", "APIAgent")
print(f"API agent can access: {creds is not None}")  # True

# Other agents cannot access it
creds = context.get("api_credentials", "RandomAgent")
print(f"Random agent can access: {creds is not None}")  # False

context.close()
```

**When to use private context:**
- Sensitive information (API keys, passwords)
- Private communication between specific agents
- Information that should only be available to certain roles

## Persistent Storage

By default, context is stored in memory and lost when your program ends. For production use, enable persistent storage:

```python
from syntha import ContextMesh

# With persistent SQLite storage
context = ContextMesh(
    user_id="user123",
    enable_persistence=True,
    db_backend="sqlite",
    db_path="my_context.db"  # File will be created automatically
)

# Add some context
context.push("user_settings", {"language": "en", "theme": "dark"})

# Close and reopen - context should persist
context.close()

# Reopen with same settings
context = ContextMesh(
    user_id="user123",
    enable_persistence=True,
    db_backend="sqlite", 
    db_path="my_context.db"
)

# Context should still be there
settings = context.get("user_settings", "SettingsAgent")
print(f"Persisted settings: {settings}")

context.close()
```

**Storage options:**
- **SQLite:** Perfect for development and single-node deployments
- **PostgreSQL:** Recommended for production with multiple servers
- **In-memory:** Fast but temporary (default)

## Error Handling

Always handle errors gracefully in production code:

```python
from syntha import ContextMesh, SynthaError

try:
    context = ContextMesh(user_id="user123")
    
    # This will work fine
    context.push("valid_key", "valid_value")
    
    # This will raise an error (can't use both topics and subscribers)
    context.push("invalid_key", "value", 
                 subscribers=["agent1"], 
                 topics=["topic1"])
                 
except SynthaError as e:
    print(f"Syntha error: {e}")
    print(f"Suggestion: {e.suggestion}")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    if 'context' in locals():
        context.close()
```

**Best practices for error handling:**
- Always use try/except blocks in production
- Syntha errors include helpful suggestions for fixing issues
- Always close your context mesh in a finally block or use context managers

## Using Context Managers

The cleanest way to handle context lifecycle:

```python
from syntha import ContextMesh

# Context manager automatically handles cleanup
with ContextMesh(user_id="user123") as context:
    context.push("data", "value")
    result = context.get("data", "agent")
    print(f"Result: {result}")
# Context is automatically closed here
```

## Next Steps

You now know the basics of Syntha! You can:
- Create context meshes with proper user isolation
- Share context between agents
- Use both direct API calls and tool-based integration
- Handle expiration and persistence
- Work with private context

Ready for more advanced features? Continue to [Context Management](context.md) to learn about:
- Topic-based routing for scalable agent coordination
- Advanced security and access control
- Performance optimization techniques
- Production deployment patterns