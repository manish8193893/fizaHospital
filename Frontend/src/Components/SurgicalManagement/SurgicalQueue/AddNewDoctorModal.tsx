import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";


import CustomFormDropdown, {
    type DropdownOption,
} from "../../../GlobalHelpers/CustomFormDropdown";

interface AddNewDoctorModalProps {
    show: boolean;
    handleClose: () => void;
}

interface SelectedDoctor {
    id: string;
    name: string;
    fee: number;
}

interface SelectedNurse {
    id: string;
    name: string;
}

export default function AddNewDoctorModal({
    show,
    handleClose,
}: AddNewDoctorModalProps) {

    /********************************************
        DOCTOR OPTIONS
    *********************************************/
    const DOCTOR_OPTIONS: DropdownOption[] = [
        {
            id: "1",
            name: "Dr. Irfan Ahmed",
        },
        {
            id: "2",
            name: "Dr. Ali Hassan",
        },
        {
            id: "3",
            name: "Dr. Muhammad Usman",
        },
        {
            id: "4",
            name: "Dr. Bilal Khan",
        },
        {
            id: "5",
            name: "Dr. Shahid Raza",
        },
    ];

    /********************************************
        NURSE OPTIONS
    *********************************************/
    const NURSE_OPTIONS: DropdownOption[] = [
        {
            id: "1",
            name: "Nurse Sana",
        },
        {
            id: "2",
            name: "Nurse Hina",
        },
        {
            id: "3",
            name: "Nurse Ayesha",
        },
        {
            id: "4",
            name: "Nurse Fatima",
        },
    ];

    /********************************************
        DISABLED FIELD VALUES
    *********************************************/
    const patientName = "Ahmed Abdul Wahab";
    const phoneNumber = "03001234567";
    const surgicalName = "Appendectomy";
    const assistant = "Assistant Ahmed";
    const anesthetist = "Dr. Salman";
    const admissionType = "Requested by Doctor";
    const arrivalTime = "08:00 AM";
    const admissionDate = "28/06/2026";
    const admissionTime = "09:00 AM";
    const surgeryDuration = "2";
    const stay = "3";
    const notes =
        "Patient is medically fit for surgery.";

    /********************************************
        STATES
    *********************************************/
    const [selectedDoctor, setSelectedDoctor] =
        useState<DropdownOption | null>(null);

    const [selectedNurse, setSelectedNurse] =
        useState<DropdownOption | null>(null);

    const [doctorList, setDoctorList] =
        useState<SelectedDoctor[]>([]);

    const [nurseList, setNurseList] =
        useState<SelectedNurse[]>([]);

    /********************************************
        AVAILABLE DOCTORS
    *********************************************/
    const availableDoctors = useMemo(() => {

        return DOCTOR_OPTIONS.filter(
            doctor =>
                !doctorList.some(
                    item => item.id === doctor.id
                )
        );

    }, [doctorList]);

    /********************************************
        AVAILABLE NURSES
    *********************************************/
    const availableNurses = useMemo(() => {

        return NURSE_OPTIONS.filter(
            nurse =>
                !nurseList.some(
                    item => item.id === nurse.id
                )
        );

    }, [nurseList]);

    /********************************************
        ADD DOCTOR
    *********************************************/
    const handleDoctorSelect = (
        value: DropdownOption | null
    ) => {

        if (!value) return;

        setDoctorList(prev => [
            ...prev,
            {
                id: value.id,
                name: value.name,
                fee: 0,
            },
        ]);

        setSelectedDoctor(null);

    };

    /********************************************
        ADD NURSE
    *********************************************/
    const handleNurseSelect = (
        value: DropdownOption | null
    ) => {

        if (!value) return;

        setNurseList(prev => [
            ...prev,
            {
                id: value.id,
                name: value.name,
            },
        ]);

        setSelectedNurse(null);

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
                    Add New Doctor
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Patient Name
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={patientName}
                                    disabled
                                />

                                <i className="ri-user-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Phone Number
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={phoneNumber}
                                    disabled
                                />

                                <i className="ri-phone-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 2 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Surgical Name
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={surgicalName}
                                    disabled
                                />

                                <i className="ri-scissors-cut-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Doctor Name{" "}<span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={availableDoctors}
                                value={selectedDoctor}
                                onChange={handleDoctorSelect}
                                placeholder="Select Doctor"
                            />

                            {/* SELECTED DOCTORS */}

                            {
                                doctorList.length > 0 && (

                                    <div className="formRow gap-2 mt-2 mb-0">

                                        {
                                            doctorList.map((doctor) => (

                                                <div
                                                    key={doctor.id}
                                                    className="d-flex flex-row align-items-center py-1 px-2 formGroup"
                                                    style={{ backgroundColor: "#0284C71A" }}
                                                >

                                                    <span className="fs-14 fw-500 me-2 text-nowrap">
                                                        {doctor.name}
                                                    </span>

                                                    <input
                                                        type="number"
                                                        value={doctor.fee}
                                                        onChange={(e) =>
                                                            setDoctorList(prev =>
                                                                prev.map(item =>
                                                                    item.id ===
                                                                        doctor.id
                                                                        ? {
                                                                            ...item,
                                                                            fee: Number(
                                                                                e.target.value
                                                                            ),
                                                                        }
                                                                        : item
                                                                )
                                                            )
                                                        }
                                                        style={{
                                                            width: "80px",
                                                            outline: "none"
                                                        }}
                                                        className="rounded-0 border text-center px-0 me-2 fs-14 fw-500"
                                                    />

                                                    <button
                                                        type="button"
                                                        className="border-0 bg-transparent rounded-circle  text-red"
                                                        onClick={() =>
                                                            setDoctorList(prev =>
                                                                prev.filter(
                                                                    item =>
                                                                        item.id !==
                                                                        doctor.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <i className="ri-close-circle-fill fs-22"></i>
                                                    </button>

                                                </div>

                                            ))
                                        }

                                    </div>

                                )
                            }

                        </div>

                    </div>

                    {/* ROW 3 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Assistant
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={assistant}
                                    disabled
                                />

                                <i className="ri-user-star-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Anesthetist
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={anesthetist}
                                    disabled
                                />

                                <i className="ri-hospital-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 4 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Nurse{" "}<span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={availableNurses}
                                value={selectedNurse}
                                onChange={handleNurseSelect}
                                placeholder="Select Nurse"
                            />

                            {/* SELECTED NURSES */}

                            {
                                nurseList.length > 0 && (

                                    <div className="d-flex align-items-center gap-2 mb-0 mt-2">

                                        {
                                            nurseList.map((nurse) => (

                                                <span
                                                    key={nurse.id}
                                                    className="align-items-center py-1 px-2"
                                                    style={{ backgroundColor: "#0284C71A" }}
                                                >

                                                    <span
                                                        className="fs-14 fw-500 me-2 text-nowrap"
                                                    >
                                                        {nurse.name}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        className="border-0 bg-transparent rounded-circle  text-red"
                                                        onClick={() =>
                                                            setNurseList(prev =>
                                                                prev.filter(
                                                                    item =>
                                                                        item.id !==
                                                                        nurse.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <i className="ri-close-circle-fill fs-22"></i>
                                                    </button>

                                                </span>

                                            ))
                                        }

                                    </div>

                                )
                            }

                        </div>

                    </div>


                    {/* ROW 5 */}

                    <div className="formRow d-flex">

                        <div className="formGroup">

                            <label className="customLabel">
                                Admission Type
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={admissionType}
                                    disabled
                                />

                                <i className="ri-hospital-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Pre-Surgery Arrival Time
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={arrivalTime}
                                    disabled
                                />

                                <i className="ri-time-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Expected Admission Date
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={admissionDate}
                                    disabled
                                />

                                <i className="ri-calendar-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 6 */}

                    <div className="formRow d-flex">

                        <div className="formGroup">

                            <label className="customLabel">
                                Expected Admission Time
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={admissionTime}
                                    disabled
                                />

                                <i className="ri-time-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Expected Surgery Duration (Hours)
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={surgeryDuration}
                                    disabled
                                />

                                <i className="ri-timer-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Post Surgery Length of Stay (Days)
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={stay}
                                    disabled
                                />

                                <i className="ri-hotel-bed-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 7 */}

                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">
                                Notes
                            </label>

                            <div className="inputWrapper">

                                <input
                                    className="customInput"
                                    value={notes}
                                    disabled
                                    type="text"
                                />

                                <i className="ri-sticky-note-line textareaIcon"></i>

                            </div>
                        </div>
                    </div>


                    {/* BUTTONS */}

                    <div className="d-flex justify-content-between mt-4">

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                            onClick={() => {

                                const payload = {

                                    patientName,
                                    phoneNumber,
                                    surgicalName,

                                    doctors: doctorList,

                                    assistant,

                                    anesthetist,

                                    nurses: nurseList,

                                    admissionType,

                                    preSurgeryArrivalTime: arrivalTime,

                                    expectedAdmissionDate: admissionDate,

                                    expectedAdmissionTime: admissionTime,

                                    expectedSurgeryDuration: surgeryDuration,

                                    postSurgeryLengthOfStay: stay,

                                    notes,

                                };

                                console.log(
                                    "Add New Doctor Payload :",
                                    payload
                                );

                                setDoctorList([]);

                                setNurseList([]);

                                setSelectedDoctor(null);

                                setSelectedNurse(null);

                                handleClose();

                            }}
                        >
                            Done
                        </button>

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                            onClick={() => {

                                setDoctorList([]);

                                setNurseList([]);

                                setSelectedDoctor(null);

                                setSelectedNurse(null);

                                handleClose();

                            }}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </Modal.Body>

        </Modal >

    );

}