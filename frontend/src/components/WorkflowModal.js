import React, { useState, useEffect } from 'react';

function WorkflowModal({ item = null, onClose, onSave }) {
  const isEditing = Boolean(item);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setDescription(item.description || '');
      setStatus(item.status || 'Pending');
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    setSaving(true);
    try {
      await onSave({
        id: item ? item.id : undefined,
        title: title.trim(),
        description: description.trim(),
        status,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save workflow item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Workflow Item' : 'Create New Workflow Item'}</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="workflow-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Set up Docker containerization"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline task goals, dependencies, and expected outcomes..."
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkflowModal;

