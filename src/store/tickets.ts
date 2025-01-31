import { create } from "zustand";
import { createTicketDTO, Ticket } from "../@types/Ticket";
import { Pagination, queryParamsProps } from "../@types/Pagination";
import { ticketServices } from "../services/ticketServices";
import toast from "react-hot-toast";

type TicketsStore = {
  tickets: Ticket[];
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: createTicketDTO) => Promise<void>;
  updateTicket: (updatedTicket: Ticket) => void;
  removeTicket: (ticketId: string) => void;
  goToPage: (page: number) => Promise<void>;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
  filters: queryParamsProps;
  setFilters: (filters: Partial<queryParamsProps>) => void;
};
export const useTicketStore = create<TicketsStore>()((set, get) => ({
  tickets: [],
  pagination: {
    current_page: 1,
    has_next_page: false,
    has_previous_page: false,
    last_page: 1,
    total: 1,
  },
  isLoading: true,
  error: null,
  filters: {
    page: 1,
    order_by: "created_at",
    limit: 5,
    order: "desc",
    search: "",
  },
  fetchTickets: async () => {
    set({ isLoading: true, error: null });
    const params = get().filters;
    try {
      const response = await ticketServices.get(params);
      set((state) => ({
        tickets: response.results,
        pagination: response.pagination,
        filters: { ...state.filters, page: response.pagination.current_page },
        isLoading: false,
      }));
    } catch (error) {
      console.error("Erro ao buscar tickets:", error);
      set({
        error:
          error instanceof Error ? error.message : "Erro ao buscar os tickets",
        isLoading: false,
      });
    }
  },
  goToPage: async (page: number) => {
    set((state) => {
      if (state.pagination.last_page < page || page < 1) {
        page = 1;
      }
      set((state) => ({
        filters: { ...state.filters, page: page },
      }));

      const { fetchTickets } = get();
      fetchTickets();

      return state;
    });
  },
  nextPage: async () => {
    set((state) => {
      const nextPage = get().filters.page + 1;
      if (!state.pagination.has_next_page) {
        return state;
      }
      set((state) => ({
        filters: { ...state.filters, page: nextPage },
      }));

      const { fetchTickets } = get();
      fetchTickets();

      return state;
    });
  },
  previousPage: async () => {
    set((state) => {
      const prevPage = state.pagination.current_page - 1;
      if (!state.pagination.has_previous_page) return state;
      set((state) => ({
        filters: { ...state.filters, page: prevPage },
      }));

      const { fetchTickets } = get();
      fetchTickets();

      return state;
    });
  },
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
    const { fetchTickets } = get();
    fetchTickets();
  },
  addTicket: async (ticketData: createTicketDTO) => {
    await ticketServices
      .create(ticketData)
      .then(() => {
        toast.success("Cadastrado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Erro ao tentar cadastrar!");
      });
    const { fetchTickets } = get();
    fetchTickets();
  },

  updateTicket: (updatedTicket: Ticket) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      ),
    }));
  },
  removeTicket: (ticketId: string) => {
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== ticketId),
    }));
  },
}));
