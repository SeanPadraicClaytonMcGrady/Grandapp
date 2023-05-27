import TasksList from '../TasksList'
import { getRelevantTasks } from '../../lib/apiClient'
import { useState, useEffect, useContext } from 'react'
import { Task } from '../../types'
import NewTaskForm from '../NewTaskForm'
import Navbar from './NavBar'
import { UserContext } from '../../lib/userContext'
import SeniorTaskList from '../SeniorTaskList'

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
      <h1>{`Hi, ${user?.username}!`}</h1>
      {acceptedTasks?.length > 0 && <SeniorTaskList tasks={acceptedTasks} />}
      {pendingTasks?.length > 0 && <SeniorTaskList tasks={pendingTasks} />}
      {openTasks?.length > 0 && <SeniorTaskList tasks={openTasks} />}
      <div className="flex justify-center">
        <NewTaskForm
          onEmotionalTaskCreated={(task) => {
            setOpenTasks((prev) => [task, ...prev])
          }}
          onPhysicalTaskCreated={(task) => {
            setOpenTasks((prev) => [task, ...prev])
          }}
        />
      </div>
    </>
  )
}

export default Senior
