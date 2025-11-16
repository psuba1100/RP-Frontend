import { Coffee, Plus } from "lucide-react";
import { useEffect, useState } from "react"
import Task from "../features/todo/Task";
import { useTasksStore } from "../store/tasksStore";
import { useSearchParams } from "react-router-dom";
import { useSubjectStore } from "../store/subjectsStore";
import Modal from "../components/utility/Modal";
import axios from "../api/axios";
import { useAuthStore } from "../store/authStore";

const TODO_TASK_URL = '/u/todo'

export default function Tasks() {
    const fetchTasks = useTasksStore((s) => s.fetchTasks)
    const tasks = useTasksStore((s) => s.tasks)
    const count = useTasksStore((s) => s.count)
    const accessToken = useAuthStore((s) => s.accessToken)

    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)
    const subjects = useSubjectStore((s) => s.subjects)

    const [searchParams, setSearchParams] = useSearchParams();

    const [pageLinks, setPageLinks] = useState([])
    const [open, setOpen] = useState(false);

    const p = parseInt(searchParams.get("p")) || 1
    const s = searchParams.get("s") || ""

    const createPages = (min, max, current) => {
        const result = [current]

        for (let i = 1; i <= 3; i++) {
            if (current - i >= min) {
                result.unshift(<button key={current - i} onClick={(e) => setSearchParams({ p: current - i, s })} className="btn">{current - i}</button>);
            } else {
                break;
            }
        }

        for (let i = 1; i <= 3; i++) {
            if (current + i <= max) {
                result.push(<button key={current + i} onClick={(e) => setSearchParams({ p: current + i, s })} className="btn">{current + i}</button>);
            } else {
                break;
            }
        }

        console.log(min, max, current, result)

        setPageLinks(result)
    }
    useEffect(() => {
        fetchTasks(p, s)
        fetchSubjects()
        createPages(0, Math.floor(count / 10), p)
    }, [])

    const [selected, setSelected] = useState("")

    useEffect(() => {
        fetchTasks(p, s)
        fetchSubjects()
        createPages(1, Math.floor(count / 10) + 1, parseInt(p))
    }, [p])

    useEffect(() => {
        setSearchParams({ p: 1, s })
        fetchTasks(p, s)
        fetchSubjects()
        createPages(1, Math.floor(count / 10) + 1, parseInt(p))
    }, [s])

    const changeSubject = (e) => {
        e.preventDefault()

        setSelected(e.target.value);
        setSearchParams({ s: e.target.value, p })
        console.log("Selected:", e.target.value);
    }

    useEffect(() => {
        createPages(1, Math.floor(count / 10) + 1, parseInt(p))
    }, [count])

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskSubject, setTaskSubject] = useState('')
    const [taskDueDate, setTaskDueDate] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const createTask = async (e) => {
        e.preventDefault();
        setOpen(false)

        try {
            const response = await axios.post(TODO_TASK_URL, {
                title: taskTitle,
                description: taskDescription,
                subject: taskSubject,
                dueDate: taskDueDate
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true
            })

            setTaskTitle('')
            setTaskDescription('')
            setTaskSubject('')
            setTaskDueDate('')

            setErrMsg(response.data.message)
            fetchTasks()
        } catch (err) {
            if(!err?.response?.data?.message){
                setErrMsg('There was problem with creating a task')
            } else {
                setErrMsg(err.response.data.message)
            }
        }
    }

    return (
        <main className="container">
            <p>{errMsg}</p>
            <h2>Maturity is not by age, but by the acceptance of your responsibilities:</h2>

            <button className='btn btn-v' onClick={() => { setOpen(true); fetchSubjects() }}><Plus /> Add new task</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <form onSubmit={createTask}>
                        <label>
                            Pick a subject:
                            <select required value={taskSubject} onChange={(e) => setTaskSubject(e.target.value)}>
                                <option value="">— None —</option>
                                {subjects.map((taskSubject) => (
                                    <option key={taskSubject} value={taskSubject}>
                                        {taskSubject}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label htmlFor="title">Title</label>
                        <input
                            required
                            type="text"
                            className="input"
                            id="title"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)} />
                        <label htmlFor="description">Description</label>
                        <input
                            required
                            type="text"
                            className="input"
                            id="description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)} />
                        <label htmlFor="date">date</label>
                        <input
                            required
                            type="date"
                            id="date"
                            onChange={(e) => setTaskDueDate(new Date(e.target.value).toISOString())} />
                        <button type='submit' className="btn">Add new task</button>
                    </form>

                    <button className="btn" onClick={() => { setOpen(false) }}>Cancel</button>
                </Modal>
            )}

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

            <ul>
                {tasks?.length
                    ? tasks.map(task => <Task key={task._id} task={task} />)
                    : <p>No tasks, enjoy the time for yourself <Coffee /></p>
                }
            </ul>
            <div className="container-h">
                {pageLinks?.length
                    ? pageLinks.map(link => <>{link}</>)
                    : <></>
                }
            </div>
        </main>
    )
}