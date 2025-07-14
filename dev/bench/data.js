window.BENCHMARK_DATA = {
  "lastUpdate": 1752529888976,
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
      }
    ]
  }
}