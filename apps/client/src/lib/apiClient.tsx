import { EmotionalTask, PhysicalTask, Task } from "../types";
import Cookies from "js-cookie";
import { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8080";

import axios from "axios";
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

interface LoginUsers {
  username: string;
  password: string;
}

//function that reads cookies

//fetch(
//   options {
//   body
//   headers: {
//     authorization : getcookies -> token:
//   }
// }
// )

// const authOptions: AxiosRequestConfig = {
//   const token: string | undefined = Cookies.get("token")
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

export async function fetchLoginUsers({ username, password }: LoginUsers) {
  console.log("here is the start of fetchLoginUsers");
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response.headers);
  if (response.status !== 200) {
    throw new Error("Incorrect credentials! Please try again.");
  }
  const loginUser = await response.json();

  return loginUser;
}

// const authOptions = {
// this needs to put the cookie in the fetch... ?
// }

export async function fetchEmotionalTasks() {
  const response = await apiClient.get(`${BASE_URL}/tasks`);
  const emotionalTasks = response.data;
  return emotionalTasks;
}
export async function fetchPhysicalTasks() {
  const response = await fetch(`${BASE_URL}/tasks`);
  const physicalTasks = await response.json();
  return physicalTasks;
}

export async function fetchTask(id: number) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  const individualTask = await response.json();
  return individualTask;
}
export async function fetchSeniors() {
  const response = await fetch(`${BASE_URL}/seniors`);
  const seniors = await response.json();
  return seniors;
}

export async function fetchUser(id: number) {
  const response = await fetch(`${BASE_URL}/user/${id}`);
  const user = await response.json();
  return user;
}

export async function fetchVolunteers() {
  const response = await fetch(`${BASE_URL}/volunteers`);
  const volunteers = await response.json();
  return volunteers;
}

export async function fetchTasksNoResponder() {
  const response = await fetch(`${BASE_URL}/seniors/tasks/open`);
  const tasks = await response.json();
  return tasks;
}
export async function fetchTasksWithResponder() {
  const response = await fetch(`${BASE_URL}/seniors/tasks/responder`);
  const tasks = await response.json();
  return tasks;
}

export type RelevantTasks = {
  openTasks: Task[];
  pendingTasks: Task[];
  acceptedTasks: Task[];
};
export async function getRelevantTasks(): Promise<RelevantTasks> {
  const response = await fetch(`${BASE_URL}/relevant-tasks`);
  console.log(
    response,
    "getRelevantTasks apiClient Response is heeeeeeeeeeeeeeeeeeeere!"
  );
  const relevantTasks = await response.json();
  return relevantTasks;
}

interface ICreateEmotionalTaskPayload {
  author: string | undefined;
  authorId: string | undefined;
  type: string;
  description: string;
  scheduledDate: string;
  location: string;
}

interface ICreatePhysicalTaskPayload {
  author: string | undefined;
  authorId: string | undefined;
  type: string;
  description: string;
  scheduledDate: string;
  location: string;
}

export async function createEmotionalTask({
  author,
  authorId,
  type,
  description,
  scheduledDate,
  location,
}: ICreateEmotionalTaskPayload): Promise<EmotionalTask> {
  const token = apiClient.defaults.headers.common["Authorization"];
  const response = await apiClient.post<EmotionalTask>(
    "/emotionalTasks",
    {
      author,
      authorId,
      type,
      description,
      scheduledDate,
      location,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  const newEmotionalTask = response.data;

  if (response.status === 400) {
    throw new Error("Can not create the task.");
  }

  return newEmotionalTask;
}

export async function createPhysicalTask({
  author,
  authorId,
  type,
  description,
  scheduledDate,
  location,
}: ICreatePhysicalTaskPayload): Promise<PhysicalTask> {
  const token = apiClient.defaults.headers.common["Authorization"];
  const response = await apiClient.post<PhysicalTask>(
    "/emotionalTasks",
    {
      author,
      authorId,
      type,
      description,
      scheduledDate,
      location,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  const newPhysicalTask = response.data;
  return newPhysicalTask;
}

export default apiClient;
