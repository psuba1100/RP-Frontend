import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export default function useAxiosPrivate() {
    const refresh = useAuthStore((s) => s.refreshToken)
    const accessToken = useAuthStore((s) => s.accessToken)

    useEffect(()=>{
        console.log('implementing interceptors...')
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                console.log("final headers sent:", config.headers);
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
                    console.log(`Old access token: ${accessToken}`)
                    const newAccessToken = await refresh()
                    console.log(`New access token ${newAccessToken}`)
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
