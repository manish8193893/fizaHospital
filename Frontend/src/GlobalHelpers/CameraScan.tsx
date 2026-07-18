import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Html5Qrcode } from "html5-qrcode";
import "../styles/CameraScan.css";

interface CameraScanProps {
    onScanSuccess?: (value: string) => void;
    hideORLine?: Boolean;
    title?: string;
    icon?: string;
}

export default function CameraScan({
    onScanSuccess,
    hideORLine,
    title,
    icon,
}: CameraScanProps) {
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        if (!showCamera) return;

        const html5QrCode = new Html5Qrcode("qr-reader");

        const startScanner = async () => {
            try {
                await html5QrCode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: {
                            width: 250,
                            height: 250,
                        },
                    },
                    (decodedText) => {
                        console.log("QR Code:", decodedText);

                        onScanSuccess?.(
                            decodedText
                        );

                        html5QrCode
                            .stop()
                            .then(() => {
                                setShowCamera(false);
                            })
                            .catch((err) => console.error(err));
                    },
                    () => { }
                );
            } catch (error) {
                console.error("Scanner Error:", error);
            }
        };

        startScanner();

        return () => {
            try {
                html5QrCode.stop().catch(() => { });
                html5QrCode.clear();
            } catch (error) {
                console.error(error);
            }
        };
    }, [showCamera]);

    const closeScanner = () => {
        setShowCamera(false);
    };

    return (
        <>
            {/* SCAN QR BOX */}
            <h2 className="customLabel mt-1 mb-2">{title}</h2>
            <div
                className="scan-qr-box"
                onClick={() => setShowCamera(true)}
            >
                <i className={`${icon}`} style={{ fontSize: "30px" }}></i>
                <h5 className="fs-16 fw-500 text-blue mt-1">
                    {title}
                </h5>
            </div>

            {/* OR */}

            {hideORLine && (
                <>
                    <div className="or-divider">
                        <span>OR</span>
                    </div>
                </>
            )}

            {/* CAMERA MODAL */}

            <Modal
                show={showCamera}
                onHide={closeScanner}
                centered
                dialogClassName="camera-modal-dialog"
            >
                <Modal.Body className="camera-modal-body">

                    <button
                        type="button"
                        className="camera-close-btn"
                        onClick={closeScanner}
                    >
                        ×
                    </button>

                    <div className="camera-frame">

                        <div id="qr-reader"></div>

                        <p className="camera-helper-text">
                            Align barcode inside the frame
                        </p>

                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}