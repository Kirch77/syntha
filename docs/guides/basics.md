# Basics: Your First Context Mesh

This tutorial gets you hands-on with Syntha's core functionality. Every example is tested and ready to run - just copy, paste, and go!

## Step 1: Your First Context Mesh

Let's start with the absolute basics:

```python
from syntha import ContextMesh

# Create a context mesh (always use user_id in production!)
context = ContextMesh(user_id="demo_user", enable_persistence=False)

# Add some context
context.push("greeting", "Hello from Syntha!")

# Retrieve it
message = context.get("greeting", "demo_agent")
print(message)  # Output: Hello from Syntha!

# Clean up
context.close()
```

**What just happened:**

1. We created a context mesh with a user ID for security
2. We pushed context with the key "greeting" 
3. We retrieved it for an agent named "demo_agent"
4. We cleaned up the connection

!!! tip "Always Use user_id"
    Even in development, always specify a `user_id`. This prevents security issues when you move to production.

## Step 2: Sharing Context Between Agents

The real power comes from sharing context between multiple agents:

```python
from syntha import ContextMesh

# Set up context mesh
context = ContextMesh(user_id="team_workspace", enable_persistence=False)

# Agent 1 shares project information
context.push("project_status", {
    "name": "Website Redesign",
    "progress": 75,
    "next_milestone": "User Testing",
    "deadline": "2024-03-15"
})

# Agent 2 can access this information
project_info = context.get("project_status", "ProjectManagerAgent")
if project_info:
    print(f"Project: {project_info['name']}")
    print(f"Progress: {project_info['progress']}%")
    print(f"Next: {project_info['next_milestone']}")

# Agent 3 adds user feedback
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

## Step 3: Topic-Based Context Routing

Instead of global context, let's route information to specific agent groups:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="company_workspace", enable_persistence=False)

# Step 1: Agents subscribe to topics they care about
context.register_agent_topics("SalesAgent", ["sales", "customers", "leads"])
context.register_agent_topics("SupportAgent", ["support", "customers", "issues"])
context.register_agent_topics("AnalyticsAgent", ["sales", "support", "analytics"])

# Step 2: Push context to specific topics
context.push("new_customer", {
    "name": "Acme Corp",
    "industry": "Technology", 
    "value": 50000,
    "contact": "john@acme.com"
}, topics=["customers"])

# Step 3: Only subscribed agents see the context
sales_context = context.get_all_for_agent("SalesAgent")
support_context = context.get_all_for_agent("SupportAgent") 
analytics_context = context.get_all_for_agent("AnalyticsAgent")

print(f"SalesAgent sees: {list(sales_context.keys())}")      # ['new_customer']
print(f"SupportAgent sees: {list(support_context.keys())}")  # ['new_customer'] 
print(f"AnalyticsAgent sees: {list(analytics_context.keys())}")  # [] (not subscribed to 'customers')

context.close()
```

**Why topic-based routing is powerful:**

- **Scalable**: Add new agents without changing existing code
- **Organized**: Clear separation by domain (sales, support, etc.)
- **Efficient**: Agents only get relevant information

## Step 4: Using Tools (The Agent-Friendly Way)

Tools provide a standardized way for agents to interact with context:

```python
from syntha import ContextMesh, ToolHandler

# Set up context and tools
context = ContextMesh(user_id="user123", enable_persistence=False)
handler = ToolHandler(context, agent_name="AssistantAgent")

# Step 1: Agent subscribes to topics
result = handler.handle_tool_call("subscribe_to_topics", topics=["preferences"])
print(f"Subscribe result: {result['success']}")

# Step 2: Agent pushes context via tools
result = handler.handle_tool_call("push_context", 
                                  key="user_preferences", 
                                  value='{"theme": "dark", "notifications": true}',
                                  topics=["preferences"])
print(f"Push result: {result['success']}")

# Step 3: Agent retrieves context via tools
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
- Perfect for building autonomous agent workflows

## Step 5: Context in Prompts (The Simple Way)

You can also inject context directly into agent prompts:

```python
from syntha import ContextMesh, build_system_prompt

# Set up context
context = ContextMesh(user_id="user123", enable_persistence=False)

# Add context that should appear in prompts
context.push("user_name", "Alice Johnson")
context.push("current_task", "Planning a team meeting")
context.push("preferences", {
    "communication_style": "direct", 
    "time_zone": "PST",
    "meeting_length": "30 minutes"
})

# Build a system prompt with context automatically included
system_prompt = build_system_prompt("MeetingAssistant", context)

print("Generated system prompt:")
print(system_prompt)

context.close()
```

**Expected output:**
```
You are MeetingAssistant, an AI assistant.

[Context]
User Name: Alice Johnson
Current Task: Planning a team meeting
Preferences: {
  "communication_style": "direct",
  "time_zone": "PST", 
  "meeting_length": "30 minutes"
}
```

**When to use prompt injection:**

- Simple scenarios where context doesn't change often
- When working with LLMs that don't support function calling
- For background information that should always be available

## Step 6: Private Context Between Specific Agents

Sometimes you need private communication between specific agents:

```python
from syntha import ContextMesh

