import { Task } from "../types"

const BASE_URL = 'http://localhost:8080'

interface LoginUsers {
    username: string,
    password: string
}

let authToken = localStorage.getItem('token')

export async function fetchLoginUsers({ username, password }: LoginUsers) {
    const credentials = window.btoa(`${username}:${password}`)
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-type': 'application/json'
        },
    })
    if (response.status !== 200) {
        throw new Error('Incorrect credentials! Please try again.')
    }
    const loginUser = await response.json()

    localStorage.setItem("token", loginUser.token);

    return loginUser
}

export async function fetchEmotionalTasks() {
    const response = await fetch(`${BASE_URL}/tasks`)
    const emotionalTasks = await response.json()
    return emotionalTasks
}
export async function fetchPhysicalTasks() {
    const response = await fetch(`${BASE_URL}/tasks`)
    const physicalTasks = await response.json()
    return physicalTasks
}
export async function fetchSeniors() {
    const response = await fetch(`${BASE_URL}/seniors`)
    const seniors = await response.json()
    return seniors
}

export async function fetchTasksNoResponder() {
    const response = await fetch(`${BASE_URL}/seniors/tasks/open`)
    const tasks = await response.json()
    return tasks
}
export async function fetchTasksWithResponder() {
    const response = await fetch(`${BASE_URL}/seniors/tasks/responder`)
    const tasks = await response.json()
    return tasks
}

export type RelevantTasks = {
    openTasks: Task[],
    pendingTasks: Task[],
    acceptedTasks: Task[]
}
export async function getRelevantTasks(): Promise<RelevantTasks> {
    const response = await fetch(`${BASE_URL}/relevant-tasks`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    const relevantTasks = await response.json()
    return relevantTasks
}

interface ICreateEmotionalTaskPayload {
    author: string,
    authorId: string,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
}

interface ICreatePhysicalTaskPayload {
    author: string,
    authorId: string,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
}



export async function createEmotionalTask({ author, authorId, type, description, scheduledDate, location }: ICreateEmotionalTaskPayload) {
    const response = await fetch(`${BASE_URL}/emotionalTasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author,
            authorId,
            type,
            description,
            scheduledDate,
            location,
        })
    })
    console.log(response, '^ This is resposne!')
    const newEmotionalTask = await response.json()
    console.log(newEmotionalTask, '^ This is newEmotionalTask')

    if (response.status === 400) {
        throw new Error('Can not create the task.')
    }
    return newEmotionalTask
}
export async function createPhysicalTask({ author, authorId, type, description, scheduledDate, location }: ICreatePhysicalTaskPayload) {
    const response = await fetch(`${BASE_URL}/physicalTasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author,
            authorId,
            type,
            description,
            scheduledDate,
            location
        })
    })
    const newPhysicalTask = await response.json()
    if (response.status === 400) {
        throw new Error('Can not create the task.')
    }
    return newPhysicalTask
}