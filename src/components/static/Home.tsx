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
    <>
      {products?.map((product) => {
        return <CardComponent key={product.id} product={product} />;
      })}
    </>
  );
}
