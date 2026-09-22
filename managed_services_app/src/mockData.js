export const INITIAL_CLIENTS = [
  { 
    id: 'cli-1', 
    name: 'Denali Clinical Operations - Cognizant Project', 
    slaTier: 'Platinum 24/7 (Clinical SLA)', 
    activeTickets: 4, 
    health: 'Warning', 
    contact: 'denali.ops@cognizant.com',
    location: 'Onsite (US) / Offshore (India)'
  }
];

export const TEAM_MEMBERS = [
  { id: 'tm-1', name: 'Narayan', role: 'Onsite Delivery Lead & Escalation Mgr', type: 'Onsite', location: 'Onsite Lead', avatar: 'N' },
  { id: 'tm-2', name: 'Thiru', role: 'Offshore Tableau Analytics Specialist', type: 'Offshore', location: 'Offshore Team', avatar: 'T' },
  { id: 'tm-3', name: 'Partha', role: 'Offshore Reltio MDM Specialist', type: 'Offshore', location: 'Offshore Team', avatar: 'P' },
  { id: 'tm-4', name: 'Bharath', role: 'Offshore ETL Developer & Data Engineer', type: 'Offshore', location: 'Offshore Team', avatar: 'B' },
  { id: 'tm-5', name: 'Satish', role: 'Offshore Workato Integration Specialist', type: 'Offshore', location: 'Offshore Team', avatar: 'S' }
];

export const INITIAL_ASSETS = [
  {
    id: 'ast-1',
    name: 'denali-ctms-prod.cognizant.net',
    type: 'Application / Service',
    client: 'Denali Clinical Operations - Cognizant Project',
    environment: 'Production',
    owner: 'Thiru (Tableau)',
    isCritical: true,
    status: 'Degraded',
    dependentDb: 'denali-edc-oracle-db01',
    linkedService: 'Clinical Trial Management System (CTMS)'
  },
  {
    id: 'ast-2',
    name: 'denali-reltio-mdm-prod',
    type: 'Database Instance',
    client: 'Denali Clinical Operations - Cognizant Project',
    environment: 'Production',
    engine: 'Reltio Connected Data Platform',
    isCritical: true,
    status: 'Healthy',
    hostServer: 'srv-denali-mdm-host01',
    storageUsedGb: 1450,
    linkedService: 'Reltio Master Data Management (MDM)'
  },
  {
    id: 'ast-3',
    name: 'srv-denali-etl-host01.prod',
    type: 'Server / VM',
    client: 'Denali Clinical Operations - Cognizant Project',
    environment: 'Production',
    ip: '10.140.22.88',
    os: 'RHEL 8.8 Enterprise',
    isCritical: true,
    status: 'Healthy',
    cpuUsage: 78,
    memoryUsage: 84,
    linkedService: 'Bharath ETL Batch Pipeline'
  },
  {
    id: 'ast-4',
    name: 'workato-cognizant-clinical-gw',
    type: 'Network Equipment',
    client: 'Denali Clinical Operations - Cognizant Project',
    environment: 'Production',
    ip: '192.168.10.1',
    model: 'Workato Enterprise Gateway',
    isCritical: true,
    status: 'Healthy',
    linkedService: 'Satish Workato Integration Recipes'
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'MS-2045',
    title: 'CTMS Tableau Executive Dashboard Data Sync Latency',
    level: 'Level 1 (Work Item)',
    issueType: 'Incident',
    priority: 'P1 - Critical',
    client: 'Denali Clinical Operations - Cognizant Project',
    impact: 'High',
    urgency: 'High',
    status: 'In Progress',
    assignee: 'Thiru (Tableau Specialist)',
    reporter: 'Narayan (Onsite Lead)',
    created: '2026-09-22T13:00:00Z',
    slaFirstResponseDue: '2026-09-22T13:15:00Z',
    slaResolutionDue: '2026-09-22T15:00:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'Warning',
    assetId: 'ast-1',
    assetName: 'denali-ctms-prod.cognizant.net',
    description: 'Tableau Server extracts failing for Denali Clinical Trial metrics dashboard.',
    subtasks: [
      { id: 'sub-1', title: 'Inspect Tableau Backgrounder log pool', completed: true },
      { id: 'sub-2', title: 'Verify Reltio MDM API connectivity with Partha', completed: true },
      { id: 'sub-3', title: 'Clear Workato webhook cache with Satish', completed: false },
      { id: 'sub-4', title: 'Provide status update to Narayan (Onsite Lead)', completed: false }
    ],
    comments: [
      { id: 'c1', author: 'Narayan (Onsite)', time: '01:05 PM', text: 'P1 outage escalated. Denali leadership requesting live dashboard sync.' },
      { id: 'c2', author: 'Thiru (Tableau)', time: '01:10 PM', text: 'Analyzing Tableau extract refresh logs and data source connections.' }
    ]
  },
  {
    id: 'MS-2044',
    title: 'Reltio MDM Subject Master Data Synchronization Alert',
    level: 'Level 1 (Work Item)',
    issueType: 'Maintenance Task',
    priority: 'P2 - High',
    client: 'Denali Clinical Operations - Cognizant Project',
    impact: 'High',
    urgency: 'Medium',
    status: 'In Progress',
    assignee: 'Partha (Reltio MDM)',
    reporter: 'partha@cognizant.com',
    created: '2026-09-22T10:30:00Z',
    slaFirstResponseDue: '2026-09-22T11:00:00Z',
    slaResolutionDue: '2026-09-22T14:30:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'On Track',
    assetId: 'ast-2',
    assetName: 'denali-reltio-mdm-prod',
    description: 'Patient entity resolution queue bottleneck on Reltio tenant.',
    subtasks: [
      { id: 'sub-5', title: 'Increase Reltio batch match rule threads', completed: true },
      { id: 'sub-6', title: 'Coordinate with Bharath on ETL delta load', completed: false }
    ],
    comments: [
      { id: 'c3', author: 'Partha (Reltio)', time: '11:15 AM', text: 'Match engine tuning under review.' }
    ]
  },
  {
    id: 'MS-2043',
    title: 'ETL Pipeline Nightly Subject Batch Load Optimization',
    level: 'Level 1 (Work Item)',
    issueType: 'Service Request',
    priority: 'P3 - Medium',
    client: 'Denali Clinical Operations - Cognizant Project',
    impact: 'Medium',
    urgency: 'Medium',
    status: 'In Progress',
    assignee: 'Bharath (ETL Developer)',
    reporter: 'bharath@cognizant.com',
    created: '2026-09-22T08:45:00Z',
    slaFirstResponseDue: '2026-09-22T10:45:00Z',
    slaResolutionDue: '2026-09-23T08:45:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'On Track',
    assetId: 'ast-3',
    assetName: 'srv-denali-etl-host01.prod',
    description: 'Optimize PySpark & Informatica ETL workflow for Denali Subject Study ingestion.',
    subtasks: [
      { id: 'sub-7', title: 'Verify source staging schema constraints', completed: true },
      { id: 'sub-8', title: 'Validate output format with Thiru for Tableau reporting', completed: false }
    ],
    comments: []
  },
  {
    id: 'MS-2042',
    title: 'Workato Integration Recipe Rate Limit Optimization',
    level: 'Level 1 (Work Item)',
    issueType: 'Change Request',
    priority: 'P3 - Medium',
    client: 'Denali Clinical Operations - Cognizant Project',
    impact: 'Medium',
    urgency: 'Low',
    status: 'Pending Client',
    assignee: 'Satish (Workato Integration)',
    reporter: 'satish@cognizant.com',
    created: '2026-09-21T14:00:00Z',
    slaFirstResponseDue: '2026-09-21T16:00:00Z',
    slaResolutionDue: '2026-09-24T14:00:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'Paused',
    assetId: 'ast-4',
    assetName: 'workato-cognizant-clinical-gw',
    description: 'Tune Workato HTTP connector retry backoff for Clinical Site API.',
    subtasks: [
      { id: 'sub-9', title: 'Deploy updated Workato recipe package v2.4', completed: true }
    ],
    comments: [
      { id: 'c4', author: 'Satish (Workato)', time: '02:30 PM', text: 'Waiting for Denali API rate limit approval.' }
    ]
  }
];

export const CONTRACT_EPICS = [
  {
    id: 'EPIC-2026-DENALI',
    level: 'Level 3 (Strategic SOW)',
    title: 'Denali Clinical Operations - Cognizant 2026 Managed Services SOW',
    client: 'Denali Clinical Operations - Cognizant Project',
    slaTier: 'Platinum 24/7 (Clinical SLA)',
    status: 'Active',
    budgetHours: 320,
    usedHours: 94,
    renewalDate: '2026-12-31'
  }
];

export const AUTOMATION_RULES_LIST = [
  {
    id: 'rule-1',
    name: 'Denali Clinical - Auto-Calculate Priority (Impact x Urgency)',
    status: 'Active',
    trigger: 'Issue Created / Field Changed (Impact, Urgency)',
    action: 'Set Priority to P1, P2, P3, or P4 based on severity matrix',
    executionCount: 210
  },
  {
    id: 'rule-2',
    name: 'Denali Clinical - Onsite Escalation to Narayan',
    status: 'Active',
    trigger: 'Priority set to P1 - Critical',
    action: 'Alert Onsite Lead Narayan & SMS PagerDuty rotation',
    executionCount: 18
  },
  {
    id: 'rule-3',
    name: 'Denali Clinical - Pause SLA Clock on "Pending Client"',
    status: 'Active',
    trigger: 'Status changed to Pending Client',
    action: 'Pause Time to Resolution SLA timer automatically',
    executionCount: 104
  }
];
