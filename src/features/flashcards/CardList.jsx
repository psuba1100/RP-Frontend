import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useFlashcardSetsStore } from "../../store/flashcardSetsStore"
import { useSubjectStore } from "../../store/subjectsStore"
import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { v4 as uuidv4 } from 'uuid'
import CardSet from "./CardSet"
import { Lightbulb } from "lucide-react"

export default function CardList() {
    const fetchFlashcardSets = useFlashcardSetsStore((s) => s.fetchFlashcardSets)
    const flashcardSets = useFlashcardSetsStore((s) => s.flashcardSets)
    const count = useFlashcardSetsStore((s) => s.count)

    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)
    const subjects = useSubjectStore((s) => s.subjects)

    const [searchParams, setSearchParams] = useSearchParams();
    const [pageLinks, setPageLinks] = useState([])
    const [selected, setSelected] = useState("")

    const p = parseInt(searchParams.get("p")) || 1
    const s = searchParams.get("s") || ""

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()

    const createPages = (min, max, current) => {
        const result = [current]

        for (let i = 1; i <= 3; i++) {
            if (current - i >= min) {
                result.unshift(current - i);
            } else {
                break;
            }
        }

        for (let i = 1; i <= 3; i++) {
            if (current + i <= max) {
                result.push(current + i);
            } else {
                break;
            }
        }

        setPageLinks(result)
    }

    useEffect(() => {
        fetchFlashcardSets(axiosPrivate, location, navigate, p, s)
        fetchSubjects(axiosPrivate, location, navigate)
        createPages(1, Math.floor(count / 10) + 1, parseInt(p))
    }, [p, s])

    const changeSubject = (e) => {
        e.preventDefault()

        setSelected(e.target.value);
        setSearchParams({ s: e.target.value, p })
    }

    useEffect(() => {
        createPages(1, Math.floor(count / 10) + 1, parseInt(p))
    }, [count])

    return (
        <section className="container">
            <h2>Don't practice until you get it right. <br /> Practice until you can't get it wrong.</h2>

            <label>
                Pick a subject to filter by:
                <select value={selected} onChange={changeSubject}>
                    <option value="">— None —</option>
                    {subjects.map((subject) => (
                        <option key={uuidv4()} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </label>

            <ul>
                {flashcardSets?.length
                    ? flashcardSets.map(card => <CardSet key={card._id} card={card} />)
                    : <p>You have no flashcard sets. Why won't you create some? <Lightbulb /></p>
                }
            </ul>
            <ul className="container-h">
                {pageLinks?.length
                    ? pageLinks.map((link) => link != p
                        ? <li key={link}><button className="btn" onClick={(e) => setSearchParams({ p: link, s })}>{link}</button></li>
                        : <li key={link}>{link}</li>)
                    : <></>
                }
            </ul>

            <button className="btn" onClick={() => { console.log(flashcardSets) }}>Dump flashcardSets</button>
        </section>
    )
}