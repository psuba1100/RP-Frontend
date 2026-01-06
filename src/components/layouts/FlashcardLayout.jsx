import { Outlet, useParams } from "react-router-dom";
import { useFlashcardStore } from "../../store/flashcardStore";
import { ArrowBigLeft, ArrowBigRight, BookMarked, Check, Dices } from "lucide-react";
import SetOptions from "../../features/flashcards/SetOptions";

export default function FlashcardLayout() {
    const metadata = useFlashcardStore((s) => s.metadata)
    const numberOfQuestions = useFlashcardStore((s) => s.numberOfQuestions)
    const questionNumber = useFlashcardStore((s) => s.questionNumber)
    const setQuestionNumber = useFlashcardStore((s) => s.setQuestionNumber)
    const shuffle = useFlashcardStore((s) => s.shuffle)

    return (
        <>
            <Outlet />
            <footer className="">
                <div className="item block h-elements-left">
                    {`${metadata.title} created by ${metadata.relation == 'owner' ? 'you' : metadata.owner}`}
                </div>
                <div className="block item">
                    <button className="btn" onClick={(e) => { if (questionNumber > 1) setQuestionNumber(questionNumber - 1) }}><ArrowBigLeft /></button>
                    <input
                        type="number"
                        className="input phone-hidden m"
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
                    <div className="phone-hidden m">{`/${numberOfQuestions}`}</div>
                    <button className="btn" onClick={(e) => { if (questionNumber < numberOfQuestions) setQuestionNumber(questionNumber + 1) }}><ArrowBigRight /></button>
                </div>
                <div className="block item h-elements-right">
                    <button className="btn" onClick={(e) => {
                        shuffle()
                    }}><Dices /></button>
                    <SetOptions />
                </div>
            </footer>
        </>
    )
}