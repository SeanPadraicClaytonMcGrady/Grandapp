import { EmotionalTask, PhysicalTask } from '../types'
import { FC } from 'react'
import TaskCard from './TaskCard'

type TasksProps = {
    emotionalTasks: EmotionalTask[],
    physicalTasks: PhysicalTask[],
}

const TasksList: FC<TasksProps> = ({ emotionalTasks, physicalTasks }) => {

    return (
        <>
            <div>
                {emotionalTasks.reverse().map((emotionalTask) => {
                    return <div key={emotionalTask.id}><TaskCard task={emotionalTask} /></div>
                })}
            </div>
            <div>
                {physicalTasks.reverse().map((physicalTask) => {
                    return <div key={physicalTask.id}><TaskCard task={physicalTask} /></div>
                })}
            </div>
        </>
    )
}

export default TasksList