import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import JiraTicketsView from './components/JiraTicketsView';
import CmdbExplorer from './components/CmdbExplorer';
import AutomationRulesView from './components/AutomationRulesView';
import CustomerPortalView from './components/CustomerPortalView';
import TicketDetailModal from './components/TicketDetailModal';
import CreateTicketModal from './components/CreateTicketModal';
import { INITIAL_TICKETS, INITIAL_CLIENTS, INITIAL_ASSETS } from './mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState('All');

  // Core State
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [assets, setAssets] = useState(INITIAL_ASSETS);

  // Modals
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Ticket Updates
  const handleUpdateTicket = (updatedTicket) => {
    setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    if (selectedTicketModal && selectedTicketModal.id === updatedTicket.id) {
      setSelectedTicketModal(updatedTicket);
    }
  };

  const handleCreateTicket = (newTicket) => {
    setTickets([newTicket, ...tickets]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Global Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        clients={clients}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 1.5rem 3rem 1.5rem' }}>
        {activeTab === 'dashboard' && (
          <ExecutiveDashboard
            tickets={tickets}
            clients={clients}
            assets={assets}
            selectedClient={selectedClient}
            onSelectTicket={(ticket) => setSelectedTicketModal(ticket)}
          />
        )}

        {activeTab === 'tickets' && (
          <JiraTicketsView
            tickets={tickets}
            setTickets={setTickets}
            selectedClient={selectedClient}
            onSelectTicket={(ticket) => setSelectedTicketModal(ticket)}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {activeTab === 'cmdb' && (
          <CmdbExplorer
            assets={assets}
            setAssets={setAssets}
            clients={clients}
            selectedClient={selectedClient}
          />
        )}

        {activeTab === 'automation' && (
          <AutomationRulesView />
        )}

        {activeTab === 'portal' && (
          <CustomerPortalView
            clients={clients}
            assets={assets}
            onAddTicket={handleCreateTicket}
          />
        )}
      </main>

      {/* Ticket Detail Drawer Modal */}
      {selectedTicketModal && (
        <TicketDetailModal
          ticket={selectedTicketModal}
          onClose={() => setSelectedTicketModal(null)}
          onUpdateTicket={handleUpdateTicket}
        />
      )}

      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <CreateTicketModal
          clients={clients}
          assets={assets}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateTicket}
        />
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.25rem 0',
        textAlign: 'center',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        background: 'rgba(9, 13, 22, 0.9)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', padding: '0 1.5rem' }}>
          <span>NovaSmart Managed Services Hub • Jira JSM & CMDB Operations Tracker</span>
          <span>SLA Target: 98.5% • ITIL v4 Aligned Engine</span>
        </div>
      </footer>
    </div>
  );
}
