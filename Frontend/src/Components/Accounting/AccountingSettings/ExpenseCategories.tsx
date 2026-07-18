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
    Purpose : Expense Categories
*********************************************/
interface ExpenseCategoryTableData {
    id: string;
    categoryName: string;
    description: string;
    status: "Active" | "Inactive";
}

export default function ExpenseCategories() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showModal, setShowModal] =
        useState(false);

    /********************************************
        Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "active", name: "Active" },
        { id: "inactive", name: "Inactive" },
    ];

    /********************************************
        Dummy Data
    *********************************************/
    const ALL_DATA: ExpenseCategoryTableData[] = [
        {
            id: "EC001",
            categoryName: "Staff Salary",
            description: "Monthly salary expenses for all hospital staff",
            status: "Active",
        },
        {
            id: "EC002",
            categoryName: "Electricity Bill",
            description: "Electricity consumption charges for hospital facility",
            status: "Active",
        },
        {
            id: "EC003",
            categoryName: "Water Bill",
            description: "Water supply and usage charges",
            status: "Active",
        },
        {
            id: "EC004",
            categoryName: "Medical Supplies",
            description: "Consumables like gloves, syringes, bandages, etc.",
            status: "Active",
        },
        {
            id: "EC005",
            categoryName: "Equipment Maintenance",
            description: "Repair and maintenance of hospital medical equipment",
            status: "Inactive",
        },
        {
            id: "EC006",
            categoryName: "Housekeeping & Cleaning",
            description: "Cleaning services and housekeeping staff expenses",
            status: "Active",
        },
    ];

    /********************************************
        Pagination State
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Filtered Data
    *********************************************/
    const filteredData = useMemo(() => {

        return ALL_DATA.filter((item) => {

            const search = globalSearch.toLowerCase();

            const matchesSearch =
                item.categoryName.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search);

            const matchesStatus =
                !selectedStatus ||
                item.status.toLowerCase() === selectedStatus.name.toLowerCase();

            return matchesSearch && matchesStatus;
        });

    }, [globalSearch, selectedStatus]);

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
    const columns: ColumnActionRow<ExpenseCategoryTableData>[] = [

        {
            key: "categoryName",
            header: <>Category Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "description",
            header: <>Description</>,
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
            width: "160px",
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
        setSelectedStatus(null);
        setCurrentPage(1);
    };

    return (
        <>

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">

                <p className="fs-18 fw-500">
                    Expense Categories
                </p>

                <div
                    className="Plus-btn"
                    onClick={() => setShowModal(true)}
                >
                    <div className="text-white fs-14 fw-400">
                        New Category
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
            <ExpenseCategoriesModal
                show={showModal}
                handleClose={() => setShowModal(false)}
            />

        </>
    );
}


import { Modal } from "react-bootstrap";

interface ExpenseCategoriesModalProps {
    show: boolean;
    handleClose: () => void;
}

interface FormState {
    categoryName: string;
    description: string;
}

function ExpenseCategoriesModal({
    show,
    handleClose,
}: ExpenseCategoriesModalProps) {

    const [formData, setFormData] = useState<FormState>({
        categoryName: "",
        description: "",
    });

    /********************************************
        Handle Input Change
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
            categoryName: "",
            description: "",
        });
    };

    /********************************************
        Save
    *********************************************/
    const handleSave = () => {

        console.log("Expense Category Payload:", formData);

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
                    New Expense Category
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Category Name{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="categoryName"
                                    className="customInput"
                                    placeholder="Enter Category Name"
                                    value={formData.categoryName}
                                    onChange={handleChange}
                                />

                                <i className="ri-folder-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* ROW 2 */}
                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Description
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="description"
                                    className="customInput"
                                    placeholder="Enter Description"
                                    value={formData.description}
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