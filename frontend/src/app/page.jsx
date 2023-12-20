"use client";
import { useEffect, useState } from "react";
import NestedModal from "./components/UserRegistration";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { UserCard } from "./components/UserCard";
import UserRegistration from "./components/UserRegistration";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers([...res.data].sort((a, b) => a.nome.localeCompare(b.nome)));
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      toast.error(`Erro ao obter usuários: ${error.message}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <main className="min-h-screen items-center justify-between bg-gray-400">
      <div className="container mx-auto p-4">
        <section className="flex w-full p-4 bg-[#435D7D] justify-between items-center">
          <h1 className="font-bold text-xl text-center text-white">
            Cadastro de Usuários
          </h1>
          <UserRegistration
            getUsers={getUsers}
            onEdit={onEdit}
            setOnEdit={setOnEdit}
          />
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <UserCard users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
        </section>
        <ToastContainer
          autoClose={1000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
      </div>
    </main>
  );
}
