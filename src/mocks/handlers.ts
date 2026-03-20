import { http, HttpResponse } from 'msw'
import type { Patient, Task } from '../types'

const patients: Patient[] = [
  { id: '1', name: 'John Doe', unit: 'Unit A', age: 65 },
  { id: '2', name: 'Jane Smith', unit: 'Unit B', age: 72 },
  { id: '3', name: 'Robert Brown', unit: 'Unit A', age: 58 },
]

const tasks: Task[] = [
  {
    id: 't1',
    patientId: '1',
    title: 'Monthly Lab Test',
    status: 'overdue',
    assignedRole: 'nurse',
    dueDate: '2026-03-18T10:00:00Z',
    createdAt: '2026-03-01T10:00:00Z',
    notes: 'Urgent follow up needed',
  },
  {
    id: 't2',
    patientId: '1',
    title: 'Diet Counselling',
    status: 'in_progress',
    assignedRole: 'dietician',
    dueDate: '2026-03-20T10:00:00Z',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 't3',
    patientId: '2',
    title: 'Access Check',
    status: 'overdue',
    assignedRole: 'nurse',
    dueDate: '2026-03-17T10:00:00Z',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 't4',
    patientId: '2',
    title: 'Social Work Follow-up',
    status: 'completed',
    assignedRole: 'social_worker',
    dueDate: '2026-03-19T10:00:00Z',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 't5',
    patientId: '3',
    title: 'Vaccination Reminder',
    status: 'in_progress',
    assignedRole: 'nurse',
    dueDate: '2026-03-20T10:00:00Z',
    createdAt: '2026-03-01T10:00:00Z',
  },
]

export const handlers = [
  // Get all patients
  http.get('/patients', () => {
    return HttpResponse.json(patients)
  }),

  // Get tasks for a patient
  http.get('/patients/:id/tasks', ({ params }) => {
    const patientTasks = tasks.filter(t => t.patientId === params.id)
    return HttpResponse.json(patientTasks)
  }),

  // Create a new task
  http.post('/patients/:id/tasks', async ({ request, params }) => {
    const body = await request.json() as Partial<Task>
    const newTask: Task = {
      id: `t${Date.now()}`,
      patientId: params.id as string,
      title: body.title ?? 'Untitled Task',
      status: 'in_progress',
      assignedRole: body.assignedRole ?? 'nurse',
      dueDate: body.dueDate ?? new Date().toISOString(),
      createdAt: new Date().toISOString(),
      notes: body.notes,
    }
    tasks.push(newTask)
    return HttpResponse.json(newTask, { status: 201 })
  }),

  // Update a task
  http.patch('/tasks/:id', async ({ request, params }) => {
    const body = await request.json() as Partial<Task>
    const index = tasks.findIndex(t => t.id === params.id)
    if (index === -1) {
      return HttpResponse.json({ message: 'Task not found', code: 404 }, { status: 404 })
    }
    tasks[index] = { ...tasks[index], ...body }
    return HttpResponse.json(tasks[index])
  }),
]