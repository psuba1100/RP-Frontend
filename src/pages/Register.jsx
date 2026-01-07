import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalSettingsStore } from "../store/globalSettingsStorage";
import { useNewFlashcardStore } from "../store/newFlashcardStore";

export default function Register() {
    const PWD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~])[A-Za-z\d!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]{8,32}$/;
    const REGISTER_URL = '/users';

    const navigate = useNavigate()
    const setAuth = useAuthStore((s) => s.setAuth)
    const setTrustThisDevice = useGlobalSettingsStore((s) => s.setTrustThisDevice)
    const clearCards = useNewFlashcardStore((s) => s.clearCards)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState('')
    const [passwordMatchValid, setPasswordMatchValid] = useState(false)
    const [trustDevice, setTrustDevice] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        clearCards()
    }, [])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))

        if (!validPassword) {
            setErrMsg('Password must be 8–32 characters long, and must include at least one uppercase letter, one number, and one special character.')
        }
        else setErrMsg('')
    }, [password])

    useEffect(() => {
        setPasswordMatchValid(password == passwordMatch)
        if (validPassword && !passwordMatchValid) {
            setErrMsg('Password must match.')
        }
        else if (validPassword && passwordMatchValid) {
            setErrMsg('')
        }
    }, [passwordMatch])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const v = PWD_REGEX.test(password);
        if (!v) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                {
                    username,
                    password
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response.data.accessToken

            setAuth({ username, accessToken })

            navigate('/u', { replace: true })

            setUsername('')
            setPassword('')
            setPasswordMatch('')
            setErrMsg('')
        } catch (err) {
            console.error(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg(err.response?.data?.message ? `${err.response.data.message}` : 'registration failed')
            }
        }
    }

    useEffect(() => {
        setTrustThisDevice(trustDevice)
    }, [trustDevice])

    return (
        <div className="container vertical">
            <h1>Create account</h1>
            <form onSubmit={handleSubmit} className="block vertical w">
                <label htmlFor="username" className="m itemStart">
                    Username
                </label>
                <input
                    maxLength={32}
                    type="text"
                    id="username"
                    className="input"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password" className="m mt itemStart">
                    Password
                </label>
                <input
                    maxLength={32}
                    type="password"
                    id="password"
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <label htmlFor="confirm_pwd" className="m mt itemStart"> Confirm Password </label>
                <input
                    maxLength={32}
                    type="password"
                    id="confirm_pwd"
                    className="input"
                    onChange={(e) => setPasswordMatch(e.target.value)}
                    value={passwordMatch}
                    required
                />
                <input
                    className="checkbox mt itemStart"
                    type="checkbox"
                    id="trustThisDevice"
                    checked={trustDevice}
                    onChange={(e) => setTrustDevice(prev => !prev)}
                />
                <label htmlFor="trustThisDevice" className="mt itemStart">Trust this device?</label>
                <p className="itemStart">{errMsg}</p>
                <button disabled={!validPassword || !passwordMatchValid ? true : false} className="btn btn-primary" type="submit">Sign Up</button>
            </form>
            <p className="mt">Already have an account? <Link to='/login' className="link">Log in!</Link></p>
        </div>
    )
}