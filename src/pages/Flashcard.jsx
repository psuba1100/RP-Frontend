import { useFlashcardStore } from "../store/flashcardStore"

export default function Flashcard() {
    const metadata = useFlashcardStore((s) => s.metadata)
  return (
    <div>
      {metadata.title}
    </div>
  )
}
