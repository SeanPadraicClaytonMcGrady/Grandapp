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
        <div className="ml-8 mt-5 font-bold text-xl">
          <h1>{`Hi, ${user?.username}!`}</h1>
        </div>
        {acceptedTasks?.length > 0 && (
          <div>
            <div className="px-4 sm:px-6 lg:px-8 mt-5">Confirmed tasks</div>
            <TasksList tasks={acceptedTasks} user={user} />
          </div>
        )}
        {pendingTasks?.length > 0 && (
          <div>
            <div className="px-4 sm:px-6 lg:px-8 mt-5">
              You've got applicants, please see if you'd like to confirm any!
            </div>
            <TasksList tasks={pendingTasks} user={user} />
          </div>
        )}
        {openTasks?.length > 0 && (
          <div>
            <div className="px-4 sm:px-6 lg:px-8 mt-5">
              There aren't any applicants for these tasks yet, we'll let you
              know when someone applies!
            </div>
            <TasksList tasks={openTasks} user={user} />
          </div>
        )}
        <div className="flex justify-center mt-5">
          <NewTaskForm />
        </div>
        <Footer />
      </div>
    </>
  )
}
export default Senior
