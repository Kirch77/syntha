# Tool Access Control

This example demonstrates how to implement access control for Syntha tools, ensuring that agents can only access appropriate context data and perform authorized operations.

## Overview

Access control in Syntha provides:
- Role-based access to context data
- Permission-based tool usage
- Secure multi-agent environments
- Audit trails for compliance

## Basic Access Control Setup

```python
from syntha import ContextMesh, ToolHandler
from syntha.access_control import AccessController, Role, Permission

# Create context mesh with access control
mesh = ContextMesh(user_id="secure_user")

# Define roles and permissions
admin_role = Role("admin", [
    Permission("read_all"),
    Permission("write_all"),
    Permission("delete_context"),
    Permission("manage_users")
])

user_role = Role("user", [
    Permission("read_own"),
    Permission("write_own"),
    Permission("read_public")
])

readonly_role = Role("readonly", [
    Permission("read_public")
])

# Create access-controlled handlers
admin_handler = ToolHandler(mesh, "AdminAgent", role=admin_role)
user_handler = ToolHandler(mesh, "UserAgent", role=user_role)
readonly_handler = ToolHandler(mesh, "ReadOnlyAgent", role=readonly_role)
```

## Complete Access Control Example

```python
#!/usr/bin/env python3
"""
Tool Access Control Demonstration

Shows how to implement secure access control for Syntha tools.
"""

from syntha import ContextMesh, ToolHandler
from syntha.tool_factory import SynthaToolFactory
import json
from datetime import datetime

class SecureContextSystem:
    def __init__(self):
        self.mesh = ContextMesh(user_id="secure_system")
        self.handlers = {}
        self.access_log = []
        self.setup_agents()
    
    def setup_agents(self):
        """Create agents with different access levels."""
        
        # Administrator - full access
        self.admin = ToolHandler(self.mesh, "Administrator")
        self.admin.permissions = ["read_all", "write_all", "delete_all", "manage_system"]
        
        # Manager - limited admin access
        self.manager = ToolHandler(self.mesh, "Manager")
        self.manager.permissions = ["read_all", "write_team", "read_reports"]
        
        # Employee - standard access
        self.employee = ToolHandler(self.mesh, "Employee")
        self.employee.permissions = ["read_own", "write_own", "read_public"]
        
        # Guest - read-only access
        self.guest = ToolHandler(self.mesh, "Guest")
        self.guest.permissions = ["read_public"]
        
        self.handlers = {
            "admin": self.admin,
            "manager": self.manager,
            "employee": self.employee,
            "guest": self.guest
        }
    
    def check_permission(self, agent: ToolHandler, action: str, resource: str) -> bool:
        """Check if agent has permission for action on resource."""
        
        # Define access rules
        access_rules = {
            "read_all": lambda r: True,
            "write_all": lambda r: True,
            "delete_all": lambda r: True,
            "manage_system": lambda r: r.startswith("system_"),
            "read_team": lambda r: r.startswith("team_") or r.startswith("public_"),
            "write_team": lambda r: r.startswith("team_"),
            "read_reports": lambda r: r.startswith("report_") or r.startswith("public_"),
            "read_own": lambda r: r.startswith(f"{agent.agent_name.lower()}_") or r.startswith("public_"),
            "write_own": lambda r: r.startswith(f"{agent.agent_name.lower()}_"),
            "read_public": lambda r: r.startswith("public_")
        }
        
        # Check if agent has required permission
        required_permission = f"{action}_all"
        if required_permission in agent.permissions:
            return True
        
        # Check specific permissions
        for permission in agent.permissions:
            if permission.startswith(action) and permission in access_rules:
                if access_rules[permission](resource):
                    return True
        
        return False
    
    def secure_push_context(self, agent_name: str, key: str, data: any, topic: str = None):
        """Securely push context with access control."""
        
        agent = self.handlers[agent_name]
        
        # Log access attempt
        self.log_access(agent_name, "write", key, None)
        
        # Check write permission
        if not self.check_permission(agent, "write", key):
            self.log_access(agent_name, "write", key, "DENIED")
            raise PermissionError(f"Agent {agent_name} denied write access to {key}")
        
        # Execute operation
        result = agent.push_context(key, data, topic=topic)
        self.log_access(agent_name, "write", key, "SUCCESS")
        
        return result
    
    def secure_get_context(self, agent_name: str, key: str):
        """Securely get context with access control."""
        
        agent = self.handlers[agent_name]
        
        # Log access attempt
        self.log_access(agent_name, "read", key, None)
        
        # Check read permission
        if not self.check_permission(agent, "read", key):
            self.log_access(agent_name, "read", key, "DENIED")
            raise PermissionError(f"Agent {agent_name} denied read access to {key}")
        
        # Execute operation
        result = agent.get_context(key)
        self.log_access(agent_name, "read", key, "SUCCESS")
        
        return result
    
    def log_access(self, agent: str, action: str, resource: str, result: str):
        """Log access attempts for audit trail."""
        
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "agent": agent,
            "action": action,
            "resource": resource,
            "result": result
        }
        
        self.access_log.append(log_entry)
        
        if result:
            status = "✅" if result == "SUCCESS" else "❌"
            print(f"{status} {agent} {action} {resource}: {result}")
    
    def demonstrate_access_control(self):
        """Demonstrate access control in action."""
        
        print("🔒 Access Control Demonstration")
        print("=" * 40)
        
        # Setup initial data
        print("\n1. Setting up initial data...")
        
        # Admin sets up system data
        self.secure_push_context("admin", "system_config", {
            "version": "1.0",
            "max_users": 1000
        })
        
        # Admin sets up public data
        self.secure_push_context("admin", "public_announcements", [
            "Welcome to the system!",
            "Maintenance scheduled for tonight"
        ])
        
        # Manager sets up team data
        self.secure_push_context("manager", "team_goals", {
            "q1_target": "Increase efficiency by 20%",
            "focus_areas": ["automation", "training"]
        })
        
        # Employee sets up personal data
        self.secure_push_context("employee", "employee_notes", {
            "project": "Context Management",
            "status": "In Progress"
        })
        
        print("\n2. Testing read permissions...")
        
        # Test successful reads
        try:
            # Admin can read everything
            system_config = self.secure_get_context("admin", "system_config")
            print(f"Admin read system config: {system_config['version']}")
            
            # Manager can read team and public data
            announcements = self.secure_get_context("manager", "public_announcements")
            print(f"Manager read announcements: {len(announcements)} items")
            
            # Employee can read own and public data
            notes = self.secure_get_context("employee", "employee_notes")
            print(f"Employee read own notes: {notes['project']}")
            
            # Guest can read public data
            public_data = self.secure_get_context("guest", "public_announcements")
            print(f"Guest read public data: {len(public_data)} items")
            
        except PermissionError as e:
            print(f"Permission error: {e}")
        
        print("\n3. Testing denied access...")
        
        # Test denied access
        denied_attempts = [
            ("guest", "system_config"),      # Guest can't read system data
            ("employee", "team_goals"),      # Employee can't read team data
            ("guest", "employee_notes"),     # Guest can't read employee data
        ]
        
        for agent, resource in denied_attempts:
            try:
                self.secure_get_context(agent, resource)
            except PermissionError:
                pass  # Expected - already logged
        
        print("\n4. Testing write permissions...")
        
        # Test write attempts
        try:
            # Employee can write to own space
            self.secure_push_context("employee", "employee_tasks", ["Task 1", "Task 2"])
            
            # Manager can write to team space
            self.secure_push_context("manager", "team_schedule", {"meeting": "Monday 10am"})
            
        except PermissionError as e:
            print(f"Write permission error: {e}")
        
        # Test denied writes
        denied_writes = [
            ("guest", "public_announcements", {"announcement": "Unauthorized"}),
            ("employee", "system_config", {"hacked": True}),
        ]
        
        for agent, resource, data in denied_writes:
            try:
                self.secure_push_context(agent, resource, data)
            except PermissionError:
                pass  # Expected - already logged
        
        print("\n5. Access audit trail:")
        self.show_audit_trail()
    
    def show_audit_trail(self):
        """Display access audit trail."""
        
        print("\n📋 Recent Access Log:")
        for entry in self.access_log[-10:]:  # Show last 10 entries
            print(f"  {entry['timestamp'][:19]} | {entry['agent']:10} | "
                  f"{entry['action']:5} | {entry['resource']:20} | {entry['result'] or 'ATTEMPT'}")
    
    def cleanup(self):
        """Clean up resources."""
        self.mesh.close()

def main():
    """Run the access control demonstration."""
    
    system = SecureContextSystem()
    
    try:
        system.demonstrate_access_control()
    finally:
        system.cleanup()

if __name__ == "__main__":
    main()
```

