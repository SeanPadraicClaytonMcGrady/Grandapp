import TasksList from '../TasksList'
import { getRelevantTasks } from '../../lib/apiClient'
import { useState, useEffect, useContext } from 'react'
import { Task } from '../../types'
import Navbar from './NavBar'
import { UserContext } from '../../lib/userContext'
import Footer from '../Footer'

const Volunteer = () => {
  const { user } = useContext(UserContext)
  const [openTasks, setOpenTasks] = useState<Task[]>([])
  const [pendingTasks, setPendingTasks] = useState<Task[]>([])
  const [acceptedTasks, setAcceptedTasks] = useState<Task[]>([])

  const reloadTasks = async () => {
    const relevantTasks = await getRelevantTasks()
    setOpenTasks(relevantTasks.openTasks)
    setPendingTasks(relevantTasks.pendingTasks)
    setAcceptedTasks(relevantTasks.acceptedTasks)
  }

  useEffect(() => {
    reloadTasks()
  }, [])

  return (
    <>
      <Navbar />
      <div className="ml-8">
        <h1>{`Hi, ${user?.username}!`}</h1>
      </div>
      {acceptedTasks.length > 0 && (
        <div>
          <div className="px-4 sm:px-6 lg:px-8 mt-5">
            Get ready! Here are your upcoming tasks
          </div>
          <TasksList tasks={acceptedTasks} user={user} />
        </div>
      )}
      {pendingTasks.length > 0 && (
        <div>
          <div className="px-4 sm:px-6 lg:px-8 mt-5">
            You've applied, we're just waiting for a response
          </div>
          <TasksList tasks={pendingTasks} user={user} />
        </div>
      )}
      {openTasks.length > 0 && (
        <div>
          <div className="px-4 sm:px-6 lg:px-8 mt-5 mb-4">
            Would you like to help any of these Seniors?
          </div>
          <TasksList tasks={openTasks} user={user} />
        </div>
      )}
      <div className="mt-4">
        <Footer />
      </div>
    </>
  )
}

export default Volunteer
