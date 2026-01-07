import { useState } from "react"
import { axiosPrivate } from "../../api/axios"
import { Trash, TriangleAlert } from "lucide-react"
import Modal from "../utility/Modal"
import { useNavigate } from "react-router-dom"

export default function DeleteAcc() {
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [agree, setAgree] = useState(false)

    const navigate = useNavigate()

    const handleDelete = async (e) => {
        e.preventDefault()

        try {
            await axiosPrivate.delete("/users", {
                data: {
                    password
                }
            })

            navigate('/')
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || err?.message || "Unknown error";

            if (status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }

            setErrMsg(message)
        }
    }
    return (
        <>
            <button className="btn" onClick={() => setOpen(true)}>
                <Trash />
                Delete account
            </button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <div className="block vertical">
                        <p>{errMsg}</p>
                        <form onSubmit={handleDelete} className="block vertical">
                            <div className="block vertical">
                                <label htmlFor="password">Enter your password</label>
                                <input
                                    maxLength={32}
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    className="input"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </div>


                            <h2><TriangleAlert />{' ATTENTION'}</h2>
                            <p>You are about to delete your account. This action cannot be undone. Any content you uploaded to the server, such as flashcards or images will be permanently deleted. Once removed, any users who have saved your flashcard sets in their library will no longer have access to them. Do you want to continue?</p>

                            <input
                                className="checkbox mt"
                                type="checkbox"
                                id="trustThisDevice"
                                checked={agree}
                                onChange={(e) => setAgree(prev => !prev)}
                            />
                            <label htmlFor="trustThisDevice" className="mt">I know what I am doing and I wish to proceed.</label>

                            <div className="block horizontal-priority mt">
                                <button type="submit" className="btn btn-primary" disabled={!agree}>Delete account</button>
                                <button className="btn m" onClick={() => { setOpen(false); setPassword(''); setErrMsg('') }}>Cancel</button>
                            </div>
                        </form>

                    </div>
                </Modal>
            )}
        </>
    )
}
