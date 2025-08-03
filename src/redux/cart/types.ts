export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

export interface cartState {
  totalPrice: number,
  items: CartItem[],
}