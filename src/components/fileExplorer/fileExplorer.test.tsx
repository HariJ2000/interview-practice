import FileExplorer from './index';
import explorer from '../../data/fileExplorer.json';
import { render, screen, fireEvent } from '@testing-library/react';
import Folder from './Folder';
import { ExplorerItem } from './types';

const mockCallback = jest.fn();

const folderData: ExplorerItem = {
  id: '1',
  name: 'Root',
  isFolder: true,
  items: [
    {
      id: '2',
      name: 'ChildFolder',
      isFolder: true,
      items: []
    }
  ]
};

const fileData: ExplorerItem = {
  id: '3',
  name: 'File1',
  isFolder: false,
  items: []
};

test('renders root folder name', () => {
  render(<FileExplorer />);
  expect(screen.getByText(`📁${explorer.name}`)).toBeInTheDocument();
});

test('renders file name', () => {
  render(<Folder explorerData={fileData} callbackHandler={mockCallback} />);
  expect(screen.getByText('🗄️File1')).toBeInTheDocument();
});

test('renders folder name and children', () => {
  render(<Folder explorerData={folderData} callbackHandler={mockCallback} />);
  expect(screen.getByText('📁Root')).toBeInTheDocument();
  expect(screen.getAllByText('+folder')[0]).toBeInTheDocument();
  expect(screen.getAllByText('+file')[0]).toBeInTheDocument();
  // Child folder should be rendered when visible
  fireEvent.click(screen.getByText('📁Root'));
  expect(screen.getByText('📁ChildFolder')).toBeInTheDocument();
});

test('shows input and calls callback on Enter for folder', () => {
  render(<Folder explorerData={folderData} callbackHandler={mockCallback} />);
  fireEvent.click(screen.getAllByText('+folder')[0]);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'NewFolder' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  expect(mockCallback).toHaveBeenCalledWith('1', 'NewFolder', true);
});

test('shows input and calls callback on Enter for file', () => {
  render(<Folder explorerData={folderData} callbackHandler={mockCallback} />);
  fireEvent.click(screen.getAllByText('+file')[0]);
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'NewFile' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  expect(mockCallback).toHaveBeenCalledWith('1', 'NewFile', false);
});

test('toggles folder visibility', () => {
  render(<Folder explorerData={folderData} callbackHandler={mockCallback} />);
  const folderName = screen.getByText('📁Root');
  // Initially hidden
  expect(screen.queryByText('📁ChildFolder')).not.toBeVisible();
  // Toggle visibility
  fireEvent.click(folderName);
  expect(screen.getByText('📁ChildFolder')).toBeVisible();
});

test('handleInsertNode adds a folder to explorerData', () => {
  render(<FileExplorer />);
  // Click the first +folder button
  fireEvent.click(screen.getAllByText('+folder')[0]);
  // Type folder name and press Enter
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'TestFolder' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  // New folder should appear
  expect(screen.getByText('📁TestFolder')).toBeInTheDocument();
});