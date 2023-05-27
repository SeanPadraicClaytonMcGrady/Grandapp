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
  responses: Response[]
}

export interface PhysicalTask {
  id: number
  author: Author
  type: string
  description: string
  scheduledDate: string
  location: string
  responses: Response[]
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
  responses: Response[]
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

export interface Response {
  task: Task
  responder: Volunteer
}

/* 
  model Response {
  task        Task      @relation(fields: [taskId], references: [id])
  taskId      Int
  responder   Volunteer @relation(fields: [responderId], references: [id])
  responderId Int

  @@unique([taskId, responderId])
}
*/
