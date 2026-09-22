import React from 'react';
import { Users, UserCheck, MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { TEAM_MEMBERS } from '../mockData';

export default function TeamRoster() {
  const onsiteMember = TEAM_MEMBERS.find(m => m.type === 'Onsite');
  const offshoreMembers = TEAM_MEMBERS.filter(m => m.type === 'Offshore');

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '1.25rem',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={18} color="var(--accent-cyan)" />
          Cognizant Managed Services Team Roster (1 Onsite + 4 Offshore)
        </h3>
        <span style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 600 }}>
          Denali Clinical Operations Account
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
        
        {/* Onsite Card */}
        {onsiteMember && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.72rem', background: 'var(--accent-cyan)', color: '#090d16', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
                1 ONSITE MEMBER
              </span>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-cyan)', color: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                {onsiteMember.avatar}
              </div>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              {onsiteMember.name}
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>
              {onsiteMember.role}
            </p>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={12} color="var(--accent-cyan)" /> {onsiteMember.location}
            </div>
          </div>
        )}

        {/* Offshore Members Grid (4 Members) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {offshoreMembers.map((member) => (
            <div key={member.id} style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.75rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.78rem' }}>
                {member.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {member.name}
                  </h5>
                  <span style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', padding: '0.1rem 0.35rem', borderRadius: '3px', fontWeight: 600 }}>
                    OFFSHORE
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
