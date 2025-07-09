# Agent Communication Tutorial

Learn how to enable agents to communicate directly with each other through Syntha's messaging system.

## Overview

Syntha's agent communication system allows agents to:
- Send direct messages to specific agents
- Broadcast messages to multiple agents
- Organize conversations with threading
- Filter messages by priority, type, and sender
- Track message delivery and read status

## Basic Agent Communication

### Sending Direct Messages

```python
from syntha import ContextMesh, ToolHandler

# Initialize the system
mesh = ContextMesh()
handler = ToolHandler(mesh)

# Agent A sends a message to Agent B
result = handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="AgentA",
    to_agent="AgentB", 
    message="Task completed successfully",
    message_type="result",
    priority="normal"
)

print(f"Message sent: {result}")
```

### Receiving Messages

```python
# Agent B checks for messages
messages = handler.handle_tool_call(
    "get_messages_from_agents",
    agent_name="AgentB",
    unread_only=True,
    mark_as_read=True
)

for message in messages["messages"]:
    print(f"From {message['from_agent']}: {message['message']}")
```

## Message Types and Priorities

### Message Types

Use appropriate message types to categorize communications:

```python
# Information sharing
handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="Monitor",
    to_agent="Logger",
    message="System CPU usage is at 85%",
    message_type="info",
    priority="normal"
)

# Task assignment
handler.handle_tool_call(
    "send_message_to_agent", 
    from_agent="Manager",
    to_agent="Worker",
    message="Please process the new batch of files",
    message_type="task",
    priority="high"
)

# Error reporting
handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="Worker",
    to_agent="Manager", 
    message="Failed to connect to database",
    message_type="error",
    priority="urgent"
)

# Questions
handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="Learner",
    to_agent="Expert",
    message="What's the best approach for handling large files?",
    message_type="question",
    priority="normal"
)
```

### Priority Levels

- **low**: Non-urgent information, background updates
- **normal**: Regular operational messages (default)
- **high**: Important tasks, significant events
- **urgent**: Critical errors, emergency situations

## Message Threading

### Creating Conversation Threads

```python
# Start a new conversation thread
thread_result = handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="ProjectManager",
    to_agent="Developer",
    message="Let's discuss the new feature requirements",
    message_type="task",
    priority="normal"
)

thread_id = thread_result["thread_id"]

# Continue the conversation
handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="Developer", 
    to_agent="ProjectManager",
    message="Sure, I need clarification on the user interface design",
    message_type="question",
    thread_id=thread_id
)
```

### Retrieving Threaded Messages

```python
# Get messages from a specific thread
thread_messages = handler.handle_tool_call(
    "get_messages_from_agents",
    agent_name="ProjectManager",
    thread_id=thread_id
)

print(f"Thread conversation:")
for msg in thread_messages["messages"]:
    print(f"{msg['from_agent']}: {msg['message']}")
```

## Broadcast Messaging

### Broadcasting to Multiple Agents

```python
# Send announcement to multiple agents
result = handler.handle_tool_call(
    "broadcast_message_to_agents",
    from_agent="SystemAdmin",
    to_agents=["Agent1", "Agent2", "Agent3", "Agent4"],
    message="Scheduled maintenance will begin at 2 AM",
    message_type="info",
    priority="high",
    create_thread=True  # Creates a shared thread for responses
)

broadcast_thread = result["thread_id"]
```

### Team Communication Example

```python
# Development team daily standup
def daily_standup(team_lead, team_members):
    # Send standup request
    result = handler.handle_tool_call(
        "broadcast_message_to_agents",
        from_agent=team_lead,
        to_agents=team_members,
        message="Daily standup: Please share your progress and blockers",
        message_type="task",
        priority="normal",
        create_thread=True
    )
    
    return result["thread_id"]

# Usage
standup_thread = daily_standup("TeamLead", ["Dev1", "Dev2", "QA1", "Designer1"])
```

## Advanced Message Filtering

### Complex Message Queries

```python
# Get high-priority unread tasks
urgent_tasks = handler.handle_tool_call(
    "get_messages_from_agents",
    agent_name="Worker",
    unread_only=True,
    priority="high",
    message_type="task",
    limit=10,
    mark_as_read=False  # Don't mark as read yet
)

# Get all messages from specific agent
manager_messages = handler.handle_tool_call(
    "get_messages_from_agents", 
    agent_name="Worker",
    from_agent="Manager",
    limit=50
)

# Get recent error reports
error_reports = handler.handle_tool_call(
    "get_messages_from_agents",
    agent_name="SystemAdmin",
    message_type="error",
    priority=["high", "urgent"],  # Multiple priorities
    limit=20
)
```

