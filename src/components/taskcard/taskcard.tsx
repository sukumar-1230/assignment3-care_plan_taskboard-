import type { Task } from '../../types'
import { getStatusColor, getRoleLabel } from '../../utils/taskfilters'

interface TaskCardProps {
  task: Task
  onStatusChange: (taskId: string, status: Task['status']) => void
}

const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const statusColor = getStatusColor(task.status)

  return (
    <div className='task-card' style={{ borderLeft: `4px solid ${statusColor}` }}>
      <div className='task-card-header'>
        <h4>{task.title}</h4>
        <span className='role-badge'>{getRoleLabel(task.assignedRole)}</span>
      </div>

      {task.notes && (
        <p className='task-notes'>{task.notes}</p>
      )}

      <div className='task-card-footer'>
        <span className='task-due'>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
          style={{ borderColor: statusColor }}
        >
          <option value='overdue'>🔴 Overdue</option>
          <option value='in_progress'>🟡 In Progress</option>
          <option value='completed'>🟢 Completed</option>
        </select>
      </div>
    </div>
  )
}

export default TaskCard