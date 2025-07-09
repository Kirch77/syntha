# Troubleshooting Guide

This guide covers common issues you might encounter when using the Syntha SDK and provides practical solutions.

## Common Issues & Solutions

### Context Not Accessible

**Problem:** Agent can't access expected context

```python
# Error: Context key 'api_config' not found for agent 'Frontend'
result = mesh.get_all_for_agent("Frontend")
# Returns: {}
```

**Solutions:**

```python
# 1. Check if context exists globally
all_keys = mesh.list_keys()
print("Available keys:", all_keys)

# 2. Check subscribers list
context_item = mesh._data.get("api_config")
if context_item:
    print("Subscribers:", context_item.subscribers)

# 3. Add agent to subscribers
mesh.push("api_config", config_data, subscribers=["Frontend", "Backend"])

# 4. Make context global (no subscribers)
mesh.push("api_config", config_data)  # Accessible to all agents
```

### Messages Not Being Received

**Problem:** Agent doesn't receive expected messages

```python
messages = handler.handle_tool_call("get_messages_from_agents",
                                   agent_name="Backend")
# Returns: {"count": 0, "messages": []}
```

**Solutions:**

```python
# 1. Check exact agent name spelling
handler.handle_tool_call("send_message_to_agent",
    from_agent="Sender",
    to_agent="Backend",  # Ensure exact case match
    message="Test message"
)

# 2. Check message filters
messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="Backend",
    unread_only=False,     # Include read messages
    mark_as_read=False     # Don't mark as read
)

# 3. Check message expiration
messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="Backend",
    include_expired=True   # Include expired messages
)

# 4. List all agents with messages
all_agents = set()
for message in mesh._messages:
    all_agents.add(message.to_agent)
print("Agents with messages:", all_agents)
```

### Performance Issues

**Problem:** Slow context retrieval or high memory usage

**Solutions:**

```python
# 1. Enable indexing for faster lookups
mesh.enable_indexing = True

# 2. Enable auto-cleanup for memory management
mesh.auto_cleanup = True

# 3. Use batch operations instead of individual calls
handler.handle_tool_call("batch_context_operation",
    agent_name="Agent",
    operations=[
        {"type": "get", "key": "key1"},
        {"type": "get", "key": "key2"}
    ]
)

# 4. Clean up expired items manually
cleaned = mesh.cleanup_expired()
print(f"Cleaned up {cleaned} expired items")

# 5. Monitor system stats
stats = mesh.get_stats()
if stats['total_items'] > 1000:
    print("Consider enabling optimizations")
```

### Tool Call Errors

**Problem:** LLM tool calls fail or return errors

**Solutions:**

```python
# 1. Validate tool call format
available_tools = handler.get_schemas()
tool_names = [tool['name'] for tool in available_tools]
print("Available tools:", tool_names)

# 2. Check required parameters
schema = next(tool for tool in available_tools if tool['name'] == 'send_message_to_agent')
required = schema['parameters']['required']
print("Required parameters:", required)

# 3. Handle errors gracefully
def safe_tool_call(tool_name, **kwargs):
    try:
        result = handler.handle_tool_call(tool_name, **kwargs)
        if not result.get("success"):
            print(f"Tool error: {result.get('error')}")
            return None
        return result
    except Exception as e:
        print(f"Exception in tool call: {e}")
        return None

# 4. Debug tool call arguments
import json
def debug_tool_call(tool_name, **kwargs):
    print(f"Calling tool: {tool_name}")
    print(f"Arguments: {json.dumps(kwargs, indent=2)}")
    result = handler.handle_tool_call(tool_name, **kwargs)
    print(f"Result: {json.dumps(result, indent=2)}")
    return result
```

### Thread/Conversation Issues

**Problem:** Messages not appearing in expected threads

**Solutions:**

```python
# 1. Check thread ID consistency
thread_id = "bug_fix_auth_2025"  # Use consistent naming

# 2. List all active threads
messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="Agent",
    unread_only=False
)
threads = messages.get("threads", {})
print("Active threads:", list(threads.keys()))

# 3. Get all messages in specific thread
thread_messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="Agent",
    thread_id=thread_id,
    unread_only=False
)
print(f"Thread {thread_id} has {thread_messages['count']} messages")
```

## Debugging Commands

### Context Debugging

```python
import json

# List all context items
all_context = mesh.get_all()
print("All context:", json.dumps(all_context, indent=2))

# Check agent permissions
agent_context = mesh.get_all_for_agent("AgentName")
print(f"Agent context: {agent_context}")

# Check context expiration
stats = mesh.get_stats()
print(f"Stats: {stats}")

# Manual cleanup check
before_count = len(mesh._data)
cleaned = mesh.cleanup_expired()
after_count = len(mesh._data)
print(f"Cleaned {cleaned} items ({before_count} -> {after_count})")
```

### Message Debugging

