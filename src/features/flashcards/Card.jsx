import { useEffect, useState } from "react";
import { API_URL } from "../../api/config";
import Modal from "../../components/utility/Modal";
import { Fullscreen } from "lucide-react";

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
        <section className="container">
            <div
                className={`flashcard ${flipped ? "flipped" : ""} ${noAnim ? "no-anim" : ""}`}
                onClick={() => setFlipped(f => !f)}
            >
                <div className="flashcard-inner">
                    <div className="flashcard-front">
                        <p>{question.front.text}</p>
                        {question.front?.image
                            ? (<img
                                src={`${API_URL}/r/image/${question.front.image}`}
                                crossOrigin="use-credentials"
                                style={{ maxWidth: "200px" }}
                            />)
                            : <></>
                        }
                    </div>
                    <div className="flashcard-back">
                        <p className="dark">{question.back.text}</p>
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
                    ? <button className="btn" onClick={(e) => { setOpen(true) }}><Fullscreen /> Enlarge image</button>
                    : <></>
            }

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <div className="container">
                        {
                            question[`${flipped ? 'back' : 'front'}`]?.image
                                ? (<img
                                    src={`${API_URL}/r/image/${question[`${flipped ? 'back' : 'front'}`].image}`}
                                    crossOrigin="use-credentials"
                                    style={{ maxWidth: "700px" }}
                                />)
                                : <></>
                        }

                        <button className="btn" onClick={() => { setOpen(false) }}>close</button>
                    </div>
                </Modal>
            )}
        </section>
    );
}