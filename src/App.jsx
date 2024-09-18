import { useState } from "react";

import "./App.css";
import TaskNavbar from "./components/TaskNavbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TaskNavbar />
    </>
  );
}

export default App;
