import React from 'react';

function WorkflowCard({ item, onStatusChange, onEdit, onDelete }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-status badge-completed';
      case 'In Progress':
        return 'badge-status badge-progress';
      case 'Pending':
      default:
        return 'badge-status badge-pending';
    }
  };

  const formattedDate = item.created_at
    ? new Date(item.created_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div className="workflow-card">
      <div className="card-top">
        <span className={getStatusBadgeClass(item.status)}>{item.status}</span>
        <div className="card-actions">
          <button
            className="icon-btn edit-btn"
            title="Edit item"
            onClick={() => onEdit(item)}
          >
            ✏️
          </button>
          <button
            className="icon-btn delete-btn"
            title="Delete item"
            onClick={() => onDelete(item.id)}
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className="card-title">{item.title}</h3>

      {item.description && (
        <p className="card-description">{item.description}</p>
      )}

      <div className="card-footer">
        <div className="card-meta">
          {item.owner_username && (
            <span className="owner-tag">👤 {item.owner_username}</span>
          )}
          {formattedDate && <span className="date-tag">📅 {formattedDate}</span>}
        </div>

        <div className="status-transitions">
          {item.status === 'Pending' && (
            <button
              className="btn btn-sm btn-action"
              onClick={() => onStatusChange(item.id, 'In Progress')}
            >
              Start →
            </button>
          )}

          {item.status === 'In Progress' && (
            <>
              <button
                className="btn btn-sm btn-subtle"
                onClick={() => onStatusChange(item.id, 'Pending')}
              >
                ← Pending
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => onStatusChange(item.id, 'Completed')}
              >
                Complete ✓
              </button>
            </>
          )}

          {item.status === 'Completed' && (
            <button
              className="btn btn-sm btn-subtle"
              onClick={() => onStatusChange(item.id, 'In Progress')}
            >
              ↺ Reopen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkflowCard;

