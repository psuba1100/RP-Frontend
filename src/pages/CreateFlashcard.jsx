import { SquarePlus } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';
import { useNewFlashcardStore } from "../store/newFlashcardStore";
import CreationCard from "../features/flashcards/creationCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSubjectStore } from "../store/subjectsStore";
import { useState } from "react";
import Modal from "../components/utility/Modal";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateFlashcard() {
    const cards = useNewFlashcardStore((s) => s.cards);
    const createCard = useNewFlashcardStore((s) => s.createCard);
    const clearCards = useNewFlashcardStore((s) => s.clearCards)
    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)
    const subjects = useSubjectStore((s) => s.subjects)
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [subject, setSubject] = useState('')
    const [errMsg, setErrMsg] = useState('')

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
            title,
            description,
            subject,
            questions
        }

        console.log(dataToSend)

        try {
            await axiosPrivate.post('/r/flashcard', dataToSend)

            setOpen(false)
            setTitle('')
            setDescription('')
            setSubject('')
            clearCards('')
            setErrMsg('Created!')
        } catch (err) {
            console.log(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || "Unknown error";

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }

            setErrMsg(message)
        }
    }
    return (
        <main className="container">
            <p>{errMsg}</p>
            <button className="btn v-btn" onClick={addCreateCard}><SquarePlus /> Add new card</button>
            {Object.entries(cards).map(([id, card]) => (
                <CreationCard key={id} id={id} card={card} />
            ))}
            <button className="btn v-btn" onClick={() => { setOpen(true); fetchSubjects(axiosPrivate, location, navigate) }}>Dump cards store</button>

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <p>{errMsg}</p>
                    <form onSubmit={sendFlashcardSet}>
                        <label>
                            Pick a subject:
                            <select required value={subject} onChange={(e) => setSubject(e.target.value)}>
                                <option value="">— None —</option>
                                {subjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label htmlFor="title">Title</label>
                        <input
                            required
                            type="text"
                            className="input"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <label htmlFor="description">Description</label>
                        <input
                            required
                            type="text"
                            className="input"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                        <button type='submit' className="btn">Create</button>
                    </form>

                    <button className="btn" onClick={() => { setOpen(false) }}>Return to questions</button>
                </Modal>
            )}
            <button className="btn" onClick={() => console.log(cards)}>dump</button>
        </main>
    )
}