import { useEffect, useMemo, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, {type ColumnActionRow,} from "../../../GlobalHelpers/GlobalGridTable";




import "../../../styles/HumanResource.css";

/********************************************
    Name : Manish Kumar
    Date : 15/06/2026
    Purpose : Floor Settings Grid
*********************************************/
interface FloorSettingsTableData {
    floorNumber: string;
    floorName: string;
    color: string;
    status: "Active" | "Not Active";
}

export default function FloorSettings() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showFloorSettingsModal, setShowFloorSettingsModal] =
        useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        {
            id: "active",
            name: "Active",
        },
        {
            id: "not_active",
            name: "Not Active",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_FLOOR_SETTINGS_DATA: FloorSettingsTableData[] = [

        {
            floorNumber: "Ground Floor",
            floorName: "Reception",
            color: "#4F8BE0",
            status: "Active",
        },

        {
            floorNumber: "First Floor",
            floorName: "Emergency Room",
            color: "#F396CC",
            status: "Active",
        },

        {
            floorNumber: "Second Floor",
            floorName: "ICU",
            color: "#8FE04D",
            status: "Active",
        },

        {
            floorNumber: "Third Floor",
            floorName: "Operation Theatre",
            color: "#FF8A65",
            status: "Not Active",
        },

        {
            floorNumber: "Fourth Floor",
            floorName: "Administration",
            color: "#9C6ADE",
            status: "Active",
        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Filtered Floor Settings
    *********************************************/
    const filteredFloorSettings =
        useMemo(() => {

            return ALL_FLOOR_SETTINGS_DATA.filter(
                (floor) => {

                    const searchValue =
                        globalSearch.toLowerCase();

                    const matchesSearch =
                        floor.floorNumber
                            .toLowerCase()
                            .includes(searchValue) ||

                        floor.floorName
                            .toLowerCase()
                            .includes(searchValue) ||

                        floor.color
                            .toLowerCase()
                            .includes(searchValue);

                    const matchesStatus =
                        !selectedStatus ||
                        floor.status.toLowerCase() ===
                        selectedStatus.name.toLowerCase();

                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );

        }, [
            globalSearch,
            selectedStatus,
        ]);

    const totalPages = Math.ceil(
        filteredFloorSettings.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredFloorSettings.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredFloorSettings,
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
    Name : Manish Kumar
    Date : 15/06/2026
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
        Date : 15/06/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<FloorSettingsTableData>[] = [

        {
            key: "floorNumber",
            header: <>Floor Number</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "floorName",
            header: <>Floor Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "color",
            header: <>Color</>,
            className: "text-center",

            render: (row) => (
                <div className="d-flex align-items-center justify-content-center gap-2">

                    <span
                        style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            backgroundColor: row.color,
                            display: "inline-block",
                        }}
                    />

                    <span>
                        {row.color}
                    </span>

                </div>
            ),
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",

            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Active"
                            ? "status-completed"
                            : "status-cancelled"
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
                        data-bs-placement="top"
                        data-bs-title="View"
                        onClick={() =>
                            console.log(
                                "View:",
                                row.floorNumber
                            )
                        }
                    >
                        <i className="fs-18 ri-eye-line"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Edit"
                        onClick={() =>
                            console.log(
                                "Edit:",
                                row.floorNumber
                            )
                        }
                    >
                        <i className="fs-18 ri-pencil-ai-line"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Delete"
                        onClick={() =>
                            console.log(
                                "Delete:",
                                row.floorNumber
                            )
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
        Date : 15/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedStatus(null);
        setCurrentPage(1);

    };

    return (
        <>
            {/* Floor Settings Heading and Button */}

            <div
                className="d-flex justify-content-between align-items-center gap-4 mt-4 mb-4"
                style={{ maxHeight: "45px" }}
            >
                <p className="fs-18 fw-500">
                    Floor Settings
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        setShowFloorSettingsModal(true)
                    }
                >
                    <div className="text-white fs-14 fw-400">
                        New Floor
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

                            setSelectedStatus(
                                selected
                            );

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

                <div>

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

            </div>

            <FloorSettingsModal
                show={showFloorSettingsModal}
                handleClose={() =>
                    setShowFloorSettingsModal(false)
                }
            />

        </>
    );
}

import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

interface FloorSettingsModalProps {
    show: boolean;
    handleClose: () => void;
}

export function FloorSettingsModal({
    show,
    handleClose,
}: FloorSettingsModalProps) {

    /********************************************
       FORM STATE
    *********************************************/
    const [floorNumber, setFloorNumber] =
        useState("");

    const [floorName, setFloorName] =
        useState("");

    const [selectedColor, setSelectedColor] =
        useState("#3E64AB");

    /********************************************
        STATUS DROPDOWN
    *********************************************/
    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const STATUS_OPTIONS: DropdownOption[] = [
        {
            id: "active",
            name: "Active",
        },
        {
            id: "not_active",
            name: "Not Active",
        },
    ];

    /********************************************
        HANDLE ADD
    *********************************************/
    const handleAdd = () => {

        const payload = {
            floorNumber,
            floorName,
            color: selectedColor,
            status: selectedStatus,
        };

        console.log(
            "Floor Data :",
            payload
        );

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
                        New Floor
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="p-0">

                    <form>

                        {/* ROW 1 */}

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Floor Number{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Floor Number"
                                        value={floorNumber}
                                        onChange={(e) =>
                                            setFloorNumber(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-building-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Floor Name{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Floor Name"
                                        value={floorName}
                                        onChange={(e) =>
                                            setFloorName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-hospital-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* ROW 2 */}

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Color <span className="text-danger">*</span>
                                </label>

                                <div className="d-flex align-items-center gap-3 border rounded-3 px-1">

                                    <div className="inputWrapper colorPickerWrapper grow">

                                        <input
                                            type="color"
                                            className="customColorPicker"
                                            value={selectedColor}
                                            onChange={(e) =>
                                                setSelectedColor(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="d-flex align-items-center gap-2">

                                        <span
                                            style={{
                                                width: "14px",
                                                height: "14px",
                                                borderRadius: "50%",
                                                backgroundColor: selectedColor,
                                                display: "inline-block",
                                            }}
                                        />

                                        <span>
                                            {selectedColor.toUpperCase()}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Status{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <CustomFormDropdown
                                    options={
                                        STATUS_OPTIONS
                                    }
                                    value={
                                        selectedStatus
                                    }
                                    onChange={(value) =>
                                        setSelectedStatus(
                                            value
                                        )
                                    }
                                    placeholder="Select Status"
                                />

                            </div>

                        </div>

                        {/* BUTTONS */}

                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleAdd}
                            >
                                Add
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
    );
}