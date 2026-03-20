import axios from 'axios'
import type { Patient, Task } from '../types'

const client = axios.create({
  baseURL: '/',
})

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await client.get('/patients')
  return response.data
}

export const fetchTasksForPatient = async (patientId: string): Promise<Task[]> => {
  const response = await client.get(`/patients/${patientId}/tasks`)
  return response.data
}

export const createTask = async (
  patientId: string,
  task: Partial<Task>
): Promise<Task> => {
  const response = await client.post(`/patients/${patientId}/tasks`, task)
  return response.data
}

export const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<Task> => {
  const response = await client.patch(`/tasks/${taskId}`, updates)
  return response.data
}