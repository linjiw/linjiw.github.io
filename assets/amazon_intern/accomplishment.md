# **IPEBench Data Visualization and ManualTestScript** **Project Accomplishments**

## 
**0. Project Overview**

**Project Name**: IPEBench Data Visualization and Regression Analysis Platform + PAS Integration  
**Intern**: Linji Wang  
**Mentor**: Jake Moh  
**Duration**: May 19 - August 8, 2025 (12 weeks)  
**Code Review**: [CR-205539208] (_https://code.amazon.com/reviews/CR-205539208_)  
This internship project consists of two main phases addressing critical performance testing challenges for RDS Proxy's deployment pipeline:
**Phase 1 (Completed)**: IPEBench Data Visualization and Regression Analysis Platform  
**Phase 2 (In Progress)**: Strategic Pivot to RDSRialtoManualTestScripts Integration

## 
**1. Background and Problem Statement**

### 
**1.1 IPEBench Context**

IPEBench (Iron Proxy Engine Benchmarking framework) serves as RDS Proxy's critical performance testing tool in the deployment pipeline. It conducts rigorous statistical testing between reference and candidate Proxy images against identical database systems (MySQL, PostgreSQL, SQL Server) to detect performance regressions before production deployment.


### **1.2 Critical Engineering Challenges**

1. **Reliability Issues**: IPEBench exhibited high failure rates even when testing identical images:
    1. - P100 tests: 20% failure rate
    2. - P90 tests: 50% failure rate
2. **Diagnostic Complexity**: Engineers spent 4-8 hours per failed test manually analyzing data, creating ad-hoc visualizations, and conducting trial-and-error investigations to determine if failures represented actual regressions or statistical artifacts.
3. **Limited Visibility**: Text-based statistical outputs obscured performance patterns, making it nearly impossible to quickly distinguish between actual regressions and measurement noise.
4. **Pipeline Impact**: IPEBench serves as a critical gate in RDS's deployment pipeline; failed performance tests immediately halt deployments until root causes are determined.

## 
**2. Phase 1: IPEBench Data Visualization Platform (Completed)**

### 
**2.1 Accomplishments Summary**

1. **Technical Deliverables**:
    1. - 2,782 lines of code across 12 files
    2. - Interactive dashboard with 5 specialized analysis tabs
    3. - Statistical analysis engine with 4 advanced methods
    4. - 8 different interactive visualization types
    5. - Comprehensive data export system (CSV + JSON)
2. **Engineering Impact**:
    1. - Reduced diagnostic time and no need for multiple run to get difference percentile data
    2. - Enabled data-driven decision making for performance test failures
    3. - Provided visual answers to recurring engineering questions
    4. - Enhanced test reliability analysis capabilities

### 
**2.2 Detailed Timeline and Accomplishments**

* **Week 1 (May 19-23)** - **Initial Onboarding and Project Introduction**
    * Had first introduction meeting with mentor Jake Moh
    * Received initial project direction to focus on performance testing tools IPEBench
    * Began learning about key technologies: sysbench, hammerdb, profiler, Grafana, RDS
    * Started reviewing Performance Analysis Service (PAS) documentation
* **Week 2 (May 26-30)** - **IPEBench Exploration and Problem Discovery**
    * Began exploring IPEBench codebase and functionality
    * Ran first simple test comparing identical MySQL images
    * Discovered critical issue: despite using identical images, tests showed performance differences
    * This finding became the key focus area for the visualization project
    * Identified the core reliability problem affecting deployment pipeline
* ****Week 3 (June 2-6)** - **Project Scoping and Requirements Gathering**
    * Created formal task in Taskei for IPEBench visualization dashboard
    * Established project priorities with mentor:
        *   IPEBench visualization as primary focus (Phase 1)
        *   PAS migration planning as secondary goal (Phase 2)
    * - Identified key analytical questions to address through visualization:
        *   Why is success rate for P90 worse than P100? Percentile Distribution Graph Visualized the results.
        *   Why does IPEBench take many iterations (8-9) to converge results?  Short Connection takes most of time becuase high variance.
        *   Why are performance tests failing when comparing identical images? Max QPS rate and little warmup will cause the issue.
        *   Why is latency sometimes high only at the start of execution? Warmup time not enough
* **Week 4 (June 9-13)** - **Dashboard Design and Stakeholder Feedback**
    * Created initial design for IPEBench dashboard with 5 analysis tabs
    * Presented dashboard demo to Lucas and Rozelle, receiving positive feedback
    * Collected detailed requirements from stakeholders for dashboard features
    * Updated sysbench to the latest GitHub version for improved testing accuracy
    * Defined statistical analysis requirements (Welch's t-test, Cohen's d effect size)
* **Week 5 (June 16-20)** - **Core Implementation and Architecture**
    * Developed working prototype of visualization dashboard using Streamlit
    * Implemented core statistical analysis engine with production-grade methods
    * Code architecture decisions:
        *   Minimize changes to IPEBench source code for maintainability
        *   Export raw data in organized CSV format with 14 comprehensive columns
        *   Develop dashboard using Streamlit Python library for rapid iteration
    * Created data export functionality with `--save-raw-data` flag
* **Week 6 (June 23-27)** - **Advanced Features and Code Review Preparation**
    * Implemented 5 specialized analysis tabs:
        *   Regression Overview - Automated statistical analysis
        *   Iteration Analysis - Performance consistency evaluation
        *   Performance Deep Dive - Detailed statistical visualization
        *   Correlation Analysis - Multi-metric relationship analysis
        *   Raw Data Explorer - Advanced filtering and export
    * Developed interactive launcher (`run_streamlit_dashboard.py`) with dependency management
    * Submitted first code review (CR-205539208) for dashboard implementation
    * Resolved build and dryrun issues in the Brazil build system
* **Week 7 (June 30 - July 4)** - **Code Review and PAS Planning**
    * Conducted code review and demo with stakeholders
    * Demonstrated dashboard capabilities with real IPEBench data
    * Collected feedback and implemented requested enhancements
    * Began exploring migration path from IPEBench to PAS
    * Documented PAS integration challenges and requirements
* **Week 8 (July 7-11) - Strategic Decision and Pivot Planning**
    * Finalized dashboard implementation based on code review feedback
    * Conducted strategic evaluation meeting with cross-functional teams (Jake Moh, Ildar Ashirbaev, Yoni Shalom)
    * Made strategic decision to pivot from PAS to RDSRialtoManualTestScripts integration
    * Investigate statistical regression analysis in IPEBench
        * why short connection require max iterations
            *     def _estimate_test_sample_size(
                                self, group: Group, dimension: Dimension) -> int:
                        stats = self._samples.stats_of(group, dimension)
                        if len(stats) < self.min_samples:
                            return self.min_samples
                
                        return max(
                            estimate_sample_size(
                                self.alpha,
                                self.beta,
                                self.min_difference[dimension] * stats.mean,
                                stats.standard_deviation),
                            self.min_samples)
        * why qps sometimes fail (with 3000 rate, and normal warm up time)
            * working on to replicate problem, now it passed when 5000 rate, normal warm up
        * will change rate and warmup make long connection consistent?
            * 5000 rate, normal warmup, passed
            * 0 (max) rate, normal warmup, passed
            * 0 (max) rate, no warmup, failed 
                * seems warmup is the key
        * where t-test fits in the workflow? 
        * Try reboot database
        * warmup
* Week 9 **(July 14-18)**
    * manualscript: set up manualscript environment
    * manualscript: revise manualscript code to enable installing for linux 2023
    * manualscript: add feature to output csv file
    * ipebench: run experiment to test warmup, reboot, range_select, table_size
* Week 10 (July 21-25)
    * manualscript: setup dashboard for visualization
    * manualscript: setup regression test 
    * manualscript: edit code for perform test across reference and candidate proxy image 
    * manualscript: reboot database to make it stable
    * ipebench: 
    * 
* Week 11 (July 28- Aug 1)
    * ipebench: run experiment
    * ipebench: prepare code review
    * ipebench: code review submitted
    * ipebench: final demo
    * manualtestscript: dashboard implmented
    * manualtestscript: regression test added
* Week 12 (Aug 4 - Aug 8)

### 
**2.3 Technical Implementation Details**

1. **Data Export Enhancement**:
    1. Enhanced IPEBench core to export comprehensive raw data (14 columns)
    2. Implemented timestamped file naming for data organization
    3. Added detailed test configuration export in JSON format
2. **Statistical Analysis Engine**:
    1. Percentile analysis (P25, P50, P75, P90, P95, P99)
    2. Pearson correlation coefficients for multi-metric analysis
3. **Interactive Dashboard Features**:
    1. Real-time data filtering and visualization updates
    2. Persistent state management across browser sessions
    3. Responsive design adapting to different screen sizes
    4. Memory optimization with intelligent caching strategies
4. **Visualization Types Implemented**:
    1. Box plots for distribution quartiles and outlier detection
    2. Histograms for probability density analysis
    3. Line charts for time series and trend analysis
    4. Scatter plots for correlation visualization
    5. Heatmaps for correlation matrices
    6. Multi-panel subplots for comparative analysis
    7. Overlaid charts for direct comparison
    8. Interactive hover information and zoom capabilities

## **3. Phase 2: Strategic Pivot to RDSRialtoManualTestScripts Integration (In Progress)**

### **3.1 Strategic Decision and Rationale**

Following comprehensive evaluation with cross-functional teams, we strategically decided not to proceed with PAS integration. The decision came after weeks of investigation involving multiple discussions with both the PAS (Platform) and BMS (benchmarking tool within PAS) teams. While we were able to define a clear integration approach, the evaluation revealed that the benefits PAS offers do not justify the integration cost, primarily due to the significant effort required to build out the necessary infrastructure to support RDS Proxy.


### **3.2 Key Findings from PAS Investigation**:

1. Contacted PAS team (Felipe Reyes) for integration guidance
2. Discovered requirement for BMS (Benchmark Management Service) integration  
3. Met with BMS team (Aaron An) to understand integration complexity
4. Direct PAS integration requires BMS integration (3+ weeks effort minimum)
5. BMS is in KTLO (Keep The Lights On) mode with limited support and no dedicated SMEs
6. Integration complexity would exceed internship timeline and available resources



### **3.3 Strategic Pivot Decision**:


Instead of PAS, we chose to adopt RDSRialtoManualTestScripts as the primary performance benchmarking tool for both manual ad hoc deep-dive investigations and pipeline integration. This tool, originally developed by Yoni with extended sysbench support, has already proven its value through extensive use in resolving deployment blockers such as the JDK 21 migration and unblocking the recent Red Host Prevention rollout where IPEBench failed to provide actionable results.


## **4. Current Implementation Strategy**

### 
**4.1 RDSRialtoManualTestScripts Integration Plan**:


1. **Phase 2A** (Week 8-9): Create comprehensive design document outlining integration approach
2. **Phase 2B** (Week 10-11): Implement dashboard generation capabilities leveraging IPEBench visualization work  
3. **Phase 2C** (Week 12): Establish historical performance data storage and automated pass/fail criteria


### **4.2 Advantages of New Approach**:

1. Leverages proven, reliable tool with demonstrated success in production scenarios
2. Maintains team ownership and control over the benchmarking infrastructure
3. Enables reuse of extensive visualization knowledge gained from IPEBench dashboard development
4. Addresses IPEBench's reliability issues (current tool suffers from up to 9-hour execution times and maintenance challenges)


