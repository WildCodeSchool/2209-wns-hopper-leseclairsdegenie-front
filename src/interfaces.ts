export interface IProduct {
  image: string;
  price: number;
  disponibility: boolean;
  description: string;
  id: number;
  name: string;
}

export interface ICategoryProps {
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  deliveryAdress: string;
  createdAt: Date;
  cartId: number;
}

export interface IConnection {
  onTokenChange: Function;
}

export interface IAddressOrder {
  delivery: IAddress;
  billing?: IAddress;
}

export interface IPurchaseProces {
  cart: boolean;
  address: boolean;
  payment: boolean;
  confirmation: boolean;
}

export interface IAddress {
  firstname: string;
  lastname: string;
  address: string;
}

export interface IAddressComponent {
  address: IAddressOrder;
  setAddress: Function;
}
