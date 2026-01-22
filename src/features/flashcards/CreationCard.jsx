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
            updateCard(id, side, "image", "");
        } catch (err) {
            if (err.response && (err.response.status === 404 || err.response.status === 403)) {
                console.warn(`Image ${filename} not found or the user is not owner, ignoring.`);
                updateCard(id, side, "image", "");
            } else {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
    };

    return (
        <div className="block outline vertical">
            <div className="block horizontal-priority h-elements-top">
                {/* FRONT SIDE */}
                <div className="block vertical item m">
                    <h4>Front</h4>

                    <div>

                    </div>
                    <textarea
                        maxLength={2000}
                        value={card.front.text}
                        onChange={(e) => updateCard(id, "front", "text", e.target.value)}
                        placeholder="Write some question"
                    />

                    {card.front.image ? (
                        <div className="mt block vertical">
                            Image preview:
                            <img
                                src={`${API_URL}/r/image/${card.front.image}`}
                                crossOrigin="use-credentials"
                                alt=""
                                style={{ maxWidth: "150px", maxHeight: '200px' }}
                            />
                            <button className='btn' onClick={() => deleteImage("front")}>Remove image</button>
                        </div>
                    ) : (
                        <div className="mt block vertical">
                            Upload image:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => uploadImage("front", e.target.files[0])}
                            />
                        </div>
                    )}
                </div>

                {/* BACK SIDE */}
                <div className="item block vertical m">
                    <h4>Back</h4>

                    <textarea
                        maxLength={2000}
                        value={card.back.text}
                        onChange={(e) => updateCard(id, "back", "text", e.target.value)}
                        placeholder="Write the answer"
                    />

                    {card.back.image ? (
                        <div className=" mt block vertical">
                            Image preview:
                            <img
                                src={`${API_URL}/r/image/${card.back.image}`}
                                crossOrigin="use-credentials"
                                alt=""
                                style={{ maxWidth: "150px", maxHeight: '200px' }}
                            />
                            <button className='btn' onClick={() => deleteImage("back")}>Remove image</button>
                        </div>
                    ) : (
                        <div className="mt block vertical">
                            Upload image:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => uploadImage("back", e.target.files[0])}
                            />
                        </div>
                    )}
                </div>
            </div>

            <button className='btn mt' onClick={async () => {
                const frontImg = card.front?.image;
                const backImg = card.back?.image;

                if (frontImg) await deleteImage("front");
                if (backImg) await deleteImage("back");

                removeCard(id);
            }}>Delete Card</button>
        </div>
    );
}