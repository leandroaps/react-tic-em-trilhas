import Home from '@/components/static/Home';
import { memo, useState } from 'react';
import Header from './components/static/Header';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <>
      <Header onSearchChange={setSearchTerm} />
      <main className="flex p-4">
        <Home searchTerm={searchTerm} />
      </main>
    </>
  );
}

export default memo(App);
