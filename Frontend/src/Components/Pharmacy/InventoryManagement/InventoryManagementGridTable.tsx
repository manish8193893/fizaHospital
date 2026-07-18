import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";



import "../../../styles/Pharmacy.css";

/********************************************
    Name : Manish Kumar
    Date : 20/06/2026
    Purpose : Inventory Management Grid Table
*********************************************/
interface InventoryManagementTableData {
    id: string;
    productName: string;
    category: string;
    dosageForm: string;
    routeForm: string;
    packSize: string;
    unitPerPack: number;
    availableQty: number;
    thresholdValue: number;
    barcodeType: "Barcode" | "QR Code";
    status: "In Stock" | "Low Stock" | "Out of Stock";
}

export default function InventoryManagementGridTable() {

    const navigate = useNavigate();

    const [globalSearch, setGlobalSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);

    const [selectedDosageForm, setSelectedDosageForm] = useState<DropdownOption | null>(null);

    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);

    const [showInventoryModal, setShowInventoryModal] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Category Options
    *********************************************/
    const categoryOptions: DropdownOption[] = [
        { id: "antibiotic", name: "Antibiotic" },
        { id: "analgesic", name: "Analgesic" },
        { id: "antacid", name: "Antacid" },
        { id: "vitamin", name: "Vitamin" },
        { id: "antiseptic", name: "Antiseptic" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Dosage Form Options
    *********************************************/
    const dosageFormOptions: DropdownOption[] = [
        { id: "tablet", name: "Tablet" },
        { id: "capsule", name: "Capsule" },
        { id: "syrup", name: "Syrup" },
        { id: "injection", name: "Injection" },
        { id: "cream", name: "Cream" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "in_stock", name: "In Stock" },
        { id: "low_stock", name: "Low Stock" },
        { id: "out_of_stock", name: "Out of Stock" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_INVENTORY_DATA: InventoryManagementTableData[] = [
        {
            id: "INV001",
            productName: "Paracetamol 500",
            category: "Medicines",
            dosageForm: "Tablet",
            routeForm: "Oral",
            packSize: "Box",
            unitPerPack: 100,
            availableQty: 450,
            thresholdValue: 100,
            status: "In Stock",
            barcodeType: "Barcode",
        },
        {
            id: "INV002",
            productName: "Amoxicillin",
            category: "Medicines",
            dosageForm: "mg",
            routeForm: "Oral",
            packSize: "Pack",
            unitPerPack: 50,
            availableQty: 220,
            thresholdValue: 80,
            status: "In Stock",
            barcodeType: "Barcode",
        },
        {
            id: "INV003",
            productName: "Insulin Injection",
            category: "Injection",
            dosageForm: "IU",
            routeForm: "Subcutaneous",
            packSize: "Piece",
            unitPerPack: 1,
            availableQty: 35,
            thresholdValue: 50,
            status: "Low Stock",
            barcodeType: "QR Code",
        },
        {
            id: "INV004",
            productName: "Salbutamol Inhaler",
            category: "Inhalation",
            dosageForm: "Puff",
            routeForm: "Inhalation",
            packSize: "Piece",
            unitPerPack: 1,
            availableQty: 120,
            thresholdValue: 30,
            status: "In Stock",
            barcodeType: "Barcode",
        },
        {
            id: "INV005",
            productName: "Nasal Decongestant",
            category: "Nasal Solution",
            dosageForm: "ml",
            routeForm: "Nasal",
            packSize: "Box",
            unitPerPack: 10,
            availableQty: 28,
            thresholdValue: 40,
            status: "Low Stock",
            barcodeType: "QR Code",
        },
        {
            id: "INV006",
            productName: "Antiseptic Cream",
            category: "Cream",
            dosageForm: "mg",
            routeForm: "Topical",
            packSize: "Tube",
            unitPerPack: 1,
            availableQty: 0,
            thresholdValue: 20,
            status: "Out of Stock",
            barcodeType: "QR Code",
        },
        {
            id: "INV007",
            productName: "Eye Lubricant",
            category: "Drops",
            dosageForm: "Drop",
            routeForm: "Ophthalmic",
            packSize: "Piece",
            unitPerPack: 1,
            availableQty: 180,
            thresholdValue: 50,
            status: "In Stock",
            barcodeType: "Barcode",
        },
        {
            id: "INV008",
            productName: "Ear Infection Drops",
            category: "Drops",
            dosageForm: "Drop",
            routeForm: "Otic",
            packSize: "Piece",
            unitPerPack: 1,
            availableQty: 70,
            thresholdValue: 25,
            status: "In Stock",
            barcodeType: "QR Code",
        },
        {
            id: "INV009",
            productName: "Vitamin D Supplement",
            category: "Medicines",
            dosageForm: "IU",
            routeForm: "Oral",
            packSize: "Carton",
            unitPerPack: 200,
            availableQty: 500,
            thresholdValue: 120,
            status: "In Stock",
            barcodeType: "Barcode",
        },
        {
            id: "INV010",
            productName: "Hydrocortisone Lotion",
            category: "Lotion",
            dosageForm: "ml",
            routeForm: "Topical",
            packSize: "Bottle",
            unitPerPack: 1,
            availableQty: 15,
            thresholdValue: 30,
            status: "Low Stock",
            barcodeType: "QR Code",
        },
        {
            id: "INV011",
            productName: "Surgical Gloves",
            category: "Surgical Consumables",
            dosageForm: "Unit",
            routeForm: "Topical",
            packSize: "Box",
            unitPerPack: 100,
            availableQty: 600,
            thresholdValue: 150,
            status: "In Stock",
            barcodeType: "QR Code",
        },
        {
            id: "INV012",
            productName: "Oxygen Cylinder",
            category: "Gas",
            dosageForm: "Unit",
            routeForm: "Inhalation",
            packSize: "Piece",
            unitPerPack: 1,
            availableQty: 8,
            thresholdValue: 15,
            status: "Low Stock",
            barcodeType: "Barcode",
        },
        {
            id: "INV013",
            productName: "Rectal Suppository",
            category: "Suppository",
            dosageForm: "mg",
            routeForm: "Rectal",
            packSize: "Pack",
            unitPerPack: 20,
            availableQty: 0,
            thresholdValue: 15,
            status: "Out of Stock",
            barcodeType: "QR Code",
        },
        {
            id: "INV014",
            productName: "Orthopedic Implant",
            category: "Implants",
            dosageForm: "Unit",
            routeForm: "Intradermal",
            packSize: "Piece",
            unitPerPack: 1,
            availableQty: 45,
            thresholdValue: 10,
            status: "In Stock",
            barcodeType: "Barcode",
        },
        {
            id: "INV015",
            productName: "Laboratory Reagent Kit",
            category: "Laboratory Items",
            dosageForm: "ml",
            routeForm: "Intravenous",
            packSize: "Carton",
            unitPerPack: 25,
            availableQty: 95,
            thresholdValue: 20,
            status: "In Stock",
            barcodeType: "QR Code",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Filtered Inventory Data
    *********************************************/
    const filteredInventoryData = useMemo(() => {

        return ALL_INVENTORY_DATA.filter(
            (item) => {

                const searchValue =
                    globalSearch.toLowerCase();

                const matchesSearch =
                    item.id.toLowerCase().includes(searchValue) ||
                    item.productName.toLowerCase().includes(searchValue) ||
                    item.category.toLowerCase().includes(searchValue) ||
                    item.dosageForm.toLowerCase().includes(searchValue) ||
                    item.routeForm.toLowerCase().includes(searchValue);

                const matchesCategory =
                    !selectedCategory ||
                    item.category.toLowerCase() ===
                    selectedCategory.name.toLowerCase();

                const matchesDosageForm =
                    !selectedDosageForm ||
                    item.dosageForm.toLowerCase() ===
                    selectedDosageForm.name.toLowerCase();

                const matchesStatus =
                    !selectedStatus ||
                    item.status.toLowerCase() ===
                    selectedStatus.name.toLowerCase();

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesDosageForm &&
                    matchesStatus
                );

            }
        );

    }, [
        globalSearch,
        selectedCategory,
        selectedDosageForm,
        selectedStatus,
    ]);

    const totalPages = Math.ceil(
        filteredInventoryData.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredInventoryData.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredInventoryData,
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Initialize Bootstrap Tooltips
    *********************************************/
    useEffect(() => {

        const tooltipElements =
            document.querySelectorAll(
                '[data-bs-toggle="tooltip"]'
            );

        tooltipElements.forEach((element) => {
            new bootstrap.Tooltip(element);
        });

        return () => {

            tooltipElements.forEach((element) => {

                const tooltip =
                    bootstrap.Tooltip.getInstance(
                        element
                    );

                if (tooltip) {
                    tooltip.dispose();
                }

            });

        };

    }, [visibleTableData]);

    /********************************************
    Name : Manish Kumar
    Date : 20/06/2026
    Purpose : Columns
*********************************************/
    const columns: ColumnActionRow<InventoryManagementTableData>[] = [

        {
            key: "productName",
            header: <>Product Name</>,
            className: "text-center text-nowrap",
            sortable: true,
        },

        {
            key: "category",
            header: <>Category</>,
            className: "text-center text-nowrap",
            sortable: true,
        },

        {
            key: "dosageForm",
            header: <>Dosage Form</>,
            className: "text-center",
            sortable: true,
        },

        {
            key: "routeForm",
            header: <>Route Form</>,
            className: "text-center",
            sortable: true,
        },

        {
            key: "packSize",
            header: <>Pack Size</>,
            className: "text-center",
            sortable: true,
        },

        {
            key: "unitPerPack",
            header: <>Unit Per Pack</>,
            className: "text-center",
            sortable: true,
        },

        {
            key: "availableQty",
            header: <>Available Qty</>,
            className: "text-center",
            sortable: true,
        },

        {
            key: "thresholdValue",
            header: <>Threshold Value</>,
            className: "text-center",
            sortable: true,
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",

            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`text-nowrap ${row.status === "In Stock"
                            ? "status-completed"
                            : row.status === "Low Stock"
                                ? "status-pending"
                                : "status-cancelled"
                            }`}
                    >
                        {row.status}
                    </span>
                </div>
            ),
        },

        {
            key: "barcode",
            header: <>Barcode</>,
            className: "text-center",

            render: (row) => (

                <div className="d-flex justify-content-center align-items-center gap-2">

                    {
                        row.barcodeType === "Barcode" ? (

                            <button
                                type="button"
                                className="border-0 bg-transparent p-0 d-flex align-items-center fw-400 text-primary"
                            >
                                Generate<i className="ri-qr-scan-2-line fs-18 ms-2"></i>
                            </button>

                        ) : (

                            <button
                                type="button"
                                className="border-0 bg-transparent p-0 text-primary"
                            >
                                <i className="fs-18 ri-qr-code-line"></i>
                            </button>

                        )
                    }

                </div>

            ),
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "150px",

            render: (row) => (
                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View"
                        onClick={() => console.log("View :", row.id)}
                    >
                        <i className="fs-18 ri-eye-line"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Edit"
                        onClick={() => console.log("Edit :", row.id)}
                    >
                        <i className="fs-18 ri-pencil-ai-line"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Delete"
                        onClick={() => console.log("Delete :", row.id)}
                    >
                        <i className="fs-18 ri-delete-bin-7-line"></i>
                    </button>

                </div>
            ),
        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedCategory(null);
        setSelectedDosageForm(null);
        setSelectedStatus(null);
        setCurrentPage(1);

    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center my-4">

                <h5 className="fs-18 fw-500">
                    Recently Added
                </h5>

                <div className="d-flex gap-3">
                    <div
                        className="plus-btn d-flex align-items-center border-blue gap-2 px-2"
                        style={{cursor:"pointer"}}
                        onClick={() => navigate("/pharmacy/InventoryManagement/ReceiveOrders")}
                    >
                        <div className="text-blue fs-14 fw-500 text-nowrap">Receive Items</div>
                        <i className="ri-add-circle-line fs-20 text-blue"></i>
                    </div>

                    <div
                        className="Plus-btn"
                        onClick={() => setShowInventoryModal(true)}
                    >
                        <div className="text-white fs-14 fw-400 text-nowrap">New Item</div>
                        <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                    </div>
                </div>

            </div>

            {/* Filter Row */}
            <div className="aph-modal-filter-row mb-4">

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

                <div>

                    <CustomFilterDropdown
                        options={dosageFormOptions}
                        value={selectedDosageForm}
                        placeholder="Dosage Form"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedDosageForm(selected);
                            setCurrentPage(1);
                        }}
                    />

                </div>

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

            <InventoryManagementModal
                show={showInventoryModal}
                handleClose={() =>
                    setShowInventoryModal(false)
                }
            />
        </>
    );
}

import { Modal } from "react-bootstrap";
import CameraScan from "../../../GlobalHelpers/CameraScan";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";


interface InventoryManagementModalProps {
    show: boolean;
    handleClose: () => void;
}

export function InventoryManagementModal({
    show,
    handleClose,
}: InventoryManagementModalProps) {

    const TABS = [
        { id: "scan", label: "Scan Product" },
        { id: "manually", label: "Add Manually" },
    ];
    const [step, setStep] = useState<"scan" | "manually">("scan");

    /********************************************
         Name : Manish Kumar
         Date : 20/06/2026
         Purpose : Form State (Single Object)
     *********************************************/
    const [form, setForm] = useState({
        productName: "",
        brandName: "",
        manufacturer: "",
        countryOfOrigin: null as DropdownOption | null,

        productId: "",

        category: null as DropdownOption | null,
        dosageForm: null as DropdownOption | null,
        routeForm: null as DropdownOption | null,
        packSize: null as DropdownOption | null,

        quantity: "",
        thresholdValue: "",
        buyingPrice: "",
        sellingPrice: "",
        unitPerPack: "",
        pricePerUnit: "",

        notes: "",

        barcode: "",
    });

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Dropdown Options
    *********************************************/
    const CATEGORY_OPTIONS: DropdownOption[] = [
        { id: "medicines", name: "Medicines" },
        { id: "consumables", name: "General Consumables" },
        { id: "equipment", name: "Medical Equipment" },
    ];

    const DOSAGE_FORM_OPTIONS: DropdownOption[] = [
        { id: "tablet", name: "Tablet" },
        { id: "capsule", name: "Capsule" },
        { id: "injection", name: "Injection" },
        { id: "drop", name: "Drop" },
        { id: "ml", name: "ml" },
        { id: "mg", name: "mg" },
    ];

    const ROUTE_OPTIONS: DropdownOption[] = [
        { id: "oral", name: "Oral" },
        { id: "iv", name: "Intravenous" },
        { id: "im", name: "Intramuscular" },
        { id: "topical", name: "Topical" },
    ];

    const PACK_SIZE_OPTIONS: DropdownOption[] = [
        { id: "box", name: "Box" },
        { id: "carton", name: "Carton" },
        { id: "pack", name: "Pack" },
        { id: "piece", name: "Piece" },
        { id: "tablet", name: "Tablet" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Country List
    *********************************************/
    const COUNTRY_OPTIONS: DropdownOption[] = [
        { id: "india", name: "India" },
        { id: "usa", name: "United States" },
        { id: "uk", name: "United Kingdom" },
        { id: "germany", name: "Germany" },
        { id: "france", name: "France" },
        { id: "japan", name: "Japan" },
        { id: "china", name: "China" },
        { id: "uae", name: "United Arab Emirates" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Generate Product ID
    *********************************************/
    const generateProductId = (name: string) => {
        const prefix = name
            .replace(/\s/g, "")
            .substring(0, 4)
            .toUpperCase();

        const random = Math.floor(1000 + Math.random() * 9000);

        return `${prefix}-${random}`;
    };

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Generate Barcode
    *********************************************/
    const generateBarcode = () => {
        const code =
            "BC-" + Math.floor(100000000 + Math.random() * 900000000);

        setForm((prev) => ({
            ...prev,
            barcode: code,
        }));
    };

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Handle Product Name Change (Auto ID)
    *********************************************/
    const handleProductName = (value: string) => {

        setForm((prev) => ({
            ...prev,
            productName: value,
            productId: value ? generateProductId(value) : "",
        }));

    };

    /********************************************
        Name : Manish Kumar
        Date : 20/06/2026
        Purpose : Save Form
    *********************************************/
    const handleSave = () => {
        console.log("Inventory Form Data :", form);
        handleClose();
    };

    return (
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
                        Recently Added
                    </Modal.Title>

                </Modal.Header>

                <div className="d-flex w-100 p-2 overflow-auto mb-3 position-relative bg-body my-3">
                    {TABS.map((tab) => {
                        const isActive = step === tab.id;

                        return (
                            <button
                                key={tab.id}
                                className={`bg-body d-flex justify-content-center border-0 outline-0 align-items-center patient-tab-btn ${isActive ? "active" : ""}`}
                                onClick={() => setStep(tab.id as "scan" | "manually")}
                            >
                                <span className={`${isActive && "bg-blue w-100 h-100 d-flex align-items-center justify-content-center"}`}>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {step === "scan" && (
                    <>
                        <Modal.Body>
                            <CameraScan
                                icon="ri-barcode-line text-blue"
                                title="Scan Barcode"
                                hideORLine={false}
                            />

                            <div className="d-flex justify-content-between border-0 pb-0 mt-4">

                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                // onClick={handleAdd}
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
                        </Modal.Body>
                    </>
                )}

                {step === "manually" && (
                    <>
                        <Modal.Body className="p-0">

                            <form>

                                {/* ROW 1 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Product Name{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                placeholder="Enter Product Name"
                                                value={form.productName}
                                                onChange={(e) =>
                                                    handleProductName(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <i className="ri-capsule-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Brand Name{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                placeholder="Enter Brand Name"
                                                value={form.brandName}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        brandName: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-price-tag-3-line"></i>

                                        </div>

                                    </div>

                                </div>

                                {/* ROW 2 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Manufacturer{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                placeholder="Enter Manufacturer"
                                                value={form.manufacturer}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        manufacturer: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-building-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Country of Origin{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={COUNTRY_OPTIONS}
                                            value={form.countryOfOrigin}
                                            onChange={(value) =>
                                                setForm({
                                                    ...form,
                                                    countryOfOrigin: value,
                                                })
                                            }
                                            placeholder="Select Country"
                                        />

                                    </div>

                                </div>

                                {/* ROW 3 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Product ID{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                placeholder="Auto Generated"
                                                value={form.productId}
                                                disabled
                                            />

                                            <i className="ri-hashtag"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Category{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={CATEGORY_OPTIONS}
                                            value={form.category}
                                            onChange={(value) =>
                                                setForm({
                                                    ...form,
                                                    category: value,
                                                })
                                            }
                                            placeholder="Select Category"
                                        />

                                    </div>

                                </div>

                                {/* ROW 4 */}
                                <div className="formRow d-flex">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Dosage Form{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={DOSAGE_FORM_OPTIONS}
                                            value={form.dosageForm}
                                            onChange={(value) =>
                                                setForm({
                                                    ...form,
                                                    dosageForm: value,
                                                })
                                            }
                                            placeholder="Select Dosage Form"
                                        />

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Route Form{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={ROUTE_OPTIONS}
                                            value={form.routeForm}
                                            onChange={(value) =>
                                                setForm({
                                                    ...form,
                                                    routeForm: value,
                                                })
                                            }
                                            placeholder="Select Route Form"
                                        />

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Pack Size{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={PACK_SIZE_OPTIONS}
                                            value={form.packSize}
                                            onChange={(value) =>
                                                setForm({
                                                    ...form,
                                                    packSize: value,
                                                })
                                            }
                                            placeholder="Select Pack Size"
                                        />

                                    </div>

                                </div>

                                {/* ROW 5 */}
                                <div className="formRow d-flex">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Quantity{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Enter Quantity"
                                                value={form.quantity}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        quantity: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-stack-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Threshold Value{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Enter Threshold Value"
                                                value={form.thresholdValue}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        thresholdValue: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-alarm-warning-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Buying Price{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Enter Buying Price"
                                                value={form.buyingPrice}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        buyingPrice: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-money-dollar-circle-line"></i>

                                        </div>

                                    </div>

                                </div>

                                {/* ROW 6 */}
                                <div className="formRow d-flex">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Selling Price{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Enter Selling Price"
                                                value={form.sellingPrice}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        sellingPrice: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-money-dollar-box-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Unit Per Pack{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Enter Unit Per Pack"
                                                value={form.unitPerPack}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        unitPerPack: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-box-3-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Price Per Unit{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Enter Price Per Unit"
                                                value={form.pricePerUnit}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        pricePerUnit: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-coins-line"></i>

                                        </div>

                                    </div>

                                </div>

                                {/* ROW 7 */}
                                <div className="formRow">

                                    <div className="formGroup w-100">

                                        <label className="customLabel">
                                            Notes
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                className="customInput"
                                                type="text"
                                                placeholder="Enter Notes"
                                                value={form.notes}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        notes: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-sticky-note-line"></i>

                                        </div>

                                    </div>

                                </div>

                                {/* ROW 8 */}
                                <div className="formRow">

                                    <div className="formGroup w-100">

                                        <label className="customLabel">
                                            Barcode{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                placeholder="Enter Barcode"
                                                value={form.barcode}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        barcode: e.target.value,
                                                    })
                                                }
                                            />

                                            <i className="ri-barcode-line"></i>

                                        </div>

                                    </div>

                                </div>

                                {/* ROW 9 */}
                                <div className="d-flex justify-content-start gap-3">

                                    <button
                                        type="button"
                                        className="p-2 border-0 outline-0 col-md-3 rounded-0 border-blue text-blue bg-white fs-16 fw-400 d-flex justify-content-center align-items-center gap-2"
                                        onClick={generateBarcode}
                                    >
                                        Generate Barcode
                                        <i className="ri-barcode-line fs-18"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="p-2 border-0 outline-0 col-md-3 rounded-0 border-blue text-blue bg-white fs-16 fw-400 d-flex justify-content-center align-items-center gap-2"
                                    >
                                        Scan Barcode
                                        <i className="ri-qr-scan-line fs-18"></i>
                                    </button>

                                </div>

                                {/* BUTTONS */}
                                <div className="d-flex justify-content-between border-0 pb-0 mt-4">

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
                    </>
                )}

            </Modal>
        </>
    );
}