import { useEffect, useMemo, useRef, useState, } from "react";
import * as bootstrap from "bootstrap";

import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";

import Stethoscope from "../../../../public/Assets/Icons/Stethoscope.svg?react";

import GreenHeartPulse from "../../../../public/Assets/Icons/GreenHeartPulse.svg?react";
import OrangeJarOfPills from "../../../../public/Assets/Icons/OrangeJarOfPills.svg?react";
import BluePenNewSquare from "../../../../public/Assets/Icons/BluePenNewSquare.svg?react";

import { AddReportModal } from "./AddReportModal";
import LogUsedItemModal from "./LogUsedItemModal";
import AddNewDoctorModal from "./AddNewDoctorModal";
import AddNewSurgeryModal from "./AddNewSurgeryModal";
import NewRequestModal from "./NewRequestModal";
import Pagination from "../../../GlobalHelpers/Pagination";

import "../../../styles/SurgicalScheduled.css";

/********************************************
    Name : Manish Kumar
    Date : 27/06/2026
    Purpose : Scheduled Surgery Interface
*********************************************/
export interface ScheduledData {
    id: string;
    fileNo: string;
    patientName: string;
    surgeryName: string;
    surgeryDate: string;
    surgeryTime: string;
    department: string;
    lengthOfStay: number;
    numberOfOperationDone: number;
    doctorName: string[];
    isAddNewDoctor: boolean;
    isStartOperation: boolean;
    isEndOperation: boolean;
    isCancelOperation: boolean;
    isAddLogUsedItems: boolean;
    isAddNewSurgery: boolean;
    isAddReport: boolean;
    operationStatus:
    | "Waiting"
    | "In Progress"
    | "Completed"
    | "Cancelled";
    bedNumber: string;
    roomNumber: string;
}

