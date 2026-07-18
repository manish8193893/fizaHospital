import { useEffect, useMemo, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";




import "../../../styles/HumanResource.css";

/********************************************
    Name : Manish Kumar
    Date : 23/06/2026
    Purpose : Room Management Grid
*********************************************/
interface RoomTableData {
    id: string;
    roomType: string;
    pricePerDay: string;
    notes: string;
    status: "Active" | "Inactive";
}

export default function RoomManagement() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showRoomModal, setShowRoomModal] =
        useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
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
        Date : 23/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_ROOM_DATA: RoomTableData[] = [
        {
            id: "RM001",
            roomType: "VIP",
            pricePerDay: "2500",
            notes: "VIP Suite Room",
            status: "Active",
        },
        {
            id: "RM002",
            roomType: "Delux",
            pricePerDay: "1800",
            notes: "Delux Room",
            status: "Active",
        },
        {
            id: "RM003",
            roomType: "Super Delux",
            pricePerDay: "2200",
            notes: "Premium Room",
            status: "Inactive",
        },
        {
            id: "RM004",
            roomType: "VVIP",
            pricePerDay: "3500",
            notes: "Executive Room",
            status: "Active",
        },
        {
            id: "RM005",
            roomType: "VIP",
            pricePerDay: "2700",
            notes: "Special VIP Room",
            status: "Inactive",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(5);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredRooms = useMemo(() => {

        return ALL_ROOM_DATA.filter((room) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                room.id.toLowerCase().includes(searchValue) ||
                room.roomType.toLowerCase().includes(searchValue) ||
                room.notes.toLowerCase().includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                room.status.toLowerCase() ===
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
        filteredRooms.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredRooms.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredRooms,
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
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
        Date : 23/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns: ColumnActionRow<RoomTableData>[] = [

        {
            key: "roomType",
            header: <>Room Type</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "pricePerDay",
            header: <>Price Per Day</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "notes",
            header: <>Notes</>,
            className: "text-center",
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",

            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`${row.status === "Active"
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
            width: "180px",

            render: (row) => (

                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-title="View Details"
                        onClick={()=>console.log(row.id)}
                    >
                        <i className="fs-18 ri-eye-line"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-title="Edit Details"
                    >
                        <i className="fs-18 ri-pencil-ai-line"></i>
                    </button>

                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-title="Open Room"
                    >
                        <i className="fs-18 ri-door-open-line"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-title="Close Room"
                    >
                        <i className="fs-18 ri-door-closed-line"></i>
                    </button>

                </div>

            ),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
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
                    Room Management
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        setShowRoomModal(true)
                    }
                >
                    <div className="text-white fs-14 fw-400">
                        New Room
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

            <RoomManagementModal
                show={showRoomModal}
                handleClose={() =>
                    setShowRoomModal(false)
                }
            />

        </>
    );
}


import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

interface RoomManagementModalProps {
    show: boolean;
    handleClose: () => void;
}

export function RoomManagementModal({
    show,
    handleClose,
}: RoomManagementModalProps) {

    const [roomName, setRoomName] =
        useState("");

    const [roomCode, setRoomCode] =
        useState("");

    const [numberOfBeds, setNumberOfBeds] =
        useState("");

    const [roomPrice, setRoomPrice] =
        useState("");

    const [notes, setNotes] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Status Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
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
        Date : 23/06/2026
        Purpose : Generate Room Code
    *********************************************/
    const generateRoomCode = () => {

        const randomNumber =
            Math.floor(
                1000 +
                Math.random() * 9000
            );

        return `RM${randomNumber}`;

    };

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Generate Code On Modal Open
    *********************************************/
    useEffect(() => {

        if (show) {

            setRoomCode(
                generateRoomCode()
            );

        }

    }, [show]);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Reset Form
    *********************************************/
    const resetForm = () => {

        setRoomName("");
        setNumberOfBeds("");
        setRoomPrice("");
        setNotes("");

        setSelectedStatus(null);

        setRoomCode(
            generateRoomCode()
        );

    };

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Save Room
    *********************************************/
    const handleSave = () => {

        const payload = {
            roomName,
            roomCode,
            numberOfBeds,
            roomPrice,
            status: selectedStatus,
            notes,
        };

        console.log(
            "Room Data :",
            payload
        );

        resetForm();

        handleClose();

    };

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Close Modal
    *********************************************/
    const handleModalClose = () => {

        resetForm();

        handleClose();

    };

    return (
        <>
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
                        New Room
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="p-0">

                    <form>

                        {/* ROW 1 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Room Name{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Room Name"
                                        value={roomName}
                                        onChange={(e) =>
                                            setRoomName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-hotel-bed-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Room Code{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        disabled
                                        className="customInput"
                                        placeholder="Room Code"
                                        value={roomCode}
                                    />

                                    <i className="ri-barcode-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* ROW 2 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Number Of Beds{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="number"
                                        className="customInput"
                                        placeholder="Enter Number Of Beds"
                                        value={numberOfBeds}
                                        onChange={(e) =>
                                            setNumberOfBeds(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-hotel-bed-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Room Price{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="number"
                                        className="customInput"
                                        placeholder="Enter Room Price"
                                        value={roomPrice}
                                        onChange={(e) =>
                                            setRoomPrice(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-money-dollar-circle-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* ROW 3 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Status{" "}
                                    <span className="text-danger">*</span>
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

                            <div className="formGroup">

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
        </>
    );
}