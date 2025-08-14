import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pagination from '.';

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description 2',
  },
];

const mockApiResponse = {
  products: mockProducts,
  total: 20,
  skip: 0,
  limit: 10,
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockApiResponse),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Pagination', () => {
  test('renders product container', async () => {
    render(<Pagination />);
    const container = await screen.getByTestId('product__container');
    expect(container).toBeInTheDocument();
  });

  test('renders products from API', async () => {
    render(<Pagination />);
    // Wait for products to be rendered
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  test('pagination buttons work', async () => {
    render(<Pagination />);
    // Wait for products to be rendered
    await screen.findByText('Product 1');
    // Click next page
    fireEvent.click(screen.getByText('2'));
    // fetch should be called again for page 2
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  test("next and previous button check", () => {
    render(<Pagination/>)
    fireEvent.click(screen.getByText('◀️'))
    expect(global.fetch).toHaveBeenCalled()
    fireEvent.click(screen.getByText('▶️'))
    expect(global.fetch).toHaveBeenCalled()
  })
});