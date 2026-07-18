import React, { useState } from "react";
import SpeechToText from "../../GlobalHelpers/SpeechToText";
import Microphone from "../../../public/Assets/Icons/Microphone.svg?react";

export default function HistoryAndExamination() {

    const [formData, setFormData] = useState({
        physicalExamination: "",
        cardiovascular: "",
        pastMedicalSurgicalHistory: "",
        generalExamination: "",
        gastrointestinal: "",
        respiration: "",
        note: "",
    });

    const [showSpeechModal, setShowSpeechModal] = useState(false);

    const [speechField, setSpeechField] = useState<
        keyof typeof formData
    >("physicalExamination");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        console.log(formData);
    };

    const SpeechButton = ({
        field,
    }: {
        field: keyof typeof formData;
    }) => (
        <button
            type="button"
            className="btn btn-sm border-0 outline-0 d-flex align-items-center gap-1"
            style={{ backgroundColor: "#3E64AB33" }}
            onClick={() => {
                setSpeechField(field);
                setShowSpeechModal(true);
            }}
        >
            <Microphone width={20} height={20} />
            Speech-to-Text
        </button>
    );

    return (
        <div className="formContainer">

            <h5 className="fs-18 fw-500 mb-4">
                History and Examination
            </h5>

            {/* Row 1 */}
            <div className="formRow">
                <div className="formGroup">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="customLabel mb-0">
                            Physical Examination <span className="text-danger">*</span>
                        </label>

                        <SpeechButton field="physicalExamination" />
                    </div>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="physicalExamination"
                            value={formData.physicalExamination}
                            onChange={handleInputChange}
                            placeholder="Enter Physical Examination"
                            className="customInput"
                        />
                        <i className="ri-health-book-line"></i>
                    </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="formRow">
                <div className="formGroup">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="customLabel mb-0">
                            Cardiovascular <span className="text-danger">*</span>
                        </label>

                        <SpeechButton field="cardiovascular" />
                    </div>
                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="cardiovascular"
                            value={formData.cardiovascular}
                            onChange={handleInputChange}
                            placeholder="Enter Cardiovascular"
                            className="customInput"
                        />
                        <i className="ri-heart-pulse-line"></i>
                    </div>
                </div>
            </div>

            {/* Row 3 */}
            <div className="formRow">
                <div className="formGroup">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="customLabel mb-0">
                            Past Medical / Surgical History
                            <span className="text-danger">*</span>
                        </label>

                        <SpeechButton field="pastMedicalSurgicalHistory" />
                    </div>
                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="pastMedicalSurgicalHistory"
                            value={formData.pastMedicalSurgicalHistory}
                            onChange={handleInputChange}
                            placeholder="Enter History"
                            className="customInput"
                        />
                        <i className="ri-file-history-line"></i>
                    </div>
                </div>
            </div>

            {/* Row 4 */}
            <div className="formRow">
                <div className="formGroup">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="customLabel mb-0">
                            General Examination <span className="text-danger">*</span>
                        </label>

                        <SpeechButton field="generalExamination" />
                    </div>
                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="generalExamination"
                            value={formData.generalExamination}
                            onChange={handleInputChange}
                            placeholder="Enter General Examination"
                            className="customInput"
                        />
                        <i className="ri-user-heart-line"></i>
                    </div>
                </div>
            </div>

            {/* Row 5 */}
            <div className="formRow">
                <div className="formGroup">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="customLabel mb-0">
                            Gastrointestinal <span className="text-danger">*</span>
                        </label>

                        <SpeechButton field="gastrointestinal" />
                    </div>
                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="gastrointestinal"
                            value={formData.gastrointestinal}
                            onChange={handleInputChange}
                            placeholder="Enter Gastrointestinal"
                            className="customInput"
                        />
                        <i className="ri-mental-health-line"></i>
                    </div>
                </div>
            </div>

            {/* Row 6 */}
            <div className="formRow">
                <div className="formGroup">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="customLabel mb-0">
                            Respiration <span className="text-danger">*</span>
                        </label>

                        <SpeechButton field="respiration" />
                    </div>
                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="respiration"
                            value={formData.respiration}
                            onChange={handleInputChange}
                            placeholder="Enter Respiration"
                            className="customInput"
                        />
                        <i className="ri-lungs-line"></i>
                    </div>
                </div>
            </div>

            {/* Row 7 */}
            <div className="formRow">
                <div className="formGroup">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="customLabel mb-0">
                            Note
                        </label>

                        <SpeechButton field="note" />
                    </div>
                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleInputChange}
                            placeholder="Enter Note"
                            className="customInput"
                        />
                        <i className="ri-sticky-note-line"></i>
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