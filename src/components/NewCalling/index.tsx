import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import { Select } from "../Select";
import "./styles-new-ticket.css";
import { createTicketDTO, STATUS, TOPIC } from "../../@types/Ticket";
import { useTicketStore } from "../../store/tickets";
import { customerServices } from "../../services/customerServices";
import { Customer } from "../../@types/Customer";
import { ticketServices } from "../../services/ticketServices";

interface ErrorMap {
  customer?: string;
  topic?: string;
}
interface NewTicketProps {
  id: string | null;
  onClose: () => void;
}
export default function NewTicket({ onClose, id }: NewTicketProps) {
  const { addTicket, updateTicket } = useTicketStore();
  useEffect(() => {
    if (id) {
      ticketServices.getById(id).then((ticket) => {
        setTopic(ticket.topic);
        setStatus(ticket.status);
        setComplement(ticket.complement || "");
        setSelectedCustomerId(ticket.customer.id);
        setInputValue(ticket.customer.tradeName);
      });
    }
  }, [id]);

  const [inputValue, setInputValue] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const [topic, setTopic] = useState<TOPIC | "">("");
  const [status, setStatus] = useState<STATUS>("Aberto");
  const [complement, setComplement] = useState("");

  const [error, setError] = useState<ErrorMap>({});

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.value as STATUS);
  }
  function handleChangeSelectedTopic(e: ChangeEvent<HTMLSelectElement>) {
    setTopic(e.target.value as TOPIC);
    setError((prev) => ({ ...prev, topic: undefined }));
  }
  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let hasError = false;
    setError({});

    if (!selectedCustomerId || selectedCustomerId === "") {
      setError((prev) => ({ ...prev, customer: "Cliente não encontrado" }));
      hasError = true;
    }
    if (
      topic !== "Suporte" &&
      topic !== "Financeiro" &&
      topic !== "Visita Técnica"
    ) {
      setError((prev) => ({ ...prev, topic: "Selecione um assunto" }));
      hasError = true;
    }
    if (hasError) return;

    const newTicket: createTicketDTO = {
      complement,
      topic,
      status,
      customerId: selectedCustomerId,
    };
    if (id) {
      await updateTicket({
        id,
        complement,
        customerId: selectedCustomerId,
        status,
        topic,
      });
    } else {
      //criando novo
      await addTicket(newTicket);
    }

    onClose();
  }

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);

    if (value.length < 3) return;

    const filtered = await customerServices.get({
      search: value,
      page: 1,
    });
    setFilteredCustomers(filtered);
    const matchedCustomer = filtered.find(
      (customer) => customer.tradeName.toLowerCase() === value.toLowerCase()
    );
    setSelectedCustomerId(matchedCustomer ? matchedCustomer.id : "");
  };
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const tradeName = e.target.value;
    if (tradeName.length < 3) return;
    const customer = filteredCustomers.find((c) => c.tradeName === tradeName);

    if (customer) {
      setSelectedCustomerId(customer.id);
    } else {
      setSelectedCustomerId("");
    }
    setInputValue(tradeName);
  };
  return (
    <form className="new-form" onSubmit={handleRegister}>
      <div className="select-content">
        <label htmlFor="customer" className="select-label">
          Cliente
        </label>
        <input
          id="customer"
          type="text"
          list="customer-options"
          value={inputValue}
          onChange={handleInputChange}
          onInput={handleSelect}
          placeholder="Digite para filtrar..."
          className={`select-area ${error.customer ? "container-error" : ""}`}
        />
        <datalist id="customer-options">
          {filteredCustomers.length > 0 &&
            filteredCustomers.map((customer) => (
              <option
                className="select-option"
                key={customer.id}
                value={customer.tradeName}
              />
            ))}
        </datalist>
        {error.customer && <span className="error">{error.customer}</span>}
      </div>
      <Select
        label="Assunto"
        value={topic}
        onChange={handleChangeSelectedTopic}
        options={["Suporte", "Visita Técnica", "Financeiro"]}
        getOptionLabel={(item) => item}
        getOptionValue={(item) => item}
        id="topic"
        name="topic"
        error={error.topic}
      />
      <label className="status-label" htmlFor="status">
        Status
      </label>
      <div className="status-area">
        <div className="status-input-area">
          <input
            type="radio"
            name="radio"
            value={"Aberto"}
            className="status-input"
            onChange={handleOptionChange}
            checked={status === "Aberto"}
          />
          <span className="status-text">Aberto</span>
        </div>
        <div className="status-input-area">
          <input
            type="radio"
            name="radio"
            value={"Progresso"}
            className="status-input"
            onChange={handleOptionChange}
            checked={status === "Progresso"}
          />
          <span className="status-text">Em Progresso</span>
        </div>
        <div className="status-input-area">
          <input
            type="radio"
            name="radio"
            value={"Atendido"}
            className="status-input"
            onChange={handleOptionChange}
            checked={status === "Atendido"}
          />
          <span className="status-text">Atendido</span>
        </div>
      </div>
      <div className="complement-area">
        <label htmlFor="complemento" className="status-label">
          Complemento
        </label>
        <textarea
          id="complemento"
          name="complement"
          placeholder="Descreva seu problema (opcional)"
          value={complement}
          onChange={(e) => setComplement(e.target.value)}
        />
      </div>
      <Button type="submit">{id ? "Editar" : "Salvar"}</Button>
    </form>
  );
}
