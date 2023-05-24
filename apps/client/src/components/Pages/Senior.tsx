import TasksList from "../TasksList";
import { getRelevantTasks } from "../../lib/apiClient";
import { useState, useEffect } from "react";
import { Task } from "../../types";
import NewTaskForm from "../NewTaskForm";
import Navbar from "./NavBar";

const Senior = () => {
  const [openTasks, setOpenTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [acceptedTasks, setAcceptedTasks] = useState<Task[]>([]);

  const reloadTasks = async () => {
    const relevantTasks = await getRelevantTasks();
    setOpenTasks(relevantTasks.openTasks);
    setPendingTasks(relevantTasks.pendingTasks);
    setAcceptedTasks(relevantTasks.acceptedTasks);
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  return (
    <>
      <Navbar />
      <TasksList tasks={acceptedTasks} />
      <TasksList tasks={pendingTasks} />
      <TasksList tasks={openTasks} />
      <div className="flex justify-center">
        <NewTaskForm />
      </div>
    </>
  );
};

export default Senior;
