# Security & Access Control Guide

Learn how to secure your multi-agent system and implement proper access control with Syntha.

## Overview

Syntha provides comprehensive security features for production multi-agent systems:

- **Context Access Control**: Subscriber-based permissions for shared data
- **Message Privacy**: Secure agent-to-agent communication
- **Data Encryption**: Protect sensitive information in context
- **Audit Logging**: Track all access and modifications
- **Role-Based Security**: Implement organizational security models
- **TTL Security**: Automatic expiration for sensitive data

## Access Control Fundamentals

### Subscriber-Based Context Control

Restrict context access to specific agents:

```python
from syntha import ContextMesh, ToolHandler

mesh = ContextMesh()
handler = ToolHandler(mesh)

# Store sensitive data with restricted access
handler.handle_tool_call(
    "push_context",
    agent_name="SecurityManager",
    key="api_credentials",
    value={
        "api_key": "secret_key_123",
        "endpoint": "https://secure-api.example.com",
        "permissions": ["read", "write"]
    },
    subscribers=["AuthorizedAgent1", "AuthorizedAgent2"]  # Only these agents can access
)

# Unauthorized access attempt will fail
try:
    credentials = handler.handle_tool_call(
        "get_context",
        agent_name="UnauthorizedAgent",
        key="api_credentials"
    )
except PermissionError as e:
    print(f"Access denied: {e}")
```

### Global vs. Restricted Context

```python
# Global context (accessible to all agents)
handler.handle_tool_call(
    "push_context",
    agent_name="SystemConfig",
    key="public_config",
    value={"timezone": "UTC", "version": "1.0.0"}
    # No subscribers = global access
)

# Restricted context with explicit permissions
handler.handle_tool_call(
    "push_context",
    agent_name="FinanceManager",
    key="financial_data",
    value={"revenue": 100000, "costs": 75000},
    subscribers=["FinanceAgent", "CFO_Agent", "AuditAgent"]
)
```

## Role-Based Security Model

### Implementing Security Roles

```python
class SecurityRoleManager:
    def __init__(self, handler):
        self.handler = handler
        self.roles = {
            "admin": {
                "permissions": ["read", "write", "delete", "manage_users"],
                "agents": ["AdminAgent", "SystemManager"]
            },
            "finance": {
                "permissions": ["read", "write"],
                "data_patterns": ["finance.*", "billing.*", "revenue.*"],
                "agents": ["FinanceAgent", "BillingAgent", "CFO_Agent"]
            },
            "user_service": {
                "permissions": ["read", "write"],
                "data_patterns": ["users.*", "profiles.*", "preferences.*"],
                "agents": ["UserServiceAgent", "ProfileAgent", "SupportAgent"]
            },
            "readonly": {
                "permissions": ["read"],
                "agents": ["ReportingAgent", "AnalyticsAgent", "MonitoringAgent"]
            }
        }

    def store_secure_data(self, agent_name, key, value, role_required):
        """Store data with role-based access control"""
        if role_required not in self.roles:
            raise ValueError(f"Unknown role: {role_required}")

        role_info = self.roles[role_required]
        subscribers = role_info["agents"]

        return self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"secure.{role_required}.{key}",
            value=value,
            subscribers=subscribers
        )

    def get_secure_data(self, agent_name, key, role_required):
        """Retrieve data with role verification"""
        if not self.verify_agent_role(agent_name, role_required):
            raise PermissionError(f"Agent {agent_name} does not have {role_required} role")

        return self.handler.handle_tool_call(
            "get_context",
            agent_name=agent_name,
            key=f"secure.{role_required}.{key}"
        )

    def verify_agent_role(self, agent_name, role):
        """Verify if agent has required role"""
        return agent_name in self.roles.get(role, {}).get("agents", [])

    def list_agent_permissions(self, agent_name):
        """List all permissions for an agent"""
        agent_roles = []
        for role, info in self.roles.items():
            if agent_name in info["agents"]:
                agent_roles.append({
                    "role": role,
                    "permissions": info["permissions"],
                    "data_patterns": info.get("data_patterns", [])
                })
        return agent_roles

# Usage example
security = SecurityRoleManager(handler)

# Store financial data (only finance role can access)
security.store_secure_data(
    agent_name="FinanceManager",
    key="quarterly_results",
    value={"q1": 250000, "q2": 280000},
    role_required="finance"
)

# Verify access
try:
    data = security.get_secure_data("FinanceAgent", "quarterly_results", "finance")
    print("Access granted:", data)
except PermissionError as e:
    print("Access denied:", e)
```

