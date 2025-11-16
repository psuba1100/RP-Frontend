import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
  return (
    <>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
    </>
  )
}
