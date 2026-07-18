import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";

import "../../../styles/HumanResource.css";

/********************************************
    Name : Manish Kumar
    Date : 15/06/2026
    Purpose : Invoice Request Grid Table
*********************************************/

interface InvoiceRequestTableData {
    id: string;
    invoiceNo: string;
    patientName: string;
    doctorName: string;
    operationName: string;
    surgeryPrice: number;
    discount: number;
    balanceAmount: number;
    status: "Unpaid" | "Invoice Generated";
    date: string;
}

export default function InvoiceRequestGridTable() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDateCalendar, setShowDateCalendar] = useState(false);

    const calendarRef = useRef<HTMLDivElement | null>(null);

    /********************************************
          Name : Manish Kumar
          Date : 15/06/2026
          Purpose : Status Options
      *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "unpaid", name: "Unpaid" },
        { id: "invoice_generated", name: "Invoice Generated" },
    ];

    /********************************************
          Name : Manish Kumar
          Date : 15/06/2026
          Purpose : Dummy Invoice Request Data
      *********************************************/
    const ALL_INVOICE_REQUEST_DATA: InvoiceRequestTableData[] = [
        {
            id: "INV001",
            invoiceNo: "INV-5001",
            patientName: "Rahul Sharma",
            doctorName: "Dr. Amit Verma",
            operationName: "Appendectomy",
            surgeryPrice: 85000,
            discount: 5000,
            balanceAmount: 80000,
            status: "Invoice Generated",
            date: "15/06/2026",
        },
        {
            id: "INV002",
            invoiceNo: "INV-5002",
            patientName: "Priya Singh",
            doctorName: "Dr. Neha Kapoor",
            operationName: "Cataract Surgery",
            surgeryPrice: 45000,
            discount: 3000,
            balanceAmount: 42000,
            status: "Unpaid",
            date: "16/06/2026",
        },
        {
            id: "INV003",
            invoiceNo: "INV-5003",
            patientName: "Amit Kumar",
            doctorName: "Dr. Rajesh Sharma",
            operationName: "Fracture Repair",
            surgeryPrice: 120000,
            discount: 10000,
            balanceAmount: 110000,
            status: "Invoice Generated",
            date: "17/06/2026",
        },
        {
            id: "INV004",
            invoiceNo: "INV-5004",
            patientName: "Sneha Gupta",
            doctorName: "Dr. Pankaj Singh",
            operationName: "Gallbladder Surgery",
            surgeryPrice: 95000,
            discount: 5000,
            balanceAmount: 90000,
            status: "Unpaid",
            date: "18/06/2026",
        },
        {
            id: "INV005",
            invoiceNo: "INV-5005",
            patientName: "Vikas Mehta",
            doctorName: "Dr. Arjun Malhotra",
            operationName: "Knee Replacement",
            surgeryPrice: 250000,
            discount: 20000,
            balanceAmount: 230000,
            status: "Invoice Generated",
            date: "19/06/2026",
        },
        {
            id: "INV006",
            invoiceNo: "INV-5006",
            patientName: "Neha Verma",
            doctorName: "Dr. Ritu Sharma",
            operationName: "Dental Surgery",
            surgeryPrice: 30000,
            discount: 2000,
            balanceAmount: 28000,
            status: "Unpaid",
            date: "20/06/2026",
        },
        {
            id: "INV007",
            invoiceNo: "INV-5007",
            patientName: "Karan Joshi",
            doctorName: "Dr. Suresh Rao",
            operationName: "Trauma Surgery",
            surgeryPrice: 175000,
            discount: 15000,
            balanceAmount: 160000,
            status: "Invoice Generated",
            date: "21/06/2026",
        },
        {
            id: "INV008",
            invoiceNo: "INV-5008",
            patientName: "Anjali Verma",
            doctorName: "Dr. Mohit Jain",
            operationName: "Hernia Operation",
            surgeryPrice: 70000,
            discount: 5000,
            balanceAmount: 65000,
            status: "Unpaid",
            date: "22/06/2026",
        },
    ];

    /********************************************
          Name : Manish Kumar
          Date : 15/06/2026
          Purpose : Pagination States
      *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
          Name : Manish Kumar
          Date : 15/06/2026
          Purpose : Filter Invoice Data
      *********************************************/
    const filteredInvoiceData = useMemo(() => {
        return ALL_INVOICE_REQUEST_DATA.filter((invoice) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                invoice.invoiceNo.toLowerCase().includes(searchValue) ||
                invoice.patientName.toLowerCase().includes(searchValue) ||
                invoice.doctorName.toLowerCase().includes(searchValue) ||
                invoice.operationName.toLowerCase().includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                invoice.status.toLowerCase() === selectedStatus.name.toLowerCase();

            let matchesDate = true;

            if (selectedDate) {
                const formattedDate = `${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                )}/${String(selectedDate.getMonth() + 1).padStart(
                    2,
                    "0"
                )}/${selectedDate.getFullYear()}`;

                matchesDate = invoice.date === formattedDate;
            }

            return matchesSearch && matchesStatus && matchesDate;
        });
    }, [globalSearch, selectedStatus, selectedDate]);

    const totalPages = Math.ceil(filteredInvoiceData.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredInvoiceData.slice(startIndex, endIndex);
    }, [filteredInvoiceData, currentPage, itemsPerPage]);

    // Next section of the component follows here...
    /********************************************
          Name : Manish Kumar
          Date : 15/06/2026
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
          Date : 15/06/2026
          Purpose : Columns
      *********************************************/
    const columns: ColumnActionRow<InvoiceRequestTableData>[] = [
        {
            key: "invoiceNo",
            header: <>Invoice No</>,
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
            key: "patientName",
            header: <>Patient Name</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "doctorName",
            header: <>Doctor Name</>,
            className: "text-center text-nowrap",
            sortable: true,
        },
        {
            key: "operationName",
            header: <>Operation Name</>,
            className: "text-center text-nowrap",
        },
        {
            key: "surgeryPrice",
            header: <>Surgery Price</>,
            className: "text-center",
            render: (row) => <span>₹ {row.surgeryPrice.toLocaleString()}</span>,
        },
        {
            key: "discount",
            header: <>Discount</>,
            className: "text-center",
            render: (row) => (
                <span className="text-danger">₹ {row.discount.toLocaleString()}</span>
            ),
        },
        {
            key: "balanceAmount",
            header: <>Balance Amount</>,
            className: "text-center",
            render: (row) => (
                <span className="fw-medium">₹ {row.balanceAmount.toLocaleString()}</span>
            ),
        },
        {
            key: "status",
            header: <>Status</>,
            className: "text-center text-nowrap",
            render: (row) => {
                const isPaid = row.status === "Invoice Generated";

                return (
                    <span
                        className={`${isPaid ? "status-confirmed" : "status-cancelled"}`}
                    >
                        {row.status}
                    </span>
                );
            },
        },
        {
            key: "date",
            header: <>Date</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            render: (row) => (
                <div className="d-flex justify-content-center gap-2">
                    {row.status === "Invoice Generated" && (
                        <>
                            {/* View */}
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

                            {/* Print */}
                            <button
                                type="button"
                                className="printer"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Print Invoice"
                                onClick={() => console.log("Print Invoice :", row)}
                            >
                                <i className="ri-printer-line fs-18"></i>
                            </button>
                        </>
                    )}

                    {row.status === "Unpaid" && (
                        <button
                            type="button"
                            className="edit"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Collect Payment"
                            onClick={() => console.log("Collect Payment :", row)}
                        >
                            <i className="ri-hand-coin-line fs-18"></i>
                        </button>
                    )}
                </div>
            ),
        },
    ];

    /********************************************
          Name : Manish Kumar
          Date : 15/06/2026
          Purpose : Reset Filters
      *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedStatus(null);
        setSelectedDate(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Invoice Request</p>
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

                {/* Status Filter */}
                <div>
                    <CustomFilterDropdown
                        options={statusOptions}
                        value={selectedStatus}
                        placeholder="Status"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedStatus(selected);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Reset */}
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