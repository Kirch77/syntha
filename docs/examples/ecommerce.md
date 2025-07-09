# E-commerce Platform Example

A comprehensive example of building a multi-agent e-commerce system using Syntha for context sharing and agent coordination.

## System Overview

This example demonstrates a complete e-commerce platform with multiple specialized agents:

- **ProductCatalogAgent**: Manages product information and inventory
- **RecommendationAgent**: Provides personalized product recommendations
- **OrderProcessingAgent**: Handles order lifecycle management
- **PaymentAgent**: Processes payments and financial transactions
- **ShippingAgent**: Manages shipping and logistics
- **CustomerServiceAgent**: Handles customer inquiries and support
- **InventoryAgent**: Tracks stock levels and reordering
- **AnalyticsAgent**: Provides business intelligence and reporting

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ ProductCatalog  │    │ Recommendation  │    │ CustomerService │
│     Agent       │    │     Agent       │    │     Agent       │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼──────────────┐
                    │       Syntha Mesh          │
                    │                            │
                    │ • Product Data             │
                    │ • User Preferences         │
                    │ • Order Information        │
                    │ • Inventory Levels         │
                    │ • Customer Data            │
                    └─────────────┬──────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
┌─────────▼───────┐    ┌─────────▼───────┐    ┌─────────▼───────┐
│ OrderProcessing │    │    Payment      │    │    Shipping     │
│     Agent       │    │     Agent       │    │     Agent       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Implementation

### System Initialization

```python
from syntha import ContextMesh, ToolHandler, build_system_prompt
import json
import time
from datetime import datetime, timedelta
from typing import Dict, List, Any

class EcommerceSystem:
    def __init__(self):
        # Initialize Syntha with performance optimizations
        self.mesh = ContextMesh(
            enable_indexing=True,
            auto_cleanup=True,
            cleanup_interval=300
        )
        self.handler = ToolHandler(self.mesh)

        # Initialize system data
        self.setup_initial_data()

        # Agent configurations
        self.agents = {
            "ProductCatalogAgent": self.create_product_agent(),
            "RecommendationAgent": self.create_recommendation_agent(),
            "OrderProcessingAgent": self.create_order_agent(),
            "PaymentAgent": self.create_payment_agent(),
            "ShippingAgent": self.create_shipping_agent(),
            "CustomerServiceAgent": self.create_customer_service_agent(),
            "InventoryAgent": self.create_inventory_agent(),
            "AnalyticsAgent": self.create_analytics_agent()
        }

    def setup_initial_data(self):
        """Initialize the system with sample data"""

        # Product catalog
        products = [
            {
                "id": "PROD001",
                "name": "Wireless Headphones",
                "category": "Electronics",
                "price": 99.99,
                "description": "High-quality wireless headphones with noise cancellation",
                "features": ["Bluetooth 5.0", "30hr battery", "Noise cancellation"],
                "stock": 50,
                "rating": 4.5,
                "reviews_count": 1250
            },
            {
                "id": "PROD002",
                "name": "Smart Watch",
                "category": "Electronics",
                "price": 249.99,
                "description": "Fitness tracking smartwatch with health monitoring",
                "features": ["Heart rate monitor", "GPS", "Sleep tracking"],
                "stock": 30,
                "rating": 4.3,
                "reviews_count": 890
            },
            {
                "id": "PROD003",
                "name": "Coffee Maker",
                "category": "Home & Kitchen",
                "price": 79.99,
                "description": "Programmable coffee maker with thermal carafe",
                "features": ["12-cup capacity", "Programmable timer", "Auto shut-off"],
                "stock": 25,
                "rating": 4.2,
                "reviews_count": 567
            }
        ]

        # Store products in context
        for product in products:
            self.handler.handle_tool_call(
                "push_context",
                agent_name="ProductCatalogAgent",
                key=f"products.{product['id']}",
                value=product,
                subscribers=["ProductCatalogAgent", "RecommendationAgent", "OrderProcessingAgent", "InventoryAgent"]
            )

        # Store inventory levels
        inventory_data = {
            "PROD001": {"stock": 50, "reserved": 5, "reorder_level": 10},
            "PROD002": {"stock": 30, "reserved": 3, "reorder_level": 8},
            "PROD003": {"stock": 25, "reserved": 2, "reorder_level": 5}
        }

        self.handler.handle_tool_call(
            "push_context",
            agent_name="InventoryAgent",
            key="inventory_levels",
            value=inventory_data,
            subscribers=["InventoryAgent", "OrderProcessingAgent", "ProductCatalogAgent"]
        )

        # System configuration
        config = {
            "tax_rate": 0.08,
            "shipping_rate": 9.99,
            "free_shipping_threshold": 75.00,
            "payment_methods": ["credit_card", "paypal", "apple_pay"],
            "business_hours": {"start": "09:00", "end": "18:00", "timezone": "UTC"}
        }

        self.handler.handle_tool_call(
            "push_context",
            agent_name="SystemConfig",
            key="ecommerce_config",
            value=config
        )
```

