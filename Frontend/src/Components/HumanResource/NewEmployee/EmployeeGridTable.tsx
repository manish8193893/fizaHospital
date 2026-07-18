import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bootstrap from 'bootstrap';

import Pagination from "../../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";

import BlueEye from '../../../../public/Assets/Icons/GlobalGridIcons/BlueEye.svg?react';

import TrashOne from '../../../../public/Assets/Icons/GlobalGridIcons/TrashOne.svg?react';
import MedicalKit from '../../../../public/Assets/Icons/StatCardIcons/MedicalKit.svg?react';
import GreenPhoneRounded from '../../../../public/Assets/Icons/StatCardIcons/GreenPhoneRounded.svg?react';
import PenUnderLine from '../../../../public/Assets/Icons/GlobalGridIcons/PenUnderLine.svg?react';


import "../../styles/HumanResource.css";

/********************************************
    Name : Manish Kumar
    Date : 09/06/2026
    Purpose : Employee Management Grid
*********************************************/
interface EmployeeTableData {
    id: string;
    name: string;
    employmentType: "Full Time" | "Part Time";
    hireDate: string;
    department: string;
    jobTitle: string;
    phone: string;
}

export default function EmployeeGridTable() {

    const calendarRef = useRef<HTMLDivElement>(null);

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [selectedPosition, setSelectedPosition] = useState<DropdownOption | null>(null);

    const [globalSearch, setGlobalSearch] = useState("");
    const [viewType, setViewType] = useState<"list" | "grid">("list");
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 09/06/2026
        Purpose : Position Options
    *********************************************/
    const positionOptions: DropdownOption[] = [
        {
            id: "staff_nurse",
            name: "Staff Nurse",
        },
        {
            id: "medical_officer",
            name: "Medical Officer",
        },
        {
            id: "receptionist",
            name: "Receptionist",
        },
        {
            id: "lab_technician",
            name: "Lab Technician",
        },
        {
            id: "pharmacist",
            name: "Pharmacist",
        },
        {
            id: "radiographer",
            name: "Radiographer",
        },
        {
            id: "admin_executive",
            name: "Admin Executive",
        },
    ];

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
    const ALL_EMPLOYEE_DATA: EmployeeTableData[] = [
        {
            id: "EMP001",
            name: "Sarah Ahmed",
            employmentType: "Full Time",
            hireDate: "08/01/2026",
            department: "Nursing",
            jobTitle: "Staff Nurse",
            phone: "971501111111",
        },
        {
            id: "EMP002",
            name: "Mohammed Khalid",
            employmentType: "Part Time",
            hireDate: "19/01/2026",
            department: "Reception",
            jobTitle: "Receptionist",
            phone: "971501111112",
        },
        {
            id: "EMP003",
            name: "Fatima Noor",
            employmentType: "Full Time",
            hireDate: "11/02/2026",
            department: "Laboratory",
            jobTitle: "Lab Technician",
            phone: "971501111113",
        },
        {
            id: "EMP004",
            name: "Ahmed Hassan",
            employmentType: "Full Time",
            hireDate: "25/02/2026",
            department: "Pharmacy",
            jobTitle: "Pharmacist",
            phone: "971501111114",
        },
        {
            id: "EMP005",
            name: "Layla Omar",
            employmentType: "Part Time",
            hireDate: "06/03/2026",
            department: "Radiology",
            jobTitle: "Radiographer",
            phone: "971501111115",
        },
        {
            id: "EMP006",
            name: "Yousef Ali",
            employmentType: "Full Time",
            hireDate: "20/03/2026",
            department: "Administration",
            jobTitle: "Admin Executive",
            phone: "971501111116",
        },
        {
            id: "EMP007",
            name: "Mariam Saleh",
            employmentType: "Part Time",
            hireDate: "08/04/2026",
            department: "Nursing",
            jobTitle: "Staff Nurse",
            phone: "971501111117",
        },
        {
            id: "EMP008",
            name: "Omar Tariq",
            employmentType: "Full Time",
            hireDate: "22/04/2026",
            department: "Emergency",
            jobTitle: "Medical Officer",
            phone: "971501111118",
        },
        {
            id: "EMP009",
            name: "Aisha Khalid",
            employmentType: "Full Time",
            hireDate: "13/05/2026",
            department: "Reception",
            jobTitle: "Receptionist",
            phone: "971501111119",
        },
        {
            id: "EMP010",
            name: "Bilal Rahman",
            employmentType: "Part Time",
            hireDate: "28/05/2026",
            department: "Laboratory",
            jobTitle: "Lab Technician",
            phone: "971501111120",
        },
        {
            id: "EMP011",
            name: "Noor Ahmed",
            employmentType: "Full Time",
            hireDate: "09/06/2026",
            department: "Pharmacy",
            jobTitle: "Pharmacist",
            phone: "971501111121",
        },
        {
            id: "EMP012",
            name: "Zaid Mahmood",
            employmentType: "Part Time",
            hireDate: "17/07/2026",
            department: "Radiology",
            jobTitle: "Radiographer",
            phone: "971501111122",
        },
        {
            id: "EMP013",
            name: "Rania Faisal",
            employmentType: "Full Time",
            hireDate: "05/08/2026",
            department: "Administration",
            jobTitle: "Admin Executive",
            phone: "971501111123",
        },
        {
            id: "EMP014",
            name: "Hassan Nadeem",
            employmentType: "Part Time",
            hireDate: "18/09/2026",
            department: "Emergency",
            jobTitle: "Medical Officer",
            phone: "971501111124",
        },
        {
            id: "EMP015",
            name: "Sara Jamal",
            employmentType: "Full Time",
            hireDate: "27/10/2026",
            department: "Nursing",
            jobTitle: "Staff Nurse",
            phone: "971501111125",
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
        Date : 09/06/2026
        Purpose : Filtered Employees
    *********************************************/
    const filteredEmployees = useMemo(() => {

        return ALL_EMPLOYEE_DATA.filter(
            (employee) => {

                const searchValue =
                    globalSearch.toLowerCase();

                const matchesSearch =
                    employee.id
                        .toLowerCase()
                        .includes(searchValue) ||
                    employee.name
                        .toLowerCase()
                        .includes(searchValue) ||
                    employee.department
                        .toLowerCase()
                        .includes(searchValue) ||
                    employee.jobTitle
                        .toLowerCase()
                        .includes(searchValue) ||
                    employee.phone
                        .toLowerCase()
                        .includes(searchValue);

                const matchesPosition =
                    !selectedPosition ||
                    employee.jobTitle.toLowerCase() ===
                    selectedPosition.name.toLowerCase();

                let matchesDate = true;

                if (selectedDate) {

                    const formattedSelectedDate =
                        `${String(
                            selectedDate.getDate()
                        ).padStart(2, "0")}/${String(
                            selectedDate.getMonth() + 1
                        ).padStart(2, "0")}/${selectedDate.getFullYear()}`;

                    matchesDate =
                        employee.hireDate ===
                        formattedSelectedDate;
                }

                return (
                    matchesSearch &&
                    matchesPosition &&
                    matchesDate
                );

            }
        );

    }, [
        globalSearch,
        selectedPosition,
        selectedDate,
    ]);

    const totalPages = Math.ceil(
        filteredEmployees.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredEmployees.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredEmployees,
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
    const columns: ColumnActionRow<EmployeeTableData>[] = [
        {
            key: "id",
            header: <>ID</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.name.localeCompare(
                    b.name
                ),
        },

        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.name.localeCompare(
                    b.name
                ),
        },

        {
            key: "employmentType",
            header: <>Employment Type</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,

            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.employmentType ===
                            "Full Time"
                            ? "status-completed"
                            : "status-pending"
                            }`}
                    >
                        {row.employmentType}
                    </span>
                </div>
            ),
        },

        {
            key: "hireDate",
            header: <>Hire Date</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },

        {
            key: "department",
            header: <>Department</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },

        {
            key: "jobTitle",
            header: <>Job Title</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },

        {
            key: "phone",
            header: <>Phone</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "150px",

            render: (row) => (
                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="border p-1 rounded-2 outline-0 p-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View"
                        onClick={() => {
                            console.log("View:", row.id);
                            navigate("/human-resources/Employees/View-Edit");
                        }}

                    >
                        <BlueEye width={20} height={20} />
                    </button>

                    <button
                        type="button"
                        className="border p-1 rounded-2 outline-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Edit"
                        onClick={() => {
                            console.log("Edit:", row.id);
                            navigate("/human-resources/Employees/View-Edit");
                        }}
                    >
                        <PenUnderLine width={20} height={20} />
                    </button>

                    <button
                        type="button"
                        className="border p-1 rounded-2 outline-0"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Delete"
                        onClick={() =>
                            console.log(
                                "Delete:",
                                row.id
                            )
                        }
                    >
                        <TrashOne width={20} height={20} />
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
        setSelectedPosition(null);
        setCurrentPage(1);

    };

    const getDepartmentColor = (department: string) => {
        switch (department.toLowerCase()) {
            case "nursing":
                return "#D8F3DC";

            case "reception":
                return "#FFE5EC";

            case "laboratory":
                return "#DDEBFF";

            case "pharmacy":
                return "#FFF3BF";

            case "radiology":
                return "#E5DBFF";

            case "administration":
                return "#F1F3F5";

            case "emergency":
                return "#FFD8D8";

            default:
                return "#F8F9FA";
        }
    };

    return (
        <>
            {/* New Appointment Heading and Button */}
            <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
                <p className='fs-18 fw-500'>Employees</p>
                <div className="Plus-btn" onClick={() => navigate("/human-resources/Employees/NewEmployee")}>
                    <div className='text-white fs-14 fw-400'>New Employee</div>
                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
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

                <div>
                    <CustomFilterDropdown
                        options={
                            positionOptions
                        }
                        value={
                            selectedPosition
                        }
                        placeholder="Select Position"
                        customClass="aph-filter-dropdown"
                        onChange={(
                            selected
                        ) => {
                            setSelectedPosition(
                                selected
                            );
                            setCurrentPage(1);
                        }}
                    />
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



            <div className="d-flex flex-column">

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

                            {visibleTableData.map((employee) => {

                                const isOpen =
                                    expandedCard === employee.id;

                                return (

                                    <div
                                        className="col-xl-4 col-lg-6 my-3"
                                        key={employee.id}
                                    >

                                        <div className="employee-grid-card rounded-2">

                                            <div className="d-flex">

                                                {/* left Side Content */}

                                                <div className="grow">

                                                    <div className="text-start mb-3">

                                                        <span
                                                            className="department-pill"
                                                            style={{
                                                                background:
                                                                    getDepartmentColor(
                                                                        employee.department
                                                                    ),
                                                            }}
                                                        >
                                                            {
                                                                employee.department
                                                            }
                                                        </span>

                                                    </div>

                                                    <div className="mt-2 text-start">

                                                        <div className="text-muted fw-500 fs-14">
                                                            #{employee.id}
                                                        </div>

                                                        <div className="fs-18 fw-500">
                                                            {employee.name}
                                                        </div>

                                                        <div className="text-muted fs-14 fw-500">
                                                            <i className="ri-calendar-line me-1" style={{ color: "#A78CEA" }}></i>{employee.hireDate}
                                                        </div>

                                                    </div>

                                                    <div className="d-flex justify-content-start align-items-center align-items-center mt-4 gap-3">

                                                        <span className="fs-14 fw-500 d-flex align-items-center text-nowrap">
                                                            <MedicalKit width={16} height={16} className="me-1" />
                                                            {employee.jobTitle}
                                                        </span>

                                                        <span className="fs-14 fw-500 align-items-center text-nowrap">
                                                            <GreenPhoneRounded width={18} height={18} className="me-1" />
                                                            {employee.phone}
                                                        </span>

                                                    </div>

                                                </div>

                                                {/* Right Side Menu */}

                                                <div className="employee-card-menu">

                                                    <button
                                                        className="menu-toggle-btn"
                                                        onClick={() =>
                                                            setExpandedCard(
                                                                isOpen
                                                                    ? null
                                                                    : employee.id
                                                            )
                                                        }
                                                    >
                                                        <i className="ri-menu-line fw-500"></i>
                                                    </button>

                                                    <div
                                                        className={`employee-action-icons ${isOpen
                                                            ? "show"
                                                            : ""
                                                            }`}
                                                    >
                                                        <button onClick={() => navigate("/human-resources/Employees/View-Edit")}>
                                                            <BlueEye
                                                                width={18}
                                                                height={18}
                                                            />
                                                        </button>

                                                        <button onClick={() => navigate("/human-resources/Employees/View-Edit")}>
                                                            <PenUnderLine
                                                                width={18}
                                                                height={18}
                                                            />
                                                        </button>

                                                        <button>
                                                            <TrashOne
                                                                width={18}
                                                                height={18}
                                                            />
                                                        </button>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

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
        </>
    );
}