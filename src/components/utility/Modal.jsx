import ReactDOM from "react-dom";

export default function Modal({ children, onClose }) {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}