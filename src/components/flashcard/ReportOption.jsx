import { CheckCircle2, FileExclamationPoint } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import axios from '../../api/axios'
import { useParams } from 'react-router-dom'

export default function ReportOption({ setErrMsg, reported, setReported }) {
    const [reason, setReason] = useState('offensive')
    const [description, setDescription] = useState('')

    const username = useAuthStore((s) => s.username)

    const { flashcardId } = useParams()

    const submitReport = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('/report',
                {
                    username,
                    reason,
                    description,
                    flashcardId
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            setReported(true)
            setReason('offensive')
            setDescription('')
        } catch (err) {
            console.error(err)

            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err?.response?.data?.message) {
                setErrMsg(err.response.data.message)
            } else {
                setErrMsg('Report failed')
            }
        }
    }
    return (
        <div className="block vertical text-center">
            {reported
                ? (<>
                    <CheckCircle2 />
                    <p>Content reported</p>
                </>)
                : (<>
                    <h2><FileExclamationPoint />{' REPORT SET'}</h2>
                    <p>You can report this flashcard set if it contains offensive, inappropriate, copyrighted, or otherwise harmful content. Please use this feature responsibly. Repeated false reports or abuse of the reporting function may result in temporary or permanent suspension of your account.</p>
                    <form onSubmit={submitReport} className='block vertical text-center'>
                        <label className="block vertical text-center">
                            Select a reason of your report:
                            <select value={reason} onChange={(e) => setReason(e.target.value)} required>
                                <option value="offensive">The content is offensive</option>
                                <option value="inappropriate">The content is inappropriate</option>
                                <option value="copyrighted">The content is copyrighted</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                        <label className='block vertical text-center mt'>
                            Elaborate on your reason:
                            <textarea
                                maxLength={2000}
                                placeholder="Optional, mandatory if reason is 'Other'"
                                required={reason == 'other'}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <button className='btn btn-primary mt' disabled={reason == 'other' ? description == '' ? true : false : false}>Submit</button>
                    </form>
                </>)
            }
        </div>
    )
}
