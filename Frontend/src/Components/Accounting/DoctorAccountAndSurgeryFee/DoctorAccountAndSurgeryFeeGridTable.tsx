import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";


/********************************************
    Name : Manish Kumar
    Date : 12/07/2026
    Purpose : Doctor Account And Surgery Fee Grid Table
*********************************************/

interface DoctorAccountAndSurgeryFeeTableData {
    id: string;
    patientName: string;
    surgeryName: string;
    doctorName: string;
    fileNo: string;
    visitType: "InPatient" | "Consultant/OutPatient" | "Emergency";
    admissionDate: string;
    transactionAmount: number;
    doctorCommission: number;
    hospitalShare: number;
}

export default function DoctorAccountAndSurgeryFeeGridTable() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedVisitType, setSelectedVisitType] = useState<DropdownOption | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDateCalendar, setShowDateCalendar] = useState(false);

    const calendarRef = useRef<HTMLDivElement | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Visit Type Options
    *********************************************/
    const visitTypeOptions: DropdownOption[] = [
        { id: "inpatient", name: "InPatient" },
        { id: "consultant_outpatient", name: "Consultant/OutPatient" },
        { id: "emergency", name: "Emergency" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Dummy Doctor Surgery Fee Data
    *********************************************/
    const ALL_DOCTOR_SURGERY_DATA: DoctorAccountAndSurgeryFeeTableData[] = [
        {
            id: "DS001",
            patientName: "Rahul Sharma",
            surgeryName: "Appendectomy",
            doctorName: "Dr. Amit Verma",
            fileNo: "FILE-2001",
            visitType: "InPatient",
            admissionDate: "15/06/2026",
            transactionAmount: 85000,
            doctorCommission: 25000,
            hospitalShare: 60000,
        },
        {
            id: "DS002",
            patientName: "Priya Singh",
            surgeryName: "Cataract Surgery",
            doctorName: "Dr. Neha Kapoor",
            fileNo: "FILE-2002",
            visitType: "Consultant/OutPatient",
            admissionDate: "16/06/2026",
            transactionAmount: 45000,
            doctorCommission: 15000,
            hospitalShare: 30000,
        },
        {
            id: "DS003",
            patientName: "Amit Kumar",
            surgeryName: "Fracture Repair",
            doctorName: "Dr. Rajesh Sharma",
            fileNo: "FILE-2003",
            visitType: "Emergency",
            admissionDate: "17/06/2026",
            transactionAmount: 120000,
            doctorCommission: 40000,
            hospitalShare: 80000,
        },
        {
            id: "DS004",
            patientName: "Sneha Gupta",
            surgeryName: "Gallbladder Surgery",
            doctorName: "Dr. Pankaj Singh",
            fileNo: "FILE-2004",
            visitType: "InPatient",
            admissionDate: "18/06/2026",
            transactionAmount: 95000,
            doctorCommission: 30000,
            hospitalShare: 65000,
        },
        {
            id: "DS005",
            patientName: "Vikas Mehta",
            surgeryName: "Knee Replacement",
            doctorName: "Dr. Arjun Malhotra",
            fileNo: "FILE-2005",
            visitType: "InPatient",
            admissionDate: "19/06/2026",
            transactionAmount: 250000,
            doctorCommission: 80000,
            hospitalShare: 170000,
        },
        {
            id: "DS006",
            patientName: "Neha Verma",
            surgeryName: "Dental Surgery",
            doctorName: "Dr. Ritu Sharma",
            fileNo: "FILE-2006",
            visitType: "Consultant/OutPatient",
            admissionDate: "20/06/2026",
            transactionAmount: 30000,
            doctorCommission: 10000,
            hospitalShare: 20000,
        },
        {
            id: "DS007",
            patientName: "Karan Joshi",
            surgeryName: "Emergency Trauma Surgery",
            doctorName: "Dr. Suresh Rao",
            fileNo: "FILE-2007",
            visitType: "Emergency",
            admissionDate: "21/06/2026",
            transactionAmount: 175000,
            doctorCommission: 55000,
            hospitalShare: 120000,
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
        Purpose : Filter Doctor Surgery Data
    *********************************************/
    const filteredDoctorSurgeryData = useMemo(() => {
        return ALL_DOCTOR_SURGERY_DATA.filter((row) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                row.patientName.toLowerCase().includes(searchValue) ||
                row.surgeryName.toLowerCase().includes(searchValue) ||
                row.doctorName.toLowerCase().includes(searchValue) ||
                row.fileNo.toLowerCase().includes(searchValue);

            const matchesVisitType =
                !selectedVisitType ||
                row.visitType.toLowerCase() === selectedVisitType.name.toLowerCase();

            let matchesDate = true;

            if (selectedDate) {
                const formattedDate = `${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                )}/${String(selectedDate.getMonth() + 1).padStart(
                    2,
                    "0"
                )}/${selectedDate.getFullYear()}`;

                matchesDate = row.admissionDate === formattedDate;
            }

            return matchesSearch && matchesVisitType && matchesDate;
        });
    }, [globalSearch, selectedVisitType, selectedDate]);

    const totalPages = Math.ceil(
        filteredDoctorSurgeryData.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredDoctorSurgeryData.slice(startIndex, endIndex);
    }, [filteredDoctorSurgeryData, currentPage, itemsPerPage]);

    // Next section of the component follows here...
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
    const columns: ColumnActionRow<DoctorAccountAndSurgeryFeeTableData>[] = [
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
            key: "surgeryName",
            header: <>Surgery Name</>,
            className: "text-center text-nowrap",
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
            key: "doctorName",
            header: <>Doctor Name</>,
            className: "text-center text-nowrap",
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
            className: "text-center text-nowrap",
            sortable: true,
        },
        {
            key: "visitType",
            header: <>Visit Type</>,
            className: "text-center",
            render: (row) => {
                const visitConfig = {
                    InPatient: { bg: "#EAF8EF", color: "#1B8F4D", icon: "ri-hospital-line" },
                    "Consultant/OutPatient": { bg: "#E8F3FF", color: "#0477BF", icon: "ri-user-heart-line" },
                    Emergency: { bg: "#FFF0F0", color: "#FF4C51", icon: "ri-alarm-warning-line" },
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
            key: "transactionAmount",
            header: <>Transaction Amount</>,
            className: "text-center",
            render: (row) => (
                <span>₹ {row.transactionAmount.toLocaleString()}</span>
            ),
        },
        {
            key: "doctorCommission",
            header: <>Doctor's Share</>,
            className: "text-center",
            render: (row) => (
                <span className="text-success fw-medium">
                    ₹ {row.doctorCommission.toLocaleString()}
                </span>
            ),
        },
        {
            key: "hospitalShare",
            header: <>Hospital Share</>,
            className: "text-center",
            render: (row) => (
                <span className="text-primary fw-medium">
                    ₹ {row.hospitalShare.toLocaleString()}
                </span>
            ),
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            render: (row) => (
                <div className="d-flex justify-content-center gap-2">
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
        setSelectedVisitType(null);
        setSelectedDate(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Doctor Account And Surgery Fee</p>
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

                {/* Visit Type Filter */}
                <div>
                    <CustomFilterDropdown
                        options={visitTypeOptions}
                        value={selectedVisitType}
                        placeholder="Visit Type"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedVisitType(selected);
                            setCurrentPage(1);
                        }}
                    />
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

                {/* Reset Button */}
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