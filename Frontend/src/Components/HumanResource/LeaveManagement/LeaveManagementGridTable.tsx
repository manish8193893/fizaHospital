import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from 'bootstrap';
import { Modal } from "react-bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";
import CustomFormDropdown, { type DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";



import "../../../styles/HumanResource.css";

/********************************************
    Name : Manish Kumar
    Date : 09/06/2026
    Purpose : LeaveManagementTab
*********************************************/
interface LeaveRequestData {
    requestId: string;
    employeeName: string;
    department: string;
    requestDate: string;
    leaveType:
    | "Annual Leave"
    | "Time Off"
    | "Sick Leave"
    | "Emergency Leave"
    | "Maternity Leave"
    | "UnPaid Leave";

    startDate: string;
    endDate: string;
    totalDays: number;
    notes: string;

    approvalStatus:
    | "Approved"
    | "Pending"
    | "Rejected";
}

export default function LeaveManagementGridTable() {

    const calendarRef = useRef<HTMLDivElement>(null);

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const [globalSearch, setGlobalSearch] = useState("");
    const [viewType, setViewType] = useState<"list" | "grid">("list");


    /********************************************
        Name : Manish Kumar
        Date : 09/06/2026
        Purpose : Close Calendar
    *********************************************/
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

    const handleDateSelect = (
        date: Date
    ) => {

        setSelectedDate(date);
        setCurrentPage(1);
        setShowCalendar(false);

    };

    /********************************************
        Name : Manish Kumar
        Date : 09/06/2026
        Purpose : Dummy Employee Data
    *********************************************/
    const ALL_LEAVE_DATA: LeaveRequestData[] = [
        {
            requestId: "LR001",
            employeeName: "John Smith",
            department: "HR",
            requestDate: "01/06/2026",
            leaveType: "Annual Leave",
            startDate: "10/06/2026",
            endDate: "12/06/2026",
            totalDays: 3,
            notes: "Family Vacation",
            approvalStatus: "Approved",
        },
        {
            requestId: "LR002",
            employeeName: "Emily Johnson",
            department: "Finance",
            requestDate: "02/06/2026",
            leaveType: "Sick Leave",
            startDate: "05/06/2026",
            endDate: "06/06/2026",
            totalDays: 2,
            notes: "Fever & Rest",
            approvalStatus: "Pending",
        },
        {
            requestId: "LR003",
            employeeName: "Michael Brown",
            department: "IT",
            requestDate: "03/06/2026",
            leaveType: "Emergency Leave",
            startDate: "07/06/2026",
            endDate: "08/06/2026",
            totalDays: 2,
            notes: "Personal Emergency",
            approvalStatus: "Rejected",
        },
        {
            requestId: "LR004",
            employeeName: "Sarah Wilson",
            department: "Administration",
            requestDate: "04/06/2026",
            leaveType: "Annual Leave",
            startDate: "15/06/2026",
            endDate: "18/06/2026",
            totalDays: 4,
            notes: "Family Function",
            approvalStatus: "Approved",
        },
        {
            requestId: "LR005",
            employeeName: "David Miller",
            department: "Operations",
            requestDate: "05/06/2026",
            leaveType: "Sick Leave",
            startDate: "09/06/2026",
            endDate: "10/06/2026",
            totalDays: 2,
            notes: "Medical Checkup",
            approvalStatus: "Pending",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 09/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 13/06/2026
        Purpose : Filtered Attendance Data
    *********************************************/
    const filteredLeaveRequests = useMemo(() => {

        return ALL_LEAVE_DATA.filter((leave) => {

            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                leave.requestId
                    .toLowerCase()
                    .includes(searchValue) ||

                leave.requestDate
                    .toLowerCase()
                    .includes(searchValue) ||

                leave.leaveType
                    .toLowerCase()
                    .includes(searchValue) ||

                leave.startDate
                    .toLowerCase()
                    .includes(searchValue) ||

                leave.endDate
                    .toLowerCase()
                    .includes(searchValue) ||

                leave.totalDays
                    .toString()
                    .includes(searchValue) ||

                leave.notes
                    .toLowerCase()
                    .includes(searchValue) ||

                leave.approvalStatus
                    .toLowerCase()
                    .includes(searchValue);

            let matchesDate = true;

            if (selectedDate) {

                const formattedSelectedDate =
                    `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
                        selectedDate.getMonth() + 1
                    ).padStart(2, "0")}/${selectedDate.getFullYear()}`;

                matchesDate =
                    leave.requestDate === formattedSelectedDate;

            }

            return (
                matchesSearch &&
                matchesDate
            );

        });

    }, [
        globalSearch,
        selectedDate,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 13/06/2026
        Purpose : Total Pages
    *********************************************/
    const totalPages = Math.ceil(
        filteredLeaveRequests.length / itemsPerPage
    );

    /********************************************
        Name : Manish Kumar
        Date : 13/06/2026
        Purpose : Visible Attendance Data
    *********************************************/
    const visibleTableData = useMemo(() => {
        const startIndex =
            (currentPage - 1) * itemsPerPage;

        return filteredLeaveRequests.slice(
            startIndex,
            startIndex + itemsPerPage
        );
    }, [
        filteredLeaveRequests,
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
        Date : 09/06/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<LeaveRequestData>[] = [
        {
            key: "requestId",
            header: <>Request ID</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "employeeName",
            header: <>Name</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },
        {
            key: "department",
            header: <>Department</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "requestDate",
            header: <>Request Date</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "leaveType",
            header: <>Leave Type</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "startDate",
            header: <>Start Date</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "endDate",
            header: <>End Date</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "totalDays",
            header: <>Total Days</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "notes",
            header: <>Notes</>,
            className: "text-center",
        },

        {
            key: "approvalStatus",
            header: <>Approval Status</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            render: (row) => (
                <div className="d-flex justify-content-center">

                    <span
                        className={`leave-status-pill
                        ${row.approvalStatus === "Approved"
                                ? "status-completed"
                                : row.approvalStatus === "Pending"
                                    ? "status-pending"
                                    : "status-cancelled"
                            }
                    `}
                    >
                        {row.approvalStatus}
                    </span>

                </div>
            ),
        },

        {
            key: "action",
            header: <>Action</>,
            width: "140px",
            className: "text-center",

            render: (row) => (
                <div className="d-flex justify-content-center gap-2">

                    {/* View */}
                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-title="View"
                        onClick={() => console.log(row.requestId)}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    {/* Approve */}
                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-title="Approve"
                        onClick={() => console.log(row.requestId)}
                    >
                        <i className="ri-checkbox-circle-line fs-18"></i>
                    </button>

                    {/* Reject */}
                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-title="Reject"
                        onClick={() => console.log(row.requestId)}
                    >
                        <i className="ri-close-circle-line fs-18"></i>
                    </button>

                </div>
            ),
        },
    ];
    /********************************************
        Name : Manish Kumar
        Date : 09/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedDate(null);
        setCurrentPage(1);

    };

    return (
        <>
            {/* New Appointment Heading and Button */}
            <div className="position-relative bg-transparent">

                {/* Header */}

                <div className="d-flex justify-content-between mb-4">

                    <h5 className="fs-18 fw-500">
                        Leave Management
                    </h5>

                    <div className="d-flex gap-2">

                        <div className="Plus-btn" onClick={() => setShowLeaveModal(true)}>
                            <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                            <div className='text-white fs-16 fw-400'>New Request</div>
                        </div>

                    </div>

                </div>

                <div className="d-flex flex-column">

                    <div className="aph-modal-filter-row mb-4">

                        <div className="aph-filter-search">

                            <input
                                type="text"
                                placeholder="Search..."
                                className="aph-search-input"
                                value={globalSearch}
                                onChange={(e) => {
                                    setGlobalSearch(
                                        e.target.value
                                    );
                                    setCurrentPage(1);
                                }}
                            />

                            <button className="aph-search-btn outline-0">
                                <i className="ri-search-line"></i>
                            </button>

                        </div>

                        <div
                            className="aph-calendar-filter"
                            ref={calendarRef}
                        >

                            <button
                                className="aph-filter-btn outline-0"
                                onClick={() =>
                                    setShowCalendar(
                                        !showCalendar
                                    )
                                }
                            >
                                <i className="ri-calendar-line"></i>

                                <span>
                                    {selectedDate
                                        ? `${String(
                                            selectedDate.getDate()
                                        ).padStart(
                                            2,
                                            "0"
                                        )}/${String(
                                            selectedDate.getMonth() +
                                            1
                                        ).padStart(
                                            2,
                                            "0"
                                        )}/${selectedDate.getFullYear()}`
                                        : "Date"}
                                </span>

                            </button>

                            {showCalendar && (
                                <div className="aph-calendar-popup">
                                    <DateFilterCalendar
                                        selectedDate={
                                            selectedDate
                                        }
                                        onDateSelect={
                                            handleDateSelect
                                        }
                                    />
                                </div>
                            )}

                        </div>

                        <button
                            className="aph-filter-btn outline-0"
                            onClick={
                                handleResetFilters
                            }
                        >
                            <i className="ri-filter-off-line"></i>
                        </button>

                        <div className="d-flex align-items-center ms-auto">

                            <div
                                className="btn-group"
                                role="group"
                            >

                                <button
                                    type="button"
                                    className={`btn ${viewType === "list"
                                        ? "bg-blue text-white"
                                        : "border-secondary bg-white"
                                        }`}
                                    onClick={() =>
                                        setViewType("list")
                                    }
                                >
                                    <i className="ri-list-unordered"></i>
                                </button>

                                <button
                                    type="button"
                                    className={`btn ${viewType === "grid"
                                        ? "bg-blue text-white"
                                        : "border-secondary bg-white"
                                        }`}
                                    onClick={() =>
                                        setViewType("grid")
                                    }
                                >
                                    <i className="ri-layout-grid-line"></i>
                                </button>

                            </div>

                        </div>

                    </div>

                    {
                        viewType === "list" ? (

                            <GlobalGridTable
                                data={visibleTableData}
                                columns={columns}
                                currentPage={currentPage}
                                pageSize={itemsPerPage}
                            />

                        ) : (

                            <div className="row g-4">

                                {visibleTableData.map((leave) => (

                                    <div
                                        className="col-xl-4 col-lg-6 col-md-6"
                                        key={leave.requestId}
                                    >

                                        <div className="leave-grid-card">

                                            <div className="d-flex justify-content-between align-items-center">

                                                <h5 className="mb-0 fw-600 fs-16">
                                                    {leave.requestId}
                                                </h5>

                                                <span
                                                    className={`py-1 px-3 d-flex align-items-center
                            ${leave.approvalStatus === "Approved"
                                                            ? "status-completed"
                                                            : leave.approvalStatus === "Pending"
                                                                ? "status-pending"
                                                                : "status-cancelled"
                                                        }
                        `}
                                                >
                                                    {leave.approvalStatus}
                                                </span>

                                            </div>

                                            <hr />

                                            <div className="leave-grid-content">

                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex flex-column text-start">
                                                        <strong className="text-start">Name:</strong>
                                                        <span className="text-start">{leave.employeeName}</span>
                                                    </div>

                                                    <div className="d-flex flex-column text-start">
                                                        <strong className="text-start">Department:</strong>
                                                        <span className="text-start">{leave.department}</span>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex flex-column text-start">
                                                        <strong className="text-start">Leave Type:</strong>
                                                        <span className="text-start">{leave.leaveType}</span>
                                                    </div>

                                                    <div className="d-flex flex-column text-start">
                                                        <strong className="text-start">Request Date:</strong>
                                                        <span className="text-start">{leave.requestDate}</span>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between text-start">
                                                    <div className="d-flex flex-column">
                                                        <strong className="text-start">Start Date:</strong>
                                                        <span className="text-start">{leave.startDate}</span>
                                                    </div>

                                                    <div className="d-flex flex-column">
                                                        <strong>End Date:</strong>
                                                        <span>{leave.endDate}</span>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="d-flex justify-content-end gap-2 mt-3">

                                                <button className="eye">
                                                    <i className="ri-eye-line fs-18"></i>
                                                </button>

                                                <button className="printer">
                                                    <i className="ri-checkbox-circle-line"></i>
                                                </button>

                                                <button className="delete">
                                                    <i className="ri-close-circle-line"></i>
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )
                    }

                    <div>
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)}
                            rowsPerPage={itemsPerPage}
                            onRowsPerPageChange={(rows) => { setItemsPerPage(rows); setCurrentPage(1); }}
                        />
                    </div>

                </div>
            </div>
            <LeaveModal
                show={showLeaveModal}
                handleClose={() => setShowLeaveModal(false)}
            />
        </>
    );
}

interface LeaveModalProps {
    show: boolean;
    handleClose: () => void;
}

export function LeaveModal({
    show,
    handleClose,
}: LeaveModalProps) {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [employeeName, setEmployeeName] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);
    const [selectedLeaveType, setSelectedLeaveType] = useState<DropdownOption | null>(null);
    const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
    const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
    const [notes, setNotes] = useState("");

    const LEAVE_TYPE_OPTIONS: DropdownOption[] = [
        { id: "annual_leave", name: "Annual Leave" },
        { id: "time_off", name: "Time Off" },
        { id: "sick_leave", name: "Sick Leave" },
        { id: "emergency_leave", name: "Emergency Leave" },
        { id: "maternity_leave", name: "Maternity Leave" },
        { id: "unpaid_leave", name: "UnPaid Leave" },
    ];

    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "hr", name: "Human Resources" },
        { id: "finance", name: "Finance" },
        { id: "it", name: "IT" },
        { id: "administration", name: "Administration" },
        { id: "operations", name: "Operations" },
        { id: "payroll", name: "Payroll" },
        { id: "procurement", name: "Procurement" },
        { id: "sales", name: "Sales" },
    ];

    const totalDays = useMemo(() => {

        if (!startDate || !endDate)
            return 0;

        const diffTime =
            endDate.getTime() -
            startDate.getTime();

        const diffDays =
            Math.floor(
                diffTime /
                (1000 * 60 * 60 * 24)
            ) + 1;

        return diffDays > 0
            ? diffDays
            : 0;

    }, [
        startDate,
        endDate,
    ]);

    /********************************************
        HANDLE ADD
    *********************************************/
    const handleAdd = () => {

        const payload = {

            employeeName,

            department: selectedDepartment,

            leaveType:
                selectedLeaveType,

            startDate:
                startDate
                    ? `${String(startDate.getDate()).padStart(2, "0")}/${String(startDate.getMonth() + 1).padStart(2, "0")}/${startDate.getFullYear()}`
                    : "",

            endDate:
                endDate
                    ? `${String(endDate.getDate()).padStart(2, "0")}/${String(endDate.getMonth() + 1).padStart(2, "0")}/${endDate.getFullYear()}`
                    : "",

            totalDays,

            notes,

        };

        console.log(
            "Leave Request Data :",
            payload
        );

        handleClose();
    };


    return (
        <>
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
                        New Leave Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <form>

                        {/* ROW 2 */}

                        <div className="formRow d-flex">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Name <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Employee Name"
                                        value={employeeName}
                                        onChange={(e) =>
                                            setEmployeeName(e.target.value)
                                        }
                                    />

                                    <i className="ri-user-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Department <span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={DEPARTMENT_OPTIONS}
                                    value={selectedDepartment}
                                    onChange={(value) =>
                                        setSelectedDepartment(value)
                                    }
                                    placeholder="Select Department"
                                />

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Leave Type{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={LEAVE_TYPE_OPTIONS}
                                    value={selectedLeaveType}
                                    onChange={(value) =>
                                        setSelectedLeaveType(value)
                                    }
                                    placeholder="Select Leave Type"
                                />

                            </div>

                        </div>

                        {/* ROW 3 */}

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Start Date{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >

                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() =>
                                            setShowStartDateCalendar(
                                                !showStartDateCalendar
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >

                                        <span>
                                            {startDate
                                                ? `${String(startDate.getDate()).padStart(2, "0")}/${String(startDate.getMonth() + 1).padStart(2, "0")}/${startDate.getFullYear()}`
                                                : "DD/MM/YYYY"}
                                        </span>

                                        <i
                                            className="ri-calendar-line"
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "50%",
                                                transform:
                                                    "translateY(-50%)",
                                                pointerEvents: "none",
                                                zIndex: 2,
                                            }}
                                        ></i>

                                    </div>

                                    {showStartDateCalendar && (

                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                            }}
                                        >

                                            <DateFilterCalendar
                                                selectedDate={startDate}
                                                onDateSelect={(date) => {

                                                    setStartDate(date);

                                                    setShowStartDateCalendar(
                                                        false
                                                    );

                                                }}
                                            />

                                        </div>

                                    )}

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    End Date{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >

                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() =>
                                            setShowEndDateCalendar(
                                                !showEndDateCalendar
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >

                                        <span>
                                            {endDate
                                                ? `${String(endDate.getDate()).padStart(2, "0")}/${String(endDate.getMonth() + 1).padStart(2, "0")}/${endDate.getFullYear()}`
                                                : "DD/MM/YYYY"}
                                        </span>

                                        <i
                                            className="ri-calendar-line"
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "50%",
                                                transform:
                                                    "translateY(-50%)",
                                                pointerEvents: "none",
                                                zIndex: 2,
                                            }}
                                        ></i>

                                    </div>

                                    {showEndDateCalendar && (

                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                            }}
                                        >

                                            <DateFilterCalendar
                                                selectedDate={endDate}
                                                onDateSelect={(date) => {

                                                    setEndDate(date);

                                                    setShowEndDateCalendar(
                                                        false
                                                    );

                                                }}
                                            />

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                        {/*  Row 4 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Total Days
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={totalDays}
                                        disabled
                                    />

                                    <i className="ri-calendar-check-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Notes
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Notes"
                                        value={notes}
                                        onChange={(e) =>
                                            setNotes(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-file-text-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleAdd}
                            >
                                Add
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>
                </Modal.Body>
            </Modal >
        </>
    )
}