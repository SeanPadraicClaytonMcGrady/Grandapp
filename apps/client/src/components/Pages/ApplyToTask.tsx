import { useContext, useEffect, useState } from 'react'
import Navbar from './NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import {
  acceptResponse,
  createApplication,
  fetchTask,
} from '../../lib/apiClient'
import { Task } from '../../types'
import { Link } from 'react-router-dom'
import { UserContext } from '../../lib/userContext'
import Footer from '../Footer'
import ExactLocation from '../ExactLocation'
import background from '../Assets/background.jpg'
import { User } from '../../types'

const ApplyToTask = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useContext(UserContext)
  const [task, setTask] = useState<Task | null>(null)
  const [selectedResponders, setSelectedResponders] = useState<number[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const taskId = Number(id)
    if (taskId !== null) {
      fetchTask(taskId).then(setTask)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const loggedInUserId = user?.id
    const taskId = Number(id)
    if (loggedInUserId && taskId) {
      await createApplication(taskId)
      navigate(`/tasks/${id}/response`)
    }
  }

  function handleSelectResponder(responderId: number) {
    setSelectedResponders((prevSelectedResponders) => {
      if (prevSelectedResponders.includes(responderId)) {
        return prevSelectedResponders.filter((id) => id !== responderId)
      } else {
        return [...prevSelectedResponders, responderId]
      }
    })
  }

  function renderApplicationButton() {
    if (!task || !user) {
      return null
    }

    const isVolunteer = user.volunteer
    const hasSelfResponse = task.responses.some(
      (response) => response.responderId === user.id
    )

    const taskHasAcceptedResponse = task.acceptedId !== null

    //This button is for volunteers applying to a task with other volunteers.
    if (isVolunteer && !hasSelfResponse) {
      return (
        <button
          className="bg-teal-400 mt-4 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value={'apply to task'}
        >
          Apply to task
        </button>
      )
    }

    //Senior view accepted & confirmed task.
    if (!isVolunteer && taskHasAcceptedResponse) {
      const acceptedResponse = task.responses.find(
        (response) => response.responderId == task.acceptedId
      )

      if (acceptedResponse) {
        return (
          <div>
            <p>
              Accepted Volunteer(s): {acceptedResponse.responder.user.username}
            </p>
          </div>
        )
      }
    }

    // Volunteer and Senior see this section when:
    // - They are a volunteer or senior user
    // - The task has not accepted any response or they are not the accepted volunteer
    // - This is a pending task (Volunteer has responded, but Senior has not accepted)

    return (
      <div>
        {user.senior && <h2>Responders:</h2>}
        {task.responses.map((response) => (
          <div className="flex" key={response.responderId}>
            {user.senior && (
              <input
                className="flex-initial"
                type="checkbox"
                checked={selectedResponders.includes(response.responderId)}
                onChange={() => handleSelectResponder(response.responderId)}
              />
            )}
            <span className="flex-1 px-1">
              {response.responder.user?.username}
            </span>
          </div>
        ))}
        {user.senior && (
          <button
            className="bg-gray-400 mt-4 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
            type="submit"
            value={'confirm volunteer'}
            disabled={selectedResponders.length === 0}
            onClick={handleAccept}
          >
            Accept Volunteers
          </button>
        )}
      </div>
    )
  }

  async function handleAccept() {
    try {
      const taskId = Number(id)
      await acceptResponse(taskId, selectedResponders)
      navigate(`/tasks/${id}`)
    } catch (error) {
      throw error
    }
  }

  return (
    <div>
      <Navbar />
      <div
        className="w-full"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <form className="" onSubmit={handleSubmit}>
          <div className="min-h-screen min-w-screen flex flex-col justify-center">
            {!task && 'Loading task'}
            {task && (
              <div className="max-w-md w-full mx-auto">
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-lg">
                  <h2 className="flex justify-center font-bold text-xl mb-2 text-gray-500">
                    Task Overview
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
                    <div className="border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                      <ExactLocation address={task.location} />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    {renderApplicationButton()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default ApplyToTask
