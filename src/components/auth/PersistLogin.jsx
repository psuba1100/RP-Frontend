import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function PersistLogin() {
    const refreshToken = useAuthStore((s) => s.refreshToken)
    const accessToken = useAuthStore((s) => s.accessToken)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        const verifyRefreshToken = async () => {
            try {
                await refreshToken()
            }
            catch(err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }
        }

        !accessToken ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    useEffect(()=> {
        console.log(`isLoading ${isLoading}`)
        console.log(`access token ${accessToken}`)
    }, [isLoading])
    return (
        <>
            {isLoading
                ? <p>Loading... </p>
                : <Outlet/>
            }
        </>
    )
}
