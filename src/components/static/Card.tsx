import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/interfaces/Products.interface';

function CardComponent({ product }: { product: Product }) {
  return (
    <Card className="w-full max-w-sm m-2">
      <CardHeader>
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <CardTitle className="h-14 overflow-hidden text-ellipsis line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="h-20 overflow-hidden text-ellipsis line-clamp-1">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">Category: {product.category}</p>
          <p className="text-sm text-muted-foreground">In stock: {product.quantity}</p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}

export default CardComponent;
