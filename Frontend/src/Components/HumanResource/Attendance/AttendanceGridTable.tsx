import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";

import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";



import "../../../styles/HumanResource.css"

/********************************************
    Name : Manish Kumar
    Date : 16/06/2026
    Purpose : Attendance Grid
*********************************************/
interface AttendanceTableData {
    id: string;
    name: string;
    department: string;
    jobTitle: string;
    date: string;
    attendanceStatus:
    | "Present"
    | "Late"
    | "Absent";
    checkInTime: string;
    checkOutTime: string;
}

interface DeviceData {
    id: number;
    deviceName: string;
    ipAddress: string;
    port: string;
    deviceType: string;
    isSelected: boolean;
}

interface AttendanceLogData {
    id: number;
    employeeId: string;
    employeeName: string;
    device: string;
    date: string;
    time: string;
    logType: string;
    attendanceStatus: string;
}

export default function AttendanceGridTable() {

    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);
    const [selectedPosition, setSelectedPosition] = useState<DropdownOption | null>(null);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    /********************************************
        Department Options
    *********************************************/
    const departmentOptions: DropdownOption[] = [
        { id: "cardiology", name: "Cardiology", },
        { id: "radiology", name: "Radiology", },
        { id: "er", name: "Emergency", },
        { id: "icu", name: "ICU", },
        { id: "hr", name: "Human Resources", },
    ];

    /********************************************
        Position Options
    *********************************************/
    const positionOptions: DropdownOption[] = [
        { id: "doctor", name: "Doctor", },
        { id: "nurse", name: "Nurse", },
        { id: "hr_manager", name: "HR Manager", },
        { id: "receptionist", name: "Receptionist", },
        { id: "lab_technician", name: "Lab Technician", },
    ];

    /********************************************
        Attendance Dummy Data
    *********************************************/
    const ALL_ATTENDANCE_DATA: AttendanceTableData[] = [

        {
            id: "EMP001",
            name: "Ahmed Ali",
            department: "Cardiology",
            jobTitle: "Doctor",
            date: "2026-06-15",
            attendanceStatus: "Present",
            checkInTime: "08:00",
            checkOutTime: "17:00",
        },

        {
            id: "EMP002",
            name: "Sara Khan",
            department: "Emergency",
            jobTitle: "Nurse",
            date: "2026-06-15",
            attendanceStatus: "Late",
            checkInTime: "08:20",
            checkOutTime: "17:00",
        },

        {
            id: "EMP003",
            name: "Mohammed Hassan",
            department: "ICU",
            jobTitle: "Doctor",
            date: "2026-06-15",
            attendanceStatus: "Absent",
            checkInTime: "-",
            checkOutTime: "-",
        },

        {
            id: "EMP004",
            name: "Fatima Noor",
            department: "Radiology",
            jobTitle: "Lab Technician",
            date: "2026-06-15",
            attendanceStatus: "Present",
            checkInTime: "09:00",
            checkOutTime: "18:00",
        },

        {
            id: "EMP005",
            name: "John Smith",
            department: "Human Resources",
            jobTitle: "HR Manager",
            date: "2026-06-15",
            attendanceStatus: "Present",
            checkInTime: "08:30",
            checkOutTime: "17:30",
        },

    ];

    /********************************************
        Main Pagination
    *********************************************/
    const [currentPage, setCurrentPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(10);

    /********************************************
        Working Hours Calculator
    *********************************************/
    const calculateWorkingHours = (checkIn: string, checkOut: string): string => {
        if (checkIn === "-" || checkOut === "-") {
            return "-";
        }

        const start = new Date(`2000-01-01 ${checkIn}`);
        const end = new Date(`2000-01-01 ${checkOut}`);

        // Calculate total hours
        const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

        // Round to maximum 2 decimal places and remove trailing zeros
        const formattedDiff = Number(diff.toFixed(2));

        return `${formattedDiff} Hours`;
    };

    /********************************************
        Filtered Data
    *********************************************/
    const filteredAttendance = useMemo(() => {
        return ALL_ATTENDANCE_DATA.filter((row) => {
            const search = globalSearch.toLowerCase();

            const matchesSearch =
                row.id.toLowerCase().includes(search) ||
                row.name.toLowerCase().includes(search);

            const matchesDepartment =
                !selectedDepartment ||
                row.department === selectedDepartment.name;

            const matchesPosition =
                !selectedPosition ||
                row.jobTitle === selectedPosition.name;

            const matchesDate =
                !selectedDate ||
                row.date ===
                `${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    selectedDate.getDate()
                ).padStart(2, "0")}`;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesPosition &&
                matchesDate
            );
        });
    }, [globalSearch, selectedDepartment, selectedPosition, selectedDate]);


    const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        return filteredAttendance.slice(start, end);
    }, [filteredAttendance, currentPage, itemsPerPage]);


    /********************************************
        Tooltips
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
        Columns
    *********************************************/
    const columns: ColumnActionRow<AttendanceTableData>[] = [

        {
            key: "id",
            header: <>ID</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "name",
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
            key: "jobTitle",
            header: <>Job Title</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "date",
            header: <>Date</>,
            sortable: true,
            className: "text-center text-nowrap",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "attendanceStatus",
            header: <>Attendance Status</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            render: (row) => (

                <span
                    className={`${row.attendanceStatus === "Present"
                        ? "status-completed"
                        : row.attendanceStatus === "Late"
                            ? "status-pending"
                            : "status-cancelled"
                        }`}
                >
                    {row.attendanceStatus}
                </span>

            ),
        },

        {
            key: "checkInTime",
            header: <>Check In Time</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "checkOutTime",
            header: <>Check Out Time</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "workingHours",
            header: <>Total Working Hours</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            render: (row) => (
                <span>
                    {calculateWorkingHours(
                        row.checkInTime,
                        row.checkOutTime
                    )}
                </span>
            ),
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "120px",

            render: () => (

                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-title="View"
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-title="Edit"
                    >
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-title="Delete"
                    >
                        <i className="ri-delete-bin-7-line fs-18"></i>
                    </button>

                </div>

            ),
        },

    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setShowCalendar(false);
        setCurrentPage(1);
    };


    /********************************************
        Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedDepartment(null);
        setSelectedPosition(null);
        setSelectedDate(null);
        setShowCalendar(false);
        setCurrentPage(1);

    };

    return (
        <>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
                <p className='fs-18 fw-500'>Attendance Logs</p>
                <div className="Plus-btn" onClick={() => setShowAttendanceModal(true)}>
                    <div className='text-white fs-14 fw-400'>Sync & Import Logs</div>
                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                </div>
            </div>

            {/* FILTERS */}

            <div className="aph-modal-filter-row mb-4">
                <div className="aph-filter-search">
                    <input
                        type="text"
                        className="aph-search-input"
                        placeholder="Search..."
                        value={globalSearch}
                        onChange={(e) => setGlobalSearch(e.target.value)}
                    />
                    <button className="aph-search-btn">
                        <i className="ri-search-line"></i>
                    </button>
                </div>

                <div>
                    <CustomFilterDropdown
                        options={positionOptions}
                        value={selectedPosition}
                        placeholder="Position"
                        customClass="aph-filter-dropdown"
                        onChange={setSelectedPosition}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={departmentOptions}
                        value={selectedDepartment}
                        placeholder="Department"
                        customClass="aph-filter-dropdown"
                        onChange={setSelectedDepartment}
                    />
                </div>

                <div className="aph-calendar-filter" ref={calendarRef}>
                    <button
                        type="button"
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

                <button className="aph-filter-btn" onClick={handleResetFilters}>
                    <i className="ri-filter-off-line"></i>
                </button>
            </div>


            {/* Table */}
            <div className="d-flex flex-column">
                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={setItemsPerPage}
                />
            </div>

            <AttendanceModal
                show={showAttendanceModal}
                handleClose={() => setShowAttendanceModal(false)}
            />

        </>
    );
}


