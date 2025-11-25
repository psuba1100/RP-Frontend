import { Trash } from "lucide-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { useSubjectStore } from "../../store/subjectsStore";

export default function SubjectElement({ subject, setErrMsg }) {
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()

    const removeSubject = useSubjectStore((s) => s.removeSubject)

    const deleteSubject = async (e) => {
        e.preventDefault()

        try {
            await axiosPrivate.delete('/u/subject', {
                data: {
                    subjectName: subject
                }
            })

            removeSubject(subject)
            setErrMsg('')
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || err?.message || "Unknown error";

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }

            setErrMsg(message)
        }
    }
    return (
        <li className="container-h">
            {subject}
            <button className="btn" onClick={deleteSubject}><Trash /></button>
        </li>
    )
}
