window.BENCHMARK_DATA = {
  "lastUpdate": 1755024197778,
  "repoUrl": "https://github.com/Kirch77/syntha",
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
          "id": "aab8b43d9445fac14c3f2a191b22e3a1c9c73e3b",
          "message": "Update PostgreSQLBackend to ensure JSON serialization for database interactions\n\n- Modified the PostgreSQLBackend methods to explicitly serialize values, subscribers, topics, and allowed_topics to JSON format before database insertion.\n- This change enhances data integrity and ensures proper handling of JSONB types in PostgreSQL.\n\nThese updates improve the reliability of data storage and retrieval in the PostgreSQL backend.",
          "timestamp": "2025-07-14T16:34:55-04:00",
          "tree_id": "8505f2577816514caaecfcc5552880448be99c90",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/aab8b43d9445fac14c3f2a191b22e3a1c9c73e3b"
        },
        "date": 1752525394523,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 306039.3045829707,
            "unit": "iter/sec",
            "range": "stddev: 6.619555467198276e-7",
            "extra": "mean: 3.2675541508064327 usec\nrounds: 26260"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 471323.223159961,
            "unit": "iter/sec",
            "range": "stddev: 5.498108186825272e-7",
            "extra": "mean: 2.1216862460023806 usec\nrounds: 110048"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2247.5812603519425,
            "unit": "iter/sec",
            "range": "stddev: 0.000010816363450257355",
            "extra": "mean: 444.92273433682783 usec\nrounds: 2458"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4875.714950563871,
            "unit": "iter/sec",
            "range": "stddev: 0.000011093211105159782",
            "extra": "mean: 205.0981261495509 usec\nrounds: 4241"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 715.285684776782,
            "unit": "iter/sec",
            "range": "stddev: 0.00006256970644330094",
            "extra": "mean: 1.398042797839675 msec\nrounds: 648"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1808.4560828064155,
            "unit": "iter/sec",
            "range": "stddev: 0.00005514144868934507",
            "extra": "mean: 552.9578569849319 usec\nrounds: 2713"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 507759.59152639745,
            "unit": "iter/sec",
            "range": "stddev: 5.008898346759682e-7",
            "extra": "mean: 1.969435962782816 usec\nrounds: 1179"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 15.076633260425536,
            "unit": "iter/sec",
            "range": "stddev: 0.012389298059016946",
            "extra": "mean: 66.32780560000005 msec\nrounds: 15"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103052.79632530773,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014333810141676734",
            "extra": "mean: 9.703763853658959 usec\nrounds: 18912"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1175.7218953592776,
            "unit": "iter/sec",
            "range": "stddev: 0.0000610737058853429",
            "extra": "mean: 850.5412750643889 usec\nrounds: 1167"
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
          "id": "6400aa4be85c1db850f603282ea68ee386c27420",
          "message": "reformat with black",
          "timestamp": "2025-07-14T16:38:45-04:00",
          "tree_id": "e83c8ca19671844775388f3015293d7fd95c4554",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/6400aa4be85c1db850f603282ea68ee386c27420"
        },
        "date": 1752525678479,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 304386.7080238888,
            "unit": "iter/sec",
            "range": "stddev: 6.569379869418338e-7",
            "extra": "mean: 3.285294573117556 usec\nrounds: 28543"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 481954.4870685202,
            "unit": "iter/sec",
            "range": "stddev: 4.440499426787401e-7",
            "extra": "mean: 2.0748847180207464 usec\nrounds: 129283"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2248.783254665754,
            "unit": "iter/sec",
            "range": "stddev: 0.00000882762574291461",
            "extra": "mean: 444.6849192447558 usec\nrounds: 2489"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4962.145974706389,
            "unit": "iter/sec",
            "range": "stddev: 0.000009217420053431256",
            "extra": "mean: 201.52571187895578 usec\nrounds: 4689"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 726.2279274979018,
            "unit": "iter/sec",
            "range": "stddev: 0.00005632029525700109",
            "extra": "mean: 1.376978166407528 msec\nrounds: 643"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1777.1984032587948,
            "unit": "iter/sec",
            "range": "stddev: 0.00004307502986660881",
            "extra": "mean: 562.683377481282 usec\nrounds: 2922"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 538446.0649759253,
            "unit": "iter/sec",
            "range": "stddev: 4.3513427872074305e-7",
            "extra": "mean: 1.8571962264125963 usec\nrounds: 1325"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.086117367133472,
            "unit": "iter/sec",
            "range": "stddev: 0.004665306396446701",
            "extra": "mean: 62.16540493749978 msec\nrounds: 16"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101680.21036259718,
            "unit": "iter/sec",
            "range": "stddev: 0.00000191755038695652",
            "extra": "mean: 9.834755420292163 usec\nrounds: 19879"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1186.2865304916297,
            "unit": "iter/sec",
            "range": "stddev: 0.00009483065921505482",
            "extra": "mean: 842.9666647109048 usec\nrounds: 1193"
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
          "id": "b7472e5e0ea055568f7e2e0ef5151152d2111840",
          "message": "Enhance CI workflow for TruffleHog integration\n\n- Added conditional steps to run TruffleHog based on the event type: separate handling for pull requests and other events (push/schedule/manual).\n- Improved memory usage tests in performance suite by adding error handling for missing dependencies and refining memory growth assertions for better robustness in CI environments.\n\nThese changes improve security scanning during CI processes and enhance the reliability of memory usage tests.",
          "timestamp": "2025-07-14T16:59:48-04:00",
          "tree_id": "60c2da7eefcc69fd45fe5ac70df4a74f141299dc",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/b7472e5e0ea055568f7e2e0ef5151152d2111840"
        },
        "date": 1752526886296,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 313713.1972385552,
            "unit": "iter/sec",
            "range": "stddev: 5.812183628953022e-7",
            "extra": "mean: 3.187624903263396 usec\nrounds: 28430"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484797.281710183,
            "unit": "iter/sec",
            "range": "stddev: 4.821577200487102e-7",
            "extra": "mean: 2.0627178363549707 usec\nrounds: 139412"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2287.9136057774294,
            "unit": "iter/sec",
            "range": "stddev: 0.000018924877989975947",
            "extra": "mean: 437.07944105704183 usec\nrounds: 2460"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 5001.774652718963,
            "unit": "iter/sec",
            "range": "stddev: 0.000008657467088191459",
            "extra": "mean: 199.92903907744028 usec\nrounds: 4683"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 716.9895237182693,
            "unit": "iter/sec",
            "range": "stddev: 0.00006183305498876113",
            "extra": "mean: 1.3947205181102975 msec\nrounds: 635"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1786.5253271256358,
            "unit": "iter/sec",
            "range": "stddev: 0.000039386491852187775",
            "extra": "mean: 559.7457728790854 usec\nrounds: 2994"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 506944.115105703,
            "unit": "iter/sec",
            "range": "stddev: 5.603603641537034e-7",
            "extra": "mean: 1.9726040212371139 usec\nrounds: 1144"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 23.650886613792903,
            "unit": "iter/sec",
            "range": "stddev: 0.002938346913502975",
            "extra": "mean: 42.281713000002824 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103907.65368615497,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013627340039657045",
            "extra": "mean: 9.623930139163981 usec\nrounds: 20913"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1189.6112484163666,
            "unit": "iter/sec",
            "range": "stddev: 0.00003852931596585988",
            "extra": "mean: 840.6107468563526 usec\nrounds: 1193"
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
          "id": "387396f0e79e14854b76e7d0679c50fc68b2d21c",
          "message": "Enhance SQLiteBackend with secure file permissions and improve memory usage tests\n\n- Added functionality to set secure file permissions (0o600) for the database file on POSIX systems during initialization and recovery.\n- Improved memory usage tests by adding error handling for the optional 'psutil' dependency, allowing tests to skip gracefully if not available.\n\nThese changes enhance security for database files and improve the robustness of memory usage testing.",
          "timestamp": "2025-07-14T17:11:01-04:00",
          "tree_id": "1c1270ba13a1de0350e5a67937f15c467f31e226",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/387396f0e79e14854b76e7d0679c50fc68b2d21c"
        },
        "date": 1752527569262,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 312630.42317087436,
            "unit": "iter/sec",
            "range": "stddev: 7.861685282135532e-7",
            "extra": "mean: 3.1986650238880627 usec\nrounds: 27190"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 467703.29518122855,
            "unit": "iter/sec",
            "range": "stddev: 4.803471323087019e-7",
            "extra": "mean: 2.1381076642030363 usec\nrounds: 129133"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2252.8240551793397,
            "unit": "iter/sec",
            "range": "stddev: 0.00003565760626593731",
            "extra": "mean: 443.8873056690588 usec\nrounds: 2434"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4774.797750946435,
            "unit": "iter/sec",
            "range": "stddev: 0.000012673812319224698",
            "extra": "mean: 209.43295447472832 usec\nrounds: 4481"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 724.843734363734,
            "unit": "iter/sec",
            "range": "stddev: 0.00006538845245991997",
            "extra": "mean: 1.3796077038284635 msec\nrounds: 601"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1875.8197642571088,
            "unit": "iter/sec",
            "range": "stddev: 0.000028415825863871954",
            "extra": "mean: 533.1002578470195 usec\nrounds: 2963"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 543141.9811220177,
            "unit": "iter/sec",
            "range": "stddev: 5.058684027143594e-7",
            "extra": "mean: 1.8411392136071107 usec\nrounds: 1372"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 23.36683438001457,
            "unit": "iter/sec",
            "range": "stddev: 0.00507628863303238",
            "extra": "mean: 42.79569854165999 msec\nrounds: 24"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102501.07525651755,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013988014301242178",
            "extra": "mean: 9.755995217585925 usec\nrounds: 20908"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1195.5496679482271,
            "unit": "iter/sec",
            "range": "stddev: 0.000014352458605724011",
            "extra": "mean: 836.4353458574208 usec\nrounds: 1171"
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
          "id": "3a469b178a7853c0ec8b295b5228c3c4fcb63d7c",
          "message": "Enhance CI workflow with consistent shell usage\n\n- Updated the CI workflow to explicitly specify the shell as bash for multiple steps, ensuring consistent execution environment.\n- This change improves clarity and reliability of the CI process by standardizing the shell used across different job steps.",
          "timestamp": "2025-07-14T17:19:57-04:00",
          "tree_id": "626547e18523aeb2919402f7474a4fce7d1f28c6",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/3a469b178a7853c0ec8b295b5228c3c4fcb63d7c"
        },
        "date": 1752528111790,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 310576.7377965909,
            "unit": "iter/sec",
            "range": "stddev: 5.71704346651793e-7",
            "extra": "mean: 3.2198161623261683 usec\nrounds: 27595"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484258.4068984493,
            "unit": "iter/sec",
            "range": "stddev: 5.895616161693842e-7",
            "extra": "mean: 2.0650131949277726 usec\nrounds: 139978"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2265.5871614044204,
            "unit": "iter/sec",
            "range": "stddev: 0.000020038223398519796",
            "extra": "mean: 441.3866820202617 usec\nrounds: 2475"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4905.977463581388,
            "unit": "iter/sec",
            "range": "stddev: 0.000008574964333509638",
            "extra": "mean: 203.83297873325228 usec\nrounds: 4326"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 711.332359599309,
            "unit": "iter/sec",
            "range": "stddev: 0.00005981849772008789",
            "extra": "mean: 1.4058126085579692 msec\nrounds: 631"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1766.5660054358502,
            "unit": "iter/sec",
            "range": "stddev: 0.000019296686441108863",
            "extra": "mean: 566.0699894161488 usec\nrounds: 2929"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 528961.9311771748,
            "unit": "iter/sec",
            "range": "stddev: 5.517366411362432e-7",
            "extra": "mean: 1.8904952153637156 usec\nrounds: 1254"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 20.79535783941379,
            "unit": "iter/sec",
            "range": "stddev: 0.006297037663905357",
            "extra": "mean: 48.087655318182755 msec\nrounds: 22"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101765.88365080758,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015410152123149214",
            "extra": "mean: 9.826475869175676 usec\nrounds: 21342"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1171.4742030612606,
            "unit": "iter/sec",
            "range": "stddev: 0.000018422041885365386",
            "extra": "mean: 853.6252846087694 usec\nrounds: 1163"
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
          "id": "dae65264ea837c1a766b5d3a92e3afa5ca429eeb",
          "message": "quick reformat",
          "timestamp": "2025-07-14T17:33:18-04:00",
          "tree_id": "2f20f76a47b0c435167a6878d15fbe5e43f918b1",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/dae65264ea837c1a766b5d3a92e3afa5ca429eeb"
        },
        "date": 1752528855254,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 315041.568696741,
            "unit": "iter/sec",
            "range": "stddev: 5.825026451378505e-7",
            "extra": "mean: 3.1741842961764832 usec\nrounds: 29496"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 480197.1278971456,
            "unit": "iter/sec",
            "range": "stddev: 4.5843082311055826e-7",
            "extra": "mean: 2.082478094734028 usec\nrounds: 147864"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2284.441230903829,
            "unit": "iter/sec",
            "range": "stddev: 0.000011120252137697333",
            "extra": "mean: 437.7438064381085 usec\nrounds: 2392"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4934.166976883584,
            "unit": "iter/sec",
            "range": "stddev: 0.0000062754976874627155",
            "extra": "mean: 202.668455422155 usec\nrounds: 4666"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 722.5458944589548,
            "unit": "iter/sec",
            "range": "stddev: 0.00007270350909098914",
            "extra": "mean: 1.3839951312003564 msec\nrounds: 625"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1771.4575411575217,
            "unit": "iter/sec",
            "range": "stddev: 0.00004017200223825135",
            "extra": "mean: 564.5068971546284 usec\nrounds: 2917"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 523329.88198751933,
            "unit": "iter/sec",
            "range": "stddev: 5.515967791893141e-7",
            "extra": "mean: 1.9108406273346505 usec\nrounds: 1211"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.290408512569567,
            "unit": "iter/sec",
            "range": "stddev: 0.00825572275348423",
            "extra": "mean: 51.83923395652318 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101862.7250317545,
            "unit": "iter/sec",
            "range": "stddev: 0.000002043267866802588",
            "extra": "mean: 9.81713379146554 usec\nrounds: 18626"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1194.2842911791827,
            "unit": "iter/sec",
            "range": "stddev: 0.00006574998555138232",
            "extra": "mean: 837.3215719120319 usec\nrounds: 1182"
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
          "id": "2569ca9e3460f1858e18a60a77a5a44c77523bfc",
          "message": "Update Python version in configuration and enhance SQLiteBackend error handling\n\n- Updated the Python version in pyproject.toml from 3.8 to 3.9 for compatibility.\n- Added a return statement in SQLiteBackend to handle cases where all retries fail, improving error handling.\n\nThese changes ensure better compatibility with the latest Python features and enhance the robustness of the SQLite backend.",
          "timestamp": "2025-07-14T17:40:43-04:00",
          "tree_id": "813449fbbef096ec4ae2a9413ddabc4af8d94728",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/2569ca9e3460f1858e18a60a77a5a44c77523bfc"
        },
        "date": 1752529289868,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 308327.45934603014,
            "unit": "iter/sec",
            "range": "stddev: 5.689472491158028e-7",
            "extra": "mean: 3.2433050307002294 usec\nrounds: 30056"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484631.3091412041,
            "unit": "iter/sec",
            "range": "stddev: 4.525932654483936e-7",
            "extra": "mean: 2.06342425909721 usec\nrounds: 91067"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2260.8307595227216,
            "unit": "iter/sec",
            "range": "stddev: 0.000011599177353272446",
            "extra": "mean: 442.3152842325569 usec\nrounds: 2410"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4951.415655057092,
            "unit": "iter/sec",
            "range": "stddev: 0.000005916616267372692",
            "extra": "mean: 201.96244259531258 usec\nrounds: 4686"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 707.6920167667705,
            "unit": "iter/sec",
            "range": "stddev: 0.0001018660144686751",
            "extra": "mean: 1.4130440591497637 msec\nrounds: 541"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1805.682625531269,
            "unit": "iter/sec",
            "range": "stddev: 0.00002281359777077493",
            "extra": "mean: 553.8071784380045 usec\nrounds: 2959"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 547858.3561105072,
            "unit": "iter/sec",
            "range": "stddev: 3.9530472695513287e-7",
            "extra": "mean: 1.8252893085348734 usec\nrounds: 1431"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 23.883165027062105,
            "unit": "iter/sec",
            "range": "stddev: 0.0037507964704658787",
            "extra": "mean: 41.870497434778684 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103292.96585111097,
            "unit": "iter/sec",
            "range": "stddev: 0.000001936125932032114",
            "extra": "mean: 9.681201345708523 usec\nrounds: 13082"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1205.7367780154639,
            "unit": "iter/sec",
            "range": "stddev: 0.00002173982713141378",
            "extra": "mean: 829.368414593699 usec\nrounds: 1206"
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
          "id": "5370142ec4f14b35b06aba76018e2d2d69f05eb2",
          "message": "Enhance performance tests in persistence integration\n\n- Added dynamic timing thresholds for performance tests based on Python version and operating system to accommodate variations in execution speed.\n- Updated assertions in performance tests for bulk insertion, retrieval, and cleanup to reflect the new thresholds, improving test reliability across different environments.\n\nThese changes ensure that performance tests remain valid and meaningful across various Python versions and platforms.",
          "timestamp": "2025-07-14T17:50:51-04:00",
          "tree_id": "839241fbdb5731c9e3a981585fd5b7895546cc90",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/5370142ec4f14b35b06aba76018e2d2d69f05eb2"
        },
        "date": 1752529888092,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 308973.7024450729,
            "unit": "iter/sec",
            "range": "stddev: 5.87110381393277e-7",
            "extra": "mean: 3.2365213999976996 usec\nrounds: 47804"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 476118.11897084845,
            "unit": "iter/sec",
            "range": "stddev: 5.300374325786066e-7",
            "extra": "mean: 2.1003191438325155 usec\nrounds: 153799"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2262.540025658025,
            "unit": "iter/sec",
            "range": "stddev: 0.000007940780930172955",
            "extra": "mean: 441.9811312328786 usec\nrounds: 2507"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4866.322457404225,
            "unit": "iter/sec",
            "range": "stddev: 0.00000919814009136191",
            "extra": "mean: 205.49398621919852 usec\nrounds: 3991"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 728.4175347587014,
            "unit": "iter/sec",
            "range": "stddev: 0.00006436695854261364",
            "extra": "mean: 1.372838999999175 msec\nrounds: 645"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1820.9457060287932,
            "unit": "iter/sec",
            "range": "stddev: 0.000032227691144128184",
            "extra": "mean: 549.1651929484755 usec\nrounds: 3063"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 540431.019115737,
            "unit": "iter/sec",
            "range": "stddev: 7.480289023973826e-7",
            "extra": "mean: 1.850374913039259 usec\nrounds: 1443"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 26.429730489020656,
            "unit": "iter/sec",
            "range": "stddev: 0.0015670650183502051",
            "extra": "mean: 37.836178481480026 msec\nrounds: 27"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104001.46767169637,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013248249986980194",
            "extra": "mean: 9.615248922800985 usec\nrounds: 22280"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1197.1051597252617,
            "unit": "iter/sec",
            "range": "stddev: 0.0000186171724505257",
            "extra": "mean: 835.3485004020049 usec\nrounds: 1245"
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
          "id": "0b89fde04aafeb7d2eafce9af1972d3dde91d228",
          "message": "reformat with black",
          "timestamp": "2025-07-14T17:52:03-04:00",
          "tree_id": "4f7563ad63f840df138bf1371e91a09ab2a7893d",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/0b89fde04aafeb7d2eafce9af1972d3dde91d228"
        },
        "date": 1752529963595,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 303000.7217147643,
            "unit": "iter/sec",
            "range": "stddev: 7.079630669125224e-7",
            "extra": "mean: 3.3003221719761107 usec\nrounds: 26759"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 473215.2095302139,
            "unit": "iter/sec",
            "range": "stddev: 5.05431018898379e-7",
            "extra": "mean: 2.113203421742834 usec\nrounds: 135428"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2220.9192516387016,
            "unit": "iter/sec",
            "range": "stddev: 0.00002221343379241637",
            "extra": "mean: 450.2640063397855 usec\nrounds: 2366"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4533.032335828342,
            "unit": "iter/sec",
            "range": "stddev: 0.000006750723797357659",
            "extra": "mean: 220.6028825552742 usec\nrounds: 4070"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 716.5443211648957,
            "unit": "iter/sec",
            "range": "stddev: 0.00008671010440188701",
            "extra": "mean: 1.3955870843750273 msec\nrounds: 640"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1807.2646693569964,
            "unit": "iter/sec",
            "range": "stddev: 0.00002206253919398761",
            "extra": "mean: 553.3223865632189 usec\nrounds: 2962"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 538099.1286373099,
            "unit": "iter/sec",
            "range": "stddev: 3.3826008702964235e-7",
            "extra": "mean: 1.8583936430679877 usec\nrounds: 1227"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.94124863462377,
            "unit": "iter/sec",
            "range": "stddev: 0.004381102998061079",
            "extra": "mean: 50.14731115000046 msec\nrounds: 20"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104962.65013480163,
            "unit": "iter/sec",
            "range": "stddev: 0.000001509572465095198",
            "extra": "mean: 9.527198472177655 usec\nrounds: 20945"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1205.5950868258549,
            "unit": "iter/sec",
            "range": "stddev: 0.000018964045078078623",
            "extra": "mean: 829.4658886117768 usec\nrounds: 1203"
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
          "id": "21df069d01be8f2c5560d2682dfe39da9ff80639",
          "message": "Enhance performance test thresholds for CI environments\n\n- Updated timing thresholds in the persistence integration tests to account for variations in execution speed across different Python versions and operating systems, particularly in CI environments.\n- Introduced a multiplier for CI environments to ensure more lenient thresholds, improving test reliability and accuracy.\n\nThese changes ensure that performance tests remain valid and meaningful across various platforms and conditions.",
          "timestamp": "2025-07-14T18:00:02-04:00",
          "tree_id": "c987e12aced322572725f9945457e77d5bac9a86",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/21df069d01be8f2c5560d2682dfe39da9ff80639"
        },
        "date": 1752530461176,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 309022.93225580547,
            "unit": "iter/sec",
            "range": "stddev: 5.592390244647983e-7",
            "extra": "mean: 3.236005796398994 usec\nrounds: 30019"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 466588.1541800268,
            "unit": "iter/sec",
            "range": "stddev: 4.974368173915456e-7",
            "extra": "mean: 2.1432177200413096 usec\nrounds: 132381"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2217.16969879941,
            "unit": "iter/sec",
            "range": "stddev: 0.00001450902449411021",
            "extra": "mean: 451.0254675325469 usec\nrounds: 2464"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4790.1070549016595,
            "unit": "iter/sec",
            "range": "stddev: 0.000007273418377660133",
            "extra": "mean: 208.763601426551 usec\nrounds: 4486"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 717.9926633888152,
            "unit": "iter/sec",
            "range": "stddev: 0.000051740449175138696",
            "extra": "mean: 1.3927718916794407 msec\nrounds: 637"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1759.98680263831,
            "unit": "iter/sec",
            "range": "stddev: 0.000010359983721580393",
            "extra": "mean: 568.186078725675 usec\nrounds: 2731"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 535128.8234468902,
            "unit": "iter/sec",
            "range": "stddev: 6.900385784655787e-7",
            "extra": "mean: 1.868708909302933 usec\nrounds: 1302"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.99953132292118,
            "unit": "iter/sec",
            "range": "stddev: 0.003835843486010787",
            "extra": "mean: 58.825151176471444 msec\nrounds: 17"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104334.72587923937,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013803321932948898",
            "extra": "mean: 9.584536611112917 usec\nrounds: 20868"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1205.1299543827854,
            "unit": "iter/sec",
            "range": "stddev: 0.000027915885513529344",
            "extra": "mean: 829.7860296005638 usec\nrounds: 1250"
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
          "id": "963e77b188f92031a864e151d011a4c3e9c40770",
          "message": "Update Python version requirements in configuration files\n\n- Changed the required Python version in pyproject.toml from 3.8 to 3.9 to ensure compatibility with newer features.\n- Updated the CI workflow to remove Python 3.8 from the testing matrix, aligning it with the updated requirements.\n\nThese changes enhance compatibility and streamline the CI process by focusing on supported Python versions.",
          "timestamp": "2025-07-14T18:37:32-04:00",
          "tree_id": "0afc134171ffd83829c478a596533b03324bea74",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/963e77b188f92031a864e151d011a4c3e9c40770"
        },
        "date": 1752532724765,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 308724.51368096395,
            "unit": "iter/sec",
            "range": "stddev: 6.816540732848191e-7",
            "extra": "mean: 3.23913377683186 usec\nrounds: 26006"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 472143.2281704219,
            "unit": "iter/sec",
            "range": "stddev: 5.545954702000201e-7",
            "extra": "mean: 2.118001361313703 usec\nrounds: 111657"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2218.8319186752146,
            "unit": "iter/sec",
            "range": "stddev: 0.00001113402065001337",
            "extra": "mean: 450.68758547383095 usec\nrounds: 2258"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4789.325880538709,
            "unit": "iter/sec",
            "range": "stddev: 0.00003096130704965023",
            "extra": "mean: 208.7976523091636 usec\nrounds: 4179"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 681.5969779265483,
            "unit": "iter/sec",
            "range": "stddev: 0.00015145515901603314",
            "extra": "mean: 1.4671426552418843 msec\nrounds: 496"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1770.3634602941652,
            "unit": "iter/sec",
            "range": "stddev: 0.000022390829863587696",
            "extra": "mean: 564.8557612196985 usec\nrounds: 1738"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 536774.2721524482,
            "unit": "iter/sec",
            "range": "stddev: 4.0446929709410056e-7",
            "extra": "mean: 1.8629804964199033 usec\nrounds: 1128"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 21.591018496781587,
            "unit": "iter/sec",
            "range": "stddev: 0.0036071643923928694",
            "extra": "mean: 46.31555478260845 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101651.10660229945,
            "unit": "iter/sec",
            "range": "stddev: 0.00000152562569815033",
            "extra": "mean: 9.837571212209301 usec\nrounds: 19147"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1164.483424367746,
            "unit": "iter/sec",
            "range": "stddev: 0.000029768653385954506",
            "extra": "mean: 858.7498791946722 usec\nrounds: 1192"
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
          "id": "893ee82abd164c870d82eb2f776ea6cf4c20acc0",
          "message": "Update .gitignore and remove outdated files\n\n- Added Syntha-specific files, performance profiling files, backup files, test artifacts, local configuration files, and runtime files to .gitignore to prevent unnecessary tracking.\n- Deleted outdated CHANGELOG.md and CLA-TEMPLATE.md files to streamline documentation.\n- Updated CODE_OF_CONDUCT.md and CONTRIBUTING.md for improved clarity and reporting processes.\n- Removed unnecessary sections from README.md and SECURITY.md to enhance readability and focus on essential information.\n\nThese changes improve project organization and ensure that contributors have clear guidelines and documentation.",
          "timestamp": "2025-07-14T22:44:17-04:00",
          "tree_id": "71b67244c87274334647e90b7d69a2bab485dd83",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/893ee82abd164c870d82eb2f776ea6cf4c20acc0"
        },
        "date": 1752547699927,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 312929.93812426884,
            "unit": "iter/sec",
            "range": "stddev: 5.598379633778465e-7",
            "extra": "mean: 3.1956034823452586 usec\nrounds: 28831"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 480993.9554972288,
            "unit": "iter/sec",
            "range": "stddev: 5.232042207374337e-7",
            "extra": "mean: 2.079028205180349 usec\nrounds: 134337"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2265.605123995166,
            "unit": "iter/sec",
            "range": "stddev: 0.000009815439441422324",
            "extra": "mean: 441.3831825365053 usec\nrounds: 2405"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4979.519185047231,
            "unit": "iter/sec",
            "range": "stddev: 0.00002102455125899849",
            "extra": "mean: 200.82260211043146 usec\nrounds: 4549"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 713.9509981160476,
            "unit": "iter/sec",
            "range": "stddev: 0.0000944421848751446",
            "extra": "mean: 1.4006563512604788 msec\nrounds: 595"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1839.5397305426536,
            "unit": "iter/sec",
            "range": "stddev: 0.000029438763396680212",
            "extra": "mean: 543.6142440397336 usec\nrounds: 3020"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 531535.8658872731,
            "unit": "iter/sec",
            "range": "stddev: 4.151645707017314e-7",
            "extra": "mean: 1.8813405908757204 usec\nrounds: 1286"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.52108528164081,
            "unit": "iter/sec",
            "range": "stddev: 0.004326981241810811",
            "extra": "mean: 44.402833500000106 msec\nrounds: 24"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104059.98125816119,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015261151215020138",
            "extra": "mean: 9.60984220743911 usec\nrounds: 18030"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1190.721521444512,
            "unit": "iter/sec",
            "range": "stddev: 0.00003355191331726215",
            "extra": "mean: 839.8269301346464 usec\nrounds: 1188"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0fa46dd77ed82956f545d629f6cc25660bfbe89b",
          "message": "ci(deps): bump actions/cache from 3 to 4 (#4)\n\nBumps [actions/cache](https://github.com/actions/cache) from 3 to 4.\n- [Release notes](https://github.com/actions/cache/releases)\n- [Changelog](https://github.com/actions/cache/blob/main/RELEASES.md)\n- [Commits](https://github.com/actions/cache/compare/v3...v4)\n\n---\nupdated-dependencies:\n- dependency-name: actions/cache\n  dependency-version: '4'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2025-07-15T03:06:21Z",
          "tree_id": "cad311889e94cefe67df9bbeb6d6a9d065a50491",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/0fa46dd77ed82956f545d629f6cc25660bfbe89b"
        },
        "date": 1752548808517,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 310198.2760501741,
            "unit": "iter/sec",
            "range": "stddev: 6.289295062260223e-7",
            "extra": "mean: 3.22374454408074 usec\nrounds: 29050"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 478758.7956730931,
            "unit": "iter/sec",
            "range": "stddev: 5.556290414550358e-7",
            "extra": "mean: 2.0887344713825824 usec\nrounds: 132031"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2245.0162480560634,
            "unit": "iter/sec",
            "range": "stddev: 0.000010181579250817743",
            "extra": "mean: 445.43107465965545 usec\nrounds: 2277"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4847.882594875893,
            "unit": "iter/sec",
            "range": "stddev: 0.000011661190496017294",
            "extra": "mean: 206.27562248660442 usec\nrounds: 4376"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 722.313288716059,
            "unit": "iter/sec",
            "range": "stddev: 0.00006508486277792163",
            "extra": "mean: 1.3844408176091296 msec\nrounds: 636"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1864.6334240396036,
            "unit": "iter/sec",
            "range": "stddev: 0.00004312374028746882",
            "extra": "mean: 536.2984418854655 usec\nrounds: 2736"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 540988.1462179526,
            "unit": "iter/sec",
            "range": "stddev: 2.656846446558873e-7",
            "extra": "mean: 1.8484693370658831 usec\nrounds: 1223"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.520134094659557,
            "unit": "iter/sec",
            "range": "stddev: 0.003655765389110018",
            "extra": "mean: 51.22915627273208 msec\nrounds: 22"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104951.26306371595,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018772430901592888",
            "extra": "mean: 9.528232160416207 usec\nrounds: 20292"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1198.9092568734827,
            "unit": "iter/sec",
            "range": "stddev: 0.000014845824073979517",
            "extra": "mean: 834.0914829599376 usec\nrounds: 1027"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0d332f51dd03e27c41df51a7e0a4c1786a1cac14",
          "message": "ci(deps): bump actions/setup-python from 4 to 5 (#3)\n\nBumps [actions/setup-python](https://github.com/actions/setup-python) from 4 to 5.\n- [Release notes](https://github.com/actions/setup-python/releases)\n- [Commits](https://github.com/actions/setup-python/compare/v4...v5)\n\n---\nupdated-dependencies:\n- dependency-name: actions/setup-python\n  dependency-version: '5'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2025-07-15T03:09:02Z",
          "tree_id": "a9dc173e96bb81b181a5c4329bfab3dc1b33a54f",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/0d332f51dd03e27c41df51a7e0a4c1786a1cac14"
        },
        "date": 1752548969913,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 315847.1704946852,
            "unit": "iter/sec",
            "range": "stddev: 5.581765731268671e-7",
            "extra": "mean: 3.166088201562113 usec\nrounds: 28140"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484072.1005293224,
            "unit": "iter/sec",
            "range": "stddev: 5.637891403287593e-7",
            "extra": "mean: 2.065807963124753 usec\nrounds: 131683"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2261.2965356530726,
            "unit": "iter/sec",
            "range": "stddev: 0.000015215894615587979",
            "extra": "mean: 442.22417725112535 usec\nrounds: 2488"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4902.965519937203,
            "unit": "iter/sec",
            "range": "stddev: 0.000017757364831037596",
            "extra": "mean: 203.9581954907992 usec\nrounds: 4302"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 721.1033408544631,
            "unit": "iter/sec",
            "range": "stddev: 0.00006148549368315679",
            "extra": "mean: 1.3867637873027485 msec\nrounds: 630"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1812.1978649276714,
            "unit": "iter/sec",
            "range": "stddev: 0.00003100908342572859",
            "extra": "mean: 551.8161230368253 usec\nrounds: 2739"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 530609.9287595577,
            "unit": "iter/sec",
            "range": "stddev: 4.6454394459941686e-7",
            "extra": "mean: 1.8846236110541068 usec\nrounds: 1711"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.317323470477188,
            "unit": "iter/sec",
            "range": "stddev: 0.0042826801109892895",
            "extra": "mean: 51.767005999993096 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103383.16524003344,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013618358194877572",
            "extra": "mean: 9.672754724410067 usec\nrounds: 20161"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1205.408885134953,
            "unit": "iter/sec",
            "range": "stddev: 0.000013345735566604097",
            "extra": "mean: 829.5940177079779 usec\nrounds: 1186"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "367ff2372921cdf96fab3567a0538f082114accc",
          "message": "ci(deps): bump codecov/codecov-action from 3 to 5 (#2)\n\nBumps [codecov/codecov-action](https://github.com/codecov/codecov-action) from 3 to 5.\n- [Release notes](https://github.com/codecov/codecov-action/releases)\n- [Changelog](https://github.com/codecov/codecov-action/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/codecov/codecov-action/compare/v3...v5)\n\n---\nupdated-dependencies:\n- dependency-name: codecov/codecov-action\n  dependency-version: '5'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2025-07-15T03:12:18Z",
          "tree_id": "8254d3cc844b22a57545fdd0eb54b8cdd4716aa0",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/367ff2372921cdf96fab3567a0538f082114accc"
        },
        "date": 1752549167649,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 310203.4808115824,
            "unit": "iter/sec",
            "range": "stddev: 6.90987654727374e-7",
            "extra": "mean: 3.2236904543550238 usec\nrounds: 28348"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 483579.0369865292,
            "unit": "iter/sec",
            "range": "stddev: 6.267029661082989e-7",
            "extra": "mean: 2.0679142880791512 usec\nrounds: 120555"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2246.5475169003066,
            "unit": "iter/sec",
            "range": "stddev: 0.00001570114126325286",
            "extra": "mean: 445.1274644659013 usec\nrounds: 2181"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4910.71190458097,
            "unit": "iter/sec",
            "range": "stddev: 0.000015293665375965406",
            "extra": "mean: 203.63646237669684 usec\nrounds: 3854"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 710.7712396773511,
            "unit": "iter/sec",
            "range": "stddev: 0.00010835057769033673",
            "extra": "mean: 1.4069224304207102 msec\nrounds: 618"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1831.100992138645,
            "unit": "iter/sec",
            "range": "stddev: 0.000017466330910498837",
            "extra": "mean: 546.1195227861485 usec\nrounds: 2699"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 538045.3033350586,
            "unit": "iter/sec",
            "range": "stddev: 7.876825331281771e-7",
            "extra": "mean: 1.8585795541779255 usec\nrounds: 1301"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 21.4655686044812,
            "unit": "iter/sec",
            "range": "stddev: 0.003268213955693174",
            "extra": "mean: 46.586233909090936 msec\nrounds: 22"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102688.89532481451,
            "unit": "iter/sec",
            "range": "stddev: 0.000001889913854238932",
            "extra": "mean: 9.738151304840773 usec\nrounds: 17435"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1175.491756776436,
            "unit": "iter/sec",
            "range": "stddev: 0.00003348044224024633",
            "extra": "mean: 850.7077946189186 usec\nrounds: 1115"
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
          "id": "3c5feffea11a0f6c0faefea709fbbb3a39983193",
          "message": "Implement user isolation and topic management features in ContextMesh\n\n- Added support for user isolation in ContextMesh, allowing agents to operate within their own context without interference from others.\n- Introduced methods for unsubscribing from topics and deleting topics, including handling of associated context items.\n- Updated persistence layer to accommodate user-specific data management in SQLite and PostgreSQL backends.\n- Enhanced tool schemas and handlers to include new functionalities for unsubscribing from topics and deleting topics.\n- Added comprehensive tests for new features, ensuring correct behavior in various scenarios.\n\nThese changes improve the flexibility and security of the context management system, enabling better user-specific interactions.",
          "timestamp": "2025-07-17T15:48:29-04:00",
          "tree_id": "e7db51269459d25a9e935c0caaa6b7f9e5cdbb87",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/3c5feffea11a0f6c0faefea709fbbb3a39983193"
        },
        "date": 1752781927483,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 310536.31245110935,
            "unit": "iter/sec",
            "range": "stddev: 5.613069295611235e-7",
            "extra": "mean: 3.2202353151773173 usec\nrounds: 28005"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 482921.0009227431,
            "unit": "iter/sec",
            "range": "stddev: 7.154298229596566e-7",
            "extra": "mean: 2.070732061950601 usec\nrounds: 124596"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2256.1290786309605,
            "unit": "iter/sec",
            "range": "stddev: 0.000029783194994561716",
            "extra": "mean: 443.23705122705525 usec\nrounds: 2323"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4860.5470882709915,
            "unit": "iter/sec",
            "range": "stddev: 0.000015368361700969136",
            "extra": "mean: 205.73815700975402 usec\nrounds: 4522"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 711.4690917439232,
            "unit": "iter/sec",
            "range": "stddev: 0.00005892353023119125",
            "extra": "mean: 1.405542435510223 msec\nrounds: 597"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 2660.1761210936024,
            "unit": "iter/sec",
            "range": "stddev: 0.000018372779831850343",
            "extra": "mean: 375.91495994216297 usec\nrounds: 2746"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 535036.5071739818,
            "unit": "iter/sec",
            "range": "stddev: 3.910821789039576e-7",
            "extra": "mean: 1.8690313400891403 usec\nrounds: 1404"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 21.84462260716001,
            "unit": "iter/sec",
            "range": "stddev: 0.003552648183658403",
            "extra": "mean: 45.77785654544704 msec\nrounds: 22"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 112163.34788239487,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012334989228606204",
            "extra": "mean: 8.91556839983518 usec\nrounds: 20943"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1217.1783376395313,
            "unit": "iter/sec",
            "range": "stddev: 0.00002778081286933766",
            "extra": "mean: 821.5722947709501 usec\nrounds: 1262"
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
          "id": "359d7dcecbf8d344bb8a62afa460dbe2d4e9c3b4",
          "message": "Refactor context item removal logic in ContextMesh\n\n- Adjusted comments for clarity in the context item removal process, specifically regarding user isolation and indexing.\n- Ensured that the logic for removing items from indexes is clearly defined when indexing is enabled.\n\nThese changes improve code readability and maintainability in the context management system.",
          "timestamp": "2025-07-22T12:35:04-04:00",
          "tree_id": "2e9e4ffc2aaae922f2882c64d1095cb04cd123c2",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/359d7dcecbf8d344bb8a62afa460dbe2d4e9c3b4"
        },
        "date": 1753202170568,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 310360.2218949962,
            "unit": "iter/sec",
            "range": "stddev: 6.688018850979361e-7",
            "extra": "mean: 3.222062395413317 usec\nrounds: 26861"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 488381.82366805716,
            "unit": "iter/sec",
            "range": "stddev: 4.999306277439954e-7",
            "extra": "mean: 2.047578250331607 usec\nrounds: 117565"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2256.329961449174,
            "unit": "iter/sec",
            "range": "stddev: 0.000013666501040989491",
            "extra": "mean: 443.19758948630437 usec\nrounds: 2492"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4937.858594804667,
            "unit": "iter/sec",
            "range": "stddev: 0.000007583602016391875",
            "extra": "mean: 202.5169374133441 usec\nrounds: 4330"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 729.1447529681743,
            "unit": "iter/sec",
            "range": "stddev: 0.00005287964157142286",
            "extra": "mean: 1.3714697883091644 msec\nrounds: 633"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 2621.2198841379986,
            "unit": "iter/sec",
            "range": "stddev: 0.00004473646532391397",
            "extra": "mean: 381.5017603259389 usec\nrounds: 1719"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 541904.4949016065,
            "unit": "iter/sec",
            "range": "stddev: 4.6961729977180116e-7",
            "extra": "mean: 1.8453436157261804 usec\nrounds: 1394"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 23.64271153246349,
            "unit": "iter/sec",
            "range": "stddev: 0.0037807093445242058",
            "extra": "mean: 42.29633299999932 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 108756.15100547452,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020690034273987995",
            "extra": "mean: 9.194882227393855 usec\nrounds: 23919"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1218.680884399693,
            "unit": "iter/sec",
            "range": "stddev: 0.000033701275897569305",
            "extra": "mean: 820.559354627596 usec\nrounds: 1221"
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
          "id": "e7d2d84c6a22d45a4574b80e723c1b0de94b9799",
          "message": "Refactor multi-user isolation example and improve code readability\n\n- Cleaned up whitespace and formatting in the multi_user_isolation.py example to enhance readability.\n- Consolidated multiple lines of code into single lines where appropriate, maintaining functionality.\n- Updated comments for clarity and consistency throughout the example.\n- Ensured that the example demonstrates user isolation effectively while maintaining a clean code structure.\n\nThese changes improve the overall presentation and maintainability of the multi-user isolation example.",
          "timestamp": "2025-07-22T12:45:58-04:00",
          "tree_id": "60771b2ffe6cf4c9b564c90881273eca189d37cd",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/e7d2d84c6a22d45a4574b80e723c1b0de94b9799"
        },
        "date": 1753202827433,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 309314.46982773684,
            "unit": "iter/sec",
            "range": "stddev: 6.64454891841432e-7",
            "extra": "mean: 3.2329557700838216 usec\nrounds: 29211"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 468219.9342148718,
            "unit": "iter/sec",
            "range": "stddev: 0.000001106417491660122",
            "extra": "mean: 2.135748452651501 usec\nrounds: 126183"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2265.6977350539355,
            "unit": "iter/sec",
            "range": "stddev: 0.000009047237761458427",
            "extra": "mean: 441.3651408695939 usec\nrounds: 2300"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4855.396289611693,
            "unit": "iter/sec",
            "range": "stddev: 0.000007306662337902965",
            "extra": "mean: 205.95641227875436 usec\nrounds: 4577"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 719.1547587847587,
            "unit": "iter/sec",
            "range": "stddev: 0.00007437167064589103",
            "extra": "mean: 1.3905212859744112 msec\nrounds: 549"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1799.1821622795808,
            "unit": "iter/sec",
            "range": "stddev: 0.000016147938096949374",
            "extra": "mean: 555.808089344878 usec\nrounds: 3022"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 526938.4109396351,
            "unit": "iter/sec",
            "range": "stddev: 5.176810075400443e-7",
            "extra": "mean: 1.8977549923088788 usec\nrounds: 1302"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.50454910151545,
            "unit": "iter/sec",
            "range": "stddev: 0.004765637106125448",
            "extra": "mean: 54.04076557142935 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100606.57116081598,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028781177416703413",
            "extra": "mean: 9.939708594198445 usec\nrounds: 19804"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1199.3723765450097,
            "unit": "iter/sec",
            "range": "stddev: 0.000013572263538416853",
            "extra": "mean: 833.7694110320142 usec\nrounds: 1124"
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
          "id": "279209c7a88f04cae69494e1890a1b30eb9c2ec6",
          "message": "Refactor test_user_isolation.py to improve imports and organization\n\n- Moved the import of the 'os' module to maintain a consistent import order.\n- Enhanced code organization for better readability and maintainability.\n\nThese changes contribute to a cleaner structure in the test file.",
          "timestamp": "2025-07-22T12:54:42-04:00",
          "tree_id": "880e8450e8eefa09ffe8d3faa6f5c546ecdca70a",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/279209c7a88f04cae69494e1890a1b30eb9c2ec6"
        },
        "date": 1753203505031,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 313284.7879930252,
            "unit": "iter/sec",
            "range": "stddev: 5.992697919745507e-7",
            "extra": "mean: 3.1919839019514202 usec\nrounds: 27581"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 477786.6916452933,
            "unit": "iter/sec",
            "range": "stddev: 6.462343623504592e-7",
            "extra": "mean: 2.0929842071499043 usec\nrounds: 135631"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2261.199448433614,
            "unit": "iter/sec",
            "range": "stddev: 0.000010855953054162675",
            "extra": "mean: 442.24316465879355 usec\nrounds: 2490"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4962.959783903475,
            "unit": "iter/sec",
            "range": "stddev: 0.000007486948725566772",
            "extra": "mean: 201.49266638092288 usec\nrounds: 4664"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 712.9549760820379,
            "unit": "iter/sec",
            "range": "stddev: 0.00006028654080243121",
            "extra": "mean: 1.4026131152003245 msec\nrounds: 625"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1823.9267816002227,
            "unit": "iter/sec",
            "range": "stddev: 0.00003879626819992421",
            "extra": "mean: 548.2676224111636 usec\nrounds: 2704"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 530167.168908723,
            "unit": "iter/sec",
            "range": "stddev: 4.7529767984015083e-7",
            "extra": "mean: 1.8861975215446931 usec\nrounds: 1291"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 17.29625505400007,
            "unit": "iter/sec",
            "range": "stddev: 0.003811138210892684",
            "extra": "mean: 57.81598368420983 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100536.25730717614,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014313216273849917",
            "extra": "mean: 9.94666030728221 usec\nrounds: 19656"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1183.6916806951722,
            "unit": "iter/sec",
            "range": "stddev: 0.000024442954639551126",
            "extra": "mean: 844.8145883839519 usec\nrounds: 1188"
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
          "id": "c5d3e26d6aa780cb00eb7f6fbc63a880b6997213",
          "message": "fix(ci): correct file parameter in Codecov action configuration\n\n- Changed the parameter from 'file' to 'files' in the Codecov action to align with the expected input format.\n- This adjustment ensures proper functionality of the coverage upload process.\n\nThese changes enhance the accuracy of the CI workflow for coverage reporting.",
          "timestamp": "2025-07-22T13:07:19-04:00",
          "tree_id": "17c46c7def10d9da43b53f776b8c6c3868a7b83a",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/c5d3e26d6aa780cb00eb7f6fbc63a880b6997213"
        },
        "date": 1753204110092,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 302747.64071336173,
            "unit": "iter/sec",
            "range": "stddev: 6.008851519743662e-7",
            "extra": "mean: 3.303081066606195 usec\nrounds: 28014"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 461227.65763419296,
            "unit": "iter/sec",
            "range": "stddev: 5.36343028754652e-7",
            "extra": "mean: 2.1681267015281986 usec\nrounds: 135981"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2207.8791446306077,
            "unit": "iter/sec",
            "range": "stddev: 0.000014730040070372475",
            "extra": "mean: 452.9233415841275 usec\nrounds: 2424"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4866.979314991484,
            "unit": "iter/sec",
            "range": "stddev: 0.000008159850406449776",
            "extra": "mean: 205.46625232611035 usec\nrounds: 4514"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 700.6189183309754,
            "unit": "iter/sec",
            "range": "stddev: 0.00007140950439435309",
            "extra": "mean: 1.4273094457429363 msec\nrounds: 599"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1795.4437475631094,
            "unit": "iter/sec",
            "range": "stddev: 0.000028170903879455288",
            "extra": "mean: 556.9653749148441 usec\nrounds: 1467"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 502604.17726162384,
            "unit": "iter/sec",
            "range": "stddev: 4.945758130809666e-7",
            "extra": "mean: 1.9896372637576856 usec\nrounds: 1111"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.790680818056916,
            "unit": "iter/sec",
            "range": "stddev: 0.014561986878862124",
            "extra": "mean: 53.21786952173917 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104143.43423433392,
            "unit": "iter/sec",
            "range": "stddev: 0.000001513512736373531",
            "extra": "mean: 9.602141578602954 usec\nrounds: 19777"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1204.933544910631,
            "unit": "iter/sec",
            "range": "stddev: 0.000017224751434889176",
            "extra": "mean: 829.9212883762558 usec\nrounds: 1127"
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
          "id": "63c7c8b338e95641e1e53574b797e0f11eea5bfc",
          "message": "Enhance tool access control and role management in ToolHandler\n\n- Introduced role-based access control in ToolHandler, allowing agents to have specific permissions based on their roles.\n- Added methods for setting allowed and denied tools, as well as managing agent roles dynamically.\n- Implemented predefined roles with associated tool permissions for common use cases, improving security and flexibility.\n- Updated the ToolHandler initialization to support access control configurations, enhancing the overall functionality of context management tools.\n\nThese changes improve the security and usability of the tool management system, enabling more granular control over agent capabilities.",
          "timestamp": "2025-07-28T21:27:34-04:00",
          "tree_id": "e650630a78c5a052a9cd7664746c8d5a3df3fa15",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/63c7c8b338e95641e1e53574b797e0f11eea5bfc"
        },
        "date": 1753752492562,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 309676.4681041821,
            "unit": "iter/sec",
            "range": "stddev: 6.06278715424349e-7",
            "extra": "mean: 3.2291765858798724 usec\nrounds: 45921"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 472911.02150096,
            "unit": "iter/sec",
            "range": "stddev: 5.767821837755211e-7",
            "extra": "mean: 2.1145626862874245 usec\nrounds: 126152"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2256.253419731826,
            "unit": "iter/sec",
            "range": "stddev: 0.000010880568065144138",
            "extra": "mean: 443.2126246345404 usec\nrounds: 2395"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4783.8197035691355,
            "unit": "iter/sec",
            "range": "stddev: 0.000017338689229283135",
            "extra": "mean: 209.03797842839165 usec\nrounds: 4543"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 719.3543441875636,
            "unit": "iter/sec",
            "range": "stddev: 0.00008624823430305218",
            "extra": "mean: 1.390135484799771 msec\nrounds: 625"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1798.6233062215315,
            "unit": "iter/sec",
            "range": "stddev: 0.0000118126072434552",
            "extra": "mean: 555.9807862718937 usec\nrounds: 3074"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 534381.2266400654,
            "unit": "iter/sec",
            "range": "stddev: 4.743498543540849e-7",
            "extra": "mean: 1.8713232242223845 usec\nrounds: 1253"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 13.815969970661968,
            "unit": "iter/sec",
            "range": "stddev: 0.006576147905144142",
            "extra": "mean: 72.3800067692306 msec\nrounds: 13"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103923.8987177825,
            "unit": "iter/sec",
            "range": "stddev: 0.000001380451377486491",
            "extra": "mean: 9.622425759022157 usec\nrounds: 21080"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1190.9226586325872,
            "unit": "iter/sec",
            "range": "stddev: 0.000013321174994488003",
            "extra": "mean: 839.6850901705037 usec\nrounds: 1231"
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
          "id": "5ae8b0a10ec795e691e2b51239cf271f9d2ac923",
          "message": "Refactor tool access control examples for improved readability and consistency\n\n- Cleaned up whitespace and formatting in the tool access control examples to enhance readability.\n- Consolidated multiple lines of code into single lines where appropriate, maintaining functionality.\n- Updated comments for clarity and consistency throughout the examples.\n- Ensured that the examples effectively demonstrate access control features while maintaining a clean code structure.\n\nThese changes improve the overall presentation and maintainability of the tool access control examples.",
          "timestamp": "2025-07-28T21:34:56-04:00",
          "tree_id": "c5ff49c99f3b06a4423cf67e757376e018917fd1",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/5ae8b0a10ec795e691e2b51239cf271f9d2ac923"
        },
        "date": 1753753015384,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 305247.42185094353,
            "unit": "iter/sec",
            "range": "stddev: 5.716645692487395e-7",
            "extra": "mean: 3.2760309454417396 usec\nrounds: 29245"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 450777.57186724927,
            "unit": "iter/sec",
            "range": "stddev: 6.058559648576292e-7",
            "extra": "mean: 2.2183889847441054 usec\nrounds: 141985"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2230.23710634014,
            "unit": "iter/sec",
            "range": "stddev: 0.00001937542598463598",
            "extra": "mean: 448.3828186506224 usec\nrounds: 2327"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4952.680428360054,
            "unit": "iter/sec",
            "range": "stddev: 0.00001251307181995398",
            "extra": "mean: 201.9108671485842 usec\nrounds: 4426"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 719.153559970292,
            "unit": "iter/sec",
            "range": "stddev: 0.00011082482354753475",
            "extra": "mean: 1.3905236039453237 msec\nrounds: 659"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1837.390773082858,
            "unit": "iter/sec",
            "range": "stddev: 0.00001185670558524664",
            "extra": "mean: 544.2500390497523 usec\nrounds: 3073"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 549310.0320823393,
            "unit": "iter/sec",
            "range": "stddev: 4.4534687116326685e-7",
            "extra": "mean: 1.820465568795773 usec\nrounds: 1336"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 10.570067107799314,
            "unit": "iter/sec",
            "range": "stddev: 0.009480408189441722",
            "extra": "mean: 94.60677872727335 msec\nrounds: 11"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102845.34202804344,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014089506384454803",
            "extra": "mean: 9.723337783516964 usec\nrounds: 20898"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1197.9309959986535,
            "unit": "iter/sec",
            "range": "stddev: 0.00006999378451157057",
            "extra": "mean: 834.7726232480957 usec\nrounds: 1213"
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
          "id": "717f60af049d14f044cf7aebf96da0f81d836687",
          "message": "Refactor imports in tool access control files for consistency\n\n- Rearranged and consolidated import statements in `__init__.py`, `test_tool_access_control_integration.py`, and `test_tool_access_control.py` to improve organization and readability.\n- Ensured that the order of imports is consistent across the files, enhancing maintainability.\n\nThese changes contribute to a cleaner and more structured codebase.",
          "timestamp": "2025-07-28T21:41:02-04:00",
          "tree_id": "c8e86c6bd6aeba56c058025b53b84279391cff66",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/717f60af049d14f044cf7aebf96da0f81d836687"
        },
        "date": 1753753316013,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 307335.27283200034,
            "unit": "iter/sec",
            "range": "stddev: 6.3014812307186e-7",
            "extra": "mean: 3.2537755617352557 usec\nrounds: 26925"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 485981.0545597837,
            "unit": "iter/sec",
            "range": "stddev: 5.394099151493989e-7",
            "extra": "mean: 2.0576933825246133 usec\nrounds: 73714"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2243.505608063447,
            "unit": "iter/sec",
            "range": "stddev: 0.00001626790635653144",
            "extra": "mean: 445.7310008077856 usec\nrounds: 2476"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4921.129716593861,
            "unit": "iter/sec",
            "range": "stddev: 0.000007698441068446853",
            "extra": "mean: 203.20537307278005 usec\nrounds: 4605"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 717.3734743561205,
            "unit": "iter/sec",
            "range": "stddev: 0.00006265804954696562",
            "extra": "mean: 1.3939740396695757 msec\nrounds: 605"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1807.3872081458485,
            "unit": "iter/sec",
            "range": "stddev: 0.00003088407239466957",
            "extra": "mean: 553.2848719372502 usec\nrounds: 3061"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 520926.67297639785,
            "unit": "iter/sec",
            "range": "stddev: 7.349300605154817e-7",
            "extra": "mean: 1.9196559743933637 usec\nrounds: 1247"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.598902738271,
            "unit": "iter/sec",
            "range": "stddev: 0.002877036308012224",
            "extra": "mean: 60.24494605263068 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104227.04826663963,
            "unit": "iter/sec",
            "range": "stddev: 0.000001388189111255714",
            "extra": "mean: 9.594438455570021 usec\nrounds: 19165"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1205.10650482543,
            "unit": "iter/sec",
            "range": "stddev: 0.00004163341602665649",
            "extra": "mean: 829.8021759868093 usec\nrounds: 1216"
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
          "id": "0780c30776db5cd155fd9eb59638676dae557245",
          "message": "Enhance performance testing in access control integration tests\n\n- Improved timing accuracy in performance tests by increasing iterations and using `time.perf_counter()` for more precise measurements.\n- Added error handling in concurrent access tests to capture exceptions and ensure threads complete without crashing.\n- Adjusted assertions to allow for more lenient thresholds, particularly for Windows environments, while maintaining meaningful checks on performance overhead.\n\nThese changes enhance the reliability and stability of the access control performance tests, ensuring more accurate results in various scenarios.",
          "timestamp": "2025-07-28T22:01:43-04:00",
          "tree_id": "ea526d536ce9f04447889c1094c0a839c099684b",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/0780c30776db5cd155fd9eb59638676dae557245"
        },
        "date": 1753754654672,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 308423.44267964637,
            "unit": "iter/sec",
            "range": "stddev: 6.692200890932356e-7",
            "extra": "mean: 3.2422956935821547 usec\nrounds: 40312"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 477573.19344533543,
            "unit": "iter/sec",
            "range": "stddev: 4.89050256706245e-7",
            "extra": "mean: 2.0939198718122007 usec\nrounds: 141985"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2223.5367559027372,
            "unit": "iter/sec",
            "range": "stddev: 0.000018140191480375578",
            "extra": "mean: 449.73396430049496 usec\nrounds: 2409"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4808.538273558139,
            "unit": "iter/sec",
            "range": "stddev: 0.0000073673590289931936",
            "extra": "mean: 207.96340657179323 usec\nrounds: 4565"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 712.0279867170619,
            "unit": "iter/sec",
            "range": "stddev: 0.0000705030483444156",
            "extra": "mean: 1.4044391774692548 msec\nrounds: 648"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1859.9259485794687,
            "unit": "iter/sec",
            "range": "stddev: 0.000008519512955233917",
            "extra": "mean: 537.6558140735425 usec\nrounds: 3098"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 540874.9663287065,
            "unit": "iter/sec",
            "range": "stddev: 4.3230263044217453e-7",
            "extra": "mean: 1.8488561354349482 usec\nrounds: 1418"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.742805636532403,
            "unit": "iter/sec",
            "range": "stddev: 0.006668265290342971",
            "extra": "mean: 43.9699488260882 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103407.47871213644,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014487416468468823",
            "extra": "mean: 9.670480437723262 usec\nrounds: 21291"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1191.0552604545348,
            "unit": "iter/sec",
            "range": "stddev: 0.000014369071376675731",
            "extra": "mean: 839.5916068733674 usec\nrounds: 1193"
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
          "id": "aeafa842f24d0d032484925d8baf6ca1b9c99701",
          "message": "Refactor import statements in access control integration tests\n\n- Moved the import of the 'time' module to the appropriate section in `test_tool_access_control_integration.py` for better organization.\n- Ensured consistent import structure across test files, enhancing readability and maintainability.\n\nThese changes contribute to a cleaner and more structured codebase in the integration tests.",
          "timestamp": "2025-07-28T22:08:22-04:00",
          "tree_id": "2ce9994801f4977fb7069177b151697b32f93714",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/aeafa842f24d0d032484925d8baf6ca1b9c99701"
        },
        "date": 1753754933668,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 307736.8564251672,
            "unit": "iter/sec",
            "range": "stddev: 6.521293506329089e-7",
            "extra": "mean: 3.249529522126549 usec\nrounds: 27183"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484960.30692535144,
            "unit": "iter/sec",
            "range": "stddev: 5.414887964490592e-7",
            "extra": "mean: 2.0620244290507 usec\nrounds: 112284"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2281.43882252284,
            "unit": "iter/sec",
            "range": "stddev: 0.000011798912411883324",
            "extra": "mean: 438.31988398189395 usec\nrounds: 2491"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4894.378119711275,
            "unit": "iter/sec",
            "range": "stddev: 0.0000075422440590644705",
            "extra": "mean: 204.31604905486768 usec\nrounds: 4444"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 708.9197476556925,
            "unit": "iter/sec",
            "range": "stddev: 0.0000699073230783072",
            "extra": "mean: 1.410596902268378 msec\nrounds: 573"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1839.7441847224645,
            "unit": "iter/sec",
            "range": "stddev: 0.000021778933529472407",
            "extra": "mean: 543.5538311816191 usec\nrounds: 3098"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 519465.47467573214,
            "unit": "iter/sec",
            "range": "stddev: 5.41606669985169e-7",
            "extra": "mean: 1.925055752019388 usec\nrounds: 1130"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.388847724227066,
            "unit": "iter/sec",
            "range": "stddev: 0.006173552299956052",
            "extra": "mean: 61.01710241176594 msec\nrounds: 17"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104296.69966286291,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015472484416032165",
            "extra": "mean: 9.588031100049003 usec\nrounds: 16270"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1192.195258663414,
            "unit": "iter/sec",
            "range": "stddev: 0.000021540915444704976",
            "extra": "mean: 838.7887745176182 usec\nrounds: 1193"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ba7b3db38607f336429cae3e6166671cd39f9881",
          "message": "Create syntha sdk documentation (#5)\n\n* Refactor documentation structure and update MkDocs configuration\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Add GitHub Pages workflow and comprehensive documentation setup\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Add comprehensive documentation for Syntha's persistence, tools, and deployment\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Update docs/installation.md\n\nCo-authored-by: Copilot <175728472+Copilot@users.noreply.github.com>\n\n* Fix test assertions and improve cleanup logic in persistence integration tests\n\n- Updated assertions to provide clearer error messages when expected values do not match.\n- Enhanced the cleanup logic by resetting the last cleanup time to ensure proper triggering of auto cleanup.\n- Adjusted sleep duration comments for better clarity on timing requirements.\n\nThese changes improve the reliability and clarity of the persistence integration tests.\n\n* Fix whitespace issue in persistence integration test\n\n- Removed unnecessary blank line in `test_persistence_integration.py` to improve code cleanliness and readability.\n\nThis change contributes to a more organized and maintainable test codebase.\n\n---------\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>\nCo-authored-by: Copilot <175728472+Copilot@users.noreply.github.com>",
          "timestamp": "2025-07-29T13:33:32-04:00",
          "tree_id": "0b4b5255db6879d4e07341ee3e95517444f9dbc1",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/ba7b3db38607f336429cae3e6166671cd39f9881"
        },
        "date": 1753810441975,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 312955.87893561996,
            "unit": "iter/sec",
            "range": "stddev: 6.292127397082691e-7",
            "extra": "mean: 3.195338599808556 usec\nrounds: 28101"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 489500.34987765906,
            "unit": "iter/sec",
            "range": "stddev: 5.223051468887593e-7",
            "extra": "mean: 2.0428994591115823 usec\nrounds: 124456"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2285.982157363203,
            "unit": "iter/sec",
            "range": "stddev: 0.000009910608282847554",
            "extra": "mean: 437.4487337002943 usec\nrounds: 2377"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4968.91342719644,
            "unit": "iter/sec",
            "range": "stddev: 0.000006382181661994262",
            "extra": "mean: 201.25124227898246 usec\nrounds: 4144"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 697.5802324796394,
            "unit": "iter/sec",
            "range": "stddev: 0.0002392201183268546",
            "extra": "mean: 1.4335268596206778 msec\nrounds: 577"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1845.5164057950576,
            "unit": "iter/sec",
            "range": "stddev: 0.000028829239920798118",
            "extra": "mean: 541.8537580375478 usec\nrounds: 3017"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 544859.1574682294,
            "unit": "iter/sec",
            "range": "stddev: 4.101456384738504e-7",
            "extra": "mean: 1.8353366852576205 usec\nrounds: 1491"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 21.457254413412546,
            "unit": "iter/sec",
            "range": "stddev: 0.004752372325618576",
            "extra": "mean: 46.60428499999133 msec\nrounds: 24"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103891.71008413217,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015243076087580553",
            "extra": "mean: 9.625407062702054 usec\nrounds: 20670"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1204.8397129083303,
            "unit": "iter/sec",
            "range": "stddev: 0.000014971522725022746",
            "extra": "mean: 829.985922016238 usec\nrounds: 1231"
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
          "id": "e52120bfb0c3502bbb9723a57d9a4d6804feb5ae",
          "message": "Enhance user isolation and persistence features in Syntha\n\n- Added support for user-specific context management in PostgreSQL, allowing distinct contexts for different users.\n- Updated the ContextMesh class to handle connection strings and individual parameters for PostgreSQL configuration.\n- Improved documentation for installation and usage of PostgreSQL with Syntha.\n- Enhanced tests for user isolation, ensuring that contexts, agent topics, and permissions are properly isolated between users in both SQLite and PostgreSQL backends.\n\nThese changes improve the robustness and clarity of user isolation features, enhancing the overall functionality of the Syntha SDK.",
          "timestamp": "2025-07-29T18:49:43-04:00",
          "tree_id": "b08380f32af8317c68391b618ae130ea6d7f08f3",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/e52120bfb0c3502bbb9723a57d9a4d6804feb5ae"
        },
        "date": 1753829422648,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 313288.77710362274,
            "unit": "iter/sec",
            "range": "stddev: 6.041967245772451e-7",
            "extra": "mean: 3.1919432583735423 usec\nrounds: 38332"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 487948.72346755763,
            "unit": "iter/sec",
            "range": "stddev: 5.265224876271345e-7",
            "extra": "mean: 2.0493956678349363 usec\nrounds: 152393"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2258.748648891193,
            "unit": "iter/sec",
            "range": "stddev: 0.000018772220092977313",
            "extra": "mean: 442.7230097031356 usec\nrounds: 2370"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4884.63731599024,
            "unit": "iter/sec",
            "range": "stddev: 0.000017672568751417435",
            "extra": "mean: 204.7234902633246 usec\nrounds: 4314"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 729.8013154614262,
            "unit": "iter/sec",
            "range": "stddev: 0.0000618009496537173",
            "extra": "mean: 1.370235951640807 msec\nrounds: 641"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1813.9277536488719,
            "unit": "iter/sec",
            "range": "stddev: 0.000012448093869729376",
            "extra": "mean: 551.2898724816431 usec\nrounds: 3027"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 551667.4825363584,
            "unit": "iter/sec",
            "range": "stddev: 3.901690827863821e-7",
            "extra": "mean: 1.8126861409383388 usec\nrounds: 1472"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 17.192353691294986,
            "unit": "iter/sec",
            "range": "stddev: 0.007654361197149321",
            "extra": "mean: 58.16539247365127 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 105582.41330994172,
            "unit": "iter/sec",
            "range": "stddev: 0.000001695432923555737",
            "extra": "mean: 9.471274321647272 usec\nrounds: 21832"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1211.470768693696,
            "unit": "iter/sec",
            "range": "stddev: 0.00002068964318983554",
            "extra": "mean: 825.4429457495532 usec\nrounds: 1235"
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
          "id": "35e528b95284840ff002da00cfc8709ffef4d63f",
          "message": "Enhance PostgreSQL backend for user isolation and context management\n\n- Implemented unique constraints for handling NULL user_id in context_items, agent_topics, and agent_permissions tables.\n- Updated save and retrieval methods to support legacy mode where user_id can be NULL, ensuring proper context management.\n- Improved cleanup and deletion methods to respect user isolation by filtering on user_id.\n- Enhanced tests to validate the new behavior and ensure robustness in user-specific context handling.\n\nThese changes strengthen the user isolation features in the PostgreSQL backend, improving the overall functionality and reliability of the Syntha SDK.",
          "timestamp": "2025-07-29T19:11:33-04:00",
          "tree_id": "f36988de38c7619ebf7e5d9e0b3f8dec7899a737",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/35e528b95284840ff002da00cfc8709ffef4d63f"
        },
        "date": 1753830730656,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 308576.7986000278,
            "unit": "iter/sec",
            "range": "stddev: 5.988911923644231e-7",
            "extra": "mean: 3.2406843435309067 usec\nrounds: 28889"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 474972.84124956524,
            "unit": "iter/sec",
            "range": "stddev: 5.50083314864595e-7",
            "extra": "mean: 2.105383535970575 usec\nrounds: 133977"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2181.020647224915,
            "unit": "iter/sec",
            "range": "stddev: 0.0000323471402848236",
            "extra": "mean: 458.5009322458176 usec\nrounds: 2391"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4621.8440189464245,
            "unit": "iter/sec",
            "range": "stddev: 0.000009682095436372377",
            "extra": "mean: 216.36385734799325 usec\nrounds: 4178"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 692.0287881252342,
            "unit": "iter/sec",
            "range": "stddev: 0.00010658966698713442",
            "extra": "mean: 1.4450265901640975 msec\nrounds: 610"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1740.4715712277964,
            "unit": "iter/sec",
            "range": "stddev: 0.000010314311649285954",
            "extra": "mean: 574.5569284389754 usec\nrounds: 2697"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 527199.4255277755,
            "unit": "iter/sec",
            "range": "stddev: 6.100273651456594e-7",
            "extra": "mean: 1.8968154204623937 usec\nrounds: 1712"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.18150454516312,
            "unit": "iter/sec",
            "range": "stddev: 0.0038350145390341444",
            "extra": "mean: 45.082604652174474 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104900.37589749858,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012980123904237023",
            "extra": "mean: 9.532854305280383 usec\nrounds: 20440"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1175.1464455326516,
            "unit": "iter/sec",
            "range": "stddev: 0.000019659507562847423",
            "extra": "mean: 850.957771094424 usec\nrounds: 1197"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "dfb48fd052e23d046a043d69e449eac691948fbe",
          "message": "Update testing_temp.py",
          "timestamp": "2025-07-29T19:22:29-04:00",
          "tree_id": "abc2a6b18c1db666cce6e54a9c54ad94a86ad77c",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/dfb48fd052e23d046a043d69e449eac691948fbe"
        },
        "date": 1753831377509,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 310440.5939624069,
            "unit": "iter/sec",
            "range": "stddev: 5.906915729866463e-7",
            "extra": "mean: 3.221228213862701 usec\nrounds: 26129"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 483280.9060699818,
            "unit": "iter/sec",
            "range": "stddev: 4.732979474167923e-7",
            "extra": "mean: 2.069189962690548 usec\nrounds: 130294"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2240.3841268657998,
            "unit": "iter/sec",
            "range": "stddev: 0.00004041562852957599",
            "extra": "mean: 446.3520286581197 usec\nrounds: 2303"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4928.939610622734,
            "unit": "iter/sec",
            "range": "stddev: 0.000006508075596071105",
            "extra": "mean: 202.88339460374473 usec\nrounds: 4744"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 720.5984056332225,
            "unit": "iter/sec",
            "range": "stddev: 0.00005842527610346406",
            "extra": "mean: 1.3877355156250377 msec\nrounds: 576"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1775.6229243061919,
            "unit": "iter/sec",
            "range": "stddev: 0.00006733131862902434",
            "extra": "mean: 563.1826365334524 usec\nrounds: 2677"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 499609.5644002163,
            "unit": "iter/sec",
            "range": "stddev: 4.5367900068332143e-7",
            "extra": "mean: 2.0015629628718274 usec\nrounds: 1080"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.121055344019943,
            "unit": "iter/sec",
            "range": "stddev: 0.0031591955378591687",
            "extra": "mean: 52.29836857894704 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101525.13730368509,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018303286391558493",
            "extra": "mean: 9.849777370985173 usec\nrounds: 14477"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1184.5365643196078,
            "unit": "iter/sec",
            "range": "stddev: 0.00005721239568251848",
            "extra": "mean: 844.2120151642556 usec\nrounds: 1187"
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
          "id": "2647dd19e48d688afe517788a45e28da5837aa3c",
          "message": "Merge branch 'main' of https://github.com/Kirch77/Syntha_v2",
          "timestamp": "2025-07-29T19:33:01-04:00",
          "tree_id": "64c83f5a38bb27bf0e7d99a37471826790b04bea",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/2647dd19e48d688afe517788a45e28da5837aa3c"
        },
        "date": 1753832021138,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 316193.7609658647,
            "unit": "iter/sec",
            "range": "stddev: 5.832824157506403e-7",
            "extra": "mean: 3.1626177472488366 usec\nrounds: 29075"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484241.9107838304,
            "unit": "iter/sec",
            "range": "stddev: 4.866542095568549e-7",
            "extra": "mean: 2.065083541367423 usec\nrounds: 61275"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2223.6643604315227,
            "unit": "iter/sec",
            "range": "stddev: 0.000009081838764577735",
            "extra": "mean: 449.7081564080745 usec\nrounds: 2372"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4884.857184047277,
            "unit": "iter/sec",
            "range": "stddev: 0.00001143572103169255",
            "extra": "mean: 204.71427563240746 usec\nrounds: 4506"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 729.4861006841959,
            "unit": "iter/sec",
            "range": "stddev: 0.00006330585168788365",
            "extra": "mean: 1.3708280377954907 msec\nrounds: 635"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1833.0750152824871,
            "unit": "iter/sec",
            "range": "stddev: 0.000019792409173252517",
            "extra": "mean: 545.5314112422695 usec\nrounds: 2704"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 518425.25231821655,
            "unit": "iter/sec",
            "range": "stddev: 6.55352844315222e-7",
            "extra": "mean: 1.9289183841418784 usec\nrounds: 1213"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 20.874830955382897,
            "unit": "iter/sec",
            "range": "stddev: 0.003385617891583868",
            "extra": "mean: 47.90457954545182 msec\nrounds: 22"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104895.0808059334,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015804410014253055",
            "extra": "mean: 9.533335522664803 usec\nrounds: 19793"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1207.5800083529991,
            "unit": "iter/sec",
            "range": "stddev: 0.00002062153542620996",
            "extra": "mean: 828.1024802355627 usec\nrounds: 1189"
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
          "id": "a79722f7e2d856a9327b4bd1b5f92aab554bc6c1",
          "message": "Merge branch 'main' of https://github.com/Kirch77/Syntha_v2",
          "timestamp": "2025-07-29T19:33:01-04:00",
          "tree_id": "4d6b1d3fbc07c74f261da6e1f70b2e0fd315d1e4",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/a79722f7e2d856a9327b4bd1b5f92aab554bc6c1"
        },
        "date": 1753832503631,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 306065.5232072563,
            "unit": "iter/sec",
            "range": "stddev: 6.04351995119717e-7",
            "extra": "mean: 3.2672742408913438 usec\nrounds: 27928"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 470044.9183872669,
            "unit": "iter/sec",
            "range": "stddev: 4.783842317092401e-7",
            "extra": "mean: 2.127456251268536 usec\nrounds: 134518"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2252.231321000828,
            "unit": "iter/sec",
            "range": "stddev: 0.000020981771293600803",
            "extra": "mean: 444.0041263415289 usec\nrounds: 2422"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4785.302688850987,
            "unit": "iter/sec",
            "range": "stddev: 0.000016498545010779498",
            "extra": "mean: 208.97319668614588 usec\nrounds: 4164"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 665.4505940895676,
            "unit": "iter/sec",
            "range": "stddev: 0.00031456053565356",
            "extra": "mean: 1.5027411634790775 msec\nrounds: 575"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1818.909170222028,
            "unit": "iter/sec",
            "range": "stddev: 0.000010402726902586173",
            "extra": "mean: 549.7800639918339 usec\nrounds: 2891"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 505391.35895086307,
            "unit": "iter/sec",
            "range": "stddev: 5.012565377509803e-7",
            "extra": "mean: 1.9786646176062255 usec\nrounds: 1139"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 20.8096898146433,
            "unit": "iter/sec",
            "range": "stddev: 0.007469778285225076",
            "extra": "mean: 48.05453655999827 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103430.0786366696,
            "unit": "iter/sec",
            "range": "stddev: 0.000001531099050424962",
            "extra": "mean: 9.66836739545381 usec\nrounds: 20218"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1176.8649238602611,
            "unit": "iter/sec",
            "range": "stddev: 0.000024569485377495735",
            "extra": "mean: 849.7151879757597 usec\nrounds: 1181"
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
          "id": "4444c2cb9b633699795b520124a134468f6adad8",
          "message": "Fix test_user_isolation_performance timeout for Windows Python 3.11\n\n- Increased Windows timeout from 5.0 to 8.0 seconds\n- Ensures test passes consistently on all Windows Python versions\n- Test execution time varies between 1.5-2.5s on Windows, well under new limit",
          "timestamp": "2025-07-29T19:59:03-04:00",
          "tree_id": "2f892528bbe19efc642d2dc9a9b87f3a8cf3bb54",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/4444c2cb9b633699795b520124a134468f6adad8"
        },
        "date": 1753833810257,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 308204.44280373544,
            "unit": "iter/sec",
            "range": "stddev: 7.277187360698864e-7",
            "extra": "mean: 3.2445995615864627 usec\nrounds: 26461"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 477004.5477613834,
            "unit": "iter/sec",
            "range": "stddev: 5.55806723113251e-7",
            "extra": "mean: 2.096416071278716 usec\nrounds: 124147"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2278.4918877860005,
            "unit": "iter/sec",
            "range": "stddev: 0.00001023292403874922",
            "extra": "mean: 438.8867940941827 usec\nrounds: 2506"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4871.464448680355,
            "unit": "iter/sec",
            "range": "stddev: 0.000008934086420751084",
            "extra": "mean: 205.27708054420737 usec\nrounds: 4631"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 722.2301646864498,
            "unit": "iter/sec",
            "range": "stddev: 0.00005161578701097026",
            "extra": "mean: 1.384600157809999 msec\nrounds: 621"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1797.4898584253997,
            "unit": "iter/sec",
            "range": "stddev: 0.000029247896923966044",
            "extra": "mean: 556.3313725040983 usec\nrounds: 3055"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 542494.015004879,
            "unit": "iter/sec",
            "range": "stddev: 4.0059378670345603e-7",
            "extra": "mean: 1.843338308517572 usec\nrounds: 1407"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 21.43578951795344,
            "unit": "iter/sec",
            "range": "stddev: 0.0040709596316823166",
            "extra": "mean: 46.65095256521599 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 99547.15099573442,
            "unit": "iter/sec",
            "range": "stddev: 0.000003133207827155005",
            "extra": "mean: 10.045490905539324 usec\nrounds: 20287"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1195.324012301927,
            "unit": "iter/sec",
            "range": "stddev: 0.00008134369931648567",
            "extra": "mean: 836.593249786912 usec\nrounds: 1173"
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
          "id": "8ee347b40116515568042157694c1d8d4e07af02",
          "message": "Refactor assertion in performance test for clarity\n\n- Reformatted the assertion in `test_user_isolation_performance` to improve readability.\n- Ensured that the performance test failure message remains informative and clear regarding expected timeout values.",
          "timestamp": "2025-07-29T20:05:28-04:00",
          "tree_id": "a825c715213da7e8d317aa9375b8c9945fbe22b0",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/8ee347b40116515568042157694c1d8d4e07af02"
        },
        "date": 1753833983636,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 300299.80848671915,
            "unit": "iter/sec",
            "range": "stddev: 6.422664490771449e-7",
            "extra": "mean: 3.3300054536805517 usec\nrounds: 23470"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 478333.4386914692,
            "unit": "iter/sec",
            "range": "stddev: 5.021645500944912e-7",
            "extra": "mean: 2.0905918740191023 usec\nrounds: 110657"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2156.241577707843,
            "unit": "iter/sec",
            "range": "stddev: 0.000015018189969728488",
            "extra": "mean: 463.76992742299 usec\nrounds: 2177"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4831.057648961569,
            "unit": "iter/sec",
            "range": "stddev: 0.000013021291933765393",
            "extra": "mean: 206.99401097292827 usec\nrounds: 4648"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 640.4295732179157,
            "unit": "iter/sec",
            "range": "stddev: 0.00008709528497821089",
            "extra": "mean: 1.561451940726877 msec\nrounds: 523"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1692.4304387844945,
            "unit": "iter/sec",
            "range": "stddev: 0.00004169706674804185",
            "extra": "mean: 590.866234194063 usec\nrounds: 2246"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 307483.8144136595,
            "unit": "iter/sec",
            "range": "stddev: 5.854441699545732e-7",
            "extra": "mean: 3.2522037034921616 usec\nrounds: 810"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 21.919951034973412,
            "unit": "iter/sec",
            "range": "stddev: 0.00408101693031459",
            "extra": "mean: 45.620539863638115 msec\nrounds: 22"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101036.03390599614,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016652844238984698",
            "extra": "mean: 9.897458969246548 usec\nrounds: 17365"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1130.1814884179573,
            "unit": "iter/sec",
            "range": "stddev: 0.00001828598075378682",
            "extra": "mean: 884.8136429838477 usec\nrounds: 1126"
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
          "id": "a8542709fef99c41da24469c458a9697cdbcd5d5",
          "message": "Enhance documentation for ContextMesh API\n\n- Updated `context-mesh.md` to clarify parameter types and return values for methods, including `get`, `remove`, and new methods like `get_keys_for_agent` and `get_available_keys_by_topic`.\n- Improved examples and added explanations for agent permissions and context management.\n- Revised `overview.md`, `persistence.md`, and `prompts.md` to reflect changes in method signatures and enhance clarity.\n- Updated `schemas.md` and `tools.md` to standardize method names and descriptions, ensuring consistency across the API documentation.\n\nThese changes improve the overall clarity and usability of the Syntha API documentation, aiding developers in understanding and implementing the ContextMesh features effectively.",
          "timestamp": "2025-07-30T15:42:36-04:00",
          "tree_id": "8f79ca049fbb23b3a53577acb281bb4de1bc7dc1",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/a8542709fef99c41da24469c458a9697cdbcd5d5"
        },
        "date": 1753904594226,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 316973.5908853895,
            "unit": "iter/sec",
            "range": "stddev: 6.141790388488538e-7",
            "extra": "mean: 3.1548369604128235 usec\nrounds: 28030"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 482847.544691596,
            "unit": "iter/sec",
            "range": "stddev: 4.701643076186317e-7",
            "extra": "mean: 2.0710470851388902 usec\nrounds: 125220"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2289.5639904568907,
            "unit": "iter/sec",
            "range": "stddev: 0.000011474249235864066",
            "extra": "mean: 436.76438141414275 usec\nrounds: 2475"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4959.913092960481,
            "unit": "iter/sec",
            "range": "stddev: 0.000010747939037761087",
            "extra": "mean: 201.6164358644273 usec\nrounds: 4662"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 714.5066097160843,
            "unit": "iter/sec",
            "range": "stddev: 0.00006396566466539422",
            "extra": "mean: 1.3995671788079875 msec\nrounds: 604"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1794.885949345125,
            "unit": "iter/sec",
            "range": "stddev: 0.000010569873518458037",
            "extra": "mean: 557.1384635134373 usec\nrounds: 2960"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 537544.8416672186,
            "unit": "iter/sec",
            "range": "stddev: 3.117180502533915e-7",
            "extra": "mean: 1.8603099173986244 usec\nrounds: 1210"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 13.559185906701599,
            "unit": "iter/sec",
            "range": "stddev: 0.01589631819011101",
            "extra": "mean: 73.75074041176411 msec\nrounds: 17"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 105457.01337080266,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017282057102220785",
            "extra": "mean: 9.482536704162579 usec\nrounds: 20529"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1193.394079909108,
            "unit": "iter/sec",
            "range": "stddev: 0.00002244846785023837",
            "extra": "mean: 837.9461712062142 usec\nrounds: 1028"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "90fc45f034576c158c67e8cc8eed0c4b796f57e0",
          "message": "Revamp documentation with comprehensive guides and real-world examples (#6)\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-07-30T16:39:00-04:00",
          "tree_id": "9a0a8c2603a3add1e1cf3ef7e3b7e80c02ff2457",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/90fc45f034576c158c67e8cc8eed0c4b796f57e0"
        },
        "date": 1753907970830,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 313040.38611246157,
            "unit": "iter/sec",
            "range": "stddev: 5.723973853926284e-7",
            "extra": "mean: 3.1944759985082056 usec\nrounds: 24561"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 474300.8451888991,
            "unit": "iter/sec",
            "range": "stddev: 5.726775481450963e-7",
            "extra": "mean: 2.108366472764204 usec\nrounds: 114325"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2175.952550708212,
            "unit": "iter/sec",
            "range": "stddev: 0.00003934731252910743",
            "extra": "mean: 459.56884476847983 usec\nrounds: 2332"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4863.27343445338,
            "unit": "iter/sec",
            "range": "stddev: 0.000005770090094692543",
            "extra": "mean: 205.6228204064363 usec\nrounds: 4577"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 694.435278723792,
            "unit": "iter/sec",
            "range": "stddev: 0.0000704957793385672",
            "extra": "mean: 1.440019006289202 msec\nrounds: 477"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1753.8890578947144,
            "unit": "iter/sec",
            "range": "stddev: 0.000026551957167856046",
            "extra": "mean: 570.1614908301856 usec\nrounds: 2072"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 331084.6513636272,
            "unit": "iter/sec",
            "range": "stddev: 6.563933212414995e-7",
            "extra": "mean: 3.020375592409173 usec\nrounds: 844"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.09000002948679,
            "unit": "iter/sec",
            "range": "stddev: 0.003938274034335078",
            "extra": "mean: 55.27915966666638 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102818.13096918838,
            "unit": "iter/sec",
            "range": "stddev: 0.000001433690439901182",
            "extra": "mean: 9.72591108760449 usec\nrounds: 17028"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1162.6696582491427,
            "unit": "iter/sec",
            "range": "stddev: 0.000013558826204026956",
            "extra": "mean: 860.0895300784696 usec\nrounds: 1147"
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
          "id": "e45f68b96ac8984d6569de9dc88285a70c329f17",
          "message": "Enhance documentation clarity by adding spacing for improved readability\n\n- Added blank lines in various sections of the guides to enhance visual separation and readability.\n- Updated multiple documents including `advanced.md`, `basics.md`, `context.md`, `overview.md`, and `tools.md` to ensure consistent formatting and better user experience.\n\nThese changes improve the overall presentation of the documentation, making it easier for users to navigate and understand the content.",
          "timestamp": "2025-07-30T20:55:56-04:00",
          "tree_id": "fccaabfb858f8d307c20f9379d3c03c956eb3630",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/e45f68b96ac8984d6569de9dc88285a70c329f17"
        },
        "date": 1753923397650,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 312238.0481912191,
            "unit": "iter/sec",
            "range": "stddev: 5.730263997416445e-7",
            "extra": "mean: 3.2026846369074966 usec\nrounds: 51214"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 483293.7085651609,
            "unit": "iter/sec",
            "range": "stddev: 4.6498455302492026e-7",
            "extra": "mean: 2.0691351496564603 usec\nrounds: 154991"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2230.2253081092967,
            "unit": "iter/sec",
            "range": "stddev: 0.000008319494138328091",
            "extra": "mean: 448.3851906638811 usec\nrounds: 2528"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4897.3176939556815,
            "unit": "iter/sec",
            "range": "stddev: 0.0000059202757115406725",
            "extra": "mean: 204.19341004448415 usec\nrounds: 4580"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 733.1890669302884,
            "unit": "iter/sec",
            "range": "stddev: 0.00005146387550832931",
            "extra": "mean: 1.3639046803940955 msec\nrounds: 607"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1818.9787596012281,
            "unit": "iter/sec",
            "range": "stddev: 0.000017044453275975054",
            "extra": "mean: 549.7590308416951 usec\nrounds: 2983"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 551033.2082430962,
            "unit": "iter/sec",
            "range": "stddev: 4.403766856137235e-7",
            "extra": "mean: 1.8147726580551846 usec\nrounds: 1346"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 26.28034500214471,
            "unit": "iter/sec",
            "range": "stddev: 0.0022945185284554267",
            "extra": "mean: 38.051250846151035 msec\nrounds: 26"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101699.0337081852,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012483368899501989",
            "extra": "mean: 9.832935117843853 usec\nrounds: 22117"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1196.9802410631933,
            "unit": "iter/sec",
            "range": "stddev: 0.00001218585340523854",
            "extra": "mean: 835.4356786305599 usec\nrounds: 1226"
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
          "id": "fefe8a42dac99dcff18653e42fab10f611893847",
          "message": "Enhance ContextMesh routing options in documentation and implementation\n\n- Updated `context-mesh.md`, `schemas.md`, and `tools.md` to clarify and expand on routing options, including the introduction of combined routing that allows the use of both topics and subscribers.\n- Revised method descriptions and examples to reflect the new routing capabilities, improving clarity for users.\n- Modified the `ContextMesh` class to support combined routing, ensuring that both topic subscribers and direct subscribers can receive context.\n- Added tests to validate the functionality of combined routing, ensuring proper access for both types of subscribers.\n\nThese changes improve the flexibility and usability of the ContextMesh API, aiding developers in implementing more complex routing scenarios effectively.",
          "timestamp": "2025-07-31T10:14:40-04:00",
          "tree_id": "903073c43c3f019d1fd3f1ce495072eaeef305b0",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/fefe8a42dac99dcff18653e42fab10f611893847"
        },
        "date": 1753971334023,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 290015.96310888254,
            "unit": "iter/sec",
            "range": "stddev: 5.994982513507172e-7",
            "extra": "mean: 3.4480860614716016 usec\nrounds: 21624"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 481707.9246208094,
            "unit": "iter/sec",
            "range": "stddev: 4.965014152865998e-7",
            "extra": "mean: 2.0759467488254 usec\nrounds: 136185"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2179.7344298230264,
            "unit": "iter/sec",
            "range": "stddev: 0.00001794012127321279",
            "extra": "mean: 458.7714844148195 usec\nrounds: 2374"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4923.409322396291,
            "unit": "iter/sec",
            "range": "stddev: 0.000017841881597683033",
            "extra": "mean: 203.1112862079252 usec\nrounds: 4626"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 722.4745123479518,
            "unit": "iter/sec",
            "range": "stddev: 0.000052999436100337224",
            "extra": "mean: 1.3841318730402339 msec\nrounds: 638"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1821.0187953572336,
            "unit": "iter/sec",
            "range": "stddev: 0.000010472110651943517",
            "extra": "mean: 549.1431513774286 usec\nrounds: 3085"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 540136.3109776352,
            "unit": "iter/sec",
            "range": "stddev: 7.765673091468061e-7",
            "extra": "mean: 1.8513845110505927 usec\nrounds: 1472"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.591623011218378,
            "unit": "iter/sec",
            "range": "stddev: 0.0030444354341082726",
            "extra": "mean: 51.042223476196384 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101902.53482787345,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014670167208821776",
            "extra": "mean: 9.813298576812924 usec\nrounds: 20169"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1157.3529113377808,
            "unit": "iter/sec",
            "range": "stddev: 0.000014937628939538395",
            "extra": "mean: 864.0406830135355 usec\nrounds: 1142"
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
          "id": "1cc30a4772033846c3f6504b7d3abfb49b13686a",
          "message": "Refactor code for improved readability and consistency in ContextMesh and tools\n\n- Cleaned up spacing and formatting in `context.py`, `tools.py`, and test files to enhance code readability.\n- Updated method calls to use multi-line formatting for better clarity.\n- Ensured consistent handling of parameters in error responses and assertions across tests.\n\nThese changes contribute to a cleaner codebase, making it easier for developers to read and maintain the code.",
          "timestamp": "2025-07-31T10:16:45-04:00",
          "tree_id": "fa8c177851a4e1d32c8184df8e7a8d7275f4ad17",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/1cc30a4772033846c3f6504b7d3abfb49b13686a"
        },
        "date": 1753971517905,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 301432.6598813977,
            "unit": "iter/sec",
            "range": "stddev: 6.239811319501169e-7",
            "extra": "mean: 3.3174905479501193 usec\nrounds: 27983"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 483678.73177757685,
            "unit": "iter/sec",
            "range": "stddev: 4.788281318719811e-7",
            "extra": "mean: 2.0674880541571077 usec\nrounds: 134899"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2193.0352937130274,
            "unit": "iter/sec",
            "range": "stddev: 0.000009248257070475902",
            "extra": "mean: 455.98901343119763 usec\nrounds: 2308"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4715.191176766791,
            "unit": "iter/sec",
            "range": "stddev: 0.000022501168979593193",
            "extra": "mean: 212.08047829053254 usec\nrounds: 4376"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 701.3297875563294,
            "unit": "iter/sec",
            "range": "stddev: 0.00028225280961249476",
            "extra": "mean: 1.425862722135814 msec\nrounds: 637"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1837.8152077192144,
            "unit": "iter/sec",
            "range": "stddev: 0.000017359557193178316",
            "extra": "mean: 544.1243471050775 usec\nrounds: 2953"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 518691.4605126531,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010668418188324612",
            "extra": "mean: 1.9279284047044873 usec\nrounds: 1285"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 20.95850450842496,
            "unit": "iter/sec",
            "range": "stddev: 0.008807454072495668",
            "extra": "mean: 47.71332800000197 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 104522.9026829523,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014945898500321285",
            "extra": "mean: 9.56728118270198 usec\nrounds: 21374"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1182.7687421658218,
            "unit": "iter/sec",
            "range": "stddev: 0.000037747242720834916",
            "extra": "mean: 845.4738144067405 usec\nrounds: 1180"
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
          "id": "3e196428236536dbc22acd502ba17ddb811d858d",
          "message": "Update ContextMesh to handle no subscribers scenario and enhance routing tests\n\n- Modified `ContextMesh` to return a special marker \"__NO_SUBSCRIBERS__\" when there are topics but no subscribers, ensuring proper context management.\n- Refactored the test for combined routing to validate access for both topic and direct subscribers, confirming that only authorized agents can retrieve context.\n\nThese changes improve the robustness of the ContextMesh functionality and enhance test coverage for edge cases.",
          "timestamp": "2025-07-31T10:30:50-04:00",
          "tree_id": "088ae3e9e7da997913d69ed927b9a74f1429fd3d",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/3e196428236536dbc22acd502ba17ddb811d858d"
        },
        "date": 1753972297049,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 292287.7859219857,
            "unit": "iter/sec",
            "range": "stddev: 6.988675349489032e-7",
            "extra": "mean: 3.4212856238437186 usec\nrounds: 23692"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 482351.91609584173,
            "unit": "iter/sec",
            "range": "stddev: 5.476014644033315e-7",
            "extra": "mean: 2.073175137551031 usec\nrounds: 114864"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2186.058023213898,
            "unit": "iter/sec",
            "range": "stddev: 0.000010693799178337633",
            "extra": "mean: 457.4443996366667 usec\nrounds: 2202"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4934.892638654055,
            "unit": "iter/sec",
            "range": "stddev: 0.000011981492440372213",
            "extra": "mean: 202.63865360863056 usec\nrounds: 4697"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 693.137099847681,
            "unit": "iter/sec",
            "range": "stddev: 0.00007120859463787521",
            "extra": "mean: 1.442716022875926 msec\nrounds: 612"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1801.9040667139197,
            "unit": "iter/sec",
            "range": "stddev: 0.00001098030945908155",
            "extra": "mean: 554.9685016381982 usec\nrounds: 3052"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 536798.7672656135,
            "unit": "iter/sec",
            "range": "stddev: 4.0591165202129094e-7",
            "extra": "mean: 1.8628954851999309 usec\nrounds: 1196"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.825838058640397,
            "unit": "iter/sec",
            "range": "stddev: 0.0032485479906590176",
            "extra": "mean: 50.43922970833433 msec\nrounds: 24"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 87631.0998789478,
            "unit": "iter/sec",
            "range": "stddev: 0.000004257910545938436",
            "extra": "mean: 11.411473796190895 usec\nrounds: 15971"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1174.759950240364,
            "unit": "iter/sec",
            "range": "stddev: 0.000035555990129628075",
            "extra": "mean: 851.237735671354 usec\nrounds: 1169"
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
          "id": "70a78c1921f6ad985d1fd7407c5c4c8f9a601d40",
          "message": "Update final_subscribers type hint in ContextMesh for clarity\n\n- Added type hint for `final_subscribers` in the `ContextMesh` class to specify it as an `Optional[List[str]]`, enhancing code readability and maintainability.\n- This change improves type safety and provides better context for developers working with the code.",
          "timestamp": "2025-07-31T10:37:39-04:00",
          "tree_id": "01e81a926bb0afcffabd18a6e3f050e4c004cc02",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/70a78c1921f6ad985d1fd7407c5c4c8f9a601d40"
        },
        "date": 1753972708958,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 295714.53436731966,
            "unit": "iter/sec",
            "range": "stddev: 6.004487300292918e-7",
            "extra": "mean: 3.381639668606404 usec\nrounds: 26434"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484387.53097035276,
            "unit": "iter/sec",
            "range": "stddev: 5.008476006261255e-7",
            "extra": "mean: 2.064462720575699 usec\nrounds: 134699"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2157.3266321458286,
            "unit": "iter/sec",
            "range": "stddev: 0.000025963934351920363",
            "extra": "mean: 463.5366685318902 usec\nrounds: 2323"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4825.703907837376,
            "unit": "iter/sec",
            "range": "stddev: 0.000007459917236334806",
            "extra": "mean: 207.22365464153535 usec\nrounds: 4546"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 709.0529228443532,
            "unit": "iter/sec",
            "range": "stddev: 0.00005937810667497007",
            "extra": "mean: 1.4103319622300092 msec\nrounds: 556"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1788.8088160538339,
            "unit": "iter/sec",
            "range": "stddev: 0.00004707008132863594",
            "extra": "mean: 559.0312340957879 usec\nrounds: 2798"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 541451.441219974,
            "unit": "iter/sec",
            "range": "stddev: 3.664446754077102e-7",
            "extra": "mean: 1.846887687189169 usec\nrounds: 1202"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.162087401904554,
            "unit": "iter/sec",
            "range": "stddev: 0.006331097607007519",
            "extra": "mean: 55.059750450002554 msec\nrounds: 20"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 99462.14704256422,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013721624025887234",
            "extra": "mean: 10.054076145893534 usec\nrounds: 20487"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1126.308355703815,
            "unit": "iter/sec",
            "range": "stddev: 0.000014120323228796171",
            "extra": "mean: 887.8563272090025 usec\nrounds: 1143"
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
          "id": "582d9cf30b431cbe96abd4eeccf3798f2492d3f0",
          "message": "Update test assertion in TestBuiltInTools for message clarity\n\n- Modified the assertion in the `TestBuiltInTools` class to check for the presence of the topic name in the result message instead of a generic phrase. This change enhances the specificity of the test and ensures that the output reflects the correct context sharing with topics.",
          "timestamp": "2025-07-31T10:53:19-04:00",
          "tree_id": "da3534ebd88afa0ef0f7c20f53ed5f71833ea809",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/582d9cf30b431cbe96abd4eeccf3798f2492d3f0"
        },
        "date": 1753973640484,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 293279.1281941606,
            "unit": "iter/sec",
            "range": "stddev: 6.410271041926785e-7",
            "extra": "mean: 3.409720992275886 usec\nrounds: 20236"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 481473.45612109033,
            "unit": "iter/sec",
            "range": "stddev: 5.097260357747814e-7",
            "extra": "mean: 2.076957695770669 usec\nrounds: 135282"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2132.2766132275497,
            "unit": "iter/sec",
            "range": "stddev: 0.00002814728142630553",
            "extra": "mean: 468.9823045455328 usec\nrounds: 2200"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4903.86813222189,
            "unit": "iter/sec",
            "range": "stddev: 0.000006749956374178507",
            "extra": "mean: 203.92065468263536 usec\nrounds: 4506"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 690.9340643649467,
            "unit": "iter/sec",
            "range": "stddev: 0.0001136282587833606",
            "extra": "mean: 1.4473161066665932 msec\nrounds: 600"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1811.3931462601086,
            "unit": "iter/sec",
            "range": "stddev: 0.000012098773766691196",
            "extra": "mean: 552.0612695618559 usec\nrounds: 2556"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 535660.9671335338,
            "unit": "iter/sec",
            "range": "stddev: 8.000673148661089e-7",
            "extra": "mean: 1.8668524707918694 usec\nrounds: 1376"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.668765833140004,
            "unit": "iter/sec",
            "range": "stddev: 0.009041492017565097",
            "extra": "mean: 59.9924439523801 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 90301.79980757249,
            "unit": "iter/sec",
            "range": "stddev: 0.0000036959503985914176",
            "extra": "mean: 11.073976400591546 usec\nrounds: 19831"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1151.8030618224975,
            "unit": "iter/sec",
            "range": "stddev: 0.00007526097628956878",
            "extra": "mean: 868.2039778724849 usec\nrounds: 1175"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "febeb88080037fe0bb7551a6304b76bc97d8f5cb",
          "message": "Improve syntha sdk api reference documentation (#7)\n\n* Checkpoint before follow-up message\n\n* Simplify API documentation and remove verbose sections\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n---------\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-07-31T11:36:57-04:00",
          "tree_id": "4de18d2c1d794300ba078c8ee80af685a6df94b0",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/febeb88080037fe0bb7551a6304b76bc97d8f5cb"
        },
        "date": 1753976245672,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 292103.3480995777,
            "unit": "iter/sec",
            "range": "stddev: 6.038949640223793e-7",
            "extra": "mean: 3.4234458677245327 usec\nrounds: 25918"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 475612.6875689836,
            "unit": "iter/sec",
            "range": "stddev: 5.588924767117914e-7",
            "extra": "mean: 2.1025511432660395 usec\nrounds: 136538"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2179.799935425082,
            "unit": "iter/sec",
            "range": "stddev: 0.000009936213497600673",
            "extra": "mean: 458.7576977815583 usec\nrounds: 2389"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4835.584123879664,
            "unit": "iter/sec",
            "range": "stddev: 0.000006918639081771043",
            "extra": "mean: 206.80024881827197 usec\nrounds: 4654"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 695.8246572192365,
            "unit": "iter/sec",
            "range": "stddev: 0.00006137842112542814",
            "extra": "mean: 1.437143667768769 msec\nrounds: 605"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1812.166418620222,
            "unit": "iter/sec",
            "range": "stddev: 0.00004769823426739122",
            "extra": "mean: 551.8256986361093 usec\nrounds: 2346"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 525361.7832158778,
            "unit": "iter/sec",
            "range": "stddev: 5.091528132717318e-7",
            "extra": "mean: 1.9034502164941207 usec\nrounds: 1155"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.71526662009756,
            "unit": "iter/sec",
            "range": "stddev: 0.007006757815972696",
            "extra": "mean: 59.825548866666146 msec\nrounds: 15"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102089.69314026662,
            "unit": "iter/sec",
            "range": "stddev: 0.000001399450779601133",
            "extra": "mean: 9.79530811818628 usec\nrounds: 19869"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1154.2776569728007,
            "unit": "iter/sec",
            "range": "stddev: 0.00006874489309833161",
            "extra": "mean: 866.342681034468 usec\nrounds: 1160"
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
          "id": "f44a768f6bb51a14b2668a73926ca1546094bedf",
          "message": "Update performance thresholds in TestPersistenceIntegration for Python 3.9 on Windows\n\n- Increased the insert, retrieve, and cleanup thresholds to 8.0, 1.5, and 2.5 seconds respectively for better performance handling in the test suite.\n- This adjustment aims to accommodate the specific performance characteristics of the environment, ensuring more reliable test outcomes.",
          "timestamp": "2025-07-31T11:51:23-04:00",
          "tree_id": "a73bb13d76468f9ff8b22a3adb557b0f4f76df50",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/f44a768f6bb51a14b2668a73926ca1546094bedf"
        },
        "date": 1753977123291,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 297361.2033905213,
            "unit": "iter/sec",
            "range": "stddev: 6.91122806021827e-7",
            "extra": "mean: 3.362913482317028 usec\nrounds: 24180"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 488145.5189636624,
            "unit": "iter/sec",
            "range": "stddev: 5.110195598228047e-7",
            "extra": "mean: 2.0485694555242655 usec\nrounds: 135612"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2228.075189600619,
            "unit": "iter/sec",
            "range": "stddev: 0.000010337494819782418",
            "extra": "mean: 448.8178875952787 usec\nrounds: 2233"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4936.088076133528,
            "unit": "iter/sec",
            "range": "stddev: 0.000006602748891553749",
            "extra": "mean: 202.58957793624032 usec\nrounds: 4632"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 698.0282792955808,
            "unit": "iter/sec",
            "range": "stddev: 0.00006818942777243701",
            "extra": "mean: 1.4326067147439292 msec\nrounds: 624"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1857.269584111363,
            "unit": "iter/sec",
            "range": "stddev: 0.000009834512255438345",
            "extra": "mean: 538.424797646414 usec\nrounds: 3059"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 522242.690805133,
            "unit": "iter/sec",
            "range": "stddev: 4.17053341454913e-7",
            "extra": "mean: 1.9148185654035987 usec\nrounds: 1185"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.16481197292154,
            "unit": "iter/sec",
            "range": "stddev: 0.0037917227314423958",
            "extra": "mean: 45.11655687500019 msec\nrounds: 24"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100195.96000865698,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016724599052040903",
            "extra": "mean: 9.980442324357185 usec\nrounds: 13888"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1148.5534088091404,
            "unit": "iter/sec",
            "range": "stddev: 0.000014576013883741327",
            "extra": "mean: 870.6604258280287 usec\nrounds: 1146"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0ac9546cde6cdc4432212a5f3077eddad5ac71fd",
          "message": "Rewrite main readme for syntha (#8)\n\n* Refactor README to showcase Syntha SDK with comprehensive overview and features\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Refactor README with clearer messaging and improved code examples\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n---------\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-07-31T12:13:57-04:00",
          "tree_id": "71b0dd7f47a974cff635a108c0539c249ebb5c52",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/0ac9546cde6cdc4432212a5f3077eddad5ac71fd"
        },
        "date": 1753978466179,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 294642.47532994335,
            "unit": "iter/sec",
            "range": "stddev: 5.335616035742848e-7",
            "extra": "mean: 3.393943791981081 usec\nrounds: 27416"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 480206.9253067851,
            "unit": "iter/sec",
            "range": "stddev: 5.197555292436604e-7",
            "extra": "mean: 2.0824356070274077 usec\nrounds: 137647"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2182.1734495494297,
            "unit": "iter/sec",
            "range": "stddev: 0.000019776413276769955",
            "extra": "mean: 458.2587145886491 usec\nrounds: 2358"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4772.606634777857,
            "unit": "iter/sec",
            "range": "stddev: 0.000007663646129408884",
            "extra": "mean: 209.52910569101311 usec\nrounds: 4182"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 714.9791554032957,
            "unit": "iter/sec",
            "range": "stddev: 0.00007090206614326806",
            "extra": "mean: 1.398642173611248 msec\nrounds: 576"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1858.235766199442,
            "unit": "iter/sec",
            "range": "stddev: 0.000014607479177285095",
            "extra": "mean: 538.1448458745634 usec\nrounds: 3030"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 532373.5673835034,
            "unit": "iter/sec",
            "range": "stddev: 3.971441159175804e-7",
            "extra": "mean: 1.878380260152238 usec\nrounds: 1307"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.07891469978726,
            "unit": "iter/sec",
            "range": "stddev: 0.005559501567702869",
            "extra": "mean: 45.29208131818343 msec\nrounds: 22"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 99887.5557768615,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023898894106070186",
            "extra": "mean: 10.011257080250285 usec\nrounds: 20091"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1157.4614525628444,
            "unit": "iter/sec",
            "range": "stddev: 0.00003242822836371729",
            "extra": "mean: 863.9596573914456 usec\nrounds: 1150"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "60b8f8515de3d231cd1eede420b69bfb8fa4d58a",
          "message": "Add user_id to ContextMesh examples in documentation (#9)\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-07-31T12:45:31-04:00",
          "tree_id": "6d4f85e66d4f8066cf727bda137f60d91cfb65d7",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/60b8f8515de3d231cd1eede420b69bfb8fa4d58a"
        },
        "date": 1753980358965,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 302877.87766673433,
            "unit": "iter/sec",
            "range": "stddev: 5.814266122319896e-7",
            "extra": "mean: 3.301660747571436 usec\nrounds: 27369"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 478431.806696665,
            "unit": "iter/sec",
            "range": "stddev: 5.086246278063669e-7",
            "extra": "mean: 2.0901620377301113 usec\nrounds: 130124"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2146.3185879002317,
            "unit": "iter/sec",
            "range": "stddev: 0.000011199272723730532",
            "extra": "mean: 465.9140565792293 usec\nrounds: 2333"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4892.192846979768,
            "unit": "iter/sec",
            "range": "stddev: 0.000012739561115961993",
            "extra": "mean: 204.40731411832172 usec\nrounds: 4597"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 711.1132254001263,
            "unit": "iter/sec",
            "range": "stddev: 0.000066845426966525",
            "extra": "mean: 1.406245818923314 msec\nrounds: 613"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1815.1596894883542,
            "unit": "iter/sec",
            "range": "stddev: 0.000015228159027630559",
            "extra": "mean: 550.9157160061624 usec\nrounds: 3155"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 491180.0150225928,
            "unit": "iter/sec",
            "range": "stddev: 6.233595317102895e-7",
            "extra": "mean: 2.035913452126107 usec\nrounds: 1063"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.206898976372823,
            "unit": "iter/sec",
            "range": "stddev: 0.0062531829124607245",
            "extra": "mean: 61.7021184285684 msec\nrounds: 14"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101221.86504058365,
            "unit": "iter/sec",
            "range": "stddev: 0.000001364065408592826",
            "extra": "mean: 9.879288428434533 usec\nrounds: 20317"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1151.9537612207307,
            "unit": "iter/sec",
            "range": "stddev: 0.000022837211012647946",
            "extra": "mean: 868.0903988197368 usec\nrounds: 1186"
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
          "id": "ddd302f786d72ed4c9595adc5c05ba650800ec8e",
          "message": "Enhance context sharing and topic subscription in examples\n\n- Updated examples to reflect the transition from direct messaging to context sharing among agents, improving clarity and functionality.\n- Refactored agent communication steps to utilize context pushing and topic subscriptions, enhancing the demonstration of multi-agent interactions.\n- Added recommendations in documentation regarding the use of context mesh for safer database interactions.\n\nThese changes improve the usability and understanding of the context management features in the Syntha SDK.",
          "timestamp": "2025-07-31T15:43:46-04:00",
          "tree_id": "dcd82b28d2ea58b3742e5a8f92092df747eb834f",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/ddd302f786d72ed4c9595adc5c05ba650800ec8e"
        },
        "date": 1753991121926,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 299090.4742996167,
            "unit": "iter/sec",
            "range": "stddev: 6.023995873769318e-7",
            "extra": "mean: 3.3434699060266313 usec\nrounds: 26384"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 487546.7502174751,
            "unit": "iter/sec",
            "range": "stddev: 5.229059949791965e-7",
            "extra": "mean: 2.051085356540557 usec\nrounds: 125708"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2180.254070675667,
            "unit": "iter/sec",
            "range": "stddev: 0.000021495337453738696",
            "extra": "mean: 458.66214100914254 usec\nrounds: 2319"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4926.624721940191,
            "unit": "iter/sec",
            "range": "stddev: 0.000011670902811393757",
            "extra": "mean: 202.97872406367955 usec\nrounds: 4646"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 712.4099849979322,
            "unit": "iter/sec",
            "range": "stddev: 0.00005345197068567302",
            "extra": "mean: 1.403686109204242 msec\nrounds: 641"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1852.0827766657874,
            "unit": "iter/sec",
            "range": "stddev: 0.000014393892369530184",
            "extra": "mean: 539.9326707201772 usec\nrounds: 3125"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 514408.97339878895,
            "unit": "iter/sec",
            "range": "stddev: 5.539016975113303e-7",
            "extra": "mean: 1.9439785301427135 usec\nrounds: 1211"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.10004251593081,
            "unit": "iter/sec",
            "range": "stddev: 0.003586918835851983",
            "extra": "mean: 52.35590439999953 msec\nrounds: 20"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101811.18468077769,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013209670743136105",
            "extra": "mean: 9.82210356490237 usec\nrounds: 21291"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1164.406160386286,
            "unit": "iter/sec",
            "range": "stddev: 0.00003967365527069812",
            "extra": "mean: 858.8068614032882 usec\nrounds: 570"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "fc093cc81749f1a9730d04647484f1d25dc96634",
          "message": "Refactor database backend configuration and remove connection pooling options (#10)\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-07-31T16:05:29-04:00",
          "tree_id": "336c2831d428b94f9e094f7e0b1f5fbce9106160",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/fc093cc81749f1a9730d04647484f1d25dc96634"
        },
        "date": 1753992359208,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 279672.1115356782,
            "unit": "iter/sec",
            "range": "stddev: 6.379870515277333e-7",
            "extra": "mean: 3.575615725533035 usec\nrounds: 24368"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 418045.1609302926,
            "unit": "iter/sec",
            "range": "stddev: 6.276789415753788e-7",
            "extra": "mean: 2.3920860554267867 usec\nrounds: 139782"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 1805.6426004460545,
            "unit": "iter/sec",
            "range": "stddev: 0.00002047668793042878",
            "extra": "mean: 553.8194544994487 usec\nrounds: 1978"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4282.078915599519,
            "unit": "iter/sec",
            "range": "stddev: 0.000006649314018181231",
            "extra": "mean: 233.53142707319614 usec\nrounds: 4100"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 713.071649879748,
            "unit": "iter/sec",
            "range": "stddev: 0.000055523433667627305",
            "extra": "mean: 1.402383617647174 msec\nrounds: 612"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1537.2592641148367,
            "unit": "iter/sec",
            "range": "stddev: 0.000041352164852274674",
            "extra": "mean: 650.5083581823826 usec\nrounds: 2817"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 472941.5474000085,
            "unit": "iter/sec",
            "range": "stddev: 5.641257790781926e-7",
            "extra": "mean: 2.1144262023446454 usec\nrounds: 1206"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 23.202031579536733,
            "unit": "iter/sec",
            "range": "stddev: 0.007195388331254723",
            "extra": "mean: 43.09967412000077 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102799.13412053887,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014021141985751611",
            "extra": "mean: 9.727708395164427 usec\nrounds: 20226"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1149.3326795419937,
            "unit": "iter/sec",
            "range": "stddev: 0.00005538614021753038",
            "extra": "mean: 870.0701005025783 usec\nrounds: 1194"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "23b759f94a2de91594b701ed43399268d1b2ed4d",
          "message": "Update framework integration guide with comprehensive examples (#11)\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-07-31T16:59:38-04:00",
          "tree_id": "0993aab27ef1c9da906992f22eae9116ad29e319",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/23b759f94a2de91594b701ed43399268d1b2ed4d"
        },
        "date": 1753995607833,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 294740.935366639,
            "unit": "iter/sec",
            "range": "stddev: 5.930754277013348e-7",
            "extra": "mean: 3.3928100240167303 usec\nrounds: 39126"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 481714.10307180765,
            "unit": "iter/sec",
            "range": "stddev: 4.896971023167523e-7",
            "extra": "mean: 2.0759201227931103 usec\nrounds: 151470"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2151.639869603518,
            "unit": "iter/sec",
            "range": "stddev: 0.000014101389517147126",
            "extra": "mean: 464.76179128632225 usec\nrounds: 2410"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4826.972275251465,
            "unit": "iter/sec",
            "range": "stddev: 0.000007894128889048944",
            "extra": "mean: 207.16920317258382 usec\nrounds: 4602"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 710.5879550932991,
            "unit": "iter/sec",
            "range": "stddev: 0.00005743752386755639",
            "extra": "mean: 1.4072853231359679 msec\nrounds: 523"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1791.6671089724643,
            "unit": "iter/sec",
            "range": "stddev: 0.0000475415548359103",
            "extra": "mean: 558.1393970967677 usec\nrounds: 3100"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 546848.3294631899,
            "unit": "iter/sec",
            "range": "stddev: 3.733224416031663e-7",
            "extra": "mean: 1.8286606104870862 usec\nrounds: 1376"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 21.733839518487258,
            "unit": "iter/sec",
            "range": "stddev: 0.0029598128853041738",
            "extra": "mean: 46.01119830434835 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 92428.20614837517,
            "unit": "iter/sec",
            "range": "stddev: 0.0000033409010991422595",
            "extra": "mean: 10.81920813647187 usec\nrounds: 21803"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1117.3495576002101,
            "unit": "iter/sec",
            "range": "stddev: 0.0001832496492633649",
            "extra": "mean: 894.9750713176564 usec\nrounds: 645"
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
          "id": "ef79c5779112a74a10936f712fbafa35df304cfd",
          "message": "Enhance auto-cleanup tests in TestPersistenceIntegration\n\n- Implemented a more robust approach for testing auto-cleanup with database persistence, reducing reliance on exact timing.\n- Added assertions to verify that expired items are correctly removed from both the in-memory store and the database.\n- Adjusted test cases to ensure new items are still accessible after cleanup, improving the reliability of the integration tests.",
          "timestamp": "2025-07-31T17:09:34-04:00",
          "tree_id": "1b100008526d5408bf95a22062a51b263eed503a",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/ef79c5779112a74a10936f712fbafa35df304cfd"
        },
        "date": 1753996234599,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 291439.90533897997,
            "unit": "iter/sec",
            "range": "stddev: 7.359767538163691e-7",
            "extra": "mean: 3.4312391051488937 usec\nrounds: 26687"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 475357.66907180345,
            "unit": "iter/sec",
            "range": "stddev: 5.388210431388e-7",
            "extra": "mean: 2.103679113776849 usec\nrounds: 141184"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2198.7698390761707,
            "unit": "iter/sec",
            "range": "stddev: 0.000018569266249422362",
            "extra": "mean: 454.79976222529837 usec\nrounds: 2229"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4812.177494457369,
            "unit": "iter/sec",
            "range": "stddev: 0.000006959013731307452",
            "extra": "mean: 207.80613374128296 usec\nrounds: 4576"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 703.1858992399658,
            "unit": "iter/sec",
            "range": "stddev: 0.00009357890770628782",
            "extra": "mean: 1.4220990510202836 msec\nrounds: 588"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1815.3051852138426,
            "unit": "iter/sec",
            "range": "stddev: 0.000022630607027662184",
            "extra": "mean: 550.8715604104883 usec\nrounds: 3021"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 542554.7868789361,
            "unit": "iter/sec",
            "range": "stddev: 3.4054333589265904e-7",
            "extra": "mean: 1.8431318351323231 usec\nrounds: 1335"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 20.120566299917233,
            "unit": "iter/sec",
            "range": "stddev: 0.003300344775417786",
            "extra": "mean: 49.70039039130393 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102820.35490505862,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014434683988001278",
            "extra": "mean: 9.725700722618313 usec\nrounds: 19096"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1153.0247805551924,
            "unit": "iter/sec",
            "range": "stddev: 0.000026059994836769586",
            "extra": "mean: 867.284048759551 usec\nrounds: 1169"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0ed2b237267d24f51a5c3fb108f837a2f7b61cfe",
          "message": "Automate syntha framework tool integration (#12)\n\n* Add framework integration with automatic tool generation\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Add comprehensive testing suite for Syntha framework integration\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Refactor example scripts for improved readability and consistency\n\n- Standardized string formatting for path insertions and function calls across multiple example files.\n- Enhanced clarity in comments and print statements to better illustrate the functionality of the Syntha framework.\n- Improved formatting of context data pushes and tool retrievals for better visual structure and understanding.\n\nThese changes aim to enhance the usability and maintainability of the example scripts in the Syntha SDK.\n\n* Refactor import statements for consistency and clarity\n\n- Rearranged import statements across multiple files to follow a consistent order, enhancing readability.\n- Added blank lines for better separation of import groups, improving overall code structure.\n\nThese changes aim to standardize the codebase and improve maintainability within the Syntha SDK.\n\n* Update import statements in LangChainAdapter for type checking compatibility\n\n- Added type: ignore comments to import statements for `langchain.tools` and `pydantic` to suppress type checking errors.\n- This change enhances compatibility with type checkers while maintaining existing functionality in the Syntha SDK.\n\n* Update mypy configuration for type checking\n\n- Upgraded Python version from 3.8 to 3.9 to align with project requirements.\n- Adjusted type checking settings by disabling warnings for return types, unused configurations, and untyped definitions to reduce strictness and improve compatibility with existing code.\n- These changes aim to enhance the flexibility of type checking within the Syntha SDK.\n\n* Refactor SQLiteBackend connection handling and improve type checking\n\n- Updated mypy configuration to disable warnings for unused ignores, enhancing compatibility with existing code.\n- Refactored connection handling in SQLiteBackend to ensure operations only proceed if a connection is established, improving robustness.\n- Cleaned up import statements in LangChainAdapter by removing unnecessary type: ignore comments, streamlining the code.\n\nThese changes aim to enhance the stability and maintainability of the Syntha SDK.\n\n* Update mypy configuration and refactor type annotations\n\n- Added configuration to ignore attr-defined errors in the persistence module to improve type checking flexibility.\n- Updated type annotations in the ContextMesh class for better clarity and type safety.\n- Introduced a HybridHandler class to encapsulate utility methods and improve the structure of the tool handler.\n\nThese changes aim to enhance type checking and code organization within the Syntha SDK.\n\n* Refactor print statements and formatting in test scripts for consistency\n\n- Standardized print statements and added spacing for improved readability in `simple_test.py` and `test_basic.py`.\n- Ensured consistent formatting of function calls and import statements across the files.\n- These changes aim to enhance the clarity and maintainability of the test scripts in the Syntha SDK.\n\n* Enhance error handling and improve framework validation in Syntha\n\n- Added additional context to error messages in `FrameworkAdapter` and `ToolFactory` to provide clearer feedback on failures, including framework and tool names.\n- Implemented checks for tool execution errors, returning structured error responses.\n- Updated tests to mock error scenarios for LangChain, ensuring comprehensive coverage of error handling and validation logic.\n\nThese changes aim to improve the robustness and clarity of error handling within the Syntha SDK.\n\n* Refactor test scripts to improve compatibility and performance measurement\n\n- Updated import in `test_framework_adapters.py` to use `pydantic.Field` for better compatibility with Pydantic.\n- Enhanced memory measurement logic in `test_performance_benchmarks.py` to handle cases where `psutil` is not available, ensuring tests can run without failure.\n- Improved assertions in performance tests to account for very fast operations, allowing for more flexible performance expectations.\n\nThese changes aim to enhance the robustness and reliability of the testing framework within the Syntha SDK.\n\n* Improve performance benchmark tests with enhanced readability and memory handling\n\n- Added a blank line for better separation in the `test_performance_benchmarks.py` file.\n- Improved assertion formatting for clarity in performance tests, ensuring better readability of conditions.\n- Maintained compatibility with scenarios where `psutil` is not available, reinforcing the robustness of memory measurement logic.\n\nThese changes aim to enhance the clarity and reliability of performance testing within the Syntha SDK.\n\n* Enhance performance benchmark assertions for flexibility\n\n- Updated assertions in `test_performance_benchmarks.py` to accommodate very fast operations, allowing for a more tolerant evaluation of performance metrics.\n- Introduced conditional checks to ensure that performance expectations are met without failing tests for high-speed scenarios.\n\nThese changes aim to improve the robustness and adaptability of performance testing within the Syntha SDK.\n\n* test\n\n* Potential fix for code scanning alert no. 140: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 97: Except block handles 'BaseException'\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 102: Except block handles 'BaseException'\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 96: Commented-out code\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 115: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 127: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 141: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 142: Empty except\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 130: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 137: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 136: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 101: Unused local variable\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Add missing import for unittest.mock.patch in test files\n\nThis update includes the addition of the 'patch' import from 'unittest.mock' in both test_tool_factory.py and test_tool_handler_integration.py to facilitate mocking in the tests.\n\n* Refactor tests to handle error cases for missing LangChain and Pydantic\n\nUpdated test_create_tool_with_langchain_available and test_pydantic_fields_creation to check for errors when LangChain and Pydantic are not installed, respectively. Removed unnecessary mocking and improved assertions for error handling.\n\n---------\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>",
          "timestamp": "2025-08-04T18:29:24-04:00",
          "tree_id": "c8bc573707dd718d2bb86c0c6536216bd64b17ed",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/0ed2b237267d24f51a5c3fb108f837a2f7b61cfe"
        },
        "date": 1754346597026,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 295091.65279363823,
            "unit": "iter/sec",
            "range": "stddev: 5.854058413589492e-7",
            "extra": "mean: 3.3887776578326805 usec\nrounds: 25933"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 470701.8792618293,
            "unit": "iter/sec",
            "range": "stddev: 5.239556534443498e-7",
            "extra": "mean: 2.1244869503564208 usec\nrounds: 135981"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2194.437713386799,
            "unit": "iter/sec",
            "range": "stddev: 0.000009069414819002514",
            "extra": "mean: 455.6976003008278 usec\nrounds: 1994"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4830.661555227476,
            "unit": "iter/sec",
            "range": "stddev: 0.000007014649697108215",
            "extra": "mean: 207.01098360282663 usec\nrounds: 4574"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 698.223656011429,
            "unit": "iter/sec",
            "range": "stddev: 0.00010831801012694",
            "extra": "mean: 1.4322058431999496 msec\nrounds: 625"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1838.4137364152657,
            "unit": "iter/sec",
            "range": "stddev: 0.000009149963852548845",
            "extra": "mean: 543.9471976258762 usec\nrounds: 3117"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 538222.1848429603,
            "unit": "iter/sec",
            "range": "stddev: 7.983383419882042e-7",
            "extra": "mean: 1.857968750009394 usec\nrounds: 1536"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.207498783136277,
            "unit": "iter/sec",
            "range": "stddev: 0.005419390339899537",
            "extra": "mean: 52.06299952380973 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100978.20912781454,
            "unit": "iter/sec",
            "range": "stddev: 0.000001464784614258797",
            "extra": "mean: 9.903126710578086 usec\nrounds: 21703"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1154.3286608792453,
            "unit": "iter/sec",
            "range": "stddev: 0.00001614186206248281",
            "extra": "mean: 866.3044017622381 usec\nrounds: 1135"
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
          "id": "5464e07e9a7728c66b78f9f22e6164dbd97484dd",
          "message": "Merge branch 'main' of https://github.com/Kirch77/Syntha_v2",
          "timestamp": "2025-08-04T18:31:45-04:00",
          "tree_id": "c8bc573707dd718d2bb86c0c6536216bd64b17ed",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/5464e07e9a7728c66b78f9f22e6164dbd97484dd"
        },
        "date": 1754346735299,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 299870.6062187154,
            "unit": "iter/sec",
            "range": "stddev: 5.90997855022078e-7",
            "extra": "mean: 3.3347716623837225 usec\nrounds: 24928"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 483150.0827425237,
            "unit": "iter/sec",
            "range": "stddev: 5.38577903945648e-7",
            "extra": "mean: 2.0697502405953463 usec\nrounds: 117413"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2161.3973151559007,
            "unit": "iter/sec",
            "range": "stddev: 0.00004770218714944815",
            "extra": "mean: 462.6636634495266 usec\nrounds: 2383"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4995.420737325316,
            "unit": "iter/sec",
            "range": "stddev: 0.00002088552712316977",
            "extra": "mean: 200.18333841794217 usec\nrounds: 4589"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 703.8779620349032,
            "unit": "iter/sec",
            "range": "stddev: 0.00006721742423472121",
            "extra": "mean: 1.4207008230645712 msec\nrounds: 633"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1821.6964934021466,
            "unit": "iter/sec",
            "range": "stddev: 0.00001542133760701087",
            "extra": "mean: 548.9388620013367 usec\nrounds: 3058"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 545264.5104898136,
            "unit": "iter/sec",
            "range": "stddev: 4.64059302109761e-7",
            "extra": "mean: 1.8339722845737665 usec\nrounds: 1335"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.411722662374856,
            "unit": "iter/sec",
            "range": "stddev: 0.0033695041397283957",
            "extra": "mean: 51.51526309090893 msec\nrounds: 22"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101665.27674363177,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015054476367231057",
            "extra": "mean: 9.836200048141208 usec\nrounds: 20765"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1172.451847902143,
            "unit": "iter/sec",
            "range": "stddev: 0.000017428448322422595",
            "extra": "mean: 852.913492173935 usec\nrounds: 1150"
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
          "id": "03b0066343521ca3df6f159f88e12b4d54ebfae2",
          "message": "Refactor error handling in TestLangChainAdapter tests\n\n- Removed unnecessary blank lines in error handling tests for missing LangChain and Pydantic.\n- Improved assertions to ensure clarity in error messages related to missing dependencies.\n\nThese changes enhance the readability and maintainability of the test suite in the Syntha SDK.",
          "timestamp": "2025-08-04T18:34:26-04:00",
          "tree_id": "ef36c887ec872d26b9ffc422cfc59180cf0f9786",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/03b0066343521ca3df6f159f88e12b4d54ebfae2"
        },
        "date": 1754346925838,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 297080.0403819818,
            "unit": "iter/sec",
            "range": "stddev: 7.086023621379472e-7",
            "extra": "mean: 3.3660962167441895 usec\nrounds: 24133"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 482226.79119768844,
            "unit": "iter/sec",
            "range": "stddev: 5.315290433988955e-7",
            "extra": "mean: 2.0737130708070737 usec\nrounds: 136166"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2195.143909124952,
            "unit": "iter/sec",
            "range": "stddev: 0.000014343356844403444",
            "extra": "mean: 455.5509986580464 usec\nrounds: 2235"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4893.096787123327,
            "unit": "iter/sec",
            "range": "stddev: 0.00000795245565405279",
            "extra": "mean: 204.36955235212184 usec\nrounds: 4613"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 702.7004017954308,
            "unit": "iter/sec",
            "range": "stddev: 0.00007429115992582148",
            "extra": "mean: 1.4230815827697771 msec\nrounds: 592"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1844.3877366642164,
            "unit": "iter/sec",
            "range": "stddev: 0.00001065836976159229",
            "extra": "mean: 542.1853442859108 usec\nrounds: 2861"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 515194.5900217289,
            "unit": "iter/sec",
            "range": "stddev: 5.834327492259469e-7",
            "extra": "mean: 1.9410141708938053 usec\nrounds: 1129"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.978280998565847,
            "unit": "iter/sec",
            "range": "stddev: 0.007502013112805102",
            "extra": "mean: 52.69181123809728 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100550.63461493418,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016282226874609345",
            "extra": "mean: 9.945238076612558 usec\nrounds: 20275"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1156.8170328451677,
            "unit": "iter/sec",
            "range": "stddev: 0.000022648157083673076",
            "extra": "mean: 864.4409371640394 usec\nrounds: 1114"
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
          "id": "ef6738229c112ab3a4e0dcdaf8731e4d2141cefd",
          "message": "Update error handling in TestLangChainAdapter to reflect correct exception type\n\n- Changed the expected exception from SynthaFrameworkError to ImportError when Pydantic is not installed.\n- Updated assertions to verify the correct error message related to the missing Pydantic module.\n\nThese changes improve the accuracy of error handling tests in the Syntha SDK.",
          "timestamp": "2025-08-04T18:39:27-04:00",
          "tree_id": "d5d58ee4b5c0e73c187dcf59031c90eeff7ae5b8",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/ef6738229c112ab3a4e0dcdaf8731e4d2141cefd"
        },
        "date": 1754347209917,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 289834.86920369684,
            "unit": "iter/sec",
            "range": "stddev: 6.23691156821874e-7",
            "extra": "mean: 3.450240486065177 usec\nrounds: 37524"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484339.19360516116,
            "unit": "iter/sec",
            "range": "stddev: 4.7370799773864885e-7",
            "extra": "mean: 2.0646687552922085 usec\nrounds: 148105"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2161.1020595296595,
            "unit": "iter/sec",
            "range": "stddev: 0.000008307914536070473",
            "extra": "mean: 462.72687381439044 usec\nrounds: 2425"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4767.390782101202,
            "unit": "iter/sec",
            "range": "stddev: 0.00001549992381611413",
            "extra": "mean: 209.75834491152312 usec\nrounds: 4520"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 716.1644370435582,
            "unit": "iter/sec",
            "range": "stddev: 0.00005729248344902519",
            "extra": "mean: 1.3963273632074786 msec\nrounds: 636"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1829.7865354034006,
            "unit": "iter/sec",
            "range": "stddev: 0.00005594535907792719",
            "extra": "mean: 546.511836573077 usec\nrounds: 2778"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 542261.0786094907,
            "unit": "iter/sec",
            "range": "stddev: 3.9793264345179554e-7",
            "extra": "mean: 1.8441301421895893 usec\nrounds: 1337"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 24.487604875428378,
            "unit": "iter/sec",
            "range": "stddev: 0.00384875186748191",
            "extra": "mean: 40.83698692000013 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100088.31056407723,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014158611866093833",
            "extra": "mean: 9.991176735466958 usec\nrounds: 20873"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1150.8905414572005,
            "unit": "iter/sec",
            "range": "stddev: 0.000013128580309140687",
            "extra": "mean: 868.8923611569955 usec\nrounds: 1210"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cafc80b0fb317ccf871ff64c35de1e8f34010306",
          "message": "Integrate syntha with agno and refine examples (#14)\n\n* Add Agno framework integration with comprehensive examples and tests\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Potential fix for code scanning alert no. 156: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Potential fix for code scanning alert no. 158: Unused import\n\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>\n\n* Delete ..\\..\\..\\windows\\system32\\config\\sam\n\n* Delete C:\\Windows\\System32\\config\\SAM\n\n* test\n\n* Update test_create_tool_with_langchain_available to verify successful tool creation when LangChain is available. Removed outdated comments and assertions related to error handling, enhancing test clarity and accuracy.\n\n* Add import checks for Agno and LangChain in respective tests to ensure dependencies are installed\n\n---------\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>\nCo-authored-by: Copilot Autofix powered by AI <62310815+github-advanced-security[bot]@users.noreply.github.com>",
          "timestamp": "2025-08-06T11:49:55-04:00",
          "tree_id": "40f040443373bf1c87bd4de71432a49770925eb0",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/cafc80b0fb317ccf871ff64c35de1e8f34010306"
        },
        "date": 1754495426222,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 303007.4544820222,
            "unit": "iter/sec",
            "range": "stddev: 6.03559078042414e-7",
            "extra": "mean: 3.300248839453325 usec\nrounds: 28219"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 485044.81190976454,
            "unit": "iter/sec",
            "range": "stddev: 5.341558150028186e-7",
            "extra": "mean: 2.0616651811256466 usec\nrounds: 141363"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2231.8927231127514,
            "unit": "iter/sec",
            "range": "stddev: 0.000011848349978873345",
            "extra": "mean: 448.0502085267481 usec\nrounds: 2369"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4953.80005754436,
            "unit": "iter/sec",
            "range": "stddev: 0.000017480566545005352",
            "extra": "mean: 201.86523242435993 usec\nrounds: 4694"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 708.5706819376086,
            "unit": "iter/sec",
            "range": "stddev: 0.000060781434620571106",
            "extra": "mean: 1.4112918096829363 msec\nrounds: 599"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1863.3158815506467,
            "unit": "iter/sec",
            "range": "stddev: 0.000026541218478562507",
            "extra": "mean: 536.6776561619829 usec\nrounds: 1777"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 520220.0877593183,
            "unit": "iter/sec",
            "range": "stddev: 5.963133574703166e-7",
            "extra": "mean: 1.9222633334040988 usec\nrounds: 1200"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 15.813251307281392,
            "unit": "iter/sec",
            "range": "stddev: 0.009195981492085111",
            "extra": "mean: 63.23810205555505 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102154.33641806617,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015104667081494155",
            "extra": "mean: 9.789109645894074 usec\nrounds: 20475"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1154.3235189920076,
            "unit": "iter/sec",
            "range": "stddev: 0.00004007586965062233",
            "extra": "mean: 866.3082606800148 usec\nrounds: 1147"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8855e064a4b293e1b001007c22dccc3dada25e80",
          "message": "Update documentation with new framework adapters (#15)\n\n* Enhance framework integration docs with comprehensive tool adapters\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* quick fix\n\n* mini fix\n\n---------\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-08-06T14:08:23-04:00",
          "tree_id": "8bb732124ff042571bc56482d95ecf0926519c3a",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/8855e064a4b293e1b001007c22dccc3dada25e80"
        },
        "date": 1754503733123,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 291991.9494603193,
            "unit": "iter/sec",
            "range": "stddev: 6.516307480621532e-7",
            "extra": "mean: 3.424751955827113 usec\nrounds: 24798"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 472132.77464798605,
            "unit": "iter/sec",
            "range": "stddev: 5.58152643486869e-7",
            "extra": "mean: 2.1180482561194416 usec\nrounds: 131320"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2162.307681352685,
            "unit": "iter/sec",
            "range": "stddev: 0.000020507014453680523",
            "extra": "mean: 462.4688746304713 usec\nrounds: 2369"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4833.643795911826,
            "unit": "iter/sec",
            "range": "stddev: 0.00000719362696570177",
            "extra": "mean: 206.88326285974463 usec\nrounds: 4588"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 695.5690952082639,
            "unit": "iter/sec",
            "range": "stddev: 0.00007861774694058222",
            "extra": "mean: 1.4376716948595665 msec\nrounds: 603"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1865.905844809263,
            "unit": "iter/sec",
            "range": "stddev: 0.000014250055143971538",
            "extra": "mean: 535.9327228551674 usec\nrounds: 2984"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 517860.19687817665,
            "unit": "iter/sec",
            "range": "stddev: 5.998587646668105e-7",
            "extra": "mean: 1.9310230947045417 usec\nrounds: 1299"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.633248738878546,
            "unit": "iter/sec",
            "range": "stddev: 0.0034274679756540537",
            "extra": "mean: 44.18278664000354 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102776.10551633463,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014124641055951507",
            "extra": "mean: 9.729888041350875 usec\nrounds: 20713"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1145.4081171155265,
            "unit": "iter/sec",
            "range": "stddev: 0.00001720927475729237",
            "extra": "mean: 873.0512601205352 usec\nrounds: 1161"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c121e78f22ff57accefd1ed5e2c6f60c1b86e8c9",
          "message": "ci(deps): bump actions/setup-python from 4 to 5 (#13)\n\nBumps [actions/setup-python](https://github.com/actions/setup-python) from 4 to 5.\n- [Release notes](https://github.com/actions/setup-python/releases)\n- [Commits](https://github.com/actions/setup-python/compare/v4...v5)\n\n---\nupdated-dependencies:\n- dependency-name: actions/setup-python\n  dependency-version: '5'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Kirch77 <129435653+Kirch77@users.noreply.github.com>",
          "timestamp": "2025-08-07T08:50:41-04:00",
          "tree_id": "81e0e90cb86266b28934cb692dc3c52ffd504681",
          "url": "https://github.com/Kirch77/Syntha_v2/commit/c121e78f22ff57accefd1ed5e2c6f60c1b86e8c9"
        },
        "date": 1754571069689,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 298084.90960090235,
            "unit": "iter/sec",
            "range": "stddev: 6.060102206731811e-7",
            "extra": "mean: 3.3547488242154637 usec\nrounds: 27650"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 489192.64161730895,
            "unit": "iter/sec",
            "range": "stddev: 5.054133235242529e-7",
            "extra": "mean: 2.0441844682984645 usec\nrounds: 125550"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2199.40409244404,
            "unit": "iter/sec",
            "range": "stddev: 0.0000238213425925077",
            "extra": "mean: 454.66860929988167 usec\nrounds: 2301"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4948.119906818276,
            "unit": "iter/sec",
            "range": "stddev: 0.000011335889827801814",
            "extra": "mean: 202.09696184242569 usec\nrounds: 4665"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 714.1523784703869,
            "unit": "iter/sec",
            "range": "stddev: 0.00005491101703749195",
            "extra": "mean: 1.4002613869911884 msec\nrounds: 615"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1846.2452697211233,
            "unit": "iter/sec",
            "range": "stddev: 0.000023515969360917268",
            "extra": "mean: 541.6398440663578 usec\nrounds: 3168"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 528828.4749271413,
            "unit": "iter/sec",
            "range": "stddev: 7.475148503889908e-7",
            "extra": "mean: 1.8909723046546876 usec\nrounds: 1336"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 20.296066629728287,
            "unit": "iter/sec",
            "range": "stddev: 0.007020146182077149",
            "extra": "mean: 49.27063052381137 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100226.27234340888,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015804402502909857",
            "extra": "mean: 9.977423849244477 usec\nrounds: 20420"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1153.8559027677336,
            "unit": "iter/sec",
            "range": "stddev: 0.000013860376639191018",
            "extra": "mean: 866.6593442052147 usec\nrounds: 1165"
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
          "id": "a09991a0f35a528316e0e9c808cb2bf482d98492",
          "message": "Remove outdated GitHub Pages setup guide and enhance Agno integration example with debugging features and initial context setup",
          "timestamp": "2025-08-07T14:15:12-04:00",
          "tree_id": "7a2033d8d194db55ba6d75168f3aabd12dffbcf3",
          "url": "https://github.com/Kirch77/syntha/commit/a09991a0f35a528316e0e9c808cb2bf482d98492"
        },
        "date": 1754590556641,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 293772.8613433111,
            "unit": "iter/sec",
            "range": "stddev: 5.823725780420862e-7",
            "extra": "mean: 3.403990400704074 usec\nrounds: 25314"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 473488.2720553413,
            "unit": "iter/sec",
            "range": "stddev: 5.397745686569998e-7",
            "extra": "mean: 2.111984729123597 usec\nrounds: 138237"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2195.3024341565974,
            "unit": "iter/sec",
            "range": "stddev: 0.000012228093255999294",
            "extra": "mean: 455.51810285501057 usec\nrounds: 2382"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4843.585200870649,
            "unit": "iter/sec",
            "range": "stddev: 0.00000926247432106396",
            "extra": "mean: 206.45863725495053 usec\nrounds: 4590"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 713.6350162986288,
            "unit": "iter/sec",
            "range": "stddev: 0.000070378257394692",
            "extra": "mean: 1.4012765309452506 msec\nrounds: 614"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1806.7845330450712,
            "unit": "iter/sec",
            "range": "stddev: 0.00005474646627245306",
            "extra": "mean: 553.4694268799424 usec\nrounds: 2872"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 538970.057835872,
            "unit": "iter/sec",
            "range": "stddev: 4.983673057174887e-7",
            "extra": "mean: 1.8553906389815098 usec\nrounds: 1111"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 15.922444194539779,
            "unit": "iter/sec",
            "range": "stddev: 0.006762422085119308",
            "extra": "mean: 62.804428000000534 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102758.39573589993,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013865418194959174",
            "extra": "mean: 9.731564927989991 usec\nrounds: 21031"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1184.9045299884028,
            "unit": "iter/sec",
            "range": "stddev: 0.000015049268772497117",
            "extra": "mean: 843.9498497062775 usec\nrounds: 1191"
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
          "id": "b87dd5c45e389095bded4d03f0662dc72181a92b",
          "message": "Adjust concurrency benefit assertion for scalability benchmarks to allow 20% overhead in Windows CI environments",
          "timestamp": "2025-08-07T14:54:37-04:00",
          "tree_id": "14aee853f9ab3f929927980bb4eec033132c16d8",
          "url": "https://github.com/Kirch77/syntha/commit/b87dd5c45e389095bded4d03f0662dc72181a92b"
        },
        "date": 1754592919197,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 291276.073708356,
            "unit": "iter/sec",
            "range": "stddev: 6.143807632908337e-7",
            "extra": "mean: 3.4331690456706134 usec\nrounds: 25851"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 475434.49027294526,
            "unit": "iter/sec",
            "range": "stddev: 5.157152260465247e-7",
            "extra": "mean: 2.103339199110068 usec\nrounds: 127633"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2189.322452047063,
            "unit": "iter/sec",
            "range": "stddev: 0.000010356286355484776",
            "extra": "mean: 456.7623188923033 usec\nrounds: 2239"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4884.440701476698,
            "unit": "iter/sec",
            "range": "stddev: 0.00000643596749058446",
            "extra": "mean: 204.73173104500438 usec\nrounds: 4603"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 712.3145780814629,
            "unit": "iter/sec",
            "range": "stddev: 0.00006166778001501822",
            "extra": "mean: 1.4038741179401164 msec\nrounds: 602"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1831.6201986668125,
            "unit": "iter/sec",
            "range": "stddev: 0.000015116198839716074",
            "extra": "mean: 545.9647151346514 usec\nrounds: 2861"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 521158.90445508267,
            "unit": "iter/sec",
            "range": "stddev: 7.478146905692014e-7",
            "extra": "mean: 1.9188005643798558 usec\nrounds: 1063"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.514468148604163,
            "unit": "iter/sec",
            "range": "stddev: 0.0047999718761203534",
            "extra": "mean: 60.552964285714644 msec\nrounds: 14"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102837.61303428866,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017963101764157006",
            "extra": "mean: 9.724068562993335 usec\nrounds: 19617"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1162.6141208678234,
            "unit": "iter/sec",
            "range": "stddev: 0.00001661250798971776",
            "extra": "mean: 860.1306160409944 usec\nrounds: 1172"
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
          "id": "7c3dfa1b8ed4f6893bd0f12c69897aeb8cfcaeda",
          "message": "Refactor context data population for clarity and consistency in Agno integration example",
          "timestamp": "2025-08-07T15:08:02-04:00",
          "tree_id": "9bf43943ac61e95633b862647e41991cc4d91163",
          "url": "https://github.com/Kirch77/syntha/commit/7c3dfa1b8ed4f6893bd0f12c69897aeb8cfcaeda"
        },
        "date": 1754593981793,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 293671.0928388507,
            "unit": "iter/sec",
            "range": "stddev: 6.008036970724335e-7",
            "extra": "mean: 3.4051700163377703 usec\nrounds: 25327"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 480458.6972335382,
            "unit": "iter/sec",
            "range": "stddev: 5.499161173741087e-7",
            "extra": "mean: 2.081344360624461 usec\nrounds: 94976"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2151.4215267529817,
            "unit": "iter/sec",
            "range": "stddev: 0.000010246616704094367",
            "extra": "mean: 464.8089588976286 usec\nrounds: 2214"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4855.839059098276,
            "unit": "iter/sec",
            "range": "stddev: 0.000026110557048762822",
            "extra": "mean: 205.93763257584135 usec\nrounds: 4224"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 697.5311793150363,
            "unit": "iter/sec",
            "range": "stddev: 0.00006835538524829045",
            "extra": "mean: 1.4336276709264566 msec\nrounds: 626"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1847.6527441460246,
            "unit": "iter/sec",
            "range": "stddev: 0.000011470511247657983",
            "extra": "mean: 541.2272426019073 usec\nrounds: 3075"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 526440.777854752,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010289999582603359",
            "extra": "mean: 1.899548899070857 usec\nrounds: 1452"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.935798081923732,
            "unit": "iter/sec",
            "range": "stddev: 0.005495999038282698",
            "extra": "mean: 52.81002657894879 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100607.14069139675,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015586490157573167",
            "extra": "mean: 9.93965232614461 usec\nrounds: 19967"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1105.8681755695818,
            "unit": "iter/sec",
            "range": "stddev: 0.00002037657685934347",
            "extra": "mean: 904.2669118178992 usec\nrounds: 1100"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2635f4450d29fede0ebb3d16c770c69abe0ad1fd",
          "message": "Update API overview docs with comprehensive framework integration details (#16)\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-08-07T15:43:05-04:00",
          "tree_id": "0a901501eb0be6c2de747f4d89f4238cabd99e3c",
          "url": "https://github.com/Kirch77/syntha/commit/2635f4450d29fede0ebb3d16c770c69abe0ad1fd"
        },
        "date": 1754595814555,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 300869.0318766283,
            "unit": "iter/sec",
            "range": "stddev: 5.988515292644352e-7",
            "extra": "mean: 3.323705313779356 usec\nrounds: 26177"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 485288.7869129722,
            "unit": "iter/sec",
            "range": "stddev: 5.022982956035882e-7",
            "extra": "mean: 2.060628695670506 usec\nrounds: 135428"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2194.613133329022,
            "unit": "iter/sec",
            "range": "stddev: 0.000025094137321188804",
            "extra": "mean: 455.6611754542332 usec\nrounds: 2257"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4976.954984669145,
            "unit": "iter/sec",
            "range": "stddev: 0.000006772614675240098",
            "extra": "mean: 200.9260688674839 usec\nrounds: 2817"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 718.3101220064593,
            "unit": "iter/sec",
            "range": "stddev: 0.00005926982155504123",
            "extra": "mean: 1.3921563533125427 msec\nrounds: 634"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1879.2339598070484,
            "unit": "iter/sec",
            "range": "stddev: 0.000009785797862935419",
            "extra": "mean: 532.1317203647574 usec\nrounds: 2961"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 538231.0260259877,
            "unit": "iter/sec",
            "range": "stddev: 5.189699212409278e-7",
            "extra": "mean: 1.8579382303236387 usec\nrounds: 1198"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.59871538226002,
            "unit": "iter/sec",
            "range": "stddev: 0.003922107101788883",
            "extra": "mean: 51.02375234782787 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100753.15091878625,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014709098712985667",
            "extra": "mean: 9.92524790421757 usec\nrounds: 14792"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1162.8576967987804,
            "unit": "iter/sec",
            "range": "stddev: 0.000030674703380711184",
            "extra": "mean: 859.9504503026383 usec\nrounds: 1157"
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
          "id": "952ee5c88b7eaa597eadcf9b8bbeed4b8a1785b3",
          "message": "feat: add comprehensive access control and multi-agent setup examples\n\n- Introduced access control documentation with role-based permissions and secure context management.\n- Added a complete multi-agent workflow example demonstrating agent coordination and task distribution.\n- Created basic tool usage examples showcasing the ToolHandler functionality.\n- Implemented framework adapters documentation for integrating with various AI frameworks.\n- Established a persistence layer guide detailing database support and configuration.\n- Developed a prompt system overview for dynamic context injection and system prompt management.\n- Enhanced user isolation documentation to ensure data separation and security.\n- Provided a contributing guide to streamline the development process and maintain code quality.",
          "timestamp": "2025-08-07T16:47:38-04:00",
          "tree_id": "76a8721c278ba397e98ed0836413e14da4354706",
          "url": "https://github.com/Kirch77/syntha/commit/952ee5c88b7eaa597eadcf9b8bbeed4b8a1785b3"
        },
        "date": 1754599709139,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 300895.14808686887,
            "unit": "iter/sec",
            "range": "stddev: 6.618201421095246e-7",
            "extra": "mean: 3.32341683260143 usec\nrounds: 26639"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 483332.4194327825,
            "unit": "iter/sec",
            "range": "stddev: 5.508988348091208e-7",
            "extra": "mean: 2.068969429308209 usec\nrounds: 126199"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2213.6577678703334,
            "unit": "iter/sec",
            "range": "stddev: 0.000021600343395068304",
            "extra": "mean: 451.7410118737811 usec\nrounds: 2358"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4877.761102223472,
            "unit": "iter/sec",
            "range": "stddev: 0.000020789134189160286",
            "extra": "mean: 205.01209039207788 usec\nrounds: 4569"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 702.6492098499566,
            "unit": "iter/sec",
            "range": "stddev: 0.00008476140985739463",
            "extra": "mean: 1.4231852622641383 msec\nrounds: 530"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1818.1005871767545,
            "unit": "iter/sec",
            "range": "stddev: 0.00001155546486242907",
            "extra": "mean: 550.0245734769023 usec\nrounds: 3069"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 503683.3940109725,
            "unit": "iter/sec",
            "range": "stddev: 5.844251773693607e-7",
            "extra": "mean: 1.9853741693501523 usec\nrounds: 1053"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 24.673347158176174,
            "unit": "iter/sec",
            "range": "stddev: 0.002954418605335093",
            "extra": "mean: 40.52956388888741 msec\nrounds: 27"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102405.62161483905,
            "unit": "iter/sec",
            "range": "stddev: 0.000001658033642991459",
            "extra": "mean: 9.765088910461683 usec\nrounds: 19514"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1165.0315801476802,
            "unit": "iter/sec",
            "range": "stddev: 0.00001764140830256198",
            "extra": "mean: 858.3458311690052 usec\nrounds: 1155"
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
          "id": "35bcdb8bd5d5d5cf0c384772f28f4bdc0bd5143e",
          "message": "refactor: improve performance benchmarking by using time.perf_counter for accuracy\n\n- Replaced time.time() with time.perf_counter() for more precise timing measurements in performance tests.\n- Added leniency in assertions for extremely fast operations to account for timing noise, ensuring that warm runs are not slower than cold runs in trivial cases.",
          "timestamp": "2025-08-07T17:00:54-04:00",
          "tree_id": "4f5f0a9867ad63363bdf9ad05488d48950b34055",
          "url": "https://github.com/Kirch77/syntha/commit/35bcdb8bd5d5d5cf0c384772f28f4bdc0bd5143e"
        },
        "date": 1754600486624,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 301413.11256337696,
            "unit": "iter/sec",
            "range": "stddev: 6.397808017224303e-7",
            "extra": "mean: 3.3177056946709107 usec\nrounds: 23513"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 481859.4602498684,
            "unit": "iter/sec",
            "range": "stddev: 5.189776090665612e-7",
            "extra": "mean: 2.07529390308421 usec\nrounds: 139005"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2212.966304707812,
            "unit": "iter/sec",
            "range": "stddev: 0.000011132300400090117",
            "extra": "mean: 451.8821628113468 usec\nrounds: 2248"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4911.28546119982,
            "unit": "iter/sec",
            "range": "stddev: 0.000018529952797182",
            "extra": "mean: 203.61268101807738 usec\nrounds: 4204"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 716.1865767456198,
            "unit": "iter/sec",
            "range": "stddev: 0.00007688122013426178",
            "extra": "mean: 1.3962841980982659 msec\nrounds: 631"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1853.9597319005097,
            "unit": "iter/sec",
            "range": "stddev: 0.000013801029799893698",
            "extra": "mean: 539.3860410198292 usec\nrounds: 2706"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 517556.42946652556,
            "unit": "iter/sec",
            "range": "stddev: 3.9682337885810404e-7",
            "extra": "mean: 1.9321564626890173 usec\nrounds: 1176"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.194669085298774,
            "unit": "iter/sec",
            "range": "stddev: 0.004448819169575795",
            "extra": "mean: 54.96115347368402 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101823.46966511667,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015710284569492717",
            "extra": "mean: 9.820918529773754 usec\nrounds: 19860"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1180.3458909144113,
            "unit": "iter/sec",
            "range": "stddev: 0.00003151283335321228",
            "extra": "mean: 847.2092864450964 usec\nrounds: 1173"
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
          "id": "b000d44809cf0e5dc0b7c232a260a7ae7f52f3f2",
          "message": "refactor: enhance code readability and consistency across examples\n\n- Added whitespace for improved readability in multiple example files.\n- Standardized formatting and structure in context management and tool handling examples.\n- Ensured consistent use of commas and spacing in dictionary definitions and function calls.\n- Improved overall clarity of the code to facilitate easier understanding and maintenance.",
          "timestamp": "2025-08-07T17:03:39-04:00",
          "tree_id": "8107d1fcfcd2fb7c9e2a467665da459a784c90b4",
          "url": "https://github.com/Kirch77/syntha/commit/b000d44809cf0e5dc0b7c232a260a7ae7f52f3f2"
        },
        "date": 1754600652983,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 293933.6566041992,
            "unit": "iter/sec",
            "range": "stddev: 6.249926079901503e-7",
            "extra": "mean: 3.4021282610264842 usec\nrounds: 26142"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 475051.05279964744,
            "unit": "iter/sec",
            "range": "stddev: 5.202228124030299e-7",
            "extra": "mean: 2.1050369094156065 usec\nrounds: 126824"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2160.3848759996176,
            "unit": "iter/sec",
            "range": "stddev: 0.000009334977779185368",
            "extra": "mean: 462.88048537522576 usec\nrounds: 2359"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4837.129218958788,
            "unit": "iter/sec",
            "range": "stddev: 0.000006943467849637272",
            "extra": "mean: 206.73419185920653 usec\nrounds: 4545"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 725.6437504647355,
            "unit": "iter/sec",
            "range": "stddev: 0.00005986204787261095",
            "extra": "mean: 1.3780866979968533 msec\nrounds: 649"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1864.425701542208,
            "unit": "iter/sec",
            "range": "stddev: 0.00003757494940040893",
            "extra": "mean: 536.3581928595086 usec\nrounds: 2997"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 525666.2337984506,
            "unit": "iter/sec",
            "range": "stddev: 8.467679725719222e-7",
            "extra": "mean: 1.9023477935305562 usec\nrounds: 1337"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 25.065424215302873,
            "unit": "iter/sec",
            "range": "stddev: 0.00267619401415903",
            "extra": "mean: 39.89559448148031 msec\nrounds: 27"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102803.9278615339,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014479124329215436",
            "extra": "mean: 9.727254792704956 usec\nrounds: 21178"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1165.0818433243996,
            "unit": "iter/sec",
            "range": "stddev: 0.00010778459161951276",
            "extra": "mean: 858.3088009908715 usec\nrounds: 1211"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "129435653+Kirch77@users.noreply.github.com",
            "name": "Kirch77",
            "username": "Kirch77"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "453b24305c55acc96d4a636fb6f82f634bb49fd7",
          "message": "Improve sdk documentation for clarity and accuracy (#17)\n\n* Refactor documentation and examples for improved context mesh API\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Replace subscribe_to_topics with register_agent_topics in user isolation example\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Refactor Anthropic and OpenAI adapter examples for clarity and real API usage\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Implement real OpenAI client support with fallback to simulation mode\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Simplify user isolation example with focused, concise code demonstration\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Refactor prompt generation with flexible templates and dynamic keys\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Refactor docs and examples: Simplify configs, update roles, improve context handling\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n* Enhance examples and documentation for framework adapters and context handling\n\n- Updated Agno, Anthropic, LangChain, and OpenAI integration examples to improve clarity and usability.\n- Implemented robust error handling and fallback mechanisms for real API usage.\n- Enhanced context management with dynamic updates and improved prompt generation.\n- Standardized tool handling across examples for consistency and better user experience.\n\nCo-authored-by: rylan.kirchmair <rylan.kirchmair@gmail.com>\n\n---------\n\nCo-authored-by: Cursor Agent <cursoragent@cursor.com>",
          "timestamp": "2025-08-11T12:57:26-04:00",
          "tree_id": "a7a2cfbca2b74c9d9ef65b0aad4150b408536998",
          "url": "https://github.com/Kirch77/syntha/commit/453b24305c55acc96d4a636fb6f82f634bb49fd7"
        },
        "date": 1754931474276,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 293823.20720052096,
            "unit": "iter/sec",
            "range": "stddev: 6.119068381581718e-7",
            "extra": "mean: 3.403407135630187 usec\nrounds: 27384"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 479242.6609521178,
            "unit": "iter/sec",
            "range": "stddev: 4.791785161736229e-7",
            "extra": "mean: 2.086625589661168 usec\nrounds: 138447"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2144.5665486679686,
            "unit": "iter/sec",
            "range": "stddev: 0.000037235292936666445",
            "extra": "mean: 466.2946927998663 usec\nrounds: 2347"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4915.064288504257,
            "unit": "iter/sec",
            "range": "stddev: 0.000011477586564472582",
            "extra": "mean: 203.4561383741978 usec\nrounds: 4589"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 670.5326365751349,
            "unit": "iter/sec",
            "range": "stddev: 0.00009682796536319724",
            "extra": "mean: 1.4913517186988519 msec\nrounds: 615"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1852.9581201537271,
            "unit": "iter/sec",
            "range": "stddev: 0.000014772490825901016",
            "extra": "mean: 539.6776047572175 usec\nrounds: 3069"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 545108.4983030327,
            "unit": "iter/sec",
            "range": "stddev: 2.714398544641407e-7",
            "extra": "mean: 1.8344971746231835 usec\nrounds: 1416"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 25.085647417415615,
            "unit": "iter/sec",
            "range": "stddev: 0.003144871386591572",
            "extra": "mean: 39.8634319999951 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100910.93629371694,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014639068665835746",
            "extra": "mean: 9.909728684801268 usec\nrounds: 20795"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1165.6256493707494,
            "unit": "iter/sec",
            "range": "stddev: 0.000015170685483064834",
            "extra": "mean: 857.9083692434525 usec\nrounds: 1151"
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
          "id": "69c7d61061d254b6474c19bced818301e72ed5fd",
          "message": "quick fix docs",
          "timestamp": "2025-08-11T13:28:02-04:00",
          "tree_id": "5cbe811ed1b57f51ccd440a9092b7d89af73731d",
          "url": "https://github.com/Kirch77/syntha/commit/69c7d61061d254b6474c19bced818301e72ed5fd"
        },
        "date": 1754933314180,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 297585.63237556047,
            "unit": "iter/sec",
            "range": "stddev: 6.396586971569426e-7",
            "extra": "mean: 3.360377287092863 usec\nrounds: 22137"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 459218.19529071794,
            "unit": "iter/sec",
            "range": "stddev: 6.47796296192867e-7",
            "extra": "mean: 2.1776140628899263 usec\nrounds: 108484"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2106.9083185787545,
            "unit": "iter/sec",
            "range": "stddev: 0.000019902320464137154",
            "extra": "mean: 474.62910046060495 usec\nrounds: 2170"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4791.522912396632,
            "unit": "iter/sec",
            "range": "stddev: 0.000014176888029202369",
            "extra": "mean: 208.7019134172977 usec\nrounds: 4539"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 662.596640953867,
            "unit": "iter/sec",
            "range": "stddev: 0.00008933952178140636",
            "extra": "mean: 1.5092138085101228 msec\nrounds: 564"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1839.7971169801037,
            "unit": "iter/sec",
            "range": "stddev: 0.00002944285849256235",
            "extra": "mean: 543.5381927554213 usec\nrounds: 2236"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 461994.8331162885,
            "unit": "iter/sec",
            "range": "stddev: 6.178787206617399e-7",
            "extra": "mean: 2.164526371982802 usec\nrounds: 948"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.85216019390308,
            "unit": "iter/sec",
            "range": "stddev: 0.0030424901478688514",
            "extra": "mean: 43.75953920832387 msec\nrounds: 24"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100353.71497532132,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015575640028985887",
            "extra": "mean: 9.96475317576352 usec\nrounds: 18815"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1171.6525563361959,
            "unit": "iter/sec",
            "range": "stddev: 0.000019245316280672052",
            "extra": "mean: 853.4953426184976 usec\nrounds: 1077"
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
          "id": "fbef8c72d5d78220c876de7230429856e17694ad",
          "message": "fix: update Mkdocs configuration path in ReadTheDocs setup\n\n- Changed the Mkdocs configuration path from mkdocs.yml to Syntha_v2/mkdocs.yml for accurate documentation building.",
          "timestamp": "2025-08-11T13:33:23-04:00",
          "tree_id": "854844091472c52d930ed08380f85703a44bcb98",
          "url": "https://github.com/Kirch77/syntha/commit/fbef8c72d5d78220c876de7230429856e17694ad"
        },
        "date": 1754933644800,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 301482.85976288625,
            "unit": "iter/sec",
            "range": "stddev: 6.08621538167939e-7",
            "extra": "mean: 3.316938152923492 usec\nrounds: 25175"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 485150.1863846453,
            "unit": "iter/sec",
            "range": "stddev: 4.903719560667837e-7",
            "extra": "mean: 2.061217388067048 usec\nrounds: 132206"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2199.630302544621,
            "unit": "iter/sec",
            "range": "stddev: 0.000014168660341610992",
            "extra": "mean: 454.62185115524176 usec\nrounds: 2338"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4952.300524346677,
            "unit": "iter/sec",
            "range": "stddev: 0.000011476441221955051",
            "extra": "mean: 201.92635626286494 usec\nrounds: 4710"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 684.4121258404004,
            "unit": "iter/sec",
            "range": "stddev: 0.000068694439282041",
            "extra": "mean: 1.461107952715017 msec\nrounds: 571"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1860.5843288275316,
            "unit": "iter/sec",
            "range": "stddev: 0.000017133557442303573",
            "extra": "mean: 537.4655609564128 usec\nrounds: 2633"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 377811.61336261313,
            "unit": "iter/sec",
            "range": "stddev: 6.395975310925777e-7",
            "extra": "mean: 2.646821761511676 usec\nrounds: 965"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 25.532505823240065,
            "unit": "iter/sec",
            "range": "stddev: 0.0025029484108293723",
            "extra": "mean: 39.16576018519048 msec\nrounds: 27"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101302.83565797866,
            "unit": "iter/sec",
            "range": "stddev: 0.000001513336778502021",
            "extra": "mean: 9.871391985276965 usec\nrounds: 20363"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1168.2838933847402,
            "unit": "iter/sec",
            "range": "stddev: 0.0000649396960306067",
            "extra": "mean: 855.9563353242937 usec\nrounds: 1172"
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
          "id": "a2248289f3f1b4f684627c96f71deb05bbbecf99",
          "message": "quick",
          "timestamp": "2025-08-11T13:41:41-04:00",
          "tree_id": "b373f8fed00856cb8642e1855dee4e2727803a9c",
          "url": "https://github.com/Kirch77/syntha/commit/a2248289f3f1b4f684627c96f71deb05bbbecf99"
        },
        "date": 1754934167791,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 302024.49436129606,
            "unit": "iter/sec",
            "range": "stddev: 6.284103220617674e-7",
            "extra": "mean: 3.3109897331828737 usec\nrounds: 26688"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 483811.8886065245,
            "unit": "iter/sec",
            "range": "stddev: 5.205769901217056e-7",
            "extra": "mean: 2.066919031031257 usec\nrounds: 157159"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2217.88979631569,
            "unit": "iter/sec",
            "range": "stddev: 0.000009176689424746502",
            "extra": "mean: 450.87902999561925 usec\nrounds: 2267"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4947.397816117235,
            "unit": "iter/sec",
            "range": "stddev: 0.000005879290420115155",
            "extra": "mean: 202.1264586288736 usec\nrounds: 4653"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 700.1143751274966,
            "unit": "iter/sec",
            "range": "stddev: 0.00006937191046815173",
            "extra": "mean: 1.4283380480766328 msec\nrounds: 624"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1818.0354356262778,
            "unit": "iter/sec",
            "range": "stddev: 0.000016946786071379382",
            "extra": "mean: 550.044284288397 usec\nrounds: 3106"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 492261.387229576,
            "unit": "iter/sec",
            "range": "stddev: 5.876477004189225e-7",
            "extra": "mean: 2.031441071638694 usec\nrounds: 1120"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 23.25092752069247,
            "unit": "iter/sec",
            "range": "stddev: 0.0027262419429151417",
            "extra": "mean: 43.00903691304516 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101441.66386355636,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014435035574799241",
            "extra": "mean: 9.857882470707947 usec\nrounds: 19476"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1170.0804809470803,
            "unit": "iter/sec",
            "range": "stddev: 0.000016640125052140596",
            "extra": "mean: 854.6420663222971 usec\nrounds: 1161"
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
          "id": "3562c2b5642ac8aee0958f8a06fc8c69d2b3a38b",
          "message": "one more quick",
          "timestamp": "2025-08-11T13:46:02-04:00",
          "tree_id": "a99b75d5b743fcd252cbedc73dd873061903b7c6",
          "url": "https://github.com/Kirch77/syntha/commit/3562c2b5642ac8aee0958f8a06fc8c69d2b3a38b"
        },
        "date": 1754934394117,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 297108.50154482876,
            "unit": "iter/sec",
            "range": "stddev: 5.690189890905778e-7",
            "extra": "mean: 3.365773765477783 usec\nrounds: 27803"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484381.3339049326,
            "unit": "iter/sec",
            "range": "stddev: 4.716627678146987e-7",
            "extra": "mean: 2.064489132845622 usec\nrounds: 133798"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2175.6988860834163,
            "unit": "iter/sec",
            "range": "stddev: 0.000012010172392394444",
            "extra": "mean: 459.6224258772084 usec\nrounds: 2280"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4871.35417935995,
            "unit": "iter/sec",
            "range": "stddev: 0.000005816723172400211",
            "extra": "mean: 205.28172725297316 usec\nrounds: 4605"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 718.2067652570039,
            "unit": "iter/sec",
            "range": "stddev: 0.00005755767727894913",
            "extra": "mean: 1.3923566977848767 msec\nrounds: 632"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1807.9904182215337,
            "unit": "iter/sec",
            "range": "stddev: 0.000058579777778653565",
            "extra": "mean: 553.1002763740696 usec\nrounds: 3166"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 549825.429390103,
            "unit": "iter/sec",
            "range": "stddev: 4.248983985402717e-7",
            "extra": "mean: 1.8187590943351886 usec\nrounds: 1237"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 25.53322833157509,
            "unit": "iter/sec",
            "range": "stddev: 0.0019605737625840625",
            "extra": "mean: 39.16465191999919 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100980.59171996191,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013672790718689228",
            "extra": "mean: 9.902893050708073 usec\nrounds: 20851"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1166.6061546479448,
            "unit": "iter/sec",
            "range": "stddev: 0.000013989392686502267",
            "extra": "mean: 857.1873172585629 usec\nrounds: 1182"
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
          "id": "2ca44f8cfa2a0cfce430bc3712de7e01bb706fb3",
          "message": "docs update",
          "timestamp": "2025-08-11T13:59:30-04:00",
          "tree_id": "52ef89b1c2dd63c895b1cf1010febaf88c232700",
          "url": "https://github.com/Kirch77/syntha/commit/2ca44f8cfa2a0cfce430bc3712de7e01bb706fb3"
        },
        "date": 1754935207798,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 288414.1496486274,
            "unit": "iter/sec",
            "range": "stddev: 6.314033878250573e-7",
            "extra": "mean: 3.4672362684642617 usec\nrounds: 26673"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484114.95075574104,
            "unit": "iter/sec",
            "range": "stddev: 5.450631962576152e-7",
            "extra": "mean: 2.0656251132895656 usec\nrounds: 117014"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2191.131599016409,
            "unit": "iter/sec",
            "range": "stddev: 0.000011771418467889268",
            "extra": "mean: 456.38518491947104 usec\nrounds: 2374"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4938.3334414281535,
            "unit": "iter/sec",
            "range": "stddev: 0.00001088525699053821",
            "extra": "mean: 202.4974643491879 usec\nrounds: 4516"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 685.2731100182311,
            "unit": "iter/sec",
            "range": "stddev: 0.00008102426040869717",
            "extra": "mean: 1.4592722016677349 msec\nrounds: 600"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1831.2783570030824,
            "unit": "iter/sec",
            "range": "stddev: 0.000013596492065997767",
            "extra": "mean: 546.0666294536003 usec\nrounds: 2750"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 489612.90915645,
            "unit": "iter/sec",
            "range": "stddev: 6.597696982393436e-7",
            "extra": "mean: 2.0424298079127277 usec\nrounds: 1040"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.831591670402105,
            "unit": "iter/sec",
            "range": "stddev: 0.00248980549885846",
            "extra": "mean: 50.424596099992414 msec\nrounds: 20"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101332.71769331317,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016144527126596406",
            "extra": "mean: 9.868481007551116 usec\nrounds: 13374"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1146.5401059389924,
            "unit": "iter/sec",
            "range": "stddev: 0.000020236437463921557",
            "extra": "mean: 872.1892891666628 usec\nrounds: 1117"
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
          "id": "b0f40bd03e9df0c51e79e3b07c5ae52c51cfb68f",
          "message": "Enhance Syntha SDK documentation with detailed overview and key benefits\n\n- Introduced a comprehensive introduction to Syntha, outlining its purpose and the challenges it addresses in multi-agent AI systems.\n- Added sections on the solution provided by Syntha, including the concept of a Context Mesh and its key benefits.\n- Included a code example demonstrating the usage of the ContextMesh and ToolHandler for context management.\n- Specified target users and next steps for getting started with Syntha.",
          "timestamp": "2025-08-11T14:04:15-04:00",
          "tree_id": "365fa94b8ab0167fa4cd409e146f55fcf7ca48b1",
          "url": "https://github.com/Kirch77/syntha/commit/b0f40bd03e9df0c51e79e3b07c5ae52c51cfb68f"
        },
        "date": 1754935484856,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 296735.0489318004,
            "unit": "iter/sec",
            "range": "stddev: 5.982116016722883e-7",
            "extra": "mean: 3.3700097228144874 usec\nrounds: 28078"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 477325.5909935872,
            "unit": "iter/sec",
            "range": "stddev: 5.311858822881752e-7",
            "extra": "mean: 2.0950060480068307 usec\nrounds: 127146"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2221.685547877531,
            "unit": "iter/sec",
            "range": "stddev: 0.000009510978400896522",
            "extra": "mean: 450.10870280690347 usec\nrounds: 2352"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4877.35778826422,
            "unit": "iter/sec",
            "range": "stddev: 0.000006436439601029372",
            "extra": "mean: 205.02904306224482 usec\nrounds: 4296"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 694.305476629437,
            "unit": "iter/sec",
            "range": "stddev: 0.00005982218318421792",
            "extra": "mean: 1.4402882213382244 msec\nrounds: 628"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1791.9450487098434,
            "unit": "iter/sec",
            "range": "stddev: 0.000019199687492788566",
            "extra": "mean: 558.0528268542472 usec\nrounds: 3113"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 550758.8878882993,
            "unit": "iter/sec",
            "range": "stddev: 5.393975639786258e-7",
            "extra": "mean: 1.815676554642932 usec\nrounds: 1416"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 23.834051704526413,
            "unit": "iter/sec",
            "range": "stddev: 0.0027111823054731246",
            "extra": "mean: 41.9567773199924 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101402.12224214291,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013862820588001106",
            "extra": "mean: 9.861726538741001 usec\nrounds: 20683"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1168.495256790454,
            "unit": "iter/sec",
            "range": "stddev: 0.000021254375546579308",
            "extra": "mean: 855.8015055591533 usec\nrounds: 1169"
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
          "id": "8681d9329feb21d46d043ac1c77be7ca1f4739de",
          "message": "update index to link properly",
          "timestamp": "2025-08-11T14:08:28-04:00",
          "tree_id": "a8c0b49222c56e0fbfd7c06569f59e1fb4a3e6a5",
          "url": "https://github.com/Kirch77/syntha/commit/8681d9329feb21d46d043ac1c77be7ca1f4739de"
        },
        "date": 1754935738636,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 291699.040327536,
            "unit": "iter/sec",
            "range": "stddev: 5.958448098560998e-7",
            "extra": "mean: 3.428190915119721 usec\nrounds: 27452"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 491723.68966692727,
            "unit": "iter/sec",
            "range": "stddev: 5.397062229044091e-7",
            "extra": "mean: 2.033662442981662 usec\nrounds: 149634"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2195.34771843663,
            "unit": "iter/sec",
            "range": "stddev: 0.00001599688562915254",
            "extra": "mean: 455.50870670826055 usec\nrounds: 2281"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4963.336225553535,
            "unit": "iter/sec",
            "range": "stddev: 0.000008755388154391675",
            "extra": "mean: 201.4773842746217 usec\nrounds: 4515"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 721.4848496115331,
            "unit": "iter/sec",
            "range": "stddev: 0.00006343590166546407",
            "extra": "mean: 1.3860304905063867 msec\nrounds: 632"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1848.5003782134734,
            "unit": "iter/sec",
            "range": "stddev: 0.00004105765591332111",
            "extra": "mean: 540.9790616145145 usec\nrounds: 2824"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 509627.9334623003,
            "unit": "iter/sec",
            "range": "stddev: 4.290159511919016e-7",
            "extra": "mean: 1.9622158330416064 usec\nrounds: 1200"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 23.406278076274965,
            "unit": "iter/sec",
            "range": "stddev: 0.0034210265717650595",
            "extra": "mean: 42.72358026087105 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 99483.8376157455,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013798539577868285",
            "extra": "mean: 10.051884044345792 usec\nrounds: 20068"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1192.0779975197474,
            "unit": "iter/sec",
            "range": "stddev: 0.00001214129911232368",
            "extra": "mean: 838.871283658127 usec\nrounds: 1181"
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
          "id": "4bbf6d9a978ef143d922d6690a2e8483b6b42968",
          "message": "update index to be smaller",
          "timestamp": "2025-08-11T14:12:57-04:00",
          "tree_id": "16b27cacd00e67d590cb5a8aadaca9825d59d530",
          "url": "https://github.com/Kirch77/syntha/commit/4bbf6d9a978ef143d922d6690a2e8483b6b42968"
        },
        "date": 1754936016841,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 290534.6465671869,
            "unit": "iter/sec",
            "range": "stddev: 6.174903785542935e-7",
            "extra": "mean: 3.441930288919078 usec\nrounds: 25161"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 448486.78041439713,
            "unit": "iter/sec",
            "range": "stddev: 5.295590704723832e-7",
            "extra": "mean: 2.2297201248072698 usec\nrounds: 75330"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2132.111325885314,
            "unit": "iter/sec",
            "range": "stddev: 0.000018756959097462282",
            "extra": "mean: 469.0186613894428 usec\nrounds: 2274"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4648.192815988012,
            "unit": "iter/sec",
            "range": "stddev: 0.000010480156083649628",
            "extra": "mean: 215.1373748008863 usec\nrounds: 4397"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 713.2510889900001,
            "unit": "iter/sec",
            "range": "stddev: 0.00006734206831926265",
            "extra": "mean: 1.4020308071538325 msec\nrounds: 643"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1819.4982350622558,
            "unit": "iter/sec",
            "range": "stddev: 0.000011312459244211923",
            "extra": "mean: 549.6020720051889 usec\nrounds: 3097"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 545134.6068689199,
            "unit": "iter/sec",
            "range": "stddev: 2.84220619141211e-7",
            "extra": "mean: 1.8344093135889545 usec\nrounds: 1224"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.041666058754164,
            "unit": "iter/sec",
            "range": "stddev: 0.006924388246979376",
            "extra": "mean: 62.33766470000077 msec\nrounds: 20"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102512.66663499367,
            "unit": "iter/sec",
            "range": "stddev: 0.000001400749092896449",
            "extra": "mean: 9.754892081391244 usec\nrounds: 20812"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1174.520649427594,
            "unit": "iter/sec",
            "range": "stddev: 0.000019932127592197216",
            "extra": "mean: 851.4111697289894 usec\nrounds: 1143"
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
          "id": "315c61887616a5ce4a7936c4bf4ad05fe57ff906",
          "message": "short fix in docs",
          "timestamp": "2025-08-11T14:40:54-04:00",
          "tree_id": "31f6ccaad4092685063cb4811bb9864b08487d3f",
          "url": "https://github.com/Kirch77/syntha/commit/315c61887616a5ce4a7936c4bf4ad05fe57ff906"
        },
        "date": 1754937695984,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 298866.918293028,
            "unit": "iter/sec",
            "range": "stddev: 6.045619751988854e-7",
            "extra": "mean: 3.3459708612498114 usec\nrounds: 27146"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 477567.5704742308,
            "unit": "iter/sec",
            "range": "stddev: 4.701844250847653e-7",
            "extra": "mean: 2.093944526021704 usec\nrounds: 140985"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2208.9981681482996,
            "unit": "iter/sec",
            "range": "stddev: 0.000010224794040892023",
            "extra": "mean: 452.6939018868691 usec\nrounds: 2385"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4836.413126151564,
            "unit": "iter/sec",
            "range": "stddev: 0.000021101491138882114",
            "extra": "mean: 206.76480149985062 usec\nrounds: 4534"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 707.4603549548121,
            "unit": "iter/sec",
            "range": "stddev: 0.000060319902915113705",
            "extra": "mean: 1.4135067682539941 msec\nrounds: 630"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1828.3872676146925,
            "unit": "iter/sec",
            "range": "stddev: 0.000014032718142216303",
            "extra": "mean: 546.9300829821443 usec\nrounds: 3085"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 529198.9447520126,
            "unit": "iter/sec",
            "range": "stddev: 8.387217959988516e-7",
            "extra": "mean: 1.8896485148295394 usec\nrounds: 1212"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.345662126050573,
            "unit": "iter/sec",
            "range": "stddev: 0.0036239260159123842",
            "extra": "mean: 51.691174666666754 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 99044.32159673689,
            "unit": "iter/sec",
            "range": "stddev: 0.000003697963911320432",
            "extra": "mean: 10.096489974170776 usec\nrounds: 20148"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1176.1307788834047,
            "unit": "iter/sec",
            "range": "stddev: 0.00001931109424516727",
            "extra": "mean: 850.2455831904851 usec\nrounds: 1166"
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
          "id": "340f4495e2b957a4ea17cbe25191cdb3b49550d6",
          "message": "Update version to 0.2.1 and modify project URLs in pyproject.toml; enhance README with a concise overview and quick start guide; adjust setup.py for Python version compatibility.",
          "timestamp": "2025-08-11T15:43:47-04:00",
          "tree_id": "bc75f950ba276a756ba1b42b56579ce073f82771",
          "url": "https://github.com/Kirch77/syntha/commit/340f4495e2b957a4ea17cbe25191cdb3b49550d6"
        },
        "date": 1754941615274,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 294312.9336108236,
            "unit": "iter/sec",
            "range": "stddev: 6.745109923399284e-7",
            "extra": "mean: 3.3977439853945457 usec\nrounds: 25022"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 486006.87764239823,
            "unit": "iter/sec",
            "range": "stddev: 6.181178935389935e-7",
            "extra": "mean: 2.0575840507668612 usec\nrounds: 143205"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2158.2278328281086,
            "unit": "iter/sec",
            "range": "stddev: 0.000021562540564861575",
            "extra": "mean: 463.3431117833446 usec\nrounds: 2317"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4892.023909965874,
            "unit": "iter/sec",
            "range": "stddev: 0.00001295730036474692",
            "extra": "mean: 204.4143729475304 usec\nrounds: 4628"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 697.1635306944214,
            "unit": "iter/sec",
            "range": "stddev: 0.0000646915640500372",
            "extra": "mean: 1.434383693312146 msec\nrounds: 613"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1833.1343874304368,
            "unit": "iter/sec",
            "range": "stddev: 0.000015698629647091083",
            "extra": "mean: 545.5137423949218 usec\nrounds: 3090"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 533669.2094286389,
            "unit": "iter/sec",
            "range": "stddev: 4.2756599378803925e-7",
            "extra": "mean: 1.8738199287731585 usec\nrounds: 1405"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.770893388673915,
            "unit": "iter/sec",
            "range": "stddev: 0.0027214999475708777",
            "extra": "mean: 43.915712173919054 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 97246.56371126593,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013990079809670304",
            "extra": "mean: 10.283139700124446 usec\nrounds: 19957"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1094.2353829062824,
            "unit": "iter/sec",
            "range": "stddev: 0.000018601165429922396",
            "extra": "mean: 913.880153778254 usec\nrounds: 1112"
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
          "id": "cfc8483dad3b00927a3feb55613fd619952dd9ba",
          "message": "Update README links to point to the new documentation URL structure",
          "timestamp": "2025-08-11T16:05:24-04:00",
          "tree_id": "77a263e8022c56a2a3cdbbfe4754eb909ac11e6a",
          "url": "https://github.com/Kirch77/syntha/commit/cfc8483dad3b00927a3feb55613fd619952dd9ba"
        },
        "date": 1754942756775,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 297972.07477632014,
            "unit": "iter/sec",
            "range": "stddev: 5.992965752047866e-7",
            "extra": "mean: 3.356019186531738 usec\nrounds: 25643"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 481242.7207783708,
            "unit": "iter/sec",
            "range": "stddev: 5.405579226350992e-7",
            "extra": "mean: 2.0779535083306437 usec\nrounds: 131701"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2188.387346518543,
            "unit": "iter/sec",
            "range": "stddev: 0.000011499929231980295",
            "extra": "mean: 456.9574950206498 usec\nrounds: 2410"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4871.029792482155,
            "unit": "iter/sec",
            "range": "stddev: 0.000010592601327022342",
            "extra": "mean: 205.29539801694068 usec\nrounds: 4236"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 720.4228192089572,
            "unit": "iter/sec",
            "range": "stddev: 0.00006096379891693239",
            "extra": "mean: 1.3880737441076973 msec\nrounds: 594"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1865.1464124931945,
            "unit": "iter/sec",
            "range": "stddev: 0.000009956969413161902",
            "extra": "mean: 536.1509387690758 usec\nrounds: 3152"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 551662.893608821,
            "unit": "iter/sec",
            "range": "stddev: 4.120930117581283e-7",
            "extra": "mean: 1.812701219504335 usec\nrounds: 1476"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.370631987632517,
            "unit": "iter/sec",
            "range": "stddev: 0.004047488117648124",
            "extra": "mean: 51.62454176190357 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102074.04784945372,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015163564726375004",
            "extra": "mean: 9.796809483590511 usec\nrounds: 20140"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1180.8592036844868,
            "unit": "iter/sec",
            "range": "stddev: 0.00006035400160753753",
            "extra": "mean: 846.8410093936901 usec\nrounds: 1171"
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
          "id": "94f6dca389cc4e66727860df87247cd888343017",
          "message": "Update documentation URLs and streamline release workflow\n\n- Changed the site URL in mkdocs.yml to reflect the new documentation structure.\n- Updated repository URL and name in mkdocs.yml for consistency.\n- Removed outdated pull request template to simplify the repository.\n- Refined the GitHub Actions release workflow for better package building and publishing to PyPI and TestPyPI.",
          "timestamp": "2025-08-11T16:49:20-04:00",
          "tree_id": "3d2a795e336bb9bd7b104b98846315760b155427",
          "url": "https://github.com/Kirch77/syntha/commit/94f6dca389cc4e66727860df87247cd888343017"
        },
        "date": 1754945411182,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 302192.95332216105,
            "unit": "iter/sec",
            "range": "stddev: 6.151046369540936e-7",
            "extra": "mean: 3.3091440055318646 usec\nrounds: 27242"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 491311.3045688703,
            "unit": "iter/sec",
            "range": "stddev: 5.617724929349772e-7",
            "extra": "mean: 2.035369409782884 usec\nrounds: 137495"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2209.765932367672,
            "unit": "iter/sec",
            "range": "stddev: 0.00001064148369070818",
            "extra": "mean: 452.5366172735506 usec\nrounds: 2362"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4872.405069193443,
            "unit": "iter/sec",
            "range": "stddev: 0.000007247407209103298",
            "extra": "mean: 205.2374516894458 usec\nrounds: 4647"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 706.5692430213544,
            "unit": "iter/sec",
            "range": "stddev: 0.00006726574310405888",
            "extra": "mean: 1.4152894565915564 msec\nrounds: 622"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1849.541478412336,
            "unit": "iter/sec",
            "range": "stddev: 0.00004438396132616215",
            "extra": "mean: 540.6745464602445 usec\nrounds: 3164"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 546748.3508832855,
            "unit": "iter/sec",
            "range": "stddev: 6.00037302082988e-7",
            "extra": "mean: 1.828994999956516 usec\nrounds: 1200"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 19.072870498829182,
            "unit": "iter/sec",
            "range": "stddev: 0.003832837238718669",
            "extra": "mean: 52.43049283333553 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102396.54260361627,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014012162493697875",
            "extra": "mean: 9.765954734146304 usec\nrounds: 17585"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1180.6541977510378,
            "unit": "iter/sec",
            "range": "stddev: 0.00001986428470980866",
            "extra": "mean: 846.9880528141466 usec\nrounds: 1155"
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
          "id": "e25bb01f278a69da46a9f9fe659b02f5ec39f229",
          "message": "Enhance performance tests with CI awareness and leniency\n\n- Updated performance assertions in `test_performance_benchmarks.py` to account for CI environments, adjusting thresholds for average time and tool creation rates.\n- Modified `test_persistence_integration.py` to allow extra time for expiration checks and cleanup operations, ensuring robustness across different system speeds.\n- Improved timeout handling in `test_user_isolation.py` for performance tests, particularly on Windows and CI, to accommodate slower execution times.",
          "timestamp": "2025-08-11T17:14:41-04:00",
          "tree_id": "7940cd38bb900751a955556b2301bb5cbe956624",
          "url": "https://github.com/Kirch77/syntha/commit/e25bb01f278a69da46a9f9fe659b02f5ec39f229"
        },
        "date": 1754946918026,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 286516.21844088694,
            "unit": "iter/sec",
            "range": "stddev: 7.400977337244149e-7",
            "extra": "mean: 3.490203819670741 usec\nrounds: 25866"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 483313.7522273145,
            "unit": "iter/sec",
            "range": "stddev: 4.746143422583517e-7",
            "extra": "mean: 2.0690493398782395 usec\nrounds: 141184"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2167.1060496073956,
            "unit": "iter/sec",
            "range": "stddev: 0.000016777517653098763",
            "extra": "mean: 461.44488414914684 usec\nrounds: 2227"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4806.936285480308,
            "unit": "iter/sec",
            "range": "stddev: 0.0000069613571901735036",
            "extra": "mean: 208.03271368929333 usec\nrounds: 4551"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 670.5920012427473,
            "unit": "iter/sec",
            "range": "stddev: 0.0003712993603896891",
            "extra": "mean: 1.491219695652186 msec\nrounds: 598"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1810.0795098223582,
            "unit": "iter/sec",
            "range": "stddev: 0.000027326155691669452",
            "extra": "mean: 552.4619192546631 usec\nrounds: 3059"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 545884.295874001,
            "unit": "iter/sec",
            "range": "stddev: 4.938373566115269e-7",
            "extra": "mean: 1.8318900315659867 usec\nrounds: 1264"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.053662985314148,
            "unit": "iter/sec",
            "range": "stddev: 0.0034474362194512973",
            "extra": "mean: 55.390421368420114 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101217.60567753934,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014870816864409643",
            "extra": "mean: 9.879704161209029 usec\nrounds: 21292"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1148.5009509246822,
            "unit": "iter/sec",
            "range": "stddev: 0.000020483251980718497",
            "extra": "mean: 870.7001933214588 usec\nrounds: 1138"
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
          "id": "12c6e8336886bd6225e14c7594aa53a18fa024ad",
          "message": "Refactor linting and CI checks to use module execution\n\n- Updated the Makefile and CI workflow to run linting and type checking tools (flake8, isort, black, mypy, bandit) using the `python -m` command for consistency and improved compatibility.\n- Made minor formatting adjustments in various example scripts for better readability and consistency.\n- Enhanced error messages in example scripts to provide clearer guidance when dependencies are missing.",
          "timestamp": "2025-08-11T17:45:04-04:00",
          "tree_id": "df122ab3684a432da4c66ef5473629e0abad2bcc",
          "url": "https://github.com/Kirch77/syntha/commit/12c6e8336886bd6225e14c7594aa53a18fa024ad"
        },
        "date": 1754948746781,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 297525.8911078521,
            "unit": "iter/sec",
            "range": "stddev: 6.571738790514793e-7",
            "extra": "mean: 3.3610520290400663 usec\nrounds: 16337"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 474061.7056931657,
            "unit": "iter/sec",
            "range": "stddev: 5.033546889159573e-7",
            "extra": "mean: 2.1094300340876835 usec\nrounds: 122474"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2169.7740340508326,
            "unit": "iter/sec",
            "range": "stddev: 0.00004056968532030993",
            "extra": "mean: 460.8774850775878 usec\nrounds: 2245"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4808.509012787147,
            "unit": "iter/sec",
            "range": "stddev: 0.00002318491181886663",
            "extra": "mean: 207.9646720720966 usec\nrounds: 4193"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 677.3838639546566,
            "unit": "iter/sec",
            "range": "stddev: 0.00009587417616939764",
            "extra": "mean: 1.4762678197881298 msec\nrounds: 566"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1850.6287706429298,
            "unit": "iter/sec",
            "range": "stddev: 0.000014596248807062954",
            "extra": "mean: 540.3568861909504 usec\nrounds: 3172"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 523232.9724283452,
            "unit": "iter/sec",
            "range": "stddev: 4.53790538788553e-7",
            "extra": "mean: 1.9111945398986612 usec\nrounds: 1172"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.90962359012127,
            "unit": "iter/sec",
            "range": "stddev: 0.0032679330905848675",
            "extra": "mean: 43.64977870833305 msec\nrounds: 24"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102013.25102473376,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013971658051162846",
            "extra": "mean: 9.802648086938664 usec\nrounds: 19860"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1154.2773664978095,
            "unit": "iter/sec",
            "range": "stddev: 0.000020898617269835535",
            "extra": "mean: 866.3428990504232 usec\nrounds: 1159"
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
          "id": "b856ca5aeb1135ea870d6ee382293ecc54f7b9d2",
          "message": "Update access control test assertions for concurrency leniency\n\n- Modified the success rate assertion in `test_tool_access_control_integration.py` to allow boundary equality, ensuring that at least 10% of results succeed during concurrent access tests.",
          "timestamp": "2025-08-11T17:48:50-04:00",
          "tree_id": "746884217816c62238ce01ba700341331dea474a",
          "url": "https://github.com/Kirch77/syntha/commit/b856ca5aeb1135ea870d6ee382293ecc54f7b9d2"
        },
        "date": 1754948965176,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 301215.7373490277,
            "unit": "iter/sec",
            "range": "stddev: 6.92271713870532e-7",
            "extra": "mean: 3.3198796610061243 usec\nrounds: 26550"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 464629.1688715759,
            "unit": "iter/sec",
            "range": "stddev: 6.426677252619366e-7",
            "extra": "mean: 2.152254027504677 usec\nrounds: 138237"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2200.254945016346,
            "unit": "iter/sec",
            "range": "stddev: 0.000011955924095489027",
            "extra": "mean: 454.49278605874053 usec\nrounds: 2281"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4821.757963871236,
            "unit": "iter/sec",
            "range": "stddev: 0.000010167979075606263",
            "extra": "mean: 207.3932386264224 usec\nrounds: 4572"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 712.8862159944885,
            "unit": "iter/sec",
            "range": "stddev: 0.00007236820123804661",
            "extra": "mean: 1.402748401587458 msec\nrounds: 630"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1809.850111101028,
            "unit": "iter/sec",
            "range": "stddev: 0.000037294725619360414",
            "extra": "mean: 552.5319438700075 usec\nrounds: 2708"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 535002.7512344562,
            "unit": "iter/sec",
            "range": "stddev: 3.235846705714817e-7",
            "extra": "mean: 1.8691492664152045 usec\nrounds: 1159"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.858861398883022,
            "unit": "iter/sec",
            "range": "stddev: 0.007697653001970194",
            "extra": "mean: 53.02547056521813 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 103234.0303897031,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014891095737738963",
            "extra": "mean: 9.68672826416882 usec\nrounds: 19622"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1192.7710016617102,
            "unit": "iter/sec",
            "range": "stddev: 0.00001589996196803991",
            "extra": "mean: 838.3838964955125 usec\nrounds: 1227"
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
          "id": "0eb06d9a9a9f0516f62430bb4700648ffa2c9b80",
          "message": "Refine GitHub Actions release workflow for artifact handling\n\n- Updated the release workflow to remove unnecessary working-directory specifications for building and checking distributions, simplifying the artifact upload process.",
          "timestamp": "2025-08-11T18:00:32-04:00",
          "tree_id": "4beb2f3372f130ed5be0fcbfd527c6f6b75545d2",
          "url": "https://github.com/Kirch77/syntha/commit/0eb06d9a9a9f0516f62430bb4700648ffa2c9b80"
        },
        "date": 1754949665400,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 307840.1457468288,
            "unit": "iter/sec",
            "range": "stddev: 6.056104382331459e-7",
            "extra": "mean: 3.248439210467407 usec\nrounds: 24774"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 482223.09715620393,
            "unit": "iter/sec",
            "range": "stddev: 5.446497596505287e-7",
            "extra": "mean: 2.073728956363273 usec\nrounds: 131857"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2202.289567544593,
            "unit": "iter/sec",
            "range": "stddev: 0.000010499674076114876",
            "extra": "mean: 454.0728951983067 usec\nrounds: 2395"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4961.702417266931,
            "unit": "iter/sec",
            "range": "stddev: 0.0000095073593132869",
            "extra": "mean: 201.5437275157733 usec\nrounds: 4114"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 696.4141729100841,
            "unit": "iter/sec",
            "range": "stddev: 0.00008382816706451367",
            "extra": "mean: 1.4359271233974624 msec\nrounds: 624"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1817.7739828963058,
            "unit": "iter/sec",
            "range": "stddev: 0.00003264201669887735",
            "extra": "mean: 550.1233978531668 usec\nrounds: 2888"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 496784.8087143427,
            "unit": "iter/sec",
            "range": "stddev: 6.014275118142714e-7",
            "extra": "mean: 2.012944000014727 usec\nrounds: 1000"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 17.90978853841032,
            "unit": "iter/sec",
            "range": "stddev: 0.005460809021665408",
            "extra": "mean: 55.8353884444445 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101214.95445453702,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017631501639545344",
            "extra": "mean: 9.879962950031981 usec\nrounds: 20027"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1155.2414553268397,
            "unit": "iter/sec",
            "range": "stddev: 0.000030080026482791007",
            "extra": "mean: 865.6199060282866 usec\nrounds: 1128"
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
          "id": "0e4b1c84b68a1de6f5ac80d0c7b1af268acfa88b",
          "message": "Enhance performance benchmarking with high-resolution timing and CI adjustments\n\n- Updated time measurement methods in `PerformanceBenchmark` to use `time.perf_counter()` for improved accuracy.\n- Adjusted performance assertion thresholds in `TestToolCreationPerformance` to account for CI environments, allowing for more lenient checks on average time and tool creation rates.\n- Refined scalability benchmark assertions to be CI-aware, accommodating variability in execution times.",
          "timestamp": "2025-08-11T18:10:52-04:00",
          "tree_id": "607cbe4fb2137c29421244d38d344553f0dee5f4",
          "url": "https://github.com/Kirch77/syntha/commit/0e4b1c84b68a1de6f5ac80d0c7b1af268acfa88b"
        },
        "date": 1754950288823,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 300556.50148528634,
            "unit": "iter/sec",
            "range": "stddev: 7.158302281237315e-7",
            "extra": "mean: 3.3271614324036 usec\nrounds: 26810"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 482764.8051185428,
            "unit": "iter/sec",
            "range": "stddev: 5.176599358914976e-7",
            "extra": "mean: 2.0714020355200713 usec\nrounds: 128618"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2180.1511213995614,
            "unit": "iter/sec",
            "range": "stddev: 0.000009563012217953091",
            "extra": "mean: 458.68379956984074 usec\nrounds: 2325"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4909.278718338392,
            "unit": "iter/sec",
            "range": "stddev: 0.0000070183077125170825",
            "extra": "mean: 203.69591081975946 usec\nrounds: 4575"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 712.0859480497669,
            "unit": "iter/sec",
            "range": "stddev: 0.00005712233824782073",
            "extra": "mean: 1.4043248609788759 msec\nrounds: 633"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1865.783294438424,
            "unit": "iter/sec",
            "range": "stddev: 0.00001254693676192618",
            "extra": "mean: 535.9679245605995 usec\nrounds: 1763"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 554310.090926899,
            "unit": "iter/sec",
            "range": "stddev: 2.659233818438446e-7",
            "extra": "mean: 1.8040443722174226 usec\nrounds: 1217"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 15.275110039919472,
            "unit": "iter/sec",
            "range": "stddev: 0.009989629083027607",
            "extra": "mean: 65.46597683333427 msec\nrounds: 18"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102113.80162141647,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014827104705631578",
            "extra": "mean: 9.792995502287408 usec\nrounds: 15342"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1174.970040014709,
            "unit": "iter/sec",
            "range": "stddev: 0.0000336076633766421",
            "extra": "mean: 851.0855306467913 usec\nrounds: 1191"
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
          "id": "4c428abf0dd34a9e290025a4f52574036e79abf8",
          "message": "black refactor",
          "timestamp": "2025-08-11T18:12:54-04:00",
          "tree_id": "0de79faa0b8af9faab960ebbd0ea1f9f1bba2691",
          "url": "https://github.com/Kirch77/syntha/commit/4c428abf0dd34a9e290025a4f52574036e79abf8"
        },
        "date": 1754950407171,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 296188.9750266531,
            "unit": "iter/sec",
            "range": "stddev: 6.081164227939505e-7",
            "extra": "mean: 3.3762228992825043 usec\nrounds: 27573"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 480143.54895877384,
            "unit": "iter/sec",
            "range": "stddev: 5.801728443567713e-7",
            "extra": "mean: 2.0827104772490905 usec\nrounds: 130311"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2172.1687819144427,
            "unit": "iter/sec",
            "range": "stddev: 0.0000131006284632825",
            "extra": "mean: 460.36938212446324 usec\nrounds: 2316"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4852.351123808103,
            "unit": "iter/sec",
            "range": "stddev: 0.000016613569935105314",
            "extra": "mean: 206.0856633176217 usec\nrounds: 4678"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 724.4145022672092,
            "unit": "iter/sec",
            "range": "stddev: 0.00006751004018513463",
            "extra": "mean: 1.3804251528238147 msec\nrounds: 602"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1826.185034969961,
            "unit": "iter/sec",
            "range": "stddev: 0.000011407345793558448",
            "extra": "mean: 547.5896367842315 usec\nrounds: 2811"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 544174.6109270751,
            "unit": "iter/sec",
            "range": "stddev: 4.174979965611279e-7",
            "extra": "mean: 1.8376454540875484 usec\nrounds: 1210"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 24.060876882718805,
            "unit": "iter/sec",
            "range": "stddev: 0.0023327438320719066",
            "extra": "mean: 41.56124504000218 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101108.01937833385,
            "unit": "iter/sec",
            "range": "stddev: 0.000001410193175965514",
            "extra": "mean: 9.8904123149532 usec\nrounds: 20317"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1157.6622743807525,
            "unit": "iter/sec",
            "range": "stddev: 0.000021636001540907153",
            "extra": "mean: 863.8097847102359 usec\nrounds: 1138"
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
          "id": "c0cafba200e795c079d019a6ce420464e3614a05",
          "message": "Fix import shadowing issue in langchain.py by removing redundant imports from the main function and adding necessary imports at the top of the file.",
          "timestamp": "2025-08-11T18:26:59-04:00",
          "tree_id": "185d952f0e19200c12adfc2695f84424191c1cb2",
          "url": "https://github.com/Kirch77/syntha/commit/c0cafba200e795c079d019a6ce420464e3614a05"
        },
        "date": 1754951252900,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 300708.565403518,
            "unit": "iter/sec",
            "range": "stddev: 5.598189092597582e-7",
            "extra": "mean: 3.325478935587051 usec\nrounds: 25066"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 491596.7031554234,
            "unit": "iter/sec",
            "range": "stddev: 5.097417491359927e-7",
            "extra": "mean: 2.0341877672923276 usec\nrounds: 106861"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2204.7658755642715,
            "unit": "iter/sec",
            "range": "stddev: 0.000019327051256087858",
            "extra": "mean: 453.5628980306434 usec\nrounds: 2285"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4924.819277118675,
            "unit": "iter/sec",
            "range": "stddev: 0.000007409464266573497",
            "extra": "mean: 203.05313631428564 usec\nrounds: 4607"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 712.0915587584036,
            "unit": "iter/sec",
            "range": "stddev: 0.0000681364946113455",
            "extra": "mean: 1.404313796028689 msec\nrounds: 554"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1850.6649715202857,
            "unit": "iter/sec",
            "range": "stddev: 0.000027053639086460893",
            "extra": "mean: 540.3463162641043 usec\nrounds: 3105"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 531674.8791977519,
            "unit": "iter/sec",
            "range": "stddev: 9.101223583855225e-7",
            "extra": "mean: 1.8808486899153622 usec\nrounds: 1183"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.964658164267416,
            "unit": "iter/sec",
            "range": "stddev: 0.005565291732009743",
            "extra": "mean: 58.946074263158195 msec\nrounds: 19"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 99468.67264969736,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014910282471599716",
            "extra": "mean: 10.053416551779458 usec\nrounds: 19587"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1147.493230834705,
            "unit": "iter/sec",
            "range": "stddev: 0.000018730086728691596",
            "extra": "mean: 871.4648358078626 usec\nrounds: 1145"
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
          "id": "ce35cf01599af049cf81fd447a0fa8ff62be922b",
          "message": "Update version to 0.2.2 in pyproject.toml and __init__.py to reflect latest changes",
          "timestamp": "2025-08-11T18:34:51-04:00",
          "tree_id": "ebc991fa522342a950f371076cc3ae7d0ba09ca8",
          "url": "https://github.com/Kirch77/syntha/commit/ce35cf01599af049cf81fd447a0fa8ff62be922b"
        },
        "date": 1754951727431,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 296969.12511715543,
            "unit": "iter/sec",
            "range": "stddev: 6.006260514163079e-7",
            "extra": "mean: 3.367353423038493 usec\nrounds: 26000"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 485065.72825798346,
            "unit": "iter/sec",
            "range": "stddev: 5.160597328200209e-7",
            "extra": "mean: 2.061576280788379 usec\nrounds: 128453"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2194.81569277728,
            "unit": "iter/sec",
            "range": "stddev: 0.000010627032877294159",
            "extra": "mean: 455.61912250345625 usec\nrounds: 2253"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4917.134928414656,
            "unit": "iter/sec",
            "range": "stddev: 0.000007296416583467244",
            "extra": "mean: 203.37046157128987 usec\nrounds: 4684"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 718.9143812208257,
            "unit": "iter/sec",
            "range": "stddev: 0.000054492621169562814",
            "extra": "mean: 1.3909862232855161 msec\nrounds: 627"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1833.2255347905832,
            "unit": "iter/sec",
            "range": "stddev: 0.000009728726985049798",
            "extra": "mean: 545.4866196341925 usec\nrounds: 2842"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 544084.9194074934,
            "unit": "iter/sec",
            "range": "stddev: 3.679300258561883e-7",
            "extra": "mean: 1.8379483869705422 usec\nrounds: 1395"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 16.410512474843866,
            "unit": "iter/sec",
            "range": "stddev: 0.005047436680270859",
            "extra": "mean: 60.93654914999931 msec\nrounds: 20"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100729.19480906386,
            "unit": "iter/sec",
            "range": "stddev: 0.000001428051781573567",
            "extra": "mean: 9.927608394920055 usec\nrounds: 20965"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1173.644403619683,
            "unit": "iter/sec",
            "range": "stddev: 0.000017402295601687602",
            "extra": "mean: 852.0468354093119 usec\nrounds: 1124"
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
          "id": "ad28c35d004fd42bacab6d341e61697771b43528",
          "message": "fix pypi test",
          "timestamp": "2025-08-12T14:09:57-04:00",
          "tree_id": "5f6eb7ce626d29d7d8d2f1efc2b7a742b30186eb",
          "url": "https://github.com/Kirch77/syntha/commit/ad28c35d004fd42bacab6d341e61697771b43528"
        },
        "date": 1755022237088,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 301791.5257650218,
            "unit": "iter/sec",
            "range": "stddev: 6.930035310218454e-7",
            "extra": "mean: 3.3135456585968255 usec\nrounds: 26731"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 484011.7917459935,
            "unit": "iter/sec",
            "range": "stddev: 5.321484679998286e-7",
            "extra": "mean: 2.0660653666983264 usec\nrounds: 125079"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2209.8560715797885,
            "unit": "iter/sec",
            "range": "stddev: 0.000010908588118607941",
            "extra": "mean: 452.518158472247 usec\nrounds: 2278"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4912.834778212658,
            "unit": "iter/sec",
            "range": "stddev: 0.000007241186877092951",
            "extra": "mean: 203.5484694976473 usec\nrounds: 4639"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 691.331119346596,
            "unit": "iter/sec",
            "range": "stddev: 0.00010044947118231442",
            "extra": "mean: 1.4464848637873253 msec\nrounds: 602"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1889.6455135439182,
            "unit": "iter/sec",
            "range": "stddev: 0.000016930417073373175",
            "extra": "mean: 529.199785267957 usec\nrounds: 3041"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 514354.21769005206,
            "unit": "iter/sec",
            "range": "stddev: 4.544784512776437e-7",
            "extra": "mean: 1.9441854768703313 usec\nrounds: 1143"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 21.540685344064585,
            "unit": "iter/sec",
            "range": "stddev: 0.009858705781550405",
            "extra": "mean: 46.42377826086877 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101956.90336925889,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017068029099572836",
            "extra": "mean: 9.808065633165462 usec\nrounds: 19868"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1175.885158801643,
            "unit": "iter/sec",
            "range": "stddev: 0.000014391181549718216",
            "extra": "mean: 850.4231833482028 usec\nrounds: 1129"
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
          "id": "9365b55f9d2f81af61429bb411168b2f6fc6d1ee",
          "message": "quick test fix pypi",
          "timestamp": "2025-08-12T14:13:18-04:00",
          "tree_id": "be6280e42192de105acd8d8ff77cb69bdb2fbd24",
          "url": "https://github.com/Kirch77/syntha/commit/9365b55f9d2f81af61429bb411168b2f6fc6d1ee"
        },
        "date": 1755022430171,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 298030.47133283026,
            "unit": "iter/sec",
            "range": "stddev: 5.844132690590197e-7",
            "extra": "mean: 3.355361602885344 usec\nrounds: 46316"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 488773.64402953436,
            "unit": "iter/sec",
            "range": "stddev: 5.077385672110938e-7",
            "extra": "mean: 2.04593683030007 usec\nrounds: 145497"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2179.1250915612413,
            "unit": "iter/sec",
            "range": "stddev: 0.000009394790010163382",
            "extra": "mean: 458.89976847705736 usec\nrounds: 2449"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4952.78300850615,
            "unit": "iter/sec",
            "range": "stddev: 0.000010858688888290552",
            "extra": "mean: 201.9066852479811 usec\nrounds: 4718"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 705.6726577291554,
            "unit": "iter/sec",
            "range": "stddev: 0.0000938762232563418",
            "extra": "mean: 1.4170876383647708 msec\nrounds: 636"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1822.2535982702973,
            "unit": "iter/sec",
            "range": "stddev: 0.000024980821967838044",
            "extra": "mean: 548.7710387561923 usec\nrounds: 2219"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 385473.2101860819,
            "unit": "iter/sec",
            "range": "stddev: 6.959352031230528e-7",
            "extra": "mean: 2.594214003918103 usec\nrounds: 1014"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 25.460012861767282,
            "unit": "iter/sec",
            "range": "stddev: 0.0025882802162866037",
            "extra": "mean: 39.2772778799997 msec\nrounds: 25"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 102984.26864766107,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014666143669343835",
            "extra": "mean: 9.710220921423337 usec\nrounds: 21098"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1175.533321652221,
            "unit": "iter/sec",
            "range": "stddev: 0.000016964688460336353",
            "extra": "mean: 850.6777150259701 usec\nrounds: 579"
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
          "id": "aeb878f35a2c9322b3f4dc75d810f74fae86ce61",
          "message": "Update GitHub Actions release workflow to trigger on specific pre-release tag 'v0.2.2-rc.1'",
          "timestamp": "2025-08-12T14:23:19-04:00",
          "tree_id": "38bd77fd117251fe00ff5ccd2d7db51f38b562f9",
          "url": "https://github.com/Kirch77/syntha/commit/aeb878f35a2c9322b3f4dc75d810f74fae86ce61"
        },
        "date": 1755023036894,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 286310.4079091452,
            "unit": "iter/sec",
            "range": "stddev: 6.87597720267588e-7",
            "extra": "mean: 3.492712707521725 usec\nrounds: 32587"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 461986.997677897,
            "unit": "iter/sec",
            "range": "stddev: 5.009529411404472e-7",
            "extra": "mean: 2.1645630830009037 usec\nrounds: 142796"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2149.2679611792796,
            "unit": "iter/sec",
            "range": "stddev: 0.000015183450415118362",
            "extra": "mean: 465.274697274746 usec\nrounds: 2385"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4654.805429384185,
            "unit": "iter/sec",
            "range": "stddev: 0.000019060262401491334",
            "extra": "mean: 214.83175079399538 usec\nrounds: 4093"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 716.8286515845759,
            "unit": "iter/sec",
            "range": "stddev: 0.000056050342399510634",
            "extra": "mean: 1.3950335241057445 msec\nrounds: 643"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1790.8921495241364,
            "unit": "iter/sec",
            "range": "stddev: 0.000016937566080392553",
            "extra": "mean: 558.3809166094749 usec\nrounds: 2914"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 501096.00092608837,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010377264226283699",
            "extra": "mean: 1.9956255850213815 usec\nrounds: 1282"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 22.052398512344777,
            "unit": "iter/sec",
            "range": "stddev: 0.0026290927631387575",
            "extra": "mean: 45.34654130434869 msec\nrounds: 23"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 96139.27854770578,
            "unit": "iter/sec",
            "range": "stddev: 0.00000143427318784545",
            "extra": "mean: 10.401575871029495 usec\nrounds: 21899"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1020.6962268615555,
            "unit": "iter/sec",
            "range": "stddev: 0.00003858875394945025",
            "extra": "mean: 979.7234218008307 usec\nrounds: 1055"
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
          "id": "9e56135968c0b3b72c572f1070cbe8bc98c9ee75",
          "message": "tag test",
          "timestamp": "2025-08-12T14:33:29-04:00",
          "tree_id": "be6280e42192de105acd8d8ff77cb69bdb2fbd24",
          "url": "https://github.com/Kirch77/syntha/commit/9e56135968c0b3b72c572f1070cbe8bc98c9ee75"
        },
        "date": 1755023724738,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 296687.3057183198,
            "unit": "iter/sec",
            "range": "stddev: 5.532353149091899e-7",
            "extra": "mean: 3.3705520280986265 usec\nrounds: 26774"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 472391.7952192461,
            "unit": "iter/sec",
            "range": "stddev: 5.317044960493278e-7",
            "extra": "mean: 2.116886893718975 usec\nrounds: 134157"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2194.624435396,
            "unit": "iter/sec",
            "range": "stddev: 0.000015879806143857938",
            "extra": "mean: 455.65882885085034 usec\nrounds: 2454"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4814.098816423084,
            "unit": "iter/sec",
            "range": "stddev: 0.000011658204882147009",
            "extra": "mean: 207.7231976602858 usec\nrounds: 4103"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 715.345835503701,
            "unit": "iter/sec",
            "range": "stddev: 0.00006500396241358923",
            "extra": "mean: 1.3979252417061514 msec\nrounds: 633"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1831.1438466914917,
            "unit": "iter/sec",
            "range": "stddev: 0.00003463071634605625",
            "extra": "mean: 546.1067418634526 usec\nrounds: 3134"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 548849.0239212933,
            "unit": "iter/sec",
            "range": "stddev: 4.021598036560175e-7",
            "extra": "mean: 1.8219946768884174 usec\nrounds: 1315"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 14.735124749739539,
            "unit": "iter/sec",
            "range": "stddev: 0.015451007842124831",
            "extra": "mean: 67.8650515000001 msec\nrounds: 14"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 100845.50241793832,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014194311555087171",
            "extra": "mean: 9.916158638941154 usec\nrounds: 20014"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1172.1323355434124,
            "unit": "iter/sec",
            "range": "stddev: 0.000022619190101373802",
            "extra": "mean: 853.1459884488127 usec\nrounds: 1212"
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
          "id": "25178df7adbc03e261a7f2ec178ed1dd590cf55f",
          "message": "Version 0.2.3",
          "timestamp": "2025-08-12T14:42:06-04:00",
          "tree_id": "9228fd0ffb2684bf2fec1744e3795c8b70d880f1",
          "url": "https://github.com/Kirch77/syntha/commit/25178df7adbc03e261a7f2ec178ed1dd590cf55f"
        },
        "date": 1755024197367,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_push_performance",
            "value": 301297.9107489294,
            "unit": "iter/sec",
            "range": "stddev: 5.724981371438531e-7",
            "extra": "mean: 3.3189742255906207 usec\nrounds: 38449"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_single_get_performance",
            "value": 487055.053361103,
            "unit": "iter/sec",
            "range": "stddev: 5.367175864108429e-7",
            "extra": "mean: 2.0531559894495115 usec\nrounds: 151241"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_push_performance",
            "value": 2169.005560764731,
            "unit": "iter/sec",
            "range": "stddev: 0.000011291344743388114",
            "extra": "mean: 461.0407728265242 usec\nrounds: 2289"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_batch_get_performance",
            "value": 4922.213166546215,
            "unit": "iter/sec",
            "range": "stddev: 0.00000987428874030047",
            "extra": "mean: 203.16064464588663 usec\nrounds: 4632"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_concurrent_access_performance",
            "value": 709.685502228764,
            "unit": "iter/sec",
            "range": "stddev: 0.00005960944617631257",
            "extra": "mean: 1.4090748604269139 msec\nrounds: 609"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_topic_routing_performance",
            "value": 1816.263872645517,
            "unit": "iter/sec",
            "range": "stddev: 0.000011546005630901772",
            "extra": "mean: 550.5807911839534 usec\nrounds: 3108"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_ttl_cleanup_performance",
            "value": 547183.1296914215,
            "unit": "iter/sec",
            "range": "stddev: 3.7253426182711345e-7",
            "extra": "mean: 1.8275417236710862 usec\nrounds: 1462"
          },
          {
            "name": "tests/performance/test_performance.py::TestContextMeshPerformance::test_database_persistence_performance",
            "value": 18.610247806332016,
            "unit": "iter/sec",
            "range": "stddev: 0.0048337467581940855",
            "extra": "mean: 53.73383580952407 msec\nrounds: 21"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_tool_execution_performance",
            "value": 101768.6511633744,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017905260304723003",
            "extra": "mean: 9.826208646458811 usec\nrounds: 21558"
          },
          {
            "name": "tests/performance/test_performance.py::TestToolHandlerPerformance::test_batch_tool_execution_performance",
            "value": 1177.6877199073417,
            "unit": "iter/sec",
            "range": "stddev: 0.000015513585801411027",
            "extra": "mean: 849.121531197318 usec\nrounds: 1186"
          }
        ]
      }
    ]
  }
}