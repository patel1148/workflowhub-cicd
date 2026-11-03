import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Mock fetch globally for testing
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ status: 'healthy', results: [] }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders WorkFlowHub without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<App />);
  root.unmount();
});
