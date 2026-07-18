import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFilterDropdown from "../../GlobalHelpers/CustomFilterDropdown";
import GlobalGridTable, { type ColumnActionRow, type RowAction } from "../../GlobalHelpers/GlobalGridTable";

import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";
// import CheckIn from '../../../public/Assets/Icons/GlobalGridIcons/CheckIn.svg?react';
// import Radiology from '../../../public/Assets/Icons/SidebarIcons/Radiology.svg?react'
// import MedicalRecord from '../../../public/Assets/Icons/MedicalRecord.svg?react'
// import Laboratory from '../../../public/Assets/Icons/SidebarIcons/Laboratory.svg?react'


/********************************************
    Name : Manish Kumar
    Date : 04/06/2026
    Purpose : Patient Data interface
*********************************************/
interface DoctorPatientTableData {
    patientId: string;
    name: string;
    genderAge: string;
    time: string;
    visitType: | "Consultation/OutPatient" | "InPatient" | "Follow-Up" | "Emergency";
    status: | "Waiting" | "Paid" | "Cancelled" | "Checked-In" | "Completed";
}

export default function DoctorDashboardGridTable() {

    const calendarRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Filters State
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [globalSearch, setGlobalSearch] = useState("");
    const navigate = useNavigate();

    const statusOptions: DropdownOption[] = [
        { id: "waiting", name: "Waiting", },
        { id: "paid", name: "Paid", },
        { id: "cancelled", name: "Cancelled", },
        { id: "checked_in", name: "Checked-In", },
        { id: "completed", name: "Completed", },
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
        Date : 04/06/2026
        Purpose : Patient Dummy Data
    *********************************************/
    const ALL_PATIENT_DATA: DoctorPatientTableData[] = [
        {
            patientId: "15419",
            name: "Manish Kashyap",
            genderAge: "Male / 23",
            time: "03/06/2026 12:40 PM",
            visitType: "Consultation/OutPatient",
            status: "Waiting",
        },
        {
            patientId: "15420",
            name: "Aisha Noor",
            genderAge: "Female / 31",
            time: "03/06/2026 01:00 PM",
            visitType: "Follow-Up",
            status: "Checked-In",
        },
        {
            patientId: "15421",
            name: "Ahmed Ali",
            genderAge: "Male / 45",
            time: "03/06/2026 01:15 PM",
            visitType: "Emergency",
            status: "Paid",
        },
        {
            patientId: "15422",
            name: "Fatima Hassan",
            genderAge: "Female / 29",
            time: "03/06/2026 01:30 PM",
            visitType: "Consultation/OutPatient",
            status: "Waiting",
        },
        {
            patientId: "15423",
            name: "Yousef Ali",
            genderAge: "Male / 52",
            time: "03/06/2026 01:45 PM",
            visitType: "InPatient",
            status: "Completed",
        },
        {
            patientId: "15424",
            name: "Sara Mahmood",
            genderAge: "Female / 27",
            time: "03/06/2026 02:00 PM",
            visitType: "Follow-Up",
            status: "Paid",
        },
        {
            patientId: "15425",
            name: "Omar Farooq",
            genderAge: "Male / 38",
            time: "03/06/2026 02:15 PM",
            visitType: "Emergency",
            status: "Checked-In",
        },
        {
            patientId: "15426",
            name: "Noor Faisal",
            genderAge: "Female / 41",
            time: "03/06/2026 02:30 PM",
            visitType: "Consultation/OutPatient",
            status: "Waiting",
        },
        {
            patientId: "15427",
            name: "Bilal Nadeem",
            genderAge: "Male / 35",
            time: "03/06/2026 02:45 PM",
            visitType: "Follow-Up",
            status: "Completed",
        },
        {
            patientId: "15428",
            name: "Maryam Khalid",
            genderAge: "Female / 24",
            time: "03/06/2026 03:00 PM",
            visitType: "Consultation/OutPatient",
            status: "Cancelled",
        },
        {
            patientId: "15429",
            name: "Ali Jamal",
            genderAge: "Male / 47",
            time: "03/06/2026 03:15 PM",
            visitType: "InPatient",
            status: "Paid",
        },
        {
            patientId: "15430",
            name: "Rania Majid",
            genderAge: "Female / 33",
            time: "03/06/2026 03:30 PM",
            visitType: "Emergency",
            status: "Waiting",
        },
        {
            patientId: "15431",
            name: "Khalid Rahman",
            genderAge: "Male / 58",
            time: "03/06/2026 03:45 PM",
            visitType: "Follow-Up",
            status: "Completed",
        },
        {
            patientId: "15432",
            name: "Lina Tariq",
            genderAge: "Female / 26",
            time: "03/06/2026 04:00 PM",
            visitType: "Consultation/OutPatient",
            status: "Checked-In",
        },
        {
            patientId: "15433",
            name: "Hassan Badr",
            genderAge: "Male / 49",
            time: "03/06/2026 04:15 PM",
            visitType: "Emergency",
            status: "Paid",
        },
        {
            patientId: "15434",
            name: "Zaid Omar",
            genderAge: "Male / 30",
            time: "03/06/2026 04:30 PM",
            visitType: "Follow-Up",
            status: "Waiting",
        },
        {
            patientId: "15435",
            name: "Amina Saleh",
            genderAge: "Female / 37",
            time: "03/06/2026 04:45 PM",
            visitType: "InPatient",
            status: "Completed",
        },
        {
            patientId: "15436",
            name: "Reem Khalid",
            genderAge: "Female / 28",
            time: "03/06/2026 05:00 PM",
            visitType: "Consultation/OutPatient",
            status: "Checked-In",
        },
        {
            patientId: "15437",
            name: "Tariq Ahmed",
            genderAge: "Male / 42",
            time: "03/06/2026 05:15 PM",
            visitType: "Emergency",
            status: "Cancelled",
        },
        {
            patientId: "15438",
            name: "Nour Hassan",
            genderAge: "Female / 34",
            time: "03/06/2026 05:30 PM",
            visitType: "Follow-Up",
            status: "Waiting",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 04/06/2026
        Purpose : STATE VARIABLES  
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 04/06/2026
        Purpose : FILTERED DATA
    *********************************************/
    const filteredPatients = useMemo(() => {

        return ALL_PATIENT_DATA.filter((patient) => {

            // GLOBAL SEARC

            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                patient.patientId.toLowerCase().includes(searchValue) ||
                patient.name.toLowerCase().includes(searchValue) ||
                patient.genderAge.toLowerCase().includes(searchValue) ||
                patient.visitType.toLowerCase().includes(searchValue) ||
                patient.status.toLowerCase().includes(searchValue);

            // STATUS FILTE

            const matchesStatus =
                !selectedStatus ||
                patient.status.toLowerCase() ===
                selectedStatus.name.toLowerCase();

            // DATE FILTER

            let matchesDate = true;

            if (selectedDate) {

                const patientDate = patient.time.split(" ")[0];

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
                matchesDate
            );

        });

    }, [
        globalSearch,
        selectedStatus,
        selectedDate,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 04/06/2026
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

    /********************************************
        Name : Manish Kumar
        Date : 04/06/2026
        Purpose : COLUMNS ACTIONS
    *********************************************/
    const columns: ColumnActionRow<DoctorPatientTableData>[] = [
        {
            key: "patientId",
            header: <>Patient ID</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) => Number(a.patientId) - Number(b.patientId),
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
            key: "genderAge",
            header: <>Gender / Age</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.genderAge.localeCompare(b.genderAge),
        },

        {
            key: "time",
            header: <>Time</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.time.localeCompare(b.time),
        },

        {
            key: "visitType",
            header: <>Visit Type</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.visitType.localeCompare(b.visitType),
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
                    Completed:
                        "status-completed",
                    Cancelled:
                        "status-cancelled",
                    Paid:
                        "status-paid",
                    Waiting:
                        "status-pending",
                    "Checked-In":
                        "status-Checked-In"
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
    ];

    /********************************************
        Name : Manish Kumar
        Date : 01/06/2026
        Purpose : Patient Data interface
    *********************************************/
    const rowActions: RowAction<DoctorPatientTableData>[] = [
        {
            // icon: <MedicalRecord width={20} height={20} />,
            icon: <i className="ri-health-book-line fs-18"></i>,
            tooltip: "Medical Record",
            className: "medical-record",
            onClick: (row) => { console.log("Medical Record :", row), navigate("/clinic/DoctorDashboard/View-Edit") },
        },
        {
            // icon: <Laboratory width={20} height={20} />,
            icon: <i className="ri-flask-line fs-18"></i>,
            tooltip: "Test Result",
            className: "test-result",
            onClick: (row) => { console.log("Test Result :", row), navigate("/clinic/DoctorDashboard/View-Edit") },
        },
        {
            // icon: <Radiology width={20} height={20} />,
            icon: <i className="ri-contrast-drop-2-line fs-18"></i>,
            tooltip: "Radiology Result",
            className: "radiology",
            onClick: (row) => { console.log("Radiology Result :", row), navigate("/clinic/DoctorDashboard/View-Edit") },
        },

        {
            // icon: <CheckIn width={20} height={20} />,
            icon: <i className="ri-calendar-check-fill fs-18"></i>,
            tooltip: "Check-In",
            className: "check-in",
            onClick: (row) => { console.log("Check-In :", row), navigate("/clinic/DoctorDashboard/View-Edit") },
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 04/06/2026
        Purpose : RESET FILTERS
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedDate(null);
        setSelectedStatus(null);
        setCurrentPage(1);
    };

    return (
        <>
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
                    rowActions={rowActions}
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
        </>
    )
}