## Data Encryption

### Encrypting Sensitive Context Data

```python
import json
import base64
from cryptography.fernet import Fernet

class EncryptedContextManager:
    def __init__(self, handler, encryption_key=None):
        self.handler = handler
        self.key = encryption_key or Fernet.generate_key()
        self.cipher = Fernet(self.key)

    def store_encrypted_data(self, agent_name, key, value, subscribers=None):
        """Store encrypted data in context"""
        # Serialize and encrypt the data
        serialized = json.dumps(value).encode()
        encrypted = self.cipher.encrypt(serialized)
        encoded = base64.b64encode(encrypted).decode()

        # Store encrypted data with metadata
        encrypted_package = {
            "data": encoded,
            "encrypted": True,
            "algorithm": "Fernet",
            "timestamp": time.time()
        }

        return self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"encrypted.{key}",
            value=encrypted_package,
            subscribers=subscribers
        )

    def get_encrypted_data(self, agent_name, key):
        """Retrieve and decrypt data from context"""
        try:
            result = self.handler.handle_tool_call(
                "get_context",
                agent_name=agent_name,
                key=f"encrypted.{key}"
            )

            package = result["value"]
            if not package.get("encrypted"):
                raise ValueError("Data is not encrypted")

            # Decode and decrypt
            encoded_data = package["data"]
            encrypted_data = base64.b64decode(encoded_data.encode())
            decrypted_data = self.cipher.decrypt(encrypted_data)

            return json.loads(decrypted_data.decode())
        except Exception as e:
            raise ValueError(f"Failed to decrypt data: {e}")

    def rotate_encryption_key(self, new_key=None):
        """Rotate encryption key (for security best practices)"""
        old_cipher = self.cipher

        # Generate new key if not provided
        if new_key is None:
            new_key = Fernet.generate_key()

        self.key = new_key
        self.cipher = Fernet(new_key)

        return old_cipher, self.cipher

# Usage example
encryptor = EncryptedContextManager(handler)

# Store sensitive customer data
customer_data = {
    "ssn": "123-45-6789",
    "credit_card": "4532-1234-5678-9012",
    "address": "123 Secret St, Privacy City"
}

encryptor.store_encrypted_data(
    agent_name="CustomerDataAgent",
    key="customer_12345",
    value=customer_data,
    subscribers=["CustomerServiceAgent", "BillingAgent"]
)

# Retrieve and use encrypted data
try:
    decrypted_data = encryptor.get_encrypted_data("CustomerServiceAgent", "customer_12345")
    print("Customer data accessed securely")
except PermissionError:
    print("Access denied to customer data")
```

## Audit Logging

### Comprehensive Activity Tracking

