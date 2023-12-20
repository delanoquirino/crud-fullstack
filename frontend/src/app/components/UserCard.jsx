import axios from "axios";
import { toast } from "react-toastify";

import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEditUser } from "../context/Context";

export const UserCard = ({ users, setUsers, setOnEdit }) => {
  const { setSelectedUser } = useEditUser();
  const handleEdit = (item) => {
    setOnEdit(item);
    setSelectedUser(true)
  };


  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <>
      {users.map((item, i) => (
        <motion.article
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          key={i}
          className="flex justify-between bg-white border-2 p-2 rounded-lg hover:scale-105 duration-300 opacity-70 hover:opacity-100"
        >
          <div>
            <h2>
              <strong>Nome:</strong> {item.nome}
            </h2>
            <p>
              <strong>Email:</strong> {item.email}
            </p>
            <p>
              <strong>Telefone:</strong> {item.telefone}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleDelete(item.id)}
              
            >
              <FaTrash />
            </button>
            <button
              onClick={() => handleEdit(item)}
             
            >
              <FaEdit />
            </button>
          
          </div>
        </motion.article>
      ))}
    </>
  );
};
