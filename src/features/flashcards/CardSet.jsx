import { BrainCircuit, Trash } from "lucide-react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useFlashcardSetsStore } from "../../store/flashcardSetsStore"

export default function CardSet({ card }) {
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const fetchFlashcardSets = useFlashcardSetsStore((s) => s.fetchFlashcardSets)

    const [searchParams, setSearchParams] = useSearchParams()

    const redirectToFlashcard = (e) => {
        navigate(`/u/flashcard/${card.flashcardId}`)
    }

    const deleteReference = async (e) => {
        e.preventDefault()

        try {
            await axiosPrivate.delete('/u/flashcards', {
                data: {
                    flashcardId: card.flashcardId
                }
            })

            const p = parseInt(searchParams.get("p"));
            const s = searchParams.get("s");

            fetchFlashcardSets(axiosPrivate, location, navigate, p, s)
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }
        }
    }
    return (
        <li className="block w-100 vertical outline">
            <h3>{card.title}</h3>
            <p><em>Created by {card.ownerUsername}</em></p>
            <p>{card.description}</p>
            <div className="block horizontal-priority g-2">
                <button className="btn btn-primary" onClick={redirectToFlashcard}><BrainCircuit /> Practice</button>
                {card.access != 'owner' ? (
                    <button className="btn" onClick={deleteReference}><Trash /> Delete reference</button>
                ) : (<></>)}
            </div>
        </li>
    )
}
