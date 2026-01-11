import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useFlashcardStore } from "../store/flashcardStore"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useEffect, useState } from "react"
import Card from "../features/flashcards/Card"
import { Ellipsis } from "lucide-react"

export default function Flashcard() {
    const fetchFlashcard = useFlashcardStore((s) => s.fetchFlashcard)
    const questionNumber = useFlashcardStore((s) => s.questionNumber)
    const questions = useFlashcardStore((s) => s.questions)
    const shuffleVersion = useFlashcardStore((s) => s.shuffleVersion)

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()

    const { flashcardId } = useParams()

    const [currentQuestion, setCurrentQuestion] = useState({front: {text: '', image: ''}, back: {text: '', image: ''}})
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setErrMsg(fetchFlashcard(axiosPrivate, location, navigate, flashcardId))
    }, [])

    useEffect(() => {
        if((questionNumber === "" || isNaN(questionNumber))) return

        setCurrentQuestion(questions[questionNumber-1])
    }, [questionNumber, questions])

    return (
        <div className="main vertical">
            <p className="tiny"><em>This set was created by a user of our service. We are not responsible for its content. You can report the set anonymously via the 'Options' menu.</em></p>
            <p className="err">{errMsg}</p>
            <Card question={currentQuestion} key={`${shuffleVersion}-${questionNumber}`}/>
        </div>
    )
}
