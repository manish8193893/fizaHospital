import { useEffect, useMemo, useState, } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import GlobalGridTable, { type ColumnActionRow, } from "../../../GlobalHelpers/GlobalGridTable";




/********************************************
    Name : Manish Kumar
    Date : 25/06/2026
    Purpose : Interface
*********************************************/
interface SurgeryRoomData {
    id: string;
    roomName: string;
    department: string;
    floorNumber: string;
    roomCode: string;
    notes: string;
    status:
    | "Available"
    | "Closed";
}

export default function SettingGridTable() {

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Filter States
    *********************************************/
    const [globalSearch,
        setGlobalSearch] =
        useState("");

    const [selectedStatus,
        setSelectedStatus] =
        useState<DropdownOption | null>(
            null
        );

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Modal States
    *********************************************/
    const [showRoomModal, setShowRoomModal] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Filter Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        { id: "available", name: "Available", },
        { id: "closed", name: "Closed", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_ROOM_DATA: SurgeryRoomData[] = [

        {
            id: "RM001",
            roomName: "VIP Room 101",
            department: "Cardiology",
            floorNumber: "Ground Floor",
            roomCode: "RM-1001",
            notes: "Near Emergency Wing",
            status: "Available",
        },

        {
            id: "RM002",
            roomName: "VVIP Suite 201",
            department: "Neurology",
            floorNumber: "First Floor",
            roomCode: "RM-1002",
            notes: "Private Waiting Area",
            status: "Available",
        },

        {
            id: "RM003",
            roomName: "Deluxe Room 301",
            department: "Orthopedics",
            floorNumber: "Second Floor",
            roomCode: "RM-1003",
            notes: "Wheelchair Accessible",
            status: "Closed",
        },

        {
            id: "RM004",
            roomName: "Super Deluxe Room 401",
            department: "General Surgery",
            floorNumber: "Third Floor",
            roomCode: "RM-1004",
            notes: "Attached Family Lounge",
            status: "Available",
        },

        {
            id: "RM005",
            roomName: "VIP Room 102",
            department: "Cardiology",
            floorNumber: "Fourth Floor",
            roomCode: "RM-1005",
            notes: "City View",
            status: "Available",
        },

        {
            id: "RM006",
            roomName: "Premium Room 501",
            department: "Neurology",
            floorNumber: "Fifth Floor",
            roomCode: "RM-1006",
            notes: "Quiet Zone",
            status: "Closed",
        },

        {
            id: "RM007",
            roomName: "Executive Suite 601",
            department: "Orthopedics",
            floorNumber: "Sixth Floor",
            roomCode: "RM-1007",
            notes: "Premium Recovery Room",
            status: "Available",
        },

        {
            id: "RM008",
            roomName: "Deluxe Room 302",
            department: "General Surgery",
            floorNumber: "Seventh Floor",
            roomCode: "RM-1008",
            notes: "Near Nursing Station",
            status: "Available",
        },

        {
            id: "RM009",
            roomName: "VVIP Suite 202",
            department: "Cardiology",
            floorNumber: "Eighth Floor",
            roomCode: "RM-1009",
            notes: "VIP Security Access",
            status: "Closed",
        },

        {
            id: "RM010",
            roomName: "Super Deluxe Room 402",
            department: "Neurology",
            floorNumber: "Ninth Floor",
            roomCode: "RM-1010",
            notes: "Private Lift Access",
            status: "Available",
        },

        {
            id: "RM011",
            roomName: "VIP Room 103",
            department: "Orthopedics",
            floorNumber: "Tenth Floor",
            roomCode: "RM-1011",
            notes: "Mountain View",
            status: "Available",
        },

        {
            id: "RM012",
            roomName: "Executive Suite 602",
            department: "General Surgery",
            floorNumber: "First Floor",
            roomCode: "RM-1012",
            notes: "Large Recovery Space",
            status: "Closed",
        },

        {
            id: "RM013",
            roomName: "Premium Room 502",
            department: "Cardiology",
            floorNumber: "Third Floor",
            roomCode: "RM-1013",
            notes: "Extra Attendant Bed",
            status: "Available",
        },

        {
            id: "RM014",
            roomName: "Deluxe Room 303",
            department: "Neurology",
            floorNumber: "Fifth Floor",
            roomCode: "RM-1014",
            notes: "Premium Interior",
            status: "Closed",
        },

        {
            id: "RM015",
            roomName: "VVIP Presidential Suite",
            department: "General Surgery",
            floorNumber: "Tenth Floor",
            roomCode: "RM-1015",
            notes: "Highest Luxury Category",
            status: "Available",
        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage,
        setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage,
        setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredRooms =
        useMemo(() => {

            return ALL_ROOM_DATA.filter(
                (room) => {

                    const searchValue =
                        globalSearch.toLowerCase();

                    const matchesSearch =

                        room.roomName
                            .toLowerCase()
                            .includes(searchValue) ||

                        room.department
                            .toLowerCase()
                            .includes(searchValue) ||

                        room.floorNumber
                            .toLowerCase()
                            .includes(searchValue) ||

                        room.notes
                            .toLowerCase()
                            .includes(searchValue);

                    const matchesStatus =

                        !selectedStatus ||

                        room.status
                            .toLowerCase() ===
                        selectedStatus.name
                            .toLowerCase();

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

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Total Pages
    *********************************************/
    const totalPages =
        Math.ceil(
            filteredRooms.length /
            itemsPerPage
        );

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Visible Data
    *********************************************/
    const visibleTableData =
        useMemo(() => {

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
        Date : 25/06/2026
        Purpose : Bootstrap Tooltips
    *********************************************/
    useEffect(() => {

        const tooltipElements =
            document.querySelectorAll(
                '[data-bs-toggle="tooltip"]'
            );

        tooltipElements.forEach(
            (element) => {

                new bootstrap.Tooltip(
                    element
                );

            }
        );

        return () => {

            tooltipElements.forEach(
                (element) => {

                    const tooltip =
                        bootstrap.Tooltip.getInstance(
                            element
                        );

                    if (tooltip) {

                        tooltip.dispose();

                    }

                }
            );

        };

    }, [visibleTableData]);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns:
        ColumnActionRow<SurgeryRoomData>[] = [

            {
                key: "roomName",
                header: <>Room Name</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "department",
                header: <>Department</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "floorNumber",
                header: <>Floor Number</>,
                className: "text-center text-nowrap",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "notes",
                header: <>Notes</>,
                className: "text-center text-nowrap",
            },

            {
                key: "status",
                header: <>Status</>,
                className: "text-center",

                render: (row) => (

                    <div className="d-flex justify-content-center">

                        <span
                            className={`px-3 py-1 rounded-pill text-xs fw-medium

                            ${row.status ===
                                    "Available"
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
                width: "200px",

                render: (row) => (

                    <div className="d-flex justify-content-center gap-2">

                        {/* View */}
                        <button
                            type="button"
                            className="eye"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="View Room"
                            onClick={() =>
                                console.log(
                                    "View",
                                    row
                                )
                            }
                        >
                            <i className="ri-eye-line fs-18"></i>
                        </button>

                        {/* Edit */}
                        <button
                            type="button"
                            className="edit"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Edit Room"
                            // onClick={() => { setShowRoomModal(true); }}
                        >
                            <i className="ri-pencil-line fs-18"></i>
                        </button>

                        {/* Open Door */}
                        <button
                            type="button"
                            className="printer"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Open Room"
                            onClick={() => console.log("Open Room", row)}
                        >
                            <i className="ri-door-open-line fs-18"></i>
                        </button>

                        {/* Close Door */}
                        <button
                            type="button"
                            className="delete"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Close Room"
                            onClick={() => console.log("Close Room", row)}
                        >
                            <i className="ri-door-closed-line fs-18"></i>
                        </button>

                    </div>

                ),
            },

        ];

    return (
        <>

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center gap-3 my-4">

                <p className="fs-18 fw-500">Surgery Room Settings</p>

                <div className="Plus-btn" onClick={() => { setShowRoomModal(true); }}>
                    <div className="text-white fs-14 fw-400">New Room</div>
                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                </div>

            </div>

            {/* Filters */}
            <div className="aph-modal-filter-row mb-4">

                {/* Search */}
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

                            setCurrentPage(
                                1
                            );

                        }}
                    />

                    <button className="aph-search-btn outline-0">
                        <i className="ri-search-line"></i>
                    </button>

                </div>

                {/* Status Filter */}
                <div>

                    <CustomFilterDropdown
                        options={STATUS_OPTIONS}
                        value={selectedStatus}
                        placeholder="Status"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedStatus(
                                selected
                            );

                            setCurrentPage(
                                1
                            );

                        }}
                    />

                </div>

                {/* Reset */}

                <button
                    className="aph-filter-btn outline-0"
                    onClick={() => {

                        setGlobalSearch("");

                        setSelectedStatus(
                            null
                        );

                        setCurrentPage(
                            1
                        );

                    }}
                >

                    <i className="ri-filter-off-line"></i>

                </button>

            </div>

            {/* Grid */}

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
                        setCurrentPage(
                            page
                        )
                    }
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(
                        rows
                    ) => {

                        setItemsPerPage(
                            rows
                        );

                        setCurrentPage(
                            1
                        );

                    }}
                />

            </div>

            <SettingRoomModal
                show={showRoomModal}
                handleClose={() =>
                    setShowRoomModal(false)
                }
            />

        </>
    );
}



import { Modal } from "react-bootstrap";
import CustomFormDropdown, {
    type DropdownOption,
} from "../../../GlobalHelpers/CustomFormDropdown";

interface SettingRoomModalProps {
    show: boolean;
    handleClose: () => void;
}

function SettingRoomModal({
    show,
    handleClose,
}: SettingRoomModalProps) {

    const [notes, setNotes] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [selectedFloor, setSelectedFloor] = useState<DropdownOption | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Floor Options
    *********************************************/
    const FLOOR_OPTIONS: DropdownOption[] = [
        { id: "ground", name: "Ground Floor", },
        { id: "first", name: "First Floor", },
        { id: "second", name: "Second Floor", },
        { id: "third", name: "Third Floor", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Department Options
    *********************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "cardiology", name: "Cardiology", },
        { id: "neurology", name: "Neurology", },
        { id: "orthopedics", name: "Orthopedics", },
        { id: "general_surgery", name: "General Surgery", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Status Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        { id: "available", name: "Available", },
        { id: "closed", name: "Closed", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Generate Room Code
    *********************************************/
    useEffect(() => {

        if (show) {

            const generatedCode =
                `RM-${Math.floor(
                    1000 +
                    Math.random() * 9000
                )}`;

            setRoomCode(
                generatedCode
            );

        }

    }, [show]);

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : Save Room
    *********************************************/
    const handleSave = () => {

        const payload = {

            roomName,

            roomCode,

            floor:
                selectedFloor?.name,

            department:
                selectedDepartment?.name,

            status:
                selectedStatus?.name,

            notes,

        };

        console.log(
            "Room Data : ",
            payload
        );

        handleClose();

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

            {/* HEADER */}

            <Modal.Header
                className="aph-modal-header mb-3"
            >

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

                <Modal.Title
                    className="fs-18 fw-400 aph-modal-title"
                >
                    New Surgery Room
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Surgery Room Name
                                <span className="text-danger">
                                    *
                                </span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    placeholder="Enter Surgery Room Name"
                                    value={roomName}
                                    onChange={(e) =>
                                        setRoomName(
                                            e.target.value
                                        )
                                    }
                                />

                                <i className="ri-hospital-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Floor
                                <span className="text-danger">
                                    *
                                </span>
                            </label>

                            <CustomFormDropdown
                                options={
                                    FLOOR_OPTIONS
                                }
                                value={
                                    selectedFloor
                                }
                                onChange={
                                    setSelectedFloor
                                }
                                placeholder="Select Floor"
                            />

                        </div>

                    </div>

                    {/* ROW 2 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Room Code
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    disabled
                                    className="customInput"
                                    value={roomCode}
                                />

                                <i className="ri-barcode-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Department
                                <span className="text-danger">
                                    *
                                </span>
                            </label>

                            <CustomFormDropdown
                                options={
                                    DEPARTMENT_OPTIONS
                                }
                                value={
                                    selectedDepartment
                                }
                                onChange={
                                    setSelectedDepartment
                                }
                                placeholder="Select Department"
                            />

                        </div>

                    </div>

                    {/* ROW 3 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Status
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
                                onChange={
                                    setSelectedStatus
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

                                <i className="ri-sticky-note-line"></i>

                            </div>

                        </div>

                    </div>

                    {/* BUTTONS */}

                    <div className="d-flex justify-content-between border-0 pb-0 mt-5">

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

    );
}