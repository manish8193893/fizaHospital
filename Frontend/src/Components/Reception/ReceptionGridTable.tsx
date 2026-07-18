import { useEffect, useMemo, useRef, useState } from "react";

import Pagination from "../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFilterDropdown from "../../GlobalHelpers/CustomFilterDropdown";
import GlobalGridTable, { type ColumnActionRow, type RowAction } from "../../GlobalHelpers/GlobalGridTable";

import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";
// import BlueEye from '../../../public/Assets/Icons/GlobalGridIcons/BlueEye.svg?react';
// import GreenPrinter from '../../../public/Assets/Icons/GlobalGridIcons/GreenPrinter.svg?react';


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

export default function ReceptionGridTable() {

    const calendarRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    ];

    /********************************************
        Name : Manish Kumar
        Date : 01/06/2026
        Purpose : Patient Data interface
    *********************************************/
    const rowActions: RowAction<PatientTableData>[] = [
        {
            // icon: <BlueEye width={20} height={20} />,
            icon: <i className="ri-eye-line fs-18"></i>,
            tooltip: "View Details",
            className: "medical-record",
            onClick: (row) => console.log("View :", row),
        },

        {
            // icon: <GreenPrinter width={20} height={20} />,
            icon: <i className="ri-printer-line fs-18"></i>,
            tooltip: "Print Card",
            className: "check-in",
            onClick: (row) => console.log("Print :", row),
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
