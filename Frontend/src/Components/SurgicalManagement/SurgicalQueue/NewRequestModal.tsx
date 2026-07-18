import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";


import CustomFormDropdown, {
    type DropdownOption,
} from "../../../GlobalHelpers/CustomFormDropdown";

import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";

import "../../../styles/SurgicalScheduled.css";

interface NewRequestModalProps {
    show: boolean;
    handleClose: () => void;
}

interface FormData {
    patientName: string;
    phoneNumber: string;
    surgeryName: string;
    surgeryPrice: string;
    expectedAdmissionTime: string;
    expectedSurgeryDuration: string;
    postSurgeryLengthOfStay: string;
    notes: string;
}

export default function NewRequestModal({
    show,
    handleClose,
}: NewRequestModalProps) {

    /********************************************
        DEPARTMENT OPTIONS
    *********************************************/

    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Cardiology" },
        { id: "2", name: "Emergency" },
        { id: "3", name: "Emergency Surgery" },
        { id: "4", name: "General Medicine" },
        { id: "5", name: "Gynecology" },
        { id: "6", name: "ICU" },
        { id: "7", name: "LAB" },
        { id: "8", name: "Laboratory" },
        { id: "9", name: "Medical Records" },
        { id: "10", name: "Neurology" },
        { id: "11", name: "Ortho" },
        { id: "12", name: "Orthopedics" },
        { id: "13", name: "Pediatrics" },
        { id: "14", name: "Pharmacy" },
        { id: "15", name: "Radiology" },
    ];

    /********************************************
        ROOM OPTIONS
    *********************************************/

    const ROOM_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Room 1" },
        { id: "2", name: "Room 2" },
        { id: "3", name: "Room 3" },
        { id: "4", name: "Room 4" },
        { id: "5", name: "Room 5" },
    ];

    /********************************************
        SURGEON OPTIONS
    *********************************************/

    const SURGEON_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Dr. Irfan Ahmed" },
        { id: "2", name: "Dr. Ali Hassan" },
        { id: "3", name: "Dr. Bilal Khan" },
        { id: "4", name: "Dr. Shahid Raza" },
    ];

    /********************************************
        ASSISTANT OPTIONS
    *********************************************/

    const ASSISTANT_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Assistant Ahmed" },
        { id: "2", name: "Assistant Bilal" },
        { id: "3", name: "Assistant Hamza" },
    ];

    /********************************************
        ANESTHETIST OPTIONS
    *********************************************/

    const ANESTHETIST_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Dr. Salman" },
        { id: "2", name: "Dr. Asif" },
        { id: "3", name: "Dr. Aamir" },
    ];

    /********************************************
        NURSE OPTIONS
    *********************************************/

    const NURSE_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Nurse Sana" },
        { id: "2", name: "Nurse Hina" },
        { id: "3", name: "Nurse Fatima" },
        { id: "4", name: "Nurse Ayesha" },
    ];

    /********************************************
        ADMISSION TYPE OPTIONS
    *********************************************/

    const ADMISSION_TYPE_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Normal" },
        { id: "2", name: "Emergency" },
        { id: "3", name: "Day Care" },
    ];

    /********************************************
        FORM STATE
    *********************************************/

    const [formData, setFormData] =
        useState<FormData>({
            patientName: "",
            phoneNumber: "",
            surgeryName: "",
            surgeryPrice: "",
            expectedAdmissionTime: "",
            expectedSurgeryDuration: "",
            postSurgeryLengthOfStay: "",
            notes: "",
        });

    /********************************************
        DROPDOWN STATES
    *********************************************/

    const [selectedDepartment, setSelectedDepartment] =
        useState<DropdownOption | null>(null);

    const [selectedRoom, setSelectedRoom] =
        useState<DropdownOption | null>(null);

    const [selectedSurgeon, setSelectedSurgeon] =
        useState<DropdownOption | null>(null);

    const [selectedAssistant, setSelectedAssistant] =
        useState<DropdownOption | null>(null);

    const [selectedAnesthetist, setSelectedAnesthetist] =
        useState<DropdownOption | null>(null);

    const [selectedNurse, setSelectedNurse] =
        useState<DropdownOption | null>(null);

    const [selectedAdmissionType, setSelectedAdmissionType] =
        useState<DropdownOption | null>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);

    /********************************************
        DATE STATES
    *********************************************/

    const [selectedArrivalDate, setSelectedArrivalDate] =
        useState<Date | null>(null);

    const [showArrivalCalendar, setShowArrivalCalendar] =
        useState(false);

    const [selectedAdmissionDate, setSelectedAdmissionDate] =
        useState<Date | null>(null);

    const [showAdmissionCalendar, setShowAdmissionCalendar] =
        useState(false);

    /********************************************
        HANDLE INPUT CHANGE
    *********************************************/

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

    };

    /********************************************
        RESET FORM
    *********************************************/

    const resetForm = () => {

        setFormData({
            patientName: "",
            phoneNumber: "",
            surgeryName: "",
            surgeryPrice: "",
            expectedAdmissionTime: "",
            expectedSurgeryDuration: "",
            postSurgeryLengthOfStay: "",
            notes: "",
        });

        setSelectedDepartment(null);

        setSelectedRoom(null);

        setSelectedSurgeon(null);

        setSelectedAssistant(null);

        setSelectedAnesthetist(null);

        setSelectedNurse(null);

        setSelectedAdmissionType(null);

        setSelectedArrivalDate(null);

        setSelectedAdmissionDate(null);

        setShowArrivalCalendar(false);

        setShowAdmissionCalendar(false);

    };

    /********************************************
        HANDLE SUBMIT
    *********************************************/

    const handleSubmit = () => {

        const payload = {

            ...formData,

            department: selectedDepartment,

            room: selectedRoom,

            surgeon: selectedSurgeon,

            assistant: selectedAssistant,

            anesthetist: selectedAnesthetist,

            nurse: selectedNurse,

            admissionType: selectedAdmissionType,

            preSurgeryArrivalDate: selectedArrivalDate,

            expectedAdmissionDate: selectedAdmissionDate,

        };

        console.log(
            "New Request Payload :",
            payload
        );

        resetForm();

        handleClose();

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

            {/* HEADER */}

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

                <Modal.Title className="aph-modal-title fs-18 fw-400">
                    New Request
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Patient Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="patientName"
                                    className="customInput"
                                    placeholder="Enter Patient Name"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                />

                                <i className="ri-user-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Phone Number{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="customInput"
                                    placeholder="Enter Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />

                                <i className="ri-phone-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 2 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Surgery Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="surgeryName"
                                    className="customInput"
                                    placeholder="Enter Surgery Name"
                                    value={formData.surgeryName}
                                    onChange={handleChange}
                                />

                                <i className="ri-scissors-cut-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Surgery Price{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="surgeryPrice"
                                    className="customInput"
                                    placeholder="Enter Surgery Price"
                                    value={formData.surgeryPrice}
                                    onChange={handleChange}
                                />

                                <i className="ri-money-dollar-circle-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 3 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Department{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={DEPARTMENT_OPTIONS}
                                value={selectedDepartment}
                                onChange={setSelectedDepartment}
                                placeholder="Select Department"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Room{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={ROOM_OPTIONS}
                                value={selectedRoom}
                                onChange={setSelectedRoom}
                                placeholder="Select Room"
                            />

                        </div>

                    </div>

                    {/* ROW 4 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Surgeon{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={SURGEON_OPTIONS}
                                value={selectedSurgeon}
                                onChange={setSelectedSurgeon}
                                placeholder="Select Surgeon"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Assistant{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={ASSISTANT_OPTIONS}
                                value={selectedAssistant}
                                onChange={setSelectedAssistant}
                                placeholder="Select Assistant"
                            />

                        </div>

                    </div>

                    {/* ROW 5 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Anesthetist{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={ANESTHETIST_OPTIONS}
                                value={selectedAnesthetist}
                                onChange={setSelectedAnesthetist}
                                placeholder="Select Anesthetist"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Nurse{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={NURSE_OPTIONS}
                                value={selectedNurse}
                                onChange={setSelectedNurse}
                                placeholder="Select Nurse"
                            />

                        </div>

                    </div>

                    {/* ROW 6 */}

                    <div className="formRow d-flex">

                        <div className="formGroup">

                            <label className="customLabel">
                                Admission Type{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={ADMISSION_TYPE_OPTIONS}
                                value={selectedAdmissionType}
                                onChange={setSelectedAdmissionType}
                                placeholder="Select Admission Type"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Pre-Surgery Arrival Date{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div style={{ position: "relative" }}>

                                <div
                                    className="customInput d-flex align-items-center"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        setShowArrivalCalendar(
                                            !showArrivalCalendar
                                        )
                                    }
                                >

                                    {
                                        selectedArrivalDate
                                            ? `${String(selectedArrivalDate.getDate()).padStart(2, "0")}/${String(selectedArrivalDate.getMonth() + 1).padStart(2, "0")}/${selectedArrivalDate.getFullYear()}`
                                            : "DD/MM/YYYY"
                                    }

                                </div>

                                <i
                                    className="ri-calendar-line"
                                    style={{
                                        position: "absolute",
                                        right: "15px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        pointerEvents: "none",
                                    }}
                                ></i>

                                {
                                    showArrivalCalendar && (

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
                                                selectedDate={selectedArrivalDate}
                                                onDateSelect={(date) => {

                                                    setSelectedArrivalDate(date);

                                                    setShowArrivalCalendar(false);

                                                }}
                                            />

                                        </div>

                                    )
                                }

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Expected Admission Date{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div style={{ position: "relative" }}>

                                <div
                                    className="customInput d-flex align-items-center"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        setShowAdmissionCalendar(
                                            !showAdmissionCalendar
                                        )
                                    }
                                >

                                    {
                                        selectedAdmissionDate
                                            ? `${String(selectedAdmissionDate.getDate()).padStart(2, "0")}/${String(selectedAdmissionDate.getMonth() + 1).padStart(2, "0")}/${selectedAdmissionDate.getFullYear()}`
                                            : "DD/MM/YYYY"
                                    }

                                </div>

                                <i
                                    className="ri-calendar-line"
                                    style={{
                                        position: "absolute",
                                        right: "15px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        pointerEvents: "none",
                                    }}
                                ></i>

                                {
                                    showAdmissionCalendar && (

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
                                                selectedDate={selectedAdmissionDate}
                                                onDateSelect={(date) => {

                                                    setSelectedAdmissionDate(date);

                                                    setShowAdmissionCalendar(false);

                                                }}
                                            />

                                        </div>

                                    )
                                }

                            </div>

                        </div>

                    </div>

                    {/* ROW 7 */}

                    <div className="formRow d-flex">

                        <div className="formGroup">

                            <label className="customLabel">
                                Expected Admission Time{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div
                                className="inputWrapper"
                                onClick={() => {

                                    if (timeInputRef.current?.showPicker) {
                                        timeInputRef.current.showPicker();
                                    } else {
                                        timeInputRef.current?.focus();
                                    }

                                }}
                            >

                                <input
                                    ref={timeInputRef}
                                    type="time"
                                    name="expectedAdmissionTime"
                                    className="customInput customTimeInput"
                                    value={formData.expectedAdmissionTime}
                                    onChange={handleChange}
                                />

                                <i className="ri-time-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Expected Surgery Duration (Min){" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="expectedSurgeryDuration"
                                    className="customInput"
                                    placeholder="Enter Duration"
                                    value={formData.expectedSurgeryDuration}
                                    onChange={handleChange}
                                />

                                <i className="ri-timer-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Post Surgery Length of Stay (Days){" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="postSurgeryLengthOfStay"
                                    className="customInput"
                                    placeholder="Enter Days"
                                    value={formData.postSurgeryLengthOfStay}
                                    onChange={handleChange}
                                />

                                <i className="ri-hotel-bed-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 8 */}

                    <div className="formRow">

                        <div className="formGroup fullWidth">

                            <label className="customLabel">
                                Notes
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="notes"
                                    className="customInput"
                                    placeholder="Enter Notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />

                                <i className="ri-sticky-note-line"></i>

                            </div>

                        </div>

                    </div>

                    <div className="d-flex justify-content-between mt-5">

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-4 bg-blue text-white fs-18 fw-400"
                            onClick={handleSubmit}
                        >
                            Add New
                        </button>

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-4 bg-green text-white fs-18 fw-400"
                            onClick={() => {

                                console.log(
                                    "Notify Patient Payload :",
                                    {
                                        ...formData,
                                        department: selectedDepartment,
                                        room: selectedRoom,
                                        surgeon: selectedSurgeon,
                                        assistant: selectedAssistant,
                                        anesthetist: selectedAnesthetist,
                                        nurse: selectedNurse,
                                        admissionType: selectedAdmissionType,
                                        preSurgeryArrivalDate: selectedArrivalDate,
                                        expectedAdmissionDate: selectedAdmissionDate,
                                    }
                                );

                                resetForm();

                                handleClose();

                            }}
                        >
                            Notify Patient
                        </button>

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-3 border-red text-red bg-white fs-18 fw-400"
                            onClick={() => {

                                resetForm();

                                handleClose();

                            }}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </Modal.Body>

        </Modal>

    );

}


