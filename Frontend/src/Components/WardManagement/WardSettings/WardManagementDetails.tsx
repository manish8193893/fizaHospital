import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as bootstrap from "bootstrap";

import Header from "../../../GlobalHelpers/Header";
import { Pagination } from "../../../GlobalHelpers/Pagination";
import GlobalGridTable from "../../../GlobalHelpers/GlobalGridTable";
import type { ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import CustomFormDropdown, { type DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";

import ListArrowDown from '../../../../public/Assets/Icons/ListArrowDown.svg?react'


interface RoomTableData {
    roomNo: string;
    roomType: string;
    bedsAllocated: number;
    availableForBooking: string;
    price: string;
    status: "Active" | "Inactive";
}

export default function WardManagementDetails() {

    const navigate = useNavigate();

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Ward Details States
    *********************************************/
    const [wardName, setWardName] = useState("General Ward A");
    const [wardCode, setWardCode] = useState("WRD001");
    const [notes, setNotes] = useState("Standard general ward for stable adult patients.Includes 1 nursing station and shared facilities.");
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<DropdownOption | null>(null);
    const [selectedWardType, setSelectedWardType] = useState<DropdownOption | null>(null);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<DropdownOption | null>(null);
    const [selectedIsolationRequired, setSelectedIsolationRequired] = useState<DropdownOption | null>(null);

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Department Options
    *********************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "general_medicine", name: "General Medicine", },
        { id: "cardiology", name: "Cardiology", },
        { id: "neurology", name: "Neurology", },
        { id: "orthopedics", name: "Orthopedics", },
        { id: "pediatrics", name: "Pediatrics", },
        { id: "icu", name: "ICU", },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Floor Options
    *********************************************/
    const FLOOR_OPTIONS: DropdownOption[] = [
        { id: "ground_floor", name: "Ground Floor", },
        { id: "first_floor", name: "First Floor", },
        { id: "second_floor", name: "Second Floor", },
        { id: "third_floor", name: "Third Floor", },
        { id: "fourth_floor", name: "Fourth Floor", },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Ward Type Options
    *********************************************/
    const WARD_TYPE_OPTIONS: DropdownOption[] = [
        { id: "general", name: "General Ward", },
        { id: "private", name: "Private Ward", },
        { id: "icu", name: "ICU Ward", },
        { id: "emergency", name: "Emergency Ward", },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Age Group Options
    *********************************************/
    const AGE_GROUP_OPTIONS: DropdownOption[] = [
        { id: "adult", name: "Adult", },
        { id: "child", name: "Child", },
        { id: "child_adult", name: "Child/Adult", },
        { id: "child_senior", name: "Child/Senior Citizen", },
        { id: "adult_senior", name: "Adult/Senior Citizen", },
        { id: "all_ages", name: "Not Specified / All Ages", },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Isolation Options
    *********************************************/
    const ISOLATION_OPTIONS: DropdownOption[] = [
        { id: "yes", name: "Yes", },
        { id: "no", name: "No", },
    ];

    const ROOM_TYPE_OPTIONS: DropdownOption[] = [
        { id: "vip", name: "VIP", },
        { id: "delux", name: "Delux", },
        { id: "super_delux", name: "Super Delux", },
        { id: "vvip", name: "VVIP", },
        { id: "general", name: "General", },
    ];

    const STATUS_OPTIONS: DropdownOption[] = [
        { id: "active", name: "Active", },
        { id: "inactive", name: "Inactive", },
    ];

    const ROOM_DATA: RoomTableData[] = [
        {
            roomNo: "RM-101",
            roomType: "VIP",
            bedsAllocated: 2,
            availableForBooking: "Yes",
            price: "2500",
            status: "Active",
        },
        {
            roomNo: "RM-102",
            roomType: "Delux",
            bedsAllocated: 3,
            availableForBooking: "No",
            price: "1800",
            status: "Inactive",
        },
        {
            roomNo: "RM-103",
            roomType: "Super Delux",
            bedsAllocated: 2,
            availableForBooking: "Yes",
            price: "3200",
            status: "Active",
        },
        {
            roomNo: "RM-104",
            roomType: "VVIP",
            bedsAllocated: 1,
            availableForBooking: "Yes",
            price: "5000",
            status: "Active",
        },
        {
            roomNo: "RM-105",
            roomType: "General",
            bedsAllocated: 6,
            availableForBooking: "No",
            price: "900",
            status: "Inactive",
        },
    ];

    const roomColumns: ColumnActionRow<RoomTableData>[] = [

        {
            key: "roomNo",
            header: <>Room No</>,
            className: "text-center",
        },

        {
            key: "roomType",
            header: <>Room Type</>,
            className: "text-center",
        },

        {
            key: "bedsAllocated",
            header: <>Beds Allocated To This Room</>,
            className: "text-center",
        },

        {
            key: "availableForBooking",
            header: <>Available For Booking</>,
            className: "text-center",
        },

        {
            key: "price",
            header: <>Price</>,
            className: "text-center",
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

            render: () => (

                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View"
                    >
                        <i className="fs-18 ri-eye-line"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Edit"
                    >
                        <i className="fs-18 ri-pencil-ai-line"></i>
                    </button>

                    <button
                        type="button"
                        className="Check-In"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Open Room"
                    >
                        <i className="fs-18 ri-door-open-line"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        data-bs-title="Close Room"
                    >
                        <i className="fs-18 ri-door-closed-line"></i>
                    </button>

                </div>

            ),
        },

    ];


    useEffect(() => {
        setSelectedDepartment(DEPARTMENT_OPTIONS[0]);
        setSelectedFloor(FLOOR_OPTIONS[0]);
        setSelectedWardType(WARD_TYPE_OPTIONS[0]);
        setSelectedAgeGroup(AGE_GROUP_OPTIONS[4]);
        setSelectedIsolationRequired(ISOLATION_OPTIONS[1]);
    }, []);

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Ward Details Expand State
    *********************************************/
    const [showPatientDetails, setShowPatientDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Update Ward
    *********************************************/
    const handleUpdateWard = () => {

        const payload = {
            wardName,
            wardCode,
            wardType: selectedWardType,
            department: selectedDepartment,
            floor: selectedFloor,
            ageGroup: selectedAgeGroup,
            isolationRequired:
                selectedIsolationRequired,
            notes,
        };

        console.log(
            "Ward Updated :",
            payload
        );
        setIsEditing(false);
    };

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Room Management States
    *********************************************/
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedRoomTypeFilter, setSelectedRoomTypeFilter] = useState<DropdownOption | null>(null);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<DropdownOption | null>(null);
    const [showRoomModal, setShowRoomModal] = useState(false);

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Room Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Filtered Room Data
    *********************************************/
    const filteredRoomData = ROOM_DATA.filter(
        (room) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                room.roomNo
                    .toLowerCase()
                    .includes(searchValue) ||

                room.roomType
                    .toLowerCase()
                    .includes(searchValue);

            const matchesRoomType =
                !selectedRoomTypeFilter ||
                room.roomType.toLowerCase() ===
                selectedRoomTypeFilter.name.toLowerCase();

            const matchesStatus =
                !selectedStatusFilter ||
                room.status.toLowerCase() ===
                selectedStatusFilter.name.toLowerCase();

            return (
                matchesSearch &&
                matchesRoomType &&
                matchesStatus
            );

        }
    );

    const totalPages = Math.ceil(
        filteredRoomData.length /
        itemsPerPage
    );

    const visibleRoomData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredRoomData.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredRoomData,
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Bootstrap Tooltip
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

    }, [visibleRoomData]);

    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Ward Management"
                    subHeading="Ward Settings / View-Edit Details"
                />

                {/* Ward Details Card */}
                <div className="bg-white rounded-3 p-2 my-3">

                    <div className="d-flex justify-content-between ">

                        <div className=" p-2">

                            {/* Patients Name */}
                            <h4 className="fw-500 fs-16 mb-3">General Medicine</h4>

                            {/* Patients Meta */}

                            <div className="patientsMeta gap-2">

                                <span>
                                    <i className="ri-window-line fs-18" style={{ color: '#A78CEA' }}></i>
                                    <b>GW-R100</b>
                                </span>

                                <span>
                                    <i className="ri-building-line fs-18" style={{ color: "#0477BF" }}></i>
                                    <b>1</b>
                                </span>

                                <span>
                                    <i className="ri-hotel-bed-line fs-18" style={{ color: '#1FC16B' }}></i>
                                    <b>6/12 Available Rooms</b>
                                </span>

                            </div>

                        </div>

                        <div className="d-flex flex-column align-items-center gap-2 p-2">
                            {/* Status */}
                            <span className="patientsStatus px-5">
                                Available
                            </span>

                            <div className="d-flex gap-3">
                                <div
                                    className={`patientDetailsToggle ${showPatientDetails ? "rotated" : ""}`}
                                    onClick={() => setShowPatientDetails(!showPatientDetails)}
                                >
                                    <ListArrowDown />
                                </div>

                                <button className="back-btn" onClick={() => navigate("/ward-management/WardSettings")}>
                                    <i className="ri-arrow-left-line me-3"></i>Back
                                </button>
                            </div>
                        </div>

                    </div>

                    <AnimatePresence>
                        {showPatientDetails && (

                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="bg-white rounded-3 p-3 mb-3 overflow-hidden"
                            >

                                {/* Row 1 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Ward Name{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                value={wardName}
                                                disabled={!isEditing}
                                                onChange={(e) =>
                                                    setWardName(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <i className="ri-hotel-bed-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Ward Code{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                value={wardCode}
                                                disabled={!isEditing}
                                                onChange={(e) =>
                                                    setWardCode(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <i className="ri-barcode-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Ward Type{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={WARD_TYPE_OPTIONS}
                                            value={selectedWardType}
                                            onChange={(value) =>
                                                setSelectedWardType(
                                                    value
                                                )
                                            }
                                            placeholder="Select Ward Type"
                                            disabled={!isEditing}
                                        />

                                    </div>

                                </div>

                                {/* Row 2 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Department{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={DEPARTMENT_OPTIONS}
                                            value={selectedDepartment}
                                            onChange={(value) =>
                                                setSelectedDepartment(
                                                    value
                                                )
                                            }
                                            placeholder="Select Department"
                                            disabled={!isEditing}
                                        />

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Floor{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={FLOOR_OPTIONS}
                                            value={selectedFloor}
                                            onChange={(value) =>
                                                setSelectedFloor(
                                                    value
                                                )
                                            }
                                            placeholder="Select Floor"
                                            disabled={!isEditing}
                                        />

                                    </div>

                                </div>

                                {/* Row 3 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Age Group{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={AGE_GROUP_OPTIONS}
                                            value={selectedAgeGroup}
                                            onChange={(value) =>
                                                setSelectedAgeGroup(
                                                    value
                                                )
                                            }
                                            placeholder="Select Age Group"
                                            disabled={!isEditing}
                                        />

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Isolation Required{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={ISOLATION_OPTIONS}
                                            value={selectedIsolationRequired}
                                            onChange={(value) =>
                                                setSelectedIsolationRequired(
                                                    value
                                                )
                                            }
                                            placeholder="Select Isolation Required"
                                            disabled={!isEditing}
                                        />

                                    </div>

                                </div>

                                {/* Row 4 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Notes
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                value={notes}
                                                disabled={!isEditing}
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

                                {/* Buttons */}
                                <div className="d-flex justify-content-between border-0 pb-0 mt-3">

                                    {!isEditing ? (
                                        <button
                                            type="button"
                                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                            onClick={handleUpdateWard}
                                        >
                                            Update
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

                {/* Room Management Block */}
                <div>
                    <div className="bg-white rounded-3 p-3">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h5 className="mb-0">
                                Room Management
                            </h5>

                            <div
                                className="Plus-btn"
                                onClick={() => setShowRoomModal(true)}
                            >
                                <div className="text-white fs-14 fw-400">
                                    New Room
                                </div>

                                <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                            </div>

                        </div>

                        {/* Filters */}
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
                                        ),
                                            setCurrentPage(1);
                                    }
                                    }
                                />

                                <button className="aph-search-btn outline-0">
                                    <i className="ri-search-line"></i>
                                </button>

                            </div>

                            <div>
                                <CustomFilterDropdown
                                    options={ROOM_TYPE_OPTIONS}
                                    value={selectedRoomTypeFilter}
                                    customClass="aph-filter-dropdown"
                                    onChange={(value) => {
                                        setSelectedRoomTypeFilter(
                                            value
                                        );
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Room Type"
                                />
                            </div>

                            <div>
                                <CustomFilterDropdown
                                    options={STATUS_OPTIONS}
                                    value={selectedStatusFilter}
                                    customClass="aph-filter-dropdown"
                                    onChange={(value) => {
                                        setSelectedStatusFilter(
                                            value
                                        );
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Status"
                                />
                            </div>

                            <button
                                className="aph-filter-btn outline-0"
                                onClick={() => {
                                    setGlobalSearch("");
                                    setSelectedRoomTypeFilter(null);
                                    setSelectedStatusFilter(null);
                                    setCurrentPage(1);
                                }}
                            >
                                <i className="ri-filter-off-line"></i>
                            </button>

                        </div>

                        <div className="d-flex flex-column">

                            <GlobalGridTable
                                data={visibleRoomData}
                                columns={roomColumns}
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

                    </div>
                </div>
            </div>
            <RoomModal
                show={showRoomModal}
                handleClose={() =>
                    setShowRoomModal(false)
                }
            />
        </>
    )
}


interface RoomModalProps {
    show: boolean;
    handleClose: () => void;
}

import { Modal } from "react-bootstrap";


export function RoomModal({
    show,
    handleClose,
}: RoomModalProps) {

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Form States
    *********************************************/
    const [availableRoom, setAvailableRoom] = useState("");
    const [numberOfBeds, setNumberOfBeds] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [selectedRoomType, setSelectedRoomType] = useState<DropdownOption | null>(null);

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Room Type Options
    *********************************************/
    const ROOM_TYPE_OPTIONS: DropdownOption[] = [
        { id: "vip", name: "VIP", },
        { id: "delux", name: "Delux", },
        { id: "super_delux", name: "Super Delux", },
        { id: "vvip", name: "VVIP", },
        { id: "general", name: "General", },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 23/06/2026
        Purpose : Save Room
    *********************************************/
    const handleSave = () => {

        const payload = {
            roomType: selectedRoomType,
            availableRoom,
            numberOfBeds,
            roomPrice,
            notes,
        };

        console.log("Room Data :", payload);
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

                {/* Header */}
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
                        New Room
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="p-0">

                    <form>

                        {/* Row 1 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Room Type{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={ROOM_TYPE_OPTIONS}
                                    value={selectedRoomType}
                                    onChange={(value) =>
                                        setSelectedRoomType(
                                            value
                                        )
                                    }
                                    placeholder="Select Room Type"
                                />

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Available Room For This Type{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="number"
                                        className="customInput"
                                        placeholder="Enter Available Room"
                                        value={availableRoom}
                                        onChange={(e) =>
                                            setAvailableRoom(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-door-open-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* Row 2 */}
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

                        {/* Row 3 */}
                        <div className="formRow">

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

                        {/* Buttons */}
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
    );
}