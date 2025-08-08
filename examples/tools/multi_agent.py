"""
Tools - Multi-Agent Coordination Example

This example demonstrates how multiple agents can coordinate using
Syntha's Tool Handler system with shared context and topic routing.

Copy and run this code to see multi-agent coordination in action!
"""

from syntha import ContextMesh, create_multi_agent_handlers


def main():
    print("🚀 Tools - Multi-Agent Coordination")
    print("=" * 40)

    # Create context mesh for a project team
    context = ContextMesh(user_id="project_team")

    # Define agent configurations (dict form required by create_multi_agent_handlers)
    agent_configs = {
        "ProjectManager": {"role": "admin"},
        "Developer": {"role": "contributor"},
        "Designer": {"role": "contributor"},
        "QAAgent": {"role": "contributor"},
        "ClientLiaison": {"role": "readonly"},
    }

    # Create multiple handlers at once
    handlers = create_multi_agent_handlers(context, agent_configs)

    print(f"✅ Created {len(handlers)} agent handlers")

    # Initialize project context
    pm_handler = handlers["ProjectManager"]
    pm_handler.handle_tool_call(
        "push_context",
        key="project_info",
        value={
            "name": "Customer Portal v2",
            "deadline": "2025-04-01",
            "budget": 75000,
            "client": "TechCorp Inc.",
        },
        topics=["planning", "team"],
    )

    print("✅ Project Manager initialized project context")

    # Developer starts working and reports progress
    dev_handler = handlers["Developer"]
    dev_handler.handle_tool_call(
        "push_context",
        key="development_status",
        value={
            "backend_api": "80% complete",
            "database_schema": "complete",
            "authentication": "in_progress",
        },
        topics=["development", "status"],
    )

    print("✅ Developer reported progress")

    # Designer shares UI updates
    design_handler = handlers["Designer"]
    design_handler.handle_tool_call(
        "push_context",
        key="design_assets",
        value={
            "mockups": "approved",
            "style_guide": "finalized",
            "component_library": "80% complete",
        },
        topics=["design", "status"],
    )

    print("✅ Designer shared UI updates")

    # QA Agent reports a bug
    qa_handler = handlers["QAAgent"]
    qa_handler.handle_tool_call(
        "push_context",
        key="bug_report",
        value={
            "id": "BUG-001",
            "severity": "medium",
            "description": "Login form validation not working",
            "assigned_to": "Developer",
        },
        topics=["bugs", "development"],
    )

    print("✅ QA Agent reported a bug")

    # Client Liaison gets status update for client
    client_handler = handlers["ClientLiaison"]
    client_context = client_handler.handle_tool_call("get_context")

    print("\n📊 Status Update for Client:")
    context_data = client_context["context"]
    if "project_info" in context_data:
        project = context_data["project_info"]
        print(f"   Project: {project['name']}")
        print(f"   Deadline: {project['deadline']}")

    if "development_status" in context_data:
        dev_status = context_data["development_status"]
        print(f"   Backend API: {dev_status['backend_api']}")

    if "design_assets" in context_data:
        design_status = context_data["design_assets"]
        print(f"   Mockups: {design_status['mockups']}")

    # Project Manager gets comprehensive status
    pm_context = pm_handler.handle_tool_call("get_context")
    pm_data = pm_context["context"]

    print("\n📋 Project Manager's Full View:")
    print(f"   Total context items: {len(pm_data)}")
    print(f"   Available keys: {list(pm_data.keys())}")

    # Show topic-based filtering
    dev_topics = dev_handler.handle_tool_call("discover_topics")
    if dev_topics["success"]:
        print(
            f"\n🎯 Developer's subscribed topics: {list(dev_topics['topics'].keys())}"
        )

    # Simulate coordination: Developer responds to bug
    dev_handler.handle_tool_call(
        "push_context",
        key="bug_fix_status",
        value={"bug_id": "BUG-001", "status": "investigating", "eta": "2 hours"},
        topics=["bugs", "development"],
    )

    # QA Agent sees the update
    qa_context = qa_handler.handle_tool_call("get_context", keys=["bug_fix_status"])
    if qa_context["success"] and "bug_fix_status" in qa_context["context"]:
        fix_status = qa_context["context"]["bug_fix_status"]
        print(f"\n🐛 Bug fix update: {fix_status['status']} (ETA: {fix_status['eta']})")

    print("\n✅ Multi-agent coordination complete!")
    print("🤝 All agents are working together with shared context")


if __name__ == "__main__":
    main()
