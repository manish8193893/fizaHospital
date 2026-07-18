import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";



import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";

/********************************************
    Name : Manish Kumar
    Date : 21/06/2026
    Purpose : SupplierInvoice
*********************************************/
interface SupplierInvoiceData {

    invoiceNo: string;

    invoiceDate: string;

    dueDate: string;

    amount: number;

    paid: number;

    balance: number;

    status:
    | "Paid"
    | "UnPaid"
    | "Partial";

}

export default function SupplierInvoice() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    const [showInvoiceModal, setShowInvoiceModal] =
        useState(false);

    const ALL_INVOICE_DATA:
        SupplierInvoiceData[] = [

            {
                invoiceNo: "INV001",
                invoiceDate: "01/06/2026",
                dueDate: "10/06/2026",
                amount: 25000,
                paid: 25000,
                balance: 0,
                status: "Paid",
            },

            {
                invoiceNo: "INV002",
                invoiceDate: "05/06/2026",
                dueDate: "15/06/2026",
                amount: 18000,
                paid: 10000,
                balance: 8000,
                status: "Partial",
            },

            {
                invoiceNo: "INV003",
                invoiceDate: "08/06/2026",
                dueDate: "18/06/2026",
                amount: 32000,
                paid: 0,
                balance: 32000,
                status: "UnPaid",
            },

            {
                invoiceNo: "INV004",
                invoiceDate: "12/06/2026",
                dueDate: "22/06/2026",
                amount: 15000,
                paid: 15000,
                balance: 0,
                status: "Paid",
            },

            {
                invoiceNo: "INV005",
                invoiceDate: "15/06/2026",
                dueDate: "25/06/2026",
                amount: 28000,
                paid: 12000,
                balance: 16000,
                status: "Partial",
            },

        ];

    const filteredInvoices =
        useMemo(() => {

            const search =
                globalSearch.toLowerCase();

            return ALL_INVOICE_DATA.filter(
                (invoice) =>

                    invoice.invoiceNo
                        .toLowerCase()
                        .includes(search) ||

                    invoice.status
                        .toLowerCase()
                        .includes(search)
            );

        }, [globalSearch]);

    const totalPages = Math.ceil(
        filteredInvoices.length /
        itemsPerPage
    );

    const visibleTableData =
        useMemo(() => {

            const startIndex =
                (currentPage - 1) *
                itemsPerPage;

            return filteredInvoices.slice(
                startIndex,
                startIndex + itemsPerPage
            );

        }, [
            filteredInvoices,
            currentPage,
            itemsPerPage,
        ]);

    const handleResetFilters = () => {

        setGlobalSearch("");

        setCurrentPage(1);

    };

    const columns:
        ColumnActionRow<SupplierInvoiceData>[] = [

            {
                key: "invoiceNo",
                header: <>Invoice No</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "invoiceDate",
                header: <>Invoice Date</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "dueDate",
                header: <>Due Date</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "amount",
                header: <>Amount</>,
                className: "text-center",
            },

            {
                key: "paid",
                header: <>Paid</>,
                className: "text-center",
            },

            {
                key: "balance",
                header: <>Balance</>,
                className: "text-center",
            },

            {
                key: "status",
                header: <>Status</>,
                className: "text-center",

                render: (
                    row: SupplierInvoiceData
                ) => (

                    <span
                        className={`d-flex justify-content-center
                        ${row.status === "Paid"
                                ? "status-completed"
                                : row.status === "Partial"
                                    ? "status-pending"
                                    : "status-cancelled"
                            }
                        `}
                    >
                        {row.status}
                    </span>

                ),
            },

            {
                key: "action",
                header: <>Action</>,

                render: (
                    row: SupplierInvoiceData
                ) => (

                    <button
                        type="button"
                        className="eye"
                        onClick={() =>
                            console.log(row)
                        }
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                ),
            },

        ];

    return (
        <>
            <div className="">

                <div className="d-flex justify-content-between mb-4">

                    <h5 className="fs-18 fw-500">
                        Supplier Invoice
                    </h5>

                    <div className="d-flex gap-3">
                        <div
                            className="Plus-btn"
                            onClick={() =>
                                setShowInvoiceModal(true)
                            }
                        >
                            <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />

                            <div className='text-white fs-16 fw-400'>
                                Add Invoice
                            </div>

                        </div>
                        <button
                            type="button"
                            className="back-btn"
                        >
                            <i className="ri-printer-line fs-16"></i>
                        </button>
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

                        <button className="aph-search-btn">
                            <i className="ri-search-line"></i>
                        </button>

                    </div>

                    <button
                        className="aph-filter-btn"
                        onClick={
                            handleResetFilters
                        }
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
                    onPageChange={(
                        page: number
                    ) =>
                        setCurrentPage(page)
                    }
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(
                        rows: number
                    ) => {

                        setItemsPerPage(rows);

                        setCurrentPage(1);

                    }}
                />

            </div>

            <AddInvoiceModal
                show={showInvoiceModal}
                handleClose={() =>
                    setShowInvoiceModal(false)
                }
            />
        </>
    );
}

