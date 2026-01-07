import { CircleCheckBig } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTasksStore } from "../../store/tasksStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TASKS_URL = '/u/todo'

export default function Task({ task }) {
    const fetchTasks = useTasksStore((s) => s.fetchTasks)
    const [searchParams, setSearchParams] = useSearchParams();
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    const datum = new Date(task.dueDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const deleteTask = async (e) => {
        e.preventDefault()

        const p = searchParams.get("p");
        const s = searchParams.get("s");
        try {
            const response = await axiosPrivate.delete(TASKS_URL, {
                data: {
                    taskId: task._id
                }
            })

            fetchTasks(axiosPrivate, location, navigate, p, s)
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || "Unknown error";

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }
        }
    }

    return (
        <li className="block vertical w-100 outline">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>from {task.subject}; due {datum}</p>
            <button className="btn btn-primary" onClick={(e) => deleteTask(e)}><CircleCheckBig /> Done</button>
        </li>
    );
}