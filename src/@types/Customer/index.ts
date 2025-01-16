import { z } from "zod";
import { createCustomerSchema } from "../../schemas/Customer/createCustomerSchema";

export type createCustomerDTO = z.infer<typeof createCustomerSchema>;

export interface Customer extends createCustomerDTO {
  id: string;
  userId: string;
}
