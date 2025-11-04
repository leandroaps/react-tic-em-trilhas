import getAllProducts from '@/services/Products.service';
import { useQuery } from '@tanstack/react-query';
import CardComponent from './Card';

export function Home() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['query-products'],
    queryFn: async () => {
      return await getAllProducts();
    },
  });

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className="grid h-full w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4">
      {products?.map((product) => {
        return <CardComponent key={product.id} item={product} />;
      })}
    </div>
  );
}
