import { z } from "zod";

export const createCustomerSchema = z.object({
  companyName: z.string().nonempty("Razão social é obrigatória"),
  tradeName: z.string().nonempty("Nome fantasia é obrigatório"),
  cnpj: z
    .string()
    .nonempty("CNPJ obrigatório")
    .min(18, { message: "CNPJ inválido" }),
  address: z.string().nonempty("Endereço obrigatório"),
});
