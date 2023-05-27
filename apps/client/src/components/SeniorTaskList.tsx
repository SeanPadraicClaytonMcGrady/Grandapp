import { seniorAcceptVolunteer } from '../lib/apiClient'
import { Task } from '../types'

type TaskProps = {
  tasks: Task[]
}

const SeniorTaskList: React.FC<TaskProps> = ({ tasks }) => {
  const onResponderAccepted = async (respId: number, taskId: number) => {
    await seniorAcceptVolunteer(taskId, respId)
  }

  return (
    <>
      {tasks.map((task, index) => {
        return (
          <div className="relative flex flex-row">
            <div>
              <p> Task #{index} </p>
              <p> {task.description} </p>
            </div>
            <ul>
              {/* {task.responses.map((resp) => {
                return (
                  <li key={`response-${resp.responder.id}`}>
                    <div
                      onClick={() =>
                        onResponderAccepted(resp.responder.id, resp.task.id)
                      }
                    >
                      {resp.responder.name}
                    </div>
                  </li>
                )
              })} */}
            </ul>
            <div>
              <p>{task.type}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default SeniorTaskList
