import { useState } from 'react'
import type { Role, Task } from '../../types'

interface CreateTaskModalProps {
  patientId: string
  patientName: string
  onClose: () => void
  onSubmit: (task: Partial<Task>) => void
}

const CreateTaskModal = ({
  patientId,
  patientName,
  onClose,
  onSubmit,
}: CreateTaskModalProps) => {
  const [title, setTitle] = useState('')
  const [role, setRole] = useState<Role>('nurse')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Task title is required!')
      return
    }
    if (!dueDate) {
      setError('Due date is required!')
      return
    }

    onSubmit({
      patientId,
      title: title.trim(),
      assignedRole: role,
      dueDate: new Date(dueDate).toISOString(),
      notes: notes.trim() || undefined,
    })

    onClose()
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <h3>New Task for {patientName}</h3>
          <button className='close-btn' onClick={onClose}>✕</button>
        </div>

        {error && <p className='error-message'>{error}</p>}

        <div className='modal-body'>
          <div className='form-group'>
            <label>Task Title *</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g. Monthly Lab Test'
            />
          </div>

          <div className='form-group'>
            <label>Assign To *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value='nurse'>Nurse</option>
              <option value='dietician'>Dietician</option>
              <option value='social_worker'>Social Worker</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Due Date *</label>
            <input
              type='date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label>Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder='Any additional notes...'
              rows={3}
            />
          </div>
        </div>

        <div className='modal-footer'>
          <button className='cancel-btn' onClick={onClose}>Cancel</button>
          <button className='submit-btn' onClick={handleSubmit}>Create Task</button>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskModal