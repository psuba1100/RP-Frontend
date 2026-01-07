import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useGlobalSettingsStore } from "../../store/globalSettingsStorage";

export default function PersistLogin() {
    const refreshToken = useAuthStore((s) => s.refreshToken)
    const accessToken = useAuthStore((s) => s.accessToken)
    const trustThisDevice = useGlobalSettingsStore((s) => s.trustThisDevice)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try {
                await refreshToken()
            }
            catch(err) {
                console.error(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }

        !accessToken ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

    return (
        <>
            {!trustThisDevice
                ? <Outlet/>
                : isLoading
                    ? <p>Loading... </p>
                    : <Outlet/>
            }
        </>
    )
}
