import { BookType, Coffee, SquareCheckBig, StickyNote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTasksStore } from '../store/tasksStore'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function U() {
  const navigate = useNavigate()
  const fetchTasks = useTasksStore((s) => s.fetchTasks)
  const tasks = useTasksStore((s) => s.tasks)
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const [task, setTask] = useState('')

  useEffect(() => {
    fetchTasks(axiosPrivate, location, navigate)
  }, [])

  useEffect(() => {
    const firstTask = tasks[0]
    if (firstTask) {
      const datum = new Date(firstTask.dueDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      setTask(
        <>
          {firstTask.title} from {firstTask.subject} due {datum}
        </>
      );
    } else {
      setTask(
        <>
          To take a break <Coffee />
        </>
      );
    }
  }, [tasks])

  return (
    <>
      <main className='container vertical'>
        <div className='block horizontal-priority'>
          <div className='block item'>
            <h1>I Cast: Academic Weapon</h1>
          </div>
          <aside className='block vertical g-2 item'>
            <button className='btn btn-v' onClick={() => navigate('/u/hub')}><BookType />Your study hub</button>
            <button className='btn btn-v' onClick={() => navigate('/u/flashcards')}><StickyNote /> Your flashcard library</button>
            <button className='btn btn-v' onClick={() => navigate('/u/tasks')}><SquareCheckBig /> Your upcoming challenges</button>
          </aside>
        </div>
      </main>
      <footer className="block" translate='no'>
        {'Don\'t forget: '}
        {task}
      </footer>
    </>
  )
}
