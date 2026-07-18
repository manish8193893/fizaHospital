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
    Purpose : Expenses Grid Table
*********************************************/

interface ExpensesTableData {
    id: string;
    expenseNo: string;
    expenseDate: string;
    category:
    | "Electricity/Water Bill"
    | "Pharmacy"
    | "Medication"
    | "Staff Salaries";
    paidTo: string;
    description: string;
    paymentMethod: "Cash" | "UPI" | "Card";
    amount: number;
}

export default function ExpensesGridTable() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<DropdownOption | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDateCalendar, setShowDateCalendar] = useState(false);

    const calendarRef = useRef<HTMLDivElement | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Category Options
    *********************************************/
    const categoryOptions: DropdownOption[] = [
        { id: "electricity_water", name: "Electricity/Water Bill" },
        { id: "pharmacy", name: "Pharmacy" },
        { id: "medication", name: "Medication" },
        { id: "staff_salaries", name: "Staff Salaries" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Payment Method Options
    *********************************************/
    const paymentMethodOptions: DropdownOption[] = [
        { id: "cash", name: "Cash" },
        { id: "upi", name: "UPI" },
        { id: "card", name: "Card" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Dummy Expenses Data
    *********************************************/
    const ALL_EXPENSE_DATA: ExpensesTableData[] = [
        {
            id: "EXP001",
            expenseNo: "EXP-1001",
            expenseDate: "12/07/2026",
            category: "Electricity/Water Bill",
            paidTo: "Delhi Electricity Board",
            description: "Monthly electricity and water charges for hospital building",
            paymentMethod: "UPI",
            amount: 85000,
        },
        {
            id: "EXP002",
            expenseNo: "EXP-1002",
            expenseDate: "16/06/2026",
            category: "Pharmacy",
            paidTo: "MediCare Pharmacy",
            description: "Purchase of medicines and pharmacy inventory items",
            paymentMethod: "Card",
            amount: 45000,
        },
        {
            id: "EXP003",
            expenseNo: "EXP-1003",
            expenseDate: "17/06/2026",
            category: "Medication",
            paidTo: "Apollo Medical Supplier",
            description: "Emergency medication stock purchase",
            paymentMethod: "Cash",
            amount: 35000,
        },
        {
            id: "EXP004",
            expenseNo: "EXP-1004",
            expenseDate: "18/06/2026",
            category: "Staff Salaries",
            paidTo: "Hospital Staff",
            description: "Monthly salary payment for hospital employees",
            paymentMethod: "UPI",
            amount: 250000,
        },
        {
            id: "EXP005",
            expenseNo: "EXP-1005",
            expenseDate: "19/06/2026",
            category: "Pharmacy",
            paidTo: "HealthCare Pharmacy",
            description: "Regular pharmacy consumable purchase",
            paymentMethod: "Cash",
            amount: 28000,
        },
        {
            id: "EXP006",
            expenseNo: "EXP-1006",
            expenseDate: "20/06/2026",
            category: "Medication",
            paidTo: "Medical Distributor",
            description: "Monthly medication supply expenses",
            paymentMethod: "Card",
            amount: 62000,
        },
        {
            id: "EXP007",
            expenseNo: "EXP-1007",
            expenseDate: "21/06/2026",
            category: "Electricity/Water Bill",
            paidTo: "Water Department",
            description: "Hospital water maintenance and service bill",
            paymentMethod: "UPI",
            amount: 22000,
        },
        {
            id: "EXP008",
            expenseNo: "EXP-1008",
            expenseDate: "22/06/2026",
            category: "Staff Salaries",
            paidTo: "Contract Staff",
            description: "Payment for temporary hospital support staff",
            paymentMethod: "Cash",
            amount: 75000,
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
        Purpose : Filter Expense Data
    *********************************************/
    const filteredExpenseData = useMemo(() => {
        return ALL_EXPENSE_DATA.filter((expense) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                expense.expenseNo.toLowerCase().includes(searchValue) ||
                expense.paidTo.toLowerCase().includes(searchValue) ||
                expense.description.toLowerCase().includes(searchValue);

            const matchesCategory =
                !selectedCategory ||
                expense.category.toLowerCase() === selectedCategory.name.toLowerCase();

            const matchesPayment =
                !selectedPaymentMethod ||
                expense.paymentMethod.toLowerCase() === selectedPaymentMethod.name.toLowerCase();

            let matchesDate = true;

            if (selectedDate) {
                const formattedDate = `${String(selectedDate.getDate()).padStart(
                    2,
                    "0"
                )}/${String(selectedDate.getMonth() + 1).padStart(
                    2,
                    "0"
                )}/${selectedDate.getFullYear()}`;

                matchesDate = expense.expenseDate === formattedDate;
            }

            return matchesSearch && matchesCategory && matchesPayment && matchesDate;
        });
    }, [globalSearch, selectedCategory, selectedPaymentMethod, selectedDate]);

    const totalPages = Math.ceil(filteredExpenseData.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredExpenseData.slice(startIndex, endIndex);
    }, [filteredExpenseData, currentPage, itemsPerPage]);

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
        Purpose : Truncate Text
    *********************************************/
    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
            return text;
        }
        return `${text.substring(0, maxLength)}...`;
    };

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<ExpensesTableData>[] = [
        {
            key: "expenseNo",
            header: <>Expense No</>,
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
            key: "expenseDate",
            header: <>Expense Date</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "category",
            header: <>Category</>,
            className: "text-center text-nowrap",
            render: (row) => {
                const categoryConfig = {
                    "Electricity/Water Bill": {
                        icon: "ri-flashlight-line",
                        bg: "#FFF7E6",
                        color: "#F59E0B",
                    },
                    Pharmacy: {
                        icon: "ri-medicine-bottle-line",
                        bg: "#EAF8EF",
                        color: "#1B8F4D",
                    },
                    Medication: {
                        icon: "ri-capsule-line",
                        bg: "#F1EDFF",
                        color: "#6F42C1",
                    },
                    "Staff Salaries": {
                        icon: "ri-user-settings-line",
                        bg: "#E8F3FF",
                        color: "#0477BF",
                    },
                }[row.category];

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className="px-3 py-1 rounded-pill text-xs fw-medium d-flex align-items-center gap-1"
                            style={{
                                backgroundColor: categoryConfig.bg,
                                color: categoryConfig.color,
                            }}
                        >
                            <i className={`${categoryConfig.icon} fs-15`}></i>
                            {row.category}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "paidTo",
            header: <>Paid To</>,
            className: "text-center text-nowrap",
            sortable: true,
        },
        {
            key: "description",
            header: <>Description</>,
            className: "text-center",
            render: (row) => (
                <div
                    title={row.description}
                    className="text-truncate mx-auto"
                    style={{ maxWidth: "50px", cursor: "pointer" }}
                >
                    {truncateText(row.description, 35)}
                </div>
            ),
        },
        {
            key: "paymentMethod",
            header: <>Payment Method</>,
            className: "text-center",
            render: (row) => {
                const paymentConfig = {
                    Cash: { icon: "ri-money-rupee-circle-line", bg: "#EAF8EF", color: "#1B8F4D" },
                    UPI: { icon: "ri-smartphone-line", bg: "#E8F3FF", color: "#0477BF" },
                    Card: { icon: "ri-bank-card-line", bg: "#F1EDFF", color: "#6F42C1" },
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
            key: "amount",
            header: <>Amount</>,
            className: "text-center",
            render: (row) => <span className="fw-medium">₹ {row.amount.toLocaleString()}</span>,
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

                    {/* Edit Details */}
                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Edit Details"
                        onClick={() => console.log("Edit Details :", row)}
                    >
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </button>

                    {/* Print */}
                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Print Expense"
                        onClick={() => console.log("Print Expense :", row)}
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
        setSelectedCategory(null);
        setSelectedPaymentMethod(null);
        setSelectedDate(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Expenses</p>
            </div>

            {/* Filter Row */}
            <div className="aph-modal-filter-row mb-4">
                {/* Search */}
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

                {/* Category Filter */}
                <div>
                    <CustomFilterDropdown
                        options={categoryOptions}
                        value={selectedCategory}
                        placeholder="Category"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedCategory(selected);
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