interface AddInvoiceModalProps {

    show: boolean;

    handleClose: () => void;

}

function AddInvoiceModal({
    show,
    handleClose,
}: AddInvoiceModalProps) {

    const [formData, setFormData] =
        useState({
            invoiceNumber: "",
            paid: "",
            balance: "",
            invoiceFile: "",
        });

    const [invoiceDate, setInvoiceDate] =
        useState<Date | null>(null);

    const [showInvoiceCalendar, setShowInvoiceCalendar] =
        useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];

        if (!file)
            return;

        setFormData((prev) => ({
            ...prev,
            invoiceFile: file.name,
        }));

    };

    const handleSave = () => {

        console.log(
            "Invoice Data :",
            formData
        );

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

            <Modal.Header className='aph-modal-header mb-3'>

                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                    style={{
                        position: 'absolute',
                        right: '2.6rem',
                        top: '2.7rem'
                    }}
                    onClick={handleClose}
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className='fs-18 fw-400 aph-modal-title'>
                    Add Invoice
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Invoice Number{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="invoiceNumber"
                                    className="customInput"
                                    placeholder="Enter Invoice Number"
                                    value={formData.invoiceNumber}
                                    onChange={handleInputChange}
                                />
                                <i className="ri-file-list-3-line"></i>
                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Invoice Date{" "}<span className="text-danger">*</span>
                            </label>

                            <div
                                style={{
                                    position: "relative",
                                }}
                            >

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowInvoiceCalendar(
                                            !showInvoiceCalendar
                                        )
                                    }
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >

                                    <span>

                                        {invoiceDate
                                            ? `${String(invoiceDate.getDate()).padStart(2, "0")}/${String(invoiceDate.getMonth() + 1).padStart(2, "0")}/${invoiceDate.getFullYear()}`
                                            : "DD/MM/YYYY"}

                                    </span>

                                    <i
                                        className="ri-calendar-line"
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform:
                                                "translateY(-50%)",
                                            pointerEvents: "none",
                                            zIndex: 2,
                                        }}
                                    ></i>

                                </div>

                                {showInvoiceCalendar && (

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
                                                invoiceDate
                                            }
                                            onDateSelect={(date) => {

                                                setInvoiceDate(
                                                    date
                                                );

                                                setShowInvoiceCalendar(
                                                    false
                                                );

                                            }}
                                        />

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* ROW 2 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Paid{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="paid"
                                    placeholder="Enter Paid Amount"
                                    className="customInput"
                                    value={formData.paid}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-money-rupee-circle-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Balance{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="balance"
                                    placeholder="Enter Balance Amount"
                                    className="customInput"
                                    value={formData.balance}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-wallet-3-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 3 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Upload Invoice{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={formData.invoiceFile}
                                    placeholder="Choose File"
                                    readOnly
                                />

                                <i className="ri-attachment-2"></i>

                            </div>

                            <input
                                type="file"
                                className="mt-2"
                                hidden
                                onChange={handleFileChange}
                            />

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