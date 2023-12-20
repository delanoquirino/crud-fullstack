import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Form } from "./Form";
import { useEditUser } from "../context/Context";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 2,
};

export default function UserRegistration({ getUsers, onEdit, setOnEdit }) {
  const { selectedUser, setSelectedUser } = useEditUser();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (selectedUser === true) {
      setOpen(true);
      setSelectedUser(false);
    }
  }, [selectedUser]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className="bg-[#5CB85C] hover:bg-[#5CB85C] text-xs text-white font-bold opacity-80 hover:opacity-100"
      >
        Criar Usuário
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "100%",
            maxWidth: "500px",
            margin: "auto",
            "@media (max-width: 600px)": {
              width: "100%", // Altere o tamanho do modal para telas menores
            },
          }}
        >
          <Form
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getUsers={getUsers}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
