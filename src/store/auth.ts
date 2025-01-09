import { create } from "zustand";
import { AuthUserDTO, CreateUserDTO, User } from "../@types/User";
import { userServices } from "../services/userServices";
import toast from "react-hot-toast";
import { api } from "../services/apiConfig";

type AuthStore = {
  user: User | null;
  loadingAuth: boolean;
  signed: boolean;
  signUp: (credentials: CreateUserDTO) => Promise<void>;
  signIn: (credentials: AuthUserDTO) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  signed: false,
  loadingAuth: true,
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
      const { user, token } = await userServices.login(credentials);

      set({ user: user, signed: !!user, loadingAuth: false });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("@access_token", token);
    } catch (error) {
      localStorage.removeItem("@access_token");
      api.defaults.headers.common["Authorization"] = undefined;
      set({ loadingAuth: false, user: null, signed: false });
      throw error;
    }
  },
  signOut: async () => {
    try {
      localStorage.removeItem("@access_token");
      api.defaults.headers.common["Authorization"] = "";
      set({ loadingAuth: false, user: null, signed: false });
    } catch (error) {
      console.log("Erro ao deslogar: ", error);
    }
  },
  checkAuth: async () => {
    const token = localStorage.getItem("@access_token");
    set({ loadingAuth: true });
    if (token) {
      try {
        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data as User;
        set({ user: user, signed: true, loadingAuth: false });
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (e) {
        console.log(e);
        set({ user: null, signed: false, loadingAuth: false });
        api.defaults.headers.common["Authorization"] = undefined;
      }
    }
    set({ loadingAuth: false });
  },
}));
