import React, { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import CustomFormDropdown, {
    type DropdownOption,
} from "../../GlobalHelpers/CustomFormDropdown";



export default function Diagnosis() {

    const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);

    const [selectedAttendance, setSelectedAttendance] = useState<DropdownOption | null>(null);
    const [selectedAdverseEffect, setSelectedAdverseEffect] = useState<DropdownOption | null>(null);
    const [selectedDiagnosisCategory, setSelectedDiagnosisCategory] = useState<DropdownOption | null>(null);

    const [formData, setFormData] = useState({
        diagnosis: "",
        dgrgCode: "",
        icd10: "",
    });


    /********************************************
        Name : Manish Kumar
        Date : 07/06/2026
        Purpose : DROPDOWN OPTIONS
    *********************************************/
    const ATTENDANCE_OPTIONS: DropdownOption[] = [
        { id: "Consultant/OutPatient", name: "Consultant/OutPatient", },
        { id: "Emergency", name: "Emergency", },
        { id: "Follow-Up", name: "Follow-Up", },
        { id: "InPatient", name: "InPatient", },
        { id: "Scheduled", name: "Scheduled", },
    ];

    const DIAGNOSIS_CATEGORY_OPTIONS: DropdownOption[] = [
        { id: "Differential", name: "Differential", },
        { id: "Primary", name: "Primary", },
        { id: "Secondary", name: "Secondary", },
    ];

    const ADVERSE_EFFECT_OPTIONS: DropdownOption[] = [
        { id: "Mild", name: "Mild", },
        { id: "Moderate", name: "Moderate", },
        { id: "Severe", name: "Severe", },
    ];

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const openDiagnosisModal = () => {
        setShowDiagnosisModal(true);
    };

    const handleSave = () => {

        const payload = {
            attendance: selectedAttendance,
            diagnosisCategory:
                selectedDiagnosisCategory,
            diagnosis: formData.diagnosis,
            dgrgCode: formData.dgrgCode,
            icd10: formData.icd10,
            adverseEffect:
                selectedAdverseEffect,
        };

        console.log(
            "Diagnosis Form Data :",
            payload
        );
    };


    const handleCancel = () => {
        setShowDiagnosisModal(false);
    };

    return (
        <>
            <div className="formContainer">

                <h5 className="fs-18 fw-500 mb-4">
                    Diagnosis
                </h5>

                {/* Row 1 */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Attendance{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <CustomFormDropdown
                            options={
                                ATTENDANCE_OPTIONS
                            }
                            value={
                                selectedAttendance
                            }
                            onChange={(value) =>
                                setSelectedAttendance(
                                    value
                                )
                            }
                            placeholder="Select Attendance"
                            required={true}
                        />
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Diagnose Category{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <CustomFormDropdown
                            options={
                                DIAGNOSIS_CATEGORY_OPTIONS
                            }
                            value={
                                selectedDiagnosisCategory
                            }
                            onChange={(value) =>
                                setSelectedDiagnosisCategory(
                                    value
                                )
                            }
                            placeholder="Select Diagnose Category"
                            required={true}
                        />
                    </div>

                </div>

                {/* Row 2 */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Diagnose{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <div
                            className="inputWrapper"
                            onClick={openDiagnosisModal}
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="text"
                                value={
                                    formData.diagnosis
                                }
                                readOnly
                                placeholder="Search Diagnosis"
                                className="customInput"
                            />

                            <i className="ri-search-ai-2-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            D-GRG Code
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="dgrgCode"
                                value={
                                    formData.dgrgCode
                                }
                                disabled
                                onChange={
                                    handleInputChange
                                }
                                placeholder="Auto Filled"
                                className="customInput"
                            />

                            <i className="ri-file-list-3-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            ICD-10
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="icd10"
                                value={
                                    formData.icd10
                                }
                                disabled
                                onChange={
                                    handleInputChange
                                }
                                placeholder="Auto Filled"
                                className="customInput"
                            />

                            <i className="ri-file-code-line"></i>
                        </div>
                    </div>

                </div>

                {/* Row 3 */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Adverse Effect{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <CustomFormDropdown
                            options={
                                ADVERSE_EFFECT_OPTIONS
                            }
                            value={
                                selectedAdverseEffect
                            }
                            onChange={(value) =>
                                setSelectedAdverseEffect(
                                    value
                                )
                            }
                            placeholder="Select Adverse Effect"
                            required={true}
                        />
                    </div>

                </div>

                {/* Save Button */}

                <div className="mt-5 d-flex justify-content-end">

                    <button
                        type="button"
                        onClick={handleSave}
                        className="btn bg-blue col-md-4 text-white px-5"
                        style={{
                            height: "48px",
                        }}
                    >
                        Save
                    </button>

                </div>

            </div>
            <DiagnosisSearchModal
                show={showDiagnosisModal}
                onHide={handleCancel}
                onSelectDiagnosis={(item) => {

                    setFormData((prev) => ({
                        ...prev,
                        diagnosis: item.diagnosis,
                        icd10: item.icd10,
                        dgrgCode: item.dgrgCode,
                    }));

                    setShowDiagnosisModal(false);

                }}
            />
        </>
    );
}


interface DiagnosisItem {
    diagnosis: string;
    icd10: string;
    dgrgCode: string;
}

interface DiagnosisSearchModalProps {
    show: boolean;
    onHide: () => void;
    onSelectDiagnosis: (
        item: DiagnosisItem
    ) => void;
}

export function DiagnosisSearchModal({
    show,
    onHide,
    onSelectDiagnosis,
}: DiagnosisSearchModalProps) {

    const [searchText, setSearchText] = useState("");

    const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisItem | null>(null);

    const DIAGNOSIS_LIST: DiagnosisItem[] = [
        {
            diagnosis: "Diabetes Mellitus Type 1",
            icd10: "E10",
            dgrgCode: "DG001",
        },
        {
            diagnosis: "Diabetes Mellitus Type 2",
            icd10: "E11",
            dgrgCode: "DG002",
        },
        {
            diagnosis: "Diabetic Neuropathy",
            icd10: "E11.40",
            dgrgCode: "DG003",
        },
        {
            diagnosis: "Diabetic Retinopathy",
            icd10: "E11.319",
            dgrgCode: "DG004",
        },
        {
            diagnosis: "Diastolic Heart Failure",
            icd10: "I50.30",
            dgrgCode: "DG005",
        },
        {
            diagnosis: "Hypertension",
            icd10: "I10",
            dgrgCode: "DG006",
        },
        {
            diagnosis: "Hypothyroidism",
            icd10: "E03.9",
            dgrgCode: "DG007",
        },
        {
            diagnosis: "Hyperlipidemia",
            icd10: "E78.5",
            dgrgCode: "DG008",
        },
        {
            diagnosis: "Hyperglycemia",
            icd10: "R73.9",
            dgrgCode: "DG009",
        },
        {
            diagnosis: "Chronic Kidney Disease",
            icd10: "N18.9",
            dgrgCode: "DG010",
        },
        {
            diagnosis: "Chronic Obstructive Pulmonary Disease",
            icd10: "J44.9",
            dgrgCode: "DG011",
        },
        {
            diagnosis: "Coronary Artery Disease",
            icd10: "I25.10",
            dgrgCode: "DG012",
        },
        {
            diagnosis: "Acute Bronchitis",
            icd10: "J20.9",
            dgrgCode: "DG013",
        },
        {
            diagnosis: "Asthma",
            icd10: "J45.909",
            dgrgCode: "DG014",
        },
        {
            diagnosis: "Migraine Without Aura",
            icd10: "G43.009",
            dgrgCode: "DG015",
        },
    ];

    const hasSearchText =
        searchText.trim().length >= 3;

    const filteredDiagnosisList = useMemo(() => {

        if (!hasSearchText) {
            return [];
        }

        return DIAGNOSIS_LIST.filter(
            (item) =>
                item.diagnosis
                    .toLowerCase()
                    .includes(
                        searchText.toLowerCase()
                    )
        );

    }, [searchText]);

    const handleDone = () => {

        if (!selectedDiagnosis) {
            return;
        }

        onSelectDiagnosis(
            selectedDiagnosis
        );

        setSearchText("");
        setSelectedDiagnosis(null);

    };

    const handleClose = () => {

        setSearchText("");
        setSelectedDiagnosis(null);

        onHide();

    };

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
            <Modal.Header className="aph-modal-header mb-3">

                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                    style={{
                        position: "absolute",
                        right: "2.6rem",
                        top: "2.7rem",
                    }}
                    onClick={handleClose}
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    Diagnosis
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <div className="formGroup mb-1">

                    <label className="customLabel">
                        Diagnosis
                    </label>

                    <div className="inputWrapper rounded-0">

                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) =>
                                setSearchText(
                                    e.target.value
                                )
                            }
                            placeholder="Search Diagnosis"
                            className="customInput rounded-0"
                        />

                        <i className="ri-search-ai-2-line"></i>

                    </div>

                </div>

                <small className="text-muted ms-2">
                    {
                        filteredDiagnosisList.length
                    } results
                </small>

                <div
                    style={{
                        maxHeight: "150px",
                        overflowY: "auto",
                    }}
                >
                    {!hasSearchText ? (

                        <div className="p-3 text-center text-muted">
                            Type at least 3 characters
                            to search
                        </div>

                    ) : filteredDiagnosisList.length >
                        0 ? (

                        filteredDiagnosisList.map(
                            (
                                item,
                                index
                            ) => (
                                <div
                                    key={index}
                                    className={`py-2 px-3 my-1 diagnose-list d-flex align-items-center gap-2 ${selectedDiagnosis?.diagnosis ===
                                        item.diagnosis
                                        ? "bg-blue text-white"
                                        : ""
                                        }`}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        setSelectedDiagnosis(
                                            item
                                        )
                                    }
                                >
                                    <i className="ri-stethoscope-line fs-14"></i>

                                    <span className="fs-14">
                                        {
                                            item.diagnosis
                                        }
                                    </span>
                                </div>
                            )
                        )

                    ) : (

                        <div className="p-4 text-center">
                            No Diagnosis Found
                        </div>

                    )}
                </div>

            </Modal.Body>

            <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                <button
                    type="button"
                    onClick={handleDone}
                    disabled={
                        !selectedDiagnosis
                    }
                    className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                >
                    Done
                </button>

                <button
                    type="button"
                    onClick={handleClose}
                    className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                >
                    Cancel
                </button>

            </div>

        </Modal>
    );
}