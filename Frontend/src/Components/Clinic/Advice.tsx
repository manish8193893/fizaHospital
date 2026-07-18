import { useMemo, useState } from "react";

import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, { type DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";
import TinyEditor from "../TinyEditor";



type AdviceType =
    | "VISIT_COMPLETE"
    | "REFER_TO_ADMISSION"
    | "REFER_TO_EMERGENCY"
    | "SURGERY_REQUEST"
    | "REFER_TO_ANTENATAL_CARE"
    | "REFER_TO_MENTAL_HEALTH"
    | "REFER_TO_CLINIC"
    | "REFER_TO_OUTSIDE_HOSPITAL";

export default function Advice() {
    const [selectedAdvice, setSelectedAdvice] = useState<AdviceType | null>(null);

    const [selectedFollowUpDate, setSelectedFollowUpDate] = useState<Date | null>(null);

    const [showFollowUpCalendar, setShowFollowUpCalendar] = useState(false);

    const [selectedExpectedAdmissionDate, setSelectedExpectedAdmissionDate] = useState<Date | null>(null);

    const [showAdmissionCalendar, setShowAdmissionCalendar] = useState(false);

    const [selectedWard, setSelectedWard] = useState<DropdownOption | null>(null);

    const [selectedClinic, setSelectedClinic] = useState<DropdownOption | null>(null);

    const [selectedDoctor, setSelectedDoctor] = useState<DropdownOption | null>(null);

    const [notes, setNotes] = useState({
        referToEmergency: "",
        referToAdmission: "",
        visitComplete: "",
        referToMentalHealth: "",
        referToAntenatalCare: "",
        surgeryRequest: "",
        referToOutsideHospital: "",
        referToClinic: "",
    });

    const [formData, setFormData] = useState({
        reportSubject: "",
        note: "",
        lengthOfStay: "",
        surgeryName: "",
        surgeryPrice: "",
        hospitalName: "",
    });

    const ADVICE_OPTIONS = [
        {
            value: "VISIT_COMPLETE",
            label: "Visit Complete",
        },
        {
            value: "REFER_TO_ADMISSION",
            label: "Refer to Admission",
        },
        {
            value: "REFER_TO_EMERGENCY",
            label: "Refer to Emergency",
        },
        {
            value: "SURGERY_REQUEST",
            label: "Surgery Request",
        },
        {
            value: "REFER_TO_ANTENATAL_CARE",
            label: "Refer to Antenatal Care",
        },
        {
            value: "REFER_TO_MENTAL_HEALTH",
            label: "Refer to Mental Health",
        },
        {
            value: "REFER_TO_CLINIC",
            label: "Refer to Clinic",
        },
        {
            value: "REFER_TO_OUTSIDE_HOSPITAL",
            label: "Refer to Outside Hospital",
        },
    ];

    const WARD_OPTIONS = [
        { id: "General Ward", name: "General Ward" },
        { id: "Medical Ward", name: "Medical Ward" },
        { id: "Surgical Ward", name: "Surgical Ward" },
        { id: "ICU", name: "ICU" },
        { id: "CCU", name: "CCU" },
        { id: "Maternity Ward", name: "Maternity Ward" },
    ];

    const CLINIC_OPTIONS = [
        {
            id: "Cardiology Clinic",
            name: "Cardiology Clinic",
        },
        {
            id: "ENT Clinic",
            name: "ENT Clinic",
        },
        {
            id: "Orthopedic Clinic",
            name: "Orthopedic Clinic",
        },
        {
            id: "Dermatology Clinic",
            name: "Dermatology Clinic",
        },
    ];

    const CLINIC_DOCTORS = {
        "Cardiology Clinic": [
            {
                id: "Dr Ahmed",
                name: "Dr Ahmed",
            },
            {
                id: "Dr Hassan",
                name: "Dr Hassan",
            },
        ],

        "ENT Clinic": [
            {
                id: "Dr Ali",
                name: "Dr Ali",
            },
            {
                id: "Dr Omar",
                name: "Dr Omar",
            },
        ],

        "Orthopedic Clinic": [
            {
                id: "Dr Bilal",
                name: "Dr Bilal",
            },
            {
                id: "Dr Khan",
                name: "Dr Khan",
            },
        ],

        "Dermatology Clinic": [
            {
                id: "Dr Sara",
                name: "Dr Sara",
            },
            {
                id: "Dr Fatima",
                name: "Dr Fatima",
            },
        ],
    };

    const doctorOptions = useMemo(() => {
        if (!selectedClinic?.name) return [];

        return (
            CLINIC_DOCTORS[
            selectedClinic.name as keyof typeof CLINIC_DOCTORS
            ] || []
        );
    }, [selectedClinic]);

    const handleSave = () => {

        const payload = {
            adviceType: selectedAdvice,

            reportSubject:
                formData.reportSubject,

            followUpDate:
                selectedFollowUpDate,

            ward:
                selectedWard,

            expectedAdmissionDate:
                selectedExpectedAdmissionDate,

            lengthOfStay:
                formData.lengthOfStay,

            surgeryName:
                formData.surgeryName,

            surgeryPrice:
                formData.surgeryPrice,

            hospitalName:
                formData.hospitalName,

            clinic:
                selectedClinic,

            doctor:
                selectedDoctor,

            note:
                formData.note,
        };

        console.log(
            "Advice Form Data :",
            payload
        );
    };


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const renderNoteField = (
        value: string,
        field: keyof typeof notes
    ) => (
        <div className="formRow">
            <div
                className="formGroup"
                style={{ width: "100%" }}
            >
                <label className="customLabel">
                    Note
                </label>

                <TinyEditor
                    value={value}
                    onChange={(content) =>
                        setNotes((prev) => ({
                            ...prev,
                            [field]: content,
                        }))
                    }
                />
            </div>
        </div>
    );

    return (
        <>
            {/* Row 1  */}
            <div className="formContainer">

                <h5 className="fs-18 fw-500 mb-4">
                    Advice
                </h5>

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Report Subject <span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="reportSubject"
                                placeholder="Enter Report Subject"
                                value={formData.reportSubject}
                                onChange={handleInputChange}
                                className="customInput"
                            />
                            <i className="ri-file-text-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Follow-up Date <span className="text-danger">*</span>
                        </label>

                        <div style={{ position: "relative" }}>
                            <div
                                className="customInput d-flex align-items-center"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    setShowFollowUpCalendar(
                                        !showFollowUpCalendar
                                    )
                                }
                            >
                                {selectedFollowUpDate
                                    ? `${String(
                                        selectedFollowUpDate.getDate()
                                    ).padStart(2, "0")}/${String(
                                        selectedFollowUpDate.getMonth() + 1
                                    ).padStart(2, "0")}/${selectedFollowUpDate.getFullYear()}`
                                    : "DD/MM/YYYY"}
                            </div>

                            {showFollowUpCalendar && (
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
                                        selectedDate={selectedFollowUpDate}
                                        onDateSelect={(date) => {
                                            setSelectedFollowUpDate(date);
                                            setShowFollowUpCalendar(false);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/*  Radio Buttons */}
            <div className="p-4 ps-0 mb-4">

                <div className="d-flex flex-wrap gap-2">
                    {ADVICE_OPTIONS.map((item) => (

                        <label
                            key={item.value}
                            className="d-flex align-items-center gap-2"
                            style={{
                                cursor: "pointer",
                                minWidth: "250px",
                            }}
                        >
                            <input
                                type="radio"
                                checked={
                                    selectedAdvice === item.value
                                }
                                className="advice-radio"
                                onChange={() =>
                                    setSelectedAdvice(
                                        item.value as AdviceType
                                    )
                                }
                            />

                            {item.label}
                        </label>

                    ))}
                </div>

            </div>

            {/* Refer to Emergency */}
            {selectedAdvice ===
                "REFER_TO_EMERGENCY" && (
                    <>
                        {renderNoteField(
                            notes.referToEmergency,
                            "referToEmergency"
                        )}


                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleSave}
                                className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Send Request
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Print
                            </button>

                        </div>
                    </>
                )
            }

            {/* Visit Complete */}
            {selectedAdvice ===
                "VISIT_COMPLETE" && (
                    <>
                        {renderNoteField(
                            notes.visitComplete,
                            "visitComplete"
                        )}

                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleSave}
                                className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Send Request
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Print
                            </button>

                        </div>
                    </>
                )
            }

            {/* Refer to Mental Health */}
            {selectedAdvice ===
                "REFER_TO_MENTAL_HEALTH" && (
                    <>
                        {renderNoteField(
                            notes.referToMentalHealth,
                            "referToMentalHealth"
                        )}

                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleSave}
                                className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Send Request
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Print
                            </button>

                        </div>
                    </>
                )
            }

            {/* Refer to Antenatal Care */}
            {selectedAdvice ===
                "REFER_TO_ANTENATAL_CARE" && (
                    <>
                        {renderNoteField(
                            notes.referToAntenatalCare,
                            "referToAntenatalCare"
                        )}

                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleSave}
                                className="aph-modal-btn-height border-0 outline-0 col-md-6 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-5 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Print
                            </button>

                        </div>
                    </>
                )
            }

            {/* Refer to Admission */}
            {selectedAdvice ===
                "REFER_TO_ADMISSION" && (
                    <>

                        <div className="formRow">

                            <div className="formGroup">
                                <label className="customLabel">
                                    Ward Name
                                </label>

                                <CustomFormDropdown
                                    options={WARD_OPTIONS}
                                    value={selectedWard}
                                    onChange={setSelectedWard}
                                    placeholder="Select Ward"
                                />
                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Expected Admission Date
                                </label>

                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        className="customInput d-flex align-items-center"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            setShowAdmissionCalendar(
                                                !showAdmissionCalendar
                                            )
                                        }
                                    >
                                        {selectedExpectedAdmissionDate
                                            ? `${String(
                                                selectedExpectedAdmissionDate.getDate()
                                            ).padStart(2, "0")}/${String(
                                                selectedExpectedAdmissionDate.getMonth() + 1
                                            ).padStart(2, "0")}/${selectedExpectedAdmissionDate.getFullYear()}`
                                            : "DD/MM/YYYY"}
                                    </div>

                                    {showAdmissionCalendar && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                            }}
                                        >
                                            <DateFilterCalendar
                                                selectedDate={
                                                    selectedExpectedAdmissionDate
                                                }
                                                onDateSelect={(date) => {
                                                    setSelectedExpectedAdmissionDate(date);
                                                    setShowAdmissionCalendar(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Length of Stay (In Days)
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="number"
                                        name="lengthOfStay"
                                        placeholder="Enter Length of Stay"
                                        value={formData.lengthOfStay}
                                        onChange={handleInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-hotel-bed-line"></i>
                                </div>

                            </div>

                        </div>

                        {renderNoteField(
                            notes.referToClinic,
                            "referToAdmission"
                        )}

                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleSave}
                                className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Send Request
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Print
                            </button>

                        </div>

                    </>
                )
            }

            {/* Surgery Request */}
            {selectedAdvice ===
                "SURGERY_REQUEST" && (
                    <>

                        <div className="formRow">

                            <div className="formGroup">
                                <label className="customLabel">
                                    Surgery Name
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="surgeryName"
                                        placeholder="Enter Surgery Name"
                                        value={formData.surgeryName}
                                        onChange={handleInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-scissors-cut-line"></i>
                                </div>
                            </div>

                            <div className="formGroup">
                                <label className="customLabel">
                                    Surgery Price
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="number"
                                        name="surgeryPrice"
                                        placeholder="Enter Surgery Price"
                                        value={formData.surgeryPrice}
                                        onChange={handleInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-money-dollar-circle-line"></i>
                                </div>
                            </div>

                        </div>

                        {renderNoteField(
                            notes.surgeryRequest,
                            "surgeryRequest"
                        )}

                        {/* Buttons */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleSave}
                                className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Send Request
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Print
                            </button>

                        </div>
                    </>
                )
            }

            {/* Refer to Outside Hospital */}
            {selectedAdvice ===
                "REFER_TO_OUTSIDE_HOSPITAL" && (
                    <>

                        <div className="formRow">

                            <div className="formGroup">
                                <label className="customLabel">
                                    Hospital Name
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="hospitalName"
                                        placeholder="Enter Hospital Name"
                                        value={formData.hospitalName}
                                        onChange={handleInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-hospital-line"></i>
                                </div>
                            </div>

                            <div className="formGroup">
                                <label className="customLabel">
                                    Surgery Price
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="number"
                                        name="surgeryPrice"
                                        placeholder="Enter Surgery Price"
                                        value={formData.surgeryPrice}
                                        onChange={handleInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-money-dollar-circle-line"></i>
                                </div>
                            </div>

                        </div>

                        {renderNoteField(
                            notes.referToOutsideHospital,
                            "referToOutsideHospital"
                        )}

                        {/* Buttons */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleSave}
                                className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Send Request
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Print
                            </button>

                        </div>
                    </>
                )
            }

            {/* Refer to Clinic */}
            {selectedAdvice ===
                "REFER_TO_CLINIC" && (
                    <>

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Clinic
                                </label>

                                <CustomFormDropdown
                                    options={CLINIC_OPTIONS}
                                    value={selectedClinic}
                                    onChange={(value) => {
                                        setSelectedClinic(value);
                                        setSelectedDoctor(null);
                                    }}
                                    placeholder="Select Clinic"
                                />

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Doctor
                                </label>

                                <CustomFormDropdown
                                    options={doctorOptions}
                                    value={selectedDoctor}
                                    onChange={setSelectedDoctor}
                                    placeholder="Select Doctor"
                                />

                            </div>

                        </div>

                        {renderNoteField(
                            notes.referToClinic,
                            "referToClinic"
                        )}

                        {/* Buttons */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleSave}
                                className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Send Request
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 text-blue bg-white fs-18 fw-400"
                                style={{ border: "1px solid #3E64AB" }}
                            >
                                Print
                            </button>

                        </div>
                    </>
                )
            }
        </>
    );
}