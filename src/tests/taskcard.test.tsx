import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TaskCard from '../components/taskcard/taskcard'
import type { Task } from '../types'

const mockTask: Task = {
  id: 't1',
  patientId: '1',
  title: 'Monthly Lab Test',
  status: 'overdue',
  assignedRole: 'nurse',
  dueDate: '2026-03-18T10:00:00Z',
  createdAt: '2026-03-01T10:00:00Z',
  notes: 'Urgent follow up needed',
}

describe('TaskCard', () => {
  it('renders task title correctly', () => {
    const onStatusChange = vi.fn()
    render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />)
    expect(screen.getByText('Monthly Lab Test')).toBeInTheDocument()
  })

  it('renders role badge correctly', () => {
    const onStatusChange = vi.fn()
    render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />)
    expect(screen.getByText('Nurse')).toBeInTheDocument()
  })

  it('renders notes when provided', () => {
    const onStatusChange = vi.fn()
    render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />)
    expect(screen.getByText('Urgent follow up needed')).toBeInTheDocument()
  })

  it('does not render notes when not provided', () => {
    const taskWithoutNotes = { ...mockTask, notes: undefined }
    const onStatusChange = vi.fn()
    render(<TaskCard task={taskWithoutNotes} onStatusChange={onStatusChange} />)
    expect(screen.queryByText('Urgent follow up needed')).not.toBeInTheDocument()
  })

  it('calls onStatusChange when status dropdown changes', () => {
    const onStatusChange = vi.fn()
    render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />)
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'completed' } })
    expect(onStatusChange).toHaveBeenCalledWith('t1', 'completed')
  })

  it('shows correct status in dropdown', () => {
    const onStatusChange = vi.fn()
    render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />)
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('overdue')
  })
})