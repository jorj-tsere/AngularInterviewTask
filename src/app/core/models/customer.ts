import { Address } from '.';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  genderId: string;
  personalNumber: string;
  phone: string;
  legalAddress: Address;
  actualAddress: Address;
  customerImage: string;
}
