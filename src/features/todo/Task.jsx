import { CircleCheckBig } from "lucide-react";
import axios from "../../api/axios";
import { useAuthStore } from "../../store/authStore";
import { useSearchParams } from "react-router-dom";
import { useTasksStore } from "../../store/tasksStore";

const TASKS_URL = '/u/todo'

export default function Task({ task }) {
    const accessToken = useAuthStore((s) => s.accessToken)
    const fetchTasks = useTasksStore((s) => s.fetchTasks)
    const [searchParams, setSearchParams] = useSearchParams();

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
            const response = await axios.delete(TASKS_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                data: {
                    taskId: task._id
                },
                withCredentials: true
            })

            fetchTasks(p, s)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <li className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>from {task.subject}</p>
            <p>due {datum}</p>
            <button className="btn btn-v" onClick={(e) => deleteTask(e)}><CircleCheckBig /> Done</button>
        </li>
    );
}