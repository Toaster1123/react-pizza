export type PizzaItem = {
  imageUrl: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  id: string;
};
type TotalPages = {
  total_pages: number;
};
export type FetchPizzasPayload = {
  items: PizzaItem[];
  meta: TotalPages;
};
export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}
export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
  totalPages: number;
}