### Product Catalog Agent

```python
    def create_product_agent(self):
        """Creates the product catalog management agent"""

        def search_products(query: str, category: str = None, max_price: float = None) -> List[Dict]:
            """Search products based on criteria"""

            # Get all product keys
            product_keys = self.handler.handle_tool_call(
                "list_context_keys",
                agent_name="ProductCatalogAgent",
                pattern="products.*"
            )

            matching_products = []

            for key in product_keys["keys"]:
                product = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="ProductCatalogAgent",
                    key=key
                )["value"]

                # Apply filters
                if category and product["category"].lower() != category.lower():
                    continue

                if max_price and product["price"] > max_price:
                    continue

                # Search in name and description
                if query.lower() in product["name"].lower() or query.lower() in product["description"].lower():
                    matching_products.append(product)

            return sorted(matching_products, key=lambda x: x["rating"], reverse=True)

        def get_product_details(product_id: str) -> Dict:
            """Get detailed product information"""
            try:
                product = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="ProductCatalogAgent",
                    key=f"products.{product_id}"
                )
                return product["value"]
            except KeyError:
                return {"error": f"Product {product_id} not found"}

        def update_product_stock(product_id: str, new_stock: int) -> Dict:
            """Update product stock level"""
            try:
                product = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="ProductCatalogAgent",
                    key=f"products.{product_id}"
                )["value"]

                product["stock"] = new_stock

                self.handler.handle_tool_call(
                    "push_context",
                    agent_name="ProductCatalogAgent",
                    key=f"products.{product_id}",
                    value=product,
                    subscribers=["ProductCatalogAgent", "RecommendationAgent", "OrderProcessingAgent", "InventoryAgent"]
                )

                # Notify inventory agent
                self.handler.handle_tool_call(
                    "send_message_to_agent",
                    from_agent="ProductCatalogAgent",
                    to_agent="InventoryAgent",
                    message=f"Stock updated for {product_id}: {new_stock} units",
                    message_type="info",
                    priority="normal"
                )

                return {"success": True, "product_id": product_id, "new_stock": new_stock}
            except KeyError:
                return {"error": f"Product {product_id} not found"}

        return {
            "search_products": search_products,
            "get_product_details": get_product_details,
            "update_product_stock": update_product_stock
        }
```

### Recommendation Agent

