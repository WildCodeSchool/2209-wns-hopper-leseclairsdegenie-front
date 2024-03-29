export interface IProduct {
  image: string;
  price: number;
  disponibility: boolean;
  description: string;
  id: number;
  name: string;
}
export interface IReservation {
  id: number;
  product: IProduct;
  cart: ICart;
  order?: IOrder;
  startDate: Date;
  endDate: Date;
  quantity: number;
  price: number;
  taxes: number;
  nbJours: number;
}
export interface IOrder {
  id: number;
  user: IUser;
  billingfirstname: string;
  billingLastname: string;
  billingAdress: string;
  deliveryfirstname: string;
  deliveryLastname: string;
  deliveryAdress: string;
  totalPrice: number;
  statusDelivery: string;
  date: Date;
  reservations: IReservation[];
  cart?: ICart;
}

export interface ICategoryProps {
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ICart {
  id: number;
  user?: IUser;
  billingfirstname: string;
  billingLastname: string;
  billingAdress: string;
  deliveryfirstname: string;
  deliveryLastname: string;
  deliveryAdress: string;
  lastTimeModified?: Date;
  reservations?: IReservation[];
  totalePrice: number | null;
}

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  deliveryAdress: string;
  createdAt: Date;
  cart: ICart;
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