```python
import time
import uuid
from datetime import datetime

class SecurityAuditLogger:
    def __init__(self, handler):
        self.handler = handler
        self.audit_log_key = "security.audit_log"

    def log_access(self, agent_name, action, resource, result="success", details=None):
        """Log security-relevant actions"""
        audit_entry = {
            "id": str(uuid.uuid4()),
            "timestamp": datetime.now().isoformat(),
            "agent_name": agent_name,
            "action": action,  # "read", "write", "delete", "list"
            "resource": resource,
            "result": result,  # "success", "denied", "error"
            "details": details or {},
            "ip_address": "127.0.0.1",  # In production, get real IP
            "user_agent": "syntha-sdk"
        }

        # Store audit entry
        self.handler.handle_tool_call(
            "push_context",
            agent_name="SecurityAuditor",
            key=f"{self.audit_log_key}.{int(time.time())}.{audit_entry['id']}",
            value=audit_entry,
            ttl=2592000  # Keep audit logs for 30 days
        )

        # Alert on security violations
        if result in ["denied", "error"]:
            self.send_security_alert(audit_entry)

    def get_audit_logs(self, agent_name=None, action=None, start_time=None, end_time=None):
        """Retrieve audit logs with filtering"""
        log_keys = self.handler.handle_tool_call(
            "list_context_keys",
            agent_name="SecurityAuditor",
            pattern=f"{self.audit_log_key}.*"
        )

        logs = []
        for key in log_keys["keys"]:
            try:
                log_entry = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="SecurityAuditor",
                    key=key
                )["value"]

                # Apply filters
                if agent_name and log_entry["agent_name"] != agent_name:
                    continue

                if action and log_entry["action"] != action:
                    continue

                if start_time:
                    log_time = datetime.fromisoformat(log_entry["timestamp"])
                    if log_time < start_time:
                        continue

                if end_time:
                    log_time = datetime.fromisoformat(log_entry["timestamp"])
                    if log_time > end_time:
                        continue

                logs.append(log_entry)
            except KeyError:
                continue  # Log entry expired or inaccessible

        return sorted(logs, key=lambda x: x["timestamp"], reverse=True)

    def send_security_alert(self, audit_entry):
        """Send security alert for violations"""
        alert_message = f"Security violation detected: {audit_entry['action']} on {audit_entry['resource']} by {audit_entry['agent_name']} - Result: {audit_entry['result']}"

        self.handler.handle_tool_call(
            "send_message_to_agent",
            from_agent="SecurityAuditor",
            to_agent="SecurityManager",
            message=alert_message,
            message_type="error",
            priority="urgent"
        )

    def generate_security_report(self, days=7):
        """Generate security activity report"""
        end_time = datetime.now()
        start_time = end_time - timedelta(days=days)

        logs = self.get_audit_logs(start_time=start_time, end_time=end_time)

        report = {
            "period": {"start": start_time.isoformat(), "end": end_time.isoformat()},
            "total_activities": len(logs),
            "by_agent": {},
            "by_action": {},
            "violations": [],
            "most_active_hours": {}
        }

        for log in logs:
            # Count by agent
            agent = log["agent_name"]
            report["by_agent"][agent] = report["by_agent"].get(agent, 0) + 1

            # Count by action
            action = log["action"]
            report["by_action"][action] = report["by_action"].get(action, 0) + 1

            # Track violations
            if log["result"] in ["denied", "error"]:
                report["violations"].append(log)

            # Track activity by hour
            hour = datetime.fromisoformat(log["timestamp"]).hour
            report["most_active_hours"][hour] = report["most_active_hours"].get(hour, 0) + 1

        return report

# Integration with existing handlers
class SecureToolHandler:
    def __init__(self, base_handler, audit_logger):
        self.base_handler = base_handler
        self.audit_logger = audit_logger

    def handle_tool_call(self, tool_name, **kwargs):
        """Secure wrapper for tool calls with audit logging"""
        agent_name = kwargs.get("agent_name", "unknown")

        try:
            # Log the attempt
            self.audit_logger.log_access(
                agent_name=agent_name,
                action=tool_name,
                resource=kwargs.get("key", "unknown"),
                details={"tool_args": kwargs}
            )

            # Execute the tool call
            result = self.base_handler.handle_tool_call(tool_name, **kwargs)

            # Log success
            self.audit_logger.log_access(
                agent_name=agent_name,
                action=tool_name,
                resource=kwargs.get("key", "unknown"),
                result="success"
            )

            return result

        except PermissionError as e:
            # Log access denial
            self.audit_logger.log_access(
                agent_name=agent_name,
                action=tool_name,
                resource=kwargs.get("key", "unknown"),
                result="denied",
                details={"error": str(e)}
            )
            raise

        except Exception as e:
            # Log general errors
            self.audit_logger.log_access(
                agent_name=agent_name,
                action=tool_name,
                resource=kwargs.get("key", "unknown"),
                result="error",
                details={"error": str(e)}
            )
            raise

# Usage
audit_logger = SecurityAuditLogger(handler)
secure_handler = SecureToolHandler(handler, audit_logger)

# All tool calls are now logged
result = secure_handler.handle_tool_call(
    "get_context",
    agent_name="DataAgent",
    key="sensitive_data"
)
```

## Message Security

### Secure Agent Communication

```python
class SecureMessaging:
    def __init__(self, handler, encryption_key=None):
        self.handler = handler
        self.encryption_key = encryption_key or Fernet.generate_key()
        self.cipher = Fernet(self.encryption_key)

    def send_secure_message(self, from_agent, to_agent, message, **kwargs):
        """Send encrypted message between agents"""

        # Encrypt the message
        encrypted_message = self.cipher.encrypt(message.encode())
        encoded_message = base64.b64encode(encrypted_message).decode()

        # Send with encryption metadata
        return self.handler.handle_tool_call(
            "send_message_to_agent",
            from_agent=from_agent,
            to_agent=to_agent,
            message=encoded_message,
            message_type=kwargs.get("message_type", "encrypted"),
            priority=kwargs.get("priority", "normal"),
            requires_confirmation=kwargs.get("requires_confirmation", True)
        )

    def get_secure_messages(self, agent_name, **kwargs):
        """Retrieve and decrypt messages"""
        messages = self.handler.handle_tool_call(
            "get_messages_from_agents",
            agent_name=agent_name,
            **kwargs
        )

        decrypted_messages = []
        for msg in messages.get("messages", []):
            if msg.get("message_type") == "encrypted":
                try:
                    # Decrypt message
                    encoded_message = msg["message"]
                    encrypted_message = base64.b64decode(encoded_message.encode())
                    decrypted_message = self.cipher.decrypt(encrypted_message).decode()

                    # Update message with decrypted content
                    msg["message"] = decrypted_message
                    msg["decrypted"] = True
                except Exception as e:
                    msg["message"] = "[DECRYPTION_FAILED]"
                    msg["error"] = str(e)

            decrypted_messages.append(msg)

        return {"messages": decrypted_messages}

# Usage
secure_messaging = SecureMessaging(handler)

# Send encrypted message
secure_messaging.send_secure_message(
    from_agent="Agent1",
    to_agent="Agent2",
    message="This is a confidential message",
    priority="high",
    requires_confirmation=True
)

# Receive and decrypt messages
messages = secure_messaging.get_secure_messages("Agent2", unread_only=True)
for msg in messages["messages"]:
    if msg.get("decrypted"):
        print(f"Secure message from {msg['from_agent']}: {msg['message']}")
```