```python
    def create_recommendation_agent(self):
        """Creates the product recommendation agent"""

        def get_recommendations(user_id: str, num_recommendations: int = 5) -> List[Dict]:
            """Generate personalized product recommendations"""

            # Get user preferences if available
            try:
                user_prefs = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="RecommendationAgent",
                    key=f"user_preferences.{user_id}"
                )["value"]
            except KeyError:
                user_prefs = {"preferred_categories": [], "price_range": [0, 1000]}

            # Get user's order history
            try:
                order_history = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="RecommendationAgent",
                    key=f"user_orders.{user_id}"
                )["value"]
            except KeyError:
                order_history = []

            # Get all products
            product_keys = self.handler.handle_tool_call(
                "list_context_keys",
                agent_name="RecommendationAgent",
                pattern="products.*"
            )

            recommendations = []
            purchased_products = {order["product_id"] for order in order_history}

            for key in product_keys["keys"]:
                product = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="RecommendationAgent",
                    key=key
                )["value"]

                # Skip already purchased products
                if product["id"] in purchased_products:
                    continue

                # Calculate recommendation score
                score = product["rating"]

                # Boost score for preferred categories
                if product["category"] in user_prefs.get("preferred_categories", []):
                    score += 1.0

                # Boost score if price is in preferred range
                price_range = user_prefs.get("price_range", [0, 1000])
                if price_range[0] <= product["price"] <= price_range[1]:
                    score += 0.5

                recommendations.append({
                    "product": product,
                    "score": score,
                    "reason": self._generate_recommendation_reason(product, user_prefs)
                })

            # Sort by score and return top recommendations
            recommendations.sort(key=lambda x: x["score"], reverse=True)
            return recommendations[:num_recommendations]

        def update_user_preferences(user_id: str, preferences: Dict) -> Dict:
            """Update user preferences for better recommendations"""
            self.handler.handle_tool_call(
                "push_context",
                agent_name="RecommendationAgent",
                key=f"user_preferences.{user_id}",
                value=preferences,
                ttl=86400 * 30  # Keep for 30 days
            )
            return {"success": True, "user_id": user_id}

        def _generate_recommendation_reason(self, product: Dict, user_prefs: Dict) -> str:
            """Generate explanation for recommendation"""
            reasons = []

            if product["category"] in user_prefs.get("preferred_categories", []):
                reasons.append(f"matches your interest in {product['category']}")

            if product["rating"] >= 4.0:
                reasons.append(f"highly rated ({product['rating']}/5)")

            if product["reviews_count"] > 100:
                reasons.append("popular choice")

            return "Recommended because: " + ", ".join(reasons) if reasons else "Popular product"

        return {
            "get_recommendations": get_recommendations,
            "update_user_preferences": update_user_preferences
        }
```

### Order Processing Agent

