import { useEffect, useState } from "react";

const TaskForm = ({
  formOpen,
  addNewTask,
  closeForm,
  updateTask,
  taskToEdit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
      setId(taskToEdit._id);
    } else {
      setName("");
      setDescription("");
      setId("");
    }
  }, [taskToEdit]);

  function handlerSubmit(e) {
    e.preventDefault();

    if (taskToEdit) {
      updateTask(id, { name, description });
    } else {
      addNewTask(name, description, false);
    }

    closeForm();
  }

  if (!formOpen) {
    return null;
  }

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handlerSubmit}>
        <div className="task-form-header">
          <h2>{taskToEdit ? "Actualizar tarea" : "Crear nueva tarea"}</h2>
          <label onClick={closeForm}>✖️</label>
        </div>
        <label>Id</label>
        <input type="text" value={id} readOnly />

        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Descripción</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="task-form-btn" type="submit">
          {taskToEdit ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
