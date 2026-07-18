import { useEffect, useMemo, useRef, useState, } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";



import { useNavigate } from "react-router-dom";

/********************************************
    Name : Manish Kumar
    Date : 27/06/2026
    Purpose : Surgery Request Interface
*********************************************/
interface SurgeryRequestData {
    fileNo: string;
    patientName: string;
    ageGender: string;
    department: string;
    date: string;
    admissionTime: string;
    doctorName: string;
    anesthetistName: string;
    status:
    | "Approved"
    | "Pending"
    | "Cancelled";
}

export default function SurgeryRequestGridTable() {

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Filter States
    *********************************************/
    const [globalSearch, setGlobalSearch] = useState("");
    const calendarRef = useRef<HTMLDivElement | null>(null);
    const [showDateCalendar, setShowDateCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);

    const navigate = useNavigate();

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
        { id: "ent", name: "ENT", },
        { id: "gynecology", name: "Gynecology", },
        { id: "urology", name: "Urology", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Status Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        { id: "approved", name: "Approved", },
        { id: "pending", name: "Pending", },
        { id: "cancelled", name: "Cancelled", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Close Calendar
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
        Purpose : Dummy Data
    *********************************************/
    const ALL_SURGERY_REQUEST_DATA: SurgeryRequestData[] = [

        {
            fileNo: "FIL001",
            patientName: "Manish Kashyap",
            ageGender: "22 / Male",
            department: "Cardiology",
            date: "27/06/2026",
            admissionTime: "09:00 AM",
            doctorName: "Dr. Amit Sharma",
            anesthetistName: "Dr. Pooja Mehta",
            status: "Pending",
        },

        {
            fileNo: "FIL002",
            patientName: "Rahul Sharma",
            ageGender: "40 / Male",
            department: "Orthopedics",
            date: "27/06/2026",
            admissionTime: "10:30 AM",
            doctorName: "Dr. Vivek Singh",
            anesthetistName: "Dr. Kavita Jain",
            status: "Approved",
        },

        {
            fileNo: "FIL003",
            patientName: "Priya Verma",
            ageGender: "31 / Female",
            department: "Neurology",
            date: "28/06/2026",
            admissionTime: "08:45 AM",
            doctorName: "Dr. Rohit Gupta",
            anesthetistName: "Dr. Ritu Kapoor",
            status: "Cancelled",
        },

        {
            fileNo: "FIL004",
            patientName: "Aman Singh",
            ageGender: "52 / Male",
            department: "General Surgery",
            date: "28/06/2026",
            admissionTime: "11:15 AM",
            doctorName: "Dr. Rajesh Kumar",
            anesthetistName: "Dr. Anita Singh",
            status: "Approved",
        },

        {
            fileNo: "FIL005",
            patientName: "Neha Gupta",
            ageGender: "28 / Female",
            department: "ENT",
            date: "29/06/2026",
            admissionTime: "12:00 PM",
            doctorName: "Dr. Arvind Sharma",
            anesthetistName: "Dr. Sonia Verma",
            status: "Pending",
        },

        {
            fileNo: "FIL006",
            patientName: "Riya Sharma",
            ageGender: "35 / Female",
            department: "Gynecology",
            date: "29/06/2026",
            admissionTime: "02:30 PM",
            doctorName: "Dr. Meena Kapoor",
            anesthetistName: "Dr. Ravi Jain",
            status: "Approved",
        },

        {
            fileNo: "FIL007",
            patientName: "Karan Mehta",
            ageGender: "48 / Male",
            department: "Urology",
            date: "30/06/2026",
            admissionTime: "09:30 AM",
            doctorName: "Dr. Sandeep Verma",
            anesthetistName: "Dr. Priya Gupta",
            status: "Pending",
        },

        {
            fileNo: "FIL008",
            patientName: "Ankit Verma",
            ageGender: "55 / Male",
            department: "Cardiology",
            date: "30/06/2026",
            admissionTime: "03:15 PM",
            doctorName: "Dr. Ashish Sharma",
            anesthetistName: "Dr. Neha Kapoor",
            status: "Cancelled",
        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredRequests = useMemo(() => {
        return ALL_SURGERY_REQUEST_DATA.filter((request) => {
            const search = globalSearch.toLowerCase();

            const matchesSearch =
                request.fileNo.toLowerCase().includes(search) ||
                request.patientName.toLowerCase().includes(search) ||
                request.department.toLowerCase().includes(search) ||
                request.doctorName.toLowerCase().includes(search) ||
                request.anesthetistName.toLowerCase().includes(search);

            const matchesDepartment =
                !selectedDepartment ||
                request.department.toLowerCase() === selectedDepartment.name.toLowerCase();

            const matchesStatus =
                !selectedStatus ||
                request.status.toLowerCase() === selectedStatus.name.toLowerCase();

            const formattedDate = selectedDate
                ? `${String(selectedDate.getDate()).padStart(2, "0")}/${String(selectedDate.getMonth() + 1).padStart(2, "0")}/${selectedDate.getFullYear()}`
                : "";

            const matchesDate = !selectedDate || request.date === formattedDate;

            return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
        });
    }, [globalSearch, selectedDepartment, selectedStatus, selectedDate]);

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Total Pages
    *********************************************/
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Visible Data
    *********************************************/
    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredRequests.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredRequests, currentPage, itemsPerPage]);

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Bootstrap Tooltips
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
        Date : 27/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns: ColumnActionRow<SurgeryRequestData>[] = [

        {
            key: "fileNo",
            header: <>File No</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "patientName",
            header: <>Patient Name</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "ageGender",
            header: <>Age / Gender</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "department",
            header: <>Department</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "date",
            header: <>Date</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "admissionTime",
            header: <>Admission Time</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "doctorName",
            header: <>Doctor Name</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "anesthetistName",
            header: <>Anesthetist Name</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",

            render: (row) => (

                <div className="d-flex justify-content-center">

                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium

                            ${row.status === "Approved"
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

                    {/* View */}

                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View Details"
                        onClick={() =>
                            console.log(
                                "View",
                                row
                            )
                        }
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    {/* Approve */}

                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Approve Reservation"
                        onClick={() =>
                            console.log(
                                "Approve",
                                row
                            )
                        }
                    >
                        <i className="ri-checkbox-circle-line fs-18"></i>
                    </button>

                    {/* Log Used Items */}

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Log Used Items"
                        onClick={() =>
                            console.log(
                                "Used Items",
                                row
                            )
                        }
                    >
                        <i className="ri-file-list-3-line fs-18"></i>
                    </button>

                    {/* Download */}

                    <button
                        type="button"
                        className="Check-In"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Download Referring Paper"
                        onClick={() =>
                            console.log(
                                "Download",
                                row
                            )
                        }
                    >
                        <i className="ri-file-download-line fs-18"></i>
                    </button>

                </div>

            ),

        },

    ];

    return (
        <>

            {/* Heading */}

            <div className="d-flex justify-content-between align-items-center gap-3 my-4">

                <p className="fs-18 fw-500">Surgery Request</p>

                <div className="Plus-btn" onClick={() => navigate("/surgical-management/SurgicalQueues")}>
                    <div className="text-white fs-14 fw-400">New Operation Request</div>
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

                {/* Date */}

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

                                    setCurrentPage(1);

                                }}
                            />

                        </div>

                    )}

                </div>

                {/* Department */}

                <div>

                    <CustomFilterDropdown
                        options={
                            DEPARTMENT_OPTIONS
                        }
                        value={
                            selectedDepartment
                        }
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

                            setCurrentPage(1);

                        }}
                    />

                </div>

                {/* Reset */}

                <button
                    className="aph-filter-btn outline-0"
                    onClick={() => {

                        setGlobalSearch("");

                        setSelectedDepartment(
                            null
                        );

                        setSelectedStatus(
                            null
                        );

                        setSelectedDate(
                            null
                        );

                        setCurrentPage(1);

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

        </>
    );
}