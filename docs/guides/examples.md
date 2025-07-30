# Real-World Examples: Complete Integrations

This guide provides complete, production-ready examples you can use immediately. Each example includes full working code, error handling, and best practices for real applications.

## OpenAI Integration: Complete Working Example

Here's a complete example showing how to integrate Syntha with OpenAI, including actual API calls and proper context management.

### Basic OpenAI Integration

```python
import openai
import json
import os
from syntha import ContextMesh, ToolHandler, build_system_prompt

class SynthaOpenAIAgent:
    """Complete OpenAI integration with Syntha context management"""
    
    def __init__(self, user_id: str, agent_name: str, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
        self.context = ContextMesh(
            user_id=user_id,
            enable_persistence=True,
            db_backend="sqlite",
            db_path=f"context_{user_id}.db"
        )
        self.handler = ToolHandler(self.context, agent_name)
        self.agent_name = agent_name
        
        # Subscribe to relevant topics
        self.handler.handle_tool_call("subscribe_to_topics", 
                                      topics=["conversations", "user_data"])
    
    def chat(self, user_message: str, use_context: bool = True) -> str:
        """Chat with OpenAI using Syntha context"""
        
        # Build messages with context
        messages = []
        
        if use_context:
            # Add system prompt with context
            system_prompt = build_system_prompt(self.agent_name, self.context)
            messages.append({"role": "system", "content": system_prompt})
        else:
            messages.append({"role": "system", "content": f"You are {self.agent_name}, a helpful assistant."})
        
        # Add user message
        messages.append({"role": "user", "content": user_message})
        
        # Get available tools
        tools = [{"type": "function", "function": schema} 
                 for schema in self.handler.get_schemas()]
        
        try:
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=messages,
                tools=tools,
                tool_choice="auto"
            )
            
            message = response.choices[0].message
            
            # Handle tool calls if any
            if message.tool_calls:
                # Add assistant message with tool calls
                messages.append({
                    "role": "assistant",
                    "content": message.content,
                    "tool_calls": [tc.model_dump() for tc in message.tool_calls]
                })
                
                # Process each tool call
                for tool_call in message.tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)
                    
                    # Execute the tool call
                    result = self.handler.handle_tool_call(function_name, **function_args)
                    
                    # Add tool result to messages
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(result)
                    })
                
                # Get final response after tool calls
                final_response = self.client.chat.completions.create(
                    model="gpt-4",
                    messages=messages
                )
                
                final_message = final_response.choices[0].message.content
            else:
                final_message = message.content
            
            # Store conversation in context
            self.handler.handle_tool_call("push_context",
                key=f"conversation_{int(time.time())}",
                value=json.dumps({
                    "user_message": user_message,
                    "assistant_response": final_message,
                    "timestamp": time.time()
                }),
                topics=["conversations"],
                ttl_hours=24
            )
            
            return final_message
            
        except Exception as e:
            return f"Error: {str(e)}"
    
    def add_user_context(self, key: str, value: any, ttl_hours: float = None):
        """Add context about the user"""
        self.handler.handle_tool_call("push_context",
            key=key,
            value=json.dumps(value) if not isinstance(value, str) else value,
            topics=["user_data"],
            ttl_hours=ttl_hours
        )
    
    def close(self):
        """Clean up resources"""
        self.context.close()

# Example usage
def openai_example():
    """Complete OpenAI integration example"""
    
    # Get API key from environment (never hardcode!)
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Please set OPENAI_API_KEY environment variable")
        return
    
    print("=== OpenAI + Syntha Integration ===")
    
    # Create agent
    agent = SynthaOpenAIAgent(
        user_id="demo_user",
        agent_name="PersonalAssistant",
        api_key=api_key
    )
    
    # Add some user context
    agent.add_user_context("user_profile", {
        "name": "John Doe",
        "role": "Software Engineer",
        "interests": ["AI", "Python", "productivity"]
    })
    
    agent.add_user_context("current_projects", [
        "Building a chatbot",
        "Learning about multi-agent systems",
        "Optimizing database queries"
    ])
    
    # Have a conversation
    response1 = agent.chat("What are my current projects?")
    print(f"Assistant: {response1}")
    
    response2 = agent.chat("Can you help me prioritize them based on my interests?")
    print(f"Assistant: {response2}")
    
    # Add more context during conversation
    agent.add_user_context("meeting_tomorrow", {
        "title": "Project Review",
        "time": "10:00 AM",
        "attendees": ["Alice", "Bob", "Charlie"]
    }, ttl_hours=24)
    
    response3 = agent.chat("What do I have scheduled for tomorrow?")
    print(f"Assistant: {response3}")
    
    # Clean up
    agent.close()

# Run the example (uncomment if you have an API key)
# openai_example()
```

