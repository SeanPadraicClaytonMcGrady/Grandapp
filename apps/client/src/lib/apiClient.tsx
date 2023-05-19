const BASE_URL = 'http://localhost:8080'

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

export async function createEmotionalTask(author: string, authorId: string, type: string, description: string, scheduleDate: string, location: string) {
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
            scheduleDate,
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
export async function createPhysicalTask(author: string, authorId: string, type: string, description: string, scheduleDate: string, location: string) {
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
            scheduleDate,
            location
        })
    })
    const newPhysicalTask = await response.json()
    if (response.status === 400) {
        throw new Error('Can not create the task.')
    }
    return newPhysicalTask
}