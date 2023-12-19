import { Form } from "./Form";

export const AddUser = ({ getUsers, onEdit, setOnEdit }) => {
  return (
    <main className="flex flex-col mt-9 mb-2">
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
    </main>
  );
};