## Tool-Level Access Control

```python
from syntha.tool_factory import SynthaToolFactory

def create_secure_tools(handler: ToolHandler, permissions: list):
    """Create tools with access control restrictions."""
    
    factory = SynthaToolFactory(handler)
    
    # Get all available tools
    all_tools = factory.create_tools("openai")
    
    # Filter tools based on permissions
    allowed_tools = []
    
    for tool in all_tools:
        tool_name = tool['function']['name']
        
        # Define tool permission requirements
        tool_permissions = {
            'get_context': 'read',
            'push_context': 'write',
            'remove_context': 'delete',
            'list_context_keys': 'read',
            'clear_all_context': 'admin'
        }
        
        required_permission = tool_permissions.get(tool_name, 'read')
        
        if required_permission in permissions or 'admin' in permissions:
            allowed_tools.append(tool)
    
    return allowed_tools

# Usage
admin_tools = create_secure_tools(admin_handler, ['read', 'write', 'delete', 'admin'])
user_tools = create_secure_tools(user_handler, ['read', 'write'])
readonly_tools = create_secure_tools(readonly_handler, ['read'])

print(f"Admin tools: {len(admin_tools)}")
print(f"User tools: {len(user_tools)}")
print(f"Readonly tools: {len(readonly_tools)}")
```

## Best Practices

1. **Principle of Least Privilege**: Give agents minimum required permissions
2. **Audit Logging**: Log all access attempts for compliance
3. **Regular Reviews**: Periodically review and update permissions
4. **Secure Defaults**: Default to deny unless explicitly allowed
5. **Testing**: Thoroughly test access control rules

## See Also

- [Tool Basics](tool-basics.md)
- [Multi-Agent Setup](multi-agent.md)
- [User Isolation](../context-mesh/user-isolation.md)
- [Security Best Practices](../../user-guide/how-to/setup.md)
