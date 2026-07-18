import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";



/********************************************
    Name : Manish Kumar
    Date : 21/06/2026
    Purpose : SupplierProducts
*********************************************/
interface SupplierProductData {

    productName: string;
    productId: string;
    invoiceNo: string;
    purchaseDate: string;
    batchNo: string;
    lastBuyingPrice: number;
    discount: number;
    receivedQty: number;
    initialAmount: number;
    returnQty: number;
    returnAmount: number;
    balanceAmount: number;
    returnDate: string;
}

export default function SupplierProducts() {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<SupplierProductData | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_PRODUCTS_DATA: SupplierProductData[] = [

        {
            productName: "Paracetamol 500mg",
            productId: "PRD001",
            invoiceNo: "INV1001",
            purchaseDate: "15/06/2026",
            batchNo: "BT001",
            lastBuyingPrice: 120,
            discount: 10,
            receivedQty: 100,
            initialAmount: 12000,
            returnQty: 5,
            returnAmount: 600,
            balanceAmount: 11400,
            returnDate: "20/06/2026",
        },

        {
            productName: "Vitamin C Tablets",
            productId: "PRD002",
            invoiceNo: "INV1002",
            purchaseDate: "18/06/2026",
            batchNo: "BT002",
            lastBuyingPrice: 80,
            discount: 5,
            receivedQty: 200,
            initialAmount: 16000,
            returnQty: 2,
            returnAmount: 160,
            balanceAmount: 15840,
            returnDate: "21/06/2026",
        },

        {
            productName: "Amoxicillin 250mg",
            productId: "PRD003",
            invoiceNo: "INV1003",
            purchaseDate: "10/06/2026",
            batchNo: "BT003",
            lastBuyingPrice: 150,
            discount: 15,
            receivedQty: 150,
            initialAmount: 22500,
            returnQty: 10,
            returnAmount: 1500,
            balanceAmount: 21000,
            returnDate: "19/06/2026",
        },

        {
            productName: "Ibuprofen 400mg",
            productId: "PRD004",
            invoiceNo: "INV1004",
            purchaseDate: "12/06/2026",
            batchNo: "BT004",
            lastBuyingPrice: 95,
            discount: 8,
            receivedQty: 120,
            initialAmount: 11400,
            returnQty: 3,
            returnAmount: 285,
            balanceAmount: 11115,
            returnDate: "18/06/2026",
        },

        {
            productName: "Multivitamin Capsules",
            productId: "PRD005",
            invoiceNo: "INV1005",
            purchaseDate: "20/06/2026",
            batchNo: "BT005",
            lastBuyingPrice: 200,
            discount: 20,
            receivedQty: 80,
            initialAmount: 16000,
            returnQty: 4,
            returnAmount: 800,
            balanceAmount: 15200,
            returnDate: "22/06/2026",
        },

    ];

    const totalPages = Math.ceil(
        ALL_PRODUCTS_DATA.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        return ALL_PRODUCTS_DATA.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    }, [
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Open Return Modal
    *********************************************/
    const handleOpenReturnModal = (
        row: SupplierProductData
    ) => {

        setSelectedRow(row);

        setShowReturnModal(true);

    };

    const columns: ColumnActionRow<SupplierProductData>[] = [

        {
            key: "productName",
            header: <>Product Name</>,
            sortable: true,
            className: "text-nowrap",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "productId",
            header: <>Product ID</>,
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "invoiceNo",
            header: <>Invoice No</>,
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "purchaseDate",
            header: <>Purchase Date</>,
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "batchNo",
            header: <>Batch No</>,
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "lastBuyingPrice",
            header: <>Last Buying Price</>,
        },

        {
            key: "discount",
            header: <>Discount</>,
        },

        {
            key: "receivedQty",
            header: <>Received Qty</>,
        },

        {
            key: "initialAmount",
            header: <>Initial Amount</>,
        },

        {
            key: "returnQty",
            header: <>Return Qty</>,
        },

        {
            key: "returnAmount",
            header: <>Return Amount</>,
        },

        {
            key: "balanceAmount",
            header: <>Balance Amount</>,
        },

        {
            key: "returnDate",
            header: <>Return Date</>,
        },

        {
            key: "action",
            header: <>Action</>,
            width: "140px",

            render: (row) => (

                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="delete"
                        onClick={() =>
                            handleOpenReturnModal(row)
                        }
                    >
                        <i className="ri-arrow-go-back-line fs-18"></i>
                    </button>

                    <button
                        type="button"
                        className="printer"
                    >
                        <i className="ri-printer-line fs-18"></i>
                    </button>

                </div>

            ),
        },

    ];

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fs-18 fw-500">
                    Supplier Products
                </h5>

                <button
                    type="button"
                    className="back-btn"
                >
                    <i className="ri-printer-line fs-16"></i>
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
                    onPageChange={(page) =>
                        setCurrentPage(page)
                    }
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows) => {
                        setItemsPerPage(rows);
                        setCurrentPage(1);
                    }}
                />

            </div>

            <ReturnProductModal
                show={showReturnModal}
                handleClose={() =>
                    setShowReturnModal(false)
                }
                selectedRow={selectedRow}
            />
        </>
    );
}

