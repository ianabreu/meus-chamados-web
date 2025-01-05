interface User {
  id: string;
  name: string;
  email: string;
}
interface CreateUserDTO extends Omit<User, "id"> {
  password: string;
}
interface AuthUserDTO extends Omit<User, "id" | "name"> {
  password: string;
}

export type { User, CreateUserDTO, AuthUserDTO };
