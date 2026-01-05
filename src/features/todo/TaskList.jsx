import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSubjectStore } from "../../store/subjectsStore";
import Task from './Task.jsx'
import { useTasksStore } from "../../store/tasksStore";
import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";

export default function TaskList() {
    const fetchTasks = useTasksStore((s) => s.fetchTasks)
    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)
    const subjects = useSubjectStore((s) => s.subjects)
    const tasks = useTasksStore((s) => s.tasks)
    const count = useTasksStore((s) => s.count)
    const clearTasksStore = useTasksStore((s) => s.clearTasksStore)
    const clearSubjectStore = useSubjectStore((s) => s.clearSubjectStore)

    const [searchParams, setSearchParams] = useSearchParams();
    const [pageLinks, setPageLinks] = useState([])
    const [selected, setSelected] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const p = parseInt(searchParams.get("p")) || 1
    const s = searchParams.get("s") || ""

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()

    const createPages = (min, max, current) => {
        const result = [current]

        for (let i = 1; i <= 3; i++) {
            if (current - i >= min) {
                result.unshift(current - i);
            } else {
                break;
            }
        }

        for (let i = 1; i <= 3; i++) {
            if (current + i <= max) {
                result.push(current + i);
            } else {
                break;
            }
        }

        setPageLinks(result)
    }

    const refetchTasks = async () => {
        setIsLoading(true)
        clearSubjectStore()
        clearTasksStore()

        try {
            await fetchTasks(axiosPrivate, location, navigate, p, s)
            await fetchSubjects(axiosPrivate, location, navigate)
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        refetchTasks()
    }, [])

    useEffect(() => {
        refetchTasks()
    }, [p, s])

    const changeSubject = (e) => {
        e.preventDefault()

        setSelected(e.target.value);
        setSearchParams({ s: e.target.value, p })
    }

    useEffect(() => {
        createPages(1, Math.floor(count / 10) + 1, parseInt(p))
    }, [count])

    return (
        <section className="container">
            <h2>Maturity is not by age, but by the acceptance of your responsibilities:</h2>

            <label>
                Pick a subject to filter by:
                <select value={selected} onChange={changeSubject}>
                    <option value="">— None —</option>
                    {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </label>

            {isLoading
                ? <p>Loading...</p>
                : (
                    <ul>
                        {tasks?.length
                            ? tasks.map(task => <Task key={task._id} task={task} />)
                            : <p>No tasks, enjoy the time for yourself <Coffee /></p>
                        }
                    </ul>
                )
            }

            <ul className="container-h">
                {pageLinks?.length
                    ? pageLinks.map((link) => link != p
                        ? <li key={link}><button className="btn" onClick={(e) => setSearchParams({ p: link, s })}>{link}</button></li>
                        : <li key={link}>{link}</li>)
                    : <></>
                }
            </ul>
        </section>
    )
}
