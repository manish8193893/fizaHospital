import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import { Modal } from "react-bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown, { type DropdownOption } from "../../../GlobalHelpers/CustomFilterDropdown";

import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";



import type { ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";
import GlobalGridTable from "../../../GlobalHelpers/GlobalGridTable";

interface PurchaseOrderTableData {
    id: string;
    poNumber: string;
    supplierName: string;
    items: number;
    totalAmount: number;
    orderDate: string;
    status: "Received" | "Partially Received" | "Draft";
}

interface Medicine {
    id: string;
    name: string;
    dosageForm: string;
    routeForm: string;
}

interface SelectedMedicine {
    rowId: number;
    medicineId?: string;
    productName: string;
    dosageForm: string;
    routeForm: string;
    quantity: number;
}


export default function PurchaseOrderGridTable() {

    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedSupplier, setSelectedSupplier] = useState<DropdownOption | null>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
      Name : Manish Kumar
      Date : 21/06/2026
      Purpose : Status Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        { id: "received", name: "Received" },
        { id: "partial", name: "Partially Received" },
        { id: "draft", name: "Draft" },
    ];

    /********************************************
      Name : Manish Kumar
      Date : 21/06/2026
      Purpose : Supplier Options
    *********************************************/
    const SUPPLIER_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Ahmed Hassan" },
        { id: "2", name: "Mohammed Ali" },
        { id: "3", name: "Sarah Johnson" },
        { id: "4", name: "David Wilson" },
        { id: "5", name: "Fatima Abdullah" },
    ];

    /********************************************
      Name : Manish Kumar
      Date : 21/06/2026
      Purpose : Medicines
    *********************************************/
    const MEDICINES: Medicine[] = [
        {
            id: "MED001",
            name: "Paracetamol 500 mg Tablets",
            dosageForm: "500mg",
            routeForm: "Oral",
        },
        {
            id: "MED002",
            name: "Amoxicillin 250",
            dosageForm: "250mg",
            routeForm: "Oral",
        },
        {
            id: "MED003",
            name: "Azithromycin 500",
            dosageForm: "500mg",
            routeForm: "Oral",
        },
        {
            id: "MED004",
            name: "Sterile Gauze Pads",
            dosageForm: "N/A",
            routeForm: "Topical (External Use)",
        },
        {
            id: "MED005",
            name: "Ibuprofen 400",
            dosageForm: "400mg",
            routeForm: "Oral",
        },
    ];

    /********************************************
      Name : Manish Kumar
      Date : 21/06/2026
      Purpose : Table Data
    *********************************************/
    const ALL_PO_DATA: PurchaseOrderTableData[] = [
        {
            id: "1",
            poNumber: "PO-0626-001",
            supplierName: "Ahmed Hassan",
            items: 12,
            totalAmount: 25000,
            orderDate: "12/06/2026",
            status: "Received",
        },
        {
            id: "2",
            poNumber: "PO-0626-002",
            supplierName: "Mohammed Ali",
            items: 8,
            totalAmount: 18000,
            orderDate: "15/06/2026",
            status: "Draft",
        },
        {
            id: "3",
            poNumber: "PO-0626-003",
            supplierName: "Sarah Johnson",
            items: 20,
            totalAmount: 42000,
            orderDate: "18/06/2026",
            status: "Partially Received",
        },
        {
            id: "4",
            poNumber: "PO-0626-004",
            supplierName: "David Wilson",
            items: 6,
            totalAmount: 15000,
            orderDate: "19/06/2026",
            status: "Received",
        },
        {
            id: "5",
            poNumber: "PO-0626-005",
            supplierName: "Fatima Abdullah",
            items: 15,
            totalAmount: 32000,
            orderDate: "20/06/2026",
            status: "Draft",
        },
    ];

    const filteredPOs = useMemo(() => {
        return ALL_PO_DATA.filter((po) => {
            const matchesSearch =
                po.poNumber.toLowerCase().includes(globalSearch.toLowerCase()) ||
                po.supplierName.toLowerCase().includes(globalSearch.toLowerCase());

            const matchesStatus =
                !selectedStatus ||
                po.status.toLowerCase() === selectedStatus.name.toLowerCase();

            let matchesDate = true;

            if (selectedDate) {

                const formattedSelectedDate =
                    `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
                        selectedDate.getMonth() + 1
                    ).padStart(2, "0")}/${selectedDate.getFullYear()}`;

                matchesDate =
                    po.orderDate === formattedSelectedDate;

            }

            const matchesSupplier =
                !selectedSupplier || po.supplierName === selectedSupplier.name;

            return matchesSearch && matchesStatus && matchesSupplier && matchesDate;
        });
    }, [globalSearch, selectedStatus, selectedSupplier, selectedDate,]);

    const totalPages = Math.ceil(filteredPOs.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredPOs.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredPOs, currentPage, itemsPerPage]);

    /********************************************
      Name : Manish Kumar
      Date : 09/06/2026
      Purpose : Close Calendar
    *********************************************/
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setCurrentPage(1);
        setShowCalendar(false);
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Tooltips
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
        Date : 21/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns: ColumnActionRow<PurchaseOrderTableData>[] = [
        {
            key: "poNumber",
            header: <>PO Number</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },
        {
            key: "supplierName",
            header: <>Supplier Name</>,
            sortable: true,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },
        {
            key: "items",
            header: <>Items</>,
            className: "text-center",
        },
        {
            key: "totalAmount",
            header: <>Total Amount</>,
            className: "text-center",
            render: (row) => <>SAR {row.totalAmount}</>,
        },
        {
            key: "orderDate",
            header: <>Order Date</>,
            className: "text-center",
        },
        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Received"
                            ? "status-completed"
                            : row.status === "Partially Received"
                                ? "status-pending"
                                : "status-paid"
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
            width: "150px",
            render: (row) => (
                <div className="d-flex justify-content-center gap-2">
                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-title="View"
                        onClick={() => console.log(row.id)}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>
                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-title="Edit"
                    >
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </button>
                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-title="Delete"
                    >
                        <i className="ri-delete-bin-7-line fs-18"></i>
                    </button>
                </div>
            ),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedStatus(null);
        setSelectedSupplier(null);
        setSelectedDate(null);
        setCurrentPage(1);
    };


    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center my-4">
                <h5 className="patient-info-heading mb-0">Purchase Orders</h5>
                <div
                    className="Plus-btn"
                    onClick={() => setShowPurchaseModal(true)}
                >
                    <div className="text-white fs-14 fw-400">New Purchase Order</div>
                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                </div>
            </div>

            {/* FILTER ROW */}
            <div className="aph-modal-filter-row mb-4">
                <div className="aph-filter-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="aph-search-input"
                        value={globalSearch}
                        onChange={(e) => setGlobalSearch(e.target.value)}
                    />
                    <button className="aph-search-btn outline-0">
                        <i className="ri-search-line"></i>
                    </button>
                </div>

                <div>
                    <CustomFilterDropdown
                        options={STATUS_OPTIONS}
                        value={selectedStatus}
                        placeholder="Status"
                        customClass="aph-filter-dropdown"
                        onChange={setSelectedStatus}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={SUPPLIER_OPTIONS}
                        value={selectedSupplier}
                        placeholder="Supplier"
                        customClass="aph-filter-dropdown"
                        onChange={setSelectedSupplier}
                    />
                </div>

                <div
                    className="aph-calendar-filter"
                    ref={calendarRef}
                >

                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() =>
                            setShowCalendar(
                                !showCalendar
                            )
                        }
                    >
                        <i className="ri-calendar-line"></i>

                        <span>
                            {selectedDate
                                ? `${String(
                                    selectedDate.getDate()
                                ).padStart(
                                    2,
                                    "0"
                                )}/${String(
                                    selectedDate.getMonth() +
                                    1
                                ).padStart(
                                    2,
                                    "0"
                                )}/${selectedDate.getFullYear()}`
                                : "Date"}
                        </span>

                    </button>

                    {showCalendar && (
                        <div className="aph-calendar-popup">
                            <DateFilterCalendar
                                selectedDate={
                                    selectedDate
                                }
                                onDateSelect={
                                    handleDateSelect
                                }
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
                    onPageChange={setCurrentPage}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows) => {
                        setItemsPerPage(rows);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <PurchaseOrderModal
                show={showPurchaseModal}
                handleClose={() => setShowPurchaseModal(false)}
                medicines={MEDICINES}
                supplierOptions={SUPPLIER_OPTIONS}
            />
        </>
    )
}


