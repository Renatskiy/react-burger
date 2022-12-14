export interface typeIngridient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
  position?: any;
  locker?: boolean;
}

export interface orderType {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  position: string;
  locker: boolean;
}

export interface ConstructorState {
  burgerConstructor: {
    bun: typeIngridient[];
    ingredients: typeIngridient[];
  };
  totalPrice: Number;
}
