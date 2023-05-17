import { EmotionalTask, PhysicalTask } from '../types'
import { FC } from 'react'

type TaskProps = {
    task: EmotionalTask | PhysicalTask
}

const TaskCard: FC<TaskProps> = ({ task }) => {

    return (
        <div className="w-full max-w-xs">
            <form>
                <div>
                    <label className=''>Senior Name</label>
                </div>
                <div>
                    <label>{task.type}</label>
                </div>
                <div>
                    <label>{task.description}</label>
                </div>
                <div>
                    <label>{task.scheduleDate}</label>
                </div>
                <div>
                    <label>{task.location}</label>
                </div>
            </form>

        </div>
    )
}

export default TaskCard