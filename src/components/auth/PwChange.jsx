import { KeyRound } from "lucide-react";
import Modal from "../utility/Modal";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const PWD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~])[A-Za-z\d!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]{8,32}$/;

export default function PwChange() {
    const [open, setOpen] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('')

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    const changePassword = async (e) => {
        e.preventDefault()

        try {
            if (!PWD_REGEX.test(newPassword)) throw new Error('New password is invalid')

            if (newPassword != newPasswordRepeat) throw new Error('Passwords must match')

            await axiosPrivate.patch('/users', {
                password,
                newPassword
            })

            setPassword('');
            setNewPassword('');
            setNewPasswordRepeat('');
            setErrMsg('Password changed')
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
            <button className="btn btn-v" onClick={() => setOpen(true)}><KeyRound /> Wish to change a password?</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <div>
                        <p>{errMsg}</p>
                        <form onSubmit={changePassword}>
                            <label htmlFor="password">Enter your existing password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                className="input"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />

                            <label htmlFor="newPassword">Enter new password</label>
                            <input
                                id="newPassword"
                                type="password"
                                required
                                value={newPassword}
                                className="input"
                                onChange={(e) => { setNewPassword(e.target.value); PWD_REGEX.test(e.target.value) ? setErrMsg('') : setErrMsg('New password is invalid') }}
                            />

                            <label htmlFor="newPasswordRepeat">Enter new password again</label>
                            <input
                                id="newPasswordRepeat"
                                type="password"
                                required
                                value={newPasswordRepeat}
                                className="input"
                                onChange={(e) => { setNewPasswordRepeat(e.target.value); newPassword == newPasswordRepeat ? setErrMsg('') : setErrMsg('Passwords must match') }}
                            />
                            <button type="submit" className="btn">Change password</button>
                        </form>
                        <button className="btn" onClick={() => { setOpen(false); setPassword(''); setNewPassword(''); setNewPasswordRepeat(''); setErrMsg('') }}>Cancel</button>
                    </div>
                </Modal>
            )}
        </>
    )
}
