import { useFilterStore } from '../../store/filterstore'
import type { Role } from '../../types'
import type { TimeFilter } from '../../utils/taskfilters'

const roles: { value: Role | 'all'; label: string }[] = [
  { value: 'all', label: 'All Roles' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'dietician', label: 'Dietician' },
  { value: 'social_worker', label: 'Social Worker' },
]

const times: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'All Tasks' },
  { value: 'overdue', label: '🔴 Overdue' },
  { value: 'due_today', label: '🟡 Due Today' },
  { value: 'upcoming', label: '🔵 Upcoming' },
]

const FilterBar = () => {
  const { selectedRole, selectedTime, setRole, setTime, resetFilters } = useFilterStore()

  return (
    <div className='filter-bar'>
      <div className='filter-group'>
        <label>Role</label>
        <select
          value={selectedRole}
          onChange={(e) => setRole(e.target.value as Role | 'all')}
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div className='filter-group'>
        <label>Time</label>
        <select
          value={selectedTime}
          onChange={(e) => setTime(e.target.value as TimeFilter)}
        >
          {times.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <button className='reset-btn' onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  )
}

export default FilterBar