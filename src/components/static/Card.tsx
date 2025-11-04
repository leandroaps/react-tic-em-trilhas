import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Product } from '@/interfaces/Products.interface';
import { memo } from 'react';

function CardComponent({ item }: Product) {
  return (
    <Card className="w-full m-2">
      <CardHeader>
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="h-14 overflow-hidden text-ellipsis line-clamp-1">
          {item.name}
        </CardTitle>
        <CardDescription className="h-20 overflow-hidden text-ellipsis line-clamp-1">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">
            Category: {item.category}
          </p>
          <p className="text-sm text-muted-foreground">
            In stock: {item.quantity}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}

export default memo(CardComponent);