### Multi-Agent OpenAI System

```python
import openai
import json
import os
import time
from syntha import ContextMesh, ToolHandler, create_role_based_handler

class MultiAgentOpenAISystem:
    """Multi-agent system with OpenAI integration"""
    
    def __init__(self, user_id: str, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
        self.context = ContextMesh(
            user_id=user_id,
            enable_persistence=True,
            db_backend="sqlite",
            db_path=f"multi_agent_{user_id}.db"
        )
        self.agents = {}
        
        # Create specialized agents
        self._setup_agents()
    
    def _setup_agents(self):
        """Set up different types of agents"""
        
        # Research agent - can read and write research data
        research_handler = create_role_based_handler(
            self.context, "ResearchAgent", "contributor"
        )
        research_handler.handle_tool_call("subscribe_to_topics", 
                                          topics=["research", "data", "analysis"])
        
        # Writing agent - focuses on content creation
        writing_handler = create_role_based_handler(
            self.context, "WritingAgent", "contributor"
        )
        writing_handler.handle_tool_call("subscribe_to_topics",
                                         topics=["writing", "content", "research"])
        
        # Review agent - can see everything but focused on quality
        review_handler = create_role_based_handler(
            self.context, "ReviewAgent", "contributor"
        )
        review_handler.handle_tool_call("subscribe_to_topics",
                                        topics=["writing", "content", "review"])
        
        self.agents = {
            "researcher": {
                "handler": research_handler,
                "system_prompt": "You are a research specialist. Your job is to gather and analyze information, then share your findings with the team using context tools."
            },
            "writer": {
                "handler": writing_handler,
                "system_prompt": "You are a content writer. You create high-quality content based on research data and share drafts for review."
            },
            "reviewer": {
                "handler": review_handler,
                "system_prompt": "You are a content reviewer. You review drafts and provide feedback to improve quality."
            }
        }
    
    def agent_chat(self, agent_name: str, message: str) -> str:
        """Have an agent process a message"""
        
        if agent_name not in self.agents:
            return f"Unknown agent: {agent_name}"
        
        agent = self.agents[agent_name]
        handler = agent["handler"]
        
        # Build messages with system prompt and context
        messages = [
            {"role": "system", "content": agent["system_prompt"]},
            {"role": "user", "content": message}
        ]
        
        # Get tools for this agent
        tools = [{"type": "function", "function": schema} 
                 for schema in handler.get_schemas()]
        
        try:
            # Call OpenAI
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=messages,
                tools=tools,
                tool_choice="auto"
            )
            
            message_obj = response.choices[0].message
            
            # Handle tool calls
            if message_obj.tool_calls:
                # Process tool calls
                for tool_call in message_obj.tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)
                    
                    # Execute tool call
                    result = handler.handle_tool_call(function_name, **function_args)
                    print(f"  {agent_name} used {function_name}: {result.get('message', 'OK')}")
            
            return message_obj.content or "Task completed using tools."
            
        except Exception as e:
            return f"Error: {str(e)}"
    
    def collaborative_workflow(self, topic: str):
        """Demonstrate collaborative workflow"""
        
        print(f"\n=== Collaborative Workflow: {topic} ===")
        
        # Step 1: Researcher gathers information
        research_response = self.agent_chat("researcher", 
            f"Research the topic '{topic}' and share your findings with the team using context tools."
        )
        print(f"Researcher: {research_response}")
        
        # Step 2: Writer creates content based on research
        writing_response = self.agent_chat("writer",
            f"Based on the research data available in context, write a brief article about '{topic}'. Share your draft for review."
        )
        print(f"Writer: {writing_response}")
        
        # Step 3: Reviewer provides feedback
        review_response = self.agent_chat("reviewer",
            f"Review the draft article about '{topic}' and provide feedback for improvement."
        )
        print(f"Reviewer: {review_response}")
        
        # Show final context state
        print(f"\nFinal Context State:")
        for agent_name, agent in self.agents.items():
            result = agent["handler"].handle_tool_call("list_context")
            print(f"  {agent_name} has access to: {result['keys']}")
    
    def close(self):
        """Clean up resources"""
        self.context.close()

# Example usage
def multi_agent_example():
    """Multi-agent OpenAI system example"""
    
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Please set OPENAI_API_KEY environment variable")
        return
    
    system = MultiAgentOpenAISystem("multi_user", api_key)
    
    # Run collaborative workflow
    system.collaborative_workflow("Artificial Intelligence in Healthcare")
    
    system.close()

# Run the example (uncomment if you have an API key)
# multi_agent_example()
```

