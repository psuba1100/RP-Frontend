import { BookPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import CardList from "../features/flashcards/CardList"

export default function Flashcards() {
  const navigate = useNavigate()
  return (
    <div className="container vertical elements-top">
      <em><h2>Don't practice until you get it right. <br /> Practice until you can't get it wrong.</h2></em>
      <button className="btn vertical" onClick={() => navigate('/u/create')}> <BookPlus />Create</button>
      <CardList />
    </div>
  )
}
