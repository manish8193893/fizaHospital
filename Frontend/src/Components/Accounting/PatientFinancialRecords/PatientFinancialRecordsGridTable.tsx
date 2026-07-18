import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";


/***************************************************
    Name : Manish Kumar
    Date : 12/07/2026
    Purpose : Patient Financial Records Grid Table
*****************************************************/

interface PatientFinancialRecordsTableData {
    id: string;
    patientName: string;
    fileNo: string;
    visitType: "Follow-up" | "Consultant/OutPatient" | "Emergency";
    admissionDate: string;
    currentBalance: number;
}

export default function PatientFinancialRecordsGridTable() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDateCalendar, setShowDateCalendar] = useState(false);

    const calendarRef = useRef<HTMLDivElement | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Dummy Patient Financial Data
    *********************************************/
    const ALL_PATIENT_FINANCIAL_DATA: PatientFinancialRecordsTableData[] = [
        {
            id: "PF001",
            patientName: "Rahul Sharma",
            fileNo: "FILE-1001",
            visitType: "Consultant/OutPatient",
            admissionDate: "12/07/2026",
            currentBalance: 0,
        },
        {
            id: "PF002",
            patientName: "Priya Singh",
            fileNo: "FILE-1002",
            visitType: "Follow-up",
            admissionDate: "16/06/2026",
            currentBalance: 5700,
        },
        {
            id: "PF003",
            patientName: "Amit Verma",
            fileNo: "FILE-1003",
            visitType: "Emergency",
            admissionDate: "17/06/2026",
            currentBalance: 12000,
        },
        {
            id: "PF004",
            patientName: "Sneha Kapoor",
            fileNo: "FILE-1004",
            visitType: "Consultant/OutPatient",
            admissionDate: "18/06/2026",
            currentBalance: 2500,
        },
        {
            id: "PF005",
            patientName: "Vikas Kumar",
            fileNo: "FILE-1005",
            visitType: "Follow-up",
            admissionDate: "19/06/2026",
            currentBalance: 0,
        },
        {
            id: "PF006",
            patientName: "Neha Gupta",
            fileNo: "FILE-1006",
            visitType: "Emergency",
            admissionDate: "20/06/2026",
            currentBalance: 8500,
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Filter Patient Financial Records
    *********************************************/
    const filteredPatientFinancialData = useMemo(() => {
        return ALL_PATIENT_FINANCIAL_DATA.filter((patient) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                patient.patientName.toLowerCase().includes(searchValue) ||
                patient.fileNo.toLowerCase().includes(searchValue) ||
                patient.visitType.toLowerCase().includes(searchValue);

            let matchesDate = true;

            if (selectedDate) {
                const selectedDateValue = `${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                )}/${String(selectedDate.getMonth() + 1).padStart(
                    2,
                    "0"
                )}/${selectedDate.getFullYear()}`;

                matchesDate = patient.admissionDate === selectedDateValue;
            }

            return matchesSearch && matchesDate;
        });
    }, [globalSearch, selectedDate]);

    const totalPages = Math.ceil(
        filteredPatientFinancialData.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredPatientFinancialData.slice(startIndex, endIndex);
    }, [filteredPatientFinancialData, currentPage, itemsPerPage]);

    // Component return statement would go here
    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Initialize Bootstrap Tooltips
    *********************************************/
    useEffect(() => {
        const tooltipElements = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]'
        );

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
        Date : 12/07/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<PatientFinancialRecordsTableData>[] = [
        {
            key: "patientName",
            header: <>Patient Name</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "fileNo",
            header: <>File No</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "visitType",
            header: <>Visit Type</>,
            className: "text-center",
            render: (row) => {
                const visitConfig = {
                    "Follow-up": { bg: "#E8F3FF", color: "#0477BF", icon: "ri-refresh-line" },
                    "Consultant/OutPatient": { bg: "#EAF8EF", color: "#1B8F4D", icon: "ri-user-heart-line" },
                    "Emergency": { bg: "#FFF0F0", color: "#FF4C51", icon: "ri-alarm-warning-line" },
                }[row.visitType];

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className="px-3 py-1 rounded-pill text-xs fw-medium d-flex align-items-center gap-1"
                            style={{
                                backgroundColor: visitConfig.bg,
                                color: visitConfig.color,
                            }}
                        >
                            <i className={`${visitConfig.icon} fs-15`}></i>
                            {row.visitType}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "admissionDate",
            header: <>Admission Date</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "currentBalance",
            header: <>Current Balance</>,
            className: "text-center",
            render: (row) => {
                const isCleared = row.currentBalance === 0;

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className="px-3 py-1 rounded-pill text-xs fw-medium d-flex align-items-center gap-1"
                            style={{
                                backgroundColor: isCleared ? "#EAF8EF" : "#FFF0F0",
                                color: isCleared ? "#1B8F4D" : "#FF4C51",
                            }}
                        >
                            <i
                                className={
                                    isCleared
                                        ? "ri-checkbox-circle-line fs-15"
                                        : "ri-error-warning-line fs-15"
                                }
                            ></i>
                            {isCleared
                                ? "Cleared"
                                : `₹ ${row.currentBalance.toLocaleString()} Outstanding`}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            render: (row) => (
                <div className="d-flex justify-content-center gap-2">
                    {/* View Details */}
                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View Details"
                        onClick={() => console.log("View Details :", row)}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    {/* Print Statement */}
                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Print Statement"
                        onClick={() => console.log("Print Statement :", row)}
                    >
                        <i className="ri-printer-line fs-18"></i>
                    </button>
                </div>
            ),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedDate(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Patient Financial Records</p>
            </div>

            {/* Filter Row */}
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
                        <i className="ri-search-line"></i>
                    </button>
                </div>

                {/* Date Filter */}
                <div className="aph-calendar-filter" ref={calendarRef}>
                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() => setShowDateCalendar(!showDateCalendar)}
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

                    {showDateCalendar && (
                        <div className="aph-calendar-popup">
                            <DateFilterCalendar
                                selectedDate={selectedDate}
                                onDateSelect={(date) => {
                                    setSelectedDate(date);
                                    setShowDateCalendar(false);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Reset Filter */}
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
                    onPageChange={(page) => setCurrentPage(page)}
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