## TTL-Based Security

### Automatic Expiration for Sensitive Data

```python
class TTLSecurityManager:
    def __init__(self, handler):
        self.handler = handler
        self.security_policies = {
            "session_data": {"ttl": 3600, "cleanup_on_expire": True},  # 1 hour
            "api_tokens": {"ttl": 1800, "cleanup_on_expire": True},    # 30 minutes
            "temp_credentials": {"ttl": 300, "cleanup_on_expire": True}, # 5 minutes
            "user_cache": {"ttl": 86400, "cleanup_on_expire": False},  # 24 hours
        }

    def store_with_security_policy(self, agent_name, key, value, policy_type, subscribers=None):
        """Store data with security policy"""
        if policy_type not in self.security_policies:
            raise ValueError(f"Unknown security policy: {policy_type}")

        policy = self.security_policies[policy_type]

        return self.handler.handle_tool_call(
            "push_context",
            agent_name=agent_name,
            key=f"secure.{policy_type}.{key}",
            value=value,
            subscribers=subscribers,
            ttl=policy["ttl"]
        )

    def store_session_data(self, agent_name, session_id, session_data):
        """Store session data with automatic expiration"""
        return self.store_with_security_policy(
            agent_name=agent_name,
            key=session_id,
            value=session_data,
            policy_type="session_data"
        )

    def store_api_token(self, agent_name, token_id, token_data, authorized_agents):
        """Store API token with limited lifetime"""
        return self.store_with_security_policy(
            agent_name=agent_name,
            key=token_id,
            value=token_data,
            policy_type="api_tokens",
            subscribers=authorized_agents
        )

    def cleanup_expired_data(self):
        """Manually cleanup expired security data"""
        for policy_type, policy in self.security_policies.items():
            if policy["cleanup_on_expire"]:
                try:
                    # Try to access data to trigger TTL cleanup
                    keys = self.handler.handle_tool_call(
                        "list_context_keys",
                        agent_name="SecurityManager",
                        pattern=f"secure.{policy_type}.*"
                    )

                    for key in keys["keys"]:
                        try:
                            self.handler.handle_tool_call(
                                "get_context",
                                agent_name="SecurityManager",
                                key=key
                            )
                        except KeyError:
                            # Data expired and was cleaned up
                            pass
                except Exception:
                    continue

# Usage
ttl_security = TTLSecurityManager(handler)

# Store session with automatic expiration
ttl_security.store_session_data(
    agent_name="SessionManager",
    session_id="session_12345",
    session_data={"user_id": 12345, "permissions": ["read", "write"]}
)

# Store API token with limited access
ttl_security.store_api_token(
    agent_name="TokenManager",
    token_id="token_abc123",
    token_data={"token": "abc123...", "scope": "api_access"},
    authorized_agents=["APIClient", "ServiceAgent"]
)
```

## Production Security Checklist

### Essential Security Measures

