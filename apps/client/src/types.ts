export interface Author {
  id: number
  user: { username: string }
}

export interface EmotionalTask {
  id: number
  author: Author
  type: string
  description: string
  scheduledDate: string
  location: string
}

export interface PhysicalTask {
  id: number
  author: Author
  type: string
  description: string
  scheduledDate: string
  location: string
}

export interface Senior {
  id: number
  name: string
  username: string
  email: string
  password: string
  phoneNumber: string
  biography: string
  medicalNeeds: string
  address: string
}

export interface Volunteer {
  id: number
  name: string
  username: string
  email: string
  password: string
  phoneNumber: string
  biography: string
  address: string
}
export interface Task {
  id: number
  author: Author
  type: string
  description: string
  scheduledDate: string
  location: string
}

export interface User {
  id: number
  username: string
  email: string
  password: string
  phoneNumber: string
  biography: string
  address: string
  volunteer: Volunteer | null
  senior: Senior | null
}
