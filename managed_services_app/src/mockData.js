export const INITIAL_CLIENTS = [
  { id: 'cli-1', name: 'ACME Corp', slaTier: 'Gold 24/7', activeTickets: 4, health: 'Warning', contact: 'sarah.connor@acme.com' },
  { id: 'cli-2', name: 'Globex Logistics', slaTier: 'Silver 8/5', activeTickets: 2, health: 'Healthy', contact: 'homer.s@globex.com' },
  { id: 'cli-3', name: 'Initech Solutions', slaTier: 'Platinum 24/7', activeTickets: 1, health: 'Healthy', contact: 'peter.g@initech.com' },
  { id: 'cli-4', name: 'Umbrella Biotech', slaTier: 'Gold 24/7', activeTickets: 3, health: 'Critical', contact: 'w.birkin@umbrella.com' },
];

export const INITIAL_ASSETS = [
  {
    id: 'ast-1',
    name: 'srv-acme-db01.prod',
    type: 'Server / VM',
    client: 'ACME Corp',
    environment: 'Production',
    ip: '10.240.12.45',
    os: 'Ubuntu 22.04 LTS',
    isCritical: true,
    status: 'Degraded',
    cpuUsage: 94,
    memoryUsage: 88,
    linkedService: 'ACME Payment Gateway'
  },
  {
    id: 'ast-2',
    name: 'acme_prod_postgresql',
    type: 'Database Instance',
    client: 'ACME Corp',
    environment: 'Production',
    engine: 'PostgreSQL 15.3',
    isCritical: true,
    status: 'Healthy',
    hostServer: 'srv-acme-db01.prod',
    storageUsedGb: 450,
    linkedService: 'ACME Payment Gateway'
  },
  {
    id: 'ast-3',
    name: 'ACME Payment Gateway',
    type: 'Application / Service',
    client: 'ACME Corp',
    environment: 'Production',
    owner: 'Sarah Chen',
    isCritical: true,
    status: 'Degraded',
    dependentDb: 'acme_prod_postgresql'
  },
  {
    id: 'ast-4',
    name: 'srv-globex-app01',
    type: 'Server / VM',
    client: 'Globex Logistics',
    environment: 'Production',
    ip: '10.180.4.11',
    os: 'RHEL 9.1',
    isCritical: false,
    status: 'Healthy',
    cpuUsage: 32,
    memoryUsage: 45,
    linkedService: 'Globex Freight Tracking'
  },
  {
    id: 'ast-5',
    name: 'fw-umbrella-main',
    type: 'Network Equipment',
    client: 'Umbrella Biotech',
    environment: 'Production',
    ip: '192.168.1.1',
    model: 'Palo Alto PA-3220',
    isCritical: true,
    status: 'Critical',
    linkedService: 'Secure Lab Access'
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'MS-1042',
    title: 'PostgreSQL Connection Pool Exhaustion on srv-acme-db01',
    level: 'Level 1 (Work Item)',
    issueType: 'Incident',
    priority: 'P1 - Critical',
    client: 'ACME Corp',
    impact: 'High',
    urgency: 'High',
    status: 'In Progress',
    assignee: 'Sarah Chen',
    reporter: 'Monitoring Agent (Datadog)',
    created: '2026-09-22T12:30:00Z',
    slaFirstResponseDue: '2026-09-22T12:45:00Z',
    slaResolutionDue: '2026-09-22T14:30:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'Warning', // Breaching soon
    assetId: 'ast-1',
    assetName: 'srv-acme-db01.prod',
    description: 'High active connections count (>98%) resulting in HTTP 504 Gateway Timeouts on the payment gateway API.',
    subtasks: [
      { id: 'sub-1', title: 'Capture pg_stat_activity query snapshot', completed: true },
      { id: 'sub-2', title: 'Increase Max Connections in pgbouncer.ini', completed: true },
      { id: 'sub-3', title: 'Gracefully restart PgBouncer service', completed: false },
      { id: 'sub-4', title: 'Verify payment API HTTP 200 responses', completed: false }
    ],
    comments: [
      { id: 'c1', author: 'Sarah Chen', time: '12:35 PM', text: 'Triaged incident as P1. High impact on ACME checkout API.' },
      { id: 'c2', author: 'System Automation', time: '12:36 PM', text: '🚨 P1 Alert triggered. On-call lead Sarah Chen notified via PagerDuty.' }
    ]
  },
  {
    id: 'MS-1041',
    title: 'Provision 3 New IAM Developers for Initech AWS Sandbox',
    level: 'Level 1 (Work Item)',
    issueType: 'Service Request',
    priority: 'P3 - Medium',
    client: 'Initech Solutions',
    impact: 'Medium',
    urgency: 'Medium',
    status: 'Pending Client',
    assignee: 'Alex Rivera',
    reporter: 'peter.g@initech.com',
    created: '2026-09-22T09:15:00Z',
    slaFirstResponseDue: '2026-09-22T11:15:00Z',
    slaResolutionDue: '2026-09-23T09:15:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'Paused',
    assetId: 'ast-4',
    assetName: 'srv-globex-app01',
    description: 'Requesting access keys and Developer IAM Role for new engineering hires (Milton, Michael, Samir).',
    subtasks: [
      { id: 'sub-5', title: 'Verify approval from Department Lead', completed: true },
      { id: 'sub-6', title: 'Generate temporary MFA tokens', completed: false }
    ],
    comments: [
      { id: 'c3', author: 'Alex Rivera', time: '10:00 AM', text: 'Waiting for Peter to confirm security group requirements. SLA paused.' }
    ]
  },
  {
    id: 'MS-1040',
    title: 'Palo Alto Firewall HA Failover Degradation',
    level: 'Level 1 (Work Item)',
    issueType: 'Incident',
    priority: 'P2 - High',
    client: 'Umbrella Biotech',
    impact: 'High',
    urgency: 'Medium',
    status: 'In Progress',
    assignee: 'Marcus Vance',
    reporter: 'w.birkin@umbrella.com',
    created: '2026-09-22T11:00:00Z',
    slaFirstResponseDue: '2026-09-22T11:30:00Z',
    slaResolutionDue: '2026-09-22T15:00:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'On Track',
    assetId: 'ast-5',
    assetName: 'fw-umbrella-main',
    description: 'Secondary firewall node unexpectedly dropped out of High Availability cluster during sync.',
    subtasks: [
      { id: 'sub-7', title: 'Inspect PAN-OS system logs for heartbeat loss', completed: true },
      { id: 'sub-8', title: 'Re-establish peer link interface HA2', completed: false }
    ],
    comments: [
      { id: 'c4', author: 'Marcus Vance', time: '11:20 AM', text: 'Investigating interface flap on fiber link port 4.' }
    ]
  },
  {
    id: 'MS-1039',
    title: 'Monthly OS Security Patching & Kernel Updates - Q3 Cycle',
    level: 'Level 2 (Container / Epic)',
    issueType: 'Maintenance Task',
    priority: 'P3 - Medium',
    client: 'Globex Logistics',
    impact: 'Low',
    urgency: 'Low',
    status: 'In Progress',
    assignee: 'Jordan Taylor',
    reporter: 'Service Delivery Manager',
    created: '2026-09-20T08:00:00Z',
    slaFirstResponseDue: '2026-09-20T12:00:00Z',
    slaResolutionDue: '2026-09-25T18:00:00Z',
    slaFirstResponseStatus: 'Met',
    slaResolutionStatus: 'On Track',
    assetId: 'ast-4',
    assetName: 'srv-globex-app01',
    description: 'Standard maintenance window for updating Linux kernel patches across 12 target servers.',
    subtasks: [
      { id: 'sub-9', title: 'Schedule maintenance window with client', completed: true },
      { id: 'sub-10', title: 'Pre-patch VM snapshot creation', completed: true },
      { id: 'sub-11', title: 'Execute dnf upgrade -y --security', completed: false }
    ],
    comments: []
  }
];

