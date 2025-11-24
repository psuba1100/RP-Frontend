import { BookMarked, Check, Ellipsis, Share2, Trash } from "lucide-react"
import { useSubjectStore } from "../../store/subjectsStore"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useEffect, useState } from "react"
import { useFlashcardStore } from "../../store/flashcardStore"
import { useParams } from "react-router-dom"
import Modal from "../../components/utility/Modal"
import ShareOption from "../../components/flashcard/ShareOption"
import SaveOption from "../../components/flashcard/SaveOption"
import DeleteOption from "../../components/flashcard/DeleteOption"

export default function SetOptions() {
    const metadata = useFlashcardStore((s) => s.metadata)

    const axiosPrivate = useAxiosPrivate()

    const [saved, setSaved] = useState(metadata.saved)
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState('')
    const [picking, setPicking] = useState(true)
    const [newSubject, setNewSubject] = useState('')
    const [errMrg, setErrMsg] = useState('')
    const [operation, setOperation] = useState('share')
    const { flashcardId } = useParams()

    useEffect(() => {
        setSaved(metadata.saved)
    }, [metadata])
    return (
        <>
            <button className="btn" onClick={(e) => { setOpen(true) }}> <Ellipsis /> Options</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <div className="container">
                        <p className="err">{errMrg}</p>
                        <section className="container-h">
                            <section className="container">
                                <button className="btn" disabled={operation == 'share'} onClick={() => setOperation('share')}><Share2 /> Share</button>
                                <button className="btn" disabled={operation == 'save'} onClick={() => setOperation('save')}><BookMarked /> Save</button>
                                {metadata.relation == 'owner'
                                    ? <button className="btn" disabled={operation == 'delete'} onClick={() => setOperation('delete')}><Trash /> Delete</button>
                                    : <></>
                                }
                            </section>
                            <section className="container">
                                {
                                    operation == 'share' && <ShareOption />
                                }
                                {
                                    operation == 'save' && <SaveOption setErrMsg={setErrMsg}/>
                                }
                                {
                                    operation == 'delete' && <DeleteOption setErrMsg={setErrMsg}/>
                                }

                            </section>
                        </section>
                        <button className="btn" onClick={() => { setOpen(false) }}>return</button>
                    </div>
                </Modal>
            )}
        </>
    )
}

/*
{saved
                            ? <button className="btn" disabled><Check /> Already saved</button>
                            : <button className="btn" onClick={(e) => { setOpen(true), fetchSubjects(axiosPrivate, location) }}><BookMarked /> Save to library</button>
                        }
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
*/