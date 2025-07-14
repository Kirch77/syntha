window.BENCHMARK_DATA = {
  "lastUpdate": 1752523851211,
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
      },
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
          "id": "76cbb21621beddf63b644300b953e96f64d61973",
          "message": "Update type hint for extract_functions_and_classes to use Tuple for consistency\n\n- Changed the return type hint from 'tuple' to 'Tuple' in extract_functions_and_classes function.\n- This improves type hinting clarity and aligns with the updated import statement.\n\nThese changes enhance code readability and maintainability.",
          "timestamp": "2025-07-14T15:42:33-04:00",
          "tree_id": "8543039a981a176f3e019a60920f38fe4fc8789f",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/76cbb21621beddf63b644300b953e96f64d61973"
        },
        "date": 1752522223220,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 312433.76207048126,
            "unit": "iter/sec",
            "range": "stddev: 6.147778485945142e-7",
            "extra": "mean: 3.2006784201971494 usec\nrounds: 25269"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 481952.05004576093,
            "unit": "iter/sec",
            "range": "stddev: 5.198500880136261e-7",
            "extra": "mean: 2.0748952098140276 usec\nrounds: 130976"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2252.174203490992,
            "unit": "iter/sec",
            "range": "stddev: 0.000024334696318388082",
            "extra": "mean: 444.015386753807 usec\nrounds: 2446"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4756.029549789249,
            "unit": "iter/sec",
            "range": "stddev: 0.000012561533808527372",
            "extra": "mean: 210.25941692147651 usec\nrounds: 3924"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 707.5430265133961,
            "unit": "iter/sec",
            "range": "stddev: 0.00007301779544082625",
            "extra": "mean: 1.4133416096654394 msec\nrounds: 538"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1770.2561052363633,
            "unit": "iter/sec",
            "range": "stddev: 0.000051785318672343545",
            "extra": "mean: 564.8900162197044 usec\nrounds: 1603"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 514062.76796740905,
            "unit": "iter/sec",
            "range": "stddev: 6.040002805239229e-7",
            "extra": "mean: 1.9452877397714958 usec\nrounds: 1199"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.369391302073414,
            "unit": "iter/sec",
            "range": "stddev: 0.007276365778751606",
            "extra": "mean: 54.43838522222163 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102334.4234741275,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013481884380199278",
            "extra": "mean: 9.771882872363307 usec\nrounds: 18911"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1148.7901118376367,
            "unit": "iter/sec",
            "range": "stddev: 0.00003362873576987004",
            "extra": "mean: 870.4810301686633 usec\nrounds: 1127"
          }
        ]
      },
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
          "id": "f4802c1b31dbda8764235f482a14ec9b950e935c",
          "message": "Enhance CI workflow and PostgreSQL backend handling\n\n- Added PostgreSQL installation step for macOS in CI workflow to ensure compatibility.\n- Improved error handling during dependency installation, specifically for psycopg2-binary, with fallback logic for macOS.\n- Refactored PostgreSQLBackend methods to remove unnecessary JSON serialization/deserialization, leveraging psycopg2's automatic handling of JSONB types.\n- Ensured consistent handling of None values in database queries, improving robustness and preventing potential errors.\n\nThese changes enhance the CI process and improve the reliability of PostgreSQL interactions.",
          "timestamp": "2025-07-14T16:09:55-04:00",
          "tree_id": "9a07418afef37c5d68edcb55c14ec02e9ae05134",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/f4802c1b31dbda8764235f482a14ec9b950e935c"
        },
        "date": 1752523850885,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 307406.39834153914,
            "unit": "iter/sec",
            "range": "stddev: 5.724298698988712e-7",
            "extra": "mean: 3.253022726251018 usec\nrounds: 29041"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 464443.87470495794,
            "unit": "iter/sec",
            "range": "stddev: 5.473864542286837e-7",
            "extra": "mean: 2.1531126890956607 usec\nrounds: 122026"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2243.4433204327615,
            "unit": "iter/sec",
            "range": "stddev: 0.000014109471012624875",
            "extra": "mean: 445.7433762164758 usec\nrounds: 2363"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4758.720719259306,
            "unit": "iter/sec",
            "range": "stddev: 0.000015545294238318265",
            "extra": "mean: 210.14051023268496 usec\nrounds: 4447"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 724.0349437243244,
            "unit": "iter/sec",
            "range": "stddev: 0.000052472652474756016",
            "extra": "mean: 1.38114880872483 msec\nrounds: 596"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1835.8306315549096,
            "unit": "iter/sec",
            "range": "stddev: 0.000012159380491373135",
            "extra": "mean: 544.7125583436972 usec\nrounds: 2631"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 546933.3749938032,
            "unit": "iter/sec",
            "range": "stddev: 3.382935859849148e-7",
            "extra": "mean: 1.8283762624859565 usec\nrounds: 1483"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.640373235517664,
            "unit": "iter/sec",
            "range": "stddev: 0.0076884943089109",
            "extra": "mean: 53.646994476193434 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104221.8372221283,
            "unit": "iter/sec",
            "range": "stddev: 0.000002051678683338829",
            "extra": "mean: 9.59491817313388 usec\nrounds: 21851"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1187.6106864555443,
            "unit": "iter/sec",
            "range": "stddev: 0.000038614030399801186",
            "extra": "mean: 842.02677813933 usec\nrounds: 1235"
          }
        ]
      }
    ]
  }
}