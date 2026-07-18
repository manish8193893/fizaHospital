import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";




interface WalkInSalesData {
    invoiceNo: string;
    dateTime: string;
    customer: string;
    items: number;
    invoiceAmount: number;
    discount: number;
    netAmount: number;
    paymentMode: "Cash" | "Card";
}

export default function WalkInSalesGridTable() {

    const calendarRef = useRef<HTMLDivElement>(null);
    const [globalSearch, setGlobalSearch] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [showModal, setShowModal] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);


    /********************************************
        Dummy Data
    *********************************************/
    const ALL_WALKIN_SALES_DATA: WalkInSalesData[] = [
        {
            invoiceNo: "INV-1001",
            dateTime: "20-06-2026 09:15 AM",
            customer: "Rahul Sharma",
            items: 4,
            invoiceAmount: 2500,
            discount: 100,
            netAmount: 2400,
            paymentMode: "Cash",
        },
        {
            invoiceNo: "INV-1002",
            dateTime: "21-06-2026 10:05 AM",
            customer: "Priya Singh",
            items: 2,
            invoiceAmount: 1800,
            discount: 50,
            netAmount: 1750,
            paymentMode: "Card",
        },
        {
            invoiceNo: "INV-1003",
            dateTime: "22-06-2026 11:20 AM",
            customer: "Amit Verma",
            items: 6,
            invoiceAmount: 4200,
            discount: 200,
            netAmount: 4000,
            paymentMode: "Cash",
        },
        {
            invoiceNo: "INV-1004",
            dateTime: "23-06-2026 12:10 PM",
            customer: "Sneha Gupta",
            items: 3,
            invoiceAmount: 1500,
            discount: 0,
            netAmount: 1500,
            paymentMode: "Card",
        },
        {
            invoiceNo: "INV-1005",
            dateTime: "24-06-2026 01:25 PM",
            customer: "Rohit Kumar",
            items: 8,
            invoiceAmount: 5200,
            discount: 300,
            netAmount: 4900,
            paymentMode: "Cash",
        },
        {
            invoiceNo: "INV-1006",
            dateTime: "25-06-2026 02:45 PM",
            customer: "Neha Arora",
            items: 5,
            invoiceAmount: 3400,
            discount: 150,
            netAmount: 3250,
            paymentMode: "Card",
        },
        {
            invoiceNo: "INV-1007",
            dateTime: "26-06-2026 03:30 PM",
            customer: "Vikas Mehta",
            items: 2,
            invoiceAmount: 1200,
            discount: 50,
            netAmount: 1150,
            paymentMode: "Cash",
        },
        {
            invoiceNo: "INV-1008",
            dateTime: "27-06-2026 04:15 PM",
            customer: "Anjali Kapoor",
            items: 7,
            invoiceAmount: 6100,
            discount: 400,
            netAmount: 5700,
            paymentMode: "Card",
        },
    ];

    const filteredData = useMemo(() => {

        return ALL_WALKIN_SALES_DATA.filter(
            (row) => {

                const search =
                    globalSearch.toLowerCase();

                const matchesSearch =
                    row.invoiceNo.toLowerCase().includes(search) ||
                    row.customer.toLowerCase().includes(search);

                const matchesDate =
                    !selectedDate ||
                    row.dateTime.includes(
                        `${String(
                            selectedDate.getDate()
                        ).padStart(2, "0")}-${String(
                            selectedDate.getMonth() + 1
                        ).padStart(2, "0")}-${selectedDate.getFullYear()}`
                    );

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
        filteredData.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const start =
            (currentPage - 1) *
            itemsPerPage;

        const end =
            start + itemsPerPage;

        return filteredData.slice(
            start,
            end
        );

    }, [
        filteredData,
        currentPage,
        itemsPerPage,
    ]);

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date);
        setShowCalendar(false);
        setCurrentPage(1);
    };

    const columns: ColumnActionRow<WalkInSalesData>[] = [

        {
            key: "invoiceNo",
            header: <>Invoice No</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "dateTime",
            header: <>Date & Time</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "customer",
            header: <>Customer</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "items",
            header: <>Items</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "invoiceAmount",
            header: <>Invoice Amount</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            render: (row) => (
                <span>{row.invoiceAmount}</span>
            ),
        },

        {
            key: "discount",
            header: <>Discount</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            render: (row) => (
                <span>{row.discount}</span>
            ),
        },

        {
            key: "netAmount",
            header: <>Net Amount</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            render: (row) => (
                <span>{row.netAmount}</span>
            ),
        },

        {
            key: "paymentMode",
            header: <>Payment</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.paymentMode === "Cash"
                            ? "status-completed"
                            : "status-pending"
                            }`}
                    >
                        {row.paymentMode}
                    </span>
                </div>
            ),
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "100px",

            render: (row) => (
                <button
                    type="button"
                    className="eye"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="View"
                    onClick={() => console.log("View Invoice:", row.invoiceNo)}
                >
                    <i className="ri-eye-line fs-18"></i>
                </button>
            ),
        },
    ];

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

    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedDate(null);
        setShowCalendar(false);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 mt-4 mb-4">

                <p className="fs-18 fw-500">Walk-In Sales</p>

                <div className="Plus-btn" onClick={() => setShowModal(true)}>
                    <div className="text-white fs-14 fw-400">New Walk-In</div>
                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                </div>

            </div>

            {/* Filter Row */}
            <div className="aph-modal-filter-row mb-4">

                <div className="aph-filter-search">

                    <input
                        type="text"
                        placeholder="Global Search..."
                        className="aph-search-input"
                        value={globalSearch}
                        onChange={(e) => {
                            setGlobalSearch(
                                e.target.value
                            );
                            setCurrentPage(1);
                        }}
                    />

                    <button className="aph-search-btn">
                        <i className="ri-search-line"></i>
                    </button>

                </div>

                <div className="aph-calendar-filter" ref={calendarRef}>
                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() => setShowCalendar(!showCalendar)}
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

                <button
                    className="aph-filter-btn outline-0"
                    onClick={handleResetFilters}
                >
                    <i className="ri-filter-off-line"></i>
                </button>

                <button
                    type="button"
                    className="aph-filter-btn outline-0"
                    onClick={() => console.log("Export PDF")}
                >
                    <i className="ri-file-pdf-2-line fs-18 text-red me-1"></i>
                    Export To PDF
                </button>

                <button
                    type="button"
                    className="aph-filter-btn outline-0"
                    onClick={() => console.log("Export Excel")}
                >
                    <i className="ri-file-excel-2-line text-green fs-18 me-1"></i>
                    Export To Excel
                </button>

            </div>

            {/* Table */}
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
                    onRowsPerPageChange={(rows) => { setItemsPerPage(rows); setCurrentPage(1); }}
                />

            </div>

            <WalkInSalesModal
                show={showModal}
                handleClose={() => setShowModal(false)}
            />
        </>
    );
}

import { Modal } from "react-bootstrap";
import { DrugModal } from "../OutPatientSale/OutPatientSaleView";

interface WalkInSalesModalProps {
    show: boolean;
    handleClose: () => void;
}

export function WalkInSalesModal({
    show,
    handleClose,
}: WalkInSalesModalProps) {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        customerName: "",
        mobileNumber: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        console.log("Customer Name:", formData.customerName);
        console.log("Mobile Number:", formData.mobileNumber);
        setStep(2);
    };

    const handleCancel = () => {
        setStep(1);
        handleClose();
    }


    return (
        <>
            {step === 1 && (
                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        centered
                        size="lg"
                        backdrop="static"
                        contentClassName="aph-modal-content"
                        backdropClassName="aph-modal-backdrop"
                    >

                        {/* HEADER */}
                        <Modal.Header className="aph-modal-header mb-3">

                            <button
                                type="button"
                                className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                                style={{
                                    position: "absolute",
                                    right: "2.6rem",
                                    top: "2.7rem",
                                }}
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                            </button>

                            <Modal.Title className="fs-18 fw-400 aph-modal-title">
                                Walk-In Sales
                            </Modal.Title>

                        </Modal.Header>

                        <Modal.Body className="p-0">
                            <form>
                                <div className="formRow">
                                    <div className="formGroup">
                                        <label className="customLabel">
                                            Customer Name <span className="fs-14 fw-500 text-muted">(Optional)</span>
                                        </label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                name="customerName"
                                                value={formData.customerName}
                                                onChange={handleInputChange}
                                                className="customInput"
                                                placeholder="Enter Coustomer Name"
                                            />
                                            <i className="ri-user-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Mobile Number <span className="fs-14 fw-500 text-muted">(Optional)</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                name="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleInputChange}
                                                className="customInput"
                                                placeholder="Enter Mobile Number"
                                            />
                                            <i className="ri-phone-line"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>

                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </>
            )}

            {step === 2 && (
                <>
                    <DrugModal
                        show={show}
                        handleClose={handleCancel}
                        title="Proceed"
                    />
                </>
            )}
        </>
    )
}