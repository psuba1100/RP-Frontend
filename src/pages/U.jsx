import { BookType, Coffee, SquareCheckBig, StickyNote } from 'lucide-react'
import '../css/u.css'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTasksStore } from '../store/tasksStore'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function U() {
  const [task, setTask] = useState('')
  const navigate = useNavigate()
  const fetchTasks = useTasksStore((s) => s.fetchTasks)
  const tasks = useTasksStore((s) => s.tasks)
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()

  useEffect(() => {
    fetchTasks(axiosPrivate, location)
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
          to take a break <Coffee />
        </>
      );
    }
  }, [tasks])

  return (
    <main className='container'>
      <div className='container-h'>
        <div className='container'>
          <h1 className='t-10'>I Cast: Academic Weapon</h1>
        </div>
        <aside className='container g-2'>
          <button className='btn btn-v'><BookType />Your study hub</button>
          <button className='btn btn-v' onClick={() => navigate('/u/flashcards')}><StickyNote /> Your flashcard library</button>
          <button className='btn btn-v' onClick={() => navigate('/u/tasks')}><SquareCheckBig /> Your upcoming challanges</button>
        </aside>
      </div>
      <p>
        Don't forget: <br /> {task}
      </p>
    </main>
  )
}
