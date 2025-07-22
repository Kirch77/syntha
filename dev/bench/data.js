window.BENCHMARK_DATA = {
  "lastUpdate": 1753204110418,
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
      }
    ]
  }
}