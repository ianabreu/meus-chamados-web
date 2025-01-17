import { FiUser } from "react-icons/fi";
import Title from "../../components/Title";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cnpjMask } from "../../utils/masks/cnpj";
import { createCustomerDTO } from "../../@types/Customer";
import { createCustomerSchema } from "../../schemas/Customer/createCustomerSchema";
import { customerServices } from "../../services/customerServices";
import { useState } from "react";
import toast from "react-hot-toast";
import Section from "../../components/Section";
import "./styles-customers.css";

export default function Customers() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<createCustomerDTO>({
    resolver: zodResolver(createCustomerSchema),
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<createCustomerDTO> = (data) => {
    setLoading(true);
    customerServices
      .create(data)
      .then(() => {
        toast.success("Cliente cadastrado com sucesso.");
        reset();
      })
      .catch((e) => {
        if (e instanceof Error) {
          if (e.message === "CNPJ já cadastrado.") {
            setError("cnpj", { message: e.message });
          } else {
            toast.error(e.message);
          }
        } else {
          toast.error("Erro ao cadastrar cliente");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Title icon={<FiUser size={25} />}>Clientes</Title>
      <Section>
        <form
          className="customers-form-content"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Razão Social"
            placeholder="Digite o nome do cliente"
            id="companyName"
            error={errors.companyName?.message}
            {...register("companyName", { required: true })}
          />
          <Input
            label="Nome Fantasia"
            placeholder="Digite o nome do cliente"
            id="tradeName"
            error={errors.tradeName?.message}
            {...register("tradeName", { required: true })}
          />
          <Input
            label="CNPJ"
            placeholder="Digite o CNPJ"
            id="cnpj"
            mask={cnpjMask}
            error={errors.cnpj?.message}
            {...register("cnpj", { required: true })}
          />
          <Input
            label="Endereço"
            placeholder="Digite o endereço"
            id="address"
            error={errors.address?.message}
            {...register("address", { required: true })}
          />
          <Button type="submit" loading={loading}>
            Cadastrar
          </Button>
        </form>
      </Section>
    </>
  );
}
