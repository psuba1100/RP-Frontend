import { useAuthStore } from "../store/authStore";
import PwChange from "../components/auth/PwChange";
import SubjectList from "../features/subjects/SubjectList";
import LockerList from "../features/locker/LockerList";

export default function Hub() {
    const username = useAuthStore((s) => s.username)
    return (
        <main className="contianer">
            <section className="container-h">
                <h1>Welcome, {username}!</h1>
                <PwChange />
            </section>
            <section className="container-h">
                <div>
                    <h2>Your locker</h2>
                    <LockerList />
                </div>
                <div>
                    <h2>Your subjects</h2>
                    <SubjectList />
                </div>
            </section>
        </main>
    )
}
