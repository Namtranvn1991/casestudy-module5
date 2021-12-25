import {CustomerType} from './customer-type';

export interface Customer {
  id: number;
  name: string;
  dateOfBirth: Date;
  gender: number;
  idCard: string;
  phone: string;
  email: string;
  address: string;
  cusType: CustomerType;
}
