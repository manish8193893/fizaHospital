import { useMemo, useRef, useState } from "react";
import { Modal } from "react-bootstrap";


import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, { type DropdownOption, } from "../../../GlobalHelpers/CustomFormDropdown";


import "../../../styles/SurgicalScheduled.css";

interface AddNewSurgeryModalProps {
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

interface SurgeryFormData {
    patientName: string;
    phoneNumber: string;
    surgicalName: string;
    surgicalPrice: string;
    scheduledTime: string;
    duration: string;
    notes: string;
}

export default function AddNewSurgeryModal({
    show,
    handleClose,
}: AddNewSurgeryModalProps) {

    /********************************************
        DROPDOWN OPTIONS
    *********************************************/
    const SURGERY_ROOM_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Operation Theatre - 01" },
        { id: "2", name: "Operation Theatre - 02" },
        { id: "3", name: "Operation Theatre - 03" },
        { id: "4", name: "Minor OT" },
    ];

    const DOCTOR_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Dr. Irfan Ahmed" },
        { id: "2", name: "Dr. Ali Hassan" },
        { id: "3", name: "Dr. Bilal Khan" },
        { id: "4", name: "Dr. Shahid Raza" },
    ];

    const ASSISTANT_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Assistant Ahmed" },
        { id: "2", name: "Assistant Bilal" },
        { id: "3", name: "Assistant Hamza" },
    ];

    const ANESTHETIST_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Dr. Salman" },
        { id: "2", name: "Dr. Asif" },
        { id: "3", name: "Dr. Aamir" },
    ];

    const NURSE_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Nurse Sana" },
        { id: "2", name: "Nurse Hina" },
        { id: "3", name: "Nurse Fatima" },
        { id: "4", name: "Nurse Ayesha" },
    ];

    /********************************************
        FORM STATE
    *********************************************/

    const [formData, setFormData] =
        useState<SurgeryFormData>({
            patientName: "",
            phoneNumber: "",
            surgicalName: "",
            surgicalPrice: "",
            scheduledTime: "",
            duration: "",
            notes: "",
        });

    const [showDateCalendar, setShowDateCalendar] = useState(false);
    const [nurseList, setNurseList] = useState<SelectedNurse[]>([]);
    const [doctorList, setDoctorList] = useState<SelectedDoctor[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<DropdownOption | null>(null);
    const [selectedNurse, setSelectedNurse] = useState<DropdownOption | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<DropdownOption | null>(null);
    const [selectedAssistant, setSelectedAssistant] = useState<DropdownOption | null>(null);
    const [selectedAnesthetist, setSelectedAnesthetist] = useState<DropdownOption | null>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);

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
        HANDLE DOCTOR SELECT
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
        HANDLE NURSE SELECT
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

    /********************************************
        RESET FORM
    *********************************************/

    const resetForm = () => {

        setFormData({
            patientName: "",
            phoneNumber: "",
            surgicalName: "",
            surgicalPrice: "",
            scheduledTime: "",
            duration: "",
            notes: "",
        });

        setSelectedRoom(null);
        setSelectedDoctor(null);
        setSelectedAssistant(null);
        setSelectedAnesthetist(null);
        setSelectedNurse(null);
        setDoctorList([]);
        setNurseList([]);
        setSelectedDate(null);
        setShowDateCalendar(false);
    };

    /********************************************
        HANDLE SUBMIT
    *********************************************/

    const handleSubmit = () => {

        const payload = {

            ...formData,
            surgeryRoom: selectedRoom,
            assistant: selectedAssistant,
            anesthetist: selectedAnesthetist,
            scheduledDate: selectedDate,
            doctors: doctorList,
            nurses: nurseList,
        };

        console.log(
            "Add New Surgery Payload :",
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
                    Add New Surgery
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
                                Surgical Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="surgicalName"
                                    className="customInput"
                                    placeholder="Enter Surgical Name"
                                    value={formData.surgicalName}
                                    onChange={handleChange}
                                />

                                <i className="ri-scissors-cut-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Surgical Price{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="surgicalPrice"
                                    className="customInput"
                                    placeholder="Enter Surgical Price"
                                    value={formData.surgicalPrice}
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
                                Surgical Room{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={SURGERY_ROOM_OPTIONS}
                                value={selectedRoom}
                                onChange={setSelectedRoom}
                                placeholder="Select Surgical Room"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Doctor Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={availableDoctors}
                                value={selectedDoctor}
                                onChange={handleDoctorSelect}
                                placeholder="Select Doctor"
                            />

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

                    {/* ROW 4 */}

                    <div className="formRow">

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

                        <div className="formGroup">

                            <label className="customLabel">
                                Anesthetist Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={ANESTHETIST_OPTIONS}
                                value={selectedAnesthetist}
                                onChange={setSelectedAnesthetist}
                                placeholder="Select Anesthetist"
                            />

                        </div>

                    </div>

                    {/* ROW 5 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Nurse{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={availableNurses}
                                value={selectedNurse}
                                onChange={handleNurseSelect}
                                placeholder="Select Nurse"
                            />

                            {
                                nurseList.length > 0 && (

                                    <div className="row g-2 mt-2">

                                        {
                                            nurseList.map((nurse) => (

                                                <div
                                                    key={nurse.id}
                                                    className="col-md-3"
                                                >

                                                    <div
                                                        className="d-flex align-items-center rounded px-2 py-1"
                                                        style={{ backgroundColor: "#0284C71A" }}
                                                    >

                                                        <span className="fs-14 fw-500" style={{ flexGrow: 1 }}>
                                                            {nurse.name}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            className="border-0 bg-transparent text-red p-0"
                                                            onClick={() =>
                                                                setNurseList(prev =>
                                                                    prev.filter(
                                                                        item =>
                                                                            item.id !== nurse.id
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <i className="ri-close-circle-fill fs-22"></i>
                                                        </button>

                                                    </div>

                                                </div>

                                            ))
                                        }

                                    </div>

                                )
                            }

                        </div>

                    </div>

                    {/* ROW 6 */}

                    <div className="formRow d-flex">

                        <div className="formGroup">

                            <label className="customLabel">
                                Scheduled Date{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div style={{ position: "relative" }}>

                                <div
                                    className="customInput d-flex align-items-center"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        setShowDateCalendar(
                                            !showDateCalendar
                                        )
                                    }
                                >

                                    {
                                        selectedDate
                                            ? `${String(
                                                selectedDate.getDate()
                                            ).padStart(2, "0")}/${String(
                                                selectedDate.getMonth() + 1
                                            ).padStart(2, "0")}/${selectedDate.getFullYear()}`
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
                                    showDateCalendar && (

                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                marginTop: "4px",
                                                zIndex: 1000,
                                            }}
                                        >

                                            <DateFilterCalendar
                                                selectedDate={selectedDate}
                                                onDateSelect={(date) => {

                                                    setSelectedDate(date);

                                                    setShowDateCalendar(false);

                                                }}
                                            />

                                        </div>

                                    )
                                }

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Scheduled Time{" "}
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
                                    name="scheduledTime"
                                    className="customInput customTimeInput"
                                    value={formData.scheduledTime}
                                    onChange={handleChange}
                                />

                                <i className="ri-time-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Duration (Minutes){" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="duration"
                                    className="customInput"
                                    placeholder="Enter Duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                />

                                <i className="ri-timer-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 7 */}

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

                    <div className="d-flex justify-content-between mt-4">

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                            onClick={handleSubmit}
                        >
                            Send to Accountant
                        </button>

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
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