## Production Multi-User Application

Here's a complete example of a production-ready multi-user application with proper isolation and error handling.

```python
from syntha import ContextMesh, ToolHandler, create_role_based_handler, SynthaError
from typing import Dict, Optional, List
import threading
import logging
import time
import json

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class UserSession:
    """Represents a user session with context and agents"""
    
    def __init__(self, user_id: str, session_id: str, db_config: dict):
        self.user_id = user_id
        self.session_id = session_id
        self.created_at = time.time()
        self.last_activity = time.time()
        
        # Create user-isolated context
        self.context = ContextMesh(
            user_id=user_id,
            enable_persistence=True,
            **db_config
        )
        
        # Create user's agents
        self.agents = self._setup_user_agents()
        
        logger.info(f"Created session {session_id} for user {user_id}")
    
    def _setup_user_agents(self) -> Dict[str, ToolHandler]:
        """Set up agents for this user"""
        
        agents = {}
        
        # Personal assistant with full access
        agents["assistant"] = create_role_based_handler(
            self.context, "PersonalAssistant", "contributor"
        )
        agents["assistant"].handle_tool_call("subscribe_to_topics",
                                             topics=["personal", "tasks", "notes"])
        
        # Task manager with focused access
        agents["task_manager"] = create_role_based_handler(
            self.context, "TaskManager", "contributor"
        )
        agents["task_manager"].handle_tool_call("subscribe_to_topics",
                                                topics=["tasks", "projects"])
        
        # Note taker with limited access
        agents["note_taker"] = create_role_based_handler(
            self.context, "NoteTaker", "contributor"
        )
        agents["note_taker"].handle_tool_call("subscribe_to_topics",
                                              topics=["notes", "ideas"])
        
        return agents
    
    def update_activity(self):
        """Update last activity timestamp"""
        self.last_activity = time.time()
    
    def is_expired(self, timeout: int = 3600) -> bool:
        """Check if session has expired"""
        return time.time() - self.last_activity > timeout
    
    def add_user_data(self, key: str, value: any, ttl_hours: Optional[float] = None):
        """Add data to user's context"""
        try:
            self.agents["assistant"].handle_tool_call("push_context",
                key=key,
                value=json.dumps(value) if not isinstance(value, str) else value,
                topics=["personal"],
                ttl_hours=ttl_hours
            )
            self.update_activity()
            return True
        except Exception as e:
            logger.error(f"Error adding user data for {self.user_id}: {e}")
            return False
    
    def agent_action(self, agent_name: str, action: str, **kwargs) -> dict:
        """Execute an agent action"""
        if agent_name not in self.agents:
            return {"success": False, "error": f"Unknown agent: {agent_name}"}
        
        try:
            result = self.agents[agent_name].handle_tool_call(action, **kwargs)
            self.update_activity()
            return result
        except Exception as e:
            logger.error(f"Agent action error for {self.user_id}/{agent_name}: {e}")
            return {"success": False, "error": str(e)}
    
    def get_user_context(self, agent_name: str = "assistant") -> dict:
        """Get user's accessible context"""
        if agent_name not in self.agents:
            return {}
        
        try:
            result = self.agents[agent_name].handle_tool_call("get_context")
            self.update_activity()
            return result.get("context", {})
        except Exception as e:
            logger.error(f"Error getting context for {self.user_id}: {e}")
            return {}
    
    def close(self):
        """Clean up session resources"""
        try:
            self.context.close()
            logger.info(f"Closed session {self.session_id} for user {self.user_id}")
        except Exception as e:
            logger.error(f"Error closing session {self.session_id}: {e}")

class MultiUserApplication:
    """Production multi-user application with Syntha"""
    
    def __init__(self, db_config: dict):
        self.db_config = db_config
        self.sessions: Dict[str, UserSession] = {}
        self.user_sessions: Dict[str, List[str]] = {}  # user_id -> [session_ids]
        self.lock = threading.Lock()
        
        # Start cleanup thread
        self.cleanup_thread = threading.Thread(target=self._cleanup_loop, daemon=True)
        self.cleanup_thread.start()
        
        logger.info("Multi-user application started")
    
    def create_session(self, user_id: str) -> str:
        """Create a new session for a user"""
        session_id = f"sess_{user_id}_{int(time.time())}"
        
        with self.lock:
            try:
                session = UserSession(user_id, session_id, self.db_config)
                self.sessions[session_id] = session
                
                if user_id not in self.user_sessions:
                    self.user_sessions[user_id] = []
                self.user_sessions[user_id].append(session_id)
                
                return session_id
            except Exception as e:
                logger.error(f"Error creating session for {user_id}: {e}")
                raise
    
    def get_session(self, session_id: str) -> Optional[UserSession]:
        """Get a session by ID"""
        with self.lock:
            return self.sessions.get(session_id)
    
    def close_session(self, session_id: str) -> bool:
        """Close a specific session"""
        with self.lock:
            session = self.sessions.get(session_id)
            if not session:
                return False
            
            try:
                # Remove from tracking
                user_id = session.user_id
                if user_id in self.user_sessions:
                    self.user_sessions[user_id].remove(session_id)
                    if not self.user_sessions[user_id]:
                        del self.user_sessions[user_id]
                
                # Close session
                session.close()
                del self.sessions[session_id]
                
                return True
            except Exception as e:
                logger.error(f"Error closing session {session_id}: {e}")
                return False
    
    def user_action(self, session_id: str, agent_name: str, action: str, **kwargs) -> dict:
        """Execute a user action through their agent"""
        session = self.get_session(session_id)
        if not session:
            return {"success": False, "error": "Invalid session"}
        
        return session.agent_action(agent_name, action, **kwargs)
    
    def add_user_data(self, session_id: str, key: str, value: any, ttl_hours: Optional[float] = None) -> bool:
        """Add data to user's context"""
        session = self.get_session(session_id)
        if not session:
            return False
        
        return session.add_user_data(key, value, ttl_hours)
    
    def get_user_context(self, session_id: str, agent_name: str = "assistant") -> dict:
        """Get user's context"""
        session = self.get_session(session_id)
        if not session:
            return {}
        
        return session.get_user_context(agent_name)
    
    def get_stats(self) -> dict:
        """Get application statistics"""
        with self.lock:
            return {
                "total_sessions": len(self.sessions),
                "total_users": len(self.user_sessions),
                "sessions_per_user": {user_id: len(sessions) 
                                      for user_id, sessions in self.user_sessions.items()}
            }
    
    def _cleanup_loop(self):
        """Background cleanup of expired sessions"""
        while True:
            try:
                time.sleep(300)  # Check every 5 minutes
                self._cleanup_expired_sessions()
            except Exception as e:
                logger.error(f"Error in cleanup loop: {e}")
    
    def _cleanup_expired_sessions(self):
        """Remove expired sessions"""
        expired_sessions = []
        
        with self.lock:
            for session_id, session in self.sessions.items():
                if session.is_expired():
                    expired_sessions.append(session_id)
        
        for session_id in expired_sessions:
            logger.info(f"Cleaning up expired session: {session_id}")
            self.close_session(session_id)
    
    def shutdown(self):
        """Gracefully shutdown the application"""
        logger.info("Shutting down multi-user application")
        
        with self.lock:
            session_ids = list(self.sessions.keys())
        
        for session_id in session_ids:
            self.close_session(session_id)
        
        logger.info("Shutdown complete")

# Example usage
def production_app_example():
    """Production multi-user application example"""
    
    print("=== Production Multi-User Application ===")
    
    # Database configuration (use PostgreSQL in production)
    db_config = {
        "db_backend": "sqlite",
        "db_path": "production_app.db"
    }
    
    # Create application
    app = MultiUserApplication(db_config)
    
    try:
        # Simulate multiple users
        users = ["alice", "bob", "charlie"]
        sessions = {}
        
        # Create sessions for users
        for user in users:
            session_id = app.create_session(user)
            sessions[user] = session_id
            print(f"Created session for {user}: {session_id}")
        
        # Users add their data
        app.add_user_data(sessions["alice"], "profile", {
            "name": "Alice Johnson",
            "role": "Product Manager",
            "team": "Growth"
        })
        
        app.add_user_data(sessions["bob"], "profile", {
            "name": "Bob Smith", 
            "role": "Developer",
            "team": "Engineering"
        })
        
        # Users interact with their agents
        alice_result = app.user_action(sessions["alice"], "task_manager", "push_context",
            key="project_launch",
            value=json.dumps({
                "project": "New Feature Launch",
                "deadline": "2024-02-15",
                "status": "planning"
            }),
            topics=["projects"]
        )
        print(f"Alice task result: {alice_result['success']}")
        
        bob_result = app.user_action(sessions["bob"], "note_taker", "push_context",
            key="meeting_notes",
            value="Discussed API architecture and database schema",
            topics=["notes"]
        )
        print(f"Bob note result: {bob_result['success']}")
        
        # Check user contexts (isolated)
        alice_context = app.get_user_context(sessions["alice"])
        bob_context = app.get_user_context(sessions["bob"])
        
        print(f"Alice sees: {list(alice_context.keys())}")
        print(f"Bob sees: {list(bob_context.keys())}")
        
        # Application statistics
        stats = app.get_stats()
        print(f"App stats: {stats}")
        
    finally:
        # Clean shutdown
        app.shutdown()
        
        # Clean up test database
        import os
        if os.path.exists("production_app.db"):
            os.remove("production_app.db")

production_app_example()
```

