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
    Purpose : Device & Medical Assets
*********************************************/
interface DeviceAssetTableData {
    id: string;
    deviceName: string;
    deviceCategory: string;
    owner: string;
    usageFee: string;
    revenueCategory: string;
    status: "Active" | "Inactive";
}

export default function DeviceAndMedicalAssets() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showAssetModal, setShowAssetModal] =
        useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "active", name: "Active" },
        { id: "inactive", name: "Inactive" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Device Category Options
    *********************************************/
    const deviceCategoryOptions: DropdownOption[] = [
        { id: "imaging", name: "Imaging Device" },
        { id: "other", name: "Other" },
        { id: "surgical", name: "Surgical Device" },
        { id: "diagnostic", name: "Diagnostic Device" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Owner Options
    *********************************************/
    const ownerOptions: DropdownOption[] = [
        { id: "admin", name: "Administration" },
        { id: "hospital", name: "Hospital Management" },
        { id: "lab", name: "Laboratory Department" },
        { id: "pharmacy", name: "Pharmacy Department" },
        { id: "radiology", name: "Radiology Department" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_ASSETS: DeviceAssetTableData[] = [
        {
            id: "DA001",
            deviceName: "X-Ray Machine",
            deviceCategory: "Imaging Device",
            owner: "Radiology Department",
            usageFee: "2500",
            revenueCategory: "Hospital",
            status: "Active",
        },
        {
            id: "DA002",
            deviceName: "Ventilator",
            deviceCategory: "Diagnostic Device",
            owner: "Hospital Management",
            usageFee: "1800",
            revenueCategory: "Investor",
            status: "Active",
        },
        {
            id: "DA003",
            deviceName: "Surgical Laser",
            deviceCategory: "Surgical Device",
            owner: "Administration",
            usageFee: "3200",
            revenueCategory: "Hospital",
            status: "Inactive",
        },
        {
            id: "DA004",
            deviceName: "Ultrasound",
            deviceCategory: "Imaging Device",
            owner: "Laboratory Department",
            usageFee: "1500",
            revenueCategory: "Other",
            status: "Active",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Pagination
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(5);

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredAssets = useMemo(() => {

        return ALL_ASSETS.filter((item) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                item.deviceName.toLowerCase().includes(searchValue) ||
                item.deviceCategory.toLowerCase().includes(searchValue) ||
                item.owner.toLowerCase().includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                item.status.toLowerCase() ===
                selectedStatus.name.toLowerCase();

            return matchesSearch && matchesStatus;
        });

    }, [globalSearch, selectedStatus]);

    const totalPages = Math.ceil(
        filteredAssets.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const start =
            (currentPage - 1) * itemsPerPage;

        const end =
            start + itemsPerPage;

        return filteredAssets.slice(start, end);

    }, [filteredAssets, currentPage, itemsPerPage]);

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
                    bootstrap.Tooltip.getInstance(element);

                if (tooltip) tooltip.dispose();

            });

        };

    }, [visibleTableData]);

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns: ColumnActionRow<DeviceAssetTableData>[] = [

        {
            key: "deviceName",
            header: <>Device Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "deviceCategory",
            header: <>Device Category</>,
            className: "text-center",
        },

        {
            key: "owner",
            header: <>Owner</>,
            className: "text-center",
        },

        {
            key: "usageFee",
            header: <>Usage Fee</>,
            className: "text-center",
            render: (row) => (
                <div className="text-center">
                    ₹ {row.usageFee}
                </div>
            ),
        },

        {
            key: "revenueCategory",
            header: <>Revenue Category</>,
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
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-title="View"
                        onClick={() => console.log("View", row.id)}
                    >
                        <i className="fs-18 ri-eye-line"></i>
                    </button>

                    <button
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-title="Edit"
                        onClick={() => console.log("Edit", row.id)}
                    >
                        <i className="fs-18 ri-pencil-ai-line"></i>
                    </button>

                    <button
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-title="Delete"
                        onClick={() => console.log("Delete", row.id)}
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
                    Device & Medical Assets
                </p>

                <div
                    className="Plus-btn"
                    onClick={() => setShowAssetModal(true)}
                >
                    <div className="text-white fs-14 fw-400">
                        Add Devices
                    </div>

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
                        options={statusOptions}
                        value={selectedStatus}
                        placeholder="Status"
                        customClass="aph-filter-dropdown"
                        onChange={(val) => {
                            setSelectedStatus(val);
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
                    onPageChange={setCurrentPage}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows) => {
                        setItemsPerPage(rows);
                        setCurrentPage(1);
                    }}
                />

            </div>

            {/* MODAL */}
            <DeviceAndMedicalAssetsModal
                show={showAssetModal}
                handleClose={() => setShowAssetModal(false)}
                deviceCategoryOptions={deviceCategoryOptions}
                ownerOptions={ownerOptions}
            />

        </>
    );
}


