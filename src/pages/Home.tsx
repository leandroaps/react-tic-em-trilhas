import CardComponent from '@/components/static/Card';
import ProductServices from '@/services/Products.service';
import { useQuery } from '@tanstack/react-query';
import { memo, useMemo } from 'react';
import { useSearchParams } from 'react-router';

function Home() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') ?? '';

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['query-products'],
    queryFn: async () => {
      return await ProductServices.getAllProducts();
    },
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    if (!searchTerm || searchTerm.trim() === '') {
      return products;
    }

    const searchWords = searchTerm
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);

    return products.filter(product => {
      if (!product.title) return false;
      const productName = product.title.toLowerCase();
      return searchWords.some(word => productName.includes(word));
    });
  }, [products, searchTerm]);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="grid w-full grid-cols-1 p-4 mt-15">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Shopping Cart
        </h2>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4 mt-15">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              return <CardComponent key={product.id} item={product} />;
            })
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No products found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
