import { AuthUserDTO, CreateUserDTO, User } from "../@types/User";
import { api } from "./apiConfig";

const userServices = {
  async create({ email, name, password }: CreateUserDTO): Promise<User> {
    const response = await api.post("/users", { email, name, password });
    return response.data;
  },
  async login({ email, password }: AuthUserDTO): Promise<User> {
    const response = await api.post("/session", { email, password });
    return response.data;
  },
};

export { userServices };
