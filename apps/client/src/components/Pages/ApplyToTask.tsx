import { useContext, useEffect, useState } from 'react'
import Navbar from './NavBar'
import { useNavigate, useParams } from 'react-router-dom'
import { createApplication, fetchTask } from '../../lib/apiClient'
import { Task } from '../../types'
import { Link } from 'react-router-dom'
import { UserContext } from '../../lib/userContext'

const ApplyToTask = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useContext(UserContext)
  const [task, setTask] = useState<Task | null>(null)
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

  function renderApplicationButton() {
    if (!task || !user) {
      return null
    }

    console.log(task, user, 'Task and user heeeeeeeeeeeeeeeeeeeeeeeeere!')
    const isVolunteer = user.volunteer
    // const hasResponse = task.responses.some(
    //   (response) => response.responderId === user.id
    // )

    const hasAcceptedResponse = task.responses.some(
      (response) => response.responderId === task.acceptedId
    )

    if (isVolunteer) {
      return (
        <button
          className="bg-gray-400 mt-4 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value={'apply to task'}
        >
          Apply to task
        </button>
      )
    }

    if (!isVolunteer && hasAcceptedResponse) {
      const acceptedResponse = task.responses.find(
        (response) => response.responderId === task.acceptedId
      )

      if (acceptedResponse) {
        return (
          <div>
            <p>Accepted Volunteer: {acceptedResponse.responder.username}</p>
            <Link
              to={`/volunteers/${acceptedResponse.responderId}`}
              className="bg-gray-400 mt-4 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
            >
              Confirm Volunteer
            </Link>
          </div>
        )
      }
    }

    return null
  }

  return (
    <div>
      <Navbar />

      <form className="" onSubmit={handleSubmit}>
        <div className="min-h-screen min-w-screen flex flex-col justify-center">
          {!task && 'Loading task'}
          {task && (
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
                <div className="border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
                  {user?.username}
                </div>
              </div>
              <div className="flex justify-center">
                {renderApplicationButton()}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default ApplyToTask
