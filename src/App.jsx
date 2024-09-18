import "./App.css";
import { useState, useEffect } from "react";
import TaskNavbar from "./components/TaskNavbar";
import { TaskTable } from "./components/TaskTable";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openForm = () => {
    setFormOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeleteModalOpen(true);
  };

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
        </div>
      </div>
    </TaskNavbar>
  );
}

export default App;
