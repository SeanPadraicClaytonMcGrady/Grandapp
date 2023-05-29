import TasksList from '../TasksList'
import { getRelevantTasks } from '../../lib/apiClient'
import { useState, useEffect, useContext } from 'react'
import { Task } from '../../types'
import NewTaskForm from '../NewTaskForm'
import Navbar from './NavBar'
import { UserContext } from '../../lib/userContext'
import Footer from '../Footer'
import backgroundgrind from '../assets/backgroundgrind.jpg'

const Senior = () => {
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
      <div
        className=""
        // style={{
        //   backgroundImage: `url(${backgroundgrind})`,
        //   backgroundSize: 'cover',
        //   backgroundRepeat: 'no-repeat',
        // }}
      >
        <div className="ml-8">
          <h1>{`Hi, ${user?.username}!`}</h1>
        </div>
        {acceptedTasks?.length > 0 && (
          <TasksList tasks={acceptedTasks} user={user} />
        )}
        {pendingTasks?.length > 0 && (
          <TasksList tasks={pendingTasks} user={user} />
        )}
        {openTasks?.length > 0 && <TasksList tasks={openTasks} user={user} />}
        <div className="flex justify-center p-6">
          <NewTaskForm />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Senior
