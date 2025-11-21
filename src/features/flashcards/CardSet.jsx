import { BrainCircuit, Trash } from "lucide-react"
import { useFlashcardStore } from "../../store/flashcardStore"
import { useLocation, useNavigate } from "react-router-dom"

export default function CardSet({ card, axiosPrivate }) {
    const fetchFlashcard = useFlashcardStore((s) => s.fetchFlashcard)
    const location = useLocation()
    const navigate = useNavigate()

    const redirectToFlashcard = (e) => {
        fetchFlashcard(axiosPrivate, location, card.flashcardId)
        navigate(`/u/flashcard/${card.flashcardId}`)
    }

    const deleteReference = (e) => {
        e.preventDefault()
        //todo
    }
    return (
        <li className="container">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <p>This set was created by {card.ownerUsername}</p>
            <button className="btn btn-v" onClick={redirectToFlashcard}><BrainCircuit/> Practice</button>
            {card.access != 'owner' ? (
                <button className="btn btn-v" onClick={deleteReference}><Trash/> Delete reference</button>
            ) : (<></>)}
        </li>
    )
}
