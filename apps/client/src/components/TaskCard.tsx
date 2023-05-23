import { Link } from "react-router-dom";
import { EmotionalTask, PhysicalTask } from "../types";
import { FC } from "react";

type TaskProps = {
  task: EmotionalTask | PhysicalTask;
};

const TaskCard: FC<TaskProps> = ({ task }) => {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {task.author.user.username}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {task.description}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {task.type}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          to={`/tasks/${task.id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Apply <span className="sr-only">, {task.description}</span>
        </Link>
      </td>
    </tr>
  );
};

export default TaskCard;
