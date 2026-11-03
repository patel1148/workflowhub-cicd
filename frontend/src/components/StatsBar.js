import React from 'react';

function StatsBar({ items, apiHealthy }) {
  const total = items.length;
  const pending = items.filter((i) => i.status === 'Pending').length;
  const inProgress = items.filter((i) => i.status === 'In Progress').length;
  const completed = items.filter((i) => i.status === 'Completed').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats-bar">
      <div className="stat-card">
        <span className="stat-label">Total Workflows</span>
        <span className="stat-value">{total}</span>
      </div>

      <div className="stat-card stat-pending">
        <span className="stat-label">Pending</span>
        <span className="stat-value">{pending}</span>
      </div>

      <div className="stat-card stat-progress">
        <span className="stat-label">In Progress</span>
        <span className="stat-value">{inProgress}</span>
      </div>

      <div className="stat-card stat-completed">
        <span className="stat-label">Completed</span>
        <span className="stat-value">{completed}</span>
      </div>

      <div className="stat-card stat-rate">
        <span className="stat-label">Completion Rate</span>
        <span className="stat-value">{completionRate}%</span>
      </div>

      <div className="stat-card stat-system">
        <span className="stat-label">API Health</span>
        <span className={`health-pill ${apiHealthy ? 'healthy' : 'unhealthy'}`}>
          {apiHealthy ? '● Online' : '○ Offline'}
        </span>
      </div>
    </div>
  );
}

export default StatsBar;
