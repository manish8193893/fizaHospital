import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from 'bootstrap';

import Pagination from "../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import GlobalGridTable, {type ColumnActionRow,} from "../../GlobalHelpers/GlobalGridTable";



import "../../styles/HumanResource.css";

/********************************************
    Name : Manish Kumar
    Date : 09/06/2026
    Purpose : Attendance
*********************************************/
interface AttendanceTableData {
    id: number;
    date: string;
    checkInTime: string;
    checkOutTime: string;
    totalWorkingHours: string;
    attendanceStatus: "Present" | "Late" | "Absent";
}

export default function Attendance() {

    const calendarRef = useRef<HTMLDivElement>(null);

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    const ALL_ATTENDANCE_DATA: AttendanceTableData[] = [
        {
            id: 1,
            date: "23/11/2025",
            checkInTime: "08:00",
            checkOutTime: "16:00",
            totalWorkingHours: "8h",
            attendanceStatus: "Present",
        },
        {
            id: 2,
            date: "23/11/2025",
            checkInTime: "08:20",
            checkOutTime: "16:00",
            totalWorkingHours: "7h 40m",
            attendanceStatus: "Late",
        },
        {
            id: 3,
            date: "24/11/2025",
            checkInTime: "08:05",
            checkOutTime: "16:15",
            totalWorkingHours: "8h 10m",
            attendanceStatus: "Present",
        },
        {
            id: 4,
            date: "25/11/2025",
            checkInTime: "--",
            checkOutTime: "--",
            totalWorkingHours: "--",
            attendanceStatus: "Absent",
        },
        {
            id: 5,
            date: "26/11/2025",
            checkInTime: "08:30",
            checkOutTime: "16:00",
            totalWorkingHours: "7h 30m",
            attendanceStatus: "Late",
        },
        {
            id: 6,
            date: "27/11/2025",
            checkInTime: "08:00",
            checkOutTime: "16:00",
            totalWorkingHours: "8h",
            attendanceStatus: "Present",
        },
        {
            id: 7,
            date: "28/11/2025",
            checkInTime: "07:55",
            checkOutTime: "16:10",
            totalWorkingHours: "8h 15m",
            attendanceStatus: "Present",
        },
        {
            id: 8,
            date: "29/11/2025",
            checkInTime: "--",
            checkOutTime: "--",
            totalWorkingHours: "--",
            attendanceStatus: "Absent",
        },
        {
            id: 9,
            date: "30/11/2025",
            checkInTime: "08:12",
            checkOutTime: "16:00",
            totalWorkingHours: "7h 48m",
            attendanceStatus: "Late",
        },
        {
            id: 10,
            date: "01/12/2025",
            checkInTime: "08:00",
            checkOutTime: "16:20",
            totalWorkingHours: "8h 20m",
            attendanceStatus: "Present",
        },
        {
            id: 11,
            date: "02/12/2025",
            checkInTime: "08:02",
            checkOutTime: "16:00",
            totalWorkingHours: "7h 58m",
            attendanceStatus: "Present",
        },
        {
            id: 12,
            date: "03/12/2025",
            checkInTime: "08:35",
            checkOutTime: "16:00",
            totalWorkingHours: "7h 25m",
            attendanceStatus: "Late",
        },
        {
            id: 13,
            date: "04/12/2025",
            checkInTime: "08:00",
            checkOutTime: "16:05",
            totalWorkingHours: "8h 05m",
            attendanceStatus: "Present",
        },
        {
            id: 14,
            date: "05/12/2025",
            checkInTime: "--",
            checkOutTime: "--",
            totalWorkingHours: "--",
            attendanceStatus: "Absent",
        },
        {
            id: 15,
            date: "06/12/2025",
            checkInTime: "08:10",
            checkOutTime: "16:00",
            totalWorkingHours: "7h 50m",
            attendanceStatus: "Late",
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
    const filteredAttendance = useMemo(() => {

        return ALL_ATTENDANCE_DATA.filter(
            (attendance) => {

                const searchValue =
                    globalSearch.toLowerCase();

                const matchesSearch =
                    attendance.id
                        .toString()
                        .toLowerCase()
                        .includes(searchValue) ||
                    attendance.date
                        .toLowerCase()
                        .includes(searchValue) ||
                    attendance.checkInTime
                        .toLowerCase()
                        .includes(searchValue) ||
                    attendance.checkOutTime
                        .toLowerCase()
                        .includes(searchValue) ||
                    attendance.totalWorkingHours
                        .toLowerCase()
                        .includes(searchValue) ||
                    attendance.attendanceStatus
                        .toLowerCase()
                        .includes(searchValue);

                let matchesDate = true;

                if (selectedDate) {

                    const formattedSelectedDate =
                        `${String(
                            selectedDate.getDate()
                        ).padStart(2, "0")}/${String(
                            selectedDate.getMonth() + 1
                        ).padStart(2, "0")}/${selectedDate.getFullYear()}`;

                    matchesDate =
                        attendance.date ===
                        formattedSelectedDate;

                }

                return (
                    matchesSearch &&
                    matchesDate
                );

            }
        );

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
        filteredAttendance.length /
        itemsPerPage
    );

    /********************************************
        Name : Manish Kumar
        Date : 13/06/2026
        Purpose : Visible Attendance Data
    *********************************************/
    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredAttendance.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredAttendance,
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
    const columns: ColumnActionRow<AttendanceTableData>[] = [
        {
            key: "date",
            header: <>Date</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },
        {
            key: "attendanceStatus",
            header: <>Attendance Status</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            render: (row) => (
                <div className="d-flex justify-content-center">

                    <span
                        className={`attendance-status-pill ${row.attendanceStatus === "Present"
                            ? "attendance-present"
                            : row.attendanceStatus === "Late"
                                ? "attendance-late"
                                : "attendance-absent"
                            }`}
                    >
                        {row.attendanceStatus}
                    </span>

                </div>
            ),
        },
        {
            key: "checkInTime",
            header: <>Check In Time</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },
        {
            key: "checkOutTime",
            header: <>Check Out Time</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },
        {
            key: "totalWorkingHours",
            header: <>Total Working Hours</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "100px",

            render: (row) => (
                <div className="d-flex justify-content-center">

                    <button
                        key={row.id}
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View"
                    >
                        <i className="ri-eye-line fs-18"></i>
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
            <div className="formContainer p-2 rounded-1 position-relative">

                {/* Header */}

                <div className="d-flex justify-content-between mb-4">

                    <h5 className="fs-18 fw-500">
                        Attendance
                    </h5>

                    <div className="d-flex gap-2">

                        <button className="back-btn">
                            <i className="ri-pencil-ai-line fs-18"></i>
                        </button>

                    </div>

                </div>

                <div className="d-flex flex-column">

                    <div className="row g-3 mb-4">

                        <div className="col-xl-3 col-md-6">
                            <div className="d-flex justify-content-between attendance-summary-card attendance-orange">
                                <h5 className="fw-500 fs-16">6 hr</h5>
                                <p className="mb-0">Total Delay</p>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="d-flex justify-content-between attendance-summary-card attendance-red">
                                <h5 className="fw-500 fs-16">2</h5>
                                <p className="mb-0">Absence Days</p>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="d-flex justify-content-between attendance-summary-card attendance-cyan">
                                <h5 className="fw-500 fs-16">2</h5>
                                <p className="mb-0">Leaves</p>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6">
                            <div className="d-flex justify-content-between attendance-summary-card attendance-blue">
                                <h5 className="fw-500 fs-16">01-03-2025 to 01-03-2026</h5>
                            </div>
                        </div>

                    </div>

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

                            <div className="row m-auto g-4">

                                {visibleTableData.map((attendance) => (

                                    <div
                                        className="col-xl-4 col-lg-6 my-3"
                                        key={attendance.id}
                                    >

                                        <div className="attendance-grid-card">

                                            <div className="d-flex justify-content-between align-items-center">

                                                <h5 className="fw-500 fs-16 mb-0">
                                                    {attendance.date}
                                                </h5>

                                                <span
                                                    className={`attendance-status-pill ${attendance.attendanceStatus === "Present"
                                                        ? "attendance-present"
                                                        : attendance.attendanceStatus === "Late"
                                                            ? "attendance-late"
                                                            : "attendance-absent"
                                                        }`}
                                                >
                                                    {attendance.attendanceStatus}
                                                </span>

                                            </div>

                                            <hr className="my-2" />

                                            <div className="d-flex flex-column gap-2">

                                                <div className="d-flex gap-2">
                                                    <span className="fs-14 fw-500">Check In:</span>
                                                    <strong className="fs-14 fw-500">{attendance.checkInTime}</strong>
                                                </div>

                                                <div className="d-flex gap-2">
                                                    <span className="fs-14 fw-500">Check Out:</span>
                                                    <strong className="fs-14 fw-500">{attendance.checkOutTime}</strong>
                                                </div>

                                                <div className="d-flex gap-2">
                                                    <span className="fs-14 fw-500">Working Hours:</span>
                                                    <strong className="fs-14 fw-500">{attendance.totalWorkingHours}</strong>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )
                    }

                    <div>
                        <Pagination
                            totalPages={
                                totalPages
                            }
                            currentPage={
                                currentPage
                            }
                            onPageChange={(
                                page
                            ) =>
                                setCurrentPage(
                                    page
                                )
                            }
                            rowsPerPage={
                                itemsPerPage
                            }
                            onRowsPerPageChange={(
                                rows
                            ) => {
                                setItemsPerPage(
                                    rows
                                );
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}