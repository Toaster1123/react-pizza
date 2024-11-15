export type PizzaItem = {
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  id: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}
export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
