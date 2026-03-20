import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPatients, fetchTasksForPatient, createTask, updateTask } from '../api/tasks'
import type { Task } from '../types'

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  })
}

export const usePatientTasks = (patientId: string) => {
  return useQuery({
    queryKey: ['tasks', patientId],
    queryFn: () => fetchTasksForPatient(patientId),
  })
}

export const useCreateTask = (patientId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (task: Partial<Task>) => createTask(patientId, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', patientId] })
    },
  })
}

export const useUpdateTask = (patientId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: Partial<Task> }) =>
      updateTask(taskId, updates),

    // Optimistic update — update UI instantly before server responds
    onMutate: async ({ taskId, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', patientId] })
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', patientId])

      queryClient.setQueryData<Task[]>(['tasks', patientId], (old) =>
        old?.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        ) ?? []
      )

      return { previousTasks }
    },

    // If server fails — ROLLBACK to previous state
    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', patientId], context.previousTasks)
      }
    },

    // Always refresh after success or failure
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', patientId] })
    },
  })
}