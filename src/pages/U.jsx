import { BookType, Coffee, SquareCheckBig, StickyNote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTasksStore } from '../store/tasksStore'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function U() {
  const navigate = useNavigate()


  return (
    <main className='container vertical'>
      <div className='block horizontal-priority'>
        <div className='block item'>
          <h1>I Cast: Academic Weapon</h1>
        </div>
        <aside className='block vertical g-2 item'>
          <button className='btn btn-v' onClick={() => navigate('/u/hub')}><BookType />Your study hub</button>
          <button className='btn btn-v' onClick={() => navigate('/u/flashcards')}><StickyNote /> Your flashcard library</button>
          <button className='btn btn-v' onClick={() => navigate('/u/tasks')}><SquareCheckBig /> Your upcoming challanges</button>
        </aside>
      </div>
    </main>
  )
}
