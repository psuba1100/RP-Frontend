import { Check, X } from "lucide-react"
import { useFlashcardStore } from "../../store/flashcardStore"
import { useState } from "react"
import { useSubjectStore } from "../../store/subjectsStore"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

export default function SaveOption({ setErrMsg }) {
    const metadata = useFlashcardStore((s) => s.metadata)
    const subjects = useSubjectStore((s) => s.subjects)
    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)
    const setMetadataSave = useFlashcardStore((s) => s.setMetadataSave)

    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    const [selected, setSelected] = useState('')
    const [picking, setPicking] = useState(true)
    const [newSubject, setNewSubject] = useState('')
    const [saved, setSaved] = useState(metadata.saved)

    const { flashcardId } = useParams()

    useState(() => {
        fetchSubjects(axiosPrivate, location, navigate)
    }, [])

    const save = async (e) => {
        e.preventDefault()

        try {
            if (picking) {
                if (!selected) throw new Error('You have to pick a subject first')
                await axiosPrivate.post('/u/flashcards', {
                    subject: selected,
                    flashcardId
                })

                setSaved(true)
                setMetadataSave(true)
                setErrMsg('')
            } else {
                if (!newSubject) throw new Error('Please fill in the input field first')
                await axiosPrivate.post('/u/subject', {
                    subjectName: newSubject
                })

                await axiosPrivate.post('u/flashcards', {
                    subject: newSubject,
                    flashcardId
                })

                setSaved(true)
                setMetadataSave(true)
                setErrMsg('')
            }

        } catch (err) {
            console.error(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || err?.message || "Unknown error";

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }

            if (status === 409) {
                setMetadataSave(true)
                setSaved(true)
            }

            setErrMsg(message)
        }
    }

    const remove = async (e) => {
        e.preventDefault()

        try {
            await axiosPrivate.delete('/u/flashcards', {
                data: {
                    flashcardId
                }
            })

            setSaved(false)
            setMetadataSave(false)
            setErrMsg('')
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || err?.message || "Unknown error";

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }

            if (status === 409) {
                setMetadataSave(false)
                setSaved(false)
            }

            setErrMsg(message)
        }
    }

    return (
        <div className="block vertical">
            {metadata.relation == 'owner'
                ? <p className="text-center">This set is stored in your library and cannot be removed since you are the owner. You can, however, delete the flashcard set entirely.</p>
                : (saved
                    ? (
                        <>
                            <label className="block vertical text-center">
                                This set is already in your library. Do you want to remove it?
                                <button className="btn btn-primary mt" onClick={remove}><X /> Remove from library</button>
                            </label>
                        </>
                    )
                    : (
                        <>
                            {
                                picking
                                    ? (
                                        <label className="block vertical text-center">
                                            Pick a subject to store this set under:
                                            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                                                <option value="">— None —</option>
                                                {subjects.map((subject) => (
                                                    <option key={subject} value={subject}>
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    )
                                    : (
                                        <label className="block vertical text-center">
                                            Name a new subject you want to store this set under:
                                            <input
                                                maxLength={32}
                                                autoComplete="off"
                                                type="text"
                                                className="input"
                                                style={{ maxWidth: '90%' }}
                                                value={newSubject}
                                                onChange={(e) => setNewSubject(e.target.value)}
                                            ></input>
                                        </label>
                                    )
                            }
                            <button className="btn mt" onClick={() => setPicking((prev) => !prev)}>{picking ? 'Create new subject instead' : 'Pick existing subject instead'}</button>
                            <button className="btn btn-primary mt" onClick={save}><Check />Add to library</button>
                        </>
                    )
                )
            }
        </div >
    )
}

//