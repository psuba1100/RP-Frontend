import { useEffect, useState } from "react";
import { API_URL } from "../../api/config";
import Modal from "../../components/utility/Modal";
import { Fullscreen } from "lucide-react";
import MarkdownRenderer from "../../components/utility/MarkdownRenderer";

export default function Card({ question }) {
    const [flipped, setFlipped] = useState(false);
    const [noAnim, setNoAnim] = useState(false);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setNoAnim(true);
        setFlipped(false);

        const t = setTimeout(() => {
            setNoAnim(false);
        }, 50);

        return () => clearTimeout(t);
    }, [question]);


    return (
        <section className="container vertical g-2">
            <div
                className={`flashcard ${flipped ? "flipped" : ""} ${noAnim ? "no-anim" : ""}`}
                onClick={() => setFlipped(f => !f)}
            >
                <div className="flashcard-inner">
                    <div className="flashcard-front md">
                        <MarkdownRenderer markdown={question.front.text}/>
                        {question.front?.image
                            ? (<img
                                src={`${API_URL}/r/image/${question.front.image}`}
                                crossOrigin="use-credentials"
                                style={{ maxWidth: "200px" }}
                            />)
                            : <></>
                        }
                    </div>
                    <div className="flashcard-back dark md">
                        <MarkdownRenderer markdown={question.back.text}/>
                        {question.back?.image
                            ? (<img
                                src={`${API_URL}/r/image/${question.back.image}`}
                                crossOrigin="use-credentials"
                                style={{ maxWidth: "200px" }}
                            />)
                            : <></>
                        }
                    </div>
                </div>
            </div>

            {
                question[`${flipped ? 'back' : 'front'}`]?.image
                    ? <button className="btn btn-primary" onClick={(e) => { setOpen(true) }}><Fullscreen /> Enlarge image</button>
                    : <></>
            }

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <div className="block vertical">
                        {
                            question[`${flipped ? 'back' : 'front'}`]?.image
                                ? (<img
                                    src={`${API_URL}/r/image/${question[`${flipped ? 'back' : 'front'}`].image}`}
                                    crossOrigin="use-credentials"
                                    style={{ width: 'max-content', maxWidth: '100%', maxHeight:'55vh' }}
                                />)
                                : <></>
                        }

                        <button className="btn btn-primary mt" onClick={() => { setOpen(false) }}>Close</button>
                    </div>
                </Modal>
            )}
        </section>
    );
}