context = ContextMesh(user_id="secure_workspace", enable_persistence=False)

# Share sensitive information only with specific agents
context.push("api_credentials", {
    "key": "sk-abc123",
    "endpoint": "https://api.example.com",
    "rate_limit": "1000/hour"
}, subscribers=["AuthAgent", "APIAgent"])

# These agents can access the credentials
auth_creds = context.get("api_credentials", "AuthAgent")
api_creds = context.get("api_credentials", "APIAgent")
random_creds = context.get("api_credentials", "RandomAgent")

print(f"AuthAgent can access: {auth_creds is not None}")    # True
print(f"APIAgent can access: {api_creds is not None}")      # True  
print(f"RandomAgent can access: {random_creds is not None}") # False

context.close()
```

**When to use private context:**

- Sensitive information (API keys, passwords)
- Private communication between specific agents
- Information that should only be available to certain roles

## Step 7: Context with Expiration

Sometimes you want context to expire automatically:

```python
from syntha import ContextMesh
import time

context = ContextMesh(user_id="user123", enable_persistence=False)

# Add context that expires in 2 seconds
context.push("temporary_status", "Processing your request...", ttl=2)

# Check immediately
status = context.get("temporary_status", "StatusAgent")
print(f"Status: {status}")  # Output: Processing your request...

# Wait 3 seconds and check again
time.sleep(3)
status = context.get("temporary_status", "StatusAgent")
print(f"Status after expiration: {status}")  # Output: None

context.close()
```

**Common TTL patterns:**

- **5-60 seconds**: Real-time status updates, temporary tokens
- **5-30 minutes**: Session-specific data, current tasks
- **1-24 hours**: Daily context that should reset
- **No TTL**: Permanent user preferences and configuration

## Step 8: Persistent Storage

By default, context is stored in memory and lost when your program ends. For production, enable persistence:

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
context.push("user_settings", {
    "language": "en", 
    "theme": "dark",
    "notifications": True
})

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

- **SQLite**: Perfect for development and single-node deployments
- **PostgreSQL**: Recommended for production with multiple servers
- **In-memory**: Fast but temporary (default)

## Step 9: Error Handling and Best Practices

Always handle errors gracefully in production code:

```python
from syntha import ContextMesh, SynthaError

try:
    context = ContextMesh(user_id="user123", enable_persistence=False)
    
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

**Best practices:**

- Always use try/except blocks in production
- Syntha errors include helpful suggestions for fixing issues
- Always close your context mesh in a finally block

## Step 10: Using Context Managers (The Clean Way)

The cleanest way to handle context lifecycle:

```python
from syntha import ContextMesh

# Context manager automatically handles cleanup
with ContextMesh(user_id="user123", enable_persistence=False) as context:
    context.push("data", "value")
    result = context.get("data", "agent")
    print(f"Result: {result}")
# Context is automatically closed here
```

## Complete Example: Putting It All Together

Here's a complete example that demonstrates multiple concepts:

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt

def main():
    # Create context mesh with user isolation
    with ContextMesh(user_id="demo_company", enable_persistence=False) as context:
        
        # Set up topic-based routing
        context.register_agent_topics("SalesAgent", ["sales", "customers"])
        context.register_agent_topics("SupportAgent", ["support", "customers"])
        context.register_agent_topics("MarketingAgent", ["marketing", "customers"])
        
        # Create tool handlers for different agents
        sales_handler = ToolHandler(context, "SalesAgent")
        support_handler = ToolHandler(context, "SupportAgent")
        
        # Sales agent shares a new lead
        sales_handler.handle_tool_call("push_context",
            key="new_lead",
            value='{"company": "TechCorp", "value": 75000, "status": "qualified"}',
            topics=["sales", "customers"]
        )
        
        # Support agent adds customer feedback
        support_handler.handle_tool_call("push_context",
            key="customer_feedback", 
            value="Customer loves the new dashboard but wants mobile app",
            topics=["customers"]
        )
        
        # Marketing agent uses prompt-based context
        marketing_context = context.get_all_for_agent("MarketingAgent")
        print("Marketing agent sees:")
        for key, value in marketing_context.items():
            print(f"  {key}: {value}")
        
        # Build system prompt for marketing agent
        marketing_prompt = build_system_prompt("MarketingAgent", context)
        print(f"\nMarketing agent system prompt:\n{marketing_prompt}")

if __name__ == "__main__":
    main()
```

## What You've Learned

Congratulations! You now know how to:

- ✅ Create context meshes with proper user isolation
- ✅ Share context between agents using both global and topic-based routing
- ✅ Use both direct API calls and tool-based integration
- ✅ Handle expiration and persistence
- ✅ Work with private context between specific agents
- ✅ Inject context into prompts automatically
- ✅ Handle errors gracefully

## Next Steps

Ready for more advanced features? Continue to [Context Management](context.md) to learn about:

- Advanced topic-based routing patterns
- Combining topic-based and subscription-based routing
- Performance optimization techniques
- Production deployment patterns
- Security best practices