```python
def security_hardening_checklist():
    """Production security checklist"""
    return {
        "access_control": [
            "✓ Implement subscriber-based context access",
            "✓ Use role-based security for agent permissions",
            "✓ Validate agent identities before granting access",
            "✓ Regular audit of agent permissions"
        ],
        "data_protection": [
            "✓ Encrypt sensitive data in context",
            "✓ Use strong encryption keys (Fernet or AES-256)",
            "✓ Implement key rotation policies",
            "✓ Secure key storage (environment variables, key vaults)"
        ],
        "communication_security": [
            "✓ Encrypt inter-agent messages",
            "✓ Use TLS for external communications",
            "✓ Implement message authentication",
            "✓ Rate limiting for message sending"
        ],
        "audit_and_monitoring": [
            "✓ Log all security-relevant actions",
            "✓ Monitor for unusual access patterns",
            "✓ Set up alerts for security violations",
            "✓ Regular security report generation"
        ],
        "data_lifecycle": [
            "✓ Use TTL for temporary data",
            "✓ Implement data retention policies",
            "✓ Secure data deletion procedures",
            "✓ Regular cleanup of expired data"
        ],
        "infrastructure": [
            "✓ Network isolation for agent communication",
            "✓ Firewall rules for external access",
            "✓ Regular security updates",
            "✓ Vulnerability scanning"
        ]
    }

# Security configuration example
def configure_production_security():
    """Configure Syntha for production security"""

    # Initialize with security features
    mesh = ContextMesh(
        enable_indexing=True,
        auto_cleanup=True,
        encryption_at_rest=True,  # If supported
        audit_logging=True        # If supported
    )

    handler = ToolHandler(mesh)

    # Set up security managers
    security_roles = SecurityRoleManager(handler)
    audit_logger = SecurityAuditLogger(handler)
    secure_handler = SecureToolHandler(handler, audit_logger)
    ttl_security = TTLSecurityManager(secure_handler)

    return {
        "handler": secure_handler,
        "security_roles": security_roles,
        "audit_logger": audit_logger,
        "ttl_security": ttl_security
    }
```

## Security Best Practices

### 1. Principle of Least Privilege

```python
# Grant minimal necessary permissions
def create_agent_with_minimal_permissions(agent_name, required_data_patterns):
    subscribers = [agent_name]  # Agent can only access its own data

    for pattern in required_data_patterns:
        handler.handle_tool_call(
            "push_context",
            agent_name="SecurityManager",
            key=f"permissions.{agent_name}.{pattern}",
            value={"allowed": True, "pattern": pattern},
            subscribers=["SecurityManager", agent_name]
        )
```

### 2. Defense in Depth

```python
# Multiple layers of security
class LayeredSecurity:
    def __init__(self, handler):
        self.handler = handler
        self.encryption = EncryptedContextManager(handler)
        self.roles = SecurityRoleManager(handler)
        self.audit = SecurityAuditLogger(handler)
        self.ttl = TTLSecurityManager(handler)

    def secure_operation(self, agent_name, operation, **kwargs):
        """Secure operation with multiple security layers"""

        # Layer 1: Role verification
        if not self.roles.verify_agent_role(agent_name, "authorized"):
            raise PermissionError("Agent not authorized")

        # Layer 2: Audit logging
        self.audit.log_access(agent_name, operation, kwargs.get("key", "unknown"))

        # Layer 3: Encrypted storage
        if operation == "store_sensitive":
            return self.encryption.store_encrypted_data(
                agent_name, kwargs["key"], kwargs["value"], kwargs.get("subscribers")
            )

        # Layer 4: TTL enforcement
        if kwargs.get("sensitive", False):
            return self.ttl.store_with_security_policy(
                agent_name, kwargs["key"], kwargs["value"], "temp_credentials"
            )

        return self.handler.handle_tool_call(operation, **kwargs)
```

### 3. Regular Security Reviews

```python
def perform_security_review(audit_logger, days=30):
    """Perform regular security review"""

    # Generate security report
    report = audit_logger.generate_security_report(days)

    # Check for anomalies
    anomalies = []

    # Unusual access patterns
    for agent, count in report["by_agent"].items():
        if count > 1000:  # Threshold for review
            anomalies.append(f"High activity from {agent}: {count} actions")

    # Failed access attempts
    if len(report["violations"]) > 10:
        anomalies.append(f"High number of violations: {len(report['violations'])}")

    # Generate recommendations
    recommendations = []
    if report["total_activities"] > 10000:
        recommendations.append("Consider implementing rate limiting")

    if len(report["violations"]) > 0:
        recommendations.append("Review agent permissions")

    return {
        "report": report,
        "anomalies": anomalies,
        "recommendations": recommendations
    }
```

## Next Steps

- Review [Performance Guide](performance.md) for secure optimization
- Check [Best Practices](best-practices.md) for production deployment
- Explore [Troubleshooting](troubleshooting.md) for security-related issues

## See Also

- [Context Management Tutorial](../tutorials/context-management.md) - Secure context patterns
- [API Reference](../api/) - Security-related API features
- [Production Examples](../examples/) - Secure multi-agent implementations