export const CONTRACT_EPICS = [
  {
    id: 'EPIC-101',
    level: 'Level 3 (Strategic Contract)',
    title: 'ACME Corp 2026 24/7 Managed Cloud Infrastructure SOW',
    client: 'ACME Corp',
    slaTier: 'Gold 24/7',
    status: 'Active',
    budgetHours: 120,
    usedHours: 42,
    renewalDate: '2026-12-31'
  },
  {
    id: 'EPIC-102',
    level: 'Level 2 (Scope Container)',
    title: 'Q3 Security & Patch Compliance Upgrade Cycle',
    client: 'Globex Logistics',
    slaTier: 'Silver 8/5',
    status: 'In Progress',
    budgetHours: 40,
    usedHours: 18,
    renewalDate: '2026-10-15'
  }
];

export const AUTOMATION_RULES_LIST = [
  {
    id: 'rule-1',
    name: 'MS - Auto-Calculate Priority (Impact x Urgency Matrix)',
    status: 'Active',
    trigger: 'Issue Created / Field Changed (Impact, Urgency)',
    action: 'Set Priority to P1, P2, P3, or P4 based on severity matrix',
    executionCount: 142
  },
  {
    id: 'rule-2',
    name: 'MS - Pause SLA Clock on "Pending Client"',
    status: 'Active',
    trigger: 'Status changed to Pending Client',
    action: 'Pause Time to Resolution SLA timer automatically',
    executionCount: 89
  },
  {
    id: 'rule-3',
    name: 'MS - Reopen Ticket on Customer Response',
    status: 'Active',
    trigger: 'Customer adds public comment',
    action: 'Transition status to In Progress & resume SLA clock',
    executionCount: 76
  },
  {
    id: 'rule-4',
    name: 'MS - P1 Outage Slack & Escalation Alert',
    status: 'Active',
    trigger: 'Priority set to P1 - Critical',
    action: 'Post Slack alert to #ops-escalations & notify On-Call lead',
    executionCount: 12
  }
];
