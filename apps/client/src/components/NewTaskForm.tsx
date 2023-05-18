import React, { useEffect, useState } from 'react'
import { EmotionalTask, PhysicalTask, Senior } from '../types'
import { createEmotionalTask, createPhysicalTask, fetchSeniors } from '../lib/apiClient'

type NewTaskFromProps = {
    onEmotionalTaskCreated: (emotionalTask: EmotionalTask) => void,
    onPhysicalTaskCreated: (physicalTask: PhysicalTask) => void,
}

function useSeniors() {
    const [seniors, setSeniors] = useState<Senior[]>([])

    useEffect(() => {
        fetchSeniors().then(seniors => setSeniors(seniors))
    }, [])
    return seniors
}

function NewTaskForm({ onEmotionalTaskCreated, onPhysicalTaskCreated }: NewTaskFromProps): JSX.Element {
    const seniors = useSeniors()
    // const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const form = e.target as typeof e.target & {
            author: { value: string }
            type: { value: string }
            description: { value: string }
            scheduleDate: { value: string }
            location: { value: string }
        }

        try {

            const emotionalTask = await createEmotionalTask(form.author.value, form.type.value, form.description.value, form.scheduleDate.value, form.location.value)
            onEmotionalTaskCreated(emotionalTask)
            const physicalTask = await createPhysicalTask(form.author.value, form.type.value, form.description.value, form.scheduleDate.value, form.location.value)
            onPhysicalTaskCreated(physicalTask)
        } catch (e) {
            console.error((e as Error).message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='p-5  border-0 rounded-lg max-w-sm overflow-hidden shadow-lg'>
                <div className="border-b border-gray-900/10 pb-12" >
                    <h2 className="font-bold text-xl mb-2">Create a New Task</h2>
                    <div className='inline-block border-2 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-0'>
                        <select name="authorUsername">
                            <option>Select Author</option>
                            {seniors.map(senior => (
                                <option key={senior.id} value={senior.username}>{senior.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900"></label>
                            <div className='inline-block border-2 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2' >
                                <select>
                                    <option> Select type of task</option>
                                    <option value="emotional" >
                                        Emotional
                                    </option>
                                    <option value="emotional" >
                                        Physical
                                    </option>
                                </select>
                            </div>
                            <div>
                                <div className="sm:col-span-3">
                                    <label className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">Schedule Date</label>
                                    <div className="mt-2">
                                        <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                <div className="mt-2">
                                    <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default NewTaskForm