import { EmotionalTask, PhysicalTask, Senior, Tasks } from '../types'
import { FC } from 'react'
import TaskCard from './TaskCard'

type TasksProps = {
    emotionalTasks: EmotionalTask[],
    physicalTasks: PhysicalTask[],
    seniors: Senior[]
    tasks: Tasks[]
}

const TasksList: FC<TasksProps> = ({ emotionalTasks, physicalTasks, seniors }) => {

    return (
        <>
            <div className='p-10 mb-5'>
                <div>
                    {emotionalTasks.reverse().map((emotionalTask) => {
                        return <div className='mb-5' key={emotionalTask.id}><TaskCard task={emotionalTask} seniors={seniors} /></div>
                    })}
                </div>
                <div>
                    {physicalTasks.reverse().map((physicalTask) => {
                        return <div className='mb-5' key={physicalTask.id}><TaskCard task={physicalTask} seniors={seniors} /></div>
                    })}
                </div>
            </div>
        </>
    )
}

export default TasksList