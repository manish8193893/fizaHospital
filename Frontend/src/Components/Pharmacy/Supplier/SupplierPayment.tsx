import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, { type DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";




/********************************************
    Name : Manish Kumar
    Date : 22/06/2026
    Purpose : SupplierPayment
*********************************************/
interface SupplierPaymentData {
    paymentNo: string;
    paymentDate: string;
    reference: string;
    method: string;
    amount: number;
    supplierName: string;
    notes: string;
}

export default function SupplierPayment() {

    const [globalSearch, setGlobalSearch] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const ALL_PAYMENT_DATA: SupplierPaymentData[] = [
        {
            paymentNo: "PAY001",
            paymentDate: "05/06/2026",
            reference: "REF001",
            method: "Cash",
            amount: 15000,
            supplierName: "Manish Kashyap",
            notes: "Medicine Purchase"
        },
        {
            paymentNo: "PAY002",
            paymentDate: "08/06/2026",
            reference: "REF002",
            method: "Bank Transfer",
            amount: 22000,
            supplierName: "Rohit Sharma",
            notes: "Inventory Payment"
        },
        {
            paymentNo: "PAY003",
            paymentDate: "12/06/2026",
            reference: "REF003",
            method: "Credit Card",
            amount: 18000,
            supplierName: "Amit Verma",
            notes: "Medical Equipment"
        },
        {
            paymentNo: "PAY004",
            paymentDate: "17/06/2026",
            reference: "REF004",
            method: "Debit Card",
            amount: 26000,
            supplierName: "Neha Singh",
            notes: "Bulk Stock"
        },
        {
            paymentNo: "PAY005",
            paymentDate: "21/06/2026",
            reference: "REF005",
            method: "Cash",
            amount: 12000,
            supplierName: "Rahul Gupta",
            notes: "Pending Invoice Payment"
        }
    ];

    const filteredPayments = useMemo(() => {

        const search = globalSearch.toLowerCase();

        return ALL_PAYMENT_DATA.filter((payment) =>
            payment.paymentNo.toLowerCase().includes(search) ||
            payment.supplierName.toLowerCase().includes(search) ||
            payment.reference.toLowerCase().includes(search)
        );

    }, [globalSearch]);

    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    const visibleTableData = useMemo(() => {

        const startIndex = (currentPage - 1) * itemsPerPage;

        return filteredPayments.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    }, [
        filteredPayments,
        currentPage,
        itemsPerPage
    ]);

    const handleResetFilters = () => {

        setGlobalSearch("");

        setCurrentPage(1);

    };

    const columns: ColumnActionRow<SupplierPaymentData>[] = [
        {
            key: "paymentNo",
            header: <>Payment No</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "paymentDate",
            header: <>Payment Date</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "reference",
            header: <>Reference</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "method",
            header: <>Method</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "amount",
            header: <>Amount</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "supplierName",
            header: <>Supplier Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "notes",
            header: <>Notes</>,
            className: "text-center",
        }
    ];

    return (
        <>
            <div className="">

                <div className="d-flex justify-content-between mb-4">

                    <h5 className="fs-18 fw-500">
                        Supplier Payment
                    </h5>

                    <div
                        className="Plus-btn"
                        onClick={() =>
                            setShowPaymentModal(true)
                        }
                    >
                        <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />

                        <div className="text-white fs-16 fw-400">
                            Pay Supplier
                        </div>

                    </div>

                </div>

                <div className="aph-modal-filter-row mb-4">

                    <div className="aph-filter-search">

                        <input
                            type="text"
                            className="aph-search-input"
                            placeholder="Search..."
                            value={globalSearch}
                            onChange={(e) => {

                                setGlobalSearch(e.target.value);

                                setCurrentPage(1);

                            }}
                        />

                        <button className="aph-search-btn">
                            <i className="ri-search-line"></i>
                        </button>

                    </div>

                    <button
                        className="aph-filter-btn"
                        onClick={handleResetFilters}
                    >
                        <i className="ri-filter-off-line"></i>
                    </button>

                </div>

                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page: number) =>
                        setCurrentPage(page)
                    }
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows: number) => {

                        setItemsPerPage(rows);

                        setCurrentPage(1);

                    }}
                />

            </div>

            <AddPaymentModal
                show={showPaymentModal}
                handleClose={() =>
                    setShowPaymentModal(false)
                }
            />
        </>
    );
}

interface AddPaymentModalProps {
    show: boolean;
    handleClose: () => void;
}

