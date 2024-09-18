import "./App.css";
import { useState, useEffect } from "react";
import TaskNavbar from "./components/TaskNavbar";
import { TaskTable } from "./components/TaskTable";
import TaskForm from "./components/taskForm";
import TaskDeleteModal from "./components/taskDeleteModal";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState("");

  const openForm = (id = null, name = "", description = "") => {
    if (id) {
      // Si hay un id, se trata de una edición
      setTaskToEdit({ _id: id, name, description });
    } else {
      // Si no hay id, se trata de una nueva tarea
      setTaskToEdit(null);
    }
    setFormOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setDeleteTaskId(id);
  };

  const closeForm = () => {
    setFormOpen(false);
    setTaskToEdit(null); // Restablece la tarea a editar al cerrar el formulario
  };

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  async function addNewTask(name, description, done) {
    // Función para agregar una nueva tarea
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, done }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setTasks([...tasks, result]);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTask(taskId, updatedTask) {
    // Función para actualizar una tarea
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error(`Error al actualizar la tarea: ${response.statusText}`);
      }
      const updatedTaskData = await response.json();
      setTasks(
        tasks.map((task) => (task._id === taskId ? updatedTaskData : task))
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(taskId) {
    // Función para eliminar una tarea
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error al eliminar la tarea: ${response.statusText}`);
      }
      setTasks((tasks) => tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log(error);
    }
    closeForm();
  }

  return (
    <TaskNavbar>
      <div className="general-container">
        <div className="table-container">
          <button className="btn-newTask" onClick={() => openForm()}>
            Agregar tarea
          </button>
          <TaskTable
            tasks={tasks}
            openDeleteModal={openDeleteModal}
            openForm={openForm}
          />

          <TaskForm
            formOpen={formOpen}
            addNewTask={addNewTask}
            closeForm={closeForm}
            updateTask={updateTask}
            taskToEdit={taskToEdit} // Pasar la tarea a editar
          />

          <TaskDeleteModal
            deleteModalOpen={deleteModalOpen}
            closeDeleteModal={closeDeleteModal}
            deleteTask={deleteTask}
            deleteTaskId={deleteTaskId}
          />
        </div>
      </div>
    </TaskNavbar>
  );
}

export default App;
