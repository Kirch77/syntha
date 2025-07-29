#!/usr/bin/env python3
"""
Test runner script for Access Control features.

This script runs all access control related tests with proper reporting.
"""

import subprocess
import sys
from pathlib import Path

def run_access_control_tests():
    """Run all access control tests."""
    print("🔐 Running Access Control Tests")
    print("=" * 50)
    
    # Change to project root
    project_root = Path(__file__).parent.parent
    
    # Run access control tests
    cmd = [
        sys.executable, "-m", "pytest", 
        "-m", "access_control",
        "-v", 
        "--tb=short",
        "--cov=syntha",
        "--cov-report=term-missing",
        "--cov-report=html:coverage_access_control",
        "tests/"
    ]
    
    print(f"Running command: {' '.join(cmd)}")
    print()
    
    try:
        result = subprocess.run(cmd, cwd=project_root, check=True)
        print("\n✅ All access control tests passed!")
        return 0
    except subprocess.CalledProcessError as e:
        print(f"\n❌ Access control tests failed with exit code {e.returncode}")
        return e.returncode

def run_specific_test_categories():
    """Run tests by specific categories."""
    categories = [
        ("unit", "Unit tests for access control"),
        ("integration", "Integration tests for access control"),
        ("tools", "All tool-related tests"),
    ]
    
    for marker, description in categories:
        print(f"\n🧪 {description}")
        print("-" * 40)
        
        cmd = [
            sys.executable, "-m", "pytest",
            "-m", f"access_control and {marker}",
            "-v",
            "--tb=line",
            "tests/"
        ]
        
        try:
            subprocess.run(cmd, check=True)
            print(f"✅ {description} passed")
        except subprocess.CalledProcessError:
            print(f"❌ {description} failed")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Run access control tests")
    parser.add_argument(
        "--categories", 
        action="store_true",
        help="Run tests by categories (unit, integration, tools)"
    )
    parser.add_argument(
        "--coverage", 
        action="store_true",
        help="Generate coverage report"
    )
    
    args = parser.parse_args()
    
    if args.categories:
        run_specific_test_categories()
    else:
        exit_code = run_access_control_tests()
        sys.exit(exit_code) 