import { useLocation, useParams } from "react-router-dom"
import { useFlashcardStore } from "../store/flashcardStore"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useEffect, useState } from "react"
import Card from "../features/flashcards/Card"

export default function Flashcard() {
    const fetchFlashcard = useFlashcardStore((s) => s.fetchFlashcard)
    const questionNumber = useFlashcardStore((s) => s.questionNumber)
    const questions = useFlashcardStore((s) => s.questions)
    const shuffleVersion = useFlashcardStore((s) => s.shuffleVersion)

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()

    const { flashcardId } = useParams()

    const [currentQuestion, setCurrentQuestion] = useState({front: {text: '', image: ''}, back: {text: '', image: ''}})
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setErrMsg(fetchFlashcard(axiosPrivate, location, flashcardId))
    }, [])

    useEffect(() => {
        if((questionNumber === "" || isNaN(questionNumber))) return

        setCurrentQuestion(questions[questionNumber-1])
    }, [questionNumber, questions])

    return (
        <div className="container">
            <p className="err">{errMsg}</p>
            <Card question={currentQuestion} key={`${shuffleVersion}-${questionNumber}`}/>
        </div>
    )
}
