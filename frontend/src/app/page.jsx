"use client"
import { useEffect, useState } from "react";
import { AddUser } from "./components/AddUser";
import { UserCard } from "./components/UserCard";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null)

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
    getUsers()
  },[setUsers])

  return (
   <main className="min-h-screen items-center justify-between bg-gray-400">
      <div className="container mx-auto p-4">
      <h1 className="font-bold text-xl text-center">Crud</h1>
    <section>
      <AddUser onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
    </section>
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
     <UserCard users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
    </section>
    <ToastContainer
          autoClose={1000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
      </div>
   </main>
  )
}
