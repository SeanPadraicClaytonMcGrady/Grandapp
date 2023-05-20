import TasksList from "../TasksList";
import { useState, useEffect } from "react";
import { Task } from "../../types";
import {
  fetchEmotionalTasks,
  fetchPhysicalTasks,
  fetchSeniors,
} from "../../lib/apiClient";
import NewTaskForm from "../NewTaskForm";
import { getRelevantTasks } from "../../lib/apiClient";

const [emotionalTasks, setEmotionalTasks] = useState([]);
const [physicalTasks, setPhysicalTasks] = useState([]);
const [seniors, setSeniors] = useState([]);

const reloadEmotionalTasks = () => {
  fetchEmotionalTasks().then((emotionalTasks) =>
    setEmotionalTasks(emotionalTasks)
  );
};
const reloadPhysicalTasks = () => {
  fetchPhysicalTasks().then((physicalTasks) => setPhysicalTasks(physicalTasks));
};
const reloadSeniors = () => {
  fetchSeniors().then((seniors) => setSeniors(seniors));
};
useEffect(() => {
  reloadEmotionalTasks();
  reloadPhysicalTasks();
  reloadSeniors();
}, []);

const Senior = () => {
  const [openTasks, setOpenTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [acceptedTasks, setAcceptedTasks] = useState<Task[]>([]);

  const reloadTasks = async () => {
    const relevantTasks = await getRelevantTasks();
    setOpenTasks(relevantTasks.openTasks);
    setPendingTasks(relevantTasks.pendingTasks);
    setAcceptedTasks(relevantTasks.acceptedTasks);

    //We have openTasks and pendingTasks. We need to make an option for seniors to click accept volunteer.
    //Seniors should click a button from the TaskCard for a pop-up. They should then see volunteers and click one
    //for acceptance.
  };

  useEffect(() => {
    reloadTasks();
  }, []);

  return (
    <>
      <TasksList tasks={openTasks} />
      <TasksList tasks={pendingTasks} />
      <TasksList tasks={acceptedTasks} />
      <NewTaskForm
        onEmotionalTaskCreated={() => reloadEmotionalTasks()}
        onPhysicalTaskCreated={() => reloadPhysicalTasks()}
      />
    </>
  );
};

export default Senior;
