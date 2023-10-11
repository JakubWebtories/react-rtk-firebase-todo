import "./styles/patterns/global.scss";
import "./styles/components/sidebar.scss";
import "./styles/components/container.scss";
import { Route, Routes, Router, Link } from "react-router-dom";
import { TaskList } from "./components/taskList";
import { Sidebar } from "./patterns/sidebar";
import { FormTask } from "./components/formTask";
import { EditTask } from "./components/editTask";

function App() {
  return (
    <div className="container">
      <div className="flexbox row">
        <div className="container-sidebar">
          <Sidebar />
        </div>

        <div className="container-body">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<FormTask />} />
            <Route path="/detail/:id" element={<EditTask />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
