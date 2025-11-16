import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"

export default function RequireAuth() {
    const location = useLocation()
    const user = useAuthStore((state) => state.username)

    return (user ? <Outlet/> : <Navigate to='/login' state={{location}} replace />)
}