import { memo } from 'react';

function ShoppingCart() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="grid w-full grid-cols-1 p-4 mt-15">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Shopping Cart
        </h2>
      </div>
    </div>
  );
}

export default memo(ShoppingCart);