import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";

interface DeviceAndMedicalAssetsModalProps {
    show: boolean;
    handleClose: () => void;

    deviceCategoryOptions: DropdownOption[];
    ownerOptions: DropdownOption[];
}

interface DeviceAssetForm {
    deviceName: string;
    usageFee: string;
    serialNumber: string;
    notes: string;
}

function DeviceAndMedicalAssetsModal({
    show,
    handleClose,
    deviceCategoryOptions,
    ownerOptions,
}: DeviceAndMedicalAssetsModalProps) {

    const [formData, setFormData] =
        useState<DeviceAssetForm>({
            deviceName: "",
            usageFee: "",
            serialNumber: "",
            notes: "",
        });

    const [selectedCategory, setSelectedCategory] =
        useState<DropdownOption | null>(null);

    const [selectedOwner, setSelectedOwner] =
        useState<DropdownOption | null>(null);

    const [selectedRevenue, setSelectedRevenue] =
        useState<DropdownOption | null>(null);

    const [selectedTrackUsage, setSelectedTrackUsage] =
        useState<DropdownOption | null>(null);

    /********************************************
        Date State (Hire/Buying Date)
    *********************************************/
    const [selectedBuyingDate, setSelectedBuyingDate] =
        useState<Date | null>(null);

    const [showBuyingDateCalendar, setShowBuyingDateCalendar] =
        useState(false);

    /********************************************
        Track Usage Options
    *********************************************/
    const TRACK_USAGE_OPTIONS: DropdownOption[] = [
        { id: "yes", name: "Yes" },
        { id: "no", name: "No" },
    ];

    /********************************************
        Handle Input Change
    *********************************************/
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /********************************************
        Reset Form
    *********************************************/
    const resetForm = () => {
        setFormData({
            deviceName: "",
            usageFee: "",
            serialNumber: "",
            notes: "",
        });

        setSelectedCategory(null);
        setSelectedOwner(null);
        setSelectedRevenue(null);
        setSelectedTrackUsage(null);
        setSelectedBuyingDate(null);
    };

    /********************************************
        Save Handler
    *********************************************/
    const handleSave = () => {

        const payload = {
            ...formData,
            deviceCategory: selectedCategory,
            owner: selectedOwner,
            revenueCategory: selectedRevenue,
            trackUsage: selectedTrackUsage,
            buyingDate: selectedBuyingDate,
        };

        console.log("Device Asset Payload:", payload);

        resetForm();
        handleClose();
    };

    /********************************************
        Close Modal
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
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    Add Devices
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Device Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="deviceName"
                                    className="customInput"
                                    placeholder="Enter Device Name"
                                    value={formData.deviceName}
                                    onChange={handleChange}
                                />

                                <i className="ri-device-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Device Category{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={deviceCategoryOptions}
                                value={selectedCategory}
                                onChange={setSelectedCategory}
                                placeholder="Select Category"
                            />

                        </div>

                    </div>

                    {/* ROW 2 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Owner{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={ownerOptions}
                                value={selectedOwner}
                                onChange={setSelectedOwner}
                                placeholder="Select Owner"
                            />

                        </div>

                    </div>

                    {/* ROW 3 - BUYING DATE */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Device Price{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    name="usageFee"
                                    className="customInput"
                                    placeholder="Enter Price"
                                    value={formData.usageFee}
                                    onChange={handleChange}
                                />

                                <i className="ri-money-dollar-circle-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Buying Date{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div style={{ position: "relative" }}>

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowBuyingDateCalendar(
                                            !showBuyingDateCalendar
                                        )
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {selectedBuyingDate
                                        ? `${String(
                                            selectedBuyingDate.getDate()
                                        ).padStart(2, "0")}/${String(
                                            selectedBuyingDate.getMonth() + 1
                                        ).padStart(2, "0")}/${selectedBuyingDate.getFullYear()}`
                                        : "DD/MM/YYYY"}
                                </div>

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

                                {showBuyingDateCalendar && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            zIndex: 1000,
                                            marginTop: "4px",
                                        }}
                                    >
                                        <DateFilterCalendar
                                            selectedDate={selectedBuyingDate}
                                            onDateSelect={(date) => {
                                                setSelectedBuyingDate(date);
                                                setShowBuyingDateCalendar(false);
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
                                Serial Number{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="serialNumber"
                                    className="customInput"
                                    placeholder="Enter Serial Number"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                />

                                <i className="ri-barcode-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Usage Fee{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="number"
                                    className="customInput"
                                    name="usageFee"
                                    placeholder="Enter Usage Fee"
                                    value={formData.usageFee}
                                    onChange={handleChange}
                                />

                                <i className="ri-money-dollar-circle-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 5 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Track Usage{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={TRACK_USAGE_OPTIONS}
                                value={selectedTrackUsage}
                                onChange={setSelectedTrackUsage}
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