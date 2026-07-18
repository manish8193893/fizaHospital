import { useState } from 'react';
import CustomFormDropdown from '../../GlobalHelpers/CustomFormDropdown';
import type { DropdownOption } from '../../GlobalHelpers/CustomFormDropdown';
import DateFilterCalendar from '../../GlobalHelpers/DateFilterCalendar';
import TinyEditor from '../TinyEditor';
import '../../styles/InPatients.css';
import Emergency from './Emergency';
import InPatients from './InPatients';
import AppointmentScheduler from './AppointmentScheduler';
import { Modal } from 'react-bootstrap';
import WhatsApp from '../../../public/Assets/Icons/WhatsApp.svg?react';
import "../../styles/OutPatient.css";
import CameraScan from '../../GlobalHelpers/CameraScan';

export default function OutPatients({ onPatientTypeChange }: { onPatientTypeChange?: (type: string) => void }) {
    const [visitType, setVisitType] = useState<DropdownOption | null>(null);
    const [showDobCalendar, setShowDobCalendar] = useState(false);
    const [selectedDob, setSelectedDob] = useState<Date | null>(null);
    const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [appointmentNumber, setAppointmentNumber] = useState("");

    const patientData = {
        firstName: "Manish",
        fatherName: "",
        grandFatherName: "",
        familyName: "Kumar",
        motherName: "",
        phoneNumber: "9876543210",
        nationalIdNumber: "",
        nationalIdFile: null,
        gender: null,
        dob: "",
        age: "",
        address: "",
        bloodGroup: null,
        notes: "",
        clinicName: "",
        doctorName: "",
        appointmentTime: "",
        appointmentDate: "",
    };

    const appointmentDataPreFilled = {
        clinic: "Dental Clinic",
        doctor: "Dr. Ahmed",
        appointmentDate: "25-06-2026",
        appointmentTime: "10:30 AM",
    };

    const [formData, setFormData] = useState({
        searchPatient: '',
        firstName: '',
        fatherName: '',
        grandFatherName: '',
        familyName: '',
        motherName: '',
        phoneNumber: '',
        nationalIdNumber: '',
        nationalIdFile: null as File | null,
        gender: null as DropdownOption | null,
        dob: '',
        age: '',
        address: '',
        bloodGroup: null as DropdownOption | null,
        notes: '',
        // Appointment fields
        clinicName: '',
        doctorName: '',
        appointmentTime: '',
        appointmentDate: '',
    });

    const [appointmentData, setAppointmentData] = useState({
        clinic: '',
        doctor: '',
        appointmentDate: '',
        appointmentTime: '',
    });

    const visitTypeOptions = [
        { id: 'Consultant/outpatient', name: 'Consultant/Outpatient' },
        { id: 'Emergency', name: 'Emergency' },
        { id: 'Follow-up', name: 'Follow-up' },
        { id: 'InPatient', name: 'InPatient' },
        { id: 'Scheduled', name: 'Scheduled' }
    ];

    const genderOptions = [
        { id: 'Male', name: 'Male' },
        { id: 'Female', name: 'Female' },
        { id: 'Other', name: 'Other' }
    ];

    const bloodGroupOptions = [
        { id: 'O+', name: 'O+' },
        { id: 'O-', name: 'O-' },
        { id: 'A+', name: 'A+' },
        { id: 'A-', name: 'A-' },
        { id: 'B+', name: 'B+' },
        { id: 'B-', name: 'B-' },
        { id: 'AB+', name: 'AB+' },
        { id: 'AB-', name: 'AB-' }
    ];

    const handleVisitTypeChange = (option: DropdownOption | null) => {
        setVisitType(option);
    };

    const handleBasicInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (date: Date) => {
        const selectedDate = new Date(date);
        const today = new Date();

        let years = today.getFullYear() - selectedDate.getFullYear();
        let months = today.getMonth() - selectedDate.getMonth();
        let days = today.getDate() - selectedDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        let ageDisplay = '';
        if (years > 0) {
            ageDisplay = `${years} year${years > 1 ? 's' : ''}`;
        } else if (months > 0) {
            ageDisplay = `${months} month${months > 1 ? 's' : ''}`;
        } else {
            ageDisplay = `${days} day${days > 1 ? 's' : ''}`;
        }

        setFormData(prev => ({
            ...prev,
            dob: selectedDate.toISOString().split('T')[0],
            age: ageDisplay
        }));
    };

    const handleGenderChange = (option: DropdownOption | null) => {
        setFormData(prev => ({
            ...prev,
            gender: option
        }));
    };

    const handleBloodGroupChange = (option: DropdownOption | null) => {
        setFormData(prev => ({
            ...prev,
            bloodGroup: option
        }));
    };

    const handleNationalIdSelect = (file: File) => {
        setFormData(prev => ({
            ...prev,
            nationalIdFile: file
        }));
    };

    const handleEditorChange = (content: string) => {
        setFormData(prev => ({
            ...prev,
            notes: content
        }));
    };

    const handleNext = () => {
        if (
            visitType?.id === 'Consultant/outpatient' ||
            visitType?.id === 'Follow-up'
        ) {
            setShowAppointmentScheduler(true);
        }
    };

    const handleCancel = () => {
        setVisitType(null);
        setFormData({
            searchPatient: '',
            firstName: '',
            fatherName: '',
            grandFatherName: '',
            familyName: '',
            motherName: '',
            phoneNumber: '',
            nationalIdNumber: '',
            nationalIdFile: null,
            gender: null,
            dob: '',
            age: '',
            address: '',
            bloodGroup: null,
            notes: '',
            clinicName: '',
            doctorName: '',
            appointmentTime: '',
            appointmentDate: '',
        });
    };

    // const handleAppointmentSubmit = () => {
    //     console.log('Appointment Details:', {
    //         patientData: formData,
    //         visitType: visitType
    //     });
    //     setShowAppointmentModal(false);
    // };

    // If Emergency is selected, show Emergency component
    if (visitType?.id === 'Emergency') {
        onPatientTypeChange?.('emergency');
        return <Emergency />;
    }

    // If InPatient is selected, show InPatients component
    if (visitType?.id === 'InPatient') {
        onPatientTypeChange?.('inpatient');
        return <InPatients />;
    }

    const handleContinue = () => {
        if (!appointmentNumber.trim()) return;
        setShowAppointmentModal(true);
    };


    if (showAppointmentScheduler) {
        return (
            <AppointmentScheduler
                onBack={() => setShowAppointmentScheduler(false)}
                onContinue={(appointmentData) => {

                    setAppointmentData(appointmentData);

                    setShowAppointmentScheduler(false);

                    setShowAppointmentModal(true);
                }}
            />
        );
    }

    return (
        <div>
            <div className="formContainer">
                <h5 className="fs-18 fw-500 mb-3">Basic Patient Info</h5>

                {/* Row 1: Search Patient and Visit Type */}
                <div className="formRow">
                    <div className="formGroup">
                        <label className="customLabel">Search Patient</label>
                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="searchPatient"
                                placeholder="Search by file No., Patient Name, Mobile number"
                                value={formData.searchPatient}
                                onChange={handleBasicInputChange}
                                className="customInput"
                            />
                            <i className="ri-search-line"></i>
                        </div>
                    </div>
                    <div className="formGroup">
                        <label className="customLabel">Visit Type <span className='text-danger'>*</span></label>
                        <CustomFormDropdown
                            options={visitTypeOptions}
                            value={visitType}
                            onChange={handleVisitTypeChange}
                            placeholder="Select Visit Type"
                        />
                    </div>
                </div>

                {/* Conditional Form Based on Visit Type */}
                {(visitType?.id === 'Consultant/outpatient' || visitType?.id === 'Follow-up') && (
                    <>
                        {/* Row 2: Name Fields */}
                        <div className="formRow">
                            <div className="formGroup">
                                <label className="customLabel">First Name <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter First Name"
                                        value={formData.firstName}
                                        onChange={handleBasicInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-user-line"></i>
                                </div>
                            </div>
                            <div className="formGroup">
                                <label className="customLabel">Father Name <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="fatherName"
                                        placeholder="Enter Father Name"
                                        value={formData.fatherName}
                                        onChange={handleBasicInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-user-line"></i>
                                </div>
                            </div>
                            <div className="formGroup">
                                <label className="customLabel">GrandFather Name <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="grandFatherName"
                                        placeholder="Enter GrandFather Name"
                                        value={formData.grandFatherName}
                                        onChange={handleBasicInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-user-line"></i>
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Family and Mother Name */}
                        <div className="formRow">
                            <div className="formGroup">
                                <label className="customLabel">Family Name <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="familyName"
                                        placeholder="Enter Family Name"
                                        value={formData.familyName}
                                        onChange={handleBasicInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-user-line"></i>
                                </div>
                            </div>
                            <div className="formGroup">
                                <label className="customLabel">Mother Name <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="motherName"
                                        placeholder="Enter Mother Name"
                                        value={formData.motherName}
                                        onChange={handleBasicInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-user-line"></i>
                                </div>
                            </div>
                        </div>

                        {/* Row 4: Phone Number and National ID Number */}
                        <div className="formRow">
                            <div className="formGroup">
                                <label className="customLabel">Phone Number <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder="Enter Phone Number"
                                        value={formData.phoneNumber}
                                        onChange={handleBasicInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-phone-line"></i>
                                </div>
                            </div>
                            <div className="formGroup">
                                <label className="customLabel">National ID Number <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="nationalIdNumber"
                                        placeholder="Enter National ID Number"
                                        value={formData.nationalIdNumber}
                                        onChange={handleBasicInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-id-card-line"></i>
                                </div>
                            </div>
                        </div>

                        {/* Row 5: Gender, DOB, Age */}
                        <div className="formRow">
                            <div className="formGroup">
                                <label className="customLabel">Gender <span className='text-danger'>*</span></label>
                                <CustomFormDropdown
                                    options={genderOptions}
                                    value={formData.gender}
                                    onChange={handleGenderChange}
                                    placeholder="Select Gender"
                                />
                            </div>
                            <div className="formGroup">
                                <label className="customLabel">Date of Birth <span className='text-danger'>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <div
                                        className="customInput d-flex align-items-center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setShowDobCalendar(!showDobCalendar)}
                                    >
                                        {selectedDob
                                            ? `${String(selectedDob.getDate()).padStart(2, "0")}/${String(selectedDob.getMonth() + 1).padStart(2, "0")}/${selectedDob.getFullYear()}`
                                            : 'DD/MM/YYYY'
                                        }
                                    </div>
                                    {showDobCalendar && (
                                        <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000, marginTop: '4px' }}>
                                            <DateFilterCalendar
                                                selectedDate={selectedDob}
                                                onDateSelect={(date) => {
                                                    setSelectedDob(date);
                                                    setShowDobCalendar(false);
                                                    handleDateChange(date);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="formGroup">
                                <label className="customLabel">Age <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        value={formData.age}
                                        disabled
                                        className="customInput"
                                        placeholder="Auto-calculated"
                                    />
                                    <i className="ri-calendar-line"></i>
                                </div>
                            </div>
                        </div>

                        {/* Row 6: Address, Blood Group, Upload National ID */}
                        <div className="formRow">
                            <div className="formGroup">
                                <label className="customLabel">Address <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Enter Address"
                                        value={formData.address}
                                        onChange={handleBasicInputChange}
                                        className="customInput"
                                    />
                                    <i className="ri-map-pin-line"></i>
                                </div>
                            </div>
                            <div className="formGroup">
                                <label className="customLabel">Blood Group <span className='text-danger'>*</span></label>
                                <CustomFormDropdown
                                    options={bloodGroupOptions}
                                    value={formData.bloodGroup}
                                    onChange={handleBloodGroupChange}
                                    placeholder="Select Blood Group"
                                />
                            </div>
                            <div className="formGroup">
                                <label className="customLabel">Upload National ID <span className='text-danger'>*</span></label>
                                <div className="uploadBox" onClick={() => document.getElementById('nationalIdInput')?.click()}>
                                    {formData.nationalIdFile ? (
                                        <span>{formData.nationalIdFile.name}</span>
                                    ) : (
                                        <p>Upload National ID</p>
                                    )}
                                </div>
                                <input
                                    id="nationalIdInput"
                                    type="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => e.target.files && handleNationalIdSelect(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>

                        {/* Row 7: Notes */}
                        <div className="formRow">
                            <div className="fullWidthGroup">
                                <label className="customLabel">Notes</label>
                                <TinyEditor
                                    value={formData.notes}
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">
                            <button
                                className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                                onClick={handleCancel}>
                                Cancel
                            </button>
                            <button
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}

                {visitType?.id === 'Scheduled' && (
                    <>
                        <CameraScan
                            onScanSuccess={(value) => {
                                setAppointmentNumber(value);
                                setShowAppointmentModal(true);
                            }}
                            icon="ri-qr-code-line text-blue"
                            title="Scan QR Code"
                            hideORLine={true}
                        />
                        <div className="formGroup">
                            <label className="customLabel">Appointment Number</label>

                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    className="customInput"
                                    placeholder='Enter Your Appointment Number'
                                    value={appointmentNumber}
                                    onChange={(e) => setAppointmentNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                onClick={handleContinue}
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                            >
                                Cancel
                            </button>

                        </div>

                        <AppointmentDetailsModal
                            show={showAppointmentModal}
                            handleClose={() =>
                                setShowAppointmentModal(
                                    false
                                )
                            }
                            patientData={patientData}
                            appointmentData={appointmentDataPreFilled}
                        />

                    </>
                )}
            </div>

            {showAppointmentScheduler && (

                <AppointmentScheduler

                    onBack={() =>
                        setShowAppointmentScheduler(false)
                    }

                    onContinue={(appointment) => {

                        setAppointmentData(appointment);

                        setShowAppointmentScheduler(false);

                        setShowAppointmentModal(true);
                    }}

                />

            )}

            {/* Appointment Modal */}
            {showAppointmentModal && (
                <AppointmentDetailsModal
                    show={showAppointmentModal}
                    handleClose={() => setShowAppointmentModal(false)}
                    patientData={formData}
                    appointmentData={appointmentData}
                    visitType={visitType}
                />
            )}
        </div>
    );
}

interface AppointmentDetailsModalProps {
    show: boolean;
    handleClose: () => void;

    patientData: {
        firstName: string;
        fatherName: string;
        grandFatherName: string;
        familyName: string;
        motherName: string;
        phoneNumber: string;
        nationalIdNumber: string;
        nationalIdFile: File | null;
        gender: DropdownOption | null;
        dob: string;
        age: string;
        address: string;
        bloodGroup: DropdownOption | null;
        notes: string;
        clinicName: string;
        doctorName: string;
        appointmentTime: string;
        appointmentDate: string;
    };

    appointmentData: {
        clinic: string;
        doctor: string;
        appointmentDate: string;
        appointmentTime: string;
    };
    visitType?: DropdownOption | null;
}

export function AppointmentDetailsModal({
    show,
    handleClose,
    patientData,
    appointmentData,
    visitType
}: AppointmentDetailsModalProps) {

    const [step, setStep] = useState<"details" | "confirmed">("details");

    const handleFinal = () => {
        handleClose()
    }

    const handleConfirm = () => {

        console.log("========== PATIENT ==========");

        console.log("Visit Type:", visitType?.name);

        console.log("First Name:", patientData.firstName);

        console.log("Father Name:", patientData.fatherName);

        console.log("Grand Father Name:", patientData.grandFatherName);

        console.log("Family Name:", patientData.familyName);

        console.log("Mother Name:", patientData.motherName);

        console.log("Phone Number:", patientData.phoneNumber);

        console.log("National ID Number:", patientData.nationalIdNumber);

        console.log("Gender:", patientData.gender?.name);

        console.log("Gender ID:", patientData.gender?.id);

        console.log("DOB:", patientData.dob);

        console.log("Age:", patientData.age);

        console.log("Address:", patientData.address);

        console.log("Blood Group:", patientData.bloodGroup?.name);

        console.log("Blood Group ID:", patientData.bloodGroup?.id);

        console.log("Notes:", patientData.notes);

        console.log("========== FILE ==========");

        console.log("File:", patientData.nationalIdFile);

        console.log(
            "File Name:",
            patientData.nationalIdFile?.name
        );

        console.log(
            "File Type:",
            patientData.nationalIdFile?.type
        );

        console.log(
            "File Size:",
            patientData.nationalIdFile?.size
        );

        console.log(
            "Last Modified:",
            patientData.nationalIdFile?.lastModified
        );

        console.log(
            "Relative Path:",
            patientData.nationalIdFile?.webkitRelativePath
        );

        console.log("========== APPOINTMENT ==========");

        console.log("Clinic:", appointmentData.clinic);

        console.log("Doctor:", appointmentData.doctor);

        console.log(
            "Appointment Date:",
            appointmentData.appointmentDate
        );

        console.log(
            "Appointment Time:",
            appointmentData.appointmentTime
        );

        console.log("========== COMPLETE OBJECT ==========");

        console.log({
            visitType,
            patientData,
            appointmentData
        });

        setStep("confirmed");
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
                    Appointment Details
                </Modal.Title>
            </Modal.Header>
            {step === "details" && (
                <Modal.Body>

                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">
                                Mobile Number
                            </label>

                            <div className="inputWrapper">

                                <input
                                    className="customInput"
                                    disabled
                                    value={patientData.phoneNumber}
                                />

                                <i className="ri-phone-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Patient
                            </label>

                            <div className="inputWrapper">

                                <input
                                    className="customInput"
                                    disabled
                                    value={`${patientData.firstName} ${patientData.familyName}`}
                                />

                                <i className="ri-user-line"></i>

                            </div>

                        </div>

                    </div>

                    <h5 className="fs-20 fw-400 my-3">
                        Appointment Details
                    </h5>

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Clinic
                            </label>

                            <div className="inputWrapper">

                                <input
                                    className="customInput"
                                    disabled
                                    value={appointmentData.clinic}
                                />

                                <i className="ri-hospital-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Doctor Name
                            </label>

                            <div className="inputWrapper">

                                <input
                                    className="customInput"
                                    disabled
                                    value={appointmentData.doctor}
                                />

                                <i className="ri-stethoscope-line"></i>

                            </div>

                        </div>

                    </div>

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Time
                            </label>

                            <div className="inputWrapper">

                                <input
                                    className="customInput"
                                    disabled
                                    value={appointmentData.appointmentTime}
                                />

                                <i className="ri-time-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Date
                            </label>

                            <div className="inputWrapper">

                                <input
                                    className="customInput"
                                    disabled
                                    value={appointmentData.appointmentDate}
                                />

                                <i className="ri-calendar-line"></i>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        className="aph-modal-btn-height border-0 outline-0 w-100 bg-blue text-white fs-18 fw-400 mt-4"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>

                </Modal.Body>
            )}

            {step === "confirmed" && (
                <Modal.Body className="p-0">
                    <form className="">

                        {/* CELEBRATION HEADER */}
                        <div className="my-2 text-center">
                            {/* Replace with your party popper icon path or image URL */}
                            <img src="/Assets/Icons/Congratulations.svg" alt="Congratulations" width={180} height={141} className="mb-2" />
                            <h2 className="fs-24 fw-400 text-dark mb-2">Appointment Confirmed</h2>
                            <p className="text-secondary fs-14 mb-1">Your appointment has been successfully confirmed.</p>
                            <p className="text-secondary fs-14">Please find the details below.</p>
                        </div>

                        {/* ALERT NOTE BOX */}
                        <div className="d-flex align-items-start gap-3 text-start mb-4 p-3 rounded-3" style={{ backgroundColor: "#1C6CE526" }}>
                            <i className="ri-error-warning-line text-white px-2 py-1 fs-20 rounded-3" style={{ backgroundColor: "#0477BF" }}></i>
                            <div>
                                <h5 className="my-2" style={{ color: "#0477BF" }}>Note:</h5>
                                <p className="mb-0 fs-16" style={{ color: "#0477BF" }}>
                                    Please confirm your appointment at least <span className="fw-600">24 hours in advance</span>
                                </p>
                            </div>
                        </div>

                        {/* DETAILS GRID */}
                        <div className="row justify-content-around">
                            {/* Column 1 */}
                            <div className="col-md-6" style={{ width: "fit-content" }}>
                                <div className="mb-3 d-flex gap-1">
                                    <span className="text-dark fs-14 fw-500">Appointment ID:</span>
                                    <span className="text-muted fs-14 fw-600">APT-202605-0148</span>
                                </div>

                                <div className="mb-3 d-flex gap-1">
                                    <span className="text-dark fs-14 fw-500">Patient Name:</span>
                                    <span className="text-muted fs-14 fw-600">Manish Kumar</span>
                                </div>

                                <div className="mb-3 d-flex gap-1">
                                    <span className="text-dark fs-14 fw-500">Doctor:</span>
                                    <span className="text-muted fs-14 fw-600">Dr. Shivam Saini</span>
                                </div>

                                <div className="mb-3 d-flex gap-1">
                                    <span className="text-dark fs-14 fw-500">Specialty:</span>
                                    <span className="text-muted fs-14 fw-600">General Medicine</span>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="col-md-6" style={{ width: "fit-content" }}>
                                <div className="mb-3 d-flex gap-1">
                                    <span className="text-dark fs-14 fw-500">Date:</span>
                                    <span className="text-muted fs-14 fw-600">Saturday, December 14, 2025</span>
                                </div>

                                <div className="mb-3 d-flex gap-1">
                                    <span className="text-dark fs-14 fw-500">Time:</span>
                                    <span className="text-muted fs-14 fw-600">6:30 PM</span>
                                </div>

                                <div className="mb-3 d-flex gap-1">
                                    <span className="text-dark fs-14 fw-500">Booking Method:</span>
                                    <span className="text-muted fs-14 fw-600">Website</span>
                                </div>

                                <div className="mb-3 d-flex gap-1">
                                    <span className="text-dark fs-14 fw-500">Phone Number:</span>
                                    <span className="text-muted fs-14 fw-600">8742970516</span>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between border-0 pb-0 mt-4">
                            <button
                                type="button"
                                onClick={handleFinal}
                                className="aph-modal-btn-height border-0 outline-0 col-md-4 col-sm-4 bg-blue text-white fs-18 fw-400"
                            >
                                Done
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height sendWhatsAppBtn border outline-0 col-md-4 col-sm-4 border-secondary text-secondary bg-white fs-18 fw-400"
                            >
                                Send via WhatsApp
                                <WhatsApp className="ms-2" />
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height printQRBtn border outline-0 col-md-3 col-sm-3 border-secondary text-secondary bg-white fs-18 fw-400"
                            >
                                Print QR Code
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            )}
        </Modal>
    );
}