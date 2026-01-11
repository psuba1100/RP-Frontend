import { Send, SquarePlus } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';
import { useNewFlashcardStore } from "../store/newFlashcardStore";
import CreationCard from "../features/flashcards/CreationCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSubjectStore } from "../store/subjectsStore";
import { useState } from "react";
import Modal from "../components/utility/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import TextAssist from "../features/flashcards/TextAssist";

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

        const questions = Object.values(cards)

        const dataToSend = {
            title,
            description,
            subject,
            questions
        }

        try {
            await axiosPrivate.post('/r/flashcard', dataToSend)

            setOpen(false)
            setTitle('')
            setDescription('')
            setSubject('')
            clearCards('')
            setErrMsg('Created!')
        } catch (err) {
            console.error(err)
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
        <main className="main vertical elements-top">
            <p>{errMsg}</p>
            <div className="block horizontal-priority g-2">
                <TextAssist />
                <button className="btn v-btn" onClick={() => { setOpen(true); fetchSubjects(axiosPrivate, location, navigate) }}><Send /> Questions are done, let's finish!</button>
            </div>
            {Object.entries(cards).map(([id, card]) => (
                <CreationCard key={id} id={id} card={card} />
            ))}
            <button className="btn mt" onClick={addCreateCard}><SquarePlus /> Add new card</button>
            <p className="tiny"><em>To make a flashcard set, start by creating a subject. Keep in mind that images may not be saved if the set isn’t submitted within 50 minutes of adding them. Images you upload are accessible to anyone on the internet. Everything you write on the flashcards can be accessed by other Winkify users. Do not include sensitive, personal or confidential information.</em></p>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <div className="block vertical">
                        <p>{errMsg}</p>
                        <form onSubmit={sendFlashcardSet} className="block vertical">
                            <label className="block">
                                Pick a subject:
                                <select className="m" required value={subject} onChange={(e) => setSubject(e.target.value)}>
                                    <option value="">— None —</option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject} translate='no'>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block mt">
                                Title:
                                <input
                                    autoComplete="off"
                                    maxLength={32}
                                    required
                                    type="text"
                                    className="input m"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} />
                            </label>

                            <label className="block mt">
                                Desc:
                                <input
                                    autoComplete="off"
                                    maxLength={200}
                                    required
                                    type="text"
                                    className="input m"
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </label>

                            <button type='submit' className="btn btn-primary">Create</button>
                        </form>

                        <button className="btn mt" onClick={() => { setOpen(false) }}>Cancel and return to questions</button>
                    </div>
                </Modal>
            )}
        </main>
    )
}