import { Modal } from "react-bootstrap";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

interface AttendanceModalProps {
    show: boolean;
    handleClose: () => void;
}

export function AttendanceModal({
    show,
    handleClose,
}: AttendanceModalProps) {

    const [currentStep, setCurrentStep] = useState(1);
    const [isEditingLogs, setIsEditingLogs] = useState(false);
    const [syncMode, setSyncMode] = useState<"all_devices" | "selected_devices" | null>(null);

    const [devices, setDevices] = useState<DeviceData[]>(
        [
            {
                id: 123,
                deviceName: "Main Entrance Scanner",
                ipAddress: "192.168.1.10",
                port: "80",
                deviceType: "Fingerprint Scanner",
                isSelected: false,
            },

            {
                id: 464,
                deviceName: "ER Biometric Device",
                ipAddress: "192.168.1.11",
                port: "80",
                deviceType: "Face Recognition Device",
                isSelected: false,
            },

            {
                id: 565,
                deviceName: "ICU Device",
                ipAddress: "192.168.1.12",
                port: "80",
                deviceType: "Fingerprint Scanner",
                isSelected: false,
            },
        ]
    );

    const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLogData[]>(
        [
            {
                id: 1,
                employeeId: "ABC200000",
                employeeName: "Ahmed Abdullah",
                device: "Cardiology",
                date: "2025-11-23",
                time: "08:00",
                logType: "CheckIn",
                attendanceStatus: "Present",
            },

            {
                id: 2,
                employeeId: "ABC200001",
                employeeName: "Sara Khan",
                device: "Pediatrics",
                date: "2025-11-25",
                time: "08:20",
                logType: "CheckOut",
                attendanceStatus: "Late",
            },
        ]
    );

    const toggleDeviceSelection = (id: number) => {
        if (syncMode === "all_devices") {
            return;
        }

        setDevices((prev) =>
            prev.map((device) =>
                device.id === id
                    ? { ...device, isSelected: !device.isSelected }
                    : device
            )
        );
    };

    const handleSyncAllDevices = () => {
        setSyncMode("all_devices");

        setDevices((prev) =>
            prev.map((device) => ({
                ...device,
                isSelected: true,
            }))
        );

        setCurrentStep(2);
    };

    const handleSyncSelectedDevices = () => {
        setSyncMode("selected_devices");

        setDevices((prev) =>
            prev.map((device) => ({
                ...device,
                isSelected: false,
            }))
        );

        setCurrentStep(2);
    };

    const handleContinue = () => {
        const selected = devices.filter((device) => device.isSelected);

        if (selected.length === 0) {
            alert("Please select at least one device.");
            return;
        }

        setCurrentStep(3);
    };

    const handleEditLogs = () => {
        setIsEditingLogs(true);
    };

    const handleLogChange = (id: number, field: keyof AttendanceLogData, value: string) => {
        setAttendanceLogs((prev) =>
            prev.map((log) => (log.id === id ? { ...log, [field]: value } : log))
        );
    };

    useEffect(() => {
        if (isEditingLogs) {
            const initial: Record<number, DropdownOption> = {};

            attendanceLogs.forEach((log) => {
                const match = LOG_TYPE_OPTIONS.find(
                    (opt) => opt.id === log.logType
                );

                if (match) {
                    initial[log.id] = match;
                }
            });

            setSelectedLogTypes(initial);
        }
    }, [isEditingLogs, attendanceLogs]);

    const handleFinalSave = () => {
        const selectedDevices = devices.filter((device) => device.isSelected);

        console.log("Selected Devices", selectedDevices);
        console.log("Attendance Logs", attendanceLogs);

        handleClose();
        setCurrentStep(1);
    };

    const [deviceCurrentPage, setDeviceCurrentPage] = useState(1);
    const [deviceRowsPerPage, setDeviceRowsPerPage] = useState(10);

    const deviceColumns: ColumnActionRow<DeviceData>[] = [
        {
            key: "id",
            header: <>ID</>,
            className: "text-center",
        },

        {
            key: "deviceName",
            header: <>Device Name</>,
            className: "text-center",
        },

        {
            key: "ipAddress",
            header: <>IP Address</>,
            className: "text-center",
        },

        {
            key: "port",
            header: <>Port</>,
            className: "text-center",
        },

        {
            key: "deviceType",
            header: <>Device Type</>,
            className: "text-center",
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "100px",

            render: (row) => (

                <div className="d-flex justify-content-center">

                    <button
                        type="button"
                        className={`device-check-btn ${row.isSelected ? "active" : ""
                            }`}
                        disabled={syncMode === "all_devices"}
                        onClick={() =>
                            toggleDeviceSelection(row.id)
                        }
                    >
                        <i className="ri-check-line"></i>
                    </button>

                </div>

            ),
        },
    ];

    /********************************************
        Device Pagination
    *********************************************/
    const deviceTotalPages = useMemo(
        () => Math.ceil(devices.length / deviceRowsPerPage),
        [devices.length, deviceRowsPerPage]
    );

    const visibleDeviceData = useMemo(() => {
        const startIndex = (deviceCurrentPage - 1) * deviceRowsPerPage;
        const endIndex = startIndex + deviceRowsPerPage;

        return devices.slice(startIndex, endIndex);
    }, [devices, deviceCurrentPage, deviceRowsPerPage]);

    /********************************************
        Attandance Log Pagination
    *********************************************/
    const [logsCurrentPage, setLogsCurrentPage] = useState(1);
    const [logsRowsPerPage, setLogsRowsPerPage] = useState(10);

    const [selectedLogTypes, setSelectedLogTypes] = useState<Record<number, DropdownOption | null>>({});
    const LOG_TYPE_OPTIONS: DropdownOption[] = [
        {
            id: "CheckIn",
            name: "CheckIn",
        },
        {
            id: "CheckOut",
            name: "CheckOut",
        },
    ];

    const logsTotalPages = useMemo(
        () => Math.ceil(attendanceLogs.length / logsRowsPerPage),
        [attendanceLogs.length, logsRowsPerPage]
    );

    const visibleAttendanceLogs = useMemo(() => {
        const startIndex = (logsCurrentPage - 1) * logsRowsPerPage;
        const endIndex = startIndex + logsRowsPerPage;

        return attendanceLogs.slice(startIndex, endIndex);
    }, [attendanceLogs, logsCurrentPage, logsRowsPerPage]);


    const attendanceLogColumns: ColumnActionRow<AttendanceLogData>[] = [

        {
            key: "employeeId",
            header: <>ID</>,
            className: "text-center",
        },

        {
            key: "employeeName",
            header: <>Name</>,
            className: "text-center",
        },

        {
            key: "device",
            header: <>Device</>,
            className: "text-center",
        },

        {
            key: "date",
            header: <>Date</>,
            className: "text-center",
        },

        {
            key: "time",
            header: <>Time</>,
            className: "text-center",
        },

        {
            key: "logType",
            header: <>Log Type</>,
            className: "text-center text-nowrap",

            render: (row) => (
                <span
                    className={
                        row.logType === "CheckIn"
                            ? "status-completed"
                            : "status-pending"
                    }
                >
                    {row.logType}
                </span>
            ),
        },

        {
            key: "attendanceStatus",
            header: <>Attendance Status</>,
            className: "text-center",

            render: (row) => (
                <span
                    className={
                        row.attendanceStatus === "Present"
                            ? "status-completed"
                            : "status-pending"
                    }
                >
                    {row.attendanceStatus}
                </span>
            ),
        },
    ];


    return (

        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="xl"
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
                    aria-label="Close"
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    {currentStep === 1 ? "Sync & Import Logs" : "Sync Selected Device"}
                </Modal.Title>

            </Modal.Header>

            {/* STEP 1 */}
            {currentStep === 1 && (
                <>
                    <Modal.Body className="p-0">

                        <div className="text-center mb-3">
                            <p className="fs-18 fw-500 mb-1">
                                Are you sure you want to sync all biometric devices?
                            </p>
                            <p className="fs-16 text-muted fw-500">
                                This action will import the latest attendance data from connected devices.
                            </p>
                        </div>

                        <div className="d-flex gap-3 mt-4">
                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 col bg-blue text-white"
                                onClick={handleSyncAllDevices}
                            >
                                Sync All Devices
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height col border-blue text-blue bg-white"
                                onClick={handleSyncSelectedDevices}
                            >
                                Sync Selected Device
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height col border-red text-red bg-white"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </Modal.Body>
                </>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
                <>
                    <Modal.Body>

                        <div className="d-flex flex-column mb-4">

                            <GlobalGridTable
                                data={visibleDeviceData}
                                columns={deviceColumns}
                                currentPage={deviceCurrentPage}
                                pageSize={deviceRowsPerPage}
                            />

                            <Pagination
                                totalPages={deviceTotalPages}
                                currentPage={deviceCurrentPage}
                                onPageChange={setDeviceCurrentPage}
                                rowsPerPage={deviceRowsPerPage}
                                onRowsPerPageChange={(rows) => {
                                    setDeviceRowsPerPage(rows);
                                    setDeviceCurrentPage(1);
                                }}
                            />

                        </div>

                        <div className="d-flex justify-content-between gap-3">
                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 col-md-6 bg-blue text-white"
                                onClick={handleContinue}
                            >
                                Save & Continue
                            </button>
                            <button
                                type="button"
                                className="aph-modal-btn-height col-md-5 border-red text-red bg-white"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </Modal.Body>
                </>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
                <>
                    <Modal.Body>
                        <div className="d-flex flex-column">

                            {!isEditingLogs ? (
                                <>
                                    {/* VIEW MODE */}
                                    <GlobalGridTable
                                        data={visibleAttendanceLogs}
                                        columns={attendanceLogColumns}
                                        currentPage={logsCurrentPage}
                                        pageSize={logsRowsPerPage}
                                    />

                                    <Pagination
                                        totalPages={logsTotalPages}
                                        currentPage={logsCurrentPage}
                                        onPageChange={setLogsCurrentPage}
                                        rowsPerPage={logsRowsPerPage}
                                        onRowsPerPageChange={(rows) => {
                                            setLogsRowsPerPage(rows);
                                            setLogsCurrentPage(1);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    {/* EDIT MODE (moved from Step 4 here) */}
                                    <div className="attendance-edit-table">
                                        <table className="table align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Employee Name</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Log Type</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {attendanceLogs.map((log) => (
                                                    <tr key={log.id}>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                className="customInput"
                                                                value={log.employeeName}
                                                                onChange={(e) =>
                                                                    handleLogChange(
                                                                        log.id,
                                                                        "employeeName",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="date"
                                                                className="customInput"
                                                                value={log.date}
                                                                onChange={(e) =>
                                                                    handleLogChange(
                                                                        log.id,
                                                                        "date",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </td>

                                                        <td>
                                                            <input
                                                                type="time"
                                                                className="customInput"
                                                                value={log.time}
                                                                onChange={(e) =>
                                                                    handleLogChange(
                                                                        log.id,
                                                                        "time",
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </td>

                                                        <td className="log-type-cell">
                                                            <CustomFormDropdown
                                                                options={LOG_TYPE_OPTIONS}
                                                                value={selectedLogTypes[log.id] || null}
                                                                onChange={(value) => {
                                                                    setSelectedLogTypes((prev) => ({
                                                                        ...prev,
                                                                        [log.id]: value,
                                                                    }));

                                                                    if (value?.id) {
                                                                        handleLogChange(
                                                                            log.id,
                                                                            "logType",
                                                                            value.id
                                                                        );
                                                                    }
                                                                }}
                                                                placeholder="Select Log Type"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}

                        </div>

                        <div className="d-flex justify-content-between gap-3 mt-4">

                            {!isEditingLogs ? (
                                <>
                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 col-md-5 bg-blue text-white"
                                        onClick={handleFinalSave}
                                    >
                                        Save & Continue
                                    </button>

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-blue col-md-3 bg-white text-blue"
                                        onClick={handleEditLogs}
                                    >
                                        Edit Logs
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 col-md-5 bg-blue text-white"
                                        onClick={() => setIsEditingLogs(false)}
                                    >
                                        Save & Finish
                                    </button>

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height col-md-3 border-red text-red bg-white"
                                        onClick={() => setIsEditingLogs(false)}
                                    >
                                        Cancel Edit
                                    </button>
                                </>
                            )}

                            <button
                                type="button"
                                className="aph-modal-btn-height col-md-3 border-red text-red bg-white"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </Modal.Body>
                </>
            )}

        </Modal >

    );
}