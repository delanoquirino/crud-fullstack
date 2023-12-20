"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";

const schema = z.object({
  nome: z.string().min(1, "o campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "o campo nome é obrigatório"),
  telefone: z.string().refine(
    (value) => {
      return (
        /^(?:\(d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    { message: "O numero de telefone deve estar DD999999999" }
  ),
});

export const Form = ({ onEdit, setOnEdit, getUsers, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (onEdit) {
      setValue("nome", onEdit.nome);
      setValue("email", onEdit.email);
      setValue("telefone", onEdit.telefone);
    }
  }, [onEdit]);

  const onSubmit = async (data) => {
    const { nome, email, telefone } = data;

    const user = {
      nome: nome,
      email: email,
      telefone: telefone,
    };

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    reset();
    setOnEdit(null);
    getUsers();
    handleClose();
  };

  return (
    <form className="flex flex-col mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full p-4 bg-[#435D7D] text-white flex items-center font-bold justify-center">
        <h2>Adicionar Dados</h2>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex items-center gap-4 mt-4">
          <label className="mb-1 font-medium w-[40%]">Nome</label>
          <div className="w-full">
            <Input
              type="text"
              name="nome"
              placeholder="Digite o nome completo"
              error={errors.nome?.message}
              register={register}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 ">
            <label className="mb-1 font-medium w-[40%]">Email</label>
          <div className="w-full">
            <Input
              type="email"
              name="email"
              placeholder="Digite o seu email"
              error={errors.email?.message}
              register={register}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
            <label className="mb-1 font-medium w-[40%]">Telefone</label>
          <div className="w-full">
            <Input
              type="number"
              name="telefone"
              placeholder="Exemplo DD999999999"
              error={errors.telefone?.message}
              register={register}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            type="submit"
            className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold duration-300 opacity-70 hover:opacity-100 "
          >
            Adicionar
          </button>
          <Button
            onClick={handleClose}
            className="bg-red-500 text-white my-4 px-2 h-11 rounded duration-300 opacity-70 hover:opacity-100 hover:bg-red-500"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};
