import React, { useState } from 'react';
import { 
  X, 
  CheckSquare, 
  Square, 
  Clock, 
  MessageSquare, 
  Send, 
  User, 
  Building, 
  Server, 
  Layers, 
  ShieldAlert 
} from 'lucide-react';

export default function TicketDetailModal({ ticket, onClose, onUpdateTicket }) {
  const [newComment, setNewComment] = useState('');
  const [subtasks, setSubtasks] = useState(ticket.subtasks || []);

  const toggleSubtask = (index) => {
    const updated = [...subtasks];
    updated[index].completed = !updated[index].completed;
    setSubtasks(updated);

    onUpdateTicket({
      ...ticket,
      subtasks: updated
    });
  };

  const handleStatusChange = (newStatus) => {
    let slaStatus = ticket.slaResolutionStatus;
    if (newStatus === 'Pending Client') slaStatus = 'Paused (Client)';
    else if (newStatus === 'In Progress') slaStatus = 'On Track';
    else if (newStatus === 'Resolved') slaStatus = 'Met';

    onUpdateTicket({
      ...ticket,
      status: newStatus,
      slaResolutionStatus: slaStatus
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: `c-${Date.now()}`,
      author: 'L2 Ops Engineer (You)',
      time: 'Just now',
      text: newComment
    };

    const updatedComments = [...(ticket.comments || []), commentObj];

    onUpdateTicket({
      ...ticket,
      comments: updatedComments
    });

    setNewComment('');
  };

  const isP1 = ticket.priority.includes('P1');

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
        border: isP1 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid var(--border-color)',
        borderRadius: '20px',
        maxWidth: '850px',
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

        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 800 }}>
            {ticket.id}
          </span>

          <span style={{ fontSize: '0.75rem', background: 'rgba(168, 85, 247, 0.2)', color: 'var(--accent-purple)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
            {ticket.level}
          </span>

          <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.08)', color: 'var(--text-main)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
            {ticket.issueType}
          </span>

          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', backgroundColor: isP1 ? 'rgba(244, 63, 94, 0.25)' : 'rgba(99, 102, 241, 0.2)', color: isP1 ? 'var(--accent-rose)' : 'var(--primary)' }}>
            {ticket.priority}
          </span>
        </div>

        {/* Ticket Title */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
          {ticket.title}
        </h2>

        {/* Status Transition Control Bar */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Current Status:</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>{ticket.status}</strong>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Transition to:</span>
            {['In Progress', 'Pending Client', 'Resolved', 'Closed'].map(st => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: ticket.status === st ? 'var(--accent-cyan)' : 'var(--border-color)',
                  background: ticket.status === st ? 'var(--accent-cyan)' : 'var(--bg-input)',
                  color: ticket.status === st ? '#090d16' : 'var(--text-main)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Main Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Description & Context
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5, background: 'var(--bg-input)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
              {ticket.description}
            </p>

            {/* Level 0 Subtask Checklist */}
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckSquare size={16} color="var(--accent-emerald)" />
              Level 0 Execution Tasks ({subtasks.filter(s => s.completed).length}/{subtasks.length})
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {subtasks.map((st, idx) => (
                <div
                  key={st.id || idx}
                  onClick={() => toggleSubtask(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: st.completed ? 'var(--text-muted)' : 'var(--text-main)',
                    textDecoration: st.completed ? 'line-through' : 'none'
                  }}
                >
                  {st.completed ? <CheckSquare size={16} color="var(--accent-emerald)" /> : <Square size={16} color="var(--text-muted)" />}
                  {st.title}
                </div>
              ))}
            </div>

            {/* Comments Thread */}
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MessageSquare size={16} color="var(--accent-purple)" />
              Work Notes & Comments
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              {ticket.comments && ticket.comments.map(c => (
                <div key={c.id} style={{ background: 'var(--bg-input)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    <strong>{c.author}</strong>
                    <span>{c.time}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{c.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Add work note or reply..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{ flex: 1, padding: '0.6rem 0.85rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
              />
              <button
                type="submit"
                style={{ padding: '0.6rem 1rem', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Send size={14} /> Send
              </button>
            </form>
          </div>

          {/* Right Sidebar Metadata */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Client Account:</span>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{ticket.client}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Assigned Engineer:</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>{ticket.assignee}</strong>
            </div>

            {ticket.assetName && (
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Linked CMDB Asset:</span>
                <code style={{ color: 'var(--accent-cyan)', display: 'block', marginTop: '0.2rem' }}>{ticket.assetName}</code>
              </div>
            )}

            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Impact × Urgency:</span>
              <span>{ticket.impact} Impact × {ticket.urgency} Urgency</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>SLA Target Status:</span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: ticket.status === 'Pending Client' ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <Clock size={14} />
                Resolution: {ticket.slaResolutionStatus}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
