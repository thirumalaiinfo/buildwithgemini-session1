import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Server, 
  TrendingUp, 
  Building, 
  Activity, 
  ArrowUpRight 
} from 'lucide-react';

export default function ExecutiveDashboard({ tickets, clients, assets, onSelectTicket, selectedClient }) {
  // Filter by client if selected
  const filteredTickets = selectedClient === 'All' 
    ? tickets 
    : tickets.filter(t => t.client === selectedClient);

  const filteredAssets = selectedClient === 'All' 
    ? assets 
    : assets.filter(a => a.client === selectedClient);

  const filteredClients = selectedClient === 'All'
    ? clients
    : clients.filter(c => c.name === selectedClient);

  // Metrics
  const openIncidents = filteredTickets.filter(t => t.issueType === 'Incident' && t.status !== 'Closed');
  const p1Outages = filteredTickets.filter(t => t.priority.includes('P1') && t.status !== 'Closed');
  const pendingClient = filteredTickets.filter(t => t.status === 'Pending Client');
  
  // Calculate SLA Compliance %
  const totalSlaTickets = filteredTickets.length;
  const metSla = filteredTickets.filter(t => t.slaFirstResponseStatus === 'Met' && t.slaResolutionStatus !== 'Breached').length;
  const slaPercentage = totalSlaTickets > 0 ? Math.round((metSla / totalSlaTickets) * 100) : 100;

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0' }}>
      {/* Top Banner Context */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        padding: '1.25rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Managed Services Executive Operations SLA Dashboard
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Real-time tracking across <strong>{clients.length} Managed Client Accounts</strong> & <strong>{assets.length} CMDB Assets</strong>.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} className="pulse-glow"></span>
            ITSM Service Engine Active
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
        
        {/* Card 1: P1 Major Outages */}
        <div style={{
          background: p1Outages.length > 0 ? 'rgba(244, 63, 94, 0.08)' : 'var(--bg-card)',
          border: p1Outages.length > 0 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid var(--border-color)',
          borderRadius: '14px',
          padding: '1.25rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active P1 Outages</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: p1Outages.length > 0 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} color={p1Outages.length > 0 ? 'var(--accent-rose)' : 'var(--text-muted)'} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: p1Outages.length > 0 ? 'var(--accent-rose)' : 'var(--text-main)', marginBottom: '0.25rem' }}>
            {p1Outages.length}
          </div>
          <p style={{ fontSize: '0.75rem', color: p1Outages.length > 0 ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
            {p1Outages.length > 0 ? '🚨 Immediate Escalation Triggered' : 'No Critical P1 Outages reported'}
          </p>
        </div>

        {/* Card 2: Open Incidents */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Incidents</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={20} color="var(--accent-amber)" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            {openIncidents.length}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {pendingClient.length} tickets on pause (Pending Client)
          </p>
        </div>

        {/* Card 3: SLA Compliance Rate */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>SLA Compliance Rate</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={20} color="var(--accent-emerald)" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.25rem' }}>
            {slaPercentage}%
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Target: 98.5% SLA Performance Contract
          </p>
        </div>

        {/* Card 4: Managed CMDB Assets */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '14px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Managed Infrastructure</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Server size={20} color="var(--accent-cyan)" />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            {filteredAssets.length}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Servers, DBs, Apps & Firewalls in CMDB
          </p>
        </div>

      </div>

      {/* Main Grid: Client Health Cards + Live Ticket Operations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        
        {/* Left Column: Client Portfolio Health */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building size={18} color="var(--primary)" />
            Client Accounts & SLA Status
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filteredClients.map(client => (
              <div key={client.id} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>{client.name}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                      {client.slaTier}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Contact: {client.contact}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: client.health === 'Healthy' ? 'var(--accent-emerald)' : client.health === 'Warning' ? 'var(--accent-amber)' : 'var(--accent-rose)' }}>
                    {client.health}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {client.activeTickets} Active Tickets
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Priority Incident SLA Dispatch */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--accent-amber)" />
              Active Incident SLA Countdown & Dispatch
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Showing {filteredTickets.length} items
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filteredTickets.map(ticket => {
              const isP1 = ticket.priority.includes('P1');
              const isP2 = ticket.priority.includes('P2');
              const isPending = ticket.status === 'Pending Client';

              return (
                <div 
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  style={{
                    background: isP1 ? 'rgba(244, 63, 94, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                    border: isP1 ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = isP1 ? 'rgba(244, 63, 94, 0.3)' : 'var(--border-color)'}
                >
                  <div style={{ flex: 1, paddingRight: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                        {ticket.id}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: isP1 ? 'rgba(244, 63, 94, 0.2)' : isP2 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                        color: isP1 ? 'var(--accent-rose)' : isP2 ? 'var(--accent-amber)' : 'var(--primary)'
                      }}>
                        {ticket.priority}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Client: <strong>{ticket.client}</strong>
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      {ticket.title}
                    </h4>

                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>CI: <code style={{ color: 'var(--accent-cyan)' }}>{ticket.assetName}</code></span>
                      <span>Assignee: <strong>{ticket.assignee}</strong></span>
                    </div>
                  </div>

                  {/* Right Status Badge */}
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '20px',
                      background: isPending ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: isPending ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                      border: isPending ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      {ticket.status}
                    </span>

                    <span style={{ fontSize: '0.72rem', color: isP1 ? 'var(--accent-rose)' : 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
                      SLA: {isPending ? 'Clock Paused' : ticket.slaResolutionStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
