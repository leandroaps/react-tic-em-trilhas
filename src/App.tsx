import { Home } from '@/components/static/Home';
import { IconInnerShadowTop } from '@tabler/icons-react';

function App() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <a href="#">
            <IconInnerShadowTop className="!size-5" />
            <span className="text-base font-semibold">Acme Inc.</span>
          </a>
        </div>
      </header>
      <main className="flex p-4">
        <Home />
      </main>
    </>
  );
}

export default App;
