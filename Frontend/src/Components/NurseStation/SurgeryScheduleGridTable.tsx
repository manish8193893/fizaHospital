import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import * as bootstrap from "bootstrap";
import FullCalendar from "@fullcalendar/react";

import dayGridPlugin
    from "@fullcalendar/daygrid";

import timeGridPlugin
    from "@fullcalendar/timegrid";

import listPlugin
    from "@fullcalendar/list";

import interactionPlugin
    from "@fullcalendar/interaction";

import Pagination from "../../GlobalHelpers/Pagination";

import CustomFilterDropdown from "../../GlobalHelpers/CustomFilterDropdown";

import GlobalGridTable, {
    type ColumnActionRow,
} from "../../GlobalHelpers/GlobalGridTable";

import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";



import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";

/********************************************
    Name : Manish Kumar
    Date : 25/06/2026
    Purpose : Surgery Schedule Interface
*********************************************/
interface SurgeryScheduleData {
    id: string;
    operationDateTime: string;
    operationName: string;
    patientName: string;
    surgeryPrice: string;
    ageGender: string;
    notes: string;
    status:
    | "Done"
    | "Pending"
    | "Cancelled";
}

export default function SurgeryScheduleGridTable() {

    const [viewMode, setViewMode] =
        useState<"grid" | "calendar">(
            "grid"
        );

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Filter States
    *********************************************/
    const [globalSearch,
        setGlobalSearch] =
        useState("");

    const [selectedStatus,
        setSelectedStatus] =
        useState<DropdownOption | null>(
            null
        );

    const [selectedDate,
        setSelectedDate] =
        useState<Date | null>(null);

    const [showDateCalendar,
        setShowDateCalendar] =
        useState(false);

    const calendarRef =
        useRef<HTMLDivElement | null>(
            null
        );

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Status Filter Options
    *********************************************/
    const STATUS_OPTIONS:
        DropdownOption[] = [

            {
                id: "done",
                name: "Done",
            },

            {
                id: "pending",
                name: "Pending",
            },

            {
                id: "cancelled",
                name: "Cancelled",
            },
        ];

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Close Calendar On Outside Click
    *********************************************/
    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                calendarRef.current &&
                !calendarRef.current.contains(
                    event.target as Node
                )
            ) {

                setShowDateCalendar(
                    false
                );

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_SURGERY_DATA:
        SurgeryScheduleData[] = [

            {
                id: "SUR001",
                operationDateTime:
                    "25/06/2026 09:00 AM",
                operationName:
                    "Appendectomy",
                patientName:
                    "Manish Kashyap",
                surgeryPrice:
                    "₹25,000",
                ageGender:
                    "22 / Male",
                notes:
                    "Routine Surgery",
                status:
                    "Done",
            },

            {
                id: "SUR002",
                operationDateTime:
                    "25/06/2026 10:30 AM",
                operationName:
                    "Knee Replacement",
                patientName:
                    "Rahul Sharma",
                surgeryPrice:
                    "₹1,20,000",
                ageGender:
                    "45 / Male",
                notes:
                    "Left Knee",
                status:
                    "Pending",
            },

            {
                id: "SUR003",
                operationDateTime:
                    "25/06/2026 11:45 AM",
                operationName:
                    "Gallbladder Removal",
                patientName:
                    "Priya Verma",
                surgeryPrice:
                    "₹55,000",
                ageGender:
                    "30 / Female",
                notes:
                    "Laparoscopic",
                status:
                    "Done",
            },

            {
                id: "SUR004",
                operationDateTime:
                    "26/06/2026 09:30 AM",
                operationName:
                    "Heart Bypass",
                patientName:
                    "Arjun Kumar",
                surgeryPrice:
                    "₹2,80,000",
                ageGender:
                    "58 / Male",
                notes:
                    "High Risk",
                status:
                    "Pending",
            },

            {
                id: "SUR005",
                operationDateTime:
                    "26/06/2026 01:00 PM",
                operationName:
                    "Cataract Surgery",
                patientName:
                    "Riya Singh",
                surgeryPrice:
                    "₹18,000",
                ageGender:
                    "62 / Female",
                notes:
                    "Right Eye",
                status:
                    "Cancelled",
            },

            {
                id: "SUR006",
                operationDateTime:
                    "27/06/2026 08:30 AM",
                operationName:
                    "Hernia Repair",
                patientName:
                    "Ankit Sharma",
                surgeryPrice:
                    "₹38,000",
                ageGender:
                    "34 / Male",
                notes:
                    "Day Care",
                status:
                    "Done",
            },

            {
                id: "SUR007",
                operationDateTime:
                    "27/06/2026 03:00 PM",
                operationName:
                    "Tonsillectomy",
                patientName:
                    "Neha Gupta",
                surgeryPrice:
                    "₹22,000",
                ageGender:
                    "19 / Female",
                notes:
                    "General Anaesthesia",
                status:
                    "Pending",
            },

            {
                id: "SUR008",
                operationDateTime:
                    "28/06/2026 12:00 PM",
                operationName:
                    "Spinal Fusion",
                patientName:
                    "Karan Mehta",
                surgeryPrice:
                    "₹3,10,000",
                ageGender:
                    "49 / Male",
                notes:
                    "Lumbar Region",
                status:
                    "Cancelled",
            },
        ];

    const calendarEvents =
        useMemo(() => {

            return ALL_SURGERY_DATA.map(
                (surgery) => {

                    const [
                        datePart,
                        timePart,
                        meridiem,
                    ] =
                        surgery.operationDateTime.split(
                            " "
                        );

                    const [
                        day,
                        month,
                        year,
                    ] = datePart.split("/");

                    let [
                        hour,
                        minute,
                    ] = timePart.split(":");

                    let hourNumber =
                        Number(hour);

                    if (
                        meridiem === "PM" &&
                        hourNumber !== 12
                    ) {
                        hourNumber += 12;
                    }

                    if (
                        meridiem === "AM" &&
                        hourNumber === 12
                    ) {
                        hourNumber = 0;
                    }

                    const startDate =
                        new Date(
                            Number(year),
                            Number(month) - 1,
                            Number(day),
                            hourNumber,
                            Number(minute)
                        );

                    return {

                        id: surgery.id,

                        title:
                            `${surgery.operationName}
                         - ${surgery.patientName}`,

                        start: startDate,

                        extendedProps: {
                            surgery,
                        },

                        backgroundColor:
                            surgery.status === "Done"
                                ? "#8BE3B2"
                                : surgery.status === "Pending"
                                    ? "#FFB3B3"
                                    : "#D9D9D9",

                        borderColor:
                            "transparent",
                    };
                }
            );

        }, []);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage,
        setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage,
        setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredSurgeries =
        useMemo(() => {

            return ALL_SURGERY_DATA.filter(
                (surgery) => {

                    const searchValue =
                        globalSearch.toLowerCase();

                    const matchesSearch =

                        surgery.operationName
                            .toLowerCase()
                            .includes(searchValue) ||

                        surgery.patientName
                            .toLowerCase()
                            .includes(searchValue) ||

                        surgery.status
                            .toLowerCase()
                            .includes(searchValue) ||

                        surgery.notes
                            .toLowerCase()
                            .includes(searchValue);

                    const matchesStatus =

                        !selectedStatus ||

                        surgery.status
                            .toLowerCase() ===
                        selectedStatus.name
                            .toLowerCase();

                    const formattedSelectedDate =
                        selectedDate
                            ? `${String(
                                selectedDate.getDate()
                            ).padStart(2, "0")}/${String(
                                selectedDate.getMonth() + 1
                            ).padStart(2, "0")}/${selectedDate.getFullYear()}`
                            : "";

                    const matchesDate =

                        !selectedDate ||

                        surgery.operationDateTime
                            .startsWith(
                                formattedSelectedDate
                            );

                    return (

                        matchesSearch &&
                        matchesStatus &&
                        matchesDate

                    );

                }
            );

        }, [

            globalSearch,
            selectedStatus,
            selectedDate,

        ]);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Total Pages
    *********************************************/
    const totalPages = Math.ceil(
        filteredSurgeries.length /
        itemsPerPage
    );

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Visible Data
    *********************************************/
    const visibleTableData =
        useMemo(() => {

            const startIndex =
                (currentPage - 1) *
                itemsPerPage;

            const endIndex =
                startIndex +
                itemsPerPage;

            return filteredSurgeries.slice(
                startIndex,
                endIndex
            );

        }, [

            filteredSurgeries,
            currentPage,
            itemsPerPage,

        ]);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Bootstrap Tooltips
    *********************************************/
    useEffect(() => {

        const tooltipElements =
            document.querySelectorAll(
                '[data-bs-toggle="tooltip"]'
            );

        tooltipElements.forEach(
            (element) => {

                new bootstrap.Tooltip(
                    element
                );

            }
        );

        return () => {

            tooltipElements.forEach(
                (element) => {

                    const tooltip =
                        bootstrap.Tooltip.getInstance(
                            element
                        );

                    if (tooltip) {

                        tooltip.dispose();

                    }

                }
            );

        };

    }, [visibleTableData]);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns:
        ColumnActionRow<SurgeryScheduleData>[] = [

            {
                key: "operationDateTime",
                header: <>Operation Date & Time</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "operationName",
                header: <>Operation Name</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "patientName",
                header: <>Patient Name</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "surgeryPrice",
                header: <>Surgery Price</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "ageGender",
                header: <>Age / Gender</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "notes",
                header: <>Notes</>,
                className: "text-center text-nowrap",
            },

            {
                key: "status",
                header: <>Status</>,
                className: "text-center",

                render: (row) => (

                    <div className="d-flex justify-content-center">

                        <span
                            className={`px-3 py-1 rounded-pill text-xs fw-medium
                                
                            ${row.status === "Done"
                                    ? "status-completed"
                                    : row.status === "Pending"
                                        ? "status-pending"
                                        : "status-cancelled"
                                }`}
                        >
                            {row.status}
                        </span>

                    </div>

                ),
            },

            {
                key: "action",
                header: <>Action</>,
                className: "text-center",
                width: "140px",

                render: (row) => (

                    <div className="d-flex justify-content-center gap-2">

                        <button
                            type="button"
                            className="eye"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="View Surgery Details"
                            onClick={() =>
                                console.log(
                                    "View",
                                    row
                                )
                            }
                        >
                            <i className="fs-18 ri-eye-line"></i>
                        </button>

                        <button
                            type="button"
                            className="printer"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Print Surgery Report"
                            onClick={() =>
                                console.log(
                                    "Print",
                                    row
                                )
                            }
                        >
                            <i className="fs-18 ri-printer-line"></i>
                        </button>

                    </div>

                ),
            },

        ];

    return (
        <>

            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">

                <p className="fs-18 fw-500">
                    Surgery Schedule
                </p>

                <button
                    className="d-flex border-0 justify-content-center align-items-center gap-2 py-1 px-3"
                    style={{ backgroundColor: "#A78CEA" }}
                    type="button"
                    onClick={() =>
                        setViewMode(
                            viewMode === "grid"
                                ? "calendar"
                                : "grid"
                        )
                    }
                >
                    <div className="text-white fs-14 fw-400">
                        {
                            viewMode === "grid"
                                ? "Calendar View"
                                : "Table View"
                        }
                    </div>
                    <i className="ri-calendar-2-line fs-18 text-white"></i>
                </button>

            </div>

            {
                viewMode === "grid" ? (
                    <>
                        <div className="aph-modal-filter-row mb-4">

                            {/* Search */}

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

                            {/* Date Filter */}

                            <div
                                className="aph-calendar-filter"
                                ref={calendarRef}
                            >

                                <button
                                    className="aph-filter-btn outline-0"
                                    onClick={() =>
                                        setShowDateCalendar(
                                            !showDateCalendar
                                        )
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

                                {showDateCalendar && (

                                    <div className="aph-calendar-popup">

                                        <DateFilterCalendar
                                            selectedDate={
                                                selectedDate
                                            }
                                            onDateSelect={(date) => {

                                                setSelectedDate(
                                                    date
                                                );

                                                setShowDateCalendar(
                                                    false
                                                );

                                                setCurrentPage(
                                                    1
                                                );

                                            }}
                                        />

                                    </div>

                                )}

                            </div>

                            {/* Status */}

                            <div>

                                <CustomFilterDropdown
                                    options={
                                        STATUS_OPTIONS
                                    }
                                    value={
                                        selectedStatus
                                    }
                                    placeholder="Status"
                                    customClass="aph-filter-dropdown"
                                    onChange={(selected) => {

                                        setSelectedStatus(
                                            selected
                                        );

                                        setCurrentPage(
                                            1
                                        );

                                    }}
                                />

                            </div>

                            {/* Reset */}

                            <button
                                className="aph-filter-btn outline-0"
                                onClick={() => {

                                    setGlobalSearch("");

                                    setSelectedStatus(
                                        null
                                    );

                                    setSelectedDate(
                                        null
                                    );

                                    setCurrentPage(
                                        1
                                    );

                                }}
                            >

                                <i className="ri-filter-off-line"></i>

                            </button>

                        </div>

                        {/* Grid */}

                        <div className="d-flex flex-column">

                            <GlobalGridTable
                                data={visibleTableData}
                                columns={columns}
                                currentPage={currentPage}
                                pageSize={itemsPerPage}
                            />

                            <Pagination
                                totalPages={
                                    totalPages
                                }
                                currentPage={
                                    currentPage
                                }
                                onPageChange={(page) =>
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

                                    setCurrentPage(
                                        1
                                    );

                                }}
                            />

                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white p-3 rounded">

                            <FullCalendar

                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    listPlugin,
                                    interactionPlugin,
                                ]}

                                initialView="dayGridMonth"

                                headerToolbar={{
                                    left:
                                        "prev,next today",

                                    center:
                                        "title",

                                    right:
                                        "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                                }}

                                events={calendarEvents}

                                height="100vh"

                                editable={false}

                                selectable={true}

                                dayMaxEvents={true}

                                eventClick={(info) => {

                                    console.log(
                                        "Selected Surgery",
                                        info.event.extendedProps
                                            .surgery
                                    );

                                }}
                            />

                        </div>

                    </>
                )}
        </>
    )
}