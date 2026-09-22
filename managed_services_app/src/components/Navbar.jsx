import React from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Ticket, 
  Database, 
  Zap, 
  Globe, 
  Plus, 
  Building2 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, selectedClient, setSelectedClient, clients, onOpenCreateModal }) {
  return (
    <header style={{
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 1.5rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glow-indigo)'
          }}>
            <ShieldCheck size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, background: 'linear-gradient(90deg, #fff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              NovaSmart MS Hub
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Jira & CMDB Ops Tracker
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {[
            { id: 'dashboard', label: 'Executive SLA', icon: LayoutDashboard },
            { id: 'tickets', label: 'Jira Work Items', icon: Ticket },
            { id: 'cmdb', label: 'Assets CMDB', icon: Database },
            { id: 'automation', label: 'Jira Rules & JQL', icon: Zap },
            { id: 'portal', label: 'Customer Portal', icon: Globe }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Client Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-input)', padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Building2 size={16} color="var(--accent-cyan)" />
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: 500,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All" style={{ background: '#0f172a' }}>All Clients (Portfolio)</option>
              {clients.map(cli => (
                <option key={cli.id} value={cli.name} style={{ background: '#0f172a' }}>
                  {cli.name} ({cli.slaTier})
                </option>
              ))}
            </select>
          </div>

          {/* New Ticket Button */}
          <button
            onClick={onOpenCreateModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--accent-cyan)',
              color: '#090d16',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Plus size={18} />
            Log Ticket
          </button>
        </div>
      </div>
    </header>
  );
}
