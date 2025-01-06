import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthUserDTO, CreateUserDTO, User } from "../@types/User";
import { userServices } from "../services/userServices";
import toast from "react-hot-toast";

type AuthStore = {
  user: User | null;
  loadingAuth: boolean;
  signed: boolean;
  signUp: (credentials: CreateUserDTO) => Promise<void>;
  signIn: (credentials: AuthUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      signed: false,
      loadingAuth: false,
      signUp: async (credentials) => {
        set({ loadingAuth: true });
        try {
          await userServices.create(credentials);
          toast.success("Usuário cadastrado com sucesso!");
          set({ loadingAuth: false });
        } catch (error) {
          set({ loadingAuth: false });
          throw error;
        }
      },
      signIn: async (credentials) => {
        set({ loadingAuth: true });
        try {
          const userData = await userServices.login(credentials);
          set({ user: userData, signed: !!userData, loadingAuth: false });
        } catch (error) {
          set({ loadingAuth: false });
          throw error;
        }
      },
      signOut: async () => {
        set({ user: null, signed: false });
      },
    }),
    {
      name: "@my_callings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
