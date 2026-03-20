import { describe, it, expect } from 'vitest'
import { filterTasks } from '../utils/taskfilters'
import type { Task } from '../types'

const mockTasks: Task[] = [
  {
    id: 't1',
    patientId: '1',
    title: 'Monthly Lab Test',
    status: 'overdue',
    assignedRole: 'nurse',
    dueDate: '2026-03-18T10:00:00Z',
    createdAt: '2026-03-01T10:00:00Z',
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
    patientId: '1',
    title: 'Social Work Follow-up',
    status: 'completed',
    assignedRole: 'social_worker',
    dueDate: '2026-03-19T10:00:00Z',
    createdAt: '2026-03-01T10:00:00Z',
  },
]

describe('filterTasks', () => {
  it('returns all tasks when no filters applied', () => {
    const result = filterTasks(mockTasks, 'all', 'all')
    expect(result).toHaveLength(3)
  })

  it('filters tasks by nurse role', () => {
    const result = filterTasks(mockTasks, 'nurse', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].assignedRole).toBe('nurse')
  })

  it('filters tasks by dietician role', () => {
    const result = filterTasks(mockTasks, 'dietician', 'all')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Diet Counselling')
  })

  it('filters overdue tasks correctly', () => {
    const result = filterTasks(mockTasks, 'all', 'overdue')
    result.forEach(task => {
      expect(task.status).not.toBe('completed')
    })
  })

  it('returns empty array when no tasks match filter', () => {
    const result = filterTasks(mockTasks, 'social_worker', 'overdue')
    expect(result).toHaveLength(0)
  })

  it('handles empty task list gracefully', () => {
    const result = filterTasks([], 'nurse', 'overdue')
    expect(result).toHaveLength(0)
  })
})