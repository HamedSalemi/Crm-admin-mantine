// services/CustomerService.ts
import { Customer } from "@/types/customerTypes/customer";
import api from "./api";

interface ApiResponse<T> {
  status: string;
  data: T;
}

export const CustomerService = {
  list: (payload: { page: number; pageSize: number }) =>
    api.post<ApiResponse<{ items: Customer[]; total: number; page: number; pageCount: number }>>(
      "/Admin/Customer/Index",
      payload
    ),

  create: (payload: Partial<Customer>) =>
    api.post<ApiResponse<Customer>>("/Admin/Customer/New", payload),

  update: (id: number, payload: Partial<Customer>) =>
    api.post<ApiResponse<Customer>>("/Admin/Customer/Edit", { id, ...payload }),

  delete: (id: number) =>
    api.post<ApiResponse<void>>("/Admin/Customer/Delete", { id }),
};
