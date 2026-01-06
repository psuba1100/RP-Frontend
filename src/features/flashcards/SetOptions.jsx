import { BookMarked, Ellipsis, Share2, Trash } from "lucide-react"
import { useState } from "react"
import { useFlashcardStore } from "../../store/flashcardStore"
import Modal from "../../components/utility/Modal"
import ShareOption from "../../components/flashcard/ShareOption"
import SaveOption from "../../components/flashcard/SaveOption"
import DeleteOption from "../../components/flashcard/DeleteOption"

export default function SetOptions() {
    const metadata = useFlashcardStore((s) => s.metadata)

    const [open, setOpen] = useState(false)
    const [errMrg, setErrMsg] = useState('')
    const [operation, setOperation] = useState('share')

    return (
        <>
            <button className="btn" onClick={(e) => { setOpen(true) }}> <Ellipsis /> <span className="phone-hidden">Options</span></button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <div className="block vertical">
                        <p className="err">{errMrg}</p>
                        <section className="block stretch">
                            <section className="block vertical item">
                                <button className="btn" disabled={operation == 'share'} onClick={() => setOperation('share')}><Share2 /> Share</button>
                                <button className="btn" disabled={operation == 'save'} onClick={() => setOperation('save')}><BookMarked /> Save</button>
                                {metadata.relation == 'owner'
                                    ? <button className="btn" disabled={operation == 'delete'} onClick={() => setOperation('delete')}><Trash /> Delete</button>
                                    : <></>
                                }
                            </section>
                            <section className="item h-elements-right">
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
                        <button className="btn mt" onClick={() => { setOpen(false) }}>Close</button>
                    </div>
                </Modal>
            )}
        </>
    )
}