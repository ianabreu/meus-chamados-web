interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
}
interface CreateUserDTO extends Pick<User, "email" | "name"> {
  password: string;
}
interface AuthUserDTO extends Pick<User, "email"> {
  password: string;
}

export type { User, CreateUserDTO, AuthUserDTO };
