import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
export const TaskTable = ({ tasks, openDeleteModal, openForm }) => {
  return (
    <table className="tasks-table">
      <thead>
        <tr>
          <th>Estado</th>
          <th>Id</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{task._id}</td>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>
              <button
                className="trash-btn"
                onClick={() => openForm(task._id, task.name, task.description)}
              >
                <FontAwesomeIcon icon={faPen} color="#0284c7" size="lg" />
              </button>
            </td>
            <td>
              <button
                className="trash-btn"
                onClick={() => openDeleteModal(task._id)}
              >
                <FontAwesomeIcon icon={faTrash} color="red" size="lg" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