```python
    def create_order_agent(self):
        """Creates the order processing agent"""

        def create_order(user_id: str, items: List[Dict], shipping_address: Dict) -> Dict:
            """Create a new order"""
            order_id = f"ORDER_{int(time.time())}_{user_id}"

            # Validate inventory
            for item in items:
                product = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="OrderProcessingAgent",
                    key=f"products.{item['product_id']}"
                )["value"]

                if product["stock"] < item["quantity"]:
                    return {
                        "error": f"Insufficient stock for {product['name']}. Available: {product['stock']}, Requested: {item['quantity']}"
                    }

            # Calculate totals
            subtotal = sum(item["quantity"] * self._get_product_price(item["product_id"]) for item in items)

            config = self.handler.handle_tool_call(
                "get_context",
                agent_name="OrderProcessingAgent",
                key="ecommerce_config"
            )["value"]

            tax = subtotal * config["tax_rate"]
            shipping = 0 if subtotal >= config["free_shipping_threshold"] else config["shipping_rate"]
            total = subtotal + tax + shipping

            # Create order
            order = {
                "order_id": order_id,
                "user_id": user_id,
                "items": items,
                "shipping_address": shipping_address,
                "subtotal": subtotal,
                "tax": tax,
                "shipping": shipping,
                "total": total,
                "status": "pending",
                "created_at": datetime.now().isoformat(),
                "estimated_delivery": (datetime.now() + timedelta(days=5)).isoformat()
            }

            # Store order
            self.handler.handle_tool_call(
                "push_context",
                agent_name="OrderProcessingAgent",
                key=f"orders.{order_id}",
                value=order,
                subscribers=["OrderProcessingAgent", "PaymentAgent", "ShippingAgent", "CustomerServiceAgent"]
            )

            # Reserve inventory
            self._reserve_inventory(items)

            # Notify payment agent
            self.handler.handle_tool_call(
                "send_message_to_agent",
                from_agent="OrderProcessingAgent",
                to_agent="PaymentAgent",
                message=f"New order created: {order_id}, Total: ${total:.2f}",
                message_type="task",
                priority="normal"
            )

            return {"success": True, "order": order}

        def update_order_status(order_id: str, new_status: str, notes: str = "") -> Dict:
            """Update order status"""
            try:
                order = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="OrderProcessingAgent",
                    key=f"orders.{order_id}"
                )["value"]

                old_status = order["status"]
                order["status"] = new_status
                order["status_updated_at"] = datetime.now().isoformat()

                if notes:
                    if "notes" not in order:
                        order["notes"] = []
                    order["notes"].append({
                        "timestamp": datetime.now().isoformat(),
                        "note": notes
                    })

                # Update order
                self.handler.handle_tool_call(
                    "push_context",
                    agent_name="OrderProcessingAgent",
                    key=f"orders.{order_id}",
                    value=order,
                    subscribers=["OrderProcessingAgent", "PaymentAgent", "ShippingAgent", "CustomerServiceAgent"]
                )

                # Notify relevant agents based on status
                if new_status == "paid":
                    self.handler.handle_tool_call(
                        "send_message_to_agent",
                        from_agent="OrderProcessingAgent",
                        to_agent="ShippingAgent",
                        message=f"Order {order_id} is paid and ready for shipping",
                        message_type="task",
                        priority="normal"
                    )
                elif new_status == "cancelled":
                    self._release_inventory(order["items"])

                return {"success": True, "order_id": order_id, "old_status": old_status, "new_status": new_status}
            except KeyError:
                return {"error": f"Order {order_id} not found"}

        def _get_product_price(self, product_id: str) -> float:
            """Get product price"""
            product = self.handler.handle_tool_call(
                "get_context",
                agent_name="OrderProcessingAgent",
                key=f"products.{product_id}"
            )["value"]
            return product["price"]

        def _reserve_inventory(self, items: List[Dict]):
            """Reserve inventory for order items"""
            inventory = self.handler.handle_tool_call(
                "get_context",
                agent_name="OrderProcessingAgent",
                key="inventory_levels"
            )["value"]

            for item in items:
                if item["product_id"] in inventory:
                    inventory[item["product_id"]]["reserved"] += item["quantity"]
                    inventory[item["product_id"]]["stock"] -= item["quantity"]

            self.handler.handle_tool_call(
                "push_context",
                agent_name="OrderProcessingAgent",
                key="inventory_levels",
                value=inventory,
                subscribers=["InventoryAgent", "OrderProcessingAgent", "ProductCatalogAgent"]
            )

        def _release_inventory(self, items: List[Dict]):
            """Release reserved inventory (for cancelled orders)"""
            inventory = self.handler.handle_tool_call(
                "get_context",
                agent_name="OrderProcessingAgent",
                key="inventory_levels"
            )["value"]

            for item in items:
                if item["product_id"] in inventory:
                    inventory[item["product_id"]]["reserved"] -= item["quantity"]
                    inventory[item["product_id"]]["stock"] += item["quantity"]

            self.handler.handle_tool_call(
                "push_context",
                agent_name="OrderProcessingAgent",
                key="inventory_levels",
                value=inventory,
                subscribers=["InventoryAgent", "OrderProcessingAgent", "ProductCatalogAgent"]
            )

        return {
            "create_order": create_order,
            "update_order_status": update_order_status
        }
```

### Customer Service Agent