## Read Confirmations

### Requiring Message Confirmation

```python
# Send important message requiring confirmation
result = handler.handle_tool_call(
    "send_message_to_agent",
    from_agent="Supervisor",
    to_agent="CriticalWorker",
    message="Emergency shutdown procedure initiated",
    message_type="info",
    priority="urgent",
    requires_confirmation=True
)

message_id = result["message_id"]

# Check if message was read
status = handler.handle_tool_call(
    "check_message_status",
    message_id=message_id
)

if status["read"]:
    print(f"Message confirmed read at {status['read_timestamp']}")
```

## Practical Examples

### Customer Support System

```python
class CustomerSupportSystem:
    def __init__(self):
        self.mesh = ContextMesh()
        self.handler = ToolHandler(self.mesh)
    
    def route_customer_inquiry(self, inquiry, customer_id):
        # Determine appropriate agent based on inquiry type
        if "billing" in inquiry.lower():
            agent = "BillingAgent"
        elif "technical" in inquiry.lower():
            agent = "TechSupportAgent"
        else:
            agent = "GeneralSupportAgent"
        
        # Send inquiry to appropriate agent
        self.handler.handle_tool_call(
            "send_message_to_agent",
            from_agent="CustomerRouter",
            to_agent=agent,
            message=f"Customer {customer_id}: {inquiry}",
            message_type="task",
            priority="normal"
        )
    
    def escalate_to_supervisor(self, agent_name, customer_id, issue):
        # Escalate complex issues
        self.handler.handle_tool_call(
            "send_message_to_agent",
            from_agent=agent_name,
            to_agent="Supervisor",
            message=f"Need assistance with customer {customer_id}: {issue}",
            message_type="question",
            priority="high",
            requires_confirmation=True
        )
```

### Data Processing Pipeline

```python
class DataProcessingPipeline:
    def __init__(self):
        self.mesh = ContextMesh()
        self.handler = ToolHandler(self.mesh)
        self.pipeline_agents = ["Extractor", "Transformer", "Validator", "Loader"]
    
    def start_pipeline(self, data_source):
        # Notify all agents about new pipeline run
        self.handler.handle_tool_call(
            "broadcast_message_to_agents",
            from_agent="PipelineManager",
            to_agents=self.pipeline_agents,
            message=f"Starting pipeline for data source: {data_source}",
            message_type="info",
            priority="normal",
            create_thread=True
        )
    
    def pass_data_to_next_stage(self, from_stage, to_stage, data_info, thread_id):
        # Pass processed data between pipeline stages
        self.handler.handle_tool_call(
            "send_message_to_agent",
            from_agent=from_stage,
            to_agent=to_stage,
            message=f"Data ready for processing: {data_info}",
            message_type="task",
            priority="normal",
            thread_id=thread_id
        )
    
    def report_pipeline_error(self, agent_name, error_details, thread_id):
        # Report errors to pipeline manager
        self.handler.handle_tool_call(
            "send_message_to_agent",
            from_agent=agent_name,
            to_agent="PipelineManager",
            message=f"Pipeline error: {error_details}",
            message_type="error", 
            priority="high",
            thread_id=thread_id
        )
```

### Multi-Agent Research Team

```python
class ResearchTeam:
    def __init__(self):
        self.mesh = ContextMesh()
        self.handler = ToolHandler(self.mesh)
        self.researchers = ["DataResearcher", "ModelTrainer", "ResultsAnalyzer"]
    
    def start_research_project(self, project_description):
        # Initiate research project
        result = self.handler.handle_tool_call(
            "broadcast_message_to_agents",
            from_agent="ResearchLead",
            to_agents=self.researchers,
            message=f"New research project: {project_description}",
            message_type="task",
            priority="normal",
            create_thread=True
        )
        
        return result["thread_id"]
    
    def share_findings(self, researcher, findings, project_thread):
        # Share research findings with team
        self.handler.handle_tool_call(
            "broadcast_message_to_agents",
            from_agent=researcher,
            to_agents=[agent for agent in self.researchers if agent != researcher] + ["ResearchLead"],
            message=f"Research findings: {findings}",
            message_type="result",
            priority="normal",
            thread_id=project_thread
        )
    
    def request_collaboration(self, from_researcher, to_researcher, request, project_thread):
        # Request collaboration between researchers
        self.handler.handle_tool_call(
            "send_message_to_agent",
            from_agent=from_researcher,
            to_agent=to_researcher,
            message=f"Collaboration request: {request}",
            message_type="question",
            priority="normal",
            thread_id=project_thread
        )
```

