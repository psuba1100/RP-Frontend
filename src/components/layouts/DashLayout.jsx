import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { Coffee, House, LogOut } from "lucide-react"
import axios from "../../api/axios"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useTasksStore } from "../../store/tasksStore"
import { useEffect, useState } from "react"

const LOGOUT_URL = '/auth/logout'

export default function DashLayout() {
  const username = useAuthStore((s) => s.username)
  const clearAuthStore = useAuthStore((s) => s.clearAuthStore)
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(LOGOUT_URL,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      console.log(response)
      clearAuthStore()
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