## Microservices Integration

Here's how to use Syntha across microservice boundaries:

```python
from syntha import ContextMesh, ToolHandler
import requests
import json
from typing import Dict, Any
import threading
import time

class ServiceContextBridge:
    """Bridge context between microservices"""
    
    def __init__(self, service_name: str, user_id: str, db_config: dict):
        self.service_name = service_name
        self.user_id = user_id
        
        # Each service has its own context mesh
        self.context = ContextMesh(
            user_id=user_id,
            enable_persistence=True,
            **db_config
        )
        
        # Service-specific agent
        self.agent = ToolHandler(self.context, f"{service_name}Service")
        
        # Subscribe to inter-service topics
        self.agent.handle_tool_call("subscribe_to_topics",
                                    topics=["inter_service", f"to_{service_name}"])
    
    def publish_to_service(self, target_service: str, event_type: str, data: dict):
        """Publish event to another service"""
        event = {
            "source_service": self.service_name,
            "target_service": target_service,
            "event_type": event_type,
            "data": data,
            "timestamp": time.time()
        }
        
        self.agent.handle_tool_call("push_context",
            key=f"event_{target_service}_{int(time.time())}",
            value=json.dumps(event),
            topics=[f"to_{target_service}", "inter_service"]
        )
    
    def get_service_events(self) -> List[dict]:
        """Get events for this service"""
        result = self.agent.handle_tool_call("get_context")
        events = []
        
        for key, value in result.get("context", {}).items():
            if key.startswith("event_") and isinstance(value, dict):
                if value.get("target_service") == self.service_name:
                    events.append(value)
        
        return events
    
    def close(self):
        """Close context connection"""
        self.context.close()

class UserService:
    """Example user management service"""
    
    def __init__(self, user_id: str):
        self.bridge = ServiceContextBridge("user", user_id, {
            "db_backend": "sqlite",
            "db_path": f"user_service_{user_id}.db"
        })
    
    def create_user(self, user_data: dict) -> dict:
        """Create a new user"""
        # Store user data locally
        self.bridge.agent.handle_tool_call("push_context",
            key=f"user_{user_data['id']}",
            value=json.dumps(user_data),
            topics=["users"]
        )
        
        # Notify other services
        self.bridge.publish_to_service("analytics", "user_created", user_data)
        self.bridge.publish_to_service("notification", "welcome_user", user_data)
        
        return {"success": True, "user_id": user_data["id"]}
    
    def update_user(self, user_id: str, updates: dict) -> dict:
        """Update user data"""
        # Get existing user
        result = self.bridge.agent.handle_tool_call("get_context", keys=[f"user_{user_id}"])
        
        if f"user_{user_id}" not in result.get("context", {}):
            return {"success": False, "error": "User not found"}
        
        # Update user data
        user_data = json.loads(result["context"][f"user_{user_id}"])
        user_data.update(updates)
        
        self.bridge.agent.handle_tool_call("push_context",
            key=f"user_{user_id}",
            value=json.dumps(user_data),
            topics=["users"]
        )
        
        # Notify other services
        self.bridge.publish_to_service("analytics", "user_updated", {
            "user_id": user_id,
            "updates": updates
        })
        
        return {"success": True}
    
    def close(self):
        self.bridge.close()

class AnalyticsService:
    """Example analytics service"""
    
    def __init__(self, user_id: str):
        self.bridge = ServiceContextBridge("analytics", user_id, {
            "db_backend": "sqlite", 
            "db_path": f"analytics_service_{user_id}.db"
        })
        self.metrics = {}
    
    def process_events(self):
        """Process incoming events"""
        events = self.bridge.get_service_events()
        
        for event in events:
            event_type = event.get("event_type")
            data = event.get("data", {})
            
            if event_type == "user_created":
                self._track_user_creation(data)
            elif event_type == "user_updated":
                self._track_user_update(data)
    
    def _track_user_creation(self, user_data: dict):
        """Track user creation metrics"""
        self.metrics["users_created"] = self.metrics.get("users_created", 0) + 1
        
        # Store metrics in context
        self.bridge.agent.handle_tool_call("push_context",
            key="user_creation_metrics",
            value=json.dumps(self.metrics),
            topics=["metrics"]
        )
    
    def _track_user_update(self, data: dict):
        """Track user update metrics"""
        self.metrics["users_updated"] = self.metrics.get("users_updated", 0) + 1
        
        # Store metrics in context
        self.bridge.agent.handle_tool_call("push_context",
            key="user_update_metrics", 
            value=json.dumps(self.metrics),
            topics=["metrics"]
        )
    
    def get_metrics(self) -> dict:
        """Get current metrics"""
        return self.metrics
    
    def close(self):
        self.bridge.close()

def microservices_example():
    """Microservices integration example"""
    
    print("=== Microservices Integration ===")
    
    user_id = "microservices_demo"
    
    # Create services
    user_service = UserService(user_id)
    analytics_service = AnalyticsService(user_id)
    
    try:
        # Create some users
        users = [
            {"id": "user1", "name": "Alice", "email": "alice@example.com"},
            {"id": "user2", "name": "Bob", "email": "bob@example.com"}
        ]
        
        for user_data in users:
            result = user_service.create_user(user_data)
            print(f"Created user: {result}")
        
        # Update a user
        update_result = user_service.update_user("user1", {"status": "active"})
        print(f"Updated user: {update_result}")
        
        # Process events in analytics service
        analytics_service.process_events()
        
        # Get metrics
        metrics = analytics_service.get_metrics()
        print(f"Analytics metrics: {metrics}")
        
    finally:
        # Clean up
        user_service.close()
        analytics_service.close()
        
        # Clean up test databases
        import os
        for db_file in [f"user_service_{user_id}.db", f"analytics_service_{user_id}.db"]:
            if os.path.exists(db_file):
                os.remove(db_file)

microservices_example()
```

