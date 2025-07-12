# Syntha SDK Development Makefile
# Common development tasks for contributors and maintainers

.PHONY: help install install-dev test test-unit test-integration test-security test-performance
.PHONY: test-fast test-slow test-coverage test-html test-benchmark lint format type-check
.PHONY: clean clean-build clean-pyc clean-test docs docs-serve docs-build
.PHONY: build release pre-commit setup-postgres setup-dev-env check-deps
.PHONY: security-scan performance-report coverage-report docker-build docker-test

# Default target
help: ## Show this help message
	@echo "🚀 Syntha SDK Development Commands"
	@echo "=================================="
	@echo ""
	@echo "Setup Commands:"
	@echo "  install          Install package in development mode"
	@echo "  install-dev      Install with all development dependencies"
	@echo "  setup-dev-env    Complete development environment setup"
	@echo "  setup-postgres   Setup PostgreSQL for testing"
	@echo ""
	@echo "Testing Commands:"
	@echo "  test             Run all tests with coverage"
	@echo "  test-unit        Run unit tests only"
	@echo "  test-integration Run integration tests only"
	@echo "  test-security    Run security tests only"
	@echo "  test-performance Run performance tests only"
	@echo "  test-fast        Run fast tests (skip slow ones)"
	@echo "  test-slow        Run slow tests only"
	@echo "  test-coverage    Run tests with HTML coverage report"
	@echo "  test-html        Generate HTML test report"
	@echo "  test-benchmark   Run benchmark tests"
	@echo ""
	@echo "Code Quality Commands:"
	@echo "  lint             Run all linting checks"
	@echo "  format           Format code with black and isort"
	@echo "  type-check       Run type checking with mypy"
	@echo "  security-scan    Run security scanning with bandit"
	@echo "  pre-commit       Run pre-commit hooks"
	@echo ""
	@echo "Build Commands:"
	@echo "  build            Build distribution packages"
	@echo "  clean            Clean all build artifacts"
	@echo "  clean-build      Clean build directories"
	@echo "  clean-pyc        Clean Python bytecode files"
	@echo "  clean-test       Clean test artifacts"
	@echo ""
	@echo "Documentation Commands:"
	@echo "  docs             Build documentation"
	@echo "  docs-serve       Serve documentation locally"
	@echo "  docs-build       Build documentation for production"
	@echo ""
	@echo "Release Commands:"
	@echo "  release          Create a new release"
	@echo "  check-deps       Check for dependency issues"
	@echo ""
	@echo "Docker Commands:"
	@echo "  docker-build     Build Docker image for testing"
	@echo "  docker-test      Run tests in Docker container"
	@echo ""
	@echo "Report Commands:"
	@echo "  coverage-report  Generate detailed coverage report"
	@echo "  performance-report Generate performance report"
	@echo ""
	@echo "Use 'make <target>' to run a specific command."

# Installation and Setup
install: ## Install package in development mode
	@echo "📦 Installing Syntha SDK in development mode..."
	pip install -e .

install-dev: ## Install with all development dependencies
	@echo "📦 Installing development dependencies..."
	pip install -e .
	pip install -r requirements-test.txt
	pip install pre-commit
	pre-commit install

setup-dev-env: install-dev ## Complete development environment setup
	@echo "🔧 Setting up development environment..."
	python -c "import syntha; print(f'✅ Syntha SDK {syntha.__version__} installed successfully')"
	@echo "🧪 Running quick test to verify installation..."
	python -m pytest tests/unit/test_context.py -v -k "test_context_mesh_initialization"
	@echo "✅ Development environment ready!"

setup-postgres: ## Setup PostgreSQL for testing
	@echo "🐘 Setting up PostgreSQL for testing..."
	python docs/POSTGRESQL_TESTING.md || echo "📖 See docs/POSTGRESQL_TESTING.md for setup instructions"

# Testing
test: ## Run all tests with coverage
	@echo "🧪 Running all tests with coverage..."
	python -m pytest tests/ -v --cov=syntha --cov-report=term-missing --cov-report=html

test-unit: ## Run unit tests only
	@echo "🔧 Running unit tests..."
	python -m pytest tests/unit/ -v

test-integration: ## Run integration tests only
	@echo "🔗 Running integration tests..."
	python -m pytest tests/integration/ -v

test-security: ## Run security tests only
	@echo "🔒 Running security tests..."
	python -m pytest tests/security/ -v

test-performance: ## Run performance tests only
	@echo "⚡ Running performance tests..."
	python -m pytest tests/performance/ -v --benchmark-only

test-fast: ## Run fast tests (skip slow ones)
	@echo "🚀 Running fast tests..."
	python -m pytest tests/ -v -m "not slow"

test-slow: ## Run slow tests only
	@echo "🐌 Running slow tests..."
	python -m pytest tests/ -v -m "slow"

test-coverage: ## Run tests with HTML coverage report
	@echo "📊 Running tests with HTML coverage report..."
	python -m pytest tests/ --cov=syntha --cov-report=html --cov-report=term-missing
	@echo "📄 Coverage report generated in htmlcov/index.html"

test-html: ## Generate HTML test report
	@echo "📄 Generating HTML test report..."
	python -m pytest tests/ --html=reports/test-report.html --self-contained-html
	@echo "📄 Test report generated in reports/test-report.html"

