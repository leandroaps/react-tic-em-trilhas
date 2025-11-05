import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import type { ListItem } from '@/interfaces/ShoppingCart.interface';
import { memo } from 'react';
import { Button } from '../ui/button';

function CardCartComponent({ item }: { item: ListItem }) {
  const { addProduct, onRemove, onDecrease } = useShoppingCart();

  const amount = item.amount.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Card className="w-full m-2">
      <CardHeader>
        <CardTitle className="h-10 overflow-hidden text-ellipsis line-clamp-1">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            <strong>Quantity: </strong>
            {item.stock}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Total: </strong> {amount}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-row gap-2">
        <Button
          onClick={e => {
            e.stopPropagation();
            addProduct(item.id, item.title, item.unitPrice);
          }}
        >
          Buy
        </Button>
        <Button
          variant="secondary"
          onClick={e => {
            e.stopPropagation();
            onDecrease(item.id, item.unitPrice);
          }}
        >
          Lesser
        </Button>
        <Button
          variant="destructive"
          onClick={e => {
            e.stopPropagation();
            onRemove(item.id);
          }}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}

export default memo(CardCartComponent);
