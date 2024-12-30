import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import React from 'react';

describe('App Component - Render', () => {
  it('renders the CSV upload section initially', () => {
    render(<App />);
    expect(screen.getByText(/DROP YOUR CSV DATASET HERE/i)).not.toBeNull();
  });

  it('renders subcomponents when csvLoaded is true', () => {
    // Mock useState for csvLoaded to return true
    vi.spyOn(React, 'useState').mockImplementationOnce(() => [true, vi.fn()]);

    render(<App />);

    expect(screen.getByText(/Your Reports/i)).not.toBeNull();
    expect(screen.getByRole('button', { name: /Save Report/i })).not.toBeNull();
  });
});


