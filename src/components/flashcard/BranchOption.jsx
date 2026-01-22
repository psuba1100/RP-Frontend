import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate, useParams } from 'react-router-dom'
import { useNewFlashcardStore } from '../../store/newFlashcardStore'

export default function BranchOption({ setErrMsg }) {
    const axiosPrivate = useAxiosPrivate()
    const [disabled, setDisabled] = useState(false)
    const { flashcardId } = useParams()
    const addCard = useNewFlashcardStore((s) => s.addCard)
    const clearCards = useNewFlashcardStore((s) => s.clearCards)
    const navigate = useNavigate()

    const handleBranch = async (e) => {
        e.preventDefault()
        setErrMsg('Hang on, loading the resources...')
        setDisabled(true)
        let response;

        try {
            response = await axiosPrivate.get(`/r/flashcard/${flashcardId}`)
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || err?.message || "Unknown error";

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }

            setErrMsg(message)
            setDisabled(false)
        }

        clearCards()

        const { questions } = response.data
        questions.forEach(question => {
            const {front, back} = question
            addCard(uuidv4(), front, back)
        });

        navigate('/u/create')
    }

    return (
        <div className="block vertical text-center">
            <h2>Branch this set!</h2>
            <p>You can create a new set of flashcrads by modifying or adding cards to this one</p>

            <button className="btn btn-primary mt" onClick={handleBranch} disabled={disabled}>Let's do it!</button>
        </div>
    )
}
