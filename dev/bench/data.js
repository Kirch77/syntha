window.BENCHMARK_DATA = {
  "lastUpdate": 1753832021593,
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
      }
    ]
  }
}