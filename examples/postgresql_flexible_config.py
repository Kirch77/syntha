#!/usr/bin/env python3
"""
PostgreSQL Flexible Configuration Example for Syntha

This example demonstrates both ways to configure PostgreSQL:
1. Using a connection string (recommended)
2. Using individual parameters (more flexible)
"""

import os

from syntha import ContextMesh


def example_connection_string():
    """Example using connection string approach."""
    print("🔗 Example 1: Connection String Approach")

    try:
        context = ContextMesh(
            user_id="demo_user",
            enable_persistence=True,
            db_backend="postgresql",
            connection_string="postgresql://syntha_user:password123@localhost:5432/syntha_demo",
        )

        print("✅ Connected with connection string!")

        # Test basic operations
        context.push("connection_test", "Connected via connection string!")
        result = context.get("connection_test", "demo_user")
        print(f"📦 Retrieved: {result}")

        context.close()
        return True

    except Exception as e:
        print(f"❌ Connection string approach failed: {e}")
        return False


def example_individual_parameters():
    """Example using individual parameters approach."""
    print("\n🔧 Example 2: Individual Parameters Approach")

    try:
        context = ContextMesh(
            user_id="demo_user",
            enable_persistence=True,
            db_backend="postgresql",
            host="localhost",
            port=5432,
            database="syntha_demo",
            user="syntha_user",
            password="password123",
            sslmode="prefer",  # Optional SSL configuration
        )

        print("✅ Connected with individual parameters!")

        # Test basic operations
        context.push("params_test", "Connected via individual parameters!")
        result = context.get("params_test", "demo_user")
        print(f"📦 Retrieved: {result}")

        context.close()
        return True

    except Exception as e:
        print(f"❌ Individual parameters approach failed: {e}")
        return False


def example_environment_variables():
    """Example using environment variables with individual parameters."""
    print("\n🌍 Example 3: Environment Variables Approach")

    # Set default environment variables if not present
    env_defaults = {
        "DB_HOST": "localhost",
        "DB_PORT": "5432",
        "DB_NAME": "syntha_demo",
        "DB_USER": "syntha_user",
        "DB_PASSWORD": "password123",
    }

    for key, default in env_defaults.items():
        if key not in os.environ:
            os.environ[key] = default

    try:
        context = ContextMesh(
            user_id="demo_user",
            enable_persistence=True,
            db_backend="postgresql",
            host=os.getenv("DB_HOST"),
            port=int(os.getenv("DB_PORT")),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            sslmode=os.getenv("DB_SSLMODE", "prefer"),
        )

        print("✅ Connected using environment variables!")

        # Test basic operations
        context.push("env_test", "Connected via environment variables!")
        result = context.get("env_test", "demo_user")
        print(f"📦 Retrieved: {result}")

        context.close()
        return True

    except Exception as e:
        print(f"❌ Environment variables approach failed: {e}")
        return False


def example_parameter_aliases():
    """Example showing parameter alias flexibility."""
    print("\n🔄 Example 4: Parameter Aliases")

    try:
        # Using aliases: db_name instead of database, username instead of user
        context = ContextMesh(
            user_id="demo_user",
            enable_persistence=True,
            db_backend="postgresql",
            host="localhost",
            port=5432,
            db_name="syntha_demo",  # Using db_name alias
            username="syntha_user",  # Using username alias
            password="password123",
        )

        print("✅ Connected using parameter aliases!")

        # Test basic operations
        context.push("alias_test", "Connected via parameter aliases!")
        result = context.get("alias_test", "demo_user")
        print(f"📦 Retrieved: {result}")

        context.close()
        return True

    except Exception as e:
        print(f"❌ Parameter aliases approach failed: {e}")
        return False


def show_error_examples():
    """Show common configuration errors and their messages."""
    print("\n❌ Common Configuration Errors:")

    # Missing database name
    try:
        ContextMesh(
            db_backend="postgresql",
            user="test",
            password="test",
            # Missing database/db_name
        )
    except ValueError as e:
        print(f"   Missing database: {e}")

    # Missing username
    try:
        ContextMesh(
            db_backend="postgresql",
            database="test",
            password="test",
            # Missing user/username
        )
    except ValueError as e:
        print(f"   Missing user: {e}")

    # Missing password
    try:
        ContextMesh(
            db_backend="postgresql",
            database="test",
            user="test",
            # Missing password
        )
    except ValueError as e:
        print(f"   Missing password: {e}")


def main():
    """Run all PostgreSQL configuration examples."""
    print("🐘 PostgreSQL Flexible Configuration Examples")
    print("=" * 50)

    # Try different configuration approaches
    success_count = 0

    if example_connection_string():
        success_count += 1

    if example_individual_parameters():
        success_count += 1

    if example_environment_variables():
        success_count += 1

    if example_parameter_aliases():
        success_count += 1

    # Show error examples
    show_error_examples()

    print(f"\n📊 Summary: {success_count}/4 configuration methods succeeded")

    if success_count == 0:
        print("\n💡 Tips:")
        print("   - Make sure PostgreSQL is running")
        print("   - Install psycopg2: pip install psycopg2-binary")
        print("   - Create the database: createdb syntha_demo")
        print("   - Check your connection parameters")


if __name__ == "__main__":
    main()
