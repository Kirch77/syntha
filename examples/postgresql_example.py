#!/usr/bin/env python3
"""
PostgreSQL Configuration Example for Syntha

This example shows how to properly configure Syntha with PostgreSQL.
Make sure you have PostgreSQL installed and running, and psycopg2 installed.
"""

from syntha import ContextMesh


def main():
    # Example 1: Basic PostgreSQL connection
    print("🔗 Connecting to PostgreSQL...")

    try:
        context = ContextMesh(
            user_id="demo_user",
            enable_persistence=True,
            db_backend="postgresql",
            connection_string="postgresql://syntha_user:your_password@localhost:5432/syntha_db",
        )

        print("✅ Connected successfully!")

        # Test basic operations
        context.push("test_key", "Hello PostgreSQL!")
        result = context.get("test_key", "demo_user")
        print(f"📦 Retrieved: {result}")

        # Clean up
        context.close()
        print("🔒 Connection closed")

    except ValueError as e:
        if "connection_string is required" in str(e):
            print("❌ Error: PostgreSQL requires a connection_string parameter")
            print(
                "📖 Correct format: postgresql://username:password@host:port/database"
            )
        else:
            print(f"❌ Configuration error: {e}")
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("💡 Install with: pip install psycopg2-binary")
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        print("💡 Make sure PostgreSQL is running and the database exists")


if __name__ == "__main__":
    main()
