import { Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import '../../css/u.css'
import { House, LogOut } from "lucide-react"
import axios from "../../api/axios"

const LOGOUT_URL = '/auth/logout'

export default function DashLayout() {
  const username = useAuthStore((s) => s.username)
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGOUT_URL,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )

      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <nav>
        <button className="btn" onClick={() => navigate('/u')}><House /></button>
        <div className="center">
          Locked in as {username}
          <button className="btn" onClick={handleLogout}>Log out <LogOut /></button>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
