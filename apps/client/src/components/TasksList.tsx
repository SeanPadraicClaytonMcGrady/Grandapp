import { Task } from '../types'
import { FC } from 'react'
import TaskCard from './TaskCard'

type TasksProps = {
    tasks: Task[]
}

const TasksList: FC<TasksProps> = ({ tasks }) => {
    return (
        <>
            <div className='p-10 mb-5'>
                <div>
                    {tasks.map((physicalTask) => {
                        return <div className='mb-5' key={physicalTask.id}><TaskCard task={physicalTask} /></div>
                    })}
                </div>
            </div>
        </>
    )
}

export default TasksList