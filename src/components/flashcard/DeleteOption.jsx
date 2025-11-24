import { Trash, TriangleAlert } from "lucide-react"
import { useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function DeleteOption({ setErrMsg }) {
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()
    const { flashcardId } = useParams()

    const [agree, setAgree] = useState(false)

    const remove = async (e) => {
        e.preventDefault()

        if (agree) {
            try {
                await axiosPrivate.delete('/r/flashcard', {
                    data: {
                        flashcardId
                    }
                })

                navigate('/u/flashcards')
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
    }

    return (
        <div className="container">
            <h2><TriangleAlert />ATTENTION</h2>
            <p>You are about to delete this flashcard set. This action cannot be undone. All images within the set will also be permanently deleted. Once removed, any users who have saved this set in their library will no longer have access to it. Do you want to continue?</p>
            <label className="container-h">
                <input type="checkbox" checked={agree} onChange={() => setAgree((prev) => !prev)} />
                I know what I am doing and I wish to proceed.
            </label>
            <button className="btn" disabled={!agree} onClick={remove}><Trash /> Delete permanently</button>
        </div>
    )
}
