/* eslint-disable no-useless-catch */
import { createCustomerDTO, Customer } from "../@types/Customer";
import { queryParamsProps } from "../@types/Pagination";
import { api } from "./apiConfig";

const customerServices = {
  async create(data: createCustomerDTO): Promise<Customer> {
    try {
      const response = await api.post("/customers", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async get(queryParams: queryParamsProps): Promise<Customer[]> {
    try {
      const response = await api.get(`/customers`, {
        params: queryParams,
      });
      return response.data.results;
    } catch (error) {
      throw error;
    }
  },
};

export { customerServices };
