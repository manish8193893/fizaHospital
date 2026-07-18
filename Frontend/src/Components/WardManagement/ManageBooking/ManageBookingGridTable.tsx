import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";

import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";

import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";


import { AssignRoomBedModal } from "../InPatientAdmissionRequest/InPatientAdmissionRequestGridTable";
import { useNavigate } from "react-router-dom";

/********************************************
    Name : Manish Kumar
    Date : 24/06/2026
    Purpose : Manage Booking Grid Table
*********************************************/
interface ManageBookingData {
    patientId: string;
    patientName: string;
    department: string;
    roomNo: string;
    bedNumber: string;
    doctorName: string;
    admissionDate: string;
    leaveDate: string;
    status: "Confirmed" | "Pending" | "Discharge";
}

export default function ManageBookingGridTable() {

    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<DropdownOption | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);
    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Assign Room Modal States
    *********************************************/
    const [showAssignRoomModal,
        setShowAssignRoomModal] =
        useState(false);

    const [selectedBookingRow,
        setSelectedBookingRow] =
        useState<ManageBookingData | null>(
            null
        );

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Status Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        {
            id: "confirmed",
            name: "Confirmed",
        },
        {
            id: "pending",
            name: "Pending",
        },
        {
            id: "discharge",
            name: "Discharge",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Department Options
    *********************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        {
            id: "cardiology",
            name: "Cardiology",
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
            id: "general_medicine",
            name: "General Medicine",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Doctor Options
    *********************************************/
    const DOCTOR_OPTIONS: DropdownOption[] = [
        {
            id: "doctor_1",
            name: "Dr. Rajesh Sharma",
        },
        {
            id: "doctor_2",
            name: "Dr. Amit Verma",
        },
        {
            id: "doctor_3",
            name: "Dr. Priya Singh",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_BOOKING_DATA: ManageBookingData[] = [

        {
            patientId: "PAT001",
            patientName: "Manish Kashyap",
            department: "Cardiology",
            roomNo: "Room 101",
            bedNumber: "Bed 1",
            doctorName: "Dr. Rajesh Sharma",
            admissionDate: "21/06/2026",
            leaveDate: "26/06/2026",
            status: "Confirmed",
        },

        {
            patientId: "PAT002",
            patientName: "Rahul Sharma",
            department: "Neurology",
            roomNo: "Room 101",
            bedNumber: "Bed 2",
            doctorName: "Dr. Amit Verma",
            admissionDate: "22/06/2026",
            leaveDate: "27/06/2026",
            status: "Pending",
        },

        {
            patientId: "PAT003",
            patientName: "Neha Gupta",
            department: "Orthopedics",
            roomNo: "Room 102",
            bedNumber: "Bed 1",
            doctorName: "Dr. Priya Singh",
            admissionDate: "20/06/2026",
            leaveDate: "25/06/2026",
            status: "Confirmed",
        },

        {
            patientId: "PAT004",
            patientName: "Aman Verma",
            department: "General Medicine",
            roomNo: "Room 102",
            bedNumber: "Bed 3",
            doctorName: "Dr. Rajesh Sharma",
            admissionDate: "19/06/2026",
            leaveDate: "24/06/2026",
            status: "Discharge",
        },

        {
            patientId: "PAT005",
            patientName: "Priya Sharma",
            department: "Cardiology",
            roomNo: "Room 201",
            bedNumber: "Bed 1",
            doctorName: "Dr. Amit Verma",
            admissionDate: "23/06/2026",
            leaveDate: "29/06/2026",
            status: "Pending",
        },

        {
            patientId: "PAT006",
            patientName: "Karan Singh",
            department: "Neurology",
            roomNo: "Room 201",
            bedNumber: "Bed 2",
            doctorName: "Dr. Rajesh Sharma",
            admissionDate: "21/06/2026",
            leaveDate: "28/06/2026",
            status: "Confirmed",
        },

        {
            patientId: "PAT007",
            patientName: "Riya Mehta",
            department: "Orthopedics",
            roomNo: "Room 301",
            bedNumber: "Bed 1",
            doctorName: "Dr. Priya Singh",
            admissionDate: "18/06/2026",
            leaveDate: "23/06/2026",
            status: "Discharge",
        },

        {
            patientId: "PAT008",
            patientName: "Arjun Kumar",
            department: "General Medicine",
            roomNo: "Room 301",
            bedNumber: "Bed 4",
            doctorName: "Dr. Amit Verma",
            admissionDate: "24/06/2026",
            leaveDate: "30/06/2026",
            status: "Pending",
        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredBookings =
        useMemo(() => {

            return ALL_BOOKING_DATA.filter(
                (booking) => {

                    const searchValue =
                        globalSearch.toLowerCase();

                    const matchesSearch =

                        booking.patientId
                            .toLowerCase()
                            .includes(searchValue) ||

                        booking.patientName
                            .toLowerCase()
                            .includes(searchValue) ||

                        booking.roomNo
                            .toLowerCase()
                            .includes(searchValue) ||

                        booking.bedNumber
                            .toLowerCase()
                            .includes(searchValue);

                    const matchesDate =
                        !selectedDate ||

                        booking.admissionDate ===
                        `${String(
                            selectedDate.getDate()
                        ).padStart(2, "0")}/${String(
                            selectedDate.getMonth() + 1
                        ).padStart(2, "0")}/${selectedDate.getFullYear()}`;

                    const matchesStatus =
                        !selectedStatus ||

                        booking.status.toLowerCase() ===
                        selectedStatus.name.toLowerCase();

                    const matchesDepartment =
                        !selectedDepartment ||

                        booking.department.toLowerCase() ===
                        selectedDepartment.name.toLowerCase();

                    const matchesDoctor =
                        !selectedDoctor ||

                        booking.doctorName.toLowerCase() ===
                        selectedDoctor.name.toLowerCase();

                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesDepartment &&
                        matchesDoctor &&
                        matchesDate
                    );

                }
            );

        }, [
            globalSearch,
            selectedStatus,
            selectedDepartment,
            selectedDoctor,
            selectedDate
        ]);


    /********************************************
Name : Manish Kumar
Date : 24/06/2026
Purpose : Visible Data
*********************************************/
    const totalPages = Math.ceil(
        filteredBookings.length /
        itemsPerPage
    );

    const visibleTableData =
        useMemo(() => {

            const startIndex =
                (currentPage - 1) *
                itemsPerPage;

            const endIndex =
                startIndex +
                itemsPerPage;

            return filteredBookings.slice(
                startIndex,
                endIndex
            );

        }, [
            filteredBookings,
            currentPage,
            itemsPerPage,
        ]);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Bootstrap Tooltips
    *********************************************/
    useEffect(() => {

        const tooltipElements =
            document.querySelectorAll(
                '[data-bs-toggle="tooltip"]'
            );

        tooltipElements.forEach((element) => {
            new bootstrap.Tooltip(element);
        });

        return () => {

            tooltipElements.forEach((element) => {

                const tooltip =
                    bootstrap.Tooltip.getInstance(
                        element
                    );

                if (tooltip) {
                    tooltip.dispose();
                }

            });

        };

    }, [visibleTableData]);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Close Calendar
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

                setShowCalendar(false);

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

    const handleOpenAssignRoomModal = (
        row: ManageBookingData
    ) => {

        setSelectedBookingRow(row);

        setShowAssignRoomModal(true);

    };

    const assignRoomModalRowData =
        useMemo(() => {

            if (!selectedBookingRow) {
                return null;
            }

            return {
                patientName:
                    selectedBookingRow.patientName,
                doctorName:
                    selectedBookingRow.doctorName,
                department:
                    selectedBookingRow.department,
                admissionDate:
                    selectedBookingRow.admissionDate,
                roomNo:
                    selectedBookingRow.roomNo,
                bedNumber:
                    selectedBookingRow.bedNumber,
            };

        }, [
            selectedBookingRow,
        ]);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Columns
    *********************************************/
    const columns:
        ColumnActionRow<ManageBookingData>[] = [

            {
                key: "patientId",
                header: <>Patient ID</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "patientName",
                header: <>Patient Name</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "department",
                header: <>Department</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "roomNo",
                header: <>Room No</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "bedNumber",
                header: <>Bed Number</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "doctorName",
                header: <>Doctor Name</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "admissionDate",
                header: <>Admission Date</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "leaveDate",
                header: <>Leave Date</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "status",
                header: <>Status</>,
                className: "text-center",

                render: (row) => (
                    <div className="d-flex justify-content-center">
                        <span
                            className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Confirmed"
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
                width: "240px",

                render: (row) => (

                    <div className="d-flex justify-content-center gap-2">

                        <button
                            type="button"
                            className="eye"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="View"
                            onClick={() => navigate("/ward-management/ManageBooking/ViewDetails")}
                        >
                            <i className="fs-18 ri-eye-line"></i>
                        </button>

                        <button
                            type="button"
                            className="edit"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Edit Details"
                            onClick={() =>
                                handleOpenAssignRoomModal(
                                    row
                                )
                            }
                        >
                            <i className="fs-18 ri-pencil-ai-line"></i>
                        </button>

                        <button
                            type="button"
                            className="Check-In"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Booking Extension"
                        >
                            <i className="fs-18 ri-time-line"></i>
                        </button>

                        <button
                            type="button"
                            className="printer"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Confirm Booking"
                            onClick={() =>
                                handleOpenAssignRoomModal(
                                    row
                                )
                            }
                        >
                            <i className="fs-18 ri-checkbox-circle-line"></i>
                        </button>

                        <button
                            type="button"
                            className="delete"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Discharge"
                            onClick={() =>
                                console.log(
                                    "Discharge",
                                    row.patientId
                                )
                            }
                        >
                            <i className="fs-18 ri-logout-box-r-line"></i>
                        </button>

                    </div>

                ),
            },

        ];

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedDate(null);
        setSelectedStatus(null);
        setSelectedDoctor(null);
        setSelectedDepartment(null);
        setCurrentPage(1);

    };

    return (
        <>
            <h5 className="fs-18 fw-500 mt-1 mb-4">
                Manage Booking
            </h5>

            {/* Filter Row */}
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

                {/* Date Filter */}
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
                                    selectedDate.getMonth() + 1
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
                                onDateSelect={(date) => {

                                    setSelectedDate(
                                        date
                                    );

                                    setShowCalendar(
                                        false
                                    );

                                }}
                            />

                        </div>

                    )}

                </div>

                <div>
                    <CustomFilterDropdown
                        options={STATUS_OPTIONS}
                        value={selectedStatus}
                        placeholder="Status"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedStatus(
                                selected
                            );

                            setCurrentPage(1);

                        }}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={DOCTOR_OPTIONS}
                        value={selectedDoctor}
                        placeholder="Doctor"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedDoctor(
                                selected
                            );

                            setCurrentPage(1);

                        }}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={DEPARTMENT_OPTIONS}
                        value={selectedDepartment}
                        placeholder="Department"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedDepartment(
                                selected
                            );

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

            <AssignRoomBedModal
                show={showAssignRoomModal}
                handleClose={() => {

                    setShowAssignRoomModal(
                        false
                    );

                    setSelectedBookingRow(
                        null
                    );

                }}
                rowData={assignRoomModalRowData}
            />

        </>
    );
}