interface ReturnProductModalProps {

    show: boolean;

    handleClose: () => void;

    selectedRow:
    SupplierProductData | null;

}

function ReturnProductModal({
    show,
    handleClose,
    selectedRow,
}: ReturnProductModalProps) {

    const todayDate =
        new Date();

    const [returnQty, setReturnQty] =
        useState("");

    const [returnReason, setReturnReason] =
        useState("");

    const [returnDate, setReturnDate] =
        useState<Date | null>(
            todayDate
        );

    const [showCalendar, setShowCalendar] =
        useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Save Return
    *********************************************/
    const handleSave = () => {

        const payload = {

            productName:
                selectedRow?.productName,

            invoiceNo:
                selectedRow?.invoiceNo,

            batchNo:
                selectedRow?.batchNo,

            totalPrice:
                selectedRow?.initialAmount,

            discount:
                selectedRow?.discount,

            returnQty,

            returnReason,

            returnDate,

        };

        console.log(
            "Return Product Data :",
            payload
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
                    Return Product
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}

                    <div className="formRow d-flex">

                        <div className="formGroup">
                            <label className="customLabel">
                                Product Name{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={selectedRow?.productName || ""}
                                    disabled
                                />
                                <i className="ri-capsule-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">
                                Invoice No{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={selectedRow?.invoiceNo || ""}
                                    disabled
                                />
                                <i className="ri-file-list-3-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">
                                Batch No{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={selectedRow?.batchNo || ""}
                                    disabled
                                />
                                <i className="ri-barcode-line"></i>
                            </div>
                        </div>

                    </div>

                    {/* ROW 2 */}

                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">
                                Total Price{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={selectedRow?.initialAmount || ""}
                                    disabled
                                />
                                <i className="ri-money-rupee-circle-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">
                                Added Discount{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    value={selectedRow?.discount || ""}
                                    disabled
                                />
                                <i className="ri-percent-line"></i>
                            </div>
                        </div>

                    </div>

                    {/* ROW 3 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Return Qty{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    className="customInput"
                                    placeholder="Enter Qty"
                                    value={returnQty}
                                    onChange={(e) =>
                                        setReturnQty(
                                            e.target.value
                                        )
                                    }
                                />
                                <i className="ri-arrow-go-back-line"></i>
                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Return Date{" "}<span className="text-danger">*</span>
                            </label>

                            <div
                                style={{
                                    position: "relative",
                                }}
                            >

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowCalendar(
                                            !showCalendar
                                        )
                                    }
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >

                                    <span>

                                        {returnDate
                                            ? `${String(returnDate.getDate()).padStart(2, "0")}/${String(returnDate.getMonth() + 1).padStart(2, "0")}/${returnDate.getFullYear()}`
                                            : "DD/MM/YYYY"}

                                    </span>

                                    <i
                                        className="ri-calendar-line"
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                        }}
                                    />

                                </div>

                                {showCalendar && (

                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            zIndex: 1000,
                                        }}
                                    >

                                        <DateFilterCalendar
                                            selectedDate={returnDate}
                                            onDateSelect={(date) => {

                                                setReturnDate(date);

                                                setShowCalendar(false);

                                            }}
                                        />

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* ROW 4 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Return Reason{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    placeholder="Enter the Reason"
                                    value={returnReason}
                                    onChange={(e) =>
                                        setReturnReason(
                                            e.target.value
                                        )
                                    }
                                />
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