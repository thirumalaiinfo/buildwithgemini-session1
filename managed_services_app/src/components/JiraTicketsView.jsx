import React, { useState } from 'react';
import { 
  Ticket, 
  Search, 
  Filter, 
  CheckSquare, 
  Clock, 
  User, 
  Layers, 
  ChevronRight, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Server 
} from 'lucide-react';

export default function JiraTicketsView({ tickets, setTickets, selectedClient, onSelectTicket, onOpenCreateModal }) {
  const [levelFilter, setLevelFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering logic
  const filtered = tickets.filter(ticket => {
    const matchesClient = selectedClient === 'All' || ticket.client === selectedClient;
    const matchesLevel = levelFilter === 'All' || ticket.level.includes(levelFilter);
    const matchesType = typeFilter === 'All' || ticket.issueType === typeFilter;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClient && matchesLevel && matchesType && matchesSearch;
  });

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0' }}>
      
      {/* Header & Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Ticket color="var(--primary)" size={24} />
            Jira Managed Services Work Items & Hierarchy
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Multi-level hierarchy (Levels 0–3) for ITIL Incident, Problem, Change & Service Requests.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--glow-indigo)'
          }}
        >
          <Plus size={18} />
          Create Managed Ticket
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '14px',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Search Input */}
        <div style={{
          flex: 1,
          minWidth: '240px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          padding: '0.45rem 0.85rem',
          borderRadius: '8px'
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search ticket summary, ID, or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              width: '100%',
              outline: 'none'
            }}
          />
        </div>

        {/* Jira Level Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Layers size={16} color="var(--accent-purple)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Level:</span>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="All">All Hierarchy Levels</option>
            <option value="Level 3">Level 3 (Contract / Strategic)</option>
            <option value="Level 2">Level 2 (Epic / Scope Container)</option>
            <option value="Level 1">Level 1 (Standard Work Item)</option>
          </select>
        </div>

        {/* Issue Type Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Filter size={16} color="var(--accent-cyan)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Issue Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              background: 'var(--bg-input)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          >
            <option value="All">All Issue Types</option>
            <option value="Incident">Incident</option>
            <option value="Service Request">Service Request</option>
            <option value="Problem">Problem</option>
            <option value="Change Request">Change Request</option>
            <option value="Maintenance Task">Maintenance Task</option>
          </select>
        </div>
      </div>

      {/* Tickets List View */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            background: 'var(--bg-card)',
            borderRadius: '14px',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)'
          }}>
            <p style={{ fontSize: '0.95rem' }}>No tickets match your filter criteria.</p>
          </div>
        ) : (
          filtered.map(ticket => {
            const isP1 = ticket.priority.includes('P1');
            const isP2 = ticket.priority.includes('P2');
            const completedSubtasks = ticket.subtasks ? ticket.subtasks.filter(s => s.completed).length : 0;
            const totalSubtasks = ticket.subtasks ? ticket.subtasks.length : 0;

            return (
              <div
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                style={{
                  background: 'var(--bg-card)',
                  border: isP1 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid var(--border-color)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, border-color 0.15s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isP1 ? 'rgba(244, 63, 94, 0.4)' : 'var(--border-color)';
                }}
              >
                {/* Left Ticket Info */}
                <div style={{ flex: 1 }}>
                  {/* Badges Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      {ticket.id}
                    </span>

                    <span style={{
                      fontSize: '0.72rem',
                      background: 'rgba(168, 85, 247, 0.15)',
                      color: 'var(--accent-purple)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {ticket.level}
                    </span>

                    <span style={{
                      fontSize: '0.72rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--text-main)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {ticket.issueType}
                    </span>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: isP1 ? 'rgba(244, 63, 94, 0.2)' : isP2 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                      color: isP1 ? 'var(--accent-rose)' : isP2 ? 'var(--accent-amber)' : 'var(--primary)'
                    }}>
                      {ticket.priority}
                    </span>

                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Client: <strong style={{ color: 'var(--text-main)' }}>{ticket.client}</strong>
                    </span>
                  </div>

                  {/* Summary Title */}
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    {ticket.title}
                  </h3>

                  {/* Meta Bar */}
                  <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    {ticket.assetName && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Server size={14} color="var(--accent-cyan)" />
                        Asset: <code style={{ color: 'var(--accent-cyan)' }}>{ticket.assetName}</code>
                      </span>
                    )}

                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <User size={14} />
                      Assignee: <strong style={{ color: 'var(--text-main)' }}>{ticket.assignee}</strong>
                    </span>

                    {totalSubtasks > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: completedSubtasks === totalSubtasks ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                        <CheckSquare size={14} />
                        Level 0 Tasks: {completedSubtasks}/{totalSubtasks}
                      </span>
                    )}

                    {ticket.comments && ticket.comments.length > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <MessageSquare size={14} />
                        {ticket.comments.length} Comments
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action & SLA Status */}
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', minWidth: '160px' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '20px',
                    background: ticket.status === 'Pending Client' ? 'rgba(245, 158, 11, 0.15)' : ticket.status === 'Resolved' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                    color: ticket.status === 'Pending Client' ? 'var(--accent-amber)' : ticket.status === 'Resolved' ? 'var(--accent-emerald)' : 'var(--primary)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {ticket.status}
                  </span>

                  <div style={{ fontSize: '0.75rem', color: isP1 ? 'var(--accent-rose)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} />
                    SLA: <strong>{ticket.status === 'Pending Client' ? 'Paused (Client)' : ticket.slaResolutionStatus}</strong>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem', fontWeight: 600 }}>
                    Manage Work Item <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
