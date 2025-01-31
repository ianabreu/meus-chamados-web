import { create } from "zustand";
import { Customer } from "../@types/Customer";
import { api } from "../services/apiConfig";

type CustomerStore = {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (updatedCustomer: Customer) => void;
  removeCustomer: (customerId: string) => void;
};
export const useCustomerStore = create<CustomerStore>()((set) => ({
  customers: [],
  isLoading: true,
  error: null,
  fetchCustomers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<{
        results: Customer[];
        pagination: unknown;
      }>("/customers");
      set({ customers: response.data.results, isLoading: false });
    } catch (error) {
      console.error("Erro ao buscar customers:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao buscar os customers",
        isLoading: false,
      });
    }
  },
  addCustomer: (customer: Customer) => {
    set((state) => ({
      customers: [customer, ...state.customers],
    }));
  },
  updateCustomer: (updatedTicket: Customer) => {
    set((state) => ({
      customers: state.customers.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      ),
    }));
  },
  removeCustomer: (customerId: string) => {
    set((state) => ({
      customers: state.customers.filter(
        (customer) => customer.id !== customerId
      ),
    }));
  },
}));
