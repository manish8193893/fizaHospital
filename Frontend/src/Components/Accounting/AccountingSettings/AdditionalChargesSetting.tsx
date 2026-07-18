import { useEffect, useMemo, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";


/********************************************
    Name : Manish Kumar
    Date : 30/06/2026
    Purpose : Additional Charges Setting
*********************************************/
interface AdditionalChargeTableData {
    id: string;
    chargeName: string;
    chargeType: string;
    calculationMethod: string;
    defaultAmount: string;
    beneficiary: string;
    status: "Active" | "Not Active";
}

export default function AdditionalChargesSetting() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedChargeType, setSelectedChargeType] =
        useState<DropdownOption | null>(null);

    const [selectedCalculationMethod, setSelectedCalculationMethod] =
        useState<DropdownOption | null>(null);

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showAdditionalChargeModal, setShowAdditionalChargeModal] =
        useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Charge Type Options
    *********************************************/
    const chargeTypeOptions: DropdownOption[] = [
        {
            id: "deviceUsageFee",
            name: "Device Usage Fee",
        },
        {
            id: "otherFee",
            name: "Other Fee",
        },
        {
            id: "serviceFee",
            name: "Service Fee",
        },
        {
            id: "surgicalToolsFee",
            name: "Surgical Tools & Implants Fee",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Calculation Method Options
    *********************************************/
    const calculationMethodOptions: DropdownOption[] = [
        {
            id: "fixedAmount",
            name: "Fixed Amount",
        },
        {
            id: "percentage",
            name: "Percentage",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        {
            id: "active",
            name: "Active",
        },
        {
            id: "notactive",
            name: "Not Active",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Dummy Table Data
    *********************************************/
    const ALL_CHARGES_DATA: AdditionalChargeTableData[] = [
        {
            id: "AC001",
            chargeName: "Oxygen Cylinder Usage",
            chargeType: "Device Usage Fee",
            calculationMethod: "Fixed Amount",
            defaultAmount: "1500",
            beneficiary: "Hospital",
            status: "Active",
        },
        {
            id: "AC002",
            chargeName: "Consultation Charge",
            chargeType: "Service Fee",
            calculationMethod: "Percentage",
            defaultAmount: "10",
            beneficiary: "Doctor",
            status: "Active",
        },
        {
            id: "AC003",
            chargeName: "Operation Kit",
            chargeType: "Surgical Tools & Implants Fee",
            calculationMethod: "Fixed Amount",
            defaultAmount: "5000",
            beneficiary: "Shared",
            status: "Not Active",
        },
        {
            id: "AC004",
            chargeName: "Cleaning Charge",
            chargeType: "Other Fee",
            calculationMethod: "Fixed Amount",
            defaultAmount: "300",
            beneficiary: "Hospital",
            status: "Active",
        },
        {
            id: "AC005",
            chargeName: "Premium Surgeon Fee",
            chargeType: "Service Fee",
            calculationMethod: "Percentage",
            defaultAmount: "20",
            beneficiary: "Investor",
            status: "Not Active",
        },
        {
            id: "AC006",
            chargeName: "MRI Machine Usage",
            chargeType: "Device Usage Fee",
            calculationMethod: "Fixed Amount",
            defaultAmount: "2200",
            beneficiary: "Hospital",
            status: "Active",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredCharges = useMemo(() => {

        return ALL_CHARGES_DATA.filter((charge) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                charge.chargeName.toLowerCase().includes(searchValue) ||
                charge.chargeType.toLowerCase().includes(searchValue) ||
                charge.beneficiary.toLowerCase().includes(searchValue);

            const matchesChargeType =
                !selectedChargeType ||
                charge.chargeType.toLowerCase() ===
                selectedChargeType.name.toLowerCase();

            const matchesCalculationMethod =
                !selectedCalculationMethod ||
                charge.calculationMethod.toLowerCase() ===
                selectedCalculationMethod.name.toLowerCase();

            const matchesStatus =
                !selectedStatus ||
                charge.status.toLowerCase() ===
                selectedStatus.name.toLowerCase();

            return (
                matchesSearch &&
                matchesChargeType &&
                matchesCalculationMethod &&
                matchesStatus
            );

        });

    }, [
        globalSearch,
        selectedChargeType,
        selectedCalculationMethod,
        selectedStatus,
    ]);

    const totalPages = Math.ceil(
        filteredCharges.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredCharges.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredCharges,
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
    Name : Manish Kumar
    Date : 30/06/2026
    Purpose : Bootstrap Tooltips
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
        Date : 30/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns: ColumnActionRow<AdditionalChargeTableData>[] = [

        {
            key: "chargeName",
            header: <>Charge Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "chargeType",
            header: <>Charge Type</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "calculationMethod",
            header: <>Calculation Method</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "defaultAmount",
            header: <>Default Amount</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            render: (row) => (
                <div className="text-center">
                    ₹ {row.defaultAmount}
                </div>
            ),
        },

        {
            key: "beneficiary",
            header: <>Beneficiary</>,
            className: "text-center",
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center text-nowrap",

            render: (row) => (

                <div
                    className={`d-flex justify-content-center align-items-center w-100 h-100 ${row.status === "Active"
                        ? "printer"
                        : "delete"
                        }`}
                >
                    {row.status}
                </div>

            ),
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "170px",

            render: (row) => (

                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-title="View Details"
                        onClick={() =>
                            console.log("View :", row.id)
                        }
                    >
                        <i className="fs-18 ri-eye-line"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-title="Edit Details"
                        onClick={() =>
                            console.log("Edit :", row.id)
                        }
                    >
                        <i className="fs-18 ri-pencil-ai-line"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-title="Delete"
                        onClick={() =>
                            console.log("Delete :", row.id)
                        }
                    >
                        <i className="fs-18 ri-delete-bin-7-line"></i>
                    </button>

                </div>

            ),
        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedChargeType(null);
        setSelectedCalculationMethod(null);
        setSelectedStatus(null);
        setCurrentPage(1);

    };

    return (
        <>

            <div className="d-flex justify-content-between align-items-center gap-4 my-4">

                <p className="fs-18 fw-500">
                    Charges List
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        setShowAdditionalChargeModal(true)
                    }
                >

                    <div className="text-white fs-14 fw-400">
                        Add Additional Charges
                    </div>

                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />

                </div>

            </div>

            <div className="aph-modal-filter-row mb-4">

                {/* Global Search */}
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

                    <button className="aph-search-btn outline-0">
                        <i className="ri-search-line"></i>
                    </button>

                </div>

                {/* Charge Type */}
                <div>

                    <CustomFilterDropdown
                        options={chargeTypeOptions}
                        value={selectedChargeType}
                        placeholder="Charge Type"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedChargeType(selected);

                            setCurrentPage(1);

                        }}
                    />

                </div>

                {/* Calculation Method */}
                <div>

                    <CustomFilterDropdown
                        options={calculationMethodOptions}
                        value={selectedCalculationMethod}
                        placeholder="Calculation"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedCalculationMethod(selected);

                            setCurrentPage(1);

                        }}
                    />

                </div>

                {/* Status */}
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

            <AdditionalChargesModal
                show={showAdditionalChargeModal}
                handleClose={() =>
                    setShowAdditionalChargeModal(false)
                }
            />

        </>
    );

}

import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

interface AdditionalChargesModalProps {
    show: boolean;
    handleClose: () => void;
}

interface AdditionalChargeForm {
    chargeName: string;
    defaultAmount: string;
    notes: string;
    doctor: string;
    investor: string;
    hospital: string;
}

function AdditionalChargesModal({
    show,
    handleClose,
}: AdditionalChargesModalProps) {

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Form State
    *********************************************/
    const [formData, setFormData] =
        useState<AdditionalChargeForm>({
            chargeName: "",
            defaultAmount: "",
            notes: "",
            doctor: "",
            investor: "",
            hospital: "",
        });

    const [selectedChargeType, setSelectedChargeType] =
        useState<DropdownOption | null>(null);

    const [selectedCalculationMethod, setSelectedCalculationMethod] =
        useState<DropdownOption | null>(null);

    const [selectedBeneficiary, setSelectedBeneficiary] =
        useState<DropdownOption | null>(null);

    const [selectedAllowEdit, setSelectedAllowEdit] =
        useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Charge Type Options
    *********************************************/
    const CHARGE_TYPE_OPTIONS: DropdownOption[] = [
        {
            id: "deviceUsageFee",
            name: "Device Usage Fee",
        },
        {
            id: "otherFee",
            name: "Other Fee",
        },
        {
            id: "serviceFee",
            name: "Service Fee",
        },
        {
            id: "surgicalToolsFee",
            name: "Surgical Tools & Implants Fee",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Calculation Method Options
    *********************************************/
    const CALCULATION_METHOD_OPTIONS: DropdownOption[] = [
        {
            id: "fixed",
            name: "Fixed Amount",
        },
        {
            id: "percentage",
            name: "Percentage",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Beneficiary Options
    *********************************************/
    const BENEFICIARY_OPTIONS: DropdownOption[] = [
        {
            id: "hospital",
            name: "Hospital",
        },
        {
            id: "doctor",
            name: "Doctor",
        },
        {
            id: "shared",
            name: "Shared",
        },
        {
            id: "investor",
            name: "Investor",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Allow Edit Options
    *********************************************/
    const ALLOW_EDIT_OPTIONS: DropdownOption[] = [
        {
            id: "yes",
            name: "Yes",
        },
        {
            id: "no",
            name: "No",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Handle Input Change
    *********************************************/
    const handleChange = (
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

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Reset Form
    *********************************************/
    const resetForm = () => {

        setFormData({
            chargeName: "",
            defaultAmount: "",
            notes: "",
            doctor: "",
            investor: "",
            hospital: "",
        });

        setSelectedChargeType(null);
        setSelectedCalculationMethod(null);
        setSelectedBeneficiary(null);
        setSelectedAllowEdit(null);

    };

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Save Data
    *********************************************/
    const handleSave = () => {

        const payload = {
            ...formData,
            chargeType: selectedChargeType,
            calculationMethod:
                selectedCalculationMethod,
            beneficiary:
                selectedBeneficiary,
            allowEditInInvoice:
                selectedAllowEdit,
        };

        console.log(
            "Additional Charge :",
            payload
        );

        resetForm();

        handleClose();

    };

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Close Modal
    *********************************************/
    const handleModalClose = () => {

        resetForm();

        handleClose();

    };

    return (


        <Modal
            show={show}
            onHide={handleModalClose}
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
                    onClick={handleModalClose}
                    aria-label="Close"
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    Add Additional Charges
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Charge Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="chargeName"
                                    className="customInput"
                                    placeholder="Enter Charge Name"
                                    value={formData.chargeName}
                                    onChange={handleChange}
                                />

                                <i className="ri-money-rupee-circle-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Charge Type{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={
                                    CHARGE_TYPE_OPTIONS
                                }
                                value={
                                    selectedChargeType
                                }
                                onChange={
                                    setSelectedChargeType
                                }
                                placeholder="Select Charge Type"
                            />

                        </div>

                    </div>

                    {/* ROW 2 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Calculation Method{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={
                                    CALCULATION_METHOD_OPTIONS
                                }
                                value={
                                    selectedCalculationMethod
                                }
                                onChange={
                                    setSelectedCalculationMethod
                                }
                                placeholder="Select Calculation Method"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Default Amount{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="defaultAmount"
                                    className="customInput"
                                    placeholder="Enter Default Amount"
                                    value={formData.defaultAmount}
                                    onChange={handleChange}
                                />

                                <i className="ri-money-dollar-circle-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 3 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Beneficiary{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={BENEFICIARY_OPTIONS}
                                value={selectedBeneficiary}
                                onChange={(value) =>
                                    setSelectedBeneficiary(value)
                                }
                                placeholder="Select Beneficiary"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Allow Edit In Invoice{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={ALLOW_EDIT_OPTIONS}
                                value={selectedAllowEdit}
                                onChange={(value) =>
                                    setSelectedAllowEdit(value)
                                }
                                placeholder="Select Option"
                            />

                        </div>

                    </div>

                    {/* SHARED BENEFICIARY */}
                    {selectedBeneficiary?.name === "Shared" && (

                        <div className="formRow d-flex">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Doctor
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="number"
                                        name="doctor"
                                        className="customInput"
                                        placeholder="Enter Doctor Share"
                                        value={formData.doctor}
                                        onChange={handleChange}
                                    />

                                    <i className="ri-user-heart-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Investor
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="number"
                                        name="investor"
                                        className="customInput"
                                        placeholder="Enter Investor share"
                                        value={formData.investor}
                                        onChange={handleChange}
                                    />

                                    <i className="ri-building-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Hospital
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="number"
                                        name="hospital"
                                        className="customInput"
                                        placeholder="Enter Hospital Share"
                                        value={formData.hospital}
                                        onChange={handleChange}
                                    />

                                    <i className="ri-hospital-line"></i>

                                </div>

                            </div>

                        </div>

                    )}

                    {/* ROW 4 */}
                    <div className="formRow">

                        <div className="formGroup w-100">

                            <label className="customLabel">
                                Notes
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="notes"
                                    className="customInput"
                                    placeholder="Enter Notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />

                                <i className="ri-file-text-line"></i>

                            </div>

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
                            onClick={handleModalClose}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </Modal.Body>

        </Modal>

    );

}