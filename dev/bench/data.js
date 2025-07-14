window.BENCHMARK_DATA = {
  "lastUpdate": 1752520522458,
  "repoUrl": "https://github.com/Kirch77/Syntha_v2",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "rylan.kirchmair@gmail.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "rylan.kirchmair@gmail.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "distinct": true,
          "id": "247d21553589585a72670ea38a9386899e2da614",
          "message": "Enhance CI workflow and error handling in integration tests\n\n- Added permissions for GitHub Actions to allow write access for contents, pages, and id-token.\n- Updated benchmark action conditions to only run on pushes to the main branch, with additional parameters for alert thresholds and comments.\n- Changed type hint for keys in build_custom_prompt from list to List for consistency.\n- Improved error handling in integration tests by ensuring exceptions are raised correctly in PostgreSQL connection checks.\n\nThese changes improve CI functionality and maintainability of the codebase.",
          "timestamp": "2025-07-14T15:14:38-04:00",
          "tree_id": "76d9252c9aeb746d2e34ad6520f45e0280c9a9c7",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/247d21553589585a72670ea38a9386899e2da614"
        },
        "date": 1752520522085,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 304937.96111385967,
            "unit": "iter/sec",
            "range": "stddev: 6.65915914665173e-7",
            "extra": "mean: 3.2793555657919993 usec\nrounds: 25953"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 485183.3339433919,
            "unit": "iter/sec",
            "range": "stddev: 5.251483023401336e-7",
            "extra": "mean: 2.061076566402987 usec\nrounds: 112778"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2198.50432400743,
            "unit": "iter/sec",
            "range": "stddev: 0.00001430978709934493",
            "extra": "mean: 454.85468874457416 usec\nrounds: 2310"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4902.739596095156,
            "unit": "iter/sec",
            "range": "stddev: 0.000006081846512137311",
            "extra": "mean: 203.96759411747294 usec\nrounds: 4590"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 700.2456317235853,
            "unit": "iter/sec",
            "range": "stddev: 0.00006826679240998748",
            "extra": "mean: 1.4280703151815441 msec\nrounds: 606"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1791.2876070740758,
            "unit": "iter/sec",
            "range": "stddev: 0.000019647635509327105",
            "extra": "mean: 558.257644417816 usec\nrounds: 2517"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 514329.61678242474,
            "unit": "iter/sec",
            "range": "stddev: 5.464042977499793e-7",
            "extra": "mean: 1.9442784692350836 usec\nrounds: 1124"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 25.250911899137805,
            "unit": "iter/sec",
            "range": "stddev: 0.0015053012083001153",
            "extra": "mean: 39.602530157896794 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104361.77096312991,
            "unit": "iter/sec",
            "range": "stddev: 0.00000177916600005809",
            "extra": "mean: 9.582052803159993 usec\nrounds: 13806"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1212.5192747314513,
            "unit": "iter/sec",
            "range": "stddev: 0.00001671234031253797",
            "extra": "mean: 824.7291575810042 usec\nrounds: 1174"
          }
        ]
      }
    ]
  }
}