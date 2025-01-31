import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import Section from "../../components/Section";
import "./styles-dashboard.css";
import Modal from "../../components/Modal";
import { useState } from "react";
import NewCalling from "../../components/NewCalling";
import { useTicketStore } from "../../store/tickets";
import Pagination from "../../components/Pagination";
import { Loading } from "../../components/Loading";

export default function Dashboard() {
  const [isOpen, setOpen] = useState(false);
  const { tickets, isLoading, filters, setFilters, goToPage, pagination } =
    useTicketStore();

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Title icon={<FiMessageSquare size={25} />}>Atendimentos</Title>
      {isLoading ? (
        <Loading message="Carregando atendimentos" />
      ) : tickets.length === 0 ? (
        <Section>
          <div className="empty">
            <span>Nenhum atendimento registrado...</span>
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="dashboard-new-btn"
            >
              <FiPlus size={25} /> Novo Atendimento
            </button>
          </div>
        </Section>
      ) : (
        <>
          <div className="dashboard-new-area">
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="dashboard-new-btn"
            >
              <FiPlus size={25} /> Novo Atendimento
            </button>
          </div>
          <Section>
            <table>
              <caption>Lista de Atendimentos</caption>
              <thead>
                <tr>
                  <th scope="col" colSpan={2}>
                    Cliente
                  </th>
                  <th scope="col">CNPJ</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastro</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tickets &&
                  tickets.map((item, index) => (
                    <tr key={index}>
                      <td data-label="Cliente" colSpan={2}>
                        {item.customer.tradeName}
                      </td>
                      <td data-label="CNPJ">{item.customer.cnpj}</td>
                      <td data-label="Assunto">{item.topic}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{ backgroundColor: "#999" }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastro">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td data-label="">
                        <button
                          className="action"
                          style={{ backgroundColor: "#3583f6" }}
                        >
                          <FiSearch size={17} />
                        </button>
                        <button
                          className="action"
                          style={{ backgroundColor: "#f6a935" }}
                        >
                          <FiEdit2 size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div>
              <Pagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                onPageChange={goToPage}
                itemPerPage={filters.limit}
                orderBy={filters.order_by}
                order={filters.order || "desc"}
                onLimitChange={(limit) => setFilters({ limit })}
                onOrderingChange={(order_by) => setFilters({ order_by })}
                onChangeOrder={(order) => {
                  setFilters({ order });
                }}
              />
            </div>
          </Section>
          <Modal isOpen={isOpen} title="Novo chamado" onClose={closeModal}>
            <NewCalling onClose={closeModal} />
          </Modal>
        </>
      )}
    </>
  );
}
