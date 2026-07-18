import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bootstrap from 'bootstrap';

import Pagination from "../../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";




import "../../../styles/HumanResource.css";

/********************************************
    Name : Manish Kumar
    Date : 09/06/2026
    Purpose : Employee Management Grid
*********************************************/
interface PayrollTableData {
    payrollId: string;
    name: string;
    jobTitle: string;
    basicSalary: number;
    deduction: number;
    overtime: number;
    netSalary: number;
    paymentDate: string;
    status: "Paid" | "Pending";
}

export default function PayrollGridTable() {

    const calendarRef = useRef<HTMLDivElement>(null);

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [globalSearch, setGlobalSearch] = useState("");
    const navigate = useNavigate();

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
    const ALL_PAYROLL_DATA: PayrollTableData[] = [
        {
            payrollId: "PAY001",
            name: "Sarah",
            jobTitle: "Nurse",
            basicSalary: 8500,
            deduction: 500,
            overtime: 350,
            netSalary: 8350,
            paymentDate: "01/06/2026",
            status: "Paid",
        },
        {
            payrollId: "PAY002",
            name: "Khalid",
            jobTitle: "Receptionist",
            basicSalary: 6500,
            deduction: 200,
            overtime: 150,
            netSalary: 6450,
            paymentDate: "02/06/2026",
            status: "Paid",
        },
        {
            payrollId: "PAY003",
            name: "Fatima",
            jobTitle: "Technician",
            basicSalary: 7200,
            deduction: 300,
            overtime: 250,
            netSalary: 7150,
            paymentDate: "03/06/2026",
            status: "Pending",
        },
        {
            payrollId: "PAY004",
            name: "Ahmed",
            jobTitle: "Pharmacist",
            basicSalary: 9000,
            deduction: 450,
            overtime: 400,
            netSalary: 8950,
            paymentDate: "04/06/2026",
            status: "Paid",
        },
        {
            payrollId: "PAY005",
            name: "Layla",
            jobTitle: "Radiographer",
            basicSalary: 8200,
            deduction: 350,
            overtime: 300,
            netSalary: 8150,
            paymentDate: "05/06/2026",
            status: "Pending",
        },
        {
            payrollId: "PAY006",
            name: "Yousef",
            jobTitle: "Admin Executive",
            basicSalary: 7800,
            deduction: 250,
            overtime: 200,
            netSalary: 7750,
            paymentDate: "06/06/2026",
            status: "Paid",
        },
        {
            payrollId: "PAY007",
            name: "Mariam",
            jobTitle: "Nurse",
            basicSalary: 8400,
            deduction: 400,
            overtime: 350,
            netSalary: 8350,
            paymentDate: "07/06/2026",
            status: "Pending",
        },
        {
            payrollId: "PAY008",
            name: "Omar",
            jobTitle: "Medical Officer",
            basicSalary: 12000,
            deduction: 500,
            overtime: 700,
            netSalary: 12200,
            paymentDate: "08/06/2026",
            status: "Paid",
        },
        {
            payrollId: "PAY009",
            name: "Aisha",
            jobTitle: "Receptionist",
            basicSalary: 6700,
            deduction: 200,
            overtime: 120,
            netSalary: 6620,
            paymentDate: "09/06/2026",
            status: "Pending",
        },
        {
            payrollId: "PAY010",
            name: "Bilal",
            jobTitle: "Technician",
            basicSalary: 7100,
            deduction: 300,
            overtime: 250,
            netSalary: 7050,
            paymentDate: "10/06/2026",
            status: "Paid",
        },
        {
            payrollId: "PAY011",
            name: "Noor",
            jobTitle: "Pharmacist",
            basicSalary: 9100,
            deduction: 500,
            overtime: 400,
            netSalary: 9000,
            paymentDate: "11/06/2026",
            status: "Pending",
        },
        {
            payrollId: "PAY012",
            name: "Zaid",
            jobTitle: "Radiographer",
            basicSalary: 8000,
            deduction: 300,
            overtime: 350,
            netSalary: 8050,
            paymentDate: "12/06/2026",
            status: "Paid",
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
    /********************************************
    Name : Manish Kumar
    Date : 15/06/2026
    Purpose : Filtered Payroll Data
*********************************************/
    const filteredPayrolls = useMemo(() => {

        return ALL_PAYROLL_DATA.filter(
            (payroll) => {

                const searchValue =
                    globalSearch.toLowerCase();

                const matchesSearch =

                    payroll.payrollId
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    payroll.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    payroll.jobTitle
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    payroll.status
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
                        payroll.paymentDate ===
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

    const totalPages = Math.ceil(
        filteredPayrolls.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredPayrolls.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredPayrolls,
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
    const columns: ColumnActionRow<PayrollTableData>[] = [
        {
            key: "payrollId",
            header: <>Payroll ID</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "jobTitle",
            header: <>Job Title</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "basicSalary",
            header: <>Basic Salary</>,
            className: "text-center",
            sortable: true,
            render: (row) => `AED ${row.basicSalary.toLocaleString()}`,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "deduction",
            header: <>Deduction</>,
            className: "text-center text-red",
            sortable: true,
            render: (row) => `AED ${row.deduction.toLocaleString()}`,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "overtime",
            header: <>Overtime</>,
            className: "text-center text-green",
            sortable: true,
            render: (row) => `AED ${row.overtime.toLocaleString()}`,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
        },

        {
            key: "netSalary",
            header: <>Net Salary</>,
            className: "text-center",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
            render: (row) => (
                <span className="fw-700">
                    AED {row.netSalary.toLocaleString()}
                </span>
            ),
        },

        {
            key: "paymentDate",
            header: <>Payment Date</>,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),
            className: "text-center",
            sortable: true,
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />),

            render: (row) => (
                <span
                    className={`${row.status === "Paid"
                        ? "status-completed"
                        : "status-pending"
                        }`}
                >
                    {row.status}
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
                        data-bs-title="View Payroll"
                        onClick={() => {

                            console.log(
                                "View Payroll:",
                                row.payrollId
                            );

                            navigate(
                                "/payroll/View-Edit"
                            );

                        }}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Pay Salary"
                        onClick={() => {

                            console.log(
                                "Pay Salary:",
                                row.payrollId
                            );

                        }}
                    >
                        <i
                            className="ri-hand-coin-line fs-18"
                        ></i>
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
            <div className="d-flex justify-content-between align-items-center gap-4 mb-4">
                <p className='fs-18 fw-500'>Payroll</p>
                <div className="Plus-btn" onClick={() => navigate("/human-resources/Payroll/CreatePayroll")}>
                    <div className='text-white fs-14 fw-400'>Pay Payroll</div>
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

                <button
                    className="aph-filter-btn outline-0"
                    onClick={
                        handleResetFilters
                    }
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