import { useAuthStore } from "../store/authStore";
import PwChange from "../components/auth/PwChange";
import SubjectList from "../features/subjects/SubjectList";
import LockerList from "../features/locker/LockerList";
import DeleteAcc from "../components/auth/DeleteAcc";

export default function Hub() {
    const username = useAuthStore((s) => s.username)
    return (
        <main className="contianer">
            <section className="block g-2 horizontal-priority">
                <h1>Welcome, {username}!</h1>
                <PwChange />
                <DeleteAcc />
            </section>
            <section className="block horizontal-priority hp-elements-top stretch">
                <div className="item outline">
                    <h2>Your locker</h2>
                    <LockerList />
                </div>
                <div className="item outline">
                    <h2>Your subjects</h2>
                    <SubjectList />
                </div>
            </section>
        </main>
    )
}
