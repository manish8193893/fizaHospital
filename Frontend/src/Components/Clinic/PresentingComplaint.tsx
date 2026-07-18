import React, { useState } from "react";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import SpeechToText from "../../GlobalHelpers/SpeechToText";

import Microphone from "../../../public/Assets/Icons/Microphone.svg?react"

export default function PresentingComplaint() {
    const [formData, setFormData] = useState({
        initialComplaint: "",
        presentingComplaint: "",
    });

    const [selectedHistoryDate, setSelectedHistoryDate] = useState<Date | null>(null);

    const [showHistoryCalendar, setShowHistoryCalendar] = useState(false);

    const [durationDays, setDurationDays] = useState<number | null>(null);
    const [showSpeechModal, setShowSpeechModal] = useState(false);
    const [speechField, setSpeechField] = useState<
        "initialComplaint" | "presentingComplaint"
    >("initialComplaint");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateSelect = (date: Date) => {
        setSelectedHistoryDate(date);
        setShowHistoryCalendar(false);

        const today = new Date();
        const diffTime = today.getTime() - date.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        setDurationDays(diffDays >= 0 ? diffDays : 0);
    };

    const handleAdd = () => {
        console.log({
            ...formData,
            historyOfPresentingComplaint: selectedHistoryDate,
            durationDays,
        });
    };

    return (
        <div className="formContainer">

            <h5 className="fs-18 fw-500 mb-4">
                Presenting Complaint
            </h5>

            {/* Row 1 */}
            <div className="formRow">

                <div className="formGroup">

                    <div className="d-flex justify-content-between align-items-center mb-2">

                        <label className="customLabel mb-0">
                            Initial Complaint <span className="text-danger">*</span>
                        </label>

                        <button
                            type="button"
                            className="btn btn-sm border-0 outline-0 d-flex align-items-center gap-1"
                            style={{ backgroundColor: "#3E64AB33" }}
                            onClick={() => {
                                setSpeechField("initialComplaint");
                                setShowSpeechModal(true);
                            }}
                        >
                            <Microphone width={20} height={20} />
                            Speech-to-Text
                        </button>

                    </div>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="initialComplaint"
                            placeholder="Enter Initial Complaint"
                            value={formData.initialComplaint}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                    </div>

                </div>

            </div>

            {/* Row 2 */}
            <div className="formRow">

                <div className="formGroup">

                    <div className="d-flex justify-content-between align-items-center mb-2">

                        <label className="customLabel mb-0">
                            Presenting Complaint <span className="text-danger">*</span>
                        </label>

                        <button
                            type="button"
                            className="btn btn-sm border-0 outline-0 d-flex align-items-center gap-1"
                            style={{ backgroundColor: "#3E64AB33" }}
                            onClick={() => {
                                setSpeechField("presentingComplaint");
                                setShowSpeechModal(true);
                            }}
                        >
                            <Microphone width={20} height={20} />
                            Speech-to-Text
                        </button>

                    </div>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="presentingComplaint"
                            placeholder="Enter Presenting Complaint"
                            value={formData.presentingComplaint}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                    </div>

                </div>

            </div>

            {/* Row 3 */}
            <div className="formRow">

                {/* History of Presenting Complaint */}
                <div className="formGroup">
                    <label className="customLabel">
                        History of Presenting Complaint <span className="text-danger">*</span>
                    </label>

                    <div style={{ position: "relative" }}>
                        <div
                            className="customInput d-flex align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowHistoryCalendar(!showHistoryCalendar)}
                        >
                            {selectedHistoryDate
                                ? `${String(selectedHistoryDate.getDate()).padStart(2, "0")}/${String(
                                    selectedHistoryDate.getMonth() + 1
                                ).padStart(2, "0")}/${selectedHistoryDate.getFullYear()}`
                                : "DD/MM/YYYY"}
                        </div>

                        {showHistoryCalendar && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    zIndex: 1000,
                                    marginTop: "4px",
                                }}
                            >
                                <DateFilterCalendar
                                    selectedDate={selectedHistoryDate}
                                    onDateSelect={handleDateSelect}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Duration */}
                <div className="formGroup">
                    <label className="customLabel">
                        Duration (In Days)
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="number"
                            value={durationDays ?? ""}
                            disabled
                            className="customInput"
                            placeholder="Auto calculated"
                        />
                        <i className="ri-time-line"></i>
                    </div>
                </div>

            </div>

            <SpeechToText
                show={showSpeechModal}
                onHide={() => setShowSpeechModal(false)}
                onTextCaptured={(text) =>
                    setFormData((prev) => ({
                        ...prev,
                        [speechField]: text,
                    }))
                }
            />

            {/* Add Button */}
            <div className="mt-5 d-flex justify-content-end">
                <button
                    type="button"
                    onClick={handleAdd}
                    className="btn bg-blue col-md-4 text-white px-5"
                    style={{ height: "48px" }}
                >
                    Add
                </button>
            </div>

        </div>
    );
}