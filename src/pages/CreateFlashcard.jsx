import { SquarePlus } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';
import { useNewFlashcardStore } from "../store/newFlashcardStore";
import CreationCard from "../features/flashcards/creationCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function CreateFlashcard() {
    const cards = useNewFlashcardStore((s) => s.cards);
    const createCard = useNewFlashcardStore((s) => s.createCard);
    const axiosPrivate = useAxiosPrivate()

    const addCreateCard = (e) => {
        e.preventDefault()
        createCard(uuidv4())
    }

    const sendFlashcardSet = async (e) => {
        e.preventDefault()

        console.log(cards)
        const questions = Object.values(cards)
        console.log(questions)

        const dataToSend = {
            title: 'title2',
            description: 'description',
            subject: 'matematika',
            questions
        }

        console.log(dataToSend)

        try {
            await axiosPrivate.post('/r/flashcard', dataToSend)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <main className="container">
            <button className="btn v-btn" onClick={addCreateCard}><SquarePlus /> Add new card</button>
            {Object.entries(cards).map(([id, card]) => (
                <CreationCard key={id} id={id} card={card} />
            ))}
            <button className="btn v-btn" onClick={sendFlashcardSet}>Dump cards store</button>
        </main>
    )
}
