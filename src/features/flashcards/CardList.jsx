import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useFlashcardSetsStore } from "../../store/flashcardSetsStore"
import { useSubjectStore } from "../../store/subjectsStore"
import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import CardSet from "./CardSet"
import { Lightbulb } from "lucide-react"

export default function CardList() {
    const fetchFlashcardSets = useFlashcardSetsStore((s) => s.fetchFlashcardSets)
    const flashcardSets = useFlashcardSetsStore((s) => s.flashcardSets)
    const count = useFlashcardSetsStore((s) => s.count)
    const clearFlashcardSetsStore = useFlashcardSetsStore((s) => s.clearFlashcardSetsStore)

    const fetchSubjects = useSubjectStore((s) => s.fetchSubjects)
    const subjects = useSubjectStore((s) => s.subjects)
    const clearSubjectStore = useSubjectStore((s) => s.clearSubjectStore)

    const [searchParams, setSearchParams] = useSearchParams();
    const [pageLinks, setPageLinks] = useState([])
    const [selected, setSelected] = useState("")

    const p = parseInt(searchParams.get("p")) || 1
    const s = searchParams.get("s") || ""

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)

    const refetchSets = async () => {
        let isMounted = true
        setIsLoading(true)
        clearFlashcardSetsStore()
        clearSubjectStore()

        try {
            await fetchFlashcardSets(axiosPrivate, location, navigate, p, s)
            await fetchSubjects(axiosPrivate, location, navigate)
        }
        catch (err) {
            console.error(err)
        }
        finally {
            isMounted && setIsLoading(false)
        }

        return () => isMounted = false
    }

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
        refetchSets()
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
        <section className="container vertical elements-top main mt">
            <label className="block vertical">
                Pick a subject to filter by:
                <select value={selected} onChange={changeSubject}>
                    <option value="">— None —</option>
                    {subjects?.length
                        ? (
                            [...new Set(subjects)].map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))
                        )
                        : <></>
                    }
                </select>
            </label>

            {isLoading
                ? <p>Loading...</p>
                : (
                    <ul className="block vertical">
                        {flashcardSets?.length
                            ? flashcardSets.map((card, i)=> <CardSet key={`${card._id}-${i}`} card={card} />)
                            : <p>You have no flashcard sets. Why won't you create some? <Lightbulb /></p>
                        }
                    </ul>
                )
            }

            <ul className="block g-2">
                {pageLinks?.length
                    ? [...new Set(pageLinks)].map((link) => link != p
                        ? <li key={link}><button className="btn" onClick={(e) => setSearchParams({ p: link, s })}>{link}</button></li>
                        : <li key={link}>{link}</li>)
                    : <></>
                }
            </ul>
        </section>
    )
}