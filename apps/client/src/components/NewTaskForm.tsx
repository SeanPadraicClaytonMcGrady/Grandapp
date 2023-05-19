import React, { useEffect, useState, useRef } from 'react'
import { EmotionalTask, PhysicalTask, Senior } from '../types'
import { createEmotionalTask, createPhysicalTask, fetchSeniors } from '../lib/apiClient'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

type NewTaskFromProps = {
    onEmotionalTaskCreated: (emotionalTask: EmotionalTask) => void,
    onPhysicalTaskCreated: (physicalTask: PhysicalTask) => void,
}

interface Props {
    value: string,
    name: string,
    handleChange: React.ChangeEventHandler<HTMLInputElement>
}

function useSeniors() {
    const [seniors, setSeniors] = useState<Senior[]>([])

    useEffect(() => {
        fetchSeniors().then(seniors => setSeniors(seniors))
    }, [])
    return seniors
}

const initialValues = {
    author: '',
    type: '',
    scheduleDate: '',
    description: '',
    location: '',
}


function NewTaskForm({ onEmotionalTaskCreated, onPhysicalTaskCreated }: NewTaskFromProps): JSX.Element {
    const seniors = useSeniors()

    const [values, setValues] = useState(initialValues)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            //emotionalTask seems to be null in our attempts to call it. values has all the information, but we still get null.
            const seniorId = seniors.filter((senior) => senior.username === values.author)[0].id
            const emotionalTask = await createEmotionalTask(values.author, seniorId.toString(), values.type, values.description, values.scheduleDate[0], values.location)
            console.log(emotionalTask, '^ This is emotionalTask from NewTaskForm!')
            onEmotionalTaskCreated(emotionalTask)
            const physicalTask = await createPhysicalTask(values.author, seniorId.toString(), values.type, values.description, values.scheduleDate[0], values.location)
            onPhysicalTaskCreated(physicalTask)
            setValues(initialValues)
        } catch (e) {
            console.error((e as Error).message)
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        console.log('here')
        const { name, value } = e.target
        console.log(e.target)
        setValues({
            ...values,
            [name]: value,
        });
    }

    const Datepicker = ({ name, handleChange }: Props) => {
        const datepickerRef = useRef<HTMLInputElement>(null);
        console.log(name)
        useEffect(() => {
            if (datepickerRef.current) {
                const today = new Date();
                const maximumDate = new Date(today.setDate(today.getDate() + 30));

                flatpickr(datepickerRef.current, {
                    enableTime: true,
                    minDate: "today",
                    maxDate: maximumDate,
                    mode: "multiple",
                    minuteIncrement: 5,
                    onChange: (selectedDates: Date[]) => {
                        const formattedDates = selectedDates.map((date) => date.toISOString()
                        );
                        handleChange({
                            target: { name, value: formattedDates },
                        } as unknown as React.ChangeEvent<HTMLInputElement>)
                    }
                });
            }
        }, [name, handleChange]);

        return (<>
            <input ref={datepickerRef} onChange={handleChange} name="scheduleDate" value={values.scheduleDate} type="text" className="datepicker block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400" />
        </>)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='p-5  border-0 rounded-lg max-w-sm overflow-hidden shadow-lg'>
                <div className="border-b border-gray-900/10 pb-12" >
                    <h2 className="font-bold text-xl mb-2">Create a New Task</h2>
                    <div className='inline-block border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2 mb-0'>
                        <select name="author" onChange={handleChange}>
                            <option key="" value="">Select Author</option>
                            {seniors.map(senior => (
                                <option id={`${senior.id}`} key={senior.id} data-key={senior.id} value={senior.username}>{senior.username}</option>

                            ))}
                        </select>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900"></label>
                            <div className='inline-block border-2 rounded-md px-3 py-1 text-sm text-gray-700 mr-2' >
                                <select name="type" onChange={handleChange}>
                                    <option> Select type of task</option>
                                    <option value="emotional" >
                                        Emotional
                                    </option>
                                    <option value="physical" >
                                        Physical
                                    </option>
                                </select>
                            </div>
                            <div>
                                <div className="sm:col-span-3 mt-2 text-sm leading-6 text-gray-900 name='ddw" >
                                    <label htmlFor="scheduleDate">Schedule Date</label>
                                    <div>
                                        <Datepicker handleChange={handleChange} name="scheduleDate" value={values.scheduleDate} />
                                    </div>
                                    <div className="mt-2">
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor='description' ></label>Description:
                                <input onChange={handleChange} className="block text-sm leading-6 text-gray-900" name="description" value={values.description} />
                                <div>
                                    <label htmlFor='location'>Location:
                                        <input onChange={handleChange} className='' name="location" value={values.location} />
                                    </label>
                                </div>
                                <div>
                                    <button className="bg-gray-400 mt-4 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded" type="submit" value="create new task" >Create Task</button>
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