import { useLocation, useNavigate } from "react-router-dom";
import { useNewFlashcardStore } from "../../store/newFlashcardStore";
import { API_URL } from "../../api/config";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function FlashcardItem({ id, card }) {
    const { removeCard, updateCard } = useNewFlashcardStore();
    const cards = useNewFlashcardStore((s) => s.cards)
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    const uploadImage = async (side, file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axiosPrivate.post("/r/image", formData);

            updateCard(id, side, "image", response.data.filename);
        } catch (err) {
            console.error(err)
            const status = err?.response?.status;
            const message = err?.response?.data?.message || err?.message || "Unknown error";

            if (status === 401 || status === 403) {
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }
        }
    };

    const deleteImage = async (side) => {
        const filename = card[side]?.image;
        if (!filename) return;

        try {
            await axiosPrivate.delete('/r/image', { data: { imgName: filename } });
            console.log(cards[id][side])
            updateCard(id, side, "image", "");
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.warn(`Image ${filename} not found, ignoring.`);
                updateCard(id, side, "image", "");
            } else {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
    };

    return (
        <div className="card-box">
            <h3>Card {id}</h3>

            {/* FRONT SIDE */}
            <div>
                <h4>Front</h4>

                <textarea
                    value={card.front.text}
                    onChange={(e) => updateCard(id, "front", "text", e.target.value)}
                />

                {card.front.image ? (
                    <div>
                        <img
                            src={`${API_URL}/r/image/${card.front.image}`}
                            crossOrigin="use-credentials"
                            alt=""
                            style={{ maxWidth: "150px" }}
                        />
                        <button onClick={() => deleteImage("front")}>Remove image</button>
                    </div>
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadImage("front", e.target.files[0])}
                    />
                )}
            </div>

            {/* BACK SIDE */}
            <div>
                <h4>Back</h4>

                <textarea
                    value={card.back.text}
                    onChange={(e) => updateCard(id, "back", "text", e.target.value)}
                />

                {card.back.image ? (
                    <div>
                        <img
                            src={`${API_URL}/r/image/${card.back.image}`}
                            crossOrigin="use-credentials"
                            alt=""
                            style={{ maxWidth: "150px" }}
                        />
                        <button onClick={() => deleteImage("back")}>Remove image</button>
                    </div>
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadImage("back", e.target.files[0])}
                    />
                )}
            </div>

            <button onClick={async () => {
                const frontImg = card.front?.image;
                const backImg = card.back?.image;

                if (frontImg) await deleteImage("front");
                if (backImg) await deleteImage("back");

                removeCard(id);
            }}>Delete Card</button>
        </div>
    );
}