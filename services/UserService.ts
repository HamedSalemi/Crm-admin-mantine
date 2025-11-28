// services/CustomerService.ts
import { Customer } from "@/types/customerTypes/customer";
import api from "./api";

// اگر بک‌اندت خروجی رو داخل data می‌فرسته مثل { status, data: [...] }
// می‌تونی یک Generic Response هم تعریف کنی:
interface ApiResponse<T> {
  status: string;
  data: T;
}

export const CustomerService = {
  list: (payload: any) =>
    api.post<ApiResponse<Customer[]>>("/Admin/Customer/Index", payload),

  create: (payload: Partial<Customer>) =>
    api.post<ApiResponse<Customer>>("/Admin/Customer/New", payload),

  update: (payload: Partial<Customer>) =>
    api.post<ApiResponse<Customer>>("/Admin/Customer/Edit", payload),

  remove: (payload: { id: number }) =>
    api.post<ApiResponse<void>>("/Admin/Customer/Delete", payload),
};
