import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import axios from "../api/axios"
import { useLocation, useNavigate } from "react-router-dom"

const LOGIN_URL = '/auth'

export default function Login() {
    const setAuth = useAuthStore((state) => state.setAuth)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from ?.pathname || '/u'

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL, 
                {
                    username,
                    password
                },
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )

            const accessToken = response?.data?.accessToken

            setAuth({username, password, accessToken})

            console.log({username, password, accessToken})

            setUsername('')
            setPassword('')

            navigate(from, {replace: true})
        } catch (err) {
            console.error(err)
            if(!err?.response){
                setErrMsg('No Server Response')
            } else if (err?.response?.data?.message){
                setErrMsg(err.response.data.message)
            } else {
                setErrMsg('Login failed')
            }
        }
    }

    return (
        <section className="container">
            <h1>Ready to lock in?</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    className="input"
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    className="input"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <p>{errMsg}</p>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </section>
    )
}
