import CardCartComponent from '@/components/static/CardCart';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { memo } from 'react';

function ShoppingCart() {
  const { items, totalSumAmount } = useShoppingCart();

  const amount = totalSumAmount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="flex flex-col h-full w-full">
      <div className="grid w-full grid-cols-1 p-4 mt-15">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Shopping Cart - {amount}
        </h2>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4 mt-15">
          {items.length > 0 ? (
            items.map(product => {
              return <CardCartComponent key={product.id} item={product} />;
            })
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No products"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ShoppingCart);
