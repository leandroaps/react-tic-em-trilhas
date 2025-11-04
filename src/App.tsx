import Home from '@/components/static/Home';
import { memo } from 'react';
import Header from './components/static/Header';

function App() {
  return (
    <>
      <Header />
      <main className="flex p-4">
        <Home />
      </main>
    </>
  );
}

export default memo(App);
