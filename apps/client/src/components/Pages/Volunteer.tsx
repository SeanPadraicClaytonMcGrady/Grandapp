import TasksList from '../TasksList'
import { getRelevantTasks } from '../../lib/apiClient'
import { useState, useEffect } from 'react'
import { Task } from '../../types'
import Navbar from './NavBar'

// List
// 1. Tasks that haven't been responded to
// 2. Tasks that I have responded but not accepted yet
// 3. Tasks that I senior has accepted my response

const Volunteer = () => {
  const [openTasks, setOpenTasks] = useState<Task[]>([])
  const [pendingTasks, setPendingTasks] = useState<Task[]>([])
  const [acceptedTasks, setAcceptedTasks] = useState<Task[]>([])

  //Sean, check out backend for seniors on getRelevantTask models.

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
      {acceptedTasks.length > 0 && <TasksList tasks={acceptedTasks} />}
      {pendingTasks.length > 0 && <TasksList tasks={pendingTasks} />}
      {openTasks.length > 0 && <TasksList tasks={openTasks} />}
    </>
  )
}

export default Volunteer
