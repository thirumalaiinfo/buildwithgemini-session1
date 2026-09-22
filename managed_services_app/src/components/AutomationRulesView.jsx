import React, { useState } from 'react';
import { 
  Zap, 
  Code, 
  Copy, 
  Check, 
  Play, 
  Sliders, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { AUTOMATION_RULES_LIST } from '../mockData';

export default function AutomationRulesView() {
  const [copiedJql, setCopiedJql] = useState('');
  
  // Priority Simulator State
  const [impact, setImpact] = useState('High');
  const [urgency, setUrgency] = useState('High');

  // Calculate priority live
  const calculatePriority = () => {
    if (impact === 'High' && urgency === 'High') return 'P1 - Critical (SLA: 15m Response, 2h Resolution)';
    if ((impact === 'High' && urgency === 'Medium') || (impact === 'Medium' && urgency === 'High')) return 'P2 - High (SLA: 30m Response, 4h Resolution)';
    if (impact === 'Medium' && urgency === 'Medium') return 'P3 - Medium (SLA: 2h Response, 24h Resolution)';
    return 'P4 - Low (SLA: 4h Response, 48h Resolution)';
  };

  const currentPriority = calculatePriority();

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedJql(key);
    setTimeout(() => setCopiedJql(''), 2000);
  };

  const PRESET_JQLS = [
    {
      name: 'Monthly Client SLA Breach Audit',
      query: 'project = "MS" AND Organizations = "ACME Corp" AND created >= startOfMonth() AND ("Time to first response" = breached() OR "Time to resolution" = breached())'
    },
    {
      name: 'P1 Outage Incident Tracking',
      query: 'project = "MS" AND issuetype = "Incident" AND priority IN ("P1 - Critical", "P2 - High") AND statusCategory != Done ORDER BY priority ASC'
    },
    {
      name: 'CMDB Asset Unassigned Tickets',
      query: 'project = "MS" AND "Affected Asset" IS NOT EMPTY AND assignee IS EMPTY ORDER BY created ASC'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Zap color="var(--accent-amber)" size={24} />
          Jira Automation Engine & Enterprise JQL Generator
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Pre-built triggers for SLA clock control, P1 auto-escalations, and custom client queries.
        </p>
      </div>

      {/* Grid: Priority Simulator + JQL Generator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Interactive Priority Matrix Simulator */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} color="var(--primary)" />
            Interactive Jira Priority Calculation Simulator
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Test how Jira Automation automatically sets issue priority ($P1$ to $P4$) based on user selections:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Select Impact:</label>
              <select
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }}
              >
                <option value="High">High (Entire System / Multi-Client)</option>
                <option value="Medium">Medium (Department / Workaround Exists)</option>
                <option value="Low">Low (Single User / Cosmetic)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Select Urgency:</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }}
              >
                <option value="High">High (Immediate Revenue Blocked)</option>
                <option value="Medium">Medium (Normal Operations Affected)</option>
                <option value="Low">Low (Low Urgency / Future Request)</option>
              </select>
            </div>
          </div>

          {/* Result Banner */}
          <div style={{
            padding: '1rem',
            borderRadius: '12px',
            background: currentPriority.includes('P1') ? 'rgba(244, 63, 94, 0.15)' : currentPriority.includes('P2') ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.15)',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Calculated Jira Priority Output:
            </span>
            <strong style={{ fontSize: '0.95rem', color: currentPriority.includes('P1') ? 'var(--accent-rose)' : currentPriority.includes('P2') ? 'var(--accent-amber)' : 'var(--primary)' }}>
              {currentPriority}
            </strong>
          </div>
        </div>

        {/* Copyable Enterprise JQL Queries */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code size={18} color="var(--accent-cyan)" />
            Preset Jira JQL Queries for Client Reports
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Copy and paste directly into Jira Advanced Issue Search:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {PRESET_JQLS.map((item, idx) => (
              <div key={idx} style={{ background: 'var(--bg-input)', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.name}</span>
                  <button
                    onClick={() => handleCopy(item.query, `jql-${idx}`)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.75rem' }}
                  >
                    {copiedJql === `jql-${idx}` ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                    {copiedJql === `jql-${idx}` ? 'Copied!' : 'Copy JQL'}
                  </button>
                </div>
                <code style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>
                  {item.query}
                </code>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Active Rules List */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.25rem'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
          Configured Managed Services Automation Rules ({AUTOMATION_RULES_LIST.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {AUTOMATION_RULES_LIST.map(rule => (
            <div key={rule.id} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{rule.name}</span>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', padding: '0.1rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                    {rule.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Trigger: <strong>{rule.trigger}</strong> $\rightarrow$ Action: <strong>{rule.action}</strong>
                </p>
              </div>

              <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Executed <strong>{rule.executionCount}</strong> times</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