```python
    def create_customer_service_agent(self):
        """Creates the customer service agent"""

        def handle_customer_inquiry(user_id: str, inquiry_type: str, message: str) -> Dict:
            """Handle various customer service inquiries"""

            inquiry_id = f"INQ_{int(time.time())}_{user_id}"

            # Store inquiry
            inquiry = {
                "inquiry_id": inquiry_id,
                "user_id": user_id,
                "type": inquiry_type,
                "message": message,
                "status": "open",
                "created_at": datetime.now().isoformat(),
                "responses": []
            }

            self.handler.handle_tool_call(
                "push_context",
                agent_name="CustomerServiceAgent",
                key=f"inquiries.{inquiry_id}",
                value=inquiry
            )

            # Route inquiry based on type
            response = self._route_inquiry(inquiry_type, user_id, message)

            # Add response to inquiry
            inquiry["responses"].append({
                "timestamp": datetime.now().isoformat(),
                "response": response,
                "agent": "CustomerServiceAgent"
            })

            # Update inquiry
            self.handler.handle_tool_call(
                "push_context",
                agent_name="CustomerServiceAgent",
                key=f"inquiries.{inquiry_id}",
                value=inquiry
            )

            return {"inquiry_id": inquiry_id, "response": response}

        def get_order_status(user_id: str, order_id: str) -> Dict:
            """Get order status for customer"""
            try:
                order = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="CustomerServiceAgent",
                    key=f"orders.{order_id}"
                )["value"]

                # Verify order belongs to user
                if order["user_id"] != user_id:
                    return {"error": "Order not found"}

                return {
                    "order_id": order_id,
                    "status": order["status"],
                    "total": order["total"],
                    "estimated_delivery": order.get("estimated_delivery"),
                    "tracking_number": order.get("tracking_number")
                }
            except KeyError:
                return {"error": "Order not found"}

        def process_return_request(user_id: str, order_id: str, reason: str, items: List[str]) -> Dict:
            """Process return request"""
            try:
                order = self.handler.handle_tool_call(
                    "get_context",
                    agent_name="CustomerServiceAgent",
                    key=f"orders.{order_id}"
                )["value"]

                if order["user_id"] != user_id:
                    return {"error": "Order not found"}

                return_id = f"RET_{int(time.time())}_{order_id}"

                return_request = {
                    "return_id": return_id,
                    "order_id": order_id,
                    "user_id": user_id,
                    "reason": reason,
                    "items": items,
                    "status": "pending_approval",
                    "created_at": datetime.now().isoformat()
                }

                self.handler.handle_tool_call(
                    "push_context",
                    agent_name="CustomerServiceAgent",
                    key=f"returns.{return_id}",
                    value=return_request
                )

                return {"success": True, "return_id": return_id, "status": "Return request submitted"}
            except KeyError:
                return {"error": "Order not found"}

        def _route_inquiry(self, inquiry_type: str, user_id: str, message: str) -> str:
            """Route inquiry to appropriate response"""
            if inquiry_type == "order_status":
                # Extract order ID from message if possible
                words = message.split()
                for word in words:
                    if word.startswith("ORDER_"):
                        status = self.get_order_status(user_id, word)
                        if "error" not in status:
                            return f"Your order {word} is currently {status['status']}. Estimated delivery: {status.get('estimated_delivery', 'TBD')}"
                return "Please provide your order number so I can check the status for you."

            elif inquiry_type == "product_question":
                return "Thank you for your product question. Our product specialists will review your inquiry and respond within 24 hours."

            elif inquiry_type == "technical_support":
                return "I've forwarded your technical support request to our specialists. You can expect a response within 4 hours during business hours."

            elif inquiry_type == "billing":
                return "For billing inquiries, please verify your account details. Our billing team will review your request within 1 business day."

            else:
                return "Thank you for contacting us. Your inquiry has been received and will be reviewed by our team."

        return {
            "handle_customer_inquiry": handle_customer_inquiry,
            "get_order_status": get_order_status,
            "process_return_request": process_return_request
        }
```

## Usage Examples

### Complete Customer Journey

```python
def demonstrate_customer_journey():
    """Demonstrate a complete customer journey"""

    # Initialize system
    ecommerce = EcommerceSystem()

    # 1. Customer searches for products
    print("=== Product Search ===")
    search_results = ecommerce.agents["ProductCatalogAgent"]["search_products"]("wireless", "Electronics", 150.00)
    for product in search_results:
        print(f"- {product['name']}: ${product['price']} (Rating: {product['rating']}/5)")

    # 2. Get personalized recommendations
    print("\n=== Personalized Recommendations ===")
    user_id = "user_12345"

    # Set user preferences
    ecommerce.agents["RecommendationAgent"]["update_user_preferences"](
        user_id,
        {"preferred_categories": ["Electronics"], "price_range": [50, 200]}
    )

    recommendations = ecommerce.agents["RecommendationAgent"]["get_recommendations"](user_id, 3)
    for rec in recommendations:
        product = rec["product"]
        print(f"- {product['name']}: ${product['price']} - {rec['reason']}")

    # 3. Create order
    print("\n=== Order Creation ===")
    order_items = [
        {"product_id": "PROD001", "quantity": 1},
        {"product_id": "PROD003", "quantity": 1}
    ]

    shipping_address = {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
    }

    order_result = ecommerce.agents["OrderProcessingAgent"]["create_order"](
        user_id, order_items, shipping_address
    )

    if "error" in order_result:
        print(f"Order failed: {order_result['error']}")
        return

    order = order_result["order"]
    print(f"Order created: {order['order_id']}")
    print(f"Total: ${order['total']:.2f}")

    # 4. Customer service inquiry
    print("\n=== Customer Service ===")
    service_result = ecommerce.agents["CustomerServiceAgent"]["handle_customer_inquiry"](
        user_id, "order_status", f"What's the status of my order {order['order_id']}?"
    )
    print(f"Service response: {service_result['response']}")

    # 5. Update order status (simulate payment and shipping)
    print("\n=== Order Status Updates ===")
    ecommerce.agents["OrderProcessingAgent"]["update_order_status"](
        order["order_id"], "paid", "Payment processed successfully"
    )
    print("Order marked as paid")

    ecommerce.agents["OrderProcessingAgent"]["update_order_status"](
        order["order_id"], "shipped", "Package shipped via FedEx"
    )
    print("Order shipped")

# Run the demonstration
if __name__ == "__main__":
    demonstrate_customer_journey()
```

