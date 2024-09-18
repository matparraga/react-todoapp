const TaskDeleteModal = ({
  deleteModalOpen,
  closeDeleteModal,
  deleteTaskId,
  deleteTask,
}) => {
  //esta funcion handle es necesario no puedo poner directamente la funcion
  const handleDelete = () => {
    deleteTask(deleteTaskId);
    closeDeleteModal(); // Cierra el modal después de eliminar la tarea
  };

  if (!deleteModalOpen) {
    return null;
  }
  return (
    <div className="task-delete-modal-container">
      <div className="task-delete-modal">
        <div className="task-delete-modal-header">
          <h2>Eliminar tarea</h2>
          <label onClick={closeDeleteModal}>✖️</label>
        </div>
        <p>Estas seguro de eliminar la tarea?</p>
        <button onClick={handleDelete}>Aceptar</button>
        <button>Cancelar</button>
      </div>
    </div>
  );
};

export default TaskDeleteModal;
