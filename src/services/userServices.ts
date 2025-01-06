/* eslint-disable no-useless-catch */
import { AuthUserDTO, CreateUserDTO, User } from "../@types/User";
import { api } from "./apiConfig";

const userServices = {
  async create({ email, name, password }: CreateUserDTO): Promise<User> {
    try {
      const response = await api.post("/users", { email, name, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async login({ email, password }: AuthUserDTO): Promise<User> {
    try {
      const response = await api.post("/session", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { userServices };
