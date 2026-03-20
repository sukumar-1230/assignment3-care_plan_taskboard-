import { create } from 'zustand'
import type { Role } from '../types'
import type { TimeFilter } from '../utils/taskfilters'

interface FilterState {
  selectedRole: Role | 'all'
  selectedTime: TimeFilter
  setRole: (role: Role | 'all') => void
  setTime: (time: TimeFilter) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedRole: 'all',
  selectedTime: 'all',
  setRole: (role) => set({ selectedRole: role }),
  setTime: (time) => set({ selectedTime: time }),
  resetFilters: () => set({ selectedRole: 'all', selectedTime: 'all' }),
}))