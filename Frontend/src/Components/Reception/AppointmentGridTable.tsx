import { useEffect, useMemo, useRef, useState } from 'react';
import * as bootstrap from 'bootstrap';

import Pagination from '../../GlobalHelpers/Pagination';
import GlobalGridTable, { type ColumnActionRow } from '../../GlobalHelpers/GlobalGridTable';
import type { DropdownOption } from '../../GlobalHelpers/CustomFormDropdown';
import DateFilterCalendar from '../../GlobalHelpers/DateFilterCalendar';


/********************************************
    Name : Manish Kumar
    Date : 28/05/2026
    Purpose : Patient Data interface
*********************************************/
interface PatientTableData {
    id: string;
    name: string;
    department: string;
    phone: string;
    doctor: string;
    appointmentTime: string;
    status: "Confirmed" | "Cancelled" | "Payment Pending" | "Paid";
}

export default function AppointmentGridTable() {

    const calendarRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [showCheckInModal, setShowCheckInModal] = useState(false);

    // Filters State
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedClinic, setSelectedClinic] = useState<DropdownOption | null>(null);
    const [globalSearch, setGlobalSearch] = useState("");

    const statusOptions: DropdownOption[] = [
        {
            id: "confirmed",
            name: "Confirmed",
        },
        {
            id: "paid",
            name: "Paid",
        },
        {
            id: "cancelled",
            name: "Cancelled",
        },
        {
            id: "payment_pending",
            name: "Payment Pending",
        },
    ];

    const clinicOptions: DropdownOption[] = [
        {
            id: "internal_medicine",
            name: "Internal Medicine",
        },
        {
            id: "cardiology",
            name: "Cardiology",
        },
        {
            id: "dermatology",
            name: "Dermatology",
        },
        {
            id: "neurology",
            name: "Neurology",
        },
        {
            id: "orthopedics",
            name: "Orthopedics",
        },
        {
            id: "urology",
            name: "Urology",
        },
    ];

    // Close calendar on outside click
    useEffect(() => {
        const handleOutsideClick = (
            event: MouseEvent
        ) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(
                    event.target as Node
                )
            ) {
                setShowCalendar(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);



    // Date select handler
    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setCurrentPage(1);
        setShowCalendar(false);
    };


    /********************************************
        Name : Manish Kumar
        Date : 28/05/2026
        Purpose : Patient Dummy Data
    *********************************************/
    const ALL_PATIENT_DATA: PatientTableData[] = [
        {
            id: "15419",
            name: "Ahmed Ali",
            department: "Internal Medicine",
            phone: "97150123467",
            doctor: "Dr. Samir",
            appointmentTime: "02/01/2026 08:45 AM",
            status: "Confirmed",
        },
        {
            id: "15420",
            name: "Yousef Ali",
            department: "Ophthalmology",
            phone: "97150123468",
            doctor: "Dr. Saeed",
            appointmentTime: "14/01/2026 10:15 AM",
            status: "Paid",
        },
        {
            id: "15421",
            name: "Maryam Khalid",
            department: "Cardiology",
            phone: "97150123469",
            doctor: "Dr. Reem",
            appointmentTime: "28/02/2026 09:45 AM",
            status: "Cancelled",
        },
        {
            id: "15422",
            name: "Ali Jamal",
            department: "Obstetrics",
            phone: "97150123470",
            doctor: "Dr. Khalid",
            appointmentTime: "03/03/2026 09:00 AM",
            status: "Payment Pending",
        },
        {
            id: "15423",
            name: "Fatima Hassan",
            department: "Cardiology",
            phone: "97150123471",
            doctor: "Dr. Zaid",
            appointmentTime: "17/03/2026 11:15 AM",
            status: "Confirmed",
        },
        {
            id: "15424",
            name: "Zaid Omar",
            department: "Cardiology",
            phone: "97150123472",
            doctor: "Dr. Nour",
            appointmentTime: "08/04/2026 12:00 PM",
            status: "Paid",
        },
        {
            id: "15425",
            name: "Lina Tariq",
            department: "Orthopedics",
            phone: "97150123473",
            doctor: "Dr. Fadi",
            appointmentTime: "25/04/2026 01:30 PM",
            status: "Confirmed",
        },
        {
            id: "15426",
            name: "Hassan Badr",
            department: "Neurology",
            phone: "97150123474",
            doctor: "Dr. Huda",
            appointmentTime: "06/05/2026 02:00 PM",
            status: "Cancelled",
        },
        {
            id: "15427",
            name: "Rania Majid",
            department: "Psychiatry",
            phone: "97150123475",
            doctor: "Dr. Anas",
            appointmentTime: "19/05/2026 09:20 AM",
            status: "Payment Pending",
        },
        {
            id: "15428",
            name: "Omar Farooq",
            department: "Urology",
            phone: "97150123476",
            doctor: "Dr. Basil",
            appointmentTime: "02/06/2026 10:45 AM",
            status: "Paid",
        },
        {
            id: "15429",
            name: "Sara Mahmood",
            department: "ENT",
            phone: "97150123477",
            doctor: "Dr. Kareem",
            appointmentTime: "15/06/2026 11:10 AM",
            status: "Payment Pending",
        },
        {
            id: "15430",
            name: "Bilal Nadeem",
            department: "General Surgery",
            phone: "97150123478",
            doctor: "Dr. Adnan",
            appointmentTime: "09/07/2026 08:30 AM",
            status: "Confirmed",
        },
        {
            id: "15431",
            name: "Noor Faisal",
            department: "Radiology",
            phone: "97150123479",
            doctor: "Dr. Maha",
            appointmentTime: "21/08/2026 09:50 AM",
            status: "Paid",
        },
        {
            id: "15432",
            name: "Khalid Rahman",
            department: "Oncology",
            phone: "97150123480",
            doctor: "Dr. Yusuf",
            appointmentTime: "04/09/2026 12:15 PM",
            status: "Payment Pending",
        },
        {
            id: "15433",
            name: "Aisha Noor",
            department: "Gynecology",
            phone: "97150123481",
            doctor: "Dr. Layla",
            appointmentTime: "18/10/2026 03:00 PM",
            status: "Confirmed",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 28/05/2026
        Purpose : STATE VARIABLES  
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 28/05/2026
        Purpose : FILTERED DATA
    *********************************************/
    const filteredPatients = useMemo(() => {

        return ALL_PATIENT_DATA.filter((patient) => {

            // GLOBAL SEARC

            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                patient.id.toLowerCase().includes(searchValue) ||
                patient.name.toLowerCase().includes(searchValue) ||
                patient.department.toLowerCase().includes(searchValue) ||
                patient.phone.toLowerCase().includes(searchValue) ||
                patient.doctor.toLowerCase().includes(searchValue);

            // STATUS FILTE

            const matchesStatus =
                !selectedStatus ||
                patient.status.toLowerCase() ===
                selectedStatus.name.toLowerCase();

            // CLINIC FILTE

            const matchesClinic =
                !selectedClinic ||
                patient.department.toLowerCase() ===
                selectedClinic.name.toLowerCase();

            // DATE FILTER

            let matchesDate = true;

            if (selectedDate) {

                const patientDate = patient.appointmentTime.split(" ")[0];

                const formattedSelectedDate =
                    `${String(selectedDate.getDate()).padStart(2, "0")}/` +
                    `${String(selectedDate.getMonth() + 1).padStart(2, "0")}/` +
                    `${selectedDate.getFullYear()}`;

                matchesDate = patientDate === formattedSelectedDate;
            }

            // FINAL RETURN

            return (
                matchesSearch &&
                matchesStatus &&
                matchesClinic &&
                matchesDate
            );

        });

    }, [
        globalSearch,
        selectedStatus,
        selectedClinic,
        selectedDate,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 28/05/2026
        Purpose : PAGINATION
    *********************************************/
    const totalPages = Math.ceil(
        filteredPatients.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        return filteredPatients.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredPatients,
        currentPage,
        itemsPerPage,
    ]);

    // Initialize Bootstrap Tooltips
    useEffect(() => {
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipElements.forEach((element) => {
            new bootstrap.Tooltip(element);
        });

        return () => {
            tooltipElements.forEach((element) => {
                const tooltip = bootstrap.Tooltip.getInstance(element);
                if (tooltip) {
                    tooltip.dispose();
                }
            });
        };
    }, [visibleTableData]);

    /********************************************
        Name : Manish Kumar
        Date : 28/05/2026
        Purpose : COLUMNS ACTIONS
    *********************************************/
    const columns: ColumnActionRow<PatientTableData>[] = [
        {
            key: "id",
            header: <>ID</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) => Number(a.id) - Number(b.id),
        },

        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.name.localeCompare(b.name),
        },

        {
            key: "department",
            header: <>Department</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.department.localeCompare(b.department),
        },

        {
            key: "phone",
            header: <>Phone No.</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.phone.localeCompare(b.phone),
        },

        {
            key: "doctor",
            header: <>Doctor</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.doctor.localeCompare(b.doctor),
        },

        {
            key: "appointmentTime",
            header: <>Appointment Time</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.appointmentTime.localeCompare(b.appointmentTime),
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.status.localeCompare(b.status),

            render: (row) => {
                const statusStyles = {
                    Confirmed:
                        "status-confirmed",
                    Cancelled:
                        "status-cancelled",
                    Paid:
                        "status-paid",
                    "Payment Pending":
                        "status-pending",
                };

                return (
                    <div className="flex justify-center">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                        >
                            {row.status}
                        </span>
                    </div>
                );
            },
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "150px",
            render: (row) => (
                <div className="d-flex justify-content-center gap-2">
                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Check In"
                        onClick={() => {
                            console.log("Check In:", row.id)
                            setShowCheckInModal(true);
                        }
                        }
                    >
                        <i className="ri-calendar-check-fill fs-18"></i>
                    </button>
                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View"
                        onClick={() => console.log("View Details:", row.id)}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>
                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Print"
                        onClick={() => console.log("Print:", row.id)}
                    >
                        <i className="ri-printer-line fs-18"></i>
                    </button>
                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Cancel"
                        onClick={() => console.log("Cancel:", row.id)}
                    >
                        <i className="ri-close-circle-line fs-18"></i>
                    </button>
                </div>
            ),
        },
    ];



    /********************************************
        Name : Manish Kumar
        Date : 28/05/2026
        Purpose : RESET FILTERS
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedDate(null);
        setSelectedStatus(null);
        setSelectedClinic(null);
        setCurrentPage(1);
    };

    return (
        <>
            <div>

                {/* New Appointment Heading and Button */}
                <div className="d-flex justify-content-between align-items-center gap-4 mt-4 mb-4" style={{ maxHeight: "45px" }}>
                    <p className='fs-24 fw-700'>Appointment List</p>
                    <div className="Plus-btn" onClick={() => setShowAppointmentModal(true)}>
                        <div className='text-white fs-16 fw-400'>New</div>
                        <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={24} height={24} />
                    </div>
                </div>

                {/* Appointment Model */}
                <AppointmentModal
                    show={showAppointmentModal}
                    handleClose={() => setShowAppointmentModal(false)}
                />
                {/* Check-In Modal */}
                <CheckInModal
                    show={showCheckInModal}
                    handleClose={() => setShowCheckInModal(false)}
                />

                {/* FILTER ROW */}
                <div className="aph-modal-filter-row mb-4">

                    {/* Global Search */}
                    <div className="aph-filter-search">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="aph-search-input"
                            value={globalSearch}
                            onChange={(e) => {
                                setGlobalSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                        <button className="aph-search-btn outline-0">
                            <i className="ri-search-line outline-0 border-0"></i>
                        </button>
                    </div>

                    {/* QR Code Button */}
                    <button className="aph-filter-btn outline-0">
                        <i className="ri-qr-code-line"></i>
                    </button>

                    {/* Date Filter */}
                    <div
                        className="aph-calendar-filter"
                        ref={calendarRef}
                    >
                        <button
                            className="aph-filter-btn outline-0"
                            onClick={() =>
                                setShowCalendar(!showCalendar)
                            }
                        >
                            <i className="ri-calendar-line"></i>

                            <span>
                                {selectedDate
                                    ? `${String(
                                        selectedDate.getDate()
                                    ).padStart(2, "0")}/${String(
                                        selectedDate.getMonth() + 1
                                    ).padStart(2, "0")}/${selectedDate.getFullYear()}`
                                    : "Date"}
                            </span>
                        </button>

                        {showCalendar && (
                            <div className="aph-calendar-popup">
                                <DateFilterCalendar
                                    selectedDate={selectedDate}
                                    onDateSelect={handleDateSelect}
                                />
                            </div>
                        )}
                    </div>

                    {/* Status Filter */}
                    <div>
                        <CustomFilterDropdown
                            options={statusOptions}
                            value={selectedStatus}
                            placeholder="Select Status"
                            customClass="aph-filter-dropdown"
                            onChange={(selected) => {
                                setSelectedStatus(selected);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    {/* Clinic Filter */}
                    <div>
                        <CustomFilterDropdown
                            options={clinicOptions}
                            value={selectedClinic}
                            placeholder="Select Clinic"
                            customClass="aph-filter-dropdown"
                            onChange={(selected) => {
                                setSelectedClinic(selected);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <button
                        className="aph-filter-btn outline-0"
                        onClick={handleResetFilters}
                    >
                        <i className="ri-filter-off-line"></i>
                    </button>

                </div>

                {/* Grid Table */}
                <div className="d-flex flex-column">

                    <GlobalGridTable
                        data={visibleTableData}
                        columns={columns}
                        currentPage={currentPage}
                        pageSize={itemsPerPage}
                    />

                    <div>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={(page) =>
                                setCurrentPage(page)
                            }
                            rowsPerPage={itemsPerPage}
                            onRowsPerPageChange={(rows) => {
                                setItemsPerPage(rows);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}



// AppointmentModal.tsx
import { Modal } from "react-bootstrap";
import CustomFormDropdown from '../../GlobalHelpers/CustomFormDropdown';
import DoctorAvailability from './DoctorAvailability';
// import DateFilterCalendar from '../../GlobalHelpers/DateFilterCalendar';
import CustomFilterDropdown from '../../GlobalHelpers/CustomFilterDropdown';

interface AppointmentModalProps {
    show: boolean;
    handleClose: () => void;
}

export function AppointmentModal({
    show,
    handleClose,
}: AppointmentModalProps) {

    // 1. Define the structural source options using your DropdownOption schema
    const APPOINTMENT_SOURCES: DropdownOption[] = [
        { id: "source-web", name: "Website" },
        { id: "source-ref", name: "Referral" },
        { id: "source-phone", name: "Phone Call" },
        { id: "source-walkin", name: "Walk-In" }
    ];

    // Example hardcoded mock data using UUID strings
    const CLINICS_DATA: DropdownOption[] = [
        { id: "4a2b6c8d-1234-5678-90ab-cdef12345678", name: "Cardiology" },
        { id: "7e8f9a0b-5678-1234-90ab-cdef87654321", name: "Dermatology" },
        { id: "1c2d3e4f-90ab-5678-1234-cdef98765432", name: "Pediatrics" },
    ];

    const DOCTORS_DATA = [
        { id: "doc-101", name: "Dr. Alice Smith", additionalVal1: "4a2b6c8d-1234-5678-90ab-cdef12345678" }, // Cardiology
        { id: "doc-102", name: "Dr. Bob Jones", additionalVal1: "4a2b6c8d-1234-5678-90ab-cdef12345678" },  // Cardiology
        { id: "doc-201", name: "Dr. Clara Oswald", additionalVal1: "7e8f9a0b-5678-1234-90ab-cdef87654321" },// Dermatology
        { id: "doc-301", name: "Dr. David Tennant", additionalVal1: "1c2d3e4f-90ab-5678-1234-cdef98765432" },// Pediatrics
    ];

    // 1. Form State declarations
    const [selectedClinic, setSelectedClinic] = useState<DropdownOption | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<DropdownOption | null>(null);
    const [filteredDoctors, setFilteredDoctors] = useState<DropdownOption[]>([]);
    const [selectedSource, setSelectedSource] = useState<DropdownOption | null>(null);

    // 2. Filter Doctors whenever the selected clinic changes
    useEffect(() => {
        // Reset doctor selection if the clinic changes
        setSelectedDoctor(null);

        if (selectedClinic) {
            // Filter doctors whose clinic ID matches the selected clinic's ID
            const matches = DOCTORS_DATA.filter(
                (doctor) => doctor.additionalVal1 === selectedClinic.id
            );
            setFilteredDoctors(matches);
        } else {
            // Clear list if no clinic is selected
            setFilteredDoctors([]);
        }
    }, [selectedClinic]);

    // STEP STATE
    const [currentStep, setCurrentStep] = useState(1);

    // NEXT STEP
    const handleNextStep = () => {
        if (currentStep < 5) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    // BACK STEP
    const handleBackStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    // CANCEL MODAL
    const handleCancel = () => {
        setCurrentStep(1); // reset step
        handleClose(); // close modal
    };

    // DONE BUTTON (same as next)
    const handleDone = () => {
        handleNextStep();
    };

    // CONFIRM BUTTON (same as next)
    const handleConfirm = () => {
        handleNextStep();
    };

    const handleFinal = () => {
        handleClose();
        setCurrentStep(1);
    }

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
            <Modal.Header className='aph-modal-header mb-3'>
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
                    New Appointment
                </Modal.Title>
            </Modal.Header>

            {currentStep === 1 && (
                <>
                    <Modal.Body className='p-0'>
                        <form>
                            {/* ROW 1 */}
                            <div className="formRow">
                                {/* Patient First Name */}
                                <div className="formGroup">
                                    <label className="customLabel">Patient First Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Enter first name"
                                        />
                                        <i className="ri-user-3-line"></i>
                                    </div>
                                </div>

                                {/* Patient Last Name */}
                                <div className="formGroup">
                                    <label className="customLabel">Patient Last Name <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Enter last name"
                                        />
                                        <i className="ri-user-3-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 2 */}
                            <div className="formRow">
                                {/* Clinic */}
                                <div className="formGroup">
                                    <label className="customLabel">Department <span className='text-danger'>*</span></label>
                                    <CustomFormDropdown
                                        options={CLINICS_DATA}
                                        value={selectedClinic}
                                        onChange={(value) => setSelectedClinic(value)}
                                        placeholder="Select Department"
                                        required={true}
                                    />
                                </div>

                                {/* Doctor Name */}
                                <div className="formGroup">
                                    <label className="customLabel">Doctor Name <span className='text-danger'>*</span></label>
                                    <CustomFormDropdown
                                        options={filteredDoctors}
                                        value={selectedDoctor}
                                        onChange={(value) => setSelectedDoctor(value)}
                                        placeholder={selectedClinic ? "Select Doctor" : "Please select a clinic first"}
                                        disabled={!selectedClinic}
                                        required={true}
                                    />
                                </div>
                            </div>

                            {/* ROW 3 */}
                            <div className="formRow">
                                {/* Appointment By */}
                                <div className="formGroup">
                                    <label className="customLabel">Appointment By <span className='text-danger'>*</span></label>
                                    <CustomFormDropdown
                                        options={APPOINTMENT_SOURCES}
                                        value={selectedSource}
                                        onChange={(value) => setSelectedSource(value)}
                                        placeholder="Select Appointment Type"
                                        required={true}
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="formGroup">
                                    <label className="customLabel">Phone Number <span className='text-danger'>*</span></label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Enter phone number"
                                        />
                                        <i className="ri-phone-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* BUTTON */}
                            <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                >
                                    Next
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                >
                                    Cancel
                                </button>

                            </div>
                        </form>
                    </Modal.Body>
                </>
            )}

            {currentStep === 2 && (
                <>
                    <Modal.Body className='p-0'>
                        <form>
                            {/* ROW 1 */}
                            <div className="row">
                                {/* Patient First Name */}
                                <div className="col-md-6 mb-3">
                                    <label className="customLabel">
                                        Patient First Name
                                    </label>

                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            value="Manish"
                                            disabled
                                        />

                                        <i className="ri-user-3-line"></i>
                                    </div>
                                </div>

                                {/* Patient Last Name */}
                                <div className="col-md-6 mb-3">
                                    <label className="customLabel">
                                        Patient Last Name
                                    </label>

                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            value="Mehra"
                                            disabled
                                        />

                                        <i className="ri-user-3-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 2 */}
                            <div className="row">

                                {/* Clinic */}
                                <div className="col-md-6 mb-3">
                                    <label className="customLabel">
                                        Department
                                    </label>

                                    <CustomFormDropdown
                                        options={CLINICS_DATA}
                                        value={CLINICS_DATA[1]}
                                        placeholder="Select Department"
                                        disabled={true}
                                    />
                                </div>

                                {/* Doctor Name */}
                                <div className="col-md-6 mb-3">
                                    <label className="customLabel">
                                        Doctor Name
                                    </label>

                                    <CustomFormDropdown
                                        options={filteredDoctors}
                                        value={selectedDoctor}
                                        placeholder="Select Doctor"
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            {/* ROW 3 */}
                            <div className="row">

                                {/* Appointment By */}
                                <div className="col-md-6 mb-3">
                                    <label className="customLabel">
                                        Appointment By
                                    </label>

                                    <CustomFormDropdown
                                        options={APPOINTMENT_SOURCES}
                                        value={APPOINTMENT_SOURCES[0]}
                                        placeholder="Select Appointment Type"
                                        disabled={true}
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="col-md-6 mb-3">
                                    <label className="customLabel">
                                        Phone Number
                                    </label>

                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            value="8765432135"
                                            disabled
                                        />

                                        <i className="ri-phone-line"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <p className="fw-500 fs-18 ps-1 mb-2">Doctor Availability <span className='text-danger'>*</span></p>
                                <DoctorAvailability
                                    minDate={new Date()}
                                />
                            </div>

                            {/* BUTTON */}
                            <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                                <button
                                    type="button"
                                    onClick={handleDone}
                                    className="aph-modal-btn-height border-0 outline-0 col-md-7 col-sm-7 bg-blue text-white fs-18 fw-400"
                                >
                                    Done
                                </button>

                                <button
                                    type="button"
                                    onClick={handleBackStep}
                                    className="aph-modal-btn-height border outline-0 col-md-4 col-sm-4 border-secondary text-secondary bg-white fs-18 fw-400"
                                >
                                    Back
                                </button>

                            </div>
                        </form>
                    </Modal.Body>
                </>
            )}

            {currentStep === 3 && (
                <>
                    <Modal.Body className="p-0">
                        <form className="appointment-details-container">
                            {/* TITLE */}
                            <div className="text-center mb-4">
                                <h2 className="fs-20 fw-500 text-dark">Appointment Details</h2>
                            </div>

                            {/* DETAILS GRID */}
                            <div className="row justify-content-evenly">
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

                            <div className="d-flex justify-content-between border-0 pb-0 mt-5">
                                <button
                                    type="button"
                                    onClick={handleConfirm}
                                    className="aph-modal-btn-height border-0 outline-0 col-md-7 col-sm-7 bg-blue text-white fs-18 fw-400"
                                >
                                    Confirm
                                </button>

                                <button
                                    type="button"
                                    onClick={handleBackStep}
                                    className="aph-modal-btn-height border outline-0 col-md-4 col-sm-4 border-secondary text-secondary bg-white fs-18 fw-400"
                                >
                                    Back
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </>
            )}

            {currentStep === 4 && (
                <>
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
                                    <img src="/Assets/Icons/WhatsApp.svg" alt="WhatsApp" className="ms-2" />
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
                </>
            )}
        </Modal>
    );
}

// CheckInModal 
interface CheckInModalProps {
    show: boolean;
    handleClose: () => void;
}

function CheckInModal({
    show,
    handleClose,
}: CheckInModalProps) {

    const [nationalId, setNationalId] = useState<string>("");
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedDob, setSelectedDob] = useState<Date | null>(null);
    const [showDobCalendar, setShowDobCalendar] = useState(false);
    const [selectedDoctor] = useState<DropdownOption | null>(null);
    const [selectedDepartment] = useState<DropdownOption | null>(null);
    const [selectedAppointmentBy] = useState<DropdownOption | null>(null);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState<DropdownOption | null>(null);

    // Mock data options
    const DOCTOR_OPTIONS: DropdownOption[] = [
        { id: "doc-101", name: "Dr. Ahmed Ali" },
        { id: "doc-102", name: "Dr. Samir Hassan" },
        { id: "doc-103", name: "Dr. Reem Khalid" },
        { id: "doc-104", name: "Dr. Zaid Omar" },
    ];

    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "dept-01", name: "Internal Medicine" },
        { id: "dept-02", name: "Cardiology" },
        { id: "dept-03", name: "Dermatology" },
        { id: "dept-04", name: "Pediatrics" },
    ];

    const APPOINTMENT_BY_OPTIONS: DropdownOption[] = [
        { id: "source-web", name: "Website" },
        { id: "source-phone", name: "Phone Call" },
        { id: "source-ref", name: "Referral" },
        { id: "source-walkin", name: "Walk-In" },
    ];

    const BLOOD_GROUP_OPTIONS = [
        { id: "A+", name: "A+" },
        { id: "A-", name: "A-" },
        { id: "B+", name: "B+" },
        { id: "B-", name: "B-" },
        { id: "AB+", name: "AB+" },
        { id: "AB-", name: "AB-" },
        { id: "O+", name: "O+" },
        { id: "O-", name: "O-" },
    ];

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
            <Modal.Header className='aph-modal-header mb-3'>
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
                    Check In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='p-0'>
                <form>
                    {/* ROW 1 */}
                    <div className="formRow">
                        {/* Patient Name (disabled) */}
                        <div className="formGroup">
                            <label className="customLabel">Patient Name</label>
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    className="customInput"
                                    value={"Manish Mehra"}
                                    disabled
                                />
                                <i className="ri-user-3-line"></i>
                            </div>
                        </div>

                        {/* Mobile Number (disabled) */}
                        <div className="formGroup">
                            <label className="customLabel">Mobile Number</label>
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    className="customInput"
                                    value={"8742970516"}
                                    disabled
                                />
                                <i className="ri-phone-line"></i>
                            </div>
                        </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="formRow">
                        {/* Date of Birth */}
                        <div className="formGroup">
                            <label className="customLabel">Date of Birth <span className='text-danger'>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <div
                                    className="customInput d-flex align-items-center"
                                    // style={{ cursor: 'pointer', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
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
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Blood Group */}
                        <div className="formGroup">
                            <label className="customLabel">Blood Group <span className='text-danger'>*</span></label>
                            <CustomFormDropdown
                                options={BLOOD_GROUP_OPTIONS}
                                value={selectedBloodGroup}
                                onChange={(value) => setSelectedBloodGroup(value)}
                                placeholder="Blood Group"
                            />
                        </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="formRow">
                        {/* National ID Number */}
                        <div className="formGroup">
                            <label className="customLabel">National ID Number <span className='text-danger'>*</span></label>
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    className="customInput"
                                    placeholder="Enter National ID Number"
                                    value={nationalId}
                                    onChange={(e) => setNationalId(e.target.value)}
                                />
                                <i className="ri-id-card-line"></i>
                            </div>
                        </div>
                    </div>

                    {/* ROW 3 - IMAGE UPLOAD (YOUR STYLE) */}
                    <div className="formRow">
                        <div className="formGroup w-100">
                            <label className="customLabel">Upload National ID <span className='text-danger'>*</span></label>

                            <input
                                type="file"
                                id="nationalIdUpload"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (file) {
                                        const imageUrl = URL.createObjectURL(file);
                                        setPreviewImage(imageUrl);
                                    }
                                }}
                            />

                            <div
                                className={`uploadBox`}
                                style={{ width: "100%", height: "150px" }}
                                onClick={() => {
                                    document.getElementById("nationalIdUpload")?.click();
                                }}
                            >
                                {previewImage ? (
                                    <div className={`previewWrapper d-flex justify-content-center align-items-center`}>

                                        <img
                                            src={previewImage}
                                            alt="National ID"
                                            className={`previewImage rounded-2`}
                                        />

                                        <button
                                            className={`removeImageBtnCheckIn d-flex justify-content-center align-items-center`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewImage(null);
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <i className="ri-upload-cloud-2-line mb-0"></i>
                                        <p className="mb-0">Upload National ID</p>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* ROW 4 */}
                    <div className="formRow">
                        {/* Doctor Name (disabled dropdown) */}
                        <div className="formGroup">
                            <label className="customLabel">Doctor Name</label>
                            <CustomFormDropdown
                                options={DOCTOR_OPTIONS}
                                value={selectedDoctor || DOCTOR_OPTIONS[0]}
                                onChange={() => { }}
                                placeholder="Doctor Name"
                                disabled={true}
                            />
                        </div>

                        {/* Department Name (disabled dropdown) */}
                        <div className="formGroup">
                            <label className="customLabel">Department Name</label>
                            <CustomFormDropdown
                                options={DEPARTMENT_OPTIONS}
                                value={selectedDepartment || DEPARTMENT_OPTIONS[0]}
                                onChange={() => { }}
                                placeholder="Department Name"
                                disabled={true}
                            />
                        </div>
                    </div>

                    {/* ROW 5 */}
                    <div className="formRow">
                        {/* Appointment By (disabled dropdown) */}
                        <div className="formGroup">
                            <label className="customLabel">Appointment By</label>
                            <CustomFormDropdown
                                options={APPOINTMENT_BY_OPTIONS}
                                value={selectedAppointmentBy || APPOINTMENT_BY_OPTIONS[0]}
                                onChange={() => { }}
                                placeholder="Appointment By"
                                disabled={true}
                            />
                        </div>

                        {/* Estimated Wait Time */}
                        <div className="formGroup">
                            <label className="customLabel">Estimated Wait Time</label>
                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    className="customInput"
                                    value="30m"
                                    disabled
                                />
                                <i className="ri-time-line"></i>
                            </div>
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                        <button
                            type="button"
                            onClick={handleClose}
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                        >
                            Send to Accounting
                        </button>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                        >
                            Cancel
                        </button>

                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}