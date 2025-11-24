import { KeyRound } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import PwChange from "../components/auth/PwChange";

export default function Hub() {
    const username = useAuthStore((s) => s.username)
    return (
        <main className="contianer">
            <section className="container-h">
                <h1>Welcome, {username}!</h1>
                <PwChange />
            </section>
        </main>
    )
}
