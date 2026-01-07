import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import axios from "../api/axios"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useGlobalSettingsStore } from "../store/globalSettingsStorage"
import { useNewFlashcardStore } from "../store/newFlashcardStore"

const LOGIN_URL = '/auth'

export default function Login() {
    const setAuth = useAuthStore((state) => state.setAuth)
    const setTrustThisDevice = useGlobalSettingsStore((s) => s.setTrustThisDevice)
    const clearCards = useNewFlashcardStore((s) => s.clearCards)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/u'

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [trustDevice, setTrustDevice] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        clearCards()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    useEffect(() => {
        setTrustThisDevice(trustDevice)
    }, [trustDevice])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL,
                {
                    username,
                    password
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            const accessToken = response?.data?.accessToken

            setAuth({ username, accessToken })

            setUsername('')
            setPassword('')

            navigate(from, { replace: true })
        } catch (err) {
            console.error(err)
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err?.response?.data?.message) {
                setErrMsg(err.response.data.message)
            } else {
                setErrMsg('Login failed')
            }
        }
    }

    return (
        <section className="container vertical">
            <h1>Ready to lock in?</h1>
            <form onSubmit={handleSubmit} className="block vertical w">
                <label htmlFor="username" className="itemStart">Username</label>
                <input
                    maxLength={32}
                    className="input"
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
                <label htmlFor="password" className="mt itemStart">Password</label>
                <input
                    maxLength={32}
                    className="input"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
                <p>{errMsg}</p>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
            <p className="mt">Don't have an account? <Link to='/register' className="link">Create one!</Link></p>
        </section>
    )
}
