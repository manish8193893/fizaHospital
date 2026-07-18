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
    Purpose : Rents & Leases
*********************************************/
interface RentLeaseTableData {
    id: string;
    tenant: string;
    type: string;
    department: string;
    amount: string;
    cycle: string;
    startDate: string;
    endDate: string;
    status: "Active" | "Inactive";
}

export default function RentsAndLeases() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedCycle, setSelectedCycle] =
        useState<DropdownOption | null>(null);

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showModal, setShowModal] =
        useState(false);

    /********************************************
        Cycle Options
    *********************************************/
    const cycleOptions: DropdownOption[] = [
        { id: "monthly", name: "Monthly" },
        { id: "yearly", name: "Yearly" },
        { id: "quarterly", name: "Quarterly" },
        { id: "half", name: "Half Yearly" },
    ];

    /********************************************
        Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "active", name: "Active" },
        { id: "inactive", name: "Inactive" },
    ];

    /********************************************
        Dummy Data (5 Rows)
    *********************************************/
    const ALL_DATA: RentLeaseTableData[] = [
        {
            id: "RL001",
            tenant: "City Medical Store",
            type: "Shop Rent",
            department: "Pharmacy",
            amount: "25000",
            cycle: "Monthly",
            startDate: "01/01/2026",
            endDate: "31/12/2026",
            status: "Active",
        },
        {
            id: "RL002",
            tenant: "Radiology Equipment Lease",
            type: "Equipment",
            department: "Radiology",
            amount: "75000",
            cycle: "Yearly",
            startDate: "01/06/2025",
            endDate: "01/06/2026",
            status: "Active",
        },
        {
            id: "RL003",
            tenant: "Canteen Vendor",
            type: "Food Service",
            department: "Administration",
            amount: "15000",
            cycle: "Monthly",
            startDate: "01/02/2026",
            endDate: "01/02/2027",
            status: "Inactive",
        },
        {
            id: "RL004",
            tenant: "Lab Equipment Lease",
            type: "Equipment",
            department: "Laboratory",
            amount: "50000",
            cycle: "Quarterly",
            startDate: "10/03/2026",
            endDate: "10/03/2027",
            status: "Active",
        },
        {
            id: "RL005",
            tenant: "Parking Area Lease",
            type: "Facility",
            department: "Hospital Management",
            amount: "100000",
            cycle: "Yearly",
            startDate: "01/01/2026",
            endDate: "01/01/2027",
            status: "Active",
        },
    ];

    /********************************************
        Pagination
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(5);

    /********************************************
        Filter Data
    *********************************************/
    const filteredData = useMemo(() => {

        return ALL_DATA.filter((item) => {

            const search = globalSearch.toLowerCase();

            const matchesSearch =
                item.tenant.toLowerCase().includes(search) ||
                item.type.toLowerCase().includes(search) ||
                item.department.toLowerCase().includes(search);

            const matchesCycle =
                !selectedCycle ||
                item.cycle.toLowerCase() === selectedCycle.name.toLowerCase();

            const matchesStatus =
                !selectedStatus ||
                item.status.toLowerCase() === selectedStatus.name.toLowerCase();

            return matchesSearch && matchesCycle && matchesStatus;
        });

    }, [globalSearch, selectedCycle, selectedStatus]);

    const totalPages = Math.ceil(
        filteredData.length / itemsPerPage
    );

    const visibleData = useMemo(() => {

        const start =
            (currentPage - 1) * itemsPerPage;

        const end =
            start + itemsPerPage;

        return filteredData.slice(start, end);

    }, [filteredData, currentPage, itemsPerPage]);

    /********************************************
    Bootstrap Tooltips
*********************************************/
    useEffect(() => {

        const tooltipElements =
            document.querySelectorAll('[data-bs-toggle="tooltip"]');

        tooltipElements.forEach((el) => {
            new bootstrap.Tooltip(el);
        });

        return () => {

            tooltipElements.forEach((el) => {
                const tooltip =
                    bootstrap.Tooltip.getInstance(el);

                if (tooltip) tooltip.dispose();
            });

        };

    }, [visibleData]);

    /********************************************
        Table Columns
    *********************************************/
    const columns: ColumnActionRow<RentLeaseTableData>[] = [

        {
            key: "tenant",
            header: <>Tenant</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "type",
            header: <>Type</>,
            className: "text-center",
        },

        {
            key: "department",
            header: <>Department</>,
            className: "text-center",
        },

        {
            key: "amount",
            header: <>Amount</>,
            className: "text-center",
            render: (row) => (
                <div className="text-center">
                    ₹ {row.amount}
                </div>
            ),
        },

        {
            key: "cycle",
            header: <>Cycle</>,
            className: "text-center",
        },

        {
            key: "startDate",
            header: <>Start Date</>,
            className: "text-center",
        },

        {
            key: "endDate",
            header: <>End Date</>,
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
            width: "180px",
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
        Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedCycle(null);
        setSelectedStatus(null);
        setCurrentPage(1);

    };


    return (
        <>

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">

                <p className="fs-18 fw-500">
                    Rents & Leases
                </p>

                <div
                    className="Plus-btn"
                    onClick={() => setShowModal(true)}
                >
                    <div className="text-white fs-14 fw-400">
                        New Lease
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
                        options={cycleOptions}
                        value={selectedCycle}
                        placeholder="Cycle"
                        customClass="aph-filter-dropdown"
                        onChange={(val) => {
                            setSelectedCycle(val);
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
                    data={visibleData}
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
            <RentsAndLeasesModal
                show={showModal}
                handleClose={() => setShowModal(false)}
            />

        </>
    );
}


import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";

interface RentsAndLeasesModalProps {
    show: boolean;
    handleClose: () => void;
}

interface FormState {
    tenantName: string;
    contactName: string;
    rentValue: string;
    description: string;
}

function RentsAndLeasesModal({
    show,
    handleClose,
}: RentsAndLeasesModalProps) {

    const [formData, setFormData] = useState<FormState>({
        tenantName: "",
        contactName: "",
        rentValue: "",
        description: "",
    });

    const [selectedTenantType, setSelectedTenantType] =
        useState<DropdownOption | null>(null);

    const [selectedDepartment, setSelectedDepartment] =
        useState<DropdownOption | null>(null);

    const [selectedCycle, setSelectedCycle] =
        useState<DropdownOption | null>(null);

    const [selectedStartDate, setSelectedStartDate] =
        useState<Date | null>(null);

    const [selectedEndDate, setSelectedEndDate] =
        useState<Date | null>(null);

    const [showStartCalendar, setShowStartCalendar] =
        useState(false);

    const [showEndCalendar, setShowEndCalendar] =
        useState(false);

    const [file, setFile] = useState<File | null>(null);

    /********************************************
        Dropdown Options
    *********************************************/
    const tenantTypeOptions: DropdownOption[] = [
        { id: "shop", name: "Shop" },
        { id: "equipment", name: "Equipment" },
        { id: "service", name: "Service" },
    ];

    const departmentOptions: DropdownOption[] = [
        { id: "pharmacy", name: "Pharmacy" },
        { id: "radiology", name: "Radiology" },
        { id: "admin", name: "Administration" },
        { id: "lab", name: "Laboratory" },
    ];

    const cycleOptions: DropdownOption[] = [
        { id: "monthly", name: "Monthly" },
        { id: "yearly", name: "Yearly" },
        { id: "quarterly", name: "Quarterly" },
        { id: "half", name: "Half Yearly" },
    ];

    /********************************************
        Handle Change
    *********************************************/
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            tenantName: "",
            contactName: "",
            rentValue: "",
            description: "",
        });

        setSelectedTenantType(null);
        setSelectedDepartment(null);
        setSelectedCycle(null);

        setSelectedStartDate(null);
        setSelectedEndDate(null);

        setFile(null);
    };

    /********************************************
        Save
    *********************************************/
    const handleSave = () => {

        const payload = {
            ...formData,
            tenantType: selectedTenantType,
            department: selectedDepartment,
            cycle: selectedCycle,
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            attachment: file?.name || null,
        };

        console.log("Rent & Lease Payload:", payload);

        resetForm();
        handleClose();
    };

    /********************************************
        Close
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
                    New Rent / Lease
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Tenant Name <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="tenantName"
                                    className="customInput"
                                    value={formData.tenantName}
                                    onChange={handleChange}
                                    placeholder="Enter Tenant Name"
                                />
                                <i className="ri-user-line"></i>
                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Tenant Type <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={tenantTypeOptions}
                                value={selectedTenantType}
                                onChange={setSelectedTenantType}
                                placeholder="Select Type"
                            />

                        </div>

                    </div>

                    {/* ROW 2 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Department <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={departmentOptions}
                                value={selectedDepartment}
                                onChange={setSelectedDepartment}
                                placeholder="Select Department"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Contact Name
                            </label>

                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="contactName"
                                    className="customInput"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    placeholder="Enter Contact Name"
                                />
                                <i className="ri-phone-line"></i>
                            </div>

                        </div>

                    </div>

                    {/* ROW 3 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Rent Value <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">
                                <input
                                    type="number"
                                    name="rentValue"
                                    className="customInput"
                                    value={formData.rentValue}
                                    onChange={handleChange}
                                    placeholder="Enter Rent Value"
                                />
                                <i className="ri-money-dollar-circle-line"></i>
                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Billing Cycle <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={cycleOptions}
                                value={selectedCycle}
                                onChange={setSelectedCycle}
                                placeholder="Select Cycle"
                            />

                        </div>

                    </div>

                    {/* ROW 4 */}
                    <div className="formRow">

                        {/* START DATE */}
                        <div className="formGroup">

                            <label className="customLabel">
                                Start Date <span className="text-danger">*</span>
                            </label>

                            <div style={{ position: "relative" }}>

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowStartCalendar(!showStartCalendar)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {selectedStartDate
                                        ? `${String(selectedStartDate.getDate()).padStart(2, "0")}/${String(
                                            selectedStartDate.getMonth() + 1
                                        ).padStart(2, "0")}/${selectedStartDate.getFullYear()}`
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
                                    }}
                                />

                                {showStartCalendar && (
                                    <div style={{ position: "absolute", zIndex: 1000 }}>
                                        <DateFilterCalendar
                                            selectedDate={selectedStartDate}
                                            onDateSelect={(date) => {
                                                setSelectedStartDate(date);
                                                setShowStartCalendar(false);
                                            }}
                                        />
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* END DATE */}
                        <div className="formGroup">

                            <label className="customLabel">
                                End Date <span className="text-danger">*</span>
                            </label>

                            <div style={{ position: "relative" }}>

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowEndCalendar(!showEndCalendar)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {selectedEndDate
                                        ? `${String(selectedEndDate.getDate()).padStart(2, "0")}/${String(
                                            selectedEndDate.getMonth() + 1
                                        ).padStart(2, "0")}/${selectedEndDate.getFullYear()}`
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
                                    }}
                                />

                                {showEndCalendar && (
                                    <div style={{ position: "absolute", zIndex: 1000 }}>
                                        <DateFilterCalendar
                                            selectedDate={selectedEndDate}
                                            onDateSelect={(date) => {
                                                setSelectedEndDate(date);
                                                setShowEndCalendar(false);
                                            }}
                                        />
                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* ROW 5 - FILE + DESCRIPTION */}
                    <div className="formRow">

                        {/* FILE UPLOAD */}
                        <div className="formGroup">

                            <label className="customLabel">
                                Attachment
                            </label>

                            <div
                                className="customInput d-flex align-items-center justify-content-between"
                                onClick={() =>
                                    document.getElementById("leaseFile")?.click()
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <span>
                                    {file ? file.name : "Choose File"}
                                </span>

                                <i className="ri-upload-2-line"></i>
                            </div>

                            <input
                                id="leaseFile"
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setFile(e.target.files[0]);
                                    }
                                }}
                            />

                        </div>

                        {/* DESCRIPTION */}
                        <div className="formGroup">

                            <label className="customLabel">
                                Description
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="description"
                                    className="customInput"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter Description"
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