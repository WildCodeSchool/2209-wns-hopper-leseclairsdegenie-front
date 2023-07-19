
export interface IProduct {
  image: string;
  price: number;
  availability: [IAvailaiblesDates];
  description: string;
  id: number;
  name: string;
  category: ICategory;
}

export interface IAvailaiblesDates {
  date: Date;
  quantity: number;
}
export interface IReservation {
  price: number;
  nbJours: number;
  cart: ICart;
  product: IProduct;
  quantity: number; 
  startDate: Date;
  endDate: Date;   
}

export interface IReservations {
  endDate: Date;
  id: string;
  price: number;
  taille: string | null;
  duree: number;
  quantity: number;
  product: IProduct;
  startDate: Date;
  taxes: number | null;
  image?: string;
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
  reservations: IReservations[];
  cart?: ICart;
}

export interface ICategoryProps {
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
  image:string;
}

export interface ICart {
  id: number;
  user?: IUser;
  billingfirstname?: string;
  billingLastname?: string;
  billingAdress?: string;
  deliveryfirstname?: string;
  deliveryLastname?: string;
  deliveryAdress?: string;
  lastTimeModified?: Date;
  reservations?: IReservations[];
  totalePrice?: number | null;
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
