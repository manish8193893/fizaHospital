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
    Purpose : Work Shift Grid
*********************************************/
interface WorkShiftTableData {
    id: string;
    shiftName: string;
    startTime: string;
    endTime: string;
    description: string;
    status: "Active" | "Not Active";
}

export default function WorkShift() {

    const [globalSearch, setGlobalSearch] = useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showWorkShiftModal, setShowWorkShiftModal] =
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
    const ALL_WORK_SHIFT_DATA: WorkShiftTableData[] = [

        {
            id: "WS001",
            shiftName: "Morning Shift",
            startTime: "07:00 AM",
            endTime: "03:00 PM",
            description: "Regular morning hospital operations shift.",
            status: "Active",
        },

        {
            id: "WS002",
            shiftName: "Afternoon Shift",
            startTime: "03:00 PM",
            endTime: "11:00 PM",
            description: "Evening patient care and operational shift.",
            status: "Active",
        },

        {
            id: "WS003",
            shiftName: "Night Shift",
            startTime: "11:00 PM",
            endTime: "07:00 AM",
            description: "Night emergency and inpatient support shift.",
            status: "Active",
        },

        {
            id: "WS004",
            shiftName: "24x7 Shift",
            startTime: "12:00 AM",
            endTime: "11:59 PM",
            description: "Round-the-clock service coverage.",
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
        Purpose : Truncate Text
    *********************************************/
    const truncateText = (
        text: string,
        maxLength: number
    ) => {

        if (text.length <= maxLength) {
            return text;
        }

        return `${text.substring(0, maxLength)}...`;

    };

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Filtered Work Shift
    *********************************************/
    const filteredWorkShift = useMemo(() => {

        return ALL_WORK_SHIFT_DATA.filter(
            (shift) => {

                const searchValue =
                    globalSearch.toLowerCase();

                const matchesSearch =
                    shift.id.toLowerCase().includes(searchValue) ||
                    shift.shiftName.toLowerCase().includes(searchValue) ||
                    shift.startTime.toLowerCase().includes(searchValue) ||
                    shift.endTime.toLowerCase().includes(searchValue) ||
                    shift.description.toLowerCase().includes(searchValue);

                const matchesStatus =
                    !selectedStatus ||
                    shift.status.toLowerCase() ===
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
        filteredWorkShift.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredWorkShift.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredWorkShift,
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
    const columns: ColumnActionRow<WorkShiftTableData>[] = [

        {
            key: "id",
            header: <>ID</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "shiftName",
            header: <>Shift Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "startTime",
            header: <>Start Time</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "endTime",
            header: <>End Time</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "description",
            header: <>Description</>,
            className: "text-center",

            render: (row) => (
                <div
                    title={row.description}
                    className="text-truncate mx-auto"
                    style={{
                        maxWidth: "250px",
                        cursor: "pointer",
                    }}
                >
                    {truncateText(
                        row.description,
                        35
                    )}
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
                                "View Details:",
                                row.id
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
                                row.id
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
                                row.id
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
            {/* Work Shift Heading and Button */}
            <div
                className="d-flex justify-content-between align-items-center gap-4 mt-4 mb-4"
                style={{ maxHeight: "45px" }}
            >
                <p className="fs-18 fw-500">
                    Work Shift
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        setShowWorkShiftModal(true)
                    }
                >
                    <div className="text-white fs-14 fw-400">
                        New Work Shift
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

                            setItemsPerPage(
                                rows
                            );

                            setCurrentPage(1);

                        }}
                    />

                </div>

            </div>

            <WorkShiftModal
                show={showWorkShiftModal}
                handleClose={() =>
                    setShowWorkShiftModal(false)
                }
            />

        </>
    );
}

import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

interface WorkShiftModalProps {
    show: boolean;
    handleClose: () => void;
}

export function WorkShiftModal({
    show,
    handleClose,
}: WorkShiftModalProps) {

    /********************************************
       FORM STATE
    *********************************************/
    const [shiftName, setShiftName] =
        useState("");

    const [startTime, setStartTime] =
        useState("");

    const [endTime, setEndTime] =
        useState("");

    const [description, setDescription] =
        useState("");

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
            shiftName,
            startTime,
            endTime,
            status: selectedStatus,
            description,
        };

        console.log(
            "Work Shift Data :",
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
                        New Work Shift
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="p-0">

                    <form>

                        {/* ROW 1 */}

                        <div className="formRow d-flex">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Shift Name{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Shift Name"
                                        value={shiftName}
                                        onChange={(e) =>
                                            setShiftName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-time-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Start Time{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="time"
                                        className="customInput customTimeInput"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(e.target.value)
                                        }
                                        onClick={(e) => {
                                            const input =
                                                e.currentTarget as HTMLInputElement;

                                            if (input.showPicker) {
                                                input.showPicker();
                                            }
                                        }}
                                    />

                                    <i className="ri-time-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    End Time{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="time"
                                        className="customInput customTimeInput"
                                        value={endTime}
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                        onClick={(e) => {
                                            const input =
                                                e.currentTarget as HTMLInputElement;

                                            if (input.showPicker) {
                                                input.showPicker();
                                            }
                                        }}
                                    />

                                    <i className="ri-time-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* ROW 2 */}

                        <div className="formRow">

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

                            <div className="formGroup">

                                <label className="customLabel">
                                    Description{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        className="customInput"
                                        placeholder="Enter Description"
                                        type="text"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-file-text-line"></i>

                                </div>

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