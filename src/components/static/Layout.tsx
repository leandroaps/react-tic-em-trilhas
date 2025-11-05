import { memo, Suspense } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback="...loading">
        <Outlet />
      </Suspense>
    </>
  );
}

export default memo(Layout);
