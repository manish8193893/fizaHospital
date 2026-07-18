import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";


/********************************************
    Name : Manish Kumar
    Date : 11/07/2026
    Purpose : Billing And Invoice Grid Table
*********************************************/

interface BillingAndInvoiceGridTableData {
    id: string;
    invoiceNumber: string;
    patientName: string;
    serviceName:
    | "Consultant"
    | "Admission"
    | "Surgery"
    | "Lab"
    | "Medicine"
    | "Doctor/Surgen Fee"
    | "Radiology";
    invoiceAmount: number;
    discount: number;
    netAmount: number;
    status: "Paid" | "Unpaid";
    dateTime: string;
}

export default function BillingAndInvoiceGridTable() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedService, setSelectedService] = useState<DropdownOption | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDateCalendar, setShowDateCalendar] = useState(false);

    const calendarRef = useRef<HTMLDivElement | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 11/07/2026
        Purpose : Service Options
    *********************************************/
    const serviceOptions: DropdownOption[] = [
        { id: "consultant", name: "Consultant" },
        { id: "admission", name: "Admission" },
        { id: "surgery", name: "Surgery" },
        { id: "lab", name: "Lab" },
        { id: "medicine", name: "Medicine" },
        { id: "doctor_fee", name: "Doctor/Surgen Fee" },
        { id: "radiology", name: "Radiology" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/07/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "paid", name: "Paid" },
        { id: "unpaid", name: "Unpaid" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/07/2026
        Purpose : Dummy Invoice Data
    *********************************************/
    const ALL_INVOICE_DATA: BillingAndInvoiceGridTableData[] = [
        {
            id: "INV001",
            invoiceNumber: "INV-1001",
            patientName: "Rahul Sharma",
            serviceName: "Consultant",
            invoiceAmount: 2500,
            discount: 200,
            netAmount: 2300,
            status: "Paid",
            dateTime: "11/07/2026 10:30 AM",
        },
        {
            id: "INV002",
            invoiceNumber: "INV-1002",
            patientName: "Priya Singh",
            serviceName: "Lab",
            invoiceAmount: 5000,
            discount: 500,
            netAmount: 4500,
            status: "Unpaid",
            dateTime: "11/07/2026 11:00 AM",
        },
        {
            id: "INV003",
            invoiceNumber: "INV-1003",
            patientName: "Amit Verma",
            serviceName: "Surgery",
            invoiceAmount: 85000,
            discount: 5000,
            netAmount: 80000,
            status: "Paid",
            dateTime: "16/06/2026 09:30 AM",
        },
        {
            id: "INV004",
            invoiceNumber: "INV-1004",
            patientName: "Sneha Kapoor",
            serviceName: "Admission",
            invoiceAmount: 25000,
            discount: 2500,
            netAmount: 22500,
            status: "Unpaid",
            dateTime: "16/06/2026 01:00 PM",
        },
        {
            id: "INV005",
            invoiceNumber: "INV-1005",
            patientName: "Vikas Kumar",
            serviceName: "Medicine",
            invoiceAmount: 6500,
            discount: 500,
            netAmount: 6000,
            status: "Paid",
            dateTime: "17/06/2026 12:15 PM",
        },
        {
            id: "INV006",
            invoiceNumber: "INV-1006",
            patientName: "Neha Gupta",
            serviceName: "Radiology",
            invoiceAmount: 12000,
            discount: 1000,
            netAmount: 11000,
            status: "Unpaid",
            dateTime: "18/06/2026 02:30 PM",
        },
        {
            id: "INV007",
            invoiceNumber: "INV-1007",
            patientName: "Rohan Mehta",
            serviceName: "Doctor/Surgen Fee",
            invoiceAmount: 15000,
            discount: 1500,
            netAmount: 13500,
            status: "Paid",
            dateTime: "19/06/2026 03:00 PM",
        },
        {
            id: "INV008",
            invoiceNumber: "INV-1008",
            patientName: "Anjali Rao",
            serviceName: "Consultant",
            invoiceAmount: 3000,
            discount: 300,
            netAmount: 2700,
            status: "Unpaid",
            dateTime: "19/06/2026 04:00 PM",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/07/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 11/07/2026
        Purpose : Filter Invoice Data
    *********************************************/
    const filteredInvoiceData = useMemo(() => {
        return ALL_INVOICE_DATA.filter((invoice) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                invoice.invoiceNumber.toLowerCase().includes(searchValue) ||
                invoice.patientName.toLowerCase().includes(searchValue) ||
                invoice.serviceName.toLowerCase().includes(searchValue);

            const matchesService =
                !selectedService ||
                invoice.serviceName.toLowerCase() === selectedService.name.toLowerCase();

            const matchesStatus =
                !selectedStatus ||
                invoice.status.toLowerCase() === selectedStatus.name.toLowerCase();

            let matchesDate = true;

            if (selectedDate) {
                const invoiceDate = invoice.dateTime.split(" ")[0];

                const selectedDateValue = `${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                )}/${String(selectedDate.getMonth() + 1).padStart(
                    2,
                    "0"
                )}/${selectedDate.getFullYear()}`;

                matchesDate = invoiceDate === selectedDateValue;
            }

            return matchesSearch && matchesService && matchesStatus && matchesDate;
        });
    }, [globalSearch, selectedService, selectedStatus, selectedDate]);

    const totalPages = Math.ceil(filteredInvoiceData.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredInvoiceData.slice(startIndex, endIndex);
    }, [filteredInvoiceData, currentPage, itemsPerPage]);

    // Component return statement would go here
    /********************************************
        Name : Manish Kumar
        Date : 11/07/2026
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
        Date : 11/07/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<BillingAndInvoiceGridTableData>[] = [
        {
            key: "invoiceNumber",
            header: <>Invoice Number</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="SquareSortVertical"
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
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="SquareSortVertical"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "serviceName",
            header: <>Service Name</>,
            className: "text-center p-0 text-nowrap",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="sort"
                    width={14}
                    height={14}
                />
            ),
            render: (row) => {
                const serviceConfig = {
                    "Consultant": { icon: "ri-stethoscope-line", bg: "#E8F3FF", color: "#0477BF" },
                    "Admission": { icon: "ri-hospital-line", bg: "#EAF8EF", color: "#1B8F4D" },
                    "Surgery": { icon: "ri-scissors-cut-line", bg: "#FFF0F0", color: "#FF4C51" },
                    "Lab": { icon: "ri-test-tube-line", bg: "#FFF7E6", color: "#F59E0B" },
                    "Medicine": { icon: "ri-capsule-line", bg: "#F1EDFF", color: "#6F42C1" },
                    "Doctor/Surgen Fee": { icon: "ri-user-star-line", bg: "#EAF6FF", color: "#0284C7" },
                    "Radiology": { icon: "ri-scan-line", bg: "#FCEEFF", color: "#C026D3" },
                }[row.serviceName];

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className="px-3 py-1 rounded-pill text-xs fw-medium d-flex align-items-center gap-1"
                            style={{
                                backgroundColor: serviceConfig.bg,
                                color: serviceConfig.color,
                            }}
                        >
                            <i className={`${serviceConfig.icon} fs-15`}></i>
                            {row.serviceName}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "invoiceAmount",
            header: <>Invoice Amount</>,
            className: "text-center",
            render: (row) => <>₹ {row.invoiceAmount.toLocaleString()}</>,
        },
        {
            key: "discount",
            header: <>Discount</>,
            className: "text-center",
            render: (row) => <>₹ {row.discount.toLocaleString()}</>,
        },
        {
            key: "netAmount",
            header: <>Net Amount</>,
            className: "text-center",
            render: (row) => <>₹ {row.netAmount.toLocaleString()}</>,
        },
        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Paid" ? "status-completed" : "status-cancelled"
                            }`}
                    >
                        {row.status}
                    </span>
                </div>
            ),
        },
        {
            key: "dateTime",
            header: <>Date</>,
            className: "text-center text-nowrap",
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "170px",
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

                    {/* Print Invoice */}
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

                    {/* Collect Payment Only For Unpaid */}
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
        Date : 11/07/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedService(null);
        setSelectedStatus(null);
        setSelectedDate(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Invoices List</p>

                <div className="Plus-btn">
                    <div className="text-white fs-14 fw-400">New Invoice</div>
                    <img
                        src="/Assets/Icons/WhitePlusCircle.svg"
                        alt="WhitePlusCircle"
                        width={22}
                        height={22}
                    />
                </div>
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

                {/* Service Filter */}
                <div>
                    <CustomFilterDropdown
                        options={serviceOptions}
                        value={selectedService}
                        placeholder="Service Type"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedService(selected);
                            setCurrentPage(1);
                        }}
                    />
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

                {/* Reset Filter */}
                <button
                    className="aph-filter-btn outline-0"
                    onClick={handleResetFilters}
                >
                    <i className="ri-filter-off-line"></i>
                </button>
            </div>

            {/* Table & Pagination Area */}
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