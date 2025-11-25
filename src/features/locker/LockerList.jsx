import { useEffect, useState } from "react"
import { useLockerStore } from "../../store/lockerStore"
import LockerElement from "./LockerElement"
import { Plus, Save } from "lucide-react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useLocation, useNavigate } from "react-router-dom"

export default function LockerList() {
    const items = useLockerStore((s) => s.items)
    const changes = useLockerStore((s) => s.changes)
    const toggleChange = useLockerStore((s) => s.toggleChange)
    const addItem = useLockerStore((s) => s.addItem)
    const fetchItems = useLockerStore((s) => s.fetchItems)
    const exportToApiFormat = useLockerStore((s) => s.exportToApiFormat)

    const [newItem, setNewItem] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        fetchItems(axiosPrivate, location, navigate)
    }, [])

    const save = async (e) => {
        e.preventDefault()

        const data = exportToApiFormat()
        console.log(data)

        try {
            await axiosPrivate.put('/u/locker', {
                itemsInLocker: data.itemsInLocker,
                itemsOutsideLocker: data.itemsOutsideLocker
            })

            toggleChange(false)
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
        <section className="container">
            <p>{errMsg}</p>
            <p>{changes ? 'Careful, you have unsaved changes!' : ''}</p>
            <section className="container-h">
                <label htmlFor="newItem"></label>
                <input
                    type="text"
                    id="newItem"
                    className="input"
                    value={newItem}
                    onChange={(e) => { setNewItem(e.target.value) }} />
                <button className="btn" onClick={() => { addItem(newItem, true, setErrMsg); setNewItem('') }}><Plus /></button>
                <button className="btn" onClick={save}><Save /></button>
            </section>
            <section className="container-h">
                <ul className="container">
                    <h3>In locker</h3>
                    {items.length
                        ? items.map((item) => item.inLocker && <LockerElement key={item.item} item={item.item} />)
                        : <></>
                    }
                </ul>
                <ul className="container">
                    <h3>Outside locker</h3>
                    {items.length
                        ? items.map((item) => !item.inLocker && <LockerElement key={item.item} item={item.item} />)
                        : <></>
                    }
                </ul>
            </section>
        </section>
    )
}
