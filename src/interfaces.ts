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

export interface IUser {
  id: number;
  email: string;
}

export interface IConnection {
  onTokenChange: Function;
}