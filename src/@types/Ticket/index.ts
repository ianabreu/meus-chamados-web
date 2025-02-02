import { Customer } from "../Customer";

export type createTicketDTO = {
  complement: string;
  customerId: string;
  status: string;
  topic: string;
};

export interface Ticket {
  id: string;
  topic: TOPIC;
  complement?: string;
  status: STATUS;
  customerId: string;
  userId: string;
  created_at: string;
  updated_at: string;
  customer: Customer;
}

export type STATUS = "Aberto" | "Atendido" | "Progresso";
export type TOPIC = "Suporte" | "Financeiro" | "Visita Técnica";
