import { useLocation, useNavigate } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useSubjectStore } from "../../store/subjectsStore"
import { useEffect, useState } from "react"
import { Coffee, Plus, SquarePlus } from "lucide-react"
import SubjectElement from "./SubjectElement"

export default function SubjectList() {
    const subjects = useSubjectStore((s) => s.subjects)
    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)
    const addSubject = useSubjectStore((s) => s.addSubject)

    const [newSubject, setNewSubject] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        fetchSubjects(axiosPrivate, location, navigate)
    }, [])

    const createSubject = async (e) => {
        e.preventDefault()

        try {
            await axiosPrivate.post('/u/subject', {
                subjectName: newSubject
            })

            addSubject(newSubject)
            setNewSubject('')
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
        <section className="block vertical item">
            <p>{errMsg}</p>
            <div className="block">
                <label htmlFor="newSubject"></label>
                <input
                    autoComplete="off"
                    maxLength={32}
                    placeholder="Subject name"
                    type="text"
                    id="newSubject"
                    className="input"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)} />
                <button className="btn" onClick={createSubject}><Plus /> Add</button>
            </div>
            <ul className="block vertical g-05">
                {subjects?.length
                    ? subjects.map((subject) => <SubjectElement key={subject} subject={subject} setErrMsg={setErrMsg} />)
                    : <p><Coffee /> No subjects yet. Why don't you add some?</p>
                }
            </ul>
        </section>
    )
}
