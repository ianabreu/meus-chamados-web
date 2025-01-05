import { create } from "zustand";
import { AuthUserDTO, CreateUserDTO, User } from "../@types/User";
import { userServices } from "../services/userServices";

type AuthStore = {
  user: User | null;
  loadingAuth: boolean;
  signed: boolean;
  signUp: (credentials: CreateUserDTO) => Promise<void>;
  signIn: (credentials: AuthUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
};
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  signed: false,
  loadingAuth: false,
  signUp: async (credentials) => {
    set({ loadingAuth: true });
    await userServices.create(credentials);
    set({ loadingAuth: false });
  },
  signIn: async (credentials) => {
    set({ loadingAuth: true });
    const userData = await userServices.login(credentials);
    set({ user: userData, signed: !!userData });
    set({ loadingAuth: false });
  },
  signOut: async () => {
    set({ user: null, signed: false });
  },
}));
