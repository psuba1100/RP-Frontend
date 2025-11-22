import { Plus } from "lucide-react";
import Modal from "../components/utility/Modal";
import TaskList from "../features/todo/TaskList";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSubjectStore } from "../store/subjectsStore";
import { useTasksStore } from "../store/tasksStore";

export default function Tasks() {
    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)
    const subjects = useSubjectStore((s) => s.subjects)
    const fetchTasks = useTasksStore((s) => s.fetchTasks)

    const [open, setOpen] = useState(false)
    const [taskSubject, setTaskSubject] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDueDate, setTaskDueDate] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()

    const createTask = async (e) => {
        e.preventDefault()

        setOpen(false)

        try {
            const response = await axiosPrivate.post('/u/todo', {
                title: taskTitle,
                description: taskDescription,
                subject: taskSubject,
                dueDate: taskDueDate
            })

            setTaskTitle('')
            setTaskDescription('')
            setTaskSubject('')
            setTaskDueDate('')

            setErrMsg(response.data.message)
            fetchTasks(axiosPrivate, location)
        } catch (err) {
            console.log(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || "Unknown error";

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }

            setErrMsg(message)
        }
    }

    return (
        <main className="container">
            <p className="err">{errMsg}</p>
            <button className='btn btn-v' onClick={() => { setOpen(true); fetchSubjects(axiosPrivate, location) }}><Plus /> Add new task</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <form onSubmit={createTask}>
                        <label>
                            Pick a subject:
                            <select required value={taskSubject} onChange={(e) => setTaskSubject(e.target.value)}>
                                <option value="">— None —</option>
                                {subjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
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
            <TaskList />
        </main>
    )
}