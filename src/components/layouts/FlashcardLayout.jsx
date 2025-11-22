import { Outlet } from "react-router-dom";
import { useFlashcardStore } from "../../store/flashcardStore";
import { ArrowBigLeft, ArrowBigRight, BookMarked, Check, Dices } from "lucide-react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function FlashcardLayout() {
    const metadata = useFlashcardStore((s) => s.metadata)
    const numberOfQuestions = useFlashcardStore((s) => s.numberOfQuestions)
    const questionNumber = useFlashcardStore((s) => s.questionNumber)
    const setQuestionNumber = useFlashcardStore((s) => s.setQuestionNumber)
    const shuffle = useFlashcardStore((s) => s.shuffle)

    const axiosPrivate = useAxiosPrivate()

    const [saved, setSaved] = useState(metadata.saved)

    useEffect(() => {
        setSaved(metadata.saved)
    }, [metadata])

    const save = (e) => {
        e.preventDefault()

        try {
            //axiosPrivate.post('/u/flashcards', {
            //
            //})
            setSaved(true)
        } catch (err) {
            console.error(err)
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
                        ? <button className="btn" disabled><Check/> Already saved</button>
                        : <button className="btn" onClick={save}><BookMarked /> Save to library</button>
                    }
                </div>
            </footer>
        </section>
    )
}