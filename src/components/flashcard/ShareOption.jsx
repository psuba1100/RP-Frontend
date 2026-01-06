import { Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useLocation } from "react-router-dom"

export default function ShareOption() {
    const location = useLocation()
    const currentUrl = window.location.origin + location.pathname;

    const [copyMessage, setCopyMessage] = useState('Copy link!')

    const copyLink = async (e) => {
        e.preventDefault()
        setCopyMessage('Link coppied!')
        try {
            await navigator.clipboard.writeText(currentUrl)
            setTimeout(() => {
                setCopyMessage('Copy link!')
            }, 1500);
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="block vertical">
            <h3>Share via QR code:</h3>
            <QRCodeSVG value={currentUrl} />
            <p>Or share the link:</p>
            <button className="btn btn-primary" onClick={copyLink}><Copy />{copyMessage}</button>
        </div>

    )
}
