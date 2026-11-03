import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import WorkflowCard from './components/WorkflowCard';
import WorkflowModal from './components/WorkflowModal';
import AuthModal from './components/AuthModal';
import apiService from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiHealthy, setApiHealthy] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'

  // Modals state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  // Check health and session on mount
  useEffect(() => {
    const init = async () => {
      try {
        await apiService.checkHealth();
        setApiHealthy(true);
      } catch (e) {
        setApiHealthy(false);
      }

      const storedUser = localStorage.getItem('workflowhub_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('workflowhub_user');
        }
      }
    };
    init();
  }, []);

  // Fetch workflow items
  const loadWorkflows = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getWorkflows(activeFilter, searchTerm);
      setItems(data);
    } catch (err) {
      showAlert(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchTerm]);

  useEffect(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await apiService.logout();
    setUser(null);
    showAlert('Signed out successfully.', 'success');
  };

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    showAlert(`Welcome, ${authenticatedUser.username}!`, 'success');
    loadWorkflows();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiService.updateWorkflow(id, { status: newStatus });
      showAlert(`Workflow status updated to "${newStatus}"`, 'success');
      loadWorkflows();
    } catch (err) {
      showAlert(err.message, 'error');
    }
  };

  const handleSaveWorkflow = async (payload) => {
    if (payload.id) {
      await apiService.updateWorkflow(payload.id, {
        title: payload.title,
        description: payload.description,
        status: payload.status,
      });
      showAlert('Workflow updated successfully', 'success');
    } else {
      await apiService.createWorkflow(payload.title, payload.description, payload.status);
      showAlert('New workflow item created', 'success');
    }
    loadWorkflows();
  };

  const handleDeleteWorkflow = async (id) => {
    if (window.confirm('Are you sure you want to delete this workflow item?')) {
      try {
        await apiService.deleteWorkflow(id);
        showAlert('Workflow item deleted', 'info');
        loadWorkflows();
      } catch (err) {
        showAlert(err.message, 'error');
      }
    }
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setWorkflowModalOpen(true);
  };

  const handleOpenNew = () => {
    setEditingItem(null);
    setWorkflowModalOpen(true);
  };

  // Group items by status for board view
  const pendingItems = items.filter((i) => i.status === 'Pending');
  const inProgressItems = items.filter((i) => i.status === 'In Progress');
  const completedItems = items.filter((i) => i.status === 'Completed');

  return (
    <div className="app-container">
      <Navbar
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenNewItem={handleOpenNew}
      />

      {alert && (
        <div className={`notification-toast toast-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <main className="main-content">
        <div className="hero-banner">
          <div className="hero-text">
            <h1>Remote Team Workflow & Productivity Suite</h1>
            <p>
              Streamline daily routines, coordinate sprints, and track operational progress in real-time.
            </p>
          </div>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={handleOpenNew}>
              + Create Workflow Task
            </button>
          </div>
        </div>

        <StatsBar items={items} apiHealthy={apiHealthy} />

        <div className="control-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search workflows by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            {['All', 'Pending', 'In Progress', 'Completed'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'board' ? 'active' : ''}`}
              onClick={() => setViewMode('board')}
              title="Board View"
            >
              ⊞ Columns
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ☰ List
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Synchronizing workflows...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No workflow items found</h3>
            <p>Get started by creating your first task or clear your search filters.</p>
            <button className="btn btn-primary" onClick={handleOpenNew}>
              Create First Workflow
            </button>
          </div>
        ) : viewMode === 'board' ? (
          <div className="board-grid">
            <div className="board-column">
              <div className="column-header header-pending">
                <span className="column-title">⏳ Pending</span>
                <span className="column-count">{pendingItems.length}</span>
              </div>
              <div className="column-cards">
                {pendingItems.map((item) => (
                  <WorkflowCard
                    key={item.id}
                    item={item}
                    onStatusChange={handleStatusChange}
                    onEdit={handleOpenEdit}
                    onDelete={handleDeleteWorkflow}
                  />
                ))}
              </div>
            </div>

            <div className="board-column">
              <div className="column-header header-progress">
                <span className="column-title">⚙️ In Progress</span>
                <span className="column-count">{inProgressItems.length}</span>
              </div>
              <div className="column-cards">
                {inProgressItems.map((item) => (
                  <WorkflowCard
                    key={item.id}
                    item={item}
                    onStatusChange={handleStatusChange}
                    onEdit={handleOpenEdit}
                    onDelete={handleDeleteWorkflow}
                  />
                ))}
              </div>
            </div>

            <div className="board-column">
              <div className="column-header header-completed">
                <span className="column-title">✅ Completed</span>
                <span className="column-count">{completedItems.length}</span>
              </div>
              <div className="column-cards">
                {completedItems.map((item) => (
                  <WorkflowCard
                    key={item.id}
                    item={item}
                    onStatusChange={handleStatusChange}
                    onEdit={handleOpenEdit}
                    onDelete={handleDeleteWorkflow}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="list-view">
            {items.map((item) => (
              <WorkflowCard
                key={item.id}
                item={item}
                onStatusChange={handleStatusChange}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteWorkflow}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {authModalOpen && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {workflowModalOpen && (
        <WorkflowModal
          item={editingItem}
          onClose={() => {
            setWorkflowModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveWorkflow}
        />
      )}

      <footer className="app-footer">
        <p>WorkFlowHub Ltd. CI/CD Full-Stack Platform &bull; SOFT806 Trimester 3, 2026</p>
      </footer>
    </div>
  );
}

export default App;
