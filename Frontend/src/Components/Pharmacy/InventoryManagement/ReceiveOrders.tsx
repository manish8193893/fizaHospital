import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../GlobalHelpers/Header";
import CustomFormDropdown, { type DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";

import "../../../styles/Pharmacy.css";

/********************************************
    Name : Manish Kumar
    Date : 21/06/2026
    Purpose : Interfaces
*********************************************/
interface ReceivedItem {
    id: string;
    productName: string;
    productPrice: number;
    purchasePrice: number;
    dosageForm: string;
    routeForm: string;
    quantity: number;
    receivedQty: number;
    remainingQty: number;
    batchNo: string;
    mfgDate: Date | null;
    expiryDate: Date | null;
}

interface PurchaseOrder {
    poNumber: string;
    supplier: string;
    receivedItemsLst: ReceivedItem[];
}

/********************************************
    Name : Manish Kumar
    Date : 21/06/2026
    Purpose : Receive Orders
*********************************************/
export default function ReceiveOrders() {

    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : PO Data
    *********************************************/
    const PO_DATA: PurchaseOrder[] = [
        {
            poNumber: "PO-0526-008",
            supplier: "Julphar",
            receivedItemsLst: [
                {
                    id: "1",
                    productName: "Amoxil 250",
                    productPrice: 450,
                    purchasePrice: 450,
                    dosageForm: "200mg",
                    routeForm: "Oral",
                    quantity: 150,
                    receivedQty: 0,
                    remainingQty: 150,
                    batchNo: "",
                    mfgDate: null,
                    expiryDate: null,
                },
                {
                    id: "2",
                    productName: "Paracetamol 500 mg Tablets",
                    productPrice: 2500,
                    purchasePrice: 2500,
                    dosageForm: "Tablet",
                    routeForm: "Oral",
                    quantity: 100,
                    receivedQty: 0,
                    remainingQty: 100,
                    batchNo: "",
                    mfgDate: null,
                    expiryDate: null,
                },
            ],
        },

        {
            poNumber: "PO-0526-010",
            supplier: "Hikma",
            receivedItemsLst: [
                {
                    id: "3",
                    productName: "Azithromycin 500 mg",
                    productPrice: 4500,
                    purchasePrice: 4300,
                    dosageForm: "Tablet",
                    routeForm: "Oral",
                    quantity: 75,
                    receivedQty: 0,
                    remainingQty: 75,
                    batchNo: "",
                    mfgDate: null,
                    expiryDate: null,
                },
            ],
        },

        {
            poNumber: "PO-0526-011",
            supplier: "Pfizer",
            receivedItemsLst: [
                {
                    id: "4",
                    productName: "Vitamin C 1000 mg",
                    productPrice: 1800,
                    purchasePrice: 1600,
                    dosageForm: "Tablet",
                    routeForm: "Oral",
                    quantity: 200,
                    receivedQty: 0,
                    remainingQty: 200,
                    batchNo: "",
                    mfgDate: null,
                    expiryDate: null,
                },
            ],
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Supplier Options
    *********************************************/
    const SUPPLIER_OPTIONS: DropdownOption[] = [
        { id: "sp001", name: "Ahmed Hassan" },
        { id: "sp002", name: "Mohammed Ali" },
        { id: "sp003", name: "Sarah Johnson" },
        { id: "sp004", name: "David Wilson" },
        { id: "sp005", name: "Fatima Abdullah" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Form State
    *********************************************/
    const [receiveWithoutPO, setReceiveWithoutPO] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedPOs, setSelectedPOs] = useState<PurchaseOrder[]>([]);
    const [attachedInvoice, setAttachedInvoice] = useState<File | null>(null);
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState<DropdownOption | null>(null);
    const [activeMfgDate, setActiveMfgDate] = useState<string | null>(null);
    const [activeExpiryDate, setActiveExpiryDate] = useState<string | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Invoice Date
    *********************************************/
    const [invoiceDate, setInvoiceDate] = useState<Date | null>(null);
    const [showInvoiceDateCalendar, setShowInvoiceDateCalendar] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Filtered PO List
    *********************************************/
    const filteredPOs = useMemo(() => {
        if (searchText.trim().length < 2) {
            return [];
        }

        return PO_DATA.filter((po) =>
            po.poNumber.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText]);

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Toggle PO
    *********************************************/
    const togglePO = (poNumber: string) => {
        const isSelected = selectedPOs.some((po) => po.poNumber === poNumber);

        if (isSelected) {
            setSelectedPOs((prev) => prev.filter((po) => po.poNumber !== poNumber));
            return;
        }

        const poData = PO_DATA.find((po) => po.poNumber === poNumber);

        if (poData) {
            setSelectedPOs((prev) => [...prev, JSON.parse(JSON.stringify(poData))]);
        }
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Invoice Upload
    *********************************************/
    const handleInvoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setAttachedInvoice(file);
        }
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Update Received Qty
    *********************************************/
    const updateReceivedQty = (poNumber: string, itemId: string, qty: number) => {
        setSelectedPOs((prev) =>
            prev.map((po) => {
                if (po.poNumber !== poNumber) {
                    return po;
                }

                return {
                    ...po,
                    receivedItemsLst: po.receivedItemsLst.map((item) => {
                        if (item.id !== itemId) {
                            return item;
                        }

                        return {
                            ...item,
                            receivedQty: qty,
                            remainingQty: item.quantity - qty,
                        };
                    }),
                };
            })
        );
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Update Batch No
    *********************************************/
    const updateBatchNo = (poNumber: string, itemId: string, batchNo: string) => {
        setSelectedPOs((prev) =>
            prev.map((po) => {
                if (po.poNumber !== poNumber) {
                    return po;
                }

                return {
                    ...po,
                    receivedItemsLst: po.receivedItemsLst.map((item) =>
                        item.id === itemId
                            ? {
                                ...item,
                                batchNo,
                            }
                            : item
                    ),
                };
            })
        );
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Save Data
    *********************************************/
    const handleSave = () => {
        const payload = {
            receiveWithoutPO,
            attachedInvoice,
            invoiceNumber,
            invoiceDate,
            supplier: selectedSupplier,
            discountAmount,
            selectedPOs,
        };

        console.log("Receive Order Data :", payload);
    };

    return (
        <>
            <div className="container-fluid p-3">

                {/* Header */}
                <Header heading="Pharmacy" subHeading="/Inventory Management / Receive Orders" />

                {/* Heading */}
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h5 className="patient-info-heading mb-0">Receive Items</h5>

                    <div className="d-flex justify-content-between gap-3">
                        <button
                            className="back-btn"
                            onClick={() => navigate("/pharmacy/InventoryManagement")}
                        >
                            <i className="ri-arrow-left-line me-3"></i>
                            Back
                        </button>

                        <button
                            className="border-blue text-blue outline-0 px-5"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>

                <div className="card border-0 rounded-0 shadow-sm">

                    <div className="card-body">

                        {/* ROW 1 */}
                        <div className="formRow">
                            <div className="formGroup">
                                <label className="customLabel">Receive Without PO</label>

                                <div className="form-check form-switch mt-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={receiveWithoutPO}
                                        onChange={(e) => setReceiveWithoutPO(e.target.checked)}
                                        style={{
                                            width: "55px",
                                            height: "28px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ROW 2 */}
                        {!receiveWithoutPO ? (
                            <>
                                <div className="formRow">
                                    <div className="formGroup w-100">
                                        <label className="customLabel">
                                            PO Number <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper rounded-0">
                                            <input
                                                type="text"
                                                className="customInput rounded-0"
                                                placeholder="Search PO Number..."
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                            <i className="ri-search-ai-line fs-18"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">
                                            Attached Invoice <span className="text-danger">*</span>
                                        </label>

                                        <div
                                            className="inputWrapper"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => document.getElementById("invoiceFile")?.click()}
                                        >
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={attachedInvoice?.name || ""}
                                                placeholder="Select Invoice File"
                                            />
                                            <i className="ri-attachment-2"></i>
                                        </div>

                                        <input
                                            id="invoiceFile"
                                            type="file"
                                            hidden
                                            onChange={handleInvoiceUpload}
                                        />
                                    </div>
                                </div>

                                {/* PO LIST */}
                                {searchText.length >= 2 && (
                                    <div
                                        className="mt-3 rounded-3 bg-white"
                                        style={{
                                            maxHeight: "260px",
                                            overflowY: "auto",
                                        }}
                                    >
                                        {filteredPOs.length > 0 ? (
                                            filteredPOs.map((po) => (
                                                <div
                                                    key={po.poNumber}
                                                    className="d-flex justify-content-between align-items-center px-3 border my-2"
                                                >
                                                    <div>
                                                        <p className="fw-500 fs-14 mb-0 d-flex align-items-center">
                                                            <i
                                                                className="ri-file-list-3-line fs-18 me-2"
                                                                style={{ color: "#A78CEA" }}
                                                            ></i>
                                                            {po.poNumber}
                                                        </p>
                                                        <p className="text-muted fs-12 mb-0 ms-4">{po.supplier}</p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className={`medicine-check-btn ${selectedPOs.some(
                                                            (selectedPO) => selectedPO.poNumber === po.poNumber
                                                        )
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                        onClick={() => togglePO(po.poNumber)}
                                                    >
                                                        <i className="ri-check-line" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-muted">No PO Found</div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="formRow">
                                <div className="formGroup w-100">
                                    <label className="customLabel">
                                        Attached Invoice <span className="text-danger">*</span>
                                    </label>

                                    <div
                                        className="inputWrapper"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => document.getElementById("invoiceFile")?.click()}
                                    >
                                        <input
                                            type="text"
                                            className="customInput"
                                            value={attachedInvoice?.name || ""}
                                            placeholder="Select Invoice File"
                                        />
                                        <i className="ri-attachment-2"></i>
                                    </div>

                                    <input
                                        id="invoiceFile"
                                        type="file"
                                        hidden
                                        onChange={handleInvoiceUpload}
                                    />
                                </div>
                            </div>
                        )}

                        {/* ROW 3 */}
                        <div className="formRow">
                            <div className="formGroup">
                                <label className="customLabel">
                                    Invoice Number <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Invoice Number"
                                        value={invoiceNumber}
                                        onChange={(e) => setInvoiceNumber(e.target.value)}
                                    />
                                    <i className="ri-file-text-line"></i>
                                </div>
                            </div>

                            <div className="formGroup">
                                <label className="customLabel">
                                    Invoice Date <span className="text-danger">*</span>
                                </label>

                                <div style={{ position: "relative" }}>
                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() => setShowInvoiceDateCalendar(!showInvoiceDateCalendar)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span>
                                            {invoiceDate
                                                ? `${String(invoiceDate.getDate()).padStart(2, "0")}/${String(
                                                    invoiceDate.getMonth() + 1
                                                ).padStart(2, "0")}/${invoiceDate.getFullYear()}`
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

                                    {showInvoiceDateCalendar && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                            }}
                                        >
                                            <DateFilterCalendar
                                                selectedDate={invoiceDate}
                                                onDateSelect={(date) => {
                                                    setInvoiceDate(date);
                                                    setShowInvoiceDateCalendar(false);
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
                                    Supplier <span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={SUPPLIER_OPTIONS}
                                    value={selectedSupplier}
                                    onChange={(value) => setSelectedSupplier(value)}
                                    placeholder="Select Supplier"
                                />
                            </div>

                            <div className="formGroup">
                                <label className="customLabel">Discount Amount</label>

                                <div className="inputWrapper">
                                    <input
                                        type="number"
                                        className="customInput"
                                        placeholder="Enter Discount Amount"
                                        value={discountAmount}
                                        onChange={(e) => setDiscountAmount(e.target.value)}
                                    />
                                    <i className="ri-money-dollar-circle-line"></i>
                                </div>
                            </div>
                        </div>

                        {/* PO DETAILS */}
                        {selectedPOs.map((po) => (

                            <div key={po.poNumber} className="my-3 border overflow-hidden" >

                                <div className="bg-blue text-white py-3 px-3">PO Items Table {po.poNumber}</div>

                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle mb-0">
                                        <thead>
                                            <tr className="text-nowrap">
                                                <th className="text-center fs-16 fw-500">#</th>
                                                <th className="text-center fs-16 fw-500">Product Name</th>
                                                <th className="text-center fs-16 fw-500">Product Price</th>
                                                <th className="text-center fs-16 fw-500">Purchase Price</th>
                                                <th className="text-center fs-16 fw-500">Dosage Form</th>
                                                <th className="text-center fs-16 fw-500">Route Form</th>
                                                <th className="text-center fs-16 fw-500">Quantity</th>
                                                <th className="text-center fs-16 fw-500">Received Qty</th>
                                                <th className="text-center fs-16 fw-500">Remaining Qty</th>
                                                <th className="text-center fs-16 fw-500">Batch No</th>
                                                <th className="text-center fs-16 fw-500">MFG Date</th>
                                                <th className="text-center fs-16 fw-500">Expiry Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {po.receivedItemsLst.map((item, index) => (
                                                <tr key={item.id} className="text-nowrap">
                                                    <td className="text-center fs-14 fw-400">{index + 1}</td>
                                                    <td className="fs-14 fw-400">{item.productName}</td>
                                                    <td className="text-center fs-14 fw-400">{item.productPrice}</td>
                                                    <td className="text-center fs-14 fw-400">{item.purchasePrice}</td>
                                                    <td className="text-center fs-14 fw-400">{item.dosageForm}</td>
                                                    <td className="text-center fs-14 fw-400">{item.routeForm}</td>
                                                    <td className="text-center fs-14 fw-400 bg-body-tertiary">{item.quantity}</td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="customInput rounded-0 pe-0"
                                                            placeholder="Received Qty"
                                                            min={0}
                                                            max={item.quantity}
                                                            value={item.receivedQty}
                                                            onChange={(e) =>
                                                                updateReceivedQty(po.poNumber, item.id, Number(e.target.value))
                                                            }
                                                        />
                                                    </td>
                                                    <td className="text-center fs-14 fw-400 bg-body-tertiary">{item.remainingQty}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            className="customInput rounded-0 px-2"
                                                            placeholder="Batch No"
                                                            value={item.batchNo}
                                                            onChange={(e) => updateBatchNo(po.poNumber, item.id, e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div style={{ position: "relative", minWidth: "170px" }}>
                                                            <div
                                                                className="customInput rounded-0 d-flex align-items-center"
                                                                onClick={() =>
                                                                    setActiveMfgDate(activeMfgDate === item.id ? null : item.id)
                                                                }
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <span>
                                                                    {item.mfgDate
                                                                        ? `${String(item.mfgDate.getDate()).padStart(2, "0")}/${String(
                                                                            item.mfgDate.getMonth() + 1
                                                                        ).padStart(2, "0")}/${item.mfgDate.getFullYear()}`
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
                                                                    }}
                                                                ></i>
                                                            </div>

                                                            {activeMfgDate === item.id && (
                                                                <div
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "100%",
                                                                        left: 0,
                                                                        zIndex: 1000,
                                                                    }}
                                                                >
                                                                    <DateFilterCalendar
                                                                        selectedDate={item.mfgDate}
                                                                        onDateSelect={(date) => {
                                                                            setSelectedPOs((prev) =>
                                                                                prev.map((selectedPO) => {
                                                                                    if (selectedPO.poNumber !== po.poNumber) {
                                                                                        return selectedPO;
                                                                                    }

                                                                                    return {
                                                                                        ...selectedPO,
                                                                                        receivedItemsLst: selectedPO.receivedItemsLst.map(
                                                                                            (selectedItem) =>
                                                                                                selectedItem.id === item.id
                                                                                                    ? {
                                                                                                        ...selectedItem,
                                                                                                        mfgDate: date,
                                                                                                    }
                                                                                                    : selectedItem
                                                                                        ),
                                                                                    };
                                                                                })
                                                                            );

                                                                            setActiveMfgDate(null);
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{ position: "relative", minWidth: "170px" }}>
                                                            <div
                                                                className="customInput rounded-0 d-flex align-items-center"
                                                                onClick={() =>
                                                                    setActiveExpiryDate(activeExpiryDate === item.id ? null : item.id)
                                                                }
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <span>
                                                                    {item.expiryDate
                                                                        ? `${String(item.expiryDate.getDate()).padStart(2, "0")}/${String(
                                                                            item.expiryDate.getMonth() + 1
                                                                        ).padStart(2, "0")}/${item.expiryDate.getFullYear()}`
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
                                                                    }}
                                                                ></i>
                                                            </div>

                                                            {activeExpiryDate === item.id && (
                                                                <div
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "100%",
                                                                        left: 0,
                                                                        zIndex: 1000,
                                                                    }}
                                                                >
                                                                    <DateFilterCalendar
                                                                        selectedDate={item.expiryDate}
                                                                        onDateSelect={(date) => {
                                                                            setSelectedPOs((prev) =>
                                                                                prev.map((selectedPO) => {
                                                                                    if (selectedPO.poNumber !== po.poNumber) {
                                                                                        return selectedPO;
                                                                                    }

                                                                                    return {
                                                                                        ...selectedPO,
                                                                                        receivedItemsLst: selectedPO.receivedItemsLst.map(
                                                                                            (selectedItem) =>
                                                                                                selectedItem.id === item.id
                                                                                                    ? {
                                                                                                        ...selectedItem,
                                                                                                        expiryDate: date,
                                                                                                    }
                                                                                                    : selectedItem
                                                                                        ),
                                                                                    };
                                                                                })
                                                                            );

                                                                            setActiveExpiryDate(null);
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </>
    );

}