import FilterBar from './components/filterbar/filterbar'
import Taskboard from './components/taskboard/taskboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 30,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='app'>
        <header className='app-header'>
          <h1>🏥 Care Plan Taskboard</h1>
          <p>Dialysis Center — Staff Task Management</p>
        </header>
        <main className='app-main'>
          <FilterBar />
          <Taskboard />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App