import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";
import CustomFormDropdown, { type DropdownOption, } from "../../../GlobalHelpers/CustomFormDropdown";


interface LogUsedItemModalProps {
    show: boolean;
    handleClose: () => void;
}

interface UsedItem {
    id: number;
    source: "Inventory" | "External";
    itemType: DropdownOption | null;
    itemName: string;
    quantity: number;
    unit: DropdownOption | null;
    price: number;
    notes: string;
}

export default function LogUsedItemModal({
    show,
    handleClose,
}: LogUsedItemModalProps) {

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP
    *********************************************/
    const [step, setStep] = useState<1 | 2>(1);

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose :TOGGLE
    *********************************************/
    const [itemSource, setItemSource] = useState<"Inventory" | "External">("Inventory");

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : DROPDOWNS
    *********************************************/

    const ITEM_TYPE_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Antibiotics" },
        { id: "2", name: "Central Nervous System (CNS) Medications" },
        { id: "3", name: "Chronic Disease Medications (Hypertension, Diabetes, Cardiac)" },
        { id: "4", name: "Dermatological & Cosmetic Products" },
        { id: "5", name: "Gastrointestinal (GI) Medications" },
        { id: "6", name: "Medical Supplies / Disposables (Syringes, Cotton, Cannulas)" },
        { id: "7", name: "Ophthalmic & Otic Medications" },
        { id: "8", name: "Respiratory System & Allergy Medications" },
        { id: "9", name: "Vitamins & Dietary Supplements" },
    ];

    const UNIT_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Capsule" },
        { id: "2", name: "Dose" },
        { id: "3", name: "Gram (g)" },
        { id: "4", name: "International Unit (IU)" },
        { id: "5", name: "IV Bag" },
        { id: "6", name: "Liter (L)" },
        { id: "7", name: "Milligram (mg)" },
        { id: "8", name: "Milliliter (mL)" },
        { id: "9", name: "Pack" },
        { id: "10", name: "Pair" },
        { id: "11", name: "Piece" },
        { id: "12", name: "Roll" },
        { id: "13", name: "Set" },
        { id: "14", name: "Slide" },
        { id: "15", name: "Tablet" },
        { id: "16", name: "Test Kit" },
        { id: "17", name: "Tube" },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : DUMMY MEDICINES
    *********************************************/

    const ALL_MEDICINES = [
        "Paracetamol",
        "Amoxicillin",
        "Augmentin",
        "Cefixime",
        "Ceftriaxone",
        "Azithromycin",
        "Ibuprofen",
        "Diclofenac",
        "Omeprazole",
        "Pantoprazole",
        "Metformin",
        "Insulin",
        "Vitamin C",
        "Vitamin D",
        "Calcium Tablet",
        "Cetirizine",
        "Salbutamol",
        "Dolo 650",
        "Crocin",
        "PCM Injection",
        "ORS",
        "Glucose Bottle",
        "IV Set",
        "Cotton Roll",
        "Syringe 5ml",
        "Cannula",
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : FORM STATES
    *********************************************/

    const [selectedItemType, setSelectedItemType] = useState<DropdownOption | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<DropdownOption | null>(null);
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [medicineSuggestions, setMedicineSuggestions] = useState<string[]>([]);
    const [tableData, setTableData] = useState<UsedItem[]>([]);

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP 1 PAGINATION STATES
    *********************************************/
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP 2 PAGINATION STATES
    *********************************************/
    const [previewCurrentPage, setPreviewCurrentPage] = useState<number>(1);
    const [previewItemsPerPage, setPreviewItemsPerPage] = useState<number>(5);

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : SEARCH
    *********************************************/

    const handleMedicineSearch = (value: string) => {
        setItemName(value);

        if (value.length < 2) {
            setMedicineSuggestions([]);
            return;
        }

        const filtered = ALL_MEDICINES.filter((medicine) =>
            medicine.toLowerCase().includes(value.toLowerCase())
        );

        setMedicineSuggestions(filtered);
    };

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP 1 TABLE COLUMNS
    *********************************************/
    const columns: ColumnActionRow<UsedItem>[] = [

        {
            key: "itemName",
            header: <>Item Name / Code</>,
            className: "text-center",
        },

        {
            key: "quantity",
            header: <>Quantity</>,
            className: "text-center",
        },

        {
            key: "unit",
            header: <>Unit</>,
            className: "text-center",
            render: (row) => row.unit?.name,
        },

        {
            key: "price",
            header: <>Price</>,
            className: "text-center",
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",

            render: (row) => (

                <button
                    type="button"
                    className="delete"
                    onClick={() =>
                        setTableData(prev =>
                            prev.filter(item => item.id !== row.id)
                        )
                    }
                >
                    <i className="ri-delete-bin-6-line"></i>
                </button>

            ),
        },

    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP 2 TABLE COLUMNS
    *********************************************/
    const previewColumns: ColumnActionRow<UsedItem>[] = [

        {
            key: "itemName",
            header: <>Item Name / Code</>,
            className: "text-center",
        },

        {
            key: "quantity",
            header: <>Quantity</>,
            className: "text-center",
        },

        {
            key: "unit",
            header: <>Unit</>,
            className: "text-center",
            render: (row) => row.unit?.name,
        },

        {
            key: "price",
            header: <>Price</>,
            className: "text-center",
        },

    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP 1 VISIBLE TABLE DATA
    *********************************************/
    const visibleTableData = useMemo(() => {

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return tableData.slice(startIndex, endIndex);

    }, [tableData, currentPage, itemsPerPage,]);

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP 1 TOTAL PAGES
    *********************************************/
    const totalPages = Math.ceil(
        tableData.length /
        itemsPerPage
    );

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP 2 VISIBLE TABLE DATA
    *********************************************/
    const previewVisibleTableData = useMemo(() => {

        const startIndex = (previewCurrentPage - 1) * previewItemsPerPage;
        const endIndex = startIndex + previewItemsPerPage;
        return tableData.slice(startIndex, endIndex);

    }, [tableData, previewCurrentPage, previewItemsPerPage,]);

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : STEP 2 TOTAL PAGES
    *********************************************/
    const previewTotalPages = Math.ceil(
        tableData.length /
        previewItemsPerPage
    );


    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : RESET FORMS
    *********************************************/

    const resetForm = () => {

        setSelectedItemType(null);
        setSelectedUnit(null);
        setItemName("");
        setQuantity("");
        setPrice("");
        setNotes("");
        setMedicineSuggestions([]);
        setItemSource("Inventory");
    };

    /********************************************
        Name    : Manish Kumar
        Date    : 28/06/2026
        Purpose : SAVE AND ADD NEW
    *********************************************/

    const handleSaveAndAddNew = () => {

        const newItem: UsedItem = {

            id: Date.now(),
            source: itemSource,
            itemType: selectedItemType,
            itemName,
            quantity: Number(quantity),
            unit: selectedUnit,
            price: Number(Number(quantity)*Number(price)),
            notes,
        };

        setTableData((prev) => [
            ...prev,
            newItem,
        ]);

        resetForm();
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
                        top: "2.7rem",
                    }}
                    onClick={handleClose}
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="aph-modal-title fs-18 fw-400">
                    Log Used Items
                </Modal.Title>

            </Modal.Header>

            {
                step === 1 && (

                    <Modal.Body className="p-0">

                        <form>

                            {/* ROW 1 */}

                            <div className="formRow">

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Item Type{" "}<span className="text-danger">*</span>
                                    </label>

                                    <CustomFormDropdown
                                        options={ITEM_TYPE_OPTIONS}
                                        value={selectedItemType}
                                        onChange={setSelectedItemType}
                                        placeholder="Select Item Type"
                                    />

                                </div>

                            </div>

                            {/* SOURCE BUTTONS */}
                            <div className="d-flex justify-content-end gap-2">
                                <button
                                    type="button"
                                    className="outline-0 py-1 px-3 fs-12"
                                    style={{
                                        background: itemSource === "Inventory" ? "#3E64AB" : "#fff",
                                        color: itemSource === "Inventory" ? "#fff" : "#000",
                                        border: "1px solid #3E64AB",
                                    }}
                                    onClick={() => setItemSource("Inventory")}
                                >
                                    From Inventory
                                </button>

                                <button
                                    type="button"
                                    className="outline-0 py-1 px-3 fs-12"
                                    style={{
                                        background: itemSource === "External" ? "#3E64AB" : "#fff",
                                        color: itemSource === "External" ? "#fff" : "#000",
                                        border: "1px solid #3E64AB",
                                    }}
                                    onClick={() => setItemSource("External")}
                                >
                                    External
                                </button>
                            </div>

                            {/* Inventory UI */}

                            {itemSource === "Inventory" && (

                                <div className="formRow d-flex">

                                    <div className="formGroup" style={{minWidth:"70%"}}>
                                        <label className="customLabel">Item Name / Code{" "}<span className="text-danger">*</span></label>

                                        <div className="inputWrapper position-relative rounded-0">
                                            <input
                                                className="customInput rounded-0"
                                                value={itemName}
                                                onChange={(e) => handleMedicineSearch(e.target.value)}
                                                placeholder="Search Medicine"
                                            />

                                            <i className="ri-search-ai-line"></i>

                                            {medicineSuggestions.length > 0 && (
                                                <div
                                                    className="position-absolute bg-white border rounded w-100"
                                                    style={{
                                                        zIndex: 1000,
                                                        maxHeight: 220,
                                                        overflowY: "auto",
                                                    }}
                                                >
                                                    {medicineSuggestions.map((medicine) => (
                                                        <div
                                                            key={medicine}
                                                            className="p-2"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                setItemName(medicine);
                                                                setMedicineSuggestions([]);
                                                            }}
                                                        >
                                                            {medicine}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">
                                            &nbsp;
                                        </label>

                                        <button
                                            type="button"
                                            className="border-0 bg-blue text-white py-2 px-3"
                                        >
                                            Scan Barcode
                                        </button>
                                    </div>

                                </div>

                            )}

                            {/* External UI */}

                            {itemSource === "External" && (

                                <div className="formRow">

                                    <div className="formGroup fullWidth">

                                        <label className="customLabel">
                                            Item Name / Code{" "}<span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                placeholder="Enter Item Name / Medicine Name"
                                                value={itemName}
                                                onChange={(e) =>
                                                    setItemName(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <i className="ri-medicine-bottle-line"></i>

                                        </div>

                                    </div>

                                </div>

                            )}

                            {/* ROW 3 */}

                            <div className="formRow d-flex">

                                {/* Quantity */}

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Quantity{" "}<span className="text-danger">*</span>
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="number"
                                            min={1}
                                            className="customInput"
                                            placeholder="Enter Quantity"
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <i className="ri-hashtag"></i>

                                    </div>

                                </div>

                                {/* Unit */}

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Unit{" "}<span className="text-danger">*</span>
                                    </label>

                                    <CustomFormDropdown
                                        options={UNIT_OPTIONS}
                                        value={selectedUnit}
                                        onChange={setSelectedUnit}
                                        placeholder="Select Unit"
                                    />

                                </div>

                                {/* Price */}

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Price{" "}<span className="text-danger">*</span>
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="number"
                                            className="customInput"
                                            placeholder="Enter Price"
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <i className="ri-money-dollar-circle-line"></i>

                                    </div>

                                </div>

                            </div>

                            {/* ROW 4 */}

                            <div className="formRow">

                                <div className="formGroup fullWidth">

                                    <label className="customLabel">
                                        Notes
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            className="customInput"
                                            placeholder="Enter Notes"
                                            value={notes}
                                            onChange={(e) =>
                                                setNotes(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <i className="ri-sticky-note-line"></i>

                                    </div>

                                </div>

                            </div>

                            {/* TABLE */}
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

                            {/* BUTTONS */}
                            <div className="d-flex justify-content-between border-0 pb-0 mt-3">

                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-0 outline-0 col-md-3 bg-blue text-white fs-18 fw-400"
                                    onClick={() =>
                                        setStep(2)
                                    }
                                >
                                    Preview
                                </button>

                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-blue outline-0 col-md-4 bg-white text-blue fs-18 fw-400"
                                    onClick={
                                        handleSaveAndAddNew
                                    }
                                >
                                    Save & Add New
                                </button>

                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-0 outline-0 col-md-3 border-red text-red bg-white fs-18 fw-400"
                                    onClick={() => {
                                        resetForm();
                                        setTableData([]);
                                        handleClose();
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </Modal.Body>

                )
            }

            {/* ==========================================================
                            STEP - 2 (PREVIEW)
            =========================================================== */}

            {
                step === 2 && (

                    <Modal.Body className="p-0">

                        <div>

                            {/* TABLE */}
                            <div className="d-flex flex-column">

                                <GlobalGridTable
                                    data={previewVisibleTableData}
                                    columns={previewColumns}
                                    currentPage={previewCurrentPage}
                                    pageSize={previewItemsPerPage}
                                />

                                <Pagination
                                    totalPages={previewTotalPages}
                                    currentPage={previewCurrentPage}
                                    onPageChange={(page) => setPreviewCurrentPage(page)}
                                    rowsPerPage={previewItemsPerPage}
                                    onRowsPerPageChange={(rows) => {
                                        setPreviewItemsPerPage(rows);
                                        setPreviewCurrentPage(1);
                                    }}
                                />

                            </div>

                            {/* SUMMARY */}

                            <div className="mt-3">

                                <div
                                    className="d-flex justify-content-between pb-2 border-bottom"
                                >
                                    <span className="fw-500">
                                        Subtotal
                                    </span>

                                    <span className="fw-500">

                                        {
                                            tableData
                                                .reduce(
                                                    (
                                                        total,
                                                        item
                                                    ) =>
                                                        total +
                                                        item.price,
                                                    0
                                                )
                                                .toFixed(2)
                                        }

                                    </span>

                                </div>

                                <div
                                    className="d-flex justify-content-between py-2 border-bottom"
                                >
                                    <span className="fw-500">
                                        Discount
                                    </span>

                                    <span className="text-danger">
                                        -0.00
                                    </span>

                                </div>

                                <div
                                    className="d-flex justify-content-between py-2 mt-1"
                                    style={{
                                        background: "#EEF5FF",
                                        paddingInline: 15,
                                    }}
                                >

                                    <span className="fw-bold">
                                        Total Amount
                                    </span>

                                    <span
                                        className="fw-bold"
                                        style={{
                                            color: "#3E64AB"
                                        }}
                                    >

                                        {
                                            tableData
                                                .reduce(
                                                    (
                                                        total,
                                                        item
                                                    ) =>
                                                        total +
                                                        item.price,
                                                    0
                                                )
                                                .toFixed(2)
                                        }

                                    </span>

                                </div>

                            </div>

                            {/* BUTTONS */}

                            <div
                                className="d-flex justify-content-between mt-3"
                            >

                                {/* SEND */}

                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-0 outline-0 col-md-8 bg-success text-white fs-18 fw-400"
                                    onClick={() => {

                                        const payload = {

                                            items: tableData,

                                            subtotal:
                                                tableData.reduce(
                                                    (
                                                        total,
                                                        item
                                                    ) =>
                                                        total +
                                                        item.price,
                                                    0
                                                ),

                                            discount: 0,

                                            totalAmount:
                                                tableData.reduce(
                                                    (
                                                        total,
                                                        item
                                                    ) =>
                                                        total +
                                                        item.price,
                                                    0
                                                ),

                                        };

                                        console.log(
                                            "SEND TO ACCOUNTANT",
                                            payload
                                        );

                                        resetForm();

                                        setTableData([]);

                                        setStep(1);

                                        handleClose();

                                    }}
                                >
                                    Send To Accountant
                                </button>

                                {/* BACK */}

                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-0 outline-0 col-md-3 border-red text-red bg-white fs-18 fw-400"
                                    onClick={() =>
                                        setStep(1)
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </Modal.Body>

                )
            }

        </Modal>

    );

}