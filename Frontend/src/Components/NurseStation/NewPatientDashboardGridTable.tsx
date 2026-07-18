import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFilterDropdown from "../../GlobalHelpers/CustomFilterDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
    type RowAction,
} from "../../GlobalHelpers/GlobalGridTable";

import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";



/********************************************
    Name : Manish Kumar
    Date : 08/06/2026
    Purpose : New Patient Dashboard
*********************************************/
interface NewPatientTableData {
    visitNo: string;
    name: string;
    clinic: string;
    genderAge: string;
    dateTime: string;
    visitType:
    | "Consultation/OutPatient"
    | "InPatient"
    | "Follow-Up"
    | "Emergency";

    status:
    | "Completed"
    | "Cancelled"
    | "Waiting";
}

export default function NewPatientDashboardGridTable() {

    const navigate = useNavigate();

    const calendarRef = useRef<HTMLDivElement>(null);

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [globalSearch, setGlobalSearch] = useState("");

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Status Dropdown
    *********************************************/
    const statusOptions: DropdownOption[] = [
        {
            id: "completed",
            name: "Completed",
        },
        {
            id: "cancelled",
            name: "Cancelled",
        },
        {
            id: "waiting",
            name: "Waiting",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
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

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setCurrentPage(1);
        setShowCalendar(false);
    };

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_PATIENT_DATA: NewPatientTableData[] = [
        {
            visitNo: "V1001",
            name: "Manish Kashyap",
            clinic: "General Medicine",
            genderAge: "Male / 23",
            dateTime: "08/06/2026 09:00 AM",
            visitType: "Consultation/OutPatient",
            status: "Waiting",
        },
        {
            visitNo: "V1002",
            name: "Aisha Noor",
            clinic: "Cardiology",
            genderAge: "Female / 31",
            dateTime: "08/06/2026 09:30 AM",
            visitType: "Follow-Up",
            status: "Completed",
        },
        {
            visitNo: "V1003",
            name: "Ahmed Ali",
            clinic: "Neurology",
            genderAge: "Male / 45",
            dateTime: "08/06/2026 10:00 AM",
            visitType: "Emergency",
            status: "Cancelled",
        },
        {
            visitNo: "V1004",
            name: "Fatima Hassan",
            clinic: "Orthopedics",
            genderAge: "Female / 29",
            dateTime: "08/06/2026 10:30 AM",
            visitType: "InPatient",
            status: "Waiting",
        },
        {
            visitNo: "V1005",
            name: "Omar Farooq",
            clinic: "Dermatology",
            genderAge: "Male / 37",
            dateTime: "08/06/2026 11:00 AM",
            visitType: "Consultation/OutPatient",
            status: "Completed",
        },
        {
            visitNo: "V1006",
            name: "Sara Mahmood",
            clinic: "ENT",
            genderAge: "Female / 28",
            dateTime: "08/06/2026 11:30 AM",
            visitType: "Follow-Up",
            status: "Waiting",
        },
        {
            visitNo: "V1007",
            name: "Yousef Ali",
            clinic: "Pulmonology",
            genderAge: "Male / 51",
            dateTime: "08/06/2026 12:00 PM",
            visitType: "Emergency",
            status: "Completed",
        },
        {
            visitNo: "V1008",
            name: "Noor Faisal",
            clinic: "Gynecology",
            genderAge: "Female / 34",
            dateTime: "08/06/2026 12:30 PM",
            visitType: "Consultation/OutPatient",
            status: "Cancelled",
        },
        {
            visitNo: "V1009",
            name: "Bilal Nadeem",
            clinic: "Cardiology",
            genderAge: "Male / 41",
            dateTime: "08/06/2026 01:00 PM",
            visitType: "InPatient",
            status: "Waiting",
        },
        {
            visitNo: "V1010",
            name: "Maryam Khalid",
            clinic: "Neurology",
            genderAge: "Female / 26",
            dateTime: "08/06/2026 01:30 PM",
            visitType: "Follow-Up",
            status: "Completed",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Pagination State
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Filter Data
    *********************************************/
    const filteredPatients = useMemo(() => {

        return ALL_PATIENT_DATA.filter((patient) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                patient.visitNo.toLowerCase().includes(searchValue) ||
                patient.name.toLowerCase().includes(searchValue) ||
                patient.clinic.toLowerCase().includes(searchValue) ||
                patient.genderAge.toLowerCase().includes(searchValue) ||
                patient.visitType.toLowerCase().includes(searchValue) ||
                patient.status.toLowerCase().includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                patient.status.toLowerCase() ===
                selectedStatus.name.toLowerCase();

            let matchesDate = true;

            if (selectedDate) {

                const patientDate =
                    patient.dateTime.split(" ")[0];

                const formattedDate =
                    `${String(selectedDate.getDate()).padStart(2, "0")}/` +
                    `${String(selectedDate.getMonth() + 1).padStart(2, "0")}/` +
                    `${selectedDate.getFullYear()}`;

                matchesDate =
                    patientDate === formattedDate;
            }

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
        Date : 08/06/2026
        Purpose : Pagination
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
        Date : 08/06/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<NewPatientTableData>[] = [
        {
            key: "visitNo",
            header: <>Visit No</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "clinic",
            header: <>Clinic</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "genderAge",
            header: <>Age / Gender</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "dateTime",
            header: <>Date & Time</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "visitType",
            header: <>Visit Type</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,

            render: (row) => {

                const statusStyles = {
                    Completed: "status-completed",
                    Cancelled: "status-cancelled",
                    Waiting: "status-pending",
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
        Date : 08/06/2026
        Purpose : Row Actions
    *********************************************/
    const rowActions: RowAction<NewPatientTableData>[] = [
        {
            icon: <i className="ri-eye-line fs-18"></i>,
            tooltip: "View",
            className: "medical-record",
            onClick: (row) => {
                console.log("View :", row);
                navigate("/nurse-station/NewPatient/ViewDetails");
            },
        },
        {
            icon: <i className="ri-heart-pulse-line fs-18"></i>,
            tooltip: "Add Vital Signs",
            className: "vitals",
            onClick: (row) => {
                console.log("Add Vital Signs :", row);
            },
        },
        {
            icon: <i className="ri-alert-line fs-18"></i>,
            tooltip: "Add Allergy",
            className: "test-result",
            onClick: (row) => {
                console.log("Add Allergy :", row);
            },
        },
        {
            icon: <i className="ri-syringe-line fs-18"></i>,
            tooltip: "Add Immunization",
            className: "immunization",
            onClick: (row) => {
                console.log("Add Immunization :", row);
            },
        },
        {
            icon: <i className="ri-printer-line fs-18"></i>,
            tooltip: "Print / Report",
            className: "print-report",
            onClick: (row) => {
                console.log("Print / Report :", row);
            },
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedDate(null);
        setSelectedStatus(null);
        setCurrentPage(1);

    };

    return (
        <>
            <div className="aph-modal-filter-row mb-4">

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
                                ? `${String(selectedDate.getDate()).padStart(2, "0")}/${String(selectedDate.getMonth() + 1).padStart(2, "0")}/${selectedDate.getFullYear()}`
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

            <div className="d-flex flex-column">

                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    rowActions={rowActions}
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