import { EmotionalTask, PhysicalTask, Senior } from '../types'
import { FC } from 'react'

type TaskProps = {
    task: EmotionalTask | PhysicalTask
    seniors: Senior[]
}

const TaskCard: FC<TaskProps> = ({ task }) => {
    console.log()
    return (
        <div className="w-full max-w-xs">
            <form className='p-5  border-0 rounded-lg max-w-sm overflow-hidden shadow-lg bg-white'>
                <div>
                    <label>{task.author.user.username}</label>
                </div>
                <div>
                    <label>Type of task: {task.type}</label>
                </div>
                <div>
                    <label>Description: {task.description}</label>
                </div>
                <div>
                    <label>Date: {task.scheduledDate}</label>
                </div>
                <div>
                    <label>Address: {task.location}</label>
                </div>
            </form>
        </div>
    )
}

export default TaskCard