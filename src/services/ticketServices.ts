/* eslint-disable no-useless-catch */
import { PaginationResult, queryParamsProps } from "../@types/Pagination";
import { createTicketDTO, Ticket } from "../@types/Ticket";
import { api } from "./apiConfig";

const ticketServices = {
  async create(data: createTicketDTO): Promise<Ticket> {
    try {
      const response = await api.post("/tickets", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async get(queryParams: queryParamsProps): Promise<PaginationResult<Ticket>> {
    try {
      const response = await api.get(`/tickets`, {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getById(ticketId: string): Promise<Ticket> {
    try {
      const response = await api.get(`/tickets/${ticketId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { ticketServices };
