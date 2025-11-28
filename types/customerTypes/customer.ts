// types/customer.ts
export interface Customer {
  id: number;
  fullName: string;
  mobile: string;
  address?: string;
  registered: string;
  deleted?: string | null;
  modified?: string;
}
