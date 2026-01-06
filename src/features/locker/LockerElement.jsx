import { Repeat, Trash } from 'lucide-react'
import { useLockerStore } from '../../store/lockerStore'

export default function LockerElement({ item }) {
    const toggleItem = useLockerStore((s) => s.toggleItem)
    const removeItem = useLockerStore((s) => s.removeItem)
    return (
        <li className='block horizontal-priority'>
            {item}
            <div className='block m'>
                <button className='btn' onClick={() => { toggleItem(item) }}><Repeat /></button>
                <button className='btn' onClick={() => { removeItem(item) }}><Trash /></button>
            </div>
        </li>
    )
}