## Best Practices

### 1. Message Organization

```python
# Use consistent naming conventions
AGENT_NAMES = {
    "data_processor": "DataProcessor",
    "file_handler": "FileHandler", 
    "error_logger": "ErrorLogger"
}

# Use descriptive message types
MESSAGE_TYPES = {
    "task_assignment": "task",
    "status_update": "info",
    "error_report": "error",
    "question": "question",
    "completion": "result"
}
```

### 2. Error Handling

```python
def safe_send_message(handler, from_agent, to_agent, message, **kwargs):
    """Safely send message with error handling"""
    try:
        result = handler.handle_tool_call(
            "send_message_to_agent",
            from_agent=from_agent,
            to_agent=to_agent,
            message=message,
            **kwargs
        )
        return result
    except Exception as e:
        print(f"Failed to send message from {from_agent} to {to_agent}: {e}")
        return None
```

### 3. Message Queue Management

```python
def process_message_queue(handler, agent_name, max_messages=10):
    """Process message queue with limits"""
    messages = handler.handle_tool_call(
        "get_messages_from_agents",
        agent_name=agent_name,
        unread_only=True,
        limit=max_messages,
        mark_as_read=True
    )
    
    processed = []
    for message in messages.get("messages", []):
        # Process each message
        result = process_single_message(message)
        processed.append(result)
    
    return processed
```

## Integration with LLMs

### OpenAI Integration

```python
import openai
from syntha import ContextMesh, ToolHandler, build_system_prompt

def create_communicating_agent(agent_name, context_mesh):
    handler = ToolHandler(context_mesh)
    
    # Build system prompt with communication capabilities
    system_prompt = build_system_prompt(agent_name, context_mesh)
    
    def chat_completion(user_message):
        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            tools=handler.get_schemas()
        )
        
        # Process tool calls for communication
        for tool_call in response.choices[0].message.tool_calls or []:
            result = handler.handle_tool_call(
                tool_call.function.name,
                **json.loads(tool_call.function.arguments)
            )
        
        return response.choices[0].message.content
    
    return chat_completion
```

## Troubleshooting

### Common Issues

1. **Messages not being received**
   - Check agent name spelling
   - Verify message isn't filtered out
   - Check if agent exists in system

2. **Thread messages out of order**
   - Use proper thread_id consistency
   - Check timestamp ordering
   - Verify thread creation

3. **Performance with many messages**
   - Use message limits
   - Filter by priority/type
   - Implement message archiving

### Debugging Tools

```python
def debug_agent_messages(handler, agent_name):
    """Debug message system for an agent"""
    
    # Get all messages (read and unread)
    all_messages = handler.handle_tool_call(
        "get_messages_from_agents",
        agent_name=agent_name,
        limit=100
    )
    
    print(f"Agent {agent_name} has {len(all_messages['messages'])} total messages")
    
    # Group by type
    by_type = {}
    for msg in all_messages["messages"]:
        msg_type = msg.get("message_type", "unknown")
        by_type[msg_type] = by_type.get(msg_type, 0) + 1
    
    print("Messages by type:", by_type)
    
    # Group by priority
    by_priority = {}
    for msg in all_messages["messages"]:
        priority = msg.get("priority", "unknown")
        by_priority[priority] = by_priority.get(priority, 0) + 1
    
    print("Messages by priority:", by_priority)
```

## Next Steps

- Learn about [Context Management](context-management.md) for sharing data between agents
- Explore [LLM Integration](llm-integration.md) for connecting with specific frameworks
- Check out [Examples](../examples/) for complete multi-agent systems

## See Also

- [ContextMesh API](../api/context-mesh.md) - Core context system
- [Tool Schemas](../api/tool-schemas.md) - Complete tool reference
- [Best Practices](../guides/best-practices.md) - Production deployment patterns
