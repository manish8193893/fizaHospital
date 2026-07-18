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
    Purpose : Ward Management Grid
*********************************************/
interface WardTableData {
    id: string;
    wardName: string;
    department: string;
    floorNumber: string;
    totalRooms: number;
    totalBeds: number;
    availableBeds: number;
}

export default function WardManagement() {

    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<DropdownOption | null>(null);
    const [showWardModal, setShowWardModal] = useState(false);
    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Department Options
    *********************************************/
    const departmentOptions: DropdownOption[] = [
        { id: "general_medicine", name: "General Medicine" },
        { id: "cardiology", name: "Cardiology" },
        { id: "orthopedics", name: "Orthopedics" },
        { id: "neurology", name: "Neurology" },
        { id: "pediatrics", name: "Pediatrics" },
        { id: "icu", name: "ICU" },
        { id: "emergency", name: "Emergency" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Floor Options
    *********************************************/
    const FLOOR_OPTIONS: DropdownOption[] = [
        { id: "ground_floor", name: "Ground Floor", },
        { id: "first_floor", name: "First Floor", },
        { id: "second_floor", name: "Second Floor", },
        { id: "third_floor", name: "Third Floor", },
        { id: "fourth_floor", name: "Fourth Floor", },
        { id: "fifth_floor", name: "Fifth Floor", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_WARD_DATA: WardTableData[] = [
        {
            id: "WRD001",
            wardName: "General Ward A",
            department: "General Medicine",
            floorNumber: "Ground Floor",
            totalRooms: 12,
            totalBeds: 48,
            availableBeds: 16,
        },
        {
            id: "WRD002",
            wardName: "General Ward B",
            department: "General Medicine",
            floorNumber: "First Floor",
            totalRooms: 15,
            totalBeds: 60,
            availableBeds: 22,
        },
        {
            id: "WRD003",
            wardName: "Cardiac Ward",
            department: "Cardiology",
            floorNumber: "Second Floor",
            totalRooms: 10,
            totalBeds: 40,
            availableBeds: 12,
        },
        {
            id: "WRD004",
            wardName: "Neuro Ward",
            department: "Neurology",
            floorNumber: "Third Floor",
            totalRooms: 8,
            totalBeds: 32,
            availableBeds: 9,
        },
        {
            id: "WRD005",
            wardName: "Pediatric Ward",
            department: "Pediatrics",
            floorNumber: "Fourth Floor",
            totalRooms: 18,
            totalBeds: 72,
            availableBeds: 30,
        },
        {
            id: "WRD006",
            wardName: "ICU Block",
            department: "ICU",
            floorNumber: "Fifth Floor",
            totalRooms: 20,
            totalBeds: 20,
            availableBeds: 4,
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
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Filtered Wards
    *********************************************/
    const filteredWards = useMemo(() => {

        return ALL_WARD_DATA.filter((ward) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                ward.id.toLowerCase().includes(searchValue) ||
                ward.wardName.toLowerCase().includes(searchValue) ||
                ward.department.toLowerCase().includes(searchValue) ||
                ward.floorNumber.toLowerCase().includes(searchValue);

            const matchesDepartment =
                !selectedDepartment ||
                ward.department.toLowerCase() ===
                selectedDepartment.name.toLowerCase();

            const matchesFloor =
                !selectedFloor ||
                ward.floorNumber.toLowerCase() ===
                selectedFloor.name.toLowerCase();

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesFloor
            );

        });

    }, [
        globalSearch,
        selectedDepartment,
        selectedFloor,
    ]);

    const totalPages = Math.ceil(
        filteredWards.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        return filteredWards.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredWards,
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Floor Badge Color
    *********************************************/
    const getFloorColor = (
        floor: string
    ) => {

        switch (floor) {

            case "Ground Floor":
                return "#8DEAF5";

            case "First Floor":
                return "#FFA9AC";

            case "Second Floor":
                return "#FDDCBD";

            case "Third Floor":
                return "#AAFFD0";

            case "Fourth Floor":
                return "#D6C6FF";

            case "Fifth Floor":
                return "#FFE8A3";

            case "Sixth Floor":
                return "#B8E7FF";

            case "Seventh Floor":
                return "#FFD6F5";

            default:
                return "#E9ECEF";

        }

    };

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

    }, [visibleTableData]);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns: ColumnActionRow<WardTableData>[] = [

        {
            key: "wardName",
            header: <>Ward Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "department",
            header: <>Department</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "floorNumber",
            header: <>Floor Number</>,
            className: "text-center p-0",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            render: (row) => (

                <div
                    className="d-flex text-muted justify-content-center align-items-center w-100 h-100"
                    style={{
                        backgroundColor:
                            getFloorColor(
                                row.floorNumber
                            ),
                        color: "#2B2B2B",
                    }}
                >
                    {row.floorNumber}
                </div>

            ),
        },

        {
            key: "totalRooms",
            header: <>Total Rooms</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "totalBeds",
            header: <>Total Beds</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "availableBeds",
            header: <>Available Beds</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "220px",

            render: (row) => (

                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View Details"
                        onClick={() =>{
                            console.log("View :", row.id),
                            navigate("/ward-management/WardSettings/view")
                        }
                        }
                    >
                        <i className="fs-18 ri-eye-line"></i>
                    </button>

                    <button
                        type="button"
                        className="Check-In"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Room Booking"
                        onClick={() =>
                            console.log("Room Booking :", row.id)
                        }
                    >
                        <i className="fs-18 ri-hotel-bed-line"></i>
                    </button>

                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
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
                        data-bs-placement="top"
                        data-bs-title="Close Room"
                        onClick={() =>
                            console.log("Close :", row.id)
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
        Date : 23/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedDepartment(null);
        setSelectedFloor(null);
        setCurrentPage(1);

    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">

                <p className="fs-18 fw-500">
                    Ward Management
                </p>

                <div
                    className="Plus-btn"
                    onClick={() => setShowWardModal(true)}
                >
                    <div className="text-white fs-14 fw-400">
                        New Ward
                    </div>

                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                </div>

            </div>

            {/* Filter Row */}
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
                        options={FLOOR_OPTIONS}
                        value={selectedFloor}
                        placeholder="Floor"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedFloor(selected);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={departmentOptions}
                        value={selectedDepartment}
                        placeholder="Department"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedDepartment(selected);
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
                        setCurrentPage(page)
                    }
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows) => {
                        setItemsPerPage(rows);
                        setCurrentPage(1);
                    }}
                />

            </div>

            <WardManagementModal
                show={showWardModal}
                handleClose={() =>
                    setShowWardModal(false)
                }
            />
        </>
    );
}

import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";
import { useNavigate } from "react-router-dom";

interface WardManagementModalProps {
    show: boolean;
    handleClose: () => void;
}

export function WardManagementModal({
    show,
    handleClose,
}: WardManagementModalProps) {

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Step State
    *********************************************/
    const [step, setStep] = useState<number>(1);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Form States
    *********************************************/
    const [wardName, setWardName] = useState("");
    const [wardCode, setWardCode] = useState("");
    const [notes, setNotes] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);
    const [selectedFloor, setSelectedFloor] = useState<DropdownOption | null>(null);
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<DropdownOption | null>(null);
    const [selectedIsolationRequired, setSelectedIsolationRequired] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Department Options
    *********************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "general_medicine", name: "General Medicine" },
        { id: "cardiology", name: "Cardiology" },
        { id: "orthopedics", name: "Orthopedics" },
        { id: "neurology", name: "Neurology" },
        { id: "pediatrics", name: "Pediatrics" },
        { id: "icu", name: "ICU" },
        { id: "emergency", name: "Emergency" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Floor Options
    *********************************************/
    const FLOOR_OPTIONS: DropdownOption[] = [
        { id: "ground_floor", name: "Ground Floor", },
        { id: "first_floor", name: "First Floor", },
        { id: "second_floor", name: "Second Floor", },
        { id: "third_floor", name: "Third Floor", },
        { id: "fourth_floor", name: "Fourth Floor", },
        { id: "fifth_floor", name: "Fifth Floor", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Age Group Options
    *********************************************/
    const AGE_GROUP_OPTIONS: DropdownOption[] = [
        { id: "adult_senior", name: "Adult / Senior Citizen", },
        { id: "child", name: "Child", },
        { id: "child_adult", name: "Child / Adult", },
        { id: "child_adult_senior", name: "Child / Adult / Senior Citizen", },
        { id: "child_senior", name: "Child / Senior Citizen", },
        { id: "all", name: "Not Specified / All Ages", },
        { id: "senior", name: "Senior Citizen", },
        { id: "adult", name: "Adults", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Isolation Options
    *********************************************/
    const ISOLATION_OPTIONS: DropdownOption[] = [
        { id: "yes", name: "Yes", },
        { id: "no", name: "No", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Room Form States
    *********************************************/
    const [roomType, setRoomType] = useState<DropdownOption | null>(null);
    const [availableRooms, setAvailableRooms] = useState("");
    const [numberOfBeds, setNumberOfBeds] = useState("");
    const [roomPrice, setRoomPrice] = useState("");
    const [roomNotes, setRoomNotes] = useState("");
    const [onlyBeds, setOnlyBeds] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Room Pagination
    *********************************************/
    const [roomCurrentPage, setRoomCurrentPage] = useState(1);
    const [roomItemsPerPage, setRoomItemsPerPage] = useState(5);

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Room Type Options
    *********************************************/
    const ROOM_TYPE_OPTIONS: DropdownOption[] = [
        { id: "single", name: "Single Room", },
        { id: "double", name: "Double Sharing", },
        { id: "delux", name: "Delux", },
        { id: "vip", name: "VIP", },
        { id: "vvip", name: "VVIP", },
        { id: "suite", name: "Suite", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Room Grid Data
    *********************************************/
    interface RoomTableData {
        id: number;
        roomType: string;
        availableRooms: number;
        bedsPerRoom: number;
        roomPrice: string;
        notes: string;
    }

    const ROOM_DATA: RoomTableData[] = [
        {
            id: 1,
            roomType: "VIP",
            availableRooms: 5,
            bedsPerRoom: 2,
            roomPrice: "100000 IQD",
            notes: "-",
        },
        {
            id: 2,
            roomType: "Single Room",
            availableRooms: 1,
            bedsPerRoom: 1,
            roomPrice: "100000 IQD",
            notes: "-",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Room Grid Pagination
    *********************************************/
    const roomTotalPages = Math.ceil(
        ROOM_DATA.length / roomItemsPerPage
    );

    const visibleRoomData = ROOM_DATA.slice(
        (roomCurrentPage - 1) * roomItemsPerPage,
        roomCurrentPage * roomItemsPerPage
    );

    const roomColumns: ColumnActionRow<RoomTableData>[] = [

        {
            key: "roomType",
            header: <>Room Type</>,
            className: "text-center",
        },

        {
            key: "availableRooms",
            header: <>Available Rooms</>,
            className: "text-center",
        },

        {
            key: "bedsPerRoom",
            header: <>Beds Per Room</>,
            className: "text-center",
        },

        {
            key: "roomPrice",
            header: <>Room Price</>,
            className: "text-center",
        },

        {
            key: "notes",
            header: <>Notes</>,
            className: "text-center",
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",

            render: (row) => (

                <div className="d-flex justify-content-center gap-2">

                    <button
                        type="button"
                        className="edit"
                        onClick={() =>
                            console.log("Edit :", row.id)
                        }
                    >
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        onClick={() =>
                            console.log("Delete :", row.id)
                        }
                    >
                        <i className="ri-delete-bin-6-line fs-18"></i>
                    </button>

                </div>

            ),
        },
    ];

    /********************************************
    Name : Manish Kumar
    Date : 23/06/2026
    Purpose : Reset Modal
*********************************************/
    const handleCloseAndReset = () => {

        setStep(1);

        setWardName("");
        setWardCode("");
        setNotes("");

        setSelectedDepartment(null);
        setSelectedFloor(null);
        setSelectedAgeGroup(null);
        setSelectedIsolationRequired(null);

        setRoomType(null);
        setAvailableRooms("");
        setNumberOfBeds("");
        setRoomPrice("");
        setRoomNotes("");

        setOnlyBeds(false);

        setRoomCurrentPage(1);

        handleClose();

    };

    /********************************************
        Name : Manish Kumar
        Date : 23/06/2026
        Purpose : Next Step
    *********************************************/
    const handleSaveAndContinue = () => {

        const payload = {
            wardName,
            wardCode,
            department: selectedDepartment,
            floor: selectedFloor,
            ageGroup: selectedAgeGroup,
            isolationRequired:
                selectedIsolationRequired,
            notes,
        };

        console.log(
            "Ward Step 1 Data :",
            payload
        );

        setStep(2);

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
                        Add New Ward
                    </Modal.Title>

                </Modal.Header>

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <Modal.Body>

                            {/* STEPPER */}
                            <div className="ward-stepper-container mb-3">

                                <div className="d-flex align-items-center justify-content-center">

                                    <div className="d-flex align-items-center">

                                        <div className="ward-step-active">

                                        </div>

                                        <span className="ms-2 fs-14 fw-500">
                                            01 Ward Details
                                        </span>

                                    </div>

                                    <div
                                        className="mx-3"
                                        style={{
                                            width: "140px",
                                            height: "2px",
                                            background:
                                                "#D7DCE5",
                                        }}
                                    ></div>

                                    <div className="d-flex align-items-center">

                                        <div className="ward-step-inactive">

                                        </div>

                                        <span className="ms-2 fs-14 fw-500">
                                            02 Rooms & Beds Info
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <form>

                                {/* ROW 1 */}
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
                                                placeholder="Enter Ward Name"
                                                value={wardName}
                                                onChange={(e) =>
                                                    setWardName(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <i className="ri-hospital-line"></i>

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
                                                placeholder="Enter Ward Code"
                                                value={wardCode}
                                                onChange={(e) =>
                                                    setWardCode(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <i className="ri-barcode-line"></i>

                                        </div>

                                    </div>

                                </div>

                                {/* ROW 2 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Department{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={
                                                DEPARTMENT_OPTIONS
                                            }
                                            value={
                                                selectedDepartment
                                            }
                                            onChange={(value) =>
                                                setSelectedDepartment(
                                                    value
                                                )
                                            }
                                            placeholder="Select Department"
                                        />

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Floor{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={
                                                FLOOR_OPTIONS
                                            }
                                            value={
                                                selectedFloor
                                            }
                                            onChange={(value) =>
                                                setSelectedFloor(
                                                    value
                                                )
                                            }
                                            placeholder="Select Floor"
                                        />

                                    </div>

                                </div>

                                {/* ROW 3 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Age Group{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={
                                                AGE_GROUP_OPTIONS
                                            }
                                            value={
                                                selectedAgeGroup
                                            }
                                            onChange={(value) =>
                                                setSelectedAgeGroup(
                                                    value
                                                )
                                            }
                                            placeholder="Select Age Group"
                                        />

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Isolation Required{" "}
                                            <span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={
                                                ISOLATION_OPTIONS
                                            }
                                            value={
                                                selectedIsolationRequired
                                            }
                                            onChange={(value) =>
                                                setSelectedIsolationRequired(
                                                    value
                                                )
                                            }
                                            placeholder="Select Option"
                                        />

                                    </div>

                                </div>

                                {/* ROW 4 */}
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

                                {/* BUTTONS */}
                                <div className="d-flex justify-content-between border-0 pb-0 mt-3">

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                        onClick={
                                            handleSaveAndContinue
                                        }
                                    >
                                        Save & Continue
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
                    </>
                )}

                {step === 2 && (
                    <>
                        <Modal.Body>

                            {/* STEPPER */}
                            <div className="ward-stepper-container mb-3">

                                <div className="d-flex align-items-center justify-content-center">

                                    <div className="d-flex align-items-center">

                                        <div className="ward-step-completed">
                                            <i className="ri-check-line"></i>
                                        </div>

                                        <span className="ms-2 fs-14 fw-500">
                                            01 Ward Details
                                        </span>

                                    </div>

                                    <div
                                        className="mx-3"
                                        style={{
                                            width: "140px",
                                            height: "2px",
                                            background: "#3E63B6",
                                        }}
                                    ></div>

                                    <div className="d-flex align-items-center">

                                        <div className="ward-step-active">

                                        </div>

                                        <span className="ms-2 fs-14 fw-500">
                                            02 Rooms & Beds Info
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <form>

                                {/* ROW 1 */}
                                <div className="formRow d-flex">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Room Type{" "}<span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={ROOM_TYPE_OPTIONS}
                                            value={roomType}
                                            onChange={(value) =>
                                                setRoomType(value)
                                            }
                                            placeholder="Select Room Type"
                                            disabled={onlyBeds}
                                        />

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Available Rooms Of This Type{" "}<span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Available Rooms"
                                                disabled={onlyBeds}
                                                value={availableRooms}
                                                onChange={(e) =>
                                                    setAvailableRooms(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <i className="ri-hotel-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="form-check-label ms-2">
                                            No Rooms - Only Beds{" "}<span className="text-danger">*</span>
                                        </label>

                                        <div className="form-check form-switch">

                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={onlyBeds}
                                                onChange={() =>
                                                    setOnlyBeds(!onlyBeds)
                                                }
                                            />

                                        </div>

                                    </div>

                                </div>

                                {/* ROW 2 */}
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Number Of Beds{" "}<span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Enter Beds"
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
                                            Room Price{" "}<span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="number"
                                                className="customInput"
                                                placeholder="Enter Room Price"
                                                disabled={onlyBeds}
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

                                    <div
                                        className="formGroup"
                                        style={{
                                            width: "100%",
                                        }}
                                    >

                                        <label className="customLabel">
                                            Notes
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                className="customInput"
                                                placeholder="Enter Notes"
                                                value={roomNotes}
                                                onChange={(e) =>
                                                    setRoomNotes(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <i className="ri-file-text-line"></i>

                                        </div>

                                    </div>

                                </div>

                                {/* ROOM GRID */}
                                <div
                                    className="mt-2 p-2 rounded-2"
                                    style={{
                                        background: "#F7F7F7",
                                    }}
                                >

                                    <div className="fs-18 fw-500 mb-2">
                                        Rooms Information
                                    </div>

                                    <div className="d-flex flex-column">
                                        <GlobalGridTable
                                            data={visibleRoomData}
                                            columns={roomColumns}
                                            currentPage={roomCurrentPage}
                                            pageSize={roomItemsPerPage}
                                        />

                                        <Pagination
                                            totalPages={roomTotalPages}
                                            currentPage={roomCurrentPage}
                                            onPageChange={(page) =>
                                                setRoomCurrentPage(page)
                                            }
                                            rowsPerPage={roomItemsPerPage}
                                            onRowsPerPageChange={(rows) => {
                                                setRoomItemsPerPage(rows);
                                                setRoomCurrentPage(1);
                                            }}
                                        />
                                    </div>

                                </div>

                                {/* FOOTER BUTTONS */}
                                <div className="d-flex gap-3 mt-3">

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-red bg-white text-red border-0 outline-0 col"
                                        onClick={handleCloseAndReset}
                                    >
                                        Skip For Now
                                    </button>

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-blue bg-white text-blue border-0 outline-0 col"
                                        onClick={handleCloseAndReset}
                                    >
                                        Save & New
                                    </button>

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height bg-blue text-white border-0 outline-0 col"
                                        onClick={handleCloseAndReset}
                                    >
                                        Save
                                    </button>

                                </div>

                            </form>

                        </Modal.Body>
                    </>
                )}

            </Modal>
        </>
    );
}