interface PurchaseOrderModalProps {
    show: boolean;
    handleClose: () => void;
    medicines: Medicine[];
    supplierOptions: DropdownOption[];
}

function PurchaseOrderModal({
    show,
    handleClose,
    medicines,
}: PurchaseOrderModalProps) {
    const [poNumber, setPoNumber] = useState("");
    const [expectedDate, setExpectedDate] = useState<Date | null>(null);
    const [showExpectedDateCalendar, setShowExpectedDateCalendar] = useState(false);
    const [rows, setRows] = useState<SelectedMedicine[]>(
        [
            {
                rowId: 1,
                productName: "",
                dosageForm: "-",
                routeForm: "-",
                quantity: 1,
            },
        ]
    );
    const [searchRowId, setSearchRowId] = useState<number | null>(null);
    const [searchText, setSearchText] = useState("");

    const filteredMedicines =
        searchText.length >= 2
            ? medicines.filter((medicine) =>
                medicine.name.toLowerCase().includes(searchText.toLowerCase())
            )
            : [];

    useEffect(() => {
        if (show) {
            const randomNumber = Math.floor(100 + Math.random() * 900);
            setPoNumber(`PO-0626-${randomNumber}`);
            setRows([
                {
                    rowId: 1,
                    productName: "",
                    dosageForm: "-",
                    routeForm: "-",
                    quantity: 1,
                },
            ]);
        }
    }, [show]);

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Select Medicine
    *********************************************/
    const handleSelectMedicine = (medicine: Medicine) => {
        setRows((prev) => {
            const updatedRows = prev.map((row) =>
                row.rowId === searchRowId
                    ? {
                        ...row,
                        medicineId: medicine.id,
                        productName: medicine.name,
                        dosageForm: medicine.dosageForm,
                        routeForm: medicine.routeForm,
                        quantity: 1,
                    }
                    : row
            );

            const isLastRow =
                updatedRows[updatedRows.length - 1].rowId === searchRowId;

            if (isLastRow) {
                updatedRows.push({
                    rowId: updatedRows.length + 1,
                    productName: "",
                    dosageForm: "-",
                    routeForm: "-",
                    quantity: 1,
                });
            }

            return updatedRows;
        });

        setSearchRowId(null);
        setSearchText("");
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Update Quantity
    *********************************************/
    const updateQuantity = (rowId: number, quantity: number) => {
        setRows((prev) =>
            prev.map((row) =>
                row.rowId === rowId
                    ? {
                        ...row,
                        quantity: quantity < 1 ? 1 : quantity,
                    }
                    : row
            )
        );
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Save PO
    *********************************************/
    const handleSave = () => {
        const payload = {
            poNumber,
            expectedDate,
            items: rows.filter((row) => row.productName !== ""),
        };

        console.log("Purchase Order Data :", payload);
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
                    >
                        <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                    </button>

                    <Modal.Title className="fs-18 fw-400 aph-modal-title">
                        New Purchase Order
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-0">
                    <form>
                        {/* ROW 1 */}
                        <div className="formRow">
                            <div className="formGroup">
                                <label className="customLabel">
                                    PO Number <span className="text-danger">*</span>
                                </label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        disabled
                                        className="customInput"
                                        value={poNumber}
                                    />
                                    <i className="ri-file-list-3-line"></i>
                                </div>
                            </div>

                            <div className="formGroup">
                                <label className="customLabel">
                                    Expected Delivery <span className="text-danger">*</span>
                                </label>

                                <div style={{ position: "relative" }}>
                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() => setShowExpectedDateCalendar(!showExpectedDateCalendar)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <span>
                                            {expectedDate
                                                ? `${String(expectedDate.getDate()).padStart(2, "0")}/${String(
                                                    expectedDate.getMonth() + 1
                                                ).padStart(2, "0")}/${expectedDate.getFullYear()}`
                                                : "DD-MM-YYYY"}
                                        </span>
                                        <i
                                            className="ri-calendar-line"
                                            style={{
                                                position: "absolute",
                                                right: "15px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                            }}
                                        ></i>
                                    </div>

                                    {showExpectedDateCalendar && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                            }}
                                        >
                                            <DateFilterCalendar
                                                selectedDate={expectedDate}
                                                onDateSelect={(date) => {
                                                    setExpectedDate(date);
                                                    setShowExpectedDateCalendar(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <p className="fs-18 fw-500 mb-2">Ordered Items</p>
                            <div className="table-responsive">
                                <table className="table table-bordered align-middle">
                                    <thead>
                                        <tr className="text-nowrap">
                                            <th className="text-center bg-blue text-white fs-16 fw-500">#</th>
                                            <th className="text-center bg-blue text-white fs-16 fw-500">Product Name</th>
                                            <th className="text-center bg-blue text-white fs-16 fw-500">Dosage Form</th>
                                            <th className="text-center bg-blue text-white fs-16 fw-500">Route Form</th>
                                            <th className="text-center bg-blue text-white fs-16 fw-500">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={row.rowId}>
                                                <td className="text-center">{index + 1}</td>

                                                <td className="text-center">
                                                    {!row.productName ? (
                                                        <>
                                                            <div className="inputWrapper rounded-0">
                                                                <input
                                                                    type="text"
                                                                    className="customInput rounded-0"
                                                                    placeholder="Search Product..."
                                                                    value={
                                                                        searchRowId === row.rowId ? searchText : ""
                                                                    }
                                                                    onFocus={() => setSearchRowId(row.rowId)}
                                                                    onChange={(e) => {
                                                                        setSearchRowId(row.rowId);
                                                                        setSearchText(e.target.value);
                                                                    }}
                                                                />
                                                                <i className="ri-search-ai-line"></i>
                                                            </div>

                                                            {searchRowId === row.rowId &&
                                                                searchText.length >= 2 && (
                                                                    <div
                                                                        className="bg-white border rounded-0 mt-2"
                                                                        style={{
                                                                            position: "absolute",
                                                                            zIndex: 1000,
                                                                            overflowY: "auto",
                                                                        }}
                                                                    >
                                                                        {filteredMedicines.map((medicine) => (
                                                                            <div
                                                                                key={medicine.id}
                                                                                className="px-3 py-2 border-bottom cursor-pointer"
                                                                                style={{ cursor: "pointer" }}
                                                                                onClick={() =>
                                                                                    handleSelectMedicine(medicine)
                                                                                }
                                                                            >
                                                                                {medicine.name}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                        </>
                                                    ) : (
                                                        row.productName
                                                    )}
                                                </td>

                                                <td className="text-center">{row.dosageForm}</td>

                                                <td className="text-center">{row.routeForm}</td>

                                                <td className="text-center">
                                                    {row.productName ? (
                                                        <input
                                                            type="number"
                                                            className="customInput text-center px-2 rounded-0"
                                                            style={{maxWidth:"70px"}}
                                                            min={1}
                                                            value={row.quantity}
                                                            onChange={(e) =>
                                                                updateQuantity(
                                                                    row.rowId,
                                                                    Number(e.target.value)
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-3">
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
        </>
    )
}