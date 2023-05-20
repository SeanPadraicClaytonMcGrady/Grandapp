export interface Author {
    id: number,
    user: { username: string }
}

export interface EmotionalTask {
    id: number,
    author: Author,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
}

export interface PhysicalTask {
    id: number,
    author: Author,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
}

export interface Senior {
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    biography: string,
    medicalNeeds: string,
    address: string
}

export interface Tasks {
    id: number,
    author: Author,
    type: string,
    description: string,
    scheduledDate: string,
    location: string
}
