import React, { useState } from 'react';
import { 
  Globe, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  AlertOctagon, 
  Key, 
  Wrench, 
  Server 
} from 'lucide-react';

export default function CustomerPortalView({ clients, assets, onAddTicket }) {
  const [selectedOrg, setSelectedOrg] = useState(clients[0]?.name || 'ACME Corp');
  const [requestType, setRequestType] = useState('Report a System Outage');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [impact, setImpact] = useState('High');
  const [urgency, setUrgency] = useState('High');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Filter assets by selected org
  const orgAssets = assets.filter(a => a.client === selectedOrg);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Auto calculate priority
    let priority = 'P3 - Medium';
    if (impact === 'High' && urgency === 'High') priority = 'P1 - Critical';
    else if (impact === 'High' || urgency === 'High') priority = 'P2 - High';
    else if (impact === 'Low' && urgency === 'Low') priority = 'P4 - Low';

    const assetObj = assets.find(a => a.id === selectedAsset);

    const newTicket = {
      id: `MS-${Math.floor(1000 + Math.random() * 9000)}`,
      title: summary,
      level: 'Level 1 (Work Item)',
      issueType: requestType.includes('Outage') ? 'Incident' : 'Service Request',
      priority,
      client: selectedOrg,
      impact,
      urgency,
      status: 'In Progress',
      assignee: 'Unassigned (Service Desk Queue)',
      reporter: `portal_user@${selectedOrg.toLowerCase().replace(/\s+/g, '')}.com`,
      created: new Date().toISOString(),
      slaFirstResponseDue: new Date(Date.now() + 30 * 60000).toISOString(),
      slaResolutionDue: new Date(Date.now() + 4 * 3600000).toISOString(),
      slaFirstResponseStatus: 'On Track',
      slaResolutionStatus: 'On Track',
      assetId: selectedAsset || null,
      assetName: assetObj ? assetObj.name : 'N/A',
      description,
      subtasks: [
        { id: `st-${Date.now()}`, title: 'Triage ticket & verify client SLA tier', completed: false }
      ],
      comments: [
        { id: `cm-${Date.now()}`, author: 'Portal Engine', time: 'Just now', text: `Submitted via Customer Portal for ${selectedOrg}.` }
      ]
    };

    onAddTicket(newTicket);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSummary('');
      setDescription('');
    }, 4000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Portal Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
        borderRadius: '20px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-cyan)', color: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
          <Globe size={28} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Managed Services Customer Self-Service Portal
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Simulates the client-facing ticket portal where requests are auto-filtered by organization & CMDB assets.
        </p>
      </div>

      {submitted ? (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Ticket Logged Successfully!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Your request has been routed to the Managed Services queue. SLA response timer has started.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          
          {/* Org Selector */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
              Your Organization / Account:
            </label>
            <select
              value={selectedOrg}
              onChange={(e) => {
                setSelectedOrg(e.target.value);
                setSelectedAsset('');
              }}
              style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}
            >
              {clients.map(c => (
                <option key={c.id} value={c.name}>{c.name} ({c.slaTier})</option>
              ))}
            </select>
          </div>

          {/* Request Type Group */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
              What do you need help with?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { id: 'Report a System Outage', label: 'Report System Outage / Bug', icon: AlertOctagon },
                { id: 'Request IAM & Access', label: 'Request User Access / IAM', icon: Key },
                { id: 'Infrastructure Change', label: 'Request Server / DB Change', icon: Wrench },
                { id: 'General Query', label: 'General Technical Inquiry', icon: HelpCircle }
              ].map(item => {
                const Icon = item.icon;
                const isSelected = requestType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRequestType(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-color)',
                      background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-input)',
                      color: isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Asset Selector based on Client Org */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
              Select Affected Asset from CMDB (Filtered for {selectedOrg}):
            </label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}
            >
              <option value="">-- None / General Request --</option>
              {orgAssets.map(a => (
                <option key={a.id} value={a.id}>{a.name} ({a.type})</option>
              ))}
            </select>
          </div>

          {/* Summary */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
              Summary of Issue:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. High latency on database connection pool"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}
            />
          </div>

          {/* Impact & Urgency */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                Business Impact:
              </label>
              <select
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="High">High (Entire company affected)</option>
                <option value="Medium">Medium (Department affected)</option>
                <option value="Low">Low (Single user)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                Urgency:
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="High">High (Production Down)</option>
                <option value="Medium">Medium (Workaround available)</option>
                <option value="Low">Low (Normal request)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
              Detailed Description & Steps to Reproduce:
            </label>
            <textarea
              rows={4}
              required
              placeholder="Provide error codes, server IPs, or logs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', fontFamily: 'inherit' }}
            />
          </div>

          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--accent-cyan)',
              color: '#090d16',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            <Send size={18} />
            Submit Portal Ticket
          </button>
        </form>
      )}

    </div>
  );
}
