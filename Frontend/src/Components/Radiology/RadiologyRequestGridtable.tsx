import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import { Modal } from "react-bootstrap";

import Pagination from "../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown from "../../GlobalHelpers/CustomFormDropdown";
import CustomFilterDropdown from "../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow, type RowAction, } from "../../GlobalHelpers/GlobalGridTable";

/********************************************
    Name : Manish Kumar
    Date :  04/07/2026
    Purpose : Radiology Request Grid
*********************************************/
interface RadiologyRequestData {
    id: number;
    patientNo: string;
    patientName: string;
    gender: string;
    age: number;
    doctorName: string;
    modality: string;
    bodyPart: string;
    scanDate: string;
    scanTime: string;
    status: "Waiting for Payment" | "Paid" | "Report Issued";
    priority: "Normal" | "Urgent";
}


export default function RadiologyRequestGridtable() {

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Search States
    *********************************************/
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<DropdownOption | null>(null);
    const [selectedModality, setSelectedModality] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Date Filter
    *********************************************/
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Modal
    *********************************************/
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Pagination
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Status Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        { id: "waiting", name: "Waiting for Payment", },
        { id: "paid", name: "Paid", },
        { id: "issued", name: "Report Issued", },
    ];

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Priority Options
    *********************************************/
    const PRIORITY_OPTIONS: DropdownOption[] = [
        { id: "normal", name: "Normal", },
        { id: "urgent", name: "Urgent", },
    ];

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Modality Options
    *********************************************/
    const MODALITY_OPTIONS: DropdownOption[] = [
        { id: "xray", name: "X-Ray", },
        { id: "mri", name: "MRI", },
        { id: "ct", name: "CT Scan", },
        { id: "usg", name: "Ultrasound", },
    ];

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Dummy Grid Data
    *********************************************/
    const ALL_REQUESTS: RadiologyRequestData[] = [
        {
            id: 1,
            patientNo: "PAT-1001",
            patientName: "Ahmed Ali",
            gender: "Male",
            age: 42,
            doctorName: "Dr. John",
            modality: "MRI",
            bodyPart: "Brain",
            scanDate: "12/07/2026",
            scanTime: "09:30 AM",
            status: "Paid",
            priority: "Urgent",
        },
        {
            id: 2,
            patientNo: "PAT-1002",
            patientName: "Sara Khan",
            gender: "Female",
            age: 29,
            doctorName: "Dr. Robert",
            modality: "X-Ray",
            bodyPart: "Chest",
            scanDate: "13/07/2026",
            scanTime: "11:00 AM",
            status: "Waiting for Payment",
            priority: "Normal",
        },
        {
            id: 3,
            patientNo: "PAT-1003",
            patientName: "Mohammed Hassan",
            gender: "Male",
            age: 63,
            doctorName: "Dr. David",
            modality: "CT Scan",
            bodyPart: "Abdomen",
            scanDate: "14/07/2026",
            scanTime: "01:15 PM",
            status: "Report Issued",
            priority: "Urgent",
        },
        {
            id: 4,
            patientNo: "PAT-1004",
            patientName: "Fatima Zahra",
            gender: "Female",
            age: 35,
            doctorName: "Dr. Lisa",
            modality: "Ultrasound",
            bodyPart: "Pelvis",
            scanDate: "15/07/2026",
            scanTime: "10:45 AM",
            status: "Paid",
            priority: "Normal",
        },
        {
            id: 5,
            patientNo: "PAT-1005",
            patientName: "Omar Farooq",
            gender: "Male",
            age: 51,
            doctorName: "Dr. John",
            modality: "MRI",
            bodyPart: "Spine",
            scanDate: "15/07/2026",
            scanTime: "03:00 PM",
            status: "Waiting for Payment",
            priority: "Urgent",
        },
        {
            id: 6,
            patientNo: "PAT-1006",
            patientName: "Aisha Siddiqua",
            gender: "Female",
            age: 18,
            doctorName: "Dr. Robert",
            modality: "X-Ray",
            bodyPart: "Ankle",
            scanDate: "16/07/2026",
            scanTime: "08:15 AM",
            status: "Report Issued",
            priority: "Normal",
        },
        {
            id: 7,
            patientNo: "PAT-1007",
            patientName: "Zayd Mansoor",
            gender: "Male",
            age: 72,
            doctorName: "Dr. David",
            modality: "CT Scan",
            bodyPart: "Head",
            scanDate: "16/07/2026",
            scanTime: "02:30 PM",
            status: "Paid",
            priority: "Urgent",
        },
        {
            id: 8,
            patientNo: "PAT-1008",
            patientName: "Mariam Bilal",
            gender: "Female",
            age: 47,
            doctorName: "Dr. Lisa",
            modality: "Mammography",
            bodyPart: "Breast",
            scanDate: "17/07/2026",
            scanTime: "09:00 AM",
            status: "Paid",
            priority: "Normal",
        },
        {
            id: 9,
            patientNo: "PAT-1009",
            patientName: "Khaled Waleed",
            gender: "Male",
            age: 31,
            doctorName: "Dr. John",
            modality: "Ultrasound",
            bodyPart: "Liver",
            scanDate: "17/07/2026",
            scanTime: "11:30 AM",
            status: "Waiting for Payment",
            priority: "Urgent",
        },
        {
            id: 10,
            patientNo: "PAT-1010",
            patientName: "Noor Al-Huda",
            gender: "Female",
            age: 58,
            doctorName: "Dr. Robert",
            modality: "MRI",
            bodyPart: "Knee",
            scanDate: "18/07/2026",
            scanTime: "04:15 PM",
            status: "Report Issued",
            priority: "Normal",
        },
    ];


    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Filtered Grid Data
    *********************************************/
    const filteredRequests = useMemo(() => {
        return ALL_REQUESTS.filter((item) => {
            const search = globalSearch.toLowerCase();

            const matchesSearch =
                item.patientNo.toLowerCase().includes(search) ||
                item.patientName.toLowerCase().includes(search) ||
                item.doctorName.toLowerCase().includes(search) ||
                item.bodyPart.toLowerCase().includes(search) ||
                item.modality.toLowerCase().includes(search);

            const matchesStatus =
                !selectedStatus ||
                item.status.toLowerCase() === selectedStatus.name.toLowerCase();

            const matchesPriority =
                !selectedPriority ||
                item.priority.toLowerCase() === selectedPriority.name.toLowerCase();

            const matchesModality =
                !selectedModality ||
                item.modality.toLowerCase() === selectedModality.name.toLowerCase();

            const matchesDate =
                !selectedDate ||
                item.scanDate ===
                `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0")}/${selectedDate.getFullYear()}`;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesModality &&
                matchesDate
            );
        });
    }, [globalSearch, selectedStatus, selectedPriority, selectedModality, selectedDate]);


    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Pagination
    *********************************************/
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredRequests.slice(startIndex, endIndex);
    }, [filteredRequests, currentPage, itemsPerPage]);


    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Bootstrap Tooltip
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
    }, [visibleTableData]);

    /********************************************
        Name : Manish Kumar
        Date :
        Purpose : Grid Columns
    *********************************************/
    const columns: ColumnActionRow<RadiologyRequestData>[] = [

        {
            key: "patientNo",
            header: <>Patient No</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),
        },

        {
            key: "patientName",
            header: <>Patient Name</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),
        },

        {
            key: "gender",
            header: <>Gender / Age</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),

            render: (row) => (
                <div className="d-flex justify-content-center align-items-center gap-1">
                    <span>{row.gender}</span>
                    <span>/</span>
                    <span>{row.age} Y</span>
                </div>
            ),

        },

        {
            key: "doctorName",
            header: <>Referring Doctor</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),
        },

        {
            key: "modality",
            header: <>Modality</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),
        },


        {
            key: "bodyPart",
            header: <>Body Part</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),
        },

        {
            key: "scanDate",
            header: <>Date</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),
        },

        {
            key: "scanTime",
            header: <>Time</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center p-0 text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),

            render: (row) => (
                <div className="d-flex justify-content-center px-2">
                    <span
                        className={`${row.status === "Waiting for Payment"
                            ? "status-pending"
                            : row.status === "Paid"
                                ? "status-confirmed"
                                : row.status === "Report Issued"
                                    ? "status-normal"
                                    : ""
                            }`}
                    >
                        {row.status}
                    </span>
                </div>
            ),


        },

        {
            key: "priority",
            header: <>Priority</>,
            className: "text-center p-0",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),

            render: (row) => {
                const isUrgent = row.priority === "Urgent";
                const isNormal = row.priority === "Normal";

                return (
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            color: isUrgent ? "#FF4C51" : isNormal ? "#0477BF" : "inherit",
                        }}
                    >
                        {row.priority}
                        {row.priority === "Normal" ? (
                            <i className="ri-verified-badge-fill fs-16 ms-1"></i>
                        ) : (
                            <i className="ri-alert-fill fs-16 ms-1"></i>
                        )}
                    </div>
                );
            }


        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 04/07/2026
        Purpose : radilogy Request Row Actions
    *********************************************/
    const rowActions: RowAction<RadiologyRequestData>[] = [
        {
            icon: <i className="ri-eye-line fs-18"></i>,
            tooltip: "View Details",
            className: "medical-record",
            onClick: (row) => console.log("View Details :", row.id),
        },
        {
            icon: <i className="ri-file-add-line fs-18"></i>,
            tooltip: "Add Result",
            className: "test-result",
            onClick: (row) => console.log("Add Result :", row.id),
        },
        {
            icon: <i className="ri-file-search-line fs-18"></i>,
            tooltip: "View Result",
            className: "radiology",
            onClick: (row) => console.log("View Result :", row.id),
        },
        {
            icon: <i className="ri-printer-line fs-18"></i>,
            tooltip: "Print",
            className: "check-in",
            onClick: (row) => console.log("Print :", row.id),
        },
        {
            icon: <i className="ri-money-dollar-circle-line fs-18"></i>,
            tooltip: "Send To Accountant",
            className: "skipDose",
            onClick: (row) => console.log("Send To Accountant :", row.id),
        },
    ]

    // Close calendar on outside click
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
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
        Date :
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedDate(null);
        setSelectedStatus(null);
        setSelectedPriority(null);
        setSelectedModality(null);
        setCurrentPage(1);
    };

    return (
        <>

            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Radiology Requests</p>

                <div className="Plus-btn" onClick={() => setShowScheduleModal(true)}>
                    <div className="text-white fs-14 fw-400">New Scan</div>

                    <img
                        src="/Assets/Icons/WhitePlusCircle.svg"
                        alt="WhitePlusCircle"
                        width={22}
                        height={22}
                    />
                </div>
            </div>

            {/* Filter Row */}
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
                        <i className="ri-search-line"></i>
                    </button>
                </div>

                {/* Date Filter */}
                <div className="aph-calendar-filter" ref={calendarRef}>
                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() => setShowCalendar(!showCalendar)}
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

                    {showCalendar && (
                        <div className="aph-calendar-popup">
                            <DateFilterCalendar
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                            />
                        </div>
                    )}
                </div>

                {/* Status */}
                <div>
                    <CustomFilterDropdown
                        options={STATUS_OPTIONS}
                        value={selectedStatus}
                        placeholder="Status"
                        customClass="aph-filter-dropdown w-100"
                        onChange={(value) => {
                            setSelectedStatus(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Priority */}
                <div>
                    <CustomFilterDropdown
                        options={PRIORITY_OPTIONS}
                        value={selectedPriority}
                        placeholder="Priority"
                        customClass="aph-filter-dropdown"
                        onChange={(value) => {
                            setSelectedPriority(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Modality */}
                <div>
                    <CustomFilterDropdown
                        options={MODALITY_OPTIONS}
                        value={selectedModality}
                        placeholder="Modality"
                        customClass="aph-filter-dropdown"
                        onChange={(value) => {
                            setSelectedModality(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Reset */}
                <button className="aph-filter-btn outline-0" onClick={handleResetFilters}>
                    <i className="ri-filter-off-line"></i>
                </button>
            </div>

            {/* Grid */}
            <div className="d-flex flex-column">
                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    currentPage={currentPage}
                    rowActions={rowActions}
                    pageSize={itemsPerPage}
                />

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

            {/* Modal */}
            <RadiologyRequestModal
                show={showScheduleModal}
                handleClose={() => setShowScheduleModal(false)}
            />

        </>
    );
}


/********************************************
    Name    : Manish Kumar
    Date    : 
    Purpose : Radiology Request Modal Props
*********************************************/
interface RadiologyRequestModalProps {
    show: boolean;
    handleClose: () => void;
}

function RadiologyRequestModal({
    show,
    handleClose,
}: RadiologyRequestModalProps) {
    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Step State
    *********************************************/
    const [step, setStep] = useState<number>(1);

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Patient Information
    *********************************************/
    const [patientName, setPatientName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [gender, setGender] = useState<DropdownOption | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [showDobCalendar, setShowDobCalendar] = useState(false);
    const [age, setAge] = useState("");
    const [notes, setNotes] = useState("");

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Scan Information
    *********************************************/
    const [selectedModality, setSelectedModality] = useState<DropdownOption | null>(null);
    const [selectedBodyPart, setSelectedBodyPart] = useState<DropdownOption | null>(null);
    const [scanDate, setScanDate] = useState<Date | null>(null);
    const [showScanCalendar, setShowScanCalendar] = useState(false);
    const [scanTime, setScanTime] = useState("");
    const timeInputRef = useRef<HTMLInputElement>(null);
    const [duration, setDuration] = useState("");
    const [priority, setPriority] = useState<DropdownOption | null>(null);
    const [price, setPrice] = useState("");
    const [discountValue, setDiscountValue] = useState<number>(0);
    const [discountType, setDiscountType] = useState<"Fixed" | "Percentage">("Fixed");

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Scan Grid Pagination
    *********************************************/
    const [currentScanPage, setCurrentScanPage] = useState(1);
    const [scanItemsPerPage, setScanItemsPerPage] = useState(5);

    /********************************************
    Name    : Manish Kumar
    Date    : 
    Purpose : Scan Grid Interface
*********************************************/
    interface ScanDetailsData {
        id: number;
        modality: string;
        bodyPart: string;
        scanDate: string;
        scanTime: string;
        duration: string;
        price: string;
    }

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Gender Options
    *********************************************/
    const GENDER_OPTIONS: DropdownOption[] = [
        { id: "male", name: "Male" },
        { id: "female", name: "Female" },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Modality Options
    *********************************************/
    const MODALITY_OPTIONS: DropdownOption[] = [
        { id: "xray", name: "X-Ray" },
        { id: "mri", name: "MRI" },
        { id: "ct", name: "CT Scan" },
        { id: "ultrasound", name: "Ultrasound" },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Body Part Options
    *********************************************/
    const BODY_PART_OPTIONS: DropdownOption[] = [
        { id: "brain", name: "Brain" },
        { id: "chest", name: "Chest" },
        { id: "abdomen", name: "Abdomen" },
        { id: "pelvis", name: "Pelvis" },
        { id: "neck", name: "Neck" },
        { id: "shoulder", name: "Shoulder" },
        { id: "arm", name: "Arm" },
        { id: "elbow", name: "Elbow" },
        { id: "wrist", name: "Wrist" },
        { id: "hand", name: "Hand" },
        { id: "hip", name: "Hip" },
        { id: "knee", name: "Knee" },
        { id: "leg", name: "Leg" },
        { id: "ankle", name: "Ankle" },
        { id: "foot", name: "Foot" },
        { id: "wholebody", name: "Whole Body" },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Priority Options
    *********************************************/
    const PRIORITY_OPTIONS: DropdownOption[] = [
        { id: "normal", name: "Normal" },
        { id: "urgent", name: "Urgent" },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Scan Grid Data
    *********************************************/
    const SCAN_DETAILS: ScanDetailsData[] = [
        {
            id: 1,
            modality: "MRI",
            bodyPart: "Brain",
            scanDate: "15/07/2026",
            scanTime: "09:30 AM",
            duration: "30 Min",
            price: "250 IQD",
        },
        {
            id: 2,
            modality: "CT Scan",
            bodyPart: "Chest",
            scanDate: "15/07/2026",
            scanTime: "11:00 AM",
            duration: "20 Min",
            price: "180 IQD",
        },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Scan Grid Columns
    *********************************************/
    const scanColumns: ColumnActionRow<ScanDetailsData>[] = [
        {
            key: "modality",
            header: <>Modality</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="Sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "bodyPart",
            header: <>Body Part</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="Sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "scanDate",
            header: <>Scan Date</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="Sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "scanTime",
            header: <>Scan Time</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="Sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "duration",
            header: <>Duration</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="Sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "price",
            header: <>Price</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="Sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "110px",
            render: (row) => (
                <div className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Remove Scan"
                        onClick={() => console.log("Remove Scan :", row.id)}
                    >
                        <i className="ri-delete-bin-6-line fs-18"></i>
                    </button>
                </div>
            ),
        },
    ];


    // Inside the RadiologyRequestModal function wrapper:

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Scan Pagination
    *********************************************/
    const scanTotalPages = Math.ceil(SCAN_DETAILS.length / scanItemsPerPage);

    const visibleScanData = SCAN_DETAILS.slice(
        (currentScanPage - 1) * scanItemsPerPage,
        currentScanPage * scanItemsPerPage
    );

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Calculate Age
    *********************************************/
    useEffect(() => {
        if (!dateOfBirth) {
            setAge("");
            return;
        }

        const today = new Date();
        let calculatedAge = today.getFullYear() - dateOfBirth.getFullYear();
        const monthDifference = today.getMonth() - dateOfBirth.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
        ) {
            calculatedAge--;
        }

        setAge(calculatedAge.toString());
    }, [dateOfBirth]);

    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Next Step
    *********************************************/
    const handleNext = () => {
        setStep(2);
    };

    const subTotal = useMemo(() => {
        return SCAN_DETAILS.reduce(
            (total, item) => total + Number(item.price.replace(/[^\d]/g, "")),
            0
        );
    }, [SCAN_DETAILS]);

    const discountAmount = useMemo(() => {
        if (!discountValue) return 0;

        const value = Number(discountValue) || 0;

        if (discountType === "Fixed") {
            return value;
        }

        return (subTotal * value) / 100;
    }, [subTotal, discountType, discountValue]);


    const totalAmount = useMemo(() => {
        return subTotal - discountAmount;
    }, [subTotal, discountAmount]);


    /********************************************
        Name    : Manish Kumar
        Date    : 
        Purpose : Close & Reset
    *********************************************/
    const handleCloseAndReset = () => {
        setStep(1);
        setPatientName("");
        setPhoneNumber("");
        setDoctorName("");
        setGender(null);
        setDateOfBirth(null);
        setShowDobCalendar(false);
        setAge("");
        setNotes("");
        setSelectedModality(null);
        setSelectedBodyPart(null);
        setScanDate(null);
        setShowScanCalendar(false);
        setScanTime("");
        setDuration("");
        setPriority(null);
        setPrice("");
        setCurrentScanPage(1);
        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseAndReset}
                centered
                size="lg"
                backdrop="static"
                contentClassName="aph-modal-content"
                backdropClassName="aph-modal-backdrop"
            >
                {/* HEADER */}
                <Modal.Header className="aph-modal-header mb-2">
                    <button
                        type="button"
                        className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                        style={{
                            position: "absolute",
                            right: "2.6rem",
                            top: "2.7rem",
                        }}
                        onClick={handleCloseAndReset}
                    >
                        <img src="/Assets/Icons/CrossModalIcon.svg" alt="Cross" />
                    </button>

                    <Modal.Title className="fs-18 fw-400 aph-modal-title">
                        New Scan
                    </Modal.Title>
                </Modal.Header>

                {/* STEP 1 */}
                {step === 1 && (
                    <Modal.Body>
                        {/* Stepper */}
                        <div className="ward-stepper-container mb-3">
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="d-flex align-items-center">
                                    <div className="ward-step-active"></div>
                                    <span className="ms-2 fs-14 fw-500">01 Patient Info</span>
                                </div>

                                <div
                                    className="mx-3"
                                    style={{
                                        width: "150px",
                                        height: "2px",
                                        background: "#D7DCE5",
                                    }}
                                ></div>

                                <div className="d-flex align-items-center">
                                    <div className="ward-step-inactive"></div>
                                    <span className="ms-2 fs-14 fw-500">02 Scan Details</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* ROW 1 */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">
                                        Patient Name <span className="text-danger">*</span>
                                    </label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Enter Patient Name"
                                            value={patientName}
                                            onChange={(e) => setPatientName(e.target.value)}
                                        />
                                        <i className="ri-user-3-line"></i>
                                    </div>
                                </div>

                                <div className="formGroup">
                                    <label className="customLabel">
                                        Phone Number <span className="text-danger">*</span>
                                    </label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Enter Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                        <i className="ri-phone-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 2 */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">Doctor Name</label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Enter Doctor Name"
                                            value={doctorName}
                                            onChange={(e) => setDoctorName(e.target.value)}
                                        />
                                        <i className="ri-stethoscope-line"></i>
                                    </div>
                                </div>

                                <div className="formGroup">
                                    <label className="customLabel">
                                        Gender <span className="text-danger">*</span>
                                    </label>
                                    <CustomFormDropdown
                                        options={GENDER_OPTIONS}
                                        value={gender}
                                        onChange={(value) => setGender(value)}
                                        placeholder="Select Gender"
                                    />
                                </div>
                            </div>

                            {/* ROW 3 */}
                            <div className="formRow">
                                {/* Date Of Birth */}
                                <div className="formGroup">
                                    <label className="customLabel">
                                        Date Of Birth <span className="text-danger">*</span>
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <div
                                            className="customInput d-flex align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setShowDobCalendar(!showDobCalendar)}
                                        >
                                            {dateOfBirth
                                                ? `${String(dateOfBirth.getDate()).padStart(2, "0")}/${String(
                                                    dateOfBirth.getMonth() + 1
                                                ).padStart(2, "0")}/${dateOfBirth.getFullYear()}`
                                                : "DD/MM/YYYY"}
                                        </div>

                                        <i
                                            className="ri-calendar-line"
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                pointerEvents: "none",
                                                zIndex: 2,
                                            }}
                                        ></i>

                                        {showDobCalendar && (
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
                                                    selectedDate={dateOfBirth}
                                                    onDateSelect={(date) => {
                                                        setDateOfBirth(date);
                                                        setShowDobCalendar(false);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Age */}
                                <div className="formGroup">
                                    <label className="customLabel">Age</label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Age"
                                            value={age}
                                            disabled
                                        />
                                        <i className="ri-calendar-check-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 4 */}
                            <div className="formRow">
                                <div className="formGroup" style={{ width: "100%" }}>
                                    <label className="customLabel">Notes</label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Enter Notes"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        />
                                        <i className="ri-file-text-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER BUTTONS */}
                            <div className="d-flex justify-content-between mt-4">
                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>

                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                    onClick={handleCloseAndReset}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <Modal.Body>
                        {/* Stepper */}
                        <div className="ward-stepper-container mb-4">
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="d-flex align-items-center">
                                    <div className="ward-step-completed">
                                        <i className="ri-check-line"></i>
                                    </div>
                                    <span className="ms-2 fs-14 fw-500">01 Patient Info</span>
                                </div>

                                <div
                                    className="mx-3"
                                    style={{
                                        width: "150px",
                                        height: "2px",
                                        background: "#3E63B6",
                                    }}
                                ></div>

                                <div className="d-flex align-items-center">
                                    <div className="ward-step-active"></div>
                                    <span className="ms-2 fs-14 fw-500">02 Scan Details</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* ROW 1 */}
                            <div className="formRow">
                                <div className="formGroup">
                                    <label className="customLabel">
                                        Modality <span className="text-danger">*</span>
                                    </label>
                                    <CustomFormDropdown
                                        options={MODALITY_OPTIONS}
                                        value={selectedModality}
                                        onChange={(value) => setSelectedModality(value)}
                                        placeholder="Select Modality"
                                    />
                                </div>

                                <div className="formGroup">
                                    <label className="customLabel">
                                        Body Part <span className="text-danger">*</span>
                                    </label>
                                    <CustomFormDropdown
                                        options={BODY_PART_OPTIONS}
                                        value={selectedBodyPart}
                                        onChange={(value) => setSelectedBodyPart(value)}
                                        placeholder="Select Body Part"
                                    />
                                </div>
                            </div>

                            {/* ROW 2 */}
                            <div className="formRow">
                                {/* Scan Date */}
                                <div className="formGroup">
                                    <label className="customLabel">
                                        Scan Date <span className="text-danger">*</span>
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <div
                                            className="customInput d-flex align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setShowScanCalendar(!showScanCalendar)}
                                        >
                                            {scanDate
                                                ? `${String(scanDate.getDate()).padStart(2, "0")}/${String(
                                                    scanDate.getMonth() + 1
                                                ).padStart(2, "0")}/${scanDate.getFullYear()}`
                                                : "DD/MM/YYYY"}
                                        </div>

                                        <i
                                            className="ri-calendar-line"
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                pointerEvents: "none",
                                                zIndex: 2,
                                            }}
                                        ></i>

                                        {showScanCalendar && (
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
                                                    selectedDate={scanDate}
                                                    onDateSelect={(date) => {
                                                        setScanDate(date);
                                                        setShowScanCalendar(false);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Scan Time */}
                                <div className="formGroup">
                                    <label className="customLabel">
                                        Scan Time <span className="text-danger">*</span>
                                    </label>
                                    <div className="inputWrapper" style={{ position: "relative" }}>
                                        <input
                                            ref={timeInputRef}
                                            type="time"
                                            className="customInput hide-time-icon"
                                            value={scanTime}
                                            onChange={(e) => setScanTime(e.target.value)}
                                            onClick={(e) => {
                                                (e.target as HTMLInputElement).showPicker?.();
                                            }}
                                        />
                                        <i
                                            className="ri-time-line"
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                pointerEvents: "none",
                                            }}
                                        ></i>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="formGroup">
                                    <label className="customLabel">
                                        Duration (Minutes) <span className="text-danger">*</span>
                                    </label>
                                    <div className="inputWrapper">
                                        <input
                                            type="number"
                                            className="customInput"
                                            placeholder="Enter Duration"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        />
                                        <i className="ri-timer-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* ROW 3 */}
                            <div className="formRow">
                                {/* Priority */}
                                <div className="formGroup">
                                    <label className="customLabel">
                                        Priority <span className="text-danger">*</span>
                                    </label>
                                    <CustomFormDropdown
                                        options={PRIORITY_OPTIONS}
                                        value={priority}
                                        onChange={(value) => setPriority(value)}
                                        placeholder="Select Priority"
                                    />
                                </div>

                                {/* Discount Type */}
                                <div className="formGroup">
                                    <label className="customLabel">Discount</label>

                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            value={discountValue}
                                            onChange={(e) =>
                                                setDiscountValue(Number(e.target.value))
                                            }
                                        />

                                        <button
                                            className="btn bg-body-secondary border dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {discountType || "Type"}
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => setDiscountType("Fixed")}
                                                >
                                                    Fixed
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    onClick={() => setDiscountType("Percentage")}
                                                >
                                                    Percentage
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="formGroup">
                                    <label className="customLabel">
                                        Price <span className="text-danger">*</span>
                                    </label>
                                    <div className="inputWrapper">
                                        <input
                                            type="number"
                                            className="customInput"
                                            placeholder="Enter Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <i className="ri-money-dollar-circle-line"></i>
                                    </div>
                                </div>
                            </div>

                            {/* Scan Details Grid */}
                            <div
                                className="mt-3 p-2 rounded-2"
                                style={{
                                    background: "#F7F7F7",
                                }}
                            >
                                <div className="fs-18 fw-500 mb-3">Scan Details</div>
                                <div className="d-flex flex-column">
                                    <GlobalGridTable
                                        data={visibleScanData}
                                        columns={scanColumns}
                                        currentPage={currentScanPage}
                                        pageSize={scanItemsPerPage}
                                    />

                                    <Pagination
                                        totalPages={scanTotalPages}
                                        currentPage={currentScanPage}
                                        onPageChange={(page) => setCurrentScanPage(page)}
                                        rowsPerPage={scanItemsPerPage}
                                        onRowsPerPageChange={(rows) => {
                                            setScanItemsPerPage(rows);
                                            setCurrentScanPage(1);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="d-flex gap-3 mt-4">

                                {/* Check Out */}
                                <button
                                    type="button"
                                    className="aph-modal-btn-height bg-blue text-white border-0 outline-0 col"
                                    onClick={() => {
                                        const payload = {
                                            patientName,
                                            phoneNumber,
                                            doctorName,
                                            gender,
                                            dateOfBirth,
                                            age,
                                            notes,
                                            modality: selectedModality,
                                            bodyPart: selectedBodyPart,
                                            scanDate,
                                            scanTime,
                                            duration,
                                            priority,
                                            discountType,
                                            price,
                                            scans: SCAN_DETAILS,
                                        };
                                        console.log("Radiology Request", payload);
                                        setStep(3);
                                    }}
                                >
                                    Check Out
                                </button>

                                {/* Save & Add New */}
                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-blue bg-white text-blue border-0 outline-0 col"
                                >
                                    Save & Add New
                                </button>

                                {/* Back */}
                                <button
                                    type="button"
                                    className="aph-modal-btn-height border border-secondary bg-white text-secondary outline-0 col"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <Modal.Body className="p-0">

                        <div
                            className="my-3 p-2 rounded-2"
                            style={{
                                background: "#F7F7F7",
                            }}
                        >
                            <div className="fs-18 fw-500 mb-3">Scan Details</div>
                            <div className="d-flex flex-column">
                                <GlobalGridTable
                                    data={visibleScanData}
                                    columns={scanColumns}
                                    currentPage={currentScanPage}
                                    pageSize={scanItemsPerPage}
                                />

                                <Pagination
                                    totalPages={scanTotalPages}
                                    currentPage={currentScanPage}
                                    onPageChange={(page) => setCurrentScanPage(page)}
                                    rowsPerPage={scanItemsPerPage}
                                    onRowsPerPageChange={(rows) => {
                                        setScanItemsPerPage(rows);
                                        setCurrentScanPage(1);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="h-100">

                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="fw-500 fs-16">Sub Total</span>
                                        <span className="fw-600 fs-16">{subTotal.toFixed(2)} IQD</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="fw-500 fs-16">Discount</span>
                                        <span className="fw-600 fs-16 text-danger">
                                            - {discountAmount.toFixed(2)} IQD
                                        </span>
                                    </div>

                                    <hr className="my-1" />

                                    <div className="d-flex justify-content-between">
                                        <span className="fw-700 fs-20">Total Amount</span>
                                        <span
                                            className="fw-700 fs-20"
                                            style={{
                                                color: "#3E63B6",
                                            }}
                                        >
                                            {totalAmount.toFixed(2)} IQD
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="d-flex gap-3 mt-4">

                            <button
                                type="button"
                                className="aph-modal-btn-height bg-blue text-white border-0 outline-0 col"
                                onClick={() => handleCloseAndReset()}
                            >
                                Send To Accountant
                            </button>
                            <button
                                type="button"
                                className="aph-modal-btn-height border border-secondary bg-white text-secondary outline-0 col"
                                onClick={() => setStep(2)}
                            >
                                Back
                            </button>
                        </div>
                    </Modal.Body>
                )}

            </Modal >
        </>
    )
}