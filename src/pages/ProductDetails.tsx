import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import ProductServices from '@/services/Products.service';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Package, ShoppingCart, Tag } from 'lucide-react';
import { memo } from 'react';
import { useNavigate, useParams } from 'react-router';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addProduct } = useShoppingCart();

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');
      return await ProductServices.getProductById(Number(id));
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-destructive text-lg">
          {error ? `Error: ${error.message}` : 'Product not found'}
        </p>
        <Button onClick={() => void navigate('/')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }

  const price = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleAddToCart = () => {
    addProduct(product.id, product.title, product.price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => void navigate('/')}
        variant="ghost"
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {product.description ?? 'No description available'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">{price}</span>
              </div>

              {/* Product Info */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Tag className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Category
                    </p>
                    <p className="text-sm">{product.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Availability
                    </p>
                    <p className="text-sm">
                      {product.stock > 0 ? (
                        <span className="text-green-600 font-medium">
                          In Stock ({product.stock} available)
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">
                          Out of Stock
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              {product.stock > 0 && product.stock < 10 && (
                <p className="text-sm text-orange-600 text-center">
                  Only {product.stock} left in stock - order soon!
                </p>
              )}
            </CardFooter>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <dt className="font-medium">Product ID</dt>
                  <dd className="text-muted-foreground">#{product.id}</dd>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <dt className="font-medium">Category</dt>
                  <dd className="text-muted-foreground">{product.category}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt className="font-medium">Stock Status</dt>
                  <dd className="text-muted-foreground">
                    {product.stock > 0 ? 'Available' : 'Unavailable'}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductDetails);
