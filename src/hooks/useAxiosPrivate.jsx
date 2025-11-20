import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export default function useAxiosPrivate() {
    const refresh = useAuthStore((s) => s.refreshToken)
    const accessToken = useAuthStore((s) => s.accessToken)

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`
                }
                return config
            }, (err) => {
                Promise.reject(err)
            }
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (err) => {
                const prevRequest = err?.config
                if(err?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(err)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [refresh, accessToken])
    return axiosPrivate
}
