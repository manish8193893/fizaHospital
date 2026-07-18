import { Modal } from "react-bootstrap";
import * as bootstrap from "bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Header from "../../../GlobalHelpers/Header";
import Pagination from "../../../GlobalHelpers/Pagination";
import GlobalGridTable, { type ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";



import "../../../styles/Pharmacy.css";

interface OutPatientSaleData {
    id: string;
    itemName: string;
    dosage: string;
    frequency: string;
    noOfDays: number;
    route: string;
    totalQty: number;
    status: "Dispensed" | "Waiting";
}

export default function OutPatientSaleView() {

    const navigate = useNavigate();
    const ALL_OUT_PATIENT_SALE_DATA: OutPatientSaleData[] = [
        {
            id: "1",
            itemName: "Paracetamol 650mg",
            dosage: "1 Tablet",
            frequency: "Twice Daily",
            noOfDays: 5,
            route: "Oral",
            totalQty: 10,
            status: "Dispensed",
        },
        {
            id: "2",
            itemName: "Amoxicillin 500mg",
            dosage: "1 Capsule",
            frequency: "Three Times Daily",
            noOfDays: 7,
            route: "Oral",
            totalQty: 21,
            status: "Waiting",
        },
        {
            id: "3",
            itemName: "Pantoprazole 40mg",
            dosage: "1 Tablet",
            frequency: "Once Daily",
            noOfDays: 10,
            route: "Oral",
            totalQty: 10,
            status: "Dispensed",
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Proceed");

    const totalPages = Math.ceil(
        ALL_OUT_PATIENT_SALE_DATA.length /
        itemsPerPage
    );

    const visibleData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        return ALL_OUT_PATIENT_SALE_DATA.slice(
            startIndex,
            startIndex +
            itemsPerPage
        );

    }, [currentPage, itemsPerPage]);

    const columns: ColumnActionRow<OutPatientSaleData>[] = [

        {
            key: "itemName",
            header: <>Item Name</>,
            className: "text-center",
        },

        {
            key: "dosage",
            header: <>Dosage</>,
            className: "text-center",
        },

        {
            key: "frequency",
            header: <>Frequency</>,
            className: "text-center",
        },

        {
            key: "noOfDays",
            header: <>No. of Days</>,
            className: "text-center",
        },

        {
            key: "route",
            header: <>Route</>,
            className: "text-center",
        },

        {
            key: "totalQty",
            header: <>Total Qty</>,
            className: "text-center",
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",

            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Dispensed"
                            ? "status-completed"
                            : "status-pending"
                            }`}
                    >
                        {row.status}
                    </span>
                </div>
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
                        className="Check-In"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Drug Substitution"
                        onClick={() => {
                            setModalTitle("Drug Substitution");
                            console.log(row.id);
                            setShowModal(true);
                        }}
                    >
                        {/* <i className="ri-capsule-line fs-18"></i> */}
                        <i className="ri-medicine-bottle-line fs-18"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add Discount"
                    >
                        {/* <i className="ri-percent-line fs-18"></i> */}
                        <i className="ri-discount-percent-line fs-18"></i>
                    </button>

                </div>
            ),
        },

    ];

    useEffect(() => {
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipElements).map((element) => new bootstrap.Tooltip(element));

        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, [visibleData]);

    return (
        <>
            <div className="container-fluid p-3">

                <Header heading="Out-Patient Sales" subHeading="Manish Kashyap" />

                {/* Banner Section */}
                <div className="patient-banner-wrapper mt-3"></div>

                <div className="OutPatientProfileCard mb-3 bg-white rounded-3 p-3">

                    <div className="d-flex justify-content-between">

                        <div className="d-flex flex-column">
                            {/* OutPatient Image */}
                            <div className="d-flex">
                                <div className="text-center">

                                    <img
                                        src="/Assets/Icons/HeaderIcons/Kapil.jpg"
                                        alt="Patients"
                                        className="OutPatientAvatar"
                                    />

                                </div>

                                <div className="d-flex flex-column justify-content-center gap-2 ps-2">
                                    <h4 className="fw-500 fs-20 mb-1">Manish Kumar</h4>
                                    <span className="fs-12 fw-500 text-black text-muted">Male / 22 Years Old</span>
                                </div>
                            </div>

                            {/* OutPatient Meta */}
                            <div className="OutPatientMeta gap-3">

                                <span>
                                    <i className="ri-file-list-line fs-18" style={{ color: "#656649" }}></i>
                                    101
                                </span>

                                <span>
                                    <i className="ri-user-line fs-18" style={{ color: "#656649" }}></i>
                                    Male / 22 Years
                                </span>

                                <span>
                                    <i className="ri-first-aid-kit-line fs-18" style={{ color: "#0477BF" }}></i>
                                    Dr. Shivam Saini
                                </span>

                                <span>
                                    <i className="ri-calendar-2-line fs-18" style={{ color: "#A78CEA" }}></i>
                                    23-11-2025 / 08:45PM
                                </span>

                                <span>
                                    <i className="ri-phone-line fs-18" style={{ color: '#1FC16B' }}></i>
                                    8742970516
                                </span>

                                <span>
                                    <i className="ri-logout-box-line fs-18" style={{ color: "#0477BF" }}></i>
                                    OutPatient
                                </span>

                            </div>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                            {/* Status */}
                            <span className="OutPatientStatus">
                                Dispensed
                            </span>

                            <button className="back-btn mt-2" onClick={() => navigate("/pharmacy/OutPatientSale")}>
                                <i className="ri-arrow-left-line me-3"></i>Back
                            </button>
                        </div>

                    </div>

                </div>

                <div className="d-flex justify-content-between align-items-center gap-4 my-4" style={{ maxHeight: "45px" }}>
                    <p className="fs-18 fw-500 mb-0">Ordered Medications</p>

                    <div className="Plus-btn" onClick={() => { setModalTitle("Proceed"); setShowModal(true); }}>
                        <div className="text-white fs-14 fw-400">Proceed</div>
                        <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                    </div>
                </div>


                <div className="d-flex flex-column">
                    {/* TABLE */}
                    <GlobalGridTable
                        data={visibleData}
                        columns={columns}
                        currentPage={currentPage}
                        pageSize={itemsPerPage}
                    />

                    {/* PAGINATION */}
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        rowsPerPage={itemsPerPage}
                        onRowsPerPageChange={(r) => {
                            setItemsPerPage(r);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <DrugModal
                    show={showModal}
                    title={modalTitle}
                    handleClose={() => setShowModal(false)}
                />
            </div>
        </>
    )
}

interface DrugModalProps {
    show: boolean;
    title: string;
    handleClose: () => void;
}

interface Medicine {
    id: string;
    name: string;
    manufacturer: string;
    expiryDate: string;
    mrp: number;
    batches: string[];
}

interface SelectedMedicine extends Medicine {
    batchNo: string;
    qty: number;
}

const PATIENT_PRINT_DETAILS = [
    { label: "Patient Name", value: "Manish Kashyap" },
    { label: "Doctor", value: "Mr.Shivam Saini" },
    { label: "Mobile", value: "8742970516" },
    { label: "Department", value: "General Medicine" },
    { label: "Email", value: "manish8193892@gmail.com" },
];

const PRINT_STYLES = `
@media print {
    @page {
        size: A4;
        margin: 0;
    }

    html,
    body {
        width: 100% !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        background: #ffffff !important;
    }

    #root,
    .container-fluid {
        display: none !important;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box !important;
    }

    body * {
        visibility: hidden !important;
    }

    .op-sale-print-area,
    .op-sale-print-area * {
        visibility: visible !important;
    }

    .op-sale-print-area {
        position: static !important;
        width: 100% !important;
        max-width: none !important;
        min-height: 0 !important;
        break-before: avoid !important;
        page-break-before: avoid !important;
        margin: 0 !important;
        padding: 10mm !important;
        color: #172033 !important;
        background: #ffffff !important;
        font-family: Arial, sans-serif !important;
    }

    .op-sale-print-hide,
    .aph-modal-header,
    .modal-backdrop {
        display: none !important;
    }

    .modal,
    .modal-dialog,
    .modal-content,
    .aph-modal-content {
        position: static !important;
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        min-height: 0 !important;
        break-before: avoid !important;
        page-break-before: avoid !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        box-shadow: none !important;
        overflow: visible !important;
        transform: none !important;
        top: auto !important;
        left: auto !important;
        right: auto !important;
        bottom: auto !important;
    }

    .op-sale-print-header {
        display: block !important;
        padding-bottom: 16px !important;
        margin-bottom: 18px !important;
        border-bottom: 2px solid #0477BF !important;
    }

    .op-sale-print-title {
        margin: 0 !important;
        text-align: center !important;
        font-size: 22px !important;
        line-height: 1.2 !important;
        font-weight: 700 !important;
        color: #0477BF !important;
    }

    .op-sale-print-header-content {
        display: flex !important;
        justify-content: space-between !important;
        align-items: flex-start !important;
        gap: 24px !important;
        margin-top: 18px !important;
    }

    .op-sale-print-details {
        display: grid !important;
        grid-template-columns: 118px minmax(0, 1fr) !important;
        gap: 7px 12px !important;
        font-size: 12px !important;
        line-height: 1.35 !important;
    }

    .d-contents {
        display: contents !important;
    }

    .op-sale-print-label {
        color: #5f6b7a !important;
        font-weight: 700 !important;
    }

    .op-sale-print-value {
        color: #172033 !important;
        font-weight: 600 !important;
        word-break: break-word !important;
    }

    .op-sale-print-logo {
        width: 128px !important;
        height: auto !important;
        object-fit: contain !important;
    }

    .op-sale-print-status {
        margin-bottom: 16px !important;
        padding: 12px 14px !important;
        border: 1px solid #CFE8DA !important;
        border-left: 5px solid #1FC16B !important;
        background: #F4FCF7 !important;
        text-align: left !important;
    }

    .op-sale-print-status i {
        display: none !important;
    }

    .op-sale-print-status h4 {
        margin: 0 0 4px !important;
        font-size: 16px !important;
        color: #0F9F53 !important;
    }

    .op-sale-print-status p {
        margin: 0 !important;
        font-size: 11px !important;
        color: #5f6b7a !important;
    }

    .op-sale-print-table {
        display: table !important;
        width: 100% !important;
        margin: 14px 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        font-size: 11px !important;
    }

    .op-sale-print-table th {
        padding: 9px 8px !important;
        border: 1px solid #D7DEE8 !important;
        background: #F1F7FC !important;
        color: #334155 !important;
        font-weight: 700 !important;
        text-align: left !important;
    }

    .op-sale-print-table td {
        padding: 9px 8px !important;
        border: 1px solid #D7DEE8 !important;
        color: #172033 !important;
        vertical-align: top !important;
        word-break: break-word !important;
    }

    .op-sale-print-summary {
        width: 100% !important;
        margin-top: 16px !important;
        padding: 0 !important;
        border: 1px solid #D7DEE8 !important;
        border-radius: 0 !important;
    }

    .op-sale-print-row {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        gap: 16px !important;
        padding: 10px 12px !important;
        margin: 0 !important;
        border-bottom: 1px solid #E6EBF2 !important;
        font-size: 12px !important;
    }

    .op-sale-print-row span:first-child {
        color: #5f6b7a !important;
        font-weight: 700 !important;
    }

    .op-sale-print-row span:last-child {
        color: #172033 !important;
        font-weight: 700 !important;
    }

    .op-sale-print-row:last-child {
        border-bottom: 0 !important;
        background: #F1F7FC !important;
        font-size: 15px !important;
    }

    .op-sale-print-row:last-child span:last-child {
        color: #0477BF !important;
        font-size: 18px !important;
    }
}
`;

import CameraScan from "../../../GlobalHelpers/CameraScan";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

export function DrugModal({
    show,
    title,
    handleClose,
}: DrugModalProps) {

    const MEDICINES: Medicine[] = [
        {
            id: "MED001",
            name: "Paracetamol 500 mg",
            manufacturer: "Julphar",
            expiryDate: "Dec-2026",
            mrp: 2000,
            batches: ["BN-7845", "BN-7846"],
        },
        {
            id: "MED002",
            name: "Paracetamol 1000 mg",
            manufacturer: "CBC",
            expiryDate: "Nov-2026",
            mrp: 3000,
            batches: ["BN-5541", "BN-5542"],
        },
        {
            id: "MED003",
            name: "Amoxicillin 250 mg",
            manufacturer: "Hikma",
            expiryDate: "May-2026",
            mrp: 5500,
            batches: ["BN-6621"],
        },
        {
            id: "MED004",
            name: "Azithromycin 500 mg",
            manufacturer: "Pfizer",
            expiryDate: "Oct-2027",
            mrp: 4500,
            batches: ["BN-8891"],
        },
    ];

    const [step, setStep] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [selectedMedicineIds, setSelectedMedicineIds] = useState<string[]>([]);
    const [selectedMedicines, setSelectedMedicines] = useState<SelectedMedicine[]>([]);
    const [discount, setDiscount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Card">("Cash");
    const [paidAmount, setPaidAmount] = useState<number>(0);
    const [invoiceNumber] = useState(`INV-${Date.now()}`);

    const filteredMedicines = searchText.length >= 3
        ? MEDICINES.filter((med) => med.name.toLowerCase().includes(searchText.toLowerCase()))
        : [];

    const toggleMedicine = (id: string) => {
        setSelectedMedicineIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const getBatchOptions = (medicine: SelectedMedicine) =>
        medicine.batches.map((batch) => ({
            id: batch,
            name: batch,
        }));

    const updateQty = (medicineId: string, qty: number) => {
        setSelectedMedicines((prev) =>
            prev.map((medicine) =>
                medicine.id === medicineId
                    ? { ...medicine, qty: Math.max(1, qty) }
                    : medicine
            )
        );
    };

    const updateBatch = (medicineId: string, batchNo: string) => {
        setSelectedMedicines((prev) =>
            prev.map((medicine) =>
                medicine.id === medicineId ? { ...medicine, batchNo } : medicine
            )
        );
    };

    const removeMedicine = (medicineId: string) => {
        setSelectedMedicines((prev) => prev.filter((medicine) => medicine.id !== medicineId));
    };

    const handleCheckout = () => {
        setStep(3);
    };

    const handleSaveAndContinue = () => {
        const medicines: SelectedMedicine[] = MEDICINES
            .filter((med) => selectedMedicineIds.includes(med.id))
            .map((med) => ({
                ...med,
                qty: 1,
                batchNo: med.batches[0],
            }));

        setSelectedMedicines(medicines);
        setStep(2);
    };

    useEffect(() => {
        if (!show) {
            setStep(1);
            setSearchText("");
            setSelectedMedicineIds([]);
            setSelectedMedicines([]);
            setDiscount("");
            setPaidAmount(0);
            setPaymentMethod("Cash");
        }
    }, [show]);

    const subtotal = selectedMedicines.reduce((sum, medicine) => sum + medicine.mrp * medicine.qty, 0);
    const discountAmount = Number(discount) || 0;
    const grandTotal = subtotal - discountAmount;

    const handleProceedPayment = () => {
        setStep(4);
    };

    const handleCompletePayment = () => {
        if (paymentMethod === "Cash" && paidAmount < grandTotal) {
            alert("Paid amount cannot be less than total amount.");
            return;
        }

        setStep(5);
    };

    const handleDone = () => {
        handleClose();
    };

    const handlePrintReceipt = () => {
        window.print();
    };


    return (
        <>
            {step === 5 && <style>{PRINT_STYLES}</style>}
            <Modal
                show={show}
                onHide={handleClose}
                centered
                size="xl"
                backdrop="static"
                contentClassName="aph-modal-content"
                backdropClassName="aph-modal-backdrop"
            >

                {/* HEADER */}
                <Modal.Header className="aph-modal-header">

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
                        {title}
                    </Modal.Title>

                </Modal.Header>

                {step === 1 && (
                    <>
                        <Modal.Body className="p-0">
                            <div className="p-1">
                                <CameraScan
                                    icon="ri-barcode-line text-blue"
                                    title="Scan Barcode"
                                    hideORLine={true}
                                />

                                <div className="">
                                    <div className="formGroup">
                                        <label className="customLabel">Add Manually</label>
                                        <div className="inputWrapper rounded-0">
                                            <input
                                                type="text"
                                                className="customInput rounded-0"
                                                placeholder="Search Medicine Name..."
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                            <i className="ri-search-ai-line fs-18"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Medicine List */}
                                {searchText.length >= 3 && (
                                    <div className="mt-3 rounded-3 bg-white" style={{ maxHeight: "260px", overflowY: "auto" }}>
                                        {filteredMedicines.length > 0 ? (
                                            filteredMedicines.map((medicine) => (
                                                <div key={medicine.id} className="d-flex justify-content-between align-items-center px-3 border my-2">
                                                    <div>
                                                        <p className="fw-500 fs-14 mb-0 d-flex align-items-center"><i className="ri-bubble-chart-line fs-18 me-1" style={{ color: "#A78CEA" }}></i>{medicine.name}</p>
                                                        <p className="text-muted fs-12 mb-0 ms-4">{medicine.id}</p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className={`medicine-check-btn ${selectedMedicineIds.includes(medicine.id) ? "active" : ""}`}
                                                        onClick={() => toggleMedicine(medicine.id)}
                                                    >
                                                        <i className="ri-check-line" />
                                                    </button>

                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-muted">No medicine found</div>
                                        )}
                                    </div>
                                )}

                                <div className="d-flex justify-content-between border-0 pb-0 mt-4">

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                        disabled={selectedMedicineIds.length === 0}
                                        onClick={handleSaveAndContinue}
                                    >
                                        Save & Continue
                                    </button>

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>

                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}

                {step === 2 && (
                    <div className="p-1">
                        <h5 className="mb-4 fs-16 fw-500">Medicine Info</h5>

                        <div className="medicine-table">
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Manufacturer</th>
                                        <th style={{ width: 180 }}>Batch No</th>
                                        <th>Expiry Date</th>
                                        <th style={{ width: 120 }}>Qty</th>
                                        <th>MRP</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedMedicines.map((medicine) => (
                                        <tr key={medicine.id} className="p-0">
                                            <td>{medicine.name}</td>
                                            <td>{medicine.manufacturer}</td>
                                            <td>
                                                <CustomFormDropdown
                                                    options={getBatchOptions(medicine)}
                                                    value={{ id: medicine.batchNo, name: medicine.batchNo }}
                                                    onChange={(value) => updateBatch(medicine.id, value?.id || "")}
                                                    placeholder="Select Batch"
                                                />
                                            </td>
                                            <td>{medicine.expiryDate}</td>
                                            <td>
                                                <div className="inputWrapper rounded-0">
                                                    <input
                                                        type="number"
                                                        placeholder="Enter Value"
                                                        className="customInput px-0 text-center rounded-0 min-w-auto"
                                                        value={medicine.qty}
                                                        onChange={(e) => updateQty(medicine.id, Number(e.target.value))}
                                                    />
                                                </div>
                                            </td>
                                            <td>{medicine.mrp.toLocaleString()} IQD</td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-3">
                                                    <button type="button" className="edit">
                                                        <i className="ri-eye-line fs-18" />
                                                    </button>
                                                    <button type="button" className="delete" onClick={() => removeMedicine(medicine.id)}>
                                                        <i className="ri-delete-bin-line fs-18" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Discount */}
                        <div className="mt-4">
                            <div className="formGroup">
                                <label className="customLabel">Discount</label>
                                <div className="inputWrapper rounded-0">
                                    <input
                                        type="number"
                                        className="customInput rounded-0"
                                        placeholder="Enter Discount"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                    <i className="ri-discount-percent-line" />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="d-flex justify-content-between mt-3">
                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleCheckout}
                                disabled={selectedMedicines.length === 0}
                            >
                                Checkout ({selectedMedicines.length})
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border border-secondary-subtle outline-0 col-md-4  text-secondary bg-white fs-18 fw-400"
                                onClick={() => setStep(1)}>
                                Back
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="p-1">
                        <h5 className="mb-3 fs-18 fw-500">Medicine Info</h5>

                        <div className="medicine-table">
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item Name</th>
                                        <th>Manufacturer</th>
                                        <th>Batch No</th>
                                        <th>Expiry Date</th>
                                        <th>Qty</th>
                                        <th>MRP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedMedicines.map((medicine, index) => (
                                        <tr key={medicine.id}>
                                            <td>{index + 1}</td>
                                            <td>{medicine.name}</td>
                                            <td>{medicine.manufacturer}</td>
                                            <td>{medicine.batchNo}</td>
                                            <td>{medicine.expiryDate}</td>
                                            <td>{medicine.qty}</td>
                                            <td>{medicine.mrp.toLocaleString()} IQD</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Summary Section */}
                        <div className="mt-3">
                            <div className="d-flex justify-content-between mb-2">
                                <span className="fs-14 fw-500">Subtotal</span>
                                <span className="fw-500">{subtotal.toLocaleString()} IQD</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <div className="fs-14 fw-500">Discount</div>
                                <div className="fw-500" style={{ color: "#FF4D4F" }}>
                                    - {discountAmount.toLocaleString()} IQD
                                </div>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <span className="fs-16 fw-500">Total Amount</span>
                                <span className="fw-600 fs-16" style={{ color: "#4168B2" }}>
                                    {grandTotal.toLocaleString()} IQD
                                </span>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="d-flex justify-content-between mt-3">
                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleProceedPayment}
                            >
                                Payment
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border border-secondary-subtle outline-0 col-md-4  text-secondary bg-white fs-18 fw-400"
                                onClick={() => setStep(2)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="p-1">
                        <h5 className="fs-16 fw-500 mb-3">Payment Method</h5>

                        {/* Payment Options */}
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <button
                                    type="button"
                                    className={`payment-method-card ${paymentMethod === "Cash" ? "active" : ""}`}
                                    onClick={() => setPaymentMethod("Cash")}
                                >
                                    <i className="ri-money-dollar-circle-line fs-18" />
                                    <span className="fs-16 fw-500">Cash</span>
                                </button>
                            </div>

                            <div className="col-md-6">
                                <button
                                    type="button"
                                    className={`payment-method-card ${paymentMethod === "Card" ? "active" : ""}`}
                                    onClick={() => setPaymentMethod("Card")}
                                >
                                    <i className="ri-bank-card-line fs-18" />
                                    <span className="fs-16 fw-500">Card</span>
                                </button>
                            </div>
                        </div>

                        {/* Paid Amount */}
                        {paymentMethod === "Cash" && (
                            <div className="formGroup mb-4">
                                <label className="customLabel">Paid Amount</label>
                                <div className="inputWrapper rounded-0">
                                    <input
                                        type="number"
                                        className="customInput rounded-0"
                                        placeholder="Enter Paid Amount"
                                        value={paidAmount || ""}
                                        max={subtotal}
                                        onChange={(e) => setPaidAmount(Number(e.target.value))}
                                    />
                                    <i className="ri-money-dollar-circle-line fs-18" />
                                </div>
                            </div>
                        )}

                        {/* Payment Summary */}
                        <div className="payment-summary-card p-2">
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>{subtotal.toLocaleString()} IQD</span>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span>Discount</span>
                                <span className="text-danger">- {discountAmount.toLocaleString()} IQD</span>
                            </div>

                            <div className="d-flex justify-content-between fs-16 fw-500 total-amount text-blue px-2 py-3" style={{ backgroundColor: "#0477BF1A" }}>
                                <span>Total Amount</span>
                                <span>{grandTotal.toLocaleString()} IQD</span>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="d-flex justify-content-between mt-3">
                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleCompletePayment}
                            >
                                Complete Payment
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border border-secondary-subtle outline-0 col-md-4  text-secondary bg-white fs-18 fw-400"
                                onClick={() => setStep(3)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="p-1 op-sale-print-area">
                        <div className="op-sale-print-header d-none">
                            <h2 className="op-sale-print-title">Pharmacy</h2>
                            <div className="op-sale-print-header-content">
                                <div className="op-sale-print-details">
                                    {PATIENT_PRINT_DETAILS.map((detail) => (
                                        <div key={detail.label} className="d-contents">
                                            <span className="op-sale-print-label">{detail.label}</span>
                                            <span className="op-sale-print-value">{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <img
                                    src="/Assets/Images/ShardaHospitalLogo.png"
                                    alt="Sharda Hospital"
                                    className="op-sale-print-logo"
                                />
                            </div>

                        </div>

                        <div className="text-center op-sale-print-status">
                            <i className="ri-check-line text-white p-3 bg-green rounded-circle fs-26" />
                            <h4 className="fw-16 fw-500 text-green mt-3 mb-2">Sale Completed Successfully</h4>
                            <p className="text-muted">Pharmacy transaction completed successfully</p>
                        </div>

                        <table className="op-sale-print-table d-none">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item Name</th>
                                    <th>Manufacturer</th>
                                    <th>Batch No</th>
                                    <th>Expiry Date</th>
                                    <th>Qty</th>
                                    <th>MRP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMedicines.map((medicine, index) => (
                                    <tr key={medicine.id}>
                                        <td>{index + 1}</td>
                                        <td>{medicine.name}</td>
                                        <td>{medicine.manufacturer}</td>
                                        <td>{medicine.batchNo}</td>
                                        <td>{medicine.expiryDate}</td>
                                        <td>{medicine.qty}</td>
                                        <td>{medicine.mrp.toLocaleString()} IQD</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Invoice Card */}
                        <div className=" p-1 mt-3 op-sale-print-summary">
                            <div className="d-flex justify-content-between mb-2 op-sale-print-row">
                                <span className="text-muted fw-500 fs-16">Invoice No</span>
                                <span className="fw-500">{invoiceNumber}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2 op-sale-print-row">
                                <span className="text-muted fw-500 fs-16">Payment Method</span>
                                <span className="fw-500">{paymentMethod}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2 op-sale-print-row">
                                <span className="text-muted fw-500 fs-16">Medicines</span>
                                <span className="fw-500">{selectedMedicines.length}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2 op-sale-print-row">
                                <span className="text-muted fw-500 fs-16">Sub Total</span>
                                <span className="fw-500">{subtotal.toLocaleString()} IQD</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2 op-sale-print-row">
                                <span className="text-muted fw-500 fs-16">Discount</span>
                                <span className="text-danger fw-500">- {discountAmount.toLocaleString()} IQD</span>
                            </div>

                            <hr className="op-sale-print-hide" />

                            <div className="d-flex justify-content-between op-sale-print-row">
                                <span className="fw-600">Grand Total</span>
                                <span className="fw-700 fs-20 text-blue">{grandTotal.toLocaleString()} IQD</span>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-between mt-3 op-sale-print-hide">
                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-3 bg-white fs-18 fw-400"
                                style={{ border: "1px solid #A78CEA", color: "#A78CEA", borderColor: "#A78CEA" }}
                                onClick={handlePrintReceipt}
                            >
                                <i className="ri-printer-line me-2" />
                                Print Invoice
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-3 border-blue text-blue bg-white fs-18 fw-400"
                                onClick={handlePrintReceipt}
                            >
                                <i className="ri-printer-line me-2" />
                                Print Prescription
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-5 bg-blue text-white fs-18 fw-400"
                                onClick={handleDone}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}

            </Modal>
        </>
    );
}