export type Role = 'nurse' | 'dietician' | 'social_worker'

export type TaskStatus = 'overdue' | 'in_progress' | 'completed'

export interface Patient {
  id: string
  name: string
  unit: string
  age: number
}

export interface Task {
  id: string
  patientId: string
  title: string
  description?: string
  status: TaskStatus
  assignedRole: Role
  dueDate: string
  createdAt: string
  notes?: string
}

export interface ApiError {
  message: string
  code: number
}