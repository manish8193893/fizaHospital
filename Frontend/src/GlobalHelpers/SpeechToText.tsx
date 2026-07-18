import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import "../styles/SpeechToText.css";


interface SpeechToTextProps {
    show: boolean;
    onHide: () => void;
    onTextCaptured: (text: string) => void;
}

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const SpeechToText: React.FC<SpeechToTextProps> = ({
    show,
    onHide,
    onTextCaptured,
}) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [language, setLanguage] = useState("en-US");

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event: any) => {
            let currentTranscript = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {
                currentTranscript += event.results[i][0].transcript + " ";
            }

            setTranscript(currentTranscript);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, [language]);

    // const startListening = () => {
    //     if (!recognitionRef.current) return;

    //     recognitionRef.current.lang = language;
    //     recognitionRef.current.start();
    //     setIsListening(true);
    // };
    const startListening = () => {
        if (!recognitionRef.current) return;

        recognitionRef.current.lang = language;

        setTranscript("");

        recognitionRef.current.start();
        setIsListening(true);
    };

    const stopListening = () => {
        if (!recognitionRef.current) return;

        recognitionRef.current.stop();
        setIsListening(false);
    };

    const handleReset = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }

        setIsListening(false);
        setTranscript("");
    };

    const handleDone = () => {
        onTextCaptured(transcript.trim());
        onHide();
    };

    const handleClose = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        setIsListening(false);
        setTranscript("");

        onHide();
    };

    useEffect(() => {
        if (show) {
            setTranscript("");
            setIsListening(false);

            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        }
    }, [show]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
            backdrop="static"
            contentClassName="aph-modal-content"
            backdropClassName="aph-modal-backdrop"
        >
            <Modal.Header className='aph-modal-header'>
                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                    style={{ position: 'absolute', right: '2.6rem', top: '2.7rem' }}
                    onClick={handleClose}
                    aria-label="Close"
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>
                <Modal.Title className='fs-18 fw-400 aph-modal-title'>
                    Speech To Text
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body">

                <h5 className="fs-16 text-black text-muted">Select Language</h5>

                <div className="d-flex align-items-center border mb-3 pe-3">
                    <i className="ri-global-line fs-22 globe-icon py-1 px-3" style={{ color: "#3E64AB" }}></i>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="speech-language-dropdown py-2 px-2"
                    >
                        <option value="en-US">English (US)</option>
                        <option value="hi-IN">Hindi (हिन्दी)</option>
                    </select>
                </div>

                <div className="speech-preview-box p-2 bg-white fs-20">
                    {transcript || "Start speaking..."}
                </div>

                <div className="d-flex justify-content-center my-4">

                    <div
                        className={`speech-mic-outer ${isListening ? "listening" : ""
                            }`}
                        onClick={
                            isListening
                                ? stopListening
                                : startListening
                        }
                    >
                        <div className="speech-mic-inner">
                            <i className="ri-mic-line"></i>
                        </div>
                    </div>

                </div>

                <div className="text-center speech-status-text fs-14 mt-3 mb-2">
                    {isListening
                        ? "Listening..."
                        : "Click the microphone to start speaking"}
                </div>
            </Modal.Body>

            {/* Buttons */}
            <div className="d-flex justify-content-between border-0 pb-0 mt-2">

                <button
                    type="button"
                    onClick={handleDone}
                    disabled={!transcript.trim()}
                    className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                >
                    Done
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="aph-modal-btn-height border-0 outline-0 col-md-3 border-red text-red bg-white fs-18 fw-400"
                >
                    Reset
                </button>

                <button
                    type="button"
                    onClick={handleClose}
                    className="aph-modal-btn-height border-0 outline-0 col-md-3 border-red text-red bg-white fs-18 fw-400"
                >
                    Cancel
                </button>

            </div>
        </Modal>
    );
};

export default SpeechToText;