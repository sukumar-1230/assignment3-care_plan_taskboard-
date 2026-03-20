import { useState } from 'react'
import { usePatients, usePatientTasks, useCreateTask, useUpdateTask } from '../../hooks/usetasks'
import { useFilterStore } from '../../store/filterstore'
import { filterTasks } from '../../utils/taskfilters'
import type { Task } from '../../types'
import TaskCard from '../taskcard/taskcard'
import CreateTaskModal from '../createtaskmodel/createtaskmodel'

// interface ModalState {
//   patientId: string
//   patientName: string
// }

const PatientRow = ({ patientId, patientName }: { patientId: string; patientName: string }) => {
  const { data: tasks, isLoading, isError } = usePatientTasks(patientId)
  const { selectedRole, selectedTime } = useFilterStore()
  const updateTask = useUpdateTask(patientId)
  const [showModal, setShowModal] = useState(false)
  const createTask = useCreateTask(patientId)

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    updateTask.mutate({ taskId, updates: { status } })
  }

  const handleCreateTask = (task: Partial<Task>) => {
    createTask.mutate(task)
  }

  if (isLoading) return (
    <div className='patient-row'>
      <div className='patient-name'>{patientName}</div>
      <div className='loading'>Loading tasks...</div>
    </div>
  )

  if (isError) return (
    <div className='patient-row'>
      <div className='patient-name'>{patientName}</div>
      <div className='error'>Failed to load tasks. Please try again.</div>
    </div>
  )

  const filteredTasks = filterTasks(tasks ?? [], selectedRole, selectedTime)

  return (
    <div className='patient-row'>
      <div className='patient-info'>
        <h3 className='patient-name'>{patientName}</h3>
        <button
          className='add-task-btn'
          onClick={() => setShowModal(true)}
        >
          + New Task
        </button>
      </div>

      <div className='tasks-container'>
        {filteredTasks.length === 0 ? (
          <p className='no-tasks'>No tasks match the current filters.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      {showModal && (
        <CreateTaskModal
          patientId={patientId}
          patientName={patientName}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  )
}

const Taskboard = () => {
  const { data: patients, isLoading, isError } = usePatients()

  if (isLoading) return (
    <div className='board-state'>
      <p>Loading patients...</p>
    </div>
  )

  if (isError) return (
    <div className='board-state error'>
      <p>Failed to load patients. Please refresh the page.</p>
    </div>
  )

  if (!patients || patients.length === 0) return (
    <div className='board-state'>
      <p>No patients found.</p>
    </div>
  )

  return (
    <div className='taskboard'>
      {patients.map((patient) => (
        <PatientRow
          key={patient.id}
          patientId={patient.id}
          patientName={patient.name}
        />
      ))}
    </div>
  )
}

export default Taskboard