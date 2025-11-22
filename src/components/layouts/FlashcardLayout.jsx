import { Outlet, useParams } from "react-router-dom";
import { useFlashcardStore } from "../../store/flashcardStore";
import { ArrowBigLeft, ArrowBigRight, BookMarked, Check, Dices } from "lucide-react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Modal from "../utility/Modal";
import { useSubjectStore } from "../../store/subjectsStore";

export default function FlashcardLayout() {
    const metadata = useFlashcardStore((s) => s.metadata)
    const numberOfQuestions = useFlashcardStore((s) => s.numberOfQuestions)
    const questionNumber = useFlashcardStore((s) => s.questionNumber)
    const setQuestionNumber = useFlashcardStore((s) => s.setQuestionNumber)
    const shuffle = useFlashcardStore((s) => s.shuffle)
    const subjects = useSubjectStore((s) => s.subjects)
    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)

    const axiosPrivate = useAxiosPrivate()

    const [saved, setSaved] = useState(metadata.saved)
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState('')
    const [picking, setPicking] = useState(true)
    const [newSubject, setNewSubject] = useState('')
    const [errMrg, setErrMsg] = useState('')
    const { flashcardId } = useParams()

    useEffect(() => {
        setSaved(metadata.saved)
    }, [metadata])

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
                setOpen(false)
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
                setOpen(false)
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

            setErrMsg(message)
        }
    }

    return (
        <section className="container main">
            <Outlet />
            <footer>
                <div className="element">
                    {`${metadata.title} created by ${metadata.relation == 'owner' ? 'you' : metadata.owner}`}
                </div>
                <div className="container-h element">
                    <button className="btn" onClick={(e) => { if (questionNumber > 1) setQuestionNumber(questionNumber - 1) }}><ArrowBigLeft /></button>
                    <input
                        type="number"
                        className="input"
                        value={questionNumber}
                        onChange={(e) => {
                            let val = e.target.value;

                            if (val === "") {
                                setQuestionNumber("");
                                return;
                            }

                            val = Number(val);

                            if (val < 1) val = 1;
                            if (val > numberOfQuestions) val = numberOfQuestions;

                            setQuestionNumber(val);
                        }}
                        onBlur={() => {
                            if (questionNumber === "" || isNaN(questionNumber)) {
                                setQuestionNumber(1);
                            }
                        }}
                        min={1}
                        max={numberOfQuestions}
                    />
                    <div>{`/${numberOfQuestions}`}</div>
                    <button className="btn" onClick={(e) => { if (questionNumber < numberOfQuestions) setQuestionNumber(questionNumber + 1) }}><ArrowBigRight /></button>
                </div>
                <div className="container-h element">
                    <button className="btn" onClick={(e) => {
                        shuffle()
                    }}><Dices /></button>
                    {saved
                        ? <button className="btn" disabled><Check /> Already saved</button>
                        : <button className="btn" onClick={(e) => { setOpen(true), fetchSubjects(axiosPrivate, location) }}><BookMarked /> Save to library</button>
                    }
                </div>
            </footer>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <div className="container">
                        <p className="err">{errMrg}</p>
                        {picking
                            ? (
                                <label>
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
                                <label>
                                    Name a new subject you want to store this set under:
                                    <input
                                        type="text"
                                        className="input"
                                        value={newSubject}
                                        onChange={(e) => setNewSubject(e.target.value)}
                                    ></input>
                                </label>
                            )
                        }

                        <button className="btn" onClick={(e) => setPicking((prev) => !prev)}>{
                            picking
                                ? 'Create new subject instead'
                                : 'Pick from existing subjects instead'
                        }</button>

                        <button className="btn" onClick={save}>Add to the library!</button>
                        <button className="btn" onClick={() => { setOpen(false) }}>cancel</button>
                    </div>
                </Modal>
            )}
        </section>
    )
}