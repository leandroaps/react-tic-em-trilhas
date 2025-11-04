import { memo, Suspense } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';

interface LayoutProps {
  onSearchChange: (searchTerm: string) => void;
}

function Layout({ onSearchChange }: LayoutProps) {
  return (
    <>
      <Header onSearchChange={onSearchChange} />
      <Suspense fallback="...loading">
        <Outlet />
      </Suspense>
    </>
  );
}

export default memo(Layout);
