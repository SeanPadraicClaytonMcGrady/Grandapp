import TasksList from '../TasksList'
import { fetchSeniors } from '../../lib/apiClient'
import { useState, useEffect } from 'react'
import { fetchTasksNoResponder, fetchTasksWithResponder } from '../../lib/apiClient'
import { Senior, Tasks } from '../../types'


// function useTasks() {
//     const [physicalTasks, setPhysicalTasks] = useState<PhysicalTask[]>([])
//     const [emotionalTasks, setEmotionalTasks] = useState<EmotionalTask[]>([])

//     useEffect(() => {
//         fetchEmotionalTasks().then(emotionalTasks => setEmotionalTasks(emotionalTasks))
//     }, [])
//     useEffect(() => {
//         fetchPhysicalTasks().then(physicalTasks => setPhysicalTasks(physicalTasks))
//     }, [])

//     return [physicalTasks, emotionalTasks]
// }

const Volunteer = () => {
    // const [emotionalTasks, setEmotionalTasks] = useState([])
    // const [physicalTasks, setPhysicalTasks] = useState([])
    const [seniors, setSeniors] = useState<Senior[]>([])
    const [tasksNoResponder, setTasksNoResponder] = useState<Tasks[]>([])
    const [tasksWithResponder, setTasksWithResponder] = useState<Tasks[]>([])
    // const tasks = useTasks()
    const reloadTasksNoResponder = async () => {
        const tasksNoResponder = await fetchTasksNoResponder()
        return tasksNoResponder
    }
    const reloadTasksWithResponder = async () => {
        const tasksWithResponder = await fetchTasksWithResponder()
        return tasksWithResponder
    }
    const reloadSeniors = async () => {
        const seniors = await fetchSeniors()
        return seniors
    }
    useEffect(() => {
        const withNoResp = reloadTasksNoResponder()
        const withResp = reloadTasksWithResponder()
        const seniors = reloadSeniors()
        Promise.all([withNoResp, withResp, seniors])
            .then(data => {
                setTasksNoResponder(data[0])
                setTasksWithResponder(data[1])
                setSeniors(data[2])
            })
    }, [])



    return (
        <>
            <TasksList tasks={tasksNoResponder} seniors={seniors} />
        </>
    )
}

export default Volunteer