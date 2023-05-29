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
    console.log(loggedInUserId)
    const taskId = Number(id)
    console.log(taskId)
    if (loggedInUserId && taskId) {
      await createApplication()
      navigate(`/tasks/:id/response`)
    }
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
                <button
                  className="bg-gray-400 mt-4 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  value="apply to task"
                >
                  Apply to task
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default ApplyToTask