## Production Monitoring and Observability

Here's how to add monitoring and observability to your Syntha applications:

```python
from syntha import ContextMesh, ToolHandler
import logging
import time
import json
from typing import Dict, List
from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class ContextMetric:
    """Represents a context operation metric"""
    timestamp: float
    operation: str
    agent_name: str
    success: bool
    duration_ms: float
    context_size: int
    error: str = None

class SynthaMonitor:
    """Production monitoring for Syntha applications"""
    
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.metrics: List[ContextMetric] = []
        self.context = ContextMesh(
            user_id=f"monitor_{user_id}",
            enable_persistence=True,
            db_backend="sqlite",
            db_path=f"monitoring_{user_id}.db"
        )
        
        # Monitoring agent
        self.monitor_agent = ToolHandler(self.context, "MonitorAgent")
        self.monitor_agent.handle_tool_call("subscribe_to_topics", 
                                            topics=["monitoring", "alerts"])
        
        # Set up logging
        self.logger = logging.getLogger(f"syntha_monitor_{user_id}")
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)
        self.logger.setLevel(logging.INFO)
    
    def track_operation(self, operation: str, agent_name: str, 
                       success: bool, duration_ms: float, 
                       context_size: int, error: str = None):
        """Track a context operation"""
        
        metric = ContextMetric(
            timestamp=time.time(),
            operation=operation,
            agent_name=agent_name,
            success=success,
            duration_ms=duration_ms,
            context_size=context_size,
            error=error
        )
        
        self.metrics.append(metric)
        
        # Log the operation
        if success:
            self.logger.info(f"{agent_name} {operation} completed in {duration_ms:.2f}ms")
        else:
            self.logger.error(f"{agent_name} {operation} failed: {error}")
        
        # Store in context for analysis
        self.monitor_agent.handle_tool_call("push_context",
            key=f"metric_{int(metric.timestamp)}",
            value=json.dumps({
                "timestamp": metric.timestamp,
                "operation": metric.operation,
                "agent_name": metric.agent_name,
                "success": metric.success,
                "duration_ms": metric.duration_ms,
                "context_size": metric.context_size,
                "error": metric.error
            }),
            topics=["monitoring"],
            ttl_hours=24
        )
        
        # Check for alerts
        self._check_alerts(metric)
    
    def _check_alerts(self, metric: ContextMetric):
        """Check if metric triggers any alerts"""
        
        # Alert on failures
        if not metric.success:
            self._send_alert("operation_failed", {
                "operation": metric.operation,
                "agent": metric.agent_name,
                "error": metric.error
            })
        
        # Alert on slow operations (>1000ms)
        if metric.duration_ms > 1000:
            self._send_alert("slow_operation", {
                "operation": metric.operation,
                "agent": metric.agent_name,
                "duration_ms": metric.duration_ms
            })
        
        # Alert on large context (>100 items)
        if metric.context_size > 100:
            self._send_alert("large_context", {
                "agent": metric.agent_name,
                "context_size": metric.context_size
            })
    
    def _send_alert(self, alert_type: str, data: dict):
        """Send an alert"""
        alert = {
            "type": alert_type,
            "timestamp": time.time(),
            "data": data,
            "severity": self._get_alert_severity(alert_type)
        }
        
        self.monitor_agent.handle_tool_call("push_context",
            key=f"alert_{int(alert['timestamp'])}",
            value=json.dumps(alert),
            topics=["alerts"],
            ttl_hours=48
        )
        
        # Log alert
        severity = alert["severity"]
        if severity == "critical":
            self.logger.critical(f"ALERT: {alert_type} - {data}")
        elif severity == "warning":
            self.logger.warning(f"ALERT: {alert_type} - {data}")
        else:
            self.logger.info(f"ALERT: {alert_type} - {data}")
    
    def _get_alert_severity(self, alert_type: str) -> str:
        """Get severity level for alert type"""
        severity_map = {
            "operation_failed": "critical",
            "slow_operation": "warning", 
            "large_context": "info"
        }
        return severity_map.get(alert_type, "info")
    
    def get_performance_stats(self, hours: int = 1) -> dict:
        """Get performance statistics for the last N hours"""
        
        cutoff_time = time.time() - (hours * 3600)
        recent_metrics = [m for m in self.metrics if m.timestamp > cutoff_time]
        
        if not recent_metrics:
            return {"message": "No metrics in time range"}
        
        # Calculate statistics
        total_ops = len(recent_metrics)
        successful_ops = len([m for m in recent_metrics if m.success])
        failed_ops = total_ops - successful_ops
        
        durations = [m.duration_ms for m in recent_metrics]
        avg_duration = sum(durations) / len(durations)
        max_duration = max(durations)
        min_duration = min(durations)
        
        # Operations by type
        ops_by_type = {}
        for metric in recent_metrics:
            ops_by_type[metric.operation] = ops_by_type.get(metric.operation, 0) + 1
        
        # Agents by activity
        agents_by_activity = {}
        for metric in recent_metrics:
            agents_by_activity[metric.agent_name] = agents_by_activity.get(metric.agent_name, 0) + 1
        
        return {
            "time_range_hours": hours,
            "total_operations": total_ops,
            "successful_operations": successful_ops,
            "failed_operations": failed_ops,
            "success_rate": successful_ops / total_ops if total_ops > 0 else 0,
            "avg_duration_ms": avg_duration,
            "max_duration_ms": max_duration,
            "min_duration_ms": min_duration,
            "operations_by_type": ops_by_type,
            "agents_by_activity": agents_by_activity
        }
    
    def get_alerts(self, hours: int = 24) -> List[dict]:
        """Get recent alerts"""
        
        result = self.monitor_agent.handle_tool_call("get_context")
        alerts = []
        
        cutoff_time = time.time() - (hours * 3600)
        
        for key, value in result.get("context", {}).items():
            if key.startswith("alert_") and isinstance(value, dict):
                if value.get("timestamp", 0) > cutoff_time:
                    alerts.append(value)
        
        # Sort by timestamp (newest first)
        alerts.sort(key=lambda x: x.get("timestamp", 0), reverse=True)
        
        return alerts
    
    def close(self):
        """Close monitoring resources"""
        self.context.close()

class MonitoredContextHandler:
    """Context handler with built-in monitoring"""
    
    def __init__(self, context: ContextMesh, agent_name: str, monitor: SynthaMonitor):
        self.handler = ToolHandler(context, agent_name)
        self.agent_name = agent_name
        self.monitor = monitor
    
    def handle_tool_call(self, tool_name: str, **kwargs) -> dict:
        """Handle tool call with monitoring"""
        
        start_time = time.time()
        context_size = len(self.handler.context_mesh._data)
        
        try:
            result = self.handler.handle_tool_call(tool_name, **kwargs)
            duration_ms = (time.time() - start_time) * 1000
            
            self.monitor.track_operation(
                operation=tool_name,
                agent_name=self.agent_name,
                success=result.get("success", True),
                duration_ms=duration_ms,
                context_size=context_size
            )
            
            return result
            
        except Exception as e:
            duration_ms = (time.time() - start_time) * 1000
            
            self.monitor.track_operation(
                operation=tool_name,
                agent_name=self.agent_name,
                success=False,
                duration_ms=duration_ms,
                context_size=context_size,
                error=str(e)
            )
            
            raise

def monitoring_example():
    """Production monitoring example"""
    
    print("=== Production Monitoring ===")
    
    user_id = "monitored_user"
    
    # Set up monitoring
    monitor = SynthaMonitor(user_id)
    
    # Create monitored context
    context = ContextMesh(user_id=user_id, enable_persistence=False)
    
    try:
        # Create monitored agents
        agent1 = MonitoredContextHandler(context, "Agent1", monitor)
        agent2 = MonitoredContextHandler(context, "Agent2", monitor)
        
        # Simulate operations
        operations = [
            (agent1, "subscribe_to_topics", {"topics": ["test"]}),
            (agent1, "push_context", {"key": "test1", "value": "data1", "topics": ["test"]}),
            (agent2, "subscribe_to_topics", {"topics": ["test"]}),
            (agent2, "get_context", {"keys": ["test1"]}),
            (agent1, "push_context", {"key": "test2", "value": "data2", "topics": ["test"]}),
            (agent2, "list_context", {}),
        ]
        
        for agent, operation, kwargs in operations:
            result = agent.handle_tool_call(operation, **kwargs)
            print(f"Operation {operation}: {result.get('success', 'N/A')}")
            time.sleep(0.1)  # Small delay between operations
        
        # Simulate a failure
        try:
            agent1.handle_tool_call("invalid_operation")
        except:
            pass  # Expected failure
        
        # Get performance statistics
        stats = monitor.get_performance_stats(hours=1)
        print(f"\nPerformance Stats:")
        print(f"  Total operations: {stats['total_operations']}")
        print(f"  Success rate: {stats['success_rate']:.2%}")
        print(f"  Average duration: {stats['avg_duration_ms']:.2f}ms")
        print(f"  Operations by type: {stats['operations_by_type']}")
        
        # Get alerts
        alerts = monitor.get_alerts(hours=1)
        print(f"\nAlerts ({len(alerts)} total):")
        for alert in alerts[:3]:  # Show first 3
            print(f"  {alert['type']} ({alert['severity']}): {alert['data']}")
        
    finally:
        # Clean up
        context.close()
        monitor.close()
        
        # Clean up test database
        import os
        if os.path.exists(f"monitoring_{user_id}.db"):
            os.remove(f"monitoring_{user_id}.db")

monitoring_example()
```

## What You've Learned

You now have complete, production-ready examples for:

- ✅ **OpenAI Integration** - Single and multi-agent systems with real API calls
- ✅ **Multi-User Applications** - Complete user isolation and session management
- ✅ **Microservices Architecture** - Context sharing across service boundaries
- ✅ **Production Monitoring** - Comprehensive observability and alerting

These examples provide the foundation for building sophisticated, scalable multi-agent systems with Syntha. Each pattern includes proper error handling, logging, and production best practices.

## Next Steps

You're now ready to build production applications with Syntha! Consider:

1. **Start Small** - Begin with a single-agent system and add complexity gradually
2. **Focus on User Isolation** - Always use proper `user_id` separation
3. **Monitor Everything** - Implement monitoring from day one
4. **Plan for Scale** - Use the patterns shown here as your system grows
5. **Test Thoroughly** - All examples include error handling patterns to follow