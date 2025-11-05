import type { ProductProps } from '@/interfaces/Products.interface';
import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import Card from '../Card';

const mockProduct: ProductProps = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  stock: 10,
  category: 'Electronics',
  images: 'https://via.placeholder.com/150',
};

describe('Card Component', () => {
  it('should render product information correctly', () => {
    render(<Card item={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Category: Electronics')).toBeInTheDocument();
    expect(screen.getByText('In stock: 10')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,99')).toBeInTheDocument();
  });

  it('should render product images with correct alt text', () => {
    render(<Card item={mockProduct} />);

    const images = screen.getByAltText('Test Product');
    expect(images).toBeInTheDocument();
    expect(images).toHaveAttribute('src', mockProduct.images);
  });

  it('should render buy button', () => {
    render(<Card item={mockProduct} />);

    const buyButton = screen.getByRole('button', { name: /buy/i });
    expect(buyButton).toBeInTheDocument();
  });

  it('should format price in Brazilian Real', () => {
    render(<Card item={mockProduct} />);

    // Check if price is formatted correctly
    expect(screen.getByText(/R\$/)).toBeInTheDocument();
  });

  it('should display product with no description', () => {
    const productWithoutDescription = {
      ...mockProduct,
      description: undefined,
    };
    render(<Card item={productWithoutDescription} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
