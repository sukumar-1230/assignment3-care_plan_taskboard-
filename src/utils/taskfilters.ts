import type { Task, Role, TaskStatus } from '../types'

export type TimeFilter = 'all' | 'overdue' | 'due_today' | 'upcoming'

export const filterTasks = (
  tasks: Task[],
  selectedRole: Role | 'all',
  selectedTime: TimeFilter
): Task[] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tasks
    .filter((task) => {
      if (selectedRole === 'all') return true
      return task.assignedRole === selectedRole
    })
    .filter((task) => {
      const due = new Date(task.dueDate)
      due.setHours(0, 0, 0, 0)

      if (selectedTime === 'all') return true
      if (selectedTime === 'overdue') return due < today && task.status !== 'completed'
      if (selectedTime === 'due_today') return due.getTime() === today.getTime()
      if (selectedTime === 'upcoming') return due > today
      return true
    })
}

export const getStatusLabel = (status: TaskStatus): string => {
  const labels: Record<TaskStatus, string> = {
    overdue: 'Overdue',
    in_progress: 'In Progress',
    completed: 'Completed',
  }
  return labels[status]
}

export const getRoleLabel = (role: Role): string => {
  const labels: Record<Role, string> = {
    nurse: 'Nurse',
    dietician: 'Dietician',
    social_worker: 'Social Worker',
  }
  return labels[role]
}

export const getStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    overdue: '#ff4d4d',
    in_progress: '#ffa500',
    completed: '#4caf50',
  }
  return colors[status]
}