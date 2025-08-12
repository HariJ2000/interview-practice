import { render, screen } from '@testing-library/react';
import App from './App';
import explorer from './data/fileExplorer.json';

test('renders root folder name', () => {
  render(<App />);
  expect(screen.getByText(`📁${explorer.name}`)).toBeInTheDocument();
});