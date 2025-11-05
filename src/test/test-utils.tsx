/* eslint-disable react-refresh/only-export-components */
import { ShoppingCartProvider } from '@/contexts/ShoppingCart.context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

// Create a custom render function that includes providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

interface AllTheProvidersProps {
  children: ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ShoppingCartProvider>{children}</ShoppingCartProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Render with router
interface RenderWithRouterOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  initialIndex?: number;
}

const renderWithRouter = (
  ui: ReactElement,
  {
    initialEntries = ['/'],
    initialIndex = 0,
    ...renderOptions
  }: RenderWithRouterOptions = {}
) => {
  const queryClient = createTestQueryClient();

  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: ui,
      },
    ],
    {
      initialEntries,
      initialIndex,
    }
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <ShoppingCartProvider>
        <RouterProvider router={router} />
      </ShoppingCartProvider>
    </QueryClientProvider>,
    renderOptions
  );
};

export * from '@testing-library/react';
export { customRender as render, renderWithRouter };
