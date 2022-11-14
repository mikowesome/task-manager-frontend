import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskInfo from "./components/TaskInfo";
import TaskList from "./components/TaskList";
import { useTasksContext } from "./hooks/useTasksContext";
import loadingImage from "./assets/images/loader.gif"

function App() {
  const { isLoading } = useTasksContext()

  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <TaskForm />
        <TaskInfo />
        {
          isLoading && <div className="loader">
            <img src={loadingImage} alt="loading gif" />
          </div>
        }
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
