import "./styles-ticket-details.css";
import { Ticket } from "../../@types/Ticket";
import { Badge } from "../Badge";

export default function TicketDetails({ ticket }: { ticket: Ticket }) {
  return (
    <div className="ticket-container">
      <fieldset className="ticket-fieldset">
        <legend>Cliente</legend>
        <div className="ticket-row">
          <span className="label">Razão Social</span>
          <span className="value">{ticket.customer.companyName}</span>
        </div>
        <div className="ticket-row">
          <span className="label">CNPJ</span>
          <span className="value">{ticket.customer.cnpj}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Nome fantasia</span>
          <span className="value">{ticket.customer.tradeName}</span>
        </div>
        <div className="ticket-row">
          <span className="label">Endereço</span>
          <span className="value">{ticket.customer.address}</span>
        </div>
      </fieldset>

      <fieldset className="ticket-fieldset">
        <legend>Informações do Chamado</legend>
        <div className="ticket-row">
          <span className="label">Assunto</span>
          <span>{ticket.topic}</span>
        </div>

        <div className="ticket-row">
          <span className="label">Status</span>
          <Badge
            action={
              ticket.status === "Aberto"
                ? "success"
                : ticket.status === "Progresso"
                ? "warning"
                : "default"
            }
          >
            {ticket.status}
          </Badge>
        </div>
        <div className="ticket-row">
          <span className="label">Cadastrado em</span>
          <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
        </div>

        {ticket.complement && (
          <div className="ticket-row large-text">
            <span className="label">Complemento</span>
            <span>{ticket.complement}</span>
          </div>
        )}
      </fieldset>
    </div>
  );
}
