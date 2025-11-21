import { BookPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import CardList from "../features/flashcards/CardList"

export default function Flashcards() {
  const navigate = useNavigate()
  return (
    <div className="container">
      <button className="btn v-btn" onClick={() => navigate('/u/create')}> <BookPlus /> create new set</button>
      <CardList />
    </div>
  )
}
