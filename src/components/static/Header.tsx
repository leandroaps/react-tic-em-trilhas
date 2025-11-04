import { Input } from '@/components/ui/input';
import { IconInnerShadowTop, IconShoppingBag } from '@tabler/icons-react';
import { debounce } from 'lodash';
import { memo, useCallback } from 'react';
import { Link } from 'react-router';

interface HeaderProps {
  onSearchChange: (searchTerm: string) => void;
}

function Header({ onSearchChange }: HeaderProps) {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onSearchChange(value);
    },
    [onSearchChange]
  );

  const debouncedFunction = debounce(handleSearch, 500);

  return (
    <header className="grid h-16 shrink-0 items-center border-b grid-cols-12 fixed bg-accent w-full">
      <div className="flex items-center gap-2 px-3 col-span-4">
        <Link to="/" className="flex items-center gap-2">
          <IconInnerShadowTop className="size-5" />
          <span className="text-base font-semibold">Acme Inc.</span>
        </Link>
      </div>
      <div className="w-full justify-start px-3 col-span-6 relative">
        <Input
          type="text"
          placeholder="Search a Product"
          onChange={e => debouncedFunction(e)}
          className="w-full"
        />
      </div>
      <div className="w-full justify-start px-3 col-span-2 relative">
        <Link to="shopping-cart" className="flex items-center gap-2">
          <IconShoppingBag className="size-6" />
          <span className="text-base font-semibold">Cart</span>
        </Link>
      </div>
    </header>
  );
}

export default memo(Header);
