import { BrainCircuit, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CardSet({ card }) {
    const navigate = useNavigate()

    const redirectToFlashcard = (e) => {
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