export default function Scheduled() {

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Filter States
    *********************************************/
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<DropdownOption | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDateCalendar, setShowDateCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement | null>(null);

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : Modals States
    *********************************************/
    const [showReportModal, setShowReportModal] = useState(false);
    const [showLogUsedItemModal, setShowLogUsedItemModal] = useState(false);
    const [showAddNewDoctorModal, setShowAddNewDoctorModal] = useState(false);
    const [showAddNewSurgeryModal, setShowAddNewSurgeryModal] = useState(false);
    const [showNewRequestModal, setShowNewRequestModal] = useState(false);

    /********************************************
        Name    : Manish Kumar
        Date    : 27/06/2026
        Purpose : Expanded Card
    *********************************************/
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Department Options
    *********************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "cardiology", name: "Cardiology", },
        { id: "orthopedics", name: "Orthopedics", },
        { id: "neurology", name: "Neurology", },
        { id: "general", name: "General Surgery", },
        { id: "urology", name: "Urology", },
        { id: "ent", name: "ENT", },
        { id: "gynecology", name: "Gynecology", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Doctor Options
    *********************************************/
    const DOCTOR_OPTIONS: DropdownOption[] = [
        { id: "doctor1", name: "Dr. Amit Sharma", },
        { id: "doctor2", name: "Dr. Neha Kapoor", },
        { id: "doctor3", name: "Dr. Ravi Kumar", },
        { id: "doctor4", name: "Dr. Pooja Verma", },
        { id: "doctor5", name: "Dr. Vivek Singh", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Status Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        { id: "waiting", name: "Waiting", },
        { id: "progress", name: "In Progress", },
        { id: "completed", name: "Completed", },
        { id: "cancelled", name: "Cancelled", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Dummy Scheduled Surgery Data
    *********************************************/
    const ALL_SCHEDULED_DATA: ScheduledData[] = [

        {
            id: "SCH001",
            fileNo: "FIL001",
            patientName: "Manish Kashyap",
            surgeryName: "Appendectomy",
            surgeryDate: "27/06/2026",
            surgeryTime: "09:00 AM",
            department: "General Surgery",
            lengthOfStay: 3,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Amit Sharma",
            ],
            isAddNewDoctor: true,
            isStartOperation: true,
            isEndOperation: false,
            isCancelOperation: true,
            isAddLogUsedItems: false,
            isAddNewSurgery: false,
            isAddReport: false,
            operationStatus: "Waiting",
            bedNumber: "13",
            roomNumber: "2",
        },

        {
            id: "SCH002",
            fileNo: "FIL002",
            patientName: "Rahul Sharma",
            surgeryName: "Heart Bypass",
            surgeryDate: "27/06/2026",
            surgeryTime: "10:30 AM",
            department: "Cardiology",
            lengthOfStay: 8,
            numberOfOperationDone: 2,
            doctorName: [
                "Dr. Neha Kapoor",
                "Dr. Ravi Kumar",
            ],
            isAddNewDoctor: true,
            isStartOperation: false,
            isEndOperation: true,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: true,
            isAddReport: false,
            operationStatus: "In Progress",
            bedNumber: "15",
            roomNumber: "3",
        },

        {
            id: "SCH003",
            fileNo: "FIL003",
            patientName: "Priya Verma",
            surgeryName: "Gallbladder Removal",
            surgeryDate: "27/06/2026",
            surgeryTime: "11:15 AM",
            department: "General Surgery",
            lengthOfStay: 4,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Vivek Singh",
            ],
            isAddNewDoctor: false,
            isStartOperation: false,
            isEndOperation: false,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: false,
            isAddReport: true,
            operationStatus: "Completed",
            bedNumber: "11",
            roomNumber: "1",
        },

        {
            id: "SCH004",
            fileNo: "FIL004",
            patientName: "Ankit Verma",
            surgeryName: "Hip Replacement",
            surgeryDate: "28/06/2026",
            surgeryTime: "08:00 AM",
            department: "Orthopedics",
            lengthOfStay: 6,
            numberOfOperationDone: 2,
            doctorName: [
                "Dr. Amit Sharma",
                "Dr. Pooja Verma",
            ],
            isAddNewDoctor: true,
            isStartOperation: false,
            isEndOperation: true,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: true,
            isAddReport: false,
            operationStatus: "In Progress",
            bedNumber: "9",
            roomNumber: "4",
        },

        {
            id: "SCH005",
            fileNo: "FIL005",
            patientName: "Riya Sharma",
            surgeryName: "Knee Replacement",
            surgeryDate: "28/06/2026",
            surgeryTime: "12:00 PM",
            department: "Orthopedics",
            lengthOfStay: 5,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Ravi Kumar",
            ],
            isAddNewDoctor: true,
            isStartOperation: true,
            isEndOperation: false,
            isCancelOperation: true,
            isAddLogUsedItems: false,
            isAddNewSurgery: false,
            isAddReport: false,
            operationStatus: "Waiting",
            bedNumber: "18",
            roomNumber: "5",
        },

        {
            id: "SCH006",
            fileNo: "FIL006",
            patientName: "Neha Gupta",
            surgeryName: "Brain Tumor Surgery",
            surgeryDate: "28/06/2026",
            surgeryTime: "02:30 PM",
            department: "Neurology",
            lengthOfStay: 10,
            numberOfOperationDone: 3,
            doctorName: [
                "Dr. Neha Kapoor",
                "Dr. Amit Sharma",
            ],
            isAddNewDoctor: false,
            isStartOperation: false,
            isEndOperation: false,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: false,
            isAddReport: true,
            operationStatus: "Completed",
            bedNumber: "20",
            roomNumber: "6",
        },

        {
            id: "SCH007",
            fileNo: "FIL007",
            patientName: "Karan Mehta",
            surgeryName: "Kidney Stone Removal",
            surgeryDate: "29/06/2026",
            surgeryTime: "09:45 AM",
            department: "Urology",
            lengthOfStay: 2,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Vivek Singh",
            ],
            isAddNewDoctor: true,
            isStartOperation: true,
            isEndOperation: false,
            isCancelOperation: true,
            isAddLogUsedItems: false,
            isAddNewSurgery: false,
            isAddReport: false,
            operationStatus: "Waiting",
            bedNumber: "7",
            roomNumber: "2",
        },

        {
            id: "SCH008",
            fileNo: "FIL008",
            patientName: "Aman Singh",
            surgeryName: "Spinal Fusion",
            surgeryDate: "29/06/2026",
            surgeryTime: "11:00 AM",
            department: "Neurology",
            lengthOfStay: 9,
            numberOfOperationDone: 2,
            doctorName: [
                "Dr. Ravi Kumar",
                "Dr. Pooja Verma",
            ],
            isAddNewDoctor: true,
            isStartOperation: false,
            isEndOperation: true,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: true,
            isAddReport: false,
            operationStatus: "In Progress",
            bedNumber: "14",
            roomNumber: "7",
        },

        {
            id: "SCH009",
            fileNo: "FIL009",
            patientName: "Rohit Sharma",
            surgeryName: "ENT Microsurgery",
            surgeryDate: "30/06/2026",
            surgeryTime: "08:30 AM",
            department: "ENT",
            lengthOfStay: 1,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Amit Sharma",
            ],
            isAddNewDoctor: false,
            isStartOperation: false,
            isEndOperation: false,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: false,
            isAddReport: true,
            operationStatus: "Completed",
            bedNumber: "4",
            roomNumber: "1",
        },

        {
            id: "SCH010",
            fileNo: "FIL010",
            patientName: "Pooja Singh",
            surgeryName: "C-Section",
            surgeryDate: "30/06/2026",
            surgeryTime: "01:30 PM",
            department: "Gynecology",
            lengthOfStay: 4,
            numberOfOperationDone: 2,
            doctorName: [
                "Dr. Neha Kapoor",
            ],
            isAddNewDoctor: true,
            isStartOperation: false,
            isEndOperation: true,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: true,
            isAddReport: false,
            operationStatus: "In Progress",
            bedNumber: "22",
            roomNumber: "8",
        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Close Calendar On Outside Click
    *********************************************/
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowDateCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedDepartment(null);
        setSelectedDoctor(null);
        setSelectedStatus(null);
        setSelectedDate(null);
        setCurrentPage(1);
    };

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    /********************************************
        Name    : Manish Kumar
        Date    : 27/06/2026
        Purpose : Filtered Scheduled Data
    *********************************************/
    const filteredScheduledData = useMemo(() => {
        return ALL_SCHEDULED_DATA.filter((item) => {
            const search = globalSearch.toLowerCase();

            const matchesSearch =
                item.fileNo.toLowerCase().includes(search) ||
                item.patientName.toLowerCase().includes(search) ||
                item.surgeryName.toLowerCase().includes(search) ||
                item.department.toLowerCase().includes(search) ||
                item.doctorName.join(" ").toLowerCase().includes(search);

            const matchesDepartment =
                !selectedDepartment ||
                item.department.toLowerCase() === selectedDepartment.name.toLowerCase();

            const matchesDoctor =
                !selectedDoctor ||
                item.doctorName.some(
                    (doctor) => doctor.toLowerCase() === selectedDoctor.name.toLowerCase()
                );

            const matchesStatus =
                !selectedStatus ||
                item.operationStatus.toLowerCase() === selectedStatus.name.toLowerCase();

            const formattedDate = selectedDate
                ? `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0")}/${selectedDate.getFullYear()}`
                : "";

            const matchesDate = !selectedDate || item.surgeryDate === formattedDate;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesDoctor &&
                matchesStatus &&
                matchesDate
            );
        });
    }, [
        globalSearch,
        selectedDepartment,
        selectedDoctor,
        selectedStatus,
        selectedDate,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Visible Cards
    *********************************************/
    const visibleCards = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredScheduledData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredScheduledData, currentPage, itemsPerPage]);

    /********************************************
        Name    : Manish Kumar
        Date    : 27/06/2026
        Purpose : Total Pages
    *********************************************/
    const totalPages = Math.ceil(filteredScheduledData.length / itemsPerPage);

    /********************************************
        Name    : Manish Kumar
        Date    : 27/06/2026
        Purpose : Initialize Bootstrap Tooltips
    *********************************************/
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
    }, [visibleCards]);

    return (
        <>

            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-3 my-4">

                <p className="fs-18 fw-500">Scheduled Surgries</p>

                <div className="Plus-btn" onClick={() => setShowNewRequestModal(true)}>
                    <div className="text-white fs-14 fw-400">New Request</div>
                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                </div>

            </div>

            {/* Filter Row */}
            <div className="aph-modal-filter-row mb-4">
                {/* Search */}
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
                        <i className="ri-search-line"></i>
                    </button>
                </div>

                {/* Date */}
                <div className="aph-calendar-filter" ref={calendarRef}>
                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() => setShowDateCalendar(!showDateCalendar)}
                    >
                        <i className="ri-calendar-line"></i>
                        <span>
                            {selectedDate
                                ? `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
                                    selectedDate.getMonth() + 1
                                ).padStart(2, "0")}/${selectedDate.getFullYear()}`
                                : "Date"}
                        </span>
                    </button>

                    {showDateCalendar && (
                        <div className="aph-calendar-popup">
                            <DateFilterCalendar
                                selectedDate={selectedDate}
                                onDateSelect={(date) => {
                                    setSelectedDate(date);
                                    setShowDateCalendar(false);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Department */}
                <div>
                    <CustomFilterDropdown
                        options={DEPARTMENT_OPTIONS}
                        value={selectedDepartment}
                        placeholder="Department"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedDepartment(selected);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Doctor */}
                <div>
                    <CustomFilterDropdown
                        options={DOCTOR_OPTIONS}
                        value={selectedDoctor}
                        placeholder="Doctor"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedDoctor(selected);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Status */}
                <div>
                    <CustomFilterDropdown
                        options={STATUS_OPTIONS}
                        value={selectedStatus}
                        placeholder="Status"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedStatus(selected);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Reset */}
                <button className="aph-filter-btn outline-0" onClick={handleResetFilters}>
                    <i className="ri-filter-off-line"></i>
                </button>
            </div>

            {/* Cards */}

            <div className="container-fluid px-0">
                <div className="row g-4">
                    {visibleCards.map((card) => {
                        const isOpen = expandedCard === card.id;

                        return (
                            <div key={card.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <div className="scheduled-card bg-white rounded-3 p-3 h-100">

                                    {/* Card Header */}
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="fs-16 fw-500 mb-0">{card.surgeryName}</h5>
                                        <span
                                            className={`scheduled-status mb-0 ${card.operationStatus === "Completed"
                                                ? "scheduled-status-completed"
                                                : card.operationStatus === "Waiting"
                                                    ? "scheduled-status-waiting"
                                                    : card.operationStatus === "In Progress"
                                                        ? "scheduled-status-progress"
                                                        : "scheduled-status-cancelled"
                                                }`}
                                        >
                                            {card.operationStatus}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="">
                                            <div className="fs-14 text-muted fw-600"><i className="ri-calendar-line fs-16 fw-500 me-1" style={{ color: "#A78CEA" }}></i>{card.surgeryDate}</div>
                                            <div className="fs-14 text-muted fw-600"><i className="ri-time-line fs-16 fw-500 me-1" style={{ color: "#A78CEA" }}></i>{card.surgeryTime}</div>
                                        </div>

                                        <div className="scheduled-card-menu">
                                            <button
                                                className="Check-In"
                                                onClick={() => setExpandedCard(isOpen ? null : card.id)}
                                            >
                                                <i className="ri-menu-line fs-18 fw-600"></i>
                                            </button>

                                            <div className={`scheduled-menu-icons ${isOpen ? "show" : ""}`}>
                                                <button
                                                    className="eye"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-title="View Details"
                                                >
                                                    <i className="ri-eye-line fs-18"></i>
                                                </button>

                                                <button
                                                    className="edit"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-title="Edit"
                                                >
                                                    <i className="ri-pencil-ai-line fs-18"></i>
                                                </button>

                                                <button
                                                    className="delete"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-title="Delete"
                                                >
                                                    <i className="ri-delete-bin-7-line fs-18"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Patient */}
                                    <h4 className="fs-16 fw-600 mb-3">{card.patientName}</h4>

                                    {/* Info Row */}
                                    <div className="d-flex justify-content-start gap-2 mb-2">
                                        <p className="printer fs-12 fw-600 mb-0" style={{ backgroundColor: "#d8dde2" }}><i className="ri-list-settings-line fs-14 fw-500 me-1"></i>Operations{" "}{card.numberOfOperationDone}</p>
                                        <p className="fs-14 fw-600 mb-0"><i className="ri-building-line fs-16 fw-500 me-1" style={{ color: "#1FC16B" }}></i>{card.department}</p>
                                        <p className="fs-14 fw-600 mb-0"><i className="ri-timer-line fs-16 fw-500 me-1" style={{ color: "#1FC16B" }}></i>{card.lengthOfStay} Days</p>
                                    </div>

                                    <div className="d-flex gap-3 mb-3">
                                        <p className="fs-14 mb-0 fw-600 text-muted"><i className="ri-hotel-bed-line fs-18 fw-500 me-1" style={{ color: "#3E64AB" }}></i>{card.bedNumber}/{card.roomNumber}</p>
                                        <p className="d-flex gap-2 mb-0">
                                            {card.doctorName.map((doctor, index) => (
                                                <span className="fs-14 fw-600 text-muted mb-0" key={index}><i className="ri-first-aid-kit-line fs-18 fw-500 me-1" style={{ color: "#0477BF" }}></i>{doctor}</span>
                                            ))}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    {card.operationStatus === "Completed" && (
                                        <div className="d-flex flex-column gap-2">
                                            {card.isAddLogUsedItems && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowLogUsedItemModal(true)}
                                                    className="log-used-item-btn w-100 border-0 d-flex justify-content-center align-items-center"
                                                >
                                                    <OrangeJarOfPills width="20" height="20" /><i className="ri-add-line fs-14 fw-600 me-1"></i>
                                                    Log Used Items
                                                </button>
                                            )}

                                            {card.isAddReport && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowReportModal(true)}
                                                    className="add-report-btn w-100 border-0 d-flex justify-content-center align-items-center"
                                                >
                                                    <BluePenNewSquare width="20" height="20" /><i className="ri-add-line fs-14 fw-600 me-1"></i>
                                                    Add Report
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {card.operationStatus === "Waiting" && (
                                        <>
                                            <div className="d-flex justify-content-center gap-4 mb-3">
                                                {card.isCancelOperation && (
                                                    <button
                                                        type="button"
                                                        className="OTCancel d-flex justify-content-center align-items-center gap-2"
                                                    >
                                                        Cancel<i className="ri-close-circle-line fs-20 fw-500"></i>
                                                    </button>
                                                )}

                                                {card.isAddNewDoctor && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowAddNewDoctorModal(true)}
                                                        className="AddDoctor d-flex justify-content-center align-items-center gap-2"
                                                    >
                                                        <Stethoscope width="20" height="20" /><i className="ri-add-line fs-14 fw-600 me-1"></i>
                                                    </button>
                                                )}
                                            </div>

                                            {card.isStartOperation && (
                                                <button
                                                    type="button"
                                                    className="OpertaionStart w-100 d-flex justify-content-center align-items-center gap-2"
                                                >
                                                    Start Operation
                                                </button>
                                            )}
                                        </>
                                    )}

                                    {card.operationStatus === "In Progress" && (
                                        <>
                                            <div className="d-flex justify-content-center gap-4 mb-3">
                                                {card.isAddLogUsedItems && (
                                                    <button
                                                        type="button"
                                                        className="AddLogUsedItemsIcon"
                                                        onClick={() => setShowLogUsedItemModal(true)}
                                                    >
                                                        <OrangeJarOfPills width="20" height="20" /><i className="ri-add-line fs-14 fw-600 me-1"></i>
                                                    </button>
                                                )}

                                                {card.isAddNewSurgery && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowAddNewSurgeryModal(true)}
                                                        className="AddNewSurgery"
                                                    >
                                                        <GreenHeartPulse width="20" height="20" /><i className="ri-add-line fs-14 fw-600 me-1"></i>
                                                    </button>
                                                )}

                                                {card.isAddNewDoctor && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowAddNewDoctorModal(true)}
                                                        className="AddDoctor d-flex justify-content-center align-items-center gap-2"
                                                    >
                                                        <Stethoscope width="20" height="20" /><i className="ri-add-line fs-14 fw-600 me-1"></i>
                                                    </button>
                                                )}
                                            </div>

                                            {card.isEndOperation && (
                                                <button
                                                    type="button"
                                                    className="OperationEnd w-100 d-flex justify-content-center align-items-center gap-2"
                                                >
                                                    End Operation
                                                </button>
                                            )}
                                        </>
                                    )}

                                </div>
                            </div>

                        );

                    })}

                </div>

            </div>
            <div className="d-flex justify-content-end mt-4">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows) => {
                        setItemsPerPage(rows);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <AddReportModal
                show={showReportModal}
                handleClose={() => setShowReportModal(false)}
            />

            <LogUsedItemModal
                show={showLogUsedItemModal}
                handleClose={() => setShowLogUsedItemModal(false)}
            />

            <AddNewDoctorModal
                show={showAddNewDoctorModal}
                handleClose={() => setShowAddNewDoctorModal(false)}
            />

            <AddNewSurgeryModal
                show={showAddNewSurgeryModal}
                handleClose={() => setShowAddNewSurgeryModal(false)}
            />

            <NewRequestModal
                show={showNewRequestModal}
                handleClose={() => setShowNewRequestModal(false)}
            />

        </>

    );

}