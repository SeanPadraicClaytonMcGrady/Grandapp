export interface Author {
    username: string
}

export interface EmotionalTask {
    id: number,
    author: Author,
    type: string,
    description: string,
    scheduleDate: string,
    location: string
}

export interface PhysicalTask {
    id: number,
    author: Author,
    type: string,
    description: string,
    scheduleDate: string,
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