```python
# Get all messages for debugging
all_messages = handler.handle_tool_call("get_messages_from_agents",
    agent_name="Agent",
    unread_only=False,
    mark_as_read=False,
    limit=100
)

print(f"Total messages: {all_messages['count']}")
print(f"Unread: {all_messages['unread_count']}")

# Check message structure
for msg in all_messages['messages'][:5]:  # First 5 messages
    print(f"From: {msg['from_agent']} -> To: {msg['to_agent']}")
    print(f"Type: {msg['message_type']}, Priority: {msg['priority']}")
    print(f"Thread: {msg.get('thread_id', 'none')}")
    print(f"Message: {msg['message'][:50]}...")
    print("---")
```

### Tool Schema Validation

```python
# Validate all tool schemas
schemas = handler.get_schemas()
for schema in schemas:
    print(f"Tool: {schema['name']}")
    required_params = schema['parameters'].get('required', [])
    print(f"Required parameters: {required_params}")

    # Check for common parameter patterns
    properties = schema['parameters'].get('properties', {})
    for param_name, param_info in properties.items():
        if param_info.get('type') == 'string' and 'enum' in param_info:
            print(f"  {param_name}: {param_info['enum']}")
    print("---")
```

## Environment Issues

### Import Errors

**Problem:** Cannot import Syntha modules

```python
# ModuleNotFoundError: No module named 'syntha'
from syntha import ContextMesh
```

**Solutions:**

```bash
# 1. Check if installed
pip list | grep syntha

# 2. Install from source (development)
pip install -e .

# 3. Install from PyPI (when available)
pip install syntha-sdk

# 4. Check Python path
python -c "import sys; print('\n'.join(sys.path))"
```

### Version Compatibility

**Problem:** Unexpected behavior after updates

**Solutions:**

```python
# 1. Check version
import syntha
print(f"Syntha version: {syntha.__version__}")

# 2. Check for breaking changes
# Review changelog or migration guide

# 3. Pin to specific version
# In requirements.txt: syntha-sdk==1.0.0
```

### Memory Leaks

**Problem:** Memory usage grows over time

**Solutions:**

```python
# 1. Enable auto-cleanup
mesh = ContextMesh(auto_cleanup=True)

# 2. Set TTL for context items
mesh.push("temp_data", data, ttl=3600)  # 1 hour

# 3. Manual cleanup periodically
import threading
import time

def cleanup_worker():
    while True:
        time.sleep(300)  # 5 minutes
        cleaned = mesh.cleanup_expired()
        if cleaned > 0:
            print(f"Cleaned up {cleaned} expired items")

# Start cleanup thread
cleanup_thread = threading.Thread(target=cleanup_worker, daemon=True)
cleanup_thread.start()
```

## Integration Issues

### OpenAI Integration

**Problem:** Tool calls not working with OpenAI

**Solutions:**

```python
# 1. Check tool schema format
tools = handler.get_schemas()
print("Tool count:", len(tools))

# 2. Verify OpenAI client setup
import openai
client = openai.OpenAI(api_key="your-key")

# 3. Check response format
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}],
    tools=tools
)

# 4. Handle tool calls properly
if response.choices[0].message.tool_calls:
    for tool_call in response.choices[0].message.tool_calls:
        result = handler.handle_tool_call(
            tool_call.function.name,
            **json.loads(tool_call.function.arguments)
        )
        print(f"Tool result: {result}")
```

### Custom LLM Integration

**Problem:** Adapting to non-OpenAI LLM formats

**Solutions:**

```python
# 1. Transform schemas for your LLM format
def transform_schemas_for_custom_llm(schemas):
    # Adapt schema format as needed
    transformed = []
    for schema in schemas:
        # Custom transformation logic
        custom_schema = {
            "function_name": schema["name"],
            "description": schema["description"],
            "parameters": schema["parameters"]
        }
        transformed.append(custom_schema)
    return transformed

# 2. Create adapter function
def handle_custom_tool_call(llm_response):
    # Parse your LLM's tool call format
    function_name = llm_response.get("function_name")
    arguments = llm_response.get("arguments", {})

    # Call Syntha handler
    return handler.handle_tool_call(function_name, **arguments)
```

## Getting Help

If you're still experiencing issues:

1. **Check the API Reference** - Review the detailed [API documentation](../api/)
2. **Search Issues** - Look for similar problems in the project issues
3. **Enable Debug Logging** - Use Python's logging module for detailed output
4. **Create Minimal Example** - Reproduce the issue with minimal code
5. **Check System Requirements** - Ensure your environment meets all requirements

### Debug Logging

```python
import logging

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('syntha')

# Add to your code for detailed output
logger.debug("Context operation started")
result = mesh.push("key", "value")
logger.debug(f"Context operation result: {result}")
```

### Minimal Reproduction

```python
# Create the smallest possible code that reproduces your issue
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh()
handler = ToolHandler(mesh)

# Your minimal problematic code here
# This helps isolate the issue
```

---

**Need more help?** Check the [Best Practices Guide](best-practices.md) for recommended patterns, or explore the [Examples](../examples/) for working code samples.
