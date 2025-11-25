import { Repeat, Trash } from 'lucide-react'
import { useLockerStore } from '../../store/lockerStore'

export default function LockerElement({ item }) {
    const toggleItem = useLockerStore((s) => s.toggleItem)
    const removeItem = useLockerStore((s) => s.removeItem)
    return (
        <li className='container-h'>
            {item}
            <button className='btn' onClick={() => { toggleItem(item) }}><Repeat /></button>
            <button className='btn' onClick={() => { removeItem(item) }}><Trash /></button>
        </li>
    )
}
