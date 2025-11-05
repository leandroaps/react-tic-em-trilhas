import { Input } from '@/components/ui/input';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { IconInnerShadowTop, IconShoppingBag } from '@tabler/icons-react';
import { debounce } from 'lodash';
import { memo, useCallback, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';

function Header() {
  const { totalQuantity } = useShoppingCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim()) {
          void navigate(`/?search=${encodeURIComponent(value)}`, {
            replace: true,
          });
        } else {
          void navigate('/', { replace: true });
        }
      }, 500),
    [navigate]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  return (
    <header className="grid h-16 shrink-0 items-center border-b grid-cols-12 fixed bg-accent w-full">
      <div className="flex items-center gap-2 px-3 col-span-2">
        <Link to="/" className="flex items-center gap-2">
          <IconInnerShadowTop className="size-5" />
          <span className="text-base font-semibold">Acme Inc.</span>
        </Link>
      </div>
      <div className="flex w-full justify-start px-3 col-span-8 relative">
        <Input
          type="text"
          placeholder="Search a Product"
          onChange={handleSearch}
          defaultValue={searchParams.get('search') ?? ''}
          className="w-full"
        />
      </div>
      <div className="flex w-full justify-end px-3 col-span-2 relative">
        <Link to="shopping-cart" className="flex items-center gap-2">
          <IconShoppingBag className="size-6" />
          <span className="text-base font-semibold">Cart</span>
          <span className="text-base font-semibold relative right size-6 text-center justify-center rounded-3xl bg-blue-400">
            {totalQuantity}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default memo(Header);