function AddPaymentModal({
    show,
    handleClose
}: AddPaymentModalProps) {

    const [lastPaymentDate, setLastPaymentDate] = useState<Date | null>(null);
    const [newPaymentDate, setNewPaymentDate] = useState<Date | null>(null);
    const [showLastPaymentCalendar, setShowLastPaymentCalendar] = useState(false);
    const [showNewPaymentCalendar, setShowNewPaymentCalendar] = useState(false);

    const paymentOptions: DropdownOption[] = [
        { id: "cash", name: "Cash" },
        { id: "debit", name: "Debit Card" },
        { id: "credit", name: "Credit Card" },
        { id: "bank", name: "Bank Transfer" }
    ];

    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<DropdownOption | null>(null);

    const [formData, setFormData] = useState({
        vendorName: "",
        currentOutstanding: "",
        totalInvoice: "",
        pendingInvoiceNumber: "",
        amountPaid: "",
        attachment: "",
        notes: ""
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            attachment: file.name
        }));

    };

    const handleSave = () => {

        console.log({
            ...formData,
            paymentMethod: selectedPaymentMethod,
            lastPaymentDate,
            newPaymentDate
        });

        handleClose();

    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
            backdrop="static"
            contentClassName="aph-modal-content"
            backdropClassName="aph-modal-backdrop"
        >

            <Modal.Header className="aph-modal-header mb-3">

                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                    style={{
                        position: "absolute",
                        right: "2.6rem",
                        top: "2.7rem"
                    }}
                    onClick={handleClose}
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    Pay Supplier
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}

                    <div className="formRow d-flex">

                        <div className="formGroup">
                            <label className="customLabel">Vendor Name{" "}<span className="text-danger">*</span></label>
                            <div className="inputWrapper">
                                <input type="text" name="vendorName" className="customInput" placeholder="Enter Vendor Name" value={formData.vendorName} onChange={handleInputChange} />
                                <i className="ri-user-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">Current Outstanding{" "}<span className="text-danger">*</span></label>
                            <div className="inputWrapper">
                                <input type="number" name="currentOutstanding" className="customInput" placeholder="Enter Current Outstanding" value={formData.currentOutstanding} onChange={handleInputChange} />
                                <i className="ri-wallet-3-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">Total Invoice{" "}<span className="text-danger">*</span></label>
                            <div className="inputWrapper">
                                <input type="number" name="totalInvoice" className="customInput" placeholder="Enter Total Invoice" value={formData.totalInvoice} onChange={handleInputChange} />
                                <i className="ri-bill-line"></i>
                            </div>
                        </div>

                    </div>

                    {/* ROW 2 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Last Payment Date{" "}<span className="text-danger">*</span>
                            </label>

                            <div
                                style={{
                                    position: "relative",
                                }}
                            >

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowLastPaymentCalendar(
                                            !showLastPaymentCalendar
                                        )
                                    }
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >

                                    <span>

                                        {lastPaymentDate
                                            ? `${String(lastPaymentDate.getDate()).padStart(2, "0")}/${String(lastPaymentDate.getMonth() + 1).padStart(2, "0")}/${lastPaymentDate.getFullYear()}`
                                            : "DD/MM/YYYY"}

                                    </span>

                                    <i
                                        className="ri-calendar-line"
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            pointerEvents: "none",
                                            zIndex: 2,
                                        }}
                                    ></i>

                                </div>

                                {showLastPaymentCalendar && (

                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            zIndex: 1000,
                                        }}
                                    >

                                        <DateFilterCalendar
                                            selectedDate={
                                                lastPaymentDate
                                            }
                                            onDateSelect={(date) => {

                                                setLastPaymentDate(
                                                    date
                                                );

                                                setShowLastPaymentCalendar(
                                                    false
                                                );

                                            }}
                                        />

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                New Payment Date{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div
                                style={{
                                    position: "relative",
                                }}
                            >

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowNewPaymentCalendar(
                                            !showNewPaymentCalendar
                                        )
                                    }
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >

                                    <span>

                                        {newPaymentDate
                                            ? `${String(newPaymentDate.getDate()).padStart(2, "0")}/${String(newPaymentDate.getMonth() + 1).padStart(2, "0")}/${newPaymentDate.getFullYear()}`
                                            : "DD/MM/YYYY"}

                                    </span>

                                    <i
                                        className="ri-calendar-line"
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            pointerEvents: "none",
                                            zIndex: 2,
                                        }}
                                    ></i>

                                </div>

                                {showNewPaymentCalendar && (

                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            zIndex: 1000,
                                        }}
                                    >

                                        <DateFilterCalendar
                                            selectedDate={
                                                newPaymentDate
                                            }
                                            onDateSelect={(date) => {

                                                setNewPaymentDate(
                                                    date
                                                );

                                                setShowNewPaymentCalendar(
                                                    false
                                                );

                                            }}
                                        />

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* ROW 3 */}

                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">Pending Invoice Number{" "}<span className="text-danger">*</span></label>
                            <div className="inputWrapper">
                                <input type="text" name="pendingInvoiceNumber" className="customInput" placeholder="Enter Pending Invoice Number" value={formData.pendingInvoiceNumber} onChange={handleInputChange} />
                                <i className="ri-file-list-3-line"></i>
                            </div>
                        </div>

                    </div>

                    {/* ROW 4 */}

                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">Amount Paid{" "}<span className="text-danger">*</span></label>
                            <div className="inputWrapper">
                                <input type="number" name="amountPaid" className="customInput" placeholder="Enter Amount Paid" value={formData.amountPaid} onChange={handleInputChange} />
                                <i className="ri-money-rupee-circle-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">Payment Method{" "}<span className="text-danger">*</span></label>
                            <CustomFormDropdown
                                options={paymentOptions}
                                value={selectedPaymentMethod}
                                onChange={setSelectedPaymentMethod}
                                placeholder="Select Payment Method"
                            />
                        </div>

                    </div>

                    {/* ROW 5 */}

                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">Attachment{" "}<span className="text-danger">*</span></label>
                            <div className="inputWrapper">
                                <input type="text" className="customInput" placeholder="Select Attachment" value={formData.attachment} readOnly />
                                <i className="ri-attachment-2"></i>
                            </div>
                            <input type="file" hidden className="mt-2" onChange={handleFileChange} />
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">Notes</label>
                            <div className="inputWrapper">
                                <input type="text" name="notes" className="customInput" placeholder="Enter Notes" value={formData.notes} onChange={handleInputChange} />
                                <i className="ri-file-text-line"></i>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                            onClick={handleSave}
                        >
                            Save
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
    );
}