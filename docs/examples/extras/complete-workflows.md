# Complete Workflows

Comprehensive examples of end-to-end workflows using Syntha for complex multi-agent scenarios.

## Overview

Complete workflows demonstrate:
- Multi-agent coordination
- Complex data processing pipelines
- Real-world use case implementations
- Best practices for production systems

## Workflow: Sales Data Analysis Pipeline

```python
#!/usr/bin/env python3
"""
Complete Sales Data Analysis Workflow

A comprehensive example showing how multiple agents work together
to process sales data, generate reports, and provide insights.
"""

from syntha import ContextMesh, ToolHandler
from syntha.framework_adapters import create_framework_adapter
import json
from datetime import datetime, timedelta

class SalesAnalysisWorkflow:
    def __init__(self, user_id: str):
        self.mesh = ContextMesh(user_id=user_id)
        self.setup_agents()
        self.setup_workflow()
    
    def setup_agents(self):
        """Create specialized agents for different workflow stages."""
        
        # Data ingestion agent
        self.data_collector = ToolHandler(self.mesh, "DataCollector")
        
        # Data validation and cleaning agent
        self.data_cleaner = ToolHandler(self.mesh, "DataCleaner")
        
        # Statistical analysis agent
        self.analyst = ToolHandler(self.mesh, "StatisticalAnalyst")
        
        # Visualization agent
        self.visualizer = ToolHandler(self.mesh, "DataVisualizer")
        
        # Report generation agent
        self.reporter = ToolHandler(self.mesh, "ReportGenerator")
        
        # Quality assurance agent
        self.qa_agent = ToolHandler(self.mesh, "QualityAssurance")
        
        # Notification agent
        self.notifier = ToolHandler(self.mesh, "NotificationManager")
    
    def setup_workflow(self):
        """Set up inter-agent workflow subscriptions."""
        
        # Data cleaning subscribes to raw data
        self.data_cleaner.subscribe_to_topic("raw_data", self.handle_data_cleaning)
        
        # Analysis subscribes to cleaned data
        self.analyst.subscribe_to_topic("cleaned_data", self.handle_analysis)
        
        # Visualization subscribes to analysis results
        self.visualizer.subscribe_to_topic("analysis_results", self.handle_visualization)
        
        # Report generation subscribes to visualizations
        self.reporter.subscribe_to_topic("visualizations", self.handle_report_generation)
        
        # QA subscribes to draft reports
        self.qa_agent.subscribe_to_topic("draft_reports", self.handle_quality_check)
        
        # Notifications subscribe to final reports
        self.notifier.subscribe_to_topic("final_reports", self.handle_notifications)
    
    def handle_data_cleaning(self, topic, context_key, data):
        """Clean and validate incoming data."""
        
        print(f"🧹 DataCleaner processing: {context_key}")
        
        # Simulate data cleaning
        cleaned_data = {
            "sales_data": [sale for sale in data.get("sales_data", []) if sale.get("amount", 0) > 0],
            "period": data.get("period"),
            "region": data.get("region"),
            "cleaned_at": datetime.now().isoformat(),
            "original_records": len(data.get("sales_data", [])),
            "valid_records": len([s for s in data.get("sales_data", []) if s.get("amount", 0) > 0])
        }
        
        # Store cleaned data
        self.data_cleaner.push_context(
            f"cleaned_{context_key}",
            cleaned_data,
            topic="cleaned_data"
        )
        
        print(f"   ✅ Cleaned {cleaned_data['valid_records']}/{cleaned_data['original_records']} records")
    
    def handle_analysis(self, topic, context_key, data):
        """Perform statistical analysis on cleaned data."""
        
        print(f"📊 StatisticalAnalyst processing: {context_key}")
        
        sales_data = data.get("sales_data", [])
        amounts = [sale.get("amount", 0) for sale in sales_data]
        
        if amounts:
            analysis = {
                "total_sales": sum(amounts),
                "average_sale": sum(amounts) / len(amounts),
                "median_sale": sorted(amounts)[len(amounts) // 2],
                "min_sale": min(amounts),
                "max_sale": max(amounts),
                "num_transactions": len(amounts),
                "period": data.get("period"),
                "region": data.get("region"),
                "growth_rate": self.calculate_growth_rate(amounts),
                "analyzed_at": datetime.now().isoformat()
            }
        else:
            analysis = {"error": "No valid sales data found"}
        
        # Store analysis results
        self.analyst.push_context(
            f"analysis_{context_key}",
            analysis,
            topic="analysis_results"
        )
        
        if "error" not in analysis:
            print(f"   ✅ Analysis complete: ${analysis['total_sales']:,.2f} total sales")
        else:
            print(f"   ❌ Analysis failed: {analysis['error']}")
    
    def calculate_growth_rate(self, amounts):
        """Calculate growth rate from sales data."""
        if len(amounts) < 2:
            return 0
        
        # Simple growth calculation (last vs first)
        return ((amounts[-1] - amounts[0]) / amounts[0]) * 100 if amounts[0] != 0 else 0
    
    def handle_visualization(self, topic, context_key, data):
        """Create visualizations from analysis results."""
        
        print(f"📈 DataVisualizer processing: {context_key}")
        
        if "error" in data:
            print(f"   ❌ Skipping visualization due to analysis error")
            return
        
        # Create visualization specifications
        viz_config = {
            "charts": [
                {
                    "type": "bar",
                    "title": f"Sales Summary - {data['period']}",
                    "data": {
                        "Total Sales": data["total_sales"],
                        "Average Sale": data["average_sale"],
                        "Number of Transactions": data["num_transactions"]
                    }
                },
                {
                    "type": "line",
                    "title": "Sales Trend",
                    "data": {
                        "Growth Rate": data["growth_rate"]
                    }
                }
            ],
            "summary_stats": {
                "total": data["total_sales"],
                "count": data["num_transactions"],
                "average": data["average_sale"]
            },
            "created_at": datetime.now().isoformat()
        }
        
        # Store visualization config
        self.visualizer.push_context(
            f"viz_{context_key}",
            viz_config,
            topic="visualizations"
        )
        
        print(f"   ✅ Created {len(viz_config['charts'])} visualizations")
    
    def handle_report_generation(self, topic, context_key, data):
        """Generate comprehensive report from visualizations and analysis."""
        
        print(f"📝 ReportGenerator processing: {context_key}")
        
        # Get corresponding analysis data
        analysis_key = context_key.replace("viz_", "analysis_")
        analysis_data = None
        
        try:
            # Try to get analysis data from context
            all_analysis = self.analyst.get_context_by_topic("analysis_results")
            for key, value in all_analysis.items():
                if analysis_key in key:
                    analysis_data = value
                    break
        except:
            pass
        
        if not analysis_data:
            print(f"   ❌ Could not find analysis data for report")
            return
        
        # Generate comprehensive report
        report = {
            "title": f"Sales Analysis Report - {analysis_data.get('period', 'Unknown Period')}",
            "executive_summary": self.generate_executive_summary(analysis_data),
            "key_findings": self.generate_key_findings(analysis_data),
            "recommendations": self.generate_recommendations(analysis_data),
            "detailed_metrics": analysis_data,
            "visualizations": data,
            "generated_at": datetime.now().isoformat(),
            "report_id": f"RPT_{int(datetime.now().timestamp())}"
        }
        
        # Store draft report
        self.reporter.push_context(
            f"report_{report['report_id']}",
            report,
            topic="draft_reports"
        )
        
        print(f"   ✅ Generated report: {report['report_id']}")
    
    def generate_executive_summary(self, analysis):
        """Generate executive summary from analysis data."""
        
        total = analysis.get("total_sales", 0)
        count = analysis.get("num_transactions", 0)
        avg = analysis.get("average_sale", 0)
        growth = analysis.get("growth_rate", 0)
        
        summary = f"""
        Sales performance for {analysis.get('period', 'the reporting period')} shows 
        total revenue of ${total:,.2f} from {count:,} transactions, 
        with an average transaction value of ${avg:,.2f}.
        """
        
        if growth > 0:
            summary += f" The period shows positive growth of {growth:.1f}%."
        elif growth < 0:
            summary += f" The period shows a decline of {abs(growth):.1f}%."
        else:
            summary += " Performance remained stable compared to the previous period."
        
        return summary.strip()
    
    def generate_key_findings(self, analysis):
        """Generate key findings from analysis."""
        
        findings = []
        
        total = analysis.get("total_sales", 0)
        count = analysis.get("num_transactions", 0)
        avg = analysis.get("average_sale", 0)
        min_sale = analysis.get("min_sale", 0)
        max_sale = analysis.get("max_sale", 0)
        
        if total > 1000000:
            findings.append("Revenue exceeded $1M milestone")
        
        if avg > 1000:
            findings.append("High average transaction value indicates premium customer base")
        
        if max_sale > avg * 10:
            findings.append("Significant variation in transaction sizes - potential for customer segmentation")
        
        if count > 500:
            findings.append("High transaction volume indicates strong market engagement")
        
        return findings or ["Standard performance metrics observed"]
    
    def generate_recommendations(self, analysis):
        """Generate actionable recommendations."""
        
        recommendations = []
        
        growth = analysis.get("growth_rate", 0)
        avg = analysis.get("average_sale", 0)
        count = analysis.get("num_transactions", 0)
        
        if growth > 5:
            recommendations.append("Maintain current strategies that are driving positive growth")
        elif growth < -5:
            recommendations.append("Review and adjust sales strategies to address declining performance")
        
        if avg < 100:
            recommendations.append("Focus on upselling and cross-selling to increase average transaction value")
        
        if count < 100:
            recommendations.append("Implement customer acquisition campaigns to increase transaction volume")
        
        recommendations.append("Continue monitoring key performance indicators for early trend detection")
        
        return recommendations
    
    def handle_quality_check(self, topic, context_key, data):
        """Perform quality assurance on draft reports."""
        
        print(f"🔍 QualityAssurance processing: {context_key}")
        
        quality_score = self.calculate_report_quality(data)
        
        qa_result = {
            "report_id": data.get("report_id"),
            "quality_score": quality_score,
            "checks_performed": [
                "Data completeness",
                "Calculation accuracy", 
                "Content clarity",
                "Recommendation relevance"
            ],
            "status": "approved" if quality_score >= 8.0 else "needs_revision",
            "feedback": self.generate_qa_feedback(quality_score),
            "reviewed_at": datetime.now().isoformat()
        }
        
        if qa_result["status"] == "approved":
            # Move to final reports
            final_report = {**data, "qa_approval": qa_result}
            self.qa_agent.push_context(
                f"final_{context_key}",
                final_report,
                topic="final_reports"
            )
        
        print(f"   ✅ QA complete: {qa_result['status']} (score: {quality_score}/10)")
    
    def calculate_report_quality(self, report):
        """Calculate quality score for a report."""
        
        score = 10.0
        
        # Check required sections
        required_sections = ["title", "executive_summary", "key_findings", "recommendations"]
        missing_sections = [s for s in required_sections if not report.get(s)]
        score -= len(missing_sections) * 1.5
        
        # Check data quality
        if not report.get("detailed_metrics", {}).get("total_sales"):
            score -= 1.0
        
        # Check recommendations
        if len(report.get("recommendations", [])) < 2:
            score -= 1.0
        
        return max(0.0, min(10.0, score))
    
    def generate_qa_feedback(self, score):
        """Generate QA feedback based on score."""
        
        if score >= 9.0:
            return "Excellent report quality. Ready for distribution."
        elif score >= 8.0:
            return "Good report quality. Minor improvements suggested."
        elif score >= 6.0:
            return "Acceptable quality with some areas needing attention."
        else:
            return "Report requires significant revision before approval."
    
    def handle_notifications(self, topic, context_key, data):
        """Handle notifications for completed reports."""
        
        print(f"📨 NotificationManager processing: {context_key}")
        
        notification = {
            "type": "report_completed",
            "report_id": data.get("report_id"),
            "report_title": data.get("title"),
            "quality_score": data.get("qa_approval", {}).get("quality_score"),
            "recipients": ["management", "sales_team", "analytics_team"],
            "delivery_methods": ["email", "dashboard"],
            "sent_at": datetime.now().isoformat()
        }
        
        self.notifier.push_context(
            f"notification_{data.get('report_id')}",
            notification,
            topic="notifications_sent"
        )
        
        print(f"   ✅ Notifications sent for: {notification['report_title']}")
    
    def run_workflow(self, sales_data):
        """Execute the complete workflow with sample data."""
        
        print("\n🚀 Starting Complete Sales Analysis Workflow")
        print("=" * 50)
        
        # Step 1: Inject sample sales data
        self.data_collector.push_context(
            "sales_q1_2024",
            sales_data,
            topic="raw_data"
        )
        
        # Allow time for processing
        import time
        time.sleep(0.5)  # Give agents time to process
        
        # Show workflow progress
        print(f"\n📊 Workflow Progress:")
        topics = ["raw_data", "cleaned_data", "analysis_results", "visualizations", "draft_reports", "final_reports"]
        
        for topic in topics:
            try:
                context_data = self.data_collector.get_context_by_topic(topic)
                count = len(context_data) if context_data else 0
                status = "✅" if count > 0 else "⏳"
                print(f"   {status} {topic}: {count} items")
            except:
                print(f"   ⏳ {topic}: 0 items")
        
        # Show final results
        try:
            final_reports = self.data_collector.get_context_by_topic("final_reports")
            if final_reports:
                print(f"\n📋 Generated Reports:")
                for key, report in final_reports.items():
                    print(f"   📄 {report['title']}")
                    print(f"      Quality Score: {report.get('qa_approval', {}).get('quality_score', 'N/A')}/10")
                    print(f"      Generated: {report['generated_at'][:19]}")
        except:
            print(f"\n📋 No final reports generated yet")
    
    def cleanup(self):
        """Clean up workflow resources."""
        self.mesh.close()

def main():
    """Run the complete workflow demonstration."""
    
    # Sample sales data
    sample_data = {
        "sales_data": [
            {"amount": 1250.00, "product": "Software License", "date": "2024-01-15"},
            {"amount": 875.50, "product": "Support Package", "date": "2024-01-16"},
            {"amount": 2100.00, "product": "Enterprise Suite", "date": "2024-01-17"},
            {"amount": 650.25, "product": "Training", "date": "2024-01-18"},
            {"amount": 1800.75, "product": "Consulting", "date": "2024-01-19"},
            {"amount": 425.00, "product": "Basic License", "date": "2024-01-20"},
            {"amount": 3200.00, "product": "Premium Package", "date": "2024-01-21"},
            {"amount": 950.50, "product": "Add-on Module", "date": "2024-01-22"},
        ],
        "period": "Q1_2024",
        "region": "North America",
        "currency": "USD",
        "collected_at": datetime.now().isoformat()
    }
    
    # Create and run workflow
    workflow = SalesAnalysisWorkflow("workflow_demo")
    
    try:
        workflow.run_workflow(sample_data)
    finally:
        workflow.cleanup()

if __name__ == "__main__":
    main()
```

## Key Workflow Patterns

1. **Event-Driven Architecture**: Agents subscribe to topics and react to data changes
2. **Pipeline Processing**: Data flows through sequential processing stages
3. **Quality Gates**: QA checkpoints ensure output quality
4. **Error Handling**: Graceful handling of processing failures
5. **Monitoring**: Track progress through the entire pipeline

## See Also

- [Real-World Use Cases](real-world.md)
- [Multi-Agent Setup](../tools/multi-agent.md)
- [Topic Routing](../context-mesh/topic-routing.md)
