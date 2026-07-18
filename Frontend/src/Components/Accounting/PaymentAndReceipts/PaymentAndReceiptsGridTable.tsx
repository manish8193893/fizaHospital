import { useEffect, useMemo, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";


/********************************************
    Name : Manish Kumar
    Date : 12/07/2026
    Purpose : Payment And Receipts Grid Table
*********************************************/

interface PaymentAndReceiptsTableData {
    id: string;
    receiptNo: string;
    invoiceNo: string;
    patientName: string;
    amountPaid: number;
    paymentMethod: "Cash" | "Card" | "UPI";
    paymentDate: string;
    receivedBy: string;
}

export default function PaymentAndReceiptsGridTable() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<DropdownOption | null>(null);

    /********************************************
        Nam : Manish Kumar
        Dae : 12/07/2026
        Prpose : Payment Method Options
    *********************************************/
    const paymentMethodOptions: DropdownOption[] = [
        { id: "cash", name: "Cash" },
        { id: "card", name: "Card" },
        { id: "upi", name: "UPI" },
    ];

    /********************************************
        Nam : Manish Kumar
        Dae : 12/07/2026
        Prpose : Dummy Payment Receipt Data
    *********************************************/
    const ALL_PAYMENT_RECEIPTS_DATA: PaymentAndReceiptsTableData[] = [
        {
            id: "REC001",
            receiptNo: "REC-1001",
            invoiceNo: "INV-1001",
            patientName: "Rahul Sharma",
            amountPaid: 2300,
            paymentMethod: "Cash",
            paymentDate: "12/07/2026",
            receivedBy: "Admin User",
        },
        {
            id: "REC002",
            receiptNo: "REC-1002",
            invoiceNo: "INV-1002",
            patientName: "Priya Singh",
            amountPaid: 4500,
            paymentMethod: "UPI",
            paymentDate: "12/07/2026",
            receivedBy: "Reception Desk",
        },
        {
            id: "REC003",
            receiptNo: "REC-1003",
            invoiceNo: "INV-1003",
            patientName: "Amit Verma",
            amountPaid: 80000,
            paymentMethod: "Card",
            paymentDate: "16/06/2026",
            receivedBy: "Billing Counter",
        },
        {
            id: "REC004",
            receiptNo: "REC-1004",
            invoiceNo: "INV-1004",
            patientName: "Sneha Kapoor",
            amountPaid: 22500,
            paymentMethod: "Cash",
            paymentDate: "16/06/2026",
            receivedBy: "Admin User",
        },
        {
            id: "REC005",
            receiptNo: "REC-1005",
            invoiceNo: "INV-1005",
            patientName: "Vikas Kumar",
            amountPaid: 6000,
            paymentMethod: "UPI",
            paymentDate: "17/06/2026",
            receivedBy: "Reception Desk",
        },
        {
            id: "REC006",
            receiptNo: "REC-1006",
            invoiceNo: "INV-1006",
            patientName: "Neha Gupta",
            amountPaid: 11000,
            paymentMethod: "Card",
            paymentDate: "18/06/2026",
            receivedBy: "Billing Counter",
        },
        {
            id: "REC007",
            receiptNo: "REC-1007",
            invoiceNo: "INV-1007",
            patientName: "Rohan Mehta",
            amountPaid: 13500,
            paymentMethod: "Cash",
            paymentDate: "19/06/2026",
            receivedBy: "Admin User",
        },
        {
            id: "REC008",
            receiptNo: "REC-1008",
            invoiceNo: "INV-1008",
            patientName: "Anjali Rao",
            amountPaid: 2700,
            paymentMethod: "UPI",
            paymentDate: "19/06/2026",
            receivedBy: "Reception Desk",
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
        Purpose : Filter Payment Receipts
    *********************************************/
    const filteredPaymentReceipts = useMemo(() => {
        return ALL_PAYMENT_RECEIPTS_DATA.filter((receipt) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                receipt.receiptNo.toLowerCase().includes(searchValue) ||
                receipt.invoiceNo.toLowerCase().includes(searchValue) ||
                receipt.patientName.toLowerCase().includes(searchValue);

            const matchesPaymentMethod =
                !selectedPaymentMethod ||
                receipt.paymentMethod.toLowerCase() === selectedPaymentMethod.name.toLowerCase();

            return matchesSearch && matchesPaymentMethod;
        });
    }, [globalSearch, selectedPaymentMethod]);

    const totalPages = Math.ceil(filteredPaymentReceipts.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredPaymentReceipts.slice(startIndex, endIndex);
    }, [filteredPaymentReceipts, currentPage, itemsPerPage]);

    // Component return statement goes here
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
    const columns: ColumnActionRow<PaymentAndReceiptsTableData>[] = [
        {
            key: "receiptNo",
            header: <>Receipt No</>,
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
            key: "amountPaid",
            header: <>Amount Paid</>,
            className: "text-center",
            render: (row) => <span>₹ {row.amountPaid.toLocaleString()}</span>,
        },
        {
            key: "paymentMethod",
            header: <>Payment Method</>,
            className: "text-center",
            render: (row) => {
                const paymentConfig = {
                    Cash: { icon: "ri-money-rupee-circle-line", bg: "#EAF8EF", color: "#1B8F4D" },
                    Card: { icon: "ri-bank-card-line", bg: "#E8F3FF", color: "#0477BF" },
                    UPI: { icon: "ri-smartphone-line", bg: "#FFF7E6", color: "#F59E0B" },
                }[row.paymentMethod];

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className="px-3 py-1 rounded-pill text-xs fw-medium d-flex align-items-center gap-1"
                            style={{
                                backgroundColor: paymentConfig.bg,
                                color: paymentConfig.color,
                            }}
                        >
                            <i className={`${paymentConfig.icon} fs-15`}></i>
                            {row.paymentMethod}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "paymentDate",
            header: <>Payment Date</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "receivedBy",
            header: <>Received By</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            render: (row) => (
                <div className="d-flex justify-content-center gap-2">
                    {/* View Receipt */}
                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View Details"
                        onClick={() => console.log("View Receipt :", row)}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    {/* Print Receipt */}
                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Print Receipt"
                        onClick={() => console.log("Print Receipt :", row)}
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
        setSelectedPaymentMethod(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Payment And Receipts</p>

                <div className="Plus-btn">
                    <div className="text-white fs-14 fw-400">New Receipt</div>
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

                {/* Payment Method Filter */}
                <div>
                    <CustomFilterDropdown
                        options={paymentMethodOptions}
                        value={selectedPaymentMethod}
                        placeholder="Payment Method"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedPaymentMethod(selected);
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