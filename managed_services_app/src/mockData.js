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
  { id: 'tm-1', name: 'Rajesh Kumar', role: 'Onsite Delivery Lead & Escalation Mgr', type: 'Onsite', location: 'Boston, USA (Onsite)', avatar: 'RK' },
  { id: 'tm-2', name: 'Priya Sharma', role: 'Offshore L2 Infrastructure Lead', type: 'Offshore', location: 'Chennai, India (Offshore)', avatar: 'PS' },
  { id: 'tm-3', name: 'Arun Patel', role: 'Offshore Senior Database Administrator', type: 'Offshore', location: 'Hyderabad, India (Offshore)', avatar: 'AP' },
  { id: 'tm-4', name: 'Deepika Nair', role: 'Offshore L1 Clinical Support Analyst', type: 'Offshore', location: 'Bengaluru, India (Offshore)', avatar: 'DN' },
  { id: 'tm-5', name: 'Siddharth Rao', role: 'Offshore Cloud & DevOps Specialist', type: 'Offshore', location: 'Pune, India (Offshore)', avatar: 'SR' }
];

export const INITIAL_ASSETS = [
  {
    id: 'ast-1',
    name: 'denali-ctms-prod.cognizant.net',
    type: 'Application / Service',
    client: 'Denali Clinical Operations - Cognizant Project',
    environment: 'Production',
    owner: 'Priya Sharma (Offshore)',
    isCritical: true,
    status: 'Degraded',
    dependentDb: 'denali-edc-oracle-db01',
    linkedService: 'Clinical Trial Management System (CTMS)'
  },
  {
    id: 'ast-2',
    name: 'denali-edc-oracle-db01',
    type: 'Database Instance',
    client: 'Denali Clinical Operations - Cognizant Project',
    environment: 'Production',
    engine: 'Oracle Enterprise 19c',
    isCritical: true,
    status: 'Healthy',
    hostServer: 'srv-denali-db-host01',
    storageUsedGb: 1280,
    linkedService: 'Electronic Data Capture (EDC)'
  },
  {
    id: 'ast-3',
    name: 'srv-denali-db-host01.prod',
    type: 'Server / VM',
    client: 'Denali Clinical Operations - Cognizant Project',
    environment: 'Production',
    ip: '10.140.22.88',
    os: 'RHEL 8.8 Enterprise',
    isCritical: true,
    status: 'Healthy',
    cpuUsage: 78,
    memoryUsage: 84,
    linkedService: 'EDC Oracle DB Host'
  },
  {
    id: 'ast-4',
    name: 'fw-cognizant-clinical-gw',
    type: 'Network Equipment',
    client: 'Denali Clinical Operations - Cognizant Project',
    environment: 'Production',
    ip: '192.168.10.1',
    model: 'Cisco Firepower 4115',
    isCritical: true,
    status: 'Healthy',
    linkedService: 'Cognizant Secure HIPAA Gateway'
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'MS-2045',
    title: 'CTMS Patient Enrollment API Latency & 504 Gateway Timeouts',
    level: 'Level 1 (Work Item)',
    issueType: 'Incident',
    priority: 'P1 - Critical',
    client: 'Denali Clinical Operations - Cognizant Project',
    impact: 'High',
    urgency: 'High',
    status: 'In Progress',
    assignee: 'Priya Sharma (Offshore)',
    reporter: 'Onsite Monitoring Agent (AppDynamics)',
    created: '2026-09-22T13:00:00Z',
    slaFirstResponseDue: '2026-09-22T13:15:00Z',
    slaResolutionDue: '2026-09-22T15:00:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'Warning',
    assetId: 'ast-1',
    assetName: 'denali-ctms-prod.cognizant.net',
    description: 'High response times (>4.2s) reported by Denali clinical trial coordinators during phase-III subject data synchronization.',
    subtasks: [
      { id: 'sub-1', title: 'Capture WebLogic thread pool dump', completed: true },
      { id: 'sub-2', title: 'Verify Oracle DB session locks with Arun Patel', completed: true },
      { id: 'sub-3', title: 'Flush cache on Cognizant Secure Gateway', completed: false },
      { id: 'sub-4', title: 'Notify Rajesh Kumar (Onsite Lead) for client sync', completed: false }
    ],
    comments: [
      { id: 'c1', author: 'Rajesh Kumar (Onsite)', time: '01:05 PM', text: 'Spoke with Denali IT Director. P1 outage escalated for immediate resolution.' },
      { id: 'c2', author: 'Priya Sharma (Offshore)', time: '01:10 PM', text: 'Analyzing thread dumps from CTMS Cluster Node 02.' }
    ]
  },
  {
    id: 'MS-2044',
    title: 'Oracle EDC Database Tablespace Auto-Extend Warning (>92%)',
    level: 'Level 1 (Work Item)',
    issueType: 'Maintenance Task',
    priority: 'P2 - High',
    client: 'Denali Clinical Operations - Cognizant Project',
    impact: 'High',
    urgency: 'Medium',
    status: 'In Progress',
    assignee: 'Arun Patel (Offshore)',
    reporter: 'arun.p@cognizant.com',
    created: '2026-09-22T10:30:00Z',
    slaFirstResponseDue: '2026-09-22T11:00:00Z',
    slaResolutionDue: '2026-09-22T14:30:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'On Track',
    assetId: 'ast-2',
    assetName: 'denali-edc-oracle-db01',
    description: 'Tablespace TS_CLINICAL_DATA01 reached 92% threshold. Allocation needed before batch data ingest.',
    subtasks: [
      { id: 'sub-5', title: 'Add 200GB datafile to ASM diskgroup +DATA', completed: true },
      { id: 'sub-6', title: 'Run RMAN backup verification', completed: false }
    ],
    comments: [
      { id: 'c3', author: 'Arun Patel (Offshore)', time: '11:15 AM', text: 'Storage extension scheduled during low-traffic window.' }
    ]
  },
  {
    id: 'MS-2043',
    title: 'Provision Access for 5 New Clinical Research Associates (CRAs)',
    level: 'Level 1 (Work Item)',
    issueType: 'Service Request',
    priority: 'P3 - Medium',
    client: 'Denali Clinical Operations - Cognizant Project',
    impact: 'Medium',
    urgency: 'Medium',
    status: 'Pending Client',
    assignee: 'Deepika Nair (Offshore)',
    reporter: 'denali_cra_lead@denalibio.com',
    created: '2026-09-22T08:45:00Z',
    slaFirstResponseDue: '2026-09-22T10:45:00Z',
    slaResolutionDue: '2026-09-23T08:45:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'Paused',
    assetId: 'ast-1',
    assetName: 'denali-ctms-prod.cognizant.net',
    description: 'Grant role-based access for study protocol DN-402 in CTMS portal.',
    subtasks: [
      { id: 'sub-7', title: 'Verify HIPAA training compliance certificates', completed: true },
      { id: 'sub-8', title: 'Obtain approval signature from Rajesh Kumar', completed: false }
    ],
    comments: [
      { id: 'c4', author: 'Deepika Nair (Offshore)', time: '09:30 AM', text: 'Awaiting training certificate verification from Denali HR.' }
    ]
  },
  {
    id: 'MS-2042',
    title: 'Automate Daily FDA 21 CFR Part 11 Audit Log Backups',
    level: 'Level 1 (Work Item)',
    issueType: 'Change Request',
    priority: 'P3 - Medium',
    client: 'Denali Clinical Operations - Cognizant Project',
    impact: 'Medium',
    urgency: 'Low',
    status: 'In Progress',
    assignee: 'Siddharth Rao (Offshore)',
    reporter: 'siddharth.r@cognizant.com',
    created: '2026-09-21T14:00:00Z',
    slaFirstResponseDue: '2026-09-21T16:00:00Z',
    slaResolutionDue: '2026-09-24T14:00:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'On Track',
    assetId: 'ast-4',
    assetName: 'fw-cognizant-clinical-gw',
    description: 'Implement automated S3 Glacier vault sync script for audit compliance logs.',
    subtasks: [
      { id: 'sub-9', title: 'Deploy Terraform IAM role for S3 vault', completed: true },
      { id: 'sub-10', title: 'Test script execution in Staging', completed: true }
    ],
    comments: []
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
    name: 'Denali Clinical - Onsite Escalation for P1 Incidents',
    status: 'Active',
    trigger: 'Priority set to P1 - Critical',
    action: 'Alert Onsite Lead Rajesh Kumar & SMS PagerDuty rotation',
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
