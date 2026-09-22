import React, { useState } from 'react';
import { 
  Database, 
  Server, 
  ShieldAlert, 
  Cpu, 
  HardDrive, 
  Plus, 
  Building, 
  Activity, 
  Network, 
  Layers, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export default function CmdbExplorer({ assets, setAssets, clients, selectedClient }) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Asset State
  const [newAsset, setNewAsset] = useState({
    name: '',
    type: 'Server / VM',
    client: clients[0]?.name || 'ACME Corp',
    environment: 'Production',
    ip: '10.0.0.1',
    os: 'Ubuntu 22.04 LTS',
    isCritical: true,
    status: 'Healthy',
    linkedService: ''
  });

  const filteredAssets = assets.filter(asset => {
    const matchesClient = selectedClient === 'All' || asset.client === selectedClient;
    const matchesType = typeFilter === 'All' || asset.type === typeFilter;
    return matchesClient && matchesType;
  });

  const handleAddAsset = (e) => {
    e.preventDefault();
    const created = {
      ...newAsset,
      id: `ast-${Date.now()}`,
      cpuUsage: Math.floor(Math.random() * 30) + 10,
      memoryUsage: Math.floor(Math.random() * 40) + 20
    };
    setAssets([created, ...assets]);
    setShowAddModal(false);
    setNewAsset({
      name: '',
      type: 'Server / VM',
      client: clients[0]?.name || 'ACME Corp',
      environment: 'Production',
      ip: '10.0.0.1',
      os: 'Ubuntu 22.04 LTS',
      isCritical: true,
      status: 'Healthy',
      linkedService: ''
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '1.75rem 0' }}>
      
      {/* Top Banner */}
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
            <Database color="var(--accent-cyan)" size={24} />
            Jira Assets CMDB Infrastructure Explorer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Configuration Items (CIs), Object Graphs, and Dependency Mapping for Managed Clients.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--accent-cyan)',
            color: '#090d16',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'
          }}
        >
          <Plus size={18} />
          Register New Asset
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.75rem'
      }}>
        {['All', 'Server / VM', 'Database Instance', 'Application / Service', 'Network Equipment'].map(type => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: typeFilter === type ? 'var(--accent-cyan)' : 'var(--border-color)',
              background: typeFilter === type ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
              color: typeFilter === type ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Asset Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {filteredAssets.map(asset => {
          const isServer = asset.type === 'Server / VM';
          const isDb = asset.type === 'Database Instance';
          const isNetwork = asset.type === 'Network Equipment';
          const isDegraded = asset.status === 'Degraded' || asset.status === 'Critical';

          return (
            <div
              key={asset.id}
              style={{
                background: 'var(--bg-card)',
                border: isDegraded ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.25rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Top Header */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: isServer ? 'rgba(99, 102, 241, 0.15)' : isDb ? 'rgba(6, 182, 212, 0.15)' : isNetwork ? 'rgba(168, 85, 247, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isServer && <Server size={20} color="var(--primary)" />}
                      {isDb && <Database size={20} color="var(--accent-cyan)" />}
                      {isNetwork && <Network size={20} color="var(--accent-purple)" />}
                      {!isServer && !isDb && !isNetwork && <Layers size={20} color="var(--accent-emerald)" />}
                    </div>

                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                        {asset.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Client: <strong>{asset.client}</strong>
                      </span>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    background: asset.status === 'Healthy' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                    color: asset.status === 'Healthy' ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                    border: asset.status === 'Healthy' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)'
                  }}>
                    {asset.status}
                  </span>
                </div>

                {/* Specs List */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Environment:</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{asset.environment}</span>
                  </div>

                  {asset.ip && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>IP Address:</span>
                      <code style={{ color: 'var(--accent-cyan)' }}>{asset.ip}</code>
                    </div>
                  )}

                  {asset.os && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>OS:</span>
                      <span>{asset.os}</span>
                    </div>
                  )}

                  {asset.engine && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Engine:</span>
                      <span>{asset.engine}</span>
                    </div>
                  )}

                  {asset.linkedService && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Linked Service:</span>
                      <strong style={{ color: 'var(--primary)' }}>{asset.linkedService}</strong>
                    </div>
                  )}
                </div>

                {/* Telemetry metrics if server */}
                {isServer && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                        <Cpu size={12} /> CPU Usage
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: asset.cpuUsage > 90 ? 'var(--accent-rose)' : 'var(--text-main)' }}>
                        {asset.cpuUsage}%
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                        <HardDrive size={12} /> Memory Usage
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: asset.memoryUsage > 85 ? 'var(--accent-amber)' : 'var(--text-main)' }}>
                        {asset.memoryUsage}%
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                <span style={{ color: asset.isCritical ? 'var(--accent-rose)' : 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {asset.isCritical && <ShieldAlert size={14} color="var(--accent-rose)" />}
                  {asset.isCritical ? 'Tier-1 Critical Asset' : 'Standard Asset'}
                </span>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  ID: {asset.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            maxWidth: '500px',
            width: '100%',
            padding: '1.5rem',
            boxShadow: 'var(--glass-shadow)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Register New CMDB Asset</h3>

            <form onSubmit={handleAddAsset} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Asset Name / Hostname</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. srv-web-03.acme.prod"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Asset Type</label>
                  <select
                    value={newAsset.type}
                    onChange={(e) => setNewAsset({...newAsset, type: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
                  >
                    <option value="Server / VM">Server / VM</option>
                    <option value="Database Instance">Database Instance</option>
                    <option value="Application / Service">Application / Service</option>
                    <option value="Network Equipment">Network Equipment</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Client Account</label>
                  <select
                    value={newAsset.client}
                    onChange={(e) => setNewAsset({...newAsset, client: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
                  >
                    {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>IP Address</label>
                  <input
                    type="text"
                    placeholder="10.0.0.1"
                    value={newAsset.ip}
                    onChange={(e) => setNewAsset({...newAsset, ip: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Environment</label>
                  <select
                    value={newAsset.environment}
                    onChange={(e) => setNewAsset({...newAsset, environment: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
                  >
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'var(--accent-cyan)', color: '#090d16', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
