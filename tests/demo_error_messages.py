#!/usr/bin/env python3
"""
Demo script showing contributor-friendly error messages.
Run this to see examples of enhanced error reporting.
"""
import os
import sys

# Add the current directory to Python path to enable relative imports
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

from test_helpers import ContributorFriendlyAssertions


def demo_data_integrity_error():
    """Demonstrate data integrity error message."""
    print("🔍 DEMO: Data Integrity Error Message")
    print("=" * 50)
    try:
        ContributorFriendlyAssertions.assert_data_integrity(
            original_data={"key": "expected_value"},
            retrieved_data={"key": "actual_value"},
            operation="demo storage/retrieval",
        )
    except AssertionError as e:
        print(str(e))
    print("\n")


def demo_performance_error():
    """Demonstrate performance error message."""
    print("🔍 DEMO: Performance Error Message")
    print("=" * 50)
    try:
        ContributorFriendlyAssertions.assert_performance_within_limits(
            duration_seconds=2.5,
            max_seconds=1.0,
            operation="demo operation",
            context="testing error message formatting",
        )
    except AssertionError as e:
        print(str(e))
    print("\n")


if __name__ == "__main__":
    print("🧪 CONTRIBUTOR ERROR REPORTING DEMO")
    print("=" * 60)
    print()

    demo_data_integrity_error()
    demo_performance_error()

    print("✅ Demo complete! These are the types of helpful error messages")
    print("   contributors will see when tests fail.")
