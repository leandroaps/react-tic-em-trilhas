import { Input } from '@/components/ui/input';
import useOnClickOutside from '@/hooks/useClickOutside';
import type { ProductProps } from '@/interfaces/Products.interface';
import ProductServices from '@/services/Products.service';
import { IconInnerShadowTop } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import List from './List';

function Header() {
  const [productName, setProductName] = useState<string>('');
  const refDropDown = useRef<HTMLUListElement>(null);

  const { data: productsByName } = useQuery({
    queryKey: ['query-products-by-name', productName],
    queryFn: async () => {
      return await ProductServices.searchProducts(productName);
    },
    enabled: productName.length > 0,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setProductName(value);
  }, []);

  useOnClickOutside({ ref: refDropDown, handle: () => setIsOpen(false) });

  useEffect(() => {
    if (productName.length > 0) {
      setIsOpen(true);
    }
  }, [productName.length]);

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
        {isOpen && (
          <ul
            role="list"
            className="absolute z-50 divide-y divide-gray-100 mt-2 bg-white shadow-lg rounded-md w-full max-h-60 overflow-y-auto"
            ref={refDropDown}
          >
            {productsByName?.map((item: ProductProps) => {
              return (
                <List key={item.id}>
                  {item.name}
                  <>
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                  </>
                </List>
              );
            })}
          </ul>
        )}
      </div>
    </header>
  );
}

export default memo(Header);