test-benchmark: ## Run benchmark tests
	@echo "⚡ Running benchmark tests..."
	python -m pytest tests/performance/ --benchmark-only --benchmark-json=reports/benchmark.json
	@echo "📊 Benchmark results saved to reports/benchmark.json"

# Code Quality
lint: ## Run all linting checks
	@echo "🔍 Running linting checks..."
	@echo "  📋 Running flake8..."
	flake8 syntha tests --count --select=E9,F63,F7,F82 --show-source --statistics
	flake8 syntha tests --count --exit-zero --max-complexity=10 --max-line-length=88 --statistics
	@echo "  📐 Checking import sorting..."
	isort --check-only syntha tests
	@echo "  🎨 Checking code formatting..."
	black --check syntha tests
	@echo "✅ All linting checks passed!"

format: ## Format code with black and isort
	@echo "🎨 Formatting code..."
	black syntha tests
	isort syntha tests
	@echo "✅ Code formatted successfully!"

type-check: ## Run type checking with mypy
	@echo "🔍 Running type checking..."
	mypy syntha
	@echo "✅ Type checking passed!"

security-scan: ## Run security scanning with bandit
	@echo "🔒 Running security scan..."
	bandit -r syntha -f json -o reports/security-scan.json
	bandit -r syntha
	@echo "✅ Security scan completed!"

pre-commit: ## Run pre-commit hooks
	@echo "🎯 Running pre-commit hooks..."
	pre-commit run --all-files

# Build and Clean
build: clean ## Build distribution packages
	@echo "📦 Building distribution packages..."
	python -m build
	@echo "✅ Build completed! Check dist/ directory"

clean: clean-build clean-pyc clean-test ## Clean all build artifacts
	@echo "🧹 Cleaning all build artifacts..."

clean-build: ## Clean build directories
	@echo "🧹 Cleaning build directories..."
	rm -rf build/
	rm -rf dist/
	rm -rf *.egg-info/
	rm -rf .eggs/

clean-pyc: ## Clean Python bytecode files
	@echo "🧹 Cleaning Python bytecode files..."
	find . -name '*.pyc' -delete
	find . -name '*.pyo' -delete
	find . -name '*~' -delete
	find . -name '__pycache__' -type d -exec rm -rf {} +

clean-test: ## Clean test artifacts
	@echo "🧹 Cleaning test artifacts..."
	rm -rf .pytest_cache/
	rm -rf .coverage
	rm -rf htmlcov/
	rm -rf .tox/
	rm -rf reports/

# Documentation
docs: ## Build documentation
	@echo "📚 Building documentation..."
	cd docs-new && mkdocs build
	@echo "✅ Documentation built successfully!"

docs-serve: ## Serve documentation locally
	@echo "📚 Serving documentation locally..."
	cd docs-new && mkdocs serve
	@echo "📖 Documentation available at http://localhost:8000"

docs-build: ## Build documentation for production
	@echo "📚 Building documentation for production..."
	cd docs-new && mkdocs build --clean --strict
	@echo "✅ Production documentation built!"

# Release Management
release: ## Create a new release
	@echo "🚀 Creating new release..."
	@echo "🔍 Checking if working directory is clean..."
	git diff --quiet && git diff --staged --quiet || (echo "❌ Working directory not clean. Commit changes first." && exit 1)
	@echo "🧪 Running full test suite..."
	$(MAKE) test
	@echo "🔍 Running security scan..."
	$(MAKE) security-scan
	@echo "📦 Building distribution..."
	$(MAKE) build
	@echo "✅ Release preparation completed!"
	@echo "📝 Next steps:"
	@echo "  1. Update CHANGELOG.md"
	@echo "  2. Update version in pyproject.toml and syntha/__init__.py"
	@echo "  3. Commit changes: git commit -m 'Release vX.Y.Z'"
	@echo "  4. Create tag: git tag -a vX.Y.Z -m 'Release vX.Y.Z'"
	@echo "  5. Push: git push origin main --tags"

check-deps: ## Check for dependency issues
	@echo "🔍 Checking dependencies..."
	pip check
	pip list --outdated
	@echo "✅ Dependency check completed!"

# Docker
docker-build: ## Build Docker image for testing
	@echo "🐳 Building Docker image..."
	docker build -t syntha-sdk-test -f Dockerfile.test .

docker-test: ## Run tests in Docker container
	@echo "🐳 Running tests in Docker container..."
	docker run --rm -v $(PWD):/app syntha-sdk-test make test

# Reports
coverage-report: ## Generate detailed coverage report
	@echo "📊 Generating detailed coverage report..."
	python -m pytest tests/ --cov=syntha --cov-report=html --cov-report=term-missing --cov-report=xml
	python tests/test_coverage_analysis.py > reports/coverage-analysis.txt
	@echo "📄 Coverage reports generated:"
	@echo "  - HTML: htmlcov/index.html"
	@echo "  - XML: coverage.xml"
	@echo "  - Analysis: reports/coverage-analysis.txt"

performance-report: ## Generate performance report
	@echo "📊 Generating performance report..."
	python -m pytest tests/performance/ --benchmark-only --benchmark-json=reports/benchmark.json
	@echo "📄 Performance report generated: reports/benchmark.json"

# Utility targets
.PHONY: init-reports-dir
init-reports-dir:
	@mkdir -p reports

# Ensure reports directory exists for relevant targets
test-html coverage-report performance-report security-scan: init-reports-dir 