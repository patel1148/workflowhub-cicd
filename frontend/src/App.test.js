
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock fetch globally
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

test('renders WorkFlowHub header brand and productivity banner', () => {
  render(<App />);

  // Target the brand specifically in the navigation header
  const brandElement = screen.getByText('WorkFlowHub', {
    selector: '.brand-title',
  });
  expect(brandElement).toBeInTheDocument();

  // Verify the productivity banner action
  const ctaElement = screen.getByText(/Create Workflow Task/i);
  expect(ctaElement).toBeInTheDocument();
});