### Advanced Features

```python
def demonstrate_advanced_features():
    """Demonstrate advanced e-commerce features"""

    ecommerce = EcommerceSystem()

    # Inventory management
    print("=== Inventory Management ===")
    low_stock_check = ecommerce.agents["InventoryAgent"]["check_low_stock"]()
    print(f"Low stock items: {low_stock_check}")

    # Analytics and reporting
    print("\n=== Analytics ===")
    sales_report = ecommerce.agents["AnalyticsAgent"]["generate_sales_report"](
        start_date="2024-01-01",
        end_date="2024-01-31"
    )
    print(f"Monthly sales: ${sales_report['total_revenue']:.2f}")

    # Real-time notifications
    print("\n=== Real-time Notifications ===")
    ecommerce.setup_real_time_notifications()

    # A/B testing for recommendations
    print("\n=== A/B Testing ===")
    test_results = ecommerce.run_recommendation_ab_test("user_12345")
    print(f"A/B test results: {test_results}")

if __name__ == "__main__":
    demonstrate_advanced_features()
```

## Key Features Demonstrated

### 1. Context Sharing

- Product data shared across all agents
- Inventory levels synchronized in real-time
- Order information accessible to relevant agents
- Customer preferences maintained across sessions

### 2. Agent Communication

- Order processing notifications to payment and shipping
- Customer service routing to specialized agents
- Inventory alerts to procurement systems
- Status updates broadcasted to relevant stakeholders

### 3. Access Control

- Sensitive payment data restricted to payment agent
- Customer personal data controlled by privacy settings
- Admin functions accessible only to authorized agents
- Order data shared with fulfillment-related agents

### 4. Performance Optimization

- Indexed product catalog for fast searches
- Cached user preferences and recommendations
- Batch inventory updates for efficiency
- Auto-cleanup of expired session data

### 5. Error Handling

- Inventory validation before order creation
- Graceful degradation when services are unavailable
- Comprehensive error messages for debugging
- Rollback capabilities for failed transactions

## Production Considerations

### Scalability

- Use database backends for large product catalogs
- Implement caching layers for frequent queries
- Consider microservices architecture for agent separation
- Use message queues for async communication

### Security

- Encrypt sensitive customer data
- Implement proper authentication and authorization
- Use HTTPS for all external communications
- Regular security audits and updates

### Monitoring

- Track key business metrics (conversion rates, cart abandonment)
- Monitor system performance and response times
- Set up alerts for critical failures
- Implement comprehensive logging

### Integration

- Connect with external payment processors
- Integrate with shipping providers' APIs
- Sync with inventory management systems
- Connect to customer support platforms

## Next Steps

- Explore [Performance Optimization](../guides/performance.md) for scaling this system
- Review [Security Guide](../guides/security.md) for production security
- Check [Multi-Agent Patterns](../guides/best-practices.md) for architectural guidance

## See Also

- [Context Management Tutorial](../tutorials/context-management.md) - Advanced context patterns
- [Agent Communication Tutorial](../tutorials/agent-communication.md) - Inter-agent messaging
- [Customer Support Example](customer-support.md) - Specialized customer service system
