import { FC, useEffect, useState } from "react";
import Navbar from "./NavBar";
import { useParams } from "react-router-dom";
import { fetchTask } from "../../lib/apiClient";
import { Task, Volunteer } from "../../types";
import { Link } from "react-router-dom";

const ApplyToTask = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    const taskId = Number(id);
    if (!isNaN(taskId)) {
      fetchTask(taskId).then((individualTask) => {
        setTask(individualTask);
      });
    }
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <form className="">
        <div className="min-h-screen min-w-screen flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="flex justify-center font-bold text-xl mb-2">
              Apply to task
            </h2>
            <div className="block mb-2">
              <div className="border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                {task.type}
              </div>
              <div className="border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                {task.author.user.username}
              </div>
              <div className="border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                {task.scheduledDate}
              </div>
              <div className="border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                {task.description}
              </div>
              <div className="border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                {task.location}
              </div>
            </div>
            <div className="flex justify-center">
              <Link to={`/tasks/${id}/applied`}>
                <button
                  className="bg-gray-400 mt-4 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  value="apply to task"
                >
                  Apply to task
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplyToTask;
