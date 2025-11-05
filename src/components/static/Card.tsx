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
import type { Product } from '@/interfaces/Products.interface';
import { memo } from 'react';
import { useNavigate } from 'react-router';

function CardComponent({ item }: Product) {
  const { addProduct } = useShoppingCart();
  const navigate = useNavigate();

  const price = item.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleCardClick = () => {
    void navigate(`/product/${item.id}`);
  };

  return (
    <Card
      className="w-full m-2 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="h-14 overflow-hidden text-ellipsis line-clamp-1">
          {item.title}
        </CardTitle>
        <CardDescription className="h-20 overflow-hidden text-ellipsis line-clamp-1">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{price}</p>
          <p className="text-sm text-muted-foreground">
            Category: {item.category}
          </p>
          <p className="text-sm text-muted-foreground">
            In stock: {item.stock}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          onClick={e => {
            e.stopPropagation();
            addProduct(item.id, item.title, item.price);
          }}
          className="w-full"
        >
          Add to Cart
        </Button>
        <Button
          onClick={e => {
            e.stopPropagation();
            handleCardClick();
          }}
          variant="outline"
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default memo(CardComponent);
