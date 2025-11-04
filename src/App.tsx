import { ShoppingCartProvider } from '@/contexts/ShoppingCart.context';
import Home from '@/pages/Home';
import ShoppingCart from '@/pages/ShoppingCart';
import { memo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/static/Layout';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const route = createBrowserRouter([
    {
      element: <Layout onSearchChange={setSearchTerm} />,
      children: [
        {
          path: '/',
          element: <Home searchTerm={searchTerm} />,
        },
        {
          path: '/shopping-cart',
          element: <ShoppingCart />,
        },
      ],
    },
  ]);

  return (
    <ShoppingCartProvider>
      <RouterProvider router={route} />
    </ShoppingCartProvider>
  );
}

export default memo(App);
