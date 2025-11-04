import { Input } from '@/components/ui/input';
import { IconInnerShadowTop } from '@tabler/icons-react';
import { debounce } from 'lodash';
import { memo, useCallback } from 'react';

interface HeaderProps {
  onSearchChange: (searchTerm: string) => void;
}

function Header({ onSearchChange }: HeaderProps) {
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
  }, [onSearchChange]);

  const debouncedFunction = debounce(handleSearch, 500);

  return (
    <header className="grid h-16 shrink-0 items-center border-b grid-cols-12">
      <div className="flex items-start gap-2 px-3 col-span-4">
        <a href="#">
          <IconInnerShadowTop className="size-5" />
          <span className="text-base font-semibold">Acme Inc.</span>
        </a>
      </div>
      <div className="w-full justify-start px-3 col-span-4 relative">
        <Input type="text" placeholder="Search a Product" onChange={(e) => debouncedFunction(e)} className="w-full" />
      </div>
    </header>
  );
}

export default memo(Header);
