import { ShoppingCartProvider } from '@/contexts/ShoppingCart.context';
import Home from '@/pages/Home';
import ProductDetails from '@/pages/ProductDetails';
import ShoppingCart from '@/pages/ShoppingCart';
import { memo, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/static/Layout';

function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element: <Layout />,
          children: [
            {
              path: '/',
              element: <Home />,
            },
            {
              path: '/product/:id',
              element: <ProductDetails />,
            },
            {
              path: '/shopping-cart',
              element: <ShoppingCart />,
            },
          ],
        },
      ]),
    []
  );

  return (
    <ShoppingCartProvider>
      <RouterProvider router={router} />
    </ShoppingCartProvider>
  );
}

export default memo(App);
