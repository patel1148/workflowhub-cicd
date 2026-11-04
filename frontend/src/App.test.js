import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

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

test('renders WorkFlowHub header brand and productivity banner', async () => {
  render(<App />);

  const brandElement = screen.getByText('WorkFlowHub', {
    selector: '.brand-title',
  });
  expect(brandElement).toBeInTheDocument();

  const ctaElement = screen.getByText(/Create Workflow Task/i);
  expect(ctaElement).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.queryByText(/Synchronizing workflows/i)
    ).not.toBeInTheDocument();
  });
});
