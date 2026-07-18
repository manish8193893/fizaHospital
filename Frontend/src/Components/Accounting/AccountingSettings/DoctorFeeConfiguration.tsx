import { useEffect, useMemo, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";


/********************************************
    Name : Manish Kumar
    Date : 30/06/2026
    Purpose : Doctor Fee Configuration
*********************************************/
interface DoctorFeeTableData {
    id: string;
    doctorName: string;
    feeType: string;
    feeValue: string;
    appliedOn: string;
    allowOverride: string;
    status: "Active" | "Inactive";
}

export default function DoctorFeeConfiguration() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showDoctorFeeModal, setShowDoctorFeeModal] =
        useState(false);

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
            id: "inactive",
            name: "Inactive",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Dummy Table Data
    *********************************************/
    const ALL_DOCTOR_FEE_DATA: DoctorFeeTableData[] = [
        {
            id: "DF001",
            doctorName: "Irfan Khan Ahmed",
            feeType: "Fixed Amount",
            feeValue: "500",
            appliedOn: "Consultation",
            allowOverride: "Yes",
            status: "Active",
        },
        {
            id: "DF002",
            doctorName: "Naheer Husain Khan",
            feeType: "Percentage",
            feeValue: "15",
            appliedOn: "Doctor/Surgeon Fee",
            allowOverride: "No",
            status: "Active",
        },
        {
            id: "DF003",
            doctorName: "Nasim Ali Khan",
            feeType: "Fixed Amount",
            feeValue: "700",
            appliedOn: "Lab",
            allowOverride: "Yes",
            status: "Inactive",
        },
        {
            id: "DF004",
            doctorName: "Sakib Malik Khan",
            feeType: "Percentage",
            feeValue: "10",
            appliedOn: "Surgery",
            allowOverride: "No",
            status: "Active",
        },
        {
            id: "DF005",
            doctorName: "Sakin",
            feeType: "Fixed Amount",
            feeValue: "800",
            appliedOn: "Consultation",
            allowOverride: "Yes",
            status: "Inactive",
        },
        {
            id: "DF006",
            doctorName: "Syed Hassan Ali Shah",
            feeType: "Percentage",
            feeValue: "18",
            appliedOn: "Doctor/Surgeon Fee",
            allowOverride: "No",
            status: "Active",
        },
        {
            id: "DF007",
            doctorName: "Zaheer Khan Pathan",
            feeType: "Fixed Amount",
            feeValue: "900",
            appliedOn: "Lab",
            allowOverride: "Yes",
            status: "Active",
        },
        {
            id: "DF008",
            doctorName: "Zainab Al-Hashimi",
            feeType: "Percentage",
            feeValue: "12",
            appliedOn: "Surgery",
            allowOverride: "No",
            status: "Inactive",
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
    const filteredDoctorFees = useMemo(() => {

        return ALL_DOCTOR_FEE_DATA.filter((doctor) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                doctor.doctorName.toLowerCase().includes(searchValue) ||
                doctor.feeType.toLowerCase().includes(searchValue) ||
                doctor.appliedOn.toLowerCase().includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                doctor.status.toLowerCase() ===
                selectedStatus.name.toLowerCase();

            return (
                matchesSearch &&
                matchesStatus
            );

        });

    }, [
        globalSearch,
        selectedStatus,
    ]);

    const totalPages = Math.ceil(
        filteredDoctorFees.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredDoctorFees.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredDoctorFees,
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
    const columns: ColumnActionRow<DoctorFeeTableData>[] = [

        {
            key: "doctorName",
            header: <>Doctor Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "feeType",
            header: <>Fee Type</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "feeValue",
            header: <>Fee Value</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "appliedOn",
            header: <>Applied On</>,
            className: "text-center",
        },

        {
            key: "allowOverride",
            header: <>Allow Override</>,
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
        setSelectedStatus(null);
        setCurrentPage(1);

    };

    return (
        <>

            <div className="d-flex justify-content-between align-items-center gap-4 my-4">

                <p className="fs-18 fw-500">
                    Doctor Fee List
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        setShowDoctorFeeModal(true)
                    }
                >

                    <div className="text-white fs-14 fw-400">
                        Add Doctor Fee
                    </div>

                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />

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

                    <button className="aph-search-btn outline-0">
                        <i className="ri-search-line"></i>
                    </button>

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

            <DoctorFeeConfigurationModal
                show={showDoctorFeeModal}
                handleClose={() =>
                    setShowDoctorFeeModal(false)
                }
            />

        </>
    );

}


import { Modal } from "react-bootstrap";

import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

interface DoctorFeeConfigurationModalProps {
    show: boolean;
    handleClose: () => void;
}

interface DoctorFeeFormData {
    feeValue: string;
    notes: string;
}

function DoctorFeeConfigurationModal({
    show,
    handleClose,
}: DoctorFeeConfigurationModalProps) {

    const [formData, setFormData] =
        useState<DoctorFeeFormData>({
            feeValue: "",
            notes: "",
        });

    const [selectedDoctor, setSelectedDoctor] =
        useState<DropdownOption | null>(null);

    const [selectedFeeType, setSelectedFeeType] =
        useState<DropdownOption | null>(null);

    const [selectedAppliedOn, setSelectedAppliedOn] =
        useState<DropdownOption | null>(null);

    const [selectedAllowEdit, setSelectedAllowEdit] =
        useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Doctor Options
    *********************************************/
    const DOCTOR_OPTIONS: DropdownOption[] = [
        {
            id: "1",
            name: "Irfan Khan Ahmed",
        },
        {
            id: "2",
            name: "Naheer Husain Khan",
        },
        {
            id: "3",
            name: "Nasim Ali Khan",
        },
        {
            id: "4",
            name: "Sakib Malik Khan",
        },
        {
            id: "5",
            name: "Sakin",
        },
        {
            id: "6",
            name: "Syed Hassan Ali Shah",
        },
        {
            id: "7",
            name: "Zaheer Khan Pathan",
        },
        {
            id: "8",
            name: "Zainab Al-Hashimi",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Fee Type Options
    *********************************************/
    const FEE_TYPE_OPTIONS: DropdownOption[] = [
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
        Purpose : Applied On Options
    *********************************************/
    const APPLIED_ON_OPTIONS: DropdownOption[] = [
        {
            id: "consultation",
            name: "Consultation",
        },
        {
            id: "doctorFee",
            name: "Doctor/Surgeon Fee",
        },
        {
            id: "lab",
            name: "Lab",
        },
        {
            id: "surgery",
            name: "Surgery",
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
            feeValue: "",
            notes: "",
        });

        setSelectedDoctor(null);
        setSelectedFeeType(null);
        setSelectedAppliedOn(null);
        setSelectedAllowEdit(null);

    };

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Save Configuration
    *********************************************/
    const handleSave = () => {

        const payload = {
            doctor: selectedDoctor,
            feeType: selectedFeeType,
            feeValue: formData.feeValue,
            appliedOn: selectedAppliedOn,
            allowEditInInvoice: selectedAllowEdit,
            notes: formData.notes,
        };

        console.log(
            "Doctor Fee Configuration :",
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
                    Add Doctor Fee
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Doctor Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={DOCTOR_OPTIONS}
                                value={selectedDoctor}
                                onChange={setSelectedDoctor}
                                placeholder="Select Doctor"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Fee Type{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={FEE_TYPE_OPTIONS}
                                value={selectedFeeType}
                                onChange={setSelectedFeeType}
                                placeholder="Select Fee Type"
                            />

                        </div>

                    </div>

                    {/* ROW 2 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Fee Value{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="feeValue"
                                    className="customInput"
                                    placeholder="Enter Fee Value"
                                    value={formData.feeValue}
                                    onChange={handleChange}
                                />

                                <i className="ri-money-dollar-circle-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Applied On{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={APPLIED_ON_OPTIONS}
                                value={selectedAppliedOn}
                                onChange={setSelectedAppliedOn}
                                placeholder="Select Applied On"
                            />

                        </div>

                    </div>

                    {/* ROW 3 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Allow Edit In Invoice{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={ALLOW_EDIT_OPTIONS}
                                value={selectedAllowEdit}
                                onChange={setSelectedAllowEdit}
                                placeholder="Select Option"
                            />

                        </div>

                        <div className="formGroup">

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