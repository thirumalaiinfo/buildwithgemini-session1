import React, { useState } from 'react';
import { X, Plus, ShieldCheck } from 'lucide-react';

export default function CreateTicketModal({ clients, assets, onClose, onCreate }) {
  const [client, setClient] = useState(clients[0]?.name || 'ACME Corp');
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('Level 1 (Work Item)');
  const [issueType, setIssueType] = useState('Incident');
  const [impact, setImpact] = useState('High');
  const [urgency, setUrgency] = useState('High');
  const [assetId, setAssetId] = useState('');
  const [assignee, setAssignee] = useState('Sarah Chen');
  const [description, setDescription] = useState('');

  // Filter assets for selected client
  const clientAssets = assets.filter(a => a.client === client);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Auto calculate priority
    let priority = 'P3 - Medium';
    if (impact === 'High' && urgency === 'High') priority = 'P1 - Critical';
    else if ((impact === 'High' && urgency === 'Medium') || (impact === 'Medium' && urgency === 'High')) priority = 'P2 - High';
    else if (impact === 'Low' && urgency === 'Low') priority = 'P4 - Low';

    const selectedAssetObj = assets.find(a => a.id === assetId);

    const newTicket = {
      id: `MS-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      level,
      issueType,
      priority,
      client,
      impact,
      urgency,
      status: 'In Progress',
      assignee,
      reporter: 'Internal Engineer',
      created: new Date().toISOString(),
      slaFirstResponseDue: new Date(Date.now() + 15 * 60000).toISOString(),
      slaResolutionDue: new Date(Date.now() + 2 * 3600000).toISOString(),
      slaFirstResponseStatus: 'Met',
      slaResolutionStatus: 'On Track',
      assetId: assetId || null,
      assetName: selectedAssetObj ? selectedAssetObj.name : 'N/A',
      description,
      subtasks: [
        { id: `st-${Date.now()}-1`, title: 'Verify client SLA & initial triage', completed: false },
        { id: `st-${Date.now()}-2`, title: 'Perform root cause analysis on asset', completed: false }
      ],
      comments: [
        { id: `cm-${Date.now()}`, author: assignee, time: 'Just now', text: 'Ticket initialized and assigned.' }
      ]
    };

    onCreate(newTicket);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#0f172a',
        border: '1px solid var(--border-color)',
        borderRadius: '20px',
        maxWidth: '650px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.75rem',
        boxShadow: 'var(--glass-shadow)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck color="var(--accent-cyan)" size={22} />
          Log New Managed Services Work Item
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Client Account</label>
              <select
                value={client}
                onChange={(e) => {
                  setClient(e.target.value);
                  setAssetId('');
                }}
                style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              >
                {clients.map(c => <option key={c.id} value={c.name}>{c.name} ({c.slaTier})</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Hierarchy Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="Level 1 (Work Item)">Level 1 (Work Item)</option>
                <option value="Level 2 (Container / Epic)">Level 2 (Epic Container)</option>
                <option value="Level 3 (Strategic SOW)">Level 3 (Strategic Contract)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Ticket Title / Summary</label>
            <input
              type="text"
              required
              placeholder="e.g. Memory leak on API gateway server"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="Incident">Incident</option>
                <option value="Service Request">Service Request</option>
                <option value="Problem">Problem</option>
                <option value="Change Request">Change Request</option>
                <option value="Maintenance Task">Maintenance Task</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="Sarah Chen">Sarah Chen (Ops Lead)</option>
                <option value="Marcus Vance">Marcus Vance (Cloud Arch)</option>
                <option value="Alex Rivera">Alex Rivera (L1 Support)</option>
                <option value="Jordan Taylor">Jordan Taylor (DBA)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Impact</label>
              <select
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Linked Asset (CMDB)</label>
            <select
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
            >
              <option value="">-- Unlinked / General --</option>
              {clientAssets.map(a => (
                <option key={a.id} value={a.id}>{a.name} ({a.type})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Description & Logs</label>
            <textarea
              rows={3}
              required
              placeholder="Provide context or reproduction steps..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '0.55rem 1.2rem', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: '0.55rem 1.2rem', borderRadius: '8px', background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', boxShadow: 'var(--glow-indigo)' }}
            >
              Create Ticket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
