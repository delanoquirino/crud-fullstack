"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const Form = ({onEdit, setOnEdit, getUsers}) => {
    const {
        register,
        handleSubmit,
        formState: { errors }, setValue,reset
      } = useForm({
        resolver: zodResolver(schema),
      })

      useEffect(() => {
        if (onEdit) {
          setValue('nome', onEdit.nome);
          setValue('email', onEdit.email);
          setValue('telefone', onEdit.telefone);
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
        reset()
        setOnEdit(null);
        getUsers();
      };
    

  return (
    <form className="flex flex-col mt-6" onSubmit={handleSubmit(onSubmit)}>
      <label className="mb-1 text-lg font-medium">Nome</label>
      <Input
        type="text"
        name="nome"
        placeholder="Digite o nome completo"
        error={errors.nome?.message}
        register={register}
      />
      <section className="flex gap-2 mt-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o seu email"
            error={errors.email?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone</label>
          <Input
            type="number"
            name="telefone"
            placeholder="Exemplo DD999999999"
            error={errors.telefone?.message}
            register={register}
          />
        </div>
      </section>
      <button type="submit" className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold duration-300 opacity-70 hover:opacity-100 ">Adicionar</button>
  </form>
  );
};