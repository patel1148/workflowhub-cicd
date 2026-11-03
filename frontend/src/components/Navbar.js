import React from 'react';

function Navbar({ user, onOpenAuth, onLogout, onOpenNewItem }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-title">WorkFlowHub</span>
          <span className="brand-badge">SaaS</span>
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="user-greeting">
                👋 Hello, <strong>{user.username}</strong>
              </span>
              <button className="btn btn-primary" onClick={onOpenNewItem}>
                + New Workflow
              </button>
              <button className="btn btn-outline" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline" onClick={() => onOpenAuth('login')}>
                Sign In
              </button>
              <button className="btn btn-primary" onClick={() => onOpenAuth('register')}>
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

