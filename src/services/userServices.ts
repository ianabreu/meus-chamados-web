/* eslint-disable no-useless-catch */
import { AuthUserDTO, CreateUserDTO, User } from "../@types/User";
import { api } from "./apiConfig";
interface LoginProps {
  user: User;
  token: string;
}

const userServices = {
  async create({ email, name, password }: CreateUserDTO): Promise<User> {
    try {
      const response = await api.post("/users", { email, name, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async login({ email, password }: AuthUserDTO): Promise<LoginProps> {
    try {
      const response = await api.post("/session", { email, password });
      const {
        id,
        name,
        avatar_url,
        token,
        email: emailResponse,
      } = response.data as {
        id: string;
        name: string;
        email: string;
        avatar_url: string;
        token: string;
      };
      return { user: { id, email: emailResponse, name, avatar_url }, token };
    } catch (error) {
      throw error;
    }
  },
  async getUser(): Promise<User> {
    try {
      const response = await api.get("/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export { userServices };
