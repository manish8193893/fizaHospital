import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import { Modal } from "react-bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import CustomFormDropdown, {
    type DropdownOption,
} from "../../../GlobalHelpers/CustomFormDropdown";

import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";

import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";


interface AdmissionRequestData {
    id: string;
    patientName: string;
    phoneNumber: string;
    ageGender: string;
    department: string;
    doctorName: string;
    requestDateTime: string;
    admissionDate: string;
    lengthOfStay: string;
    admissionType: string;
    status: "Waiting" | "Assigned";
}

export default function InPatientAdmissionRequestGridTable() {

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Filter States
    *********************************************/
    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [selectedDepartment, setSelectedDepartment] =
        useState<DropdownOption | null>(null);

    const [selectedDoctor, setSelectedDoctor] =
        useState<DropdownOption | null>(null);

    const [selectedDate, setSelectedDate] =
        useState<Date | null>(null);

    const [showDateCalendar, setShowDateCalendar] =
        useState(false);

    const calendarRef =
        useRef<HTMLDivElement | null>(
            null
        );

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Modal States
    *********************************************/
    const [showAssignModal, setShowAssignModal] =
        useState(false);

    const [showRejectModal, setShowRejectModal] =
        useState(false);

    const [selectedRow,
        setSelectedRow] =
        useState<AdmissionRequestData | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Filter Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        {
            id: "waiting",
            name: "Waiting",
        },
        {
            id: "assigned",
            name: "Assigned",
        },
    ];

    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        {
            id: "cardiology",
            name: "Cardiology",
        },
        {
            id: "neurology",
            name: "Neurology",
        },
        {
            id: "orthopedics",
            name: "Orthopedics",
        },
        {
            id: "general",
            name: "General Medicine",
        },
    ];

    const DOCTOR_OPTIONS: DropdownOption[] = [
        {
            id: "doctor_1",
            name: "Dr. Rajesh Sharma",
        },
        {
            id: "doctor_2",
            name: "Dr. Amit Verma",
        },
        {
            id: "doctor_3",
            name: "Dr. Priya Singh",
        },
    ];

    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (

                calendarRef.current &&

                !calendarRef.current.contains(
                    event.target as Node
                )

            ) {

                setShowDateCalendar(
                    false
                );

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_REQUEST_DATA:
        AdmissionRequestData[] = [

            {
                id: "PAT001",
                patientName: "Manish Kashyap",
                phoneNumber: "8742970516",
                ageGender: "22 / Male",
                department: "Cardiology",
                doctorName: "Dr. Rajesh Sharma",
                requestDateTime: "23/06/2026 10:30 AM",
                admissionDate: "24/06/2026",
                lengthOfStay: "5 Days",
                admissionType: "Emergency",
                status: "Waiting",
            },

            {
                id: "PAT002",
                patientName: "Rahul Sharma",
                phoneNumber: "9876543210",
                ageGender: "35 / Male",
                department: "Neurology",
                doctorName: "Dr. Amit Verma",
                requestDateTime: "23/06/2026 11:00 AM",
                admissionDate: "25/06/2026",
                lengthOfStay: "3 Days",
                admissionType: "Planned",
                status: "Assigned",
            },

            {
                id: "PAT003",
                patientName: "Priya Verma",
                phoneNumber: "9988776655",
                ageGender: "28 / Female",
                department: "Orthopedics",
                doctorName: "Dr. Priya Singh",
                requestDateTime: "23/06/2026 12:15 PM",
                admissionDate: "24/06/2026",
                lengthOfStay: "7 Days",
                admissionType: "Emergency",
                status: "Waiting",
            },

            {
                id: "PAT004",
                patientName: "Arjun Kumar",
                phoneNumber: "9988665544",
                ageGender: "40 / Male",
                department: "General Medicine",
                doctorName: "Dr. Rajesh Sharma",
                requestDateTime: "23/06/2026 01:20 PM",
                admissionDate: "26/06/2026",
                lengthOfStay: "4 Days",
                admissionType: "Planned",
                status: "Assigned",
            },

            {
                id: "PAT005",
                patientName: "Riya Singh",
                phoneNumber: "8899776655",
                ageGender: "18 / Female",
                department: "Cardiology",
                doctorName: "Dr. Amit Verma",
                requestDateTime: "23/06/2026 02:00 PM",
                admissionDate: "25/06/2026",
                lengthOfStay: "2 Days",
                admissionType: "Emergency",
                status: "Waiting",
            },

            {
                id: "PAT006",
                patientName: "Ankit Sharma",
                phoneNumber: "8877665544",
                ageGender: "31 / Male",
                department: "Orthopedics",
                doctorName: "Dr. Priya Singh",
                requestDateTime: "23/06/2026 02:45 PM",
                admissionDate: "26/06/2026",
                lengthOfStay: "6 Days",
                admissionType: "Planned",
                status: "Assigned",
            },

            {
                id: "PAT007",
                patientName: "Neha Gupta",
                phoneNumber: "7788996655",
                ageGender: "26 / Female",
                department: "Neurology",
                doctorName: "Dr. Rajesh Sharma",
                requestDateTime: "23/06/2026 03:15 PM",
                admissionDate: "24/06/2026",
                lengthOfStay: "4 Days",
                admissionType: "Emergency",
                status: "Waiting",
            },

            {
                id: "PAT008",
                patientName: "Karan Mehta",
                phoneNumber: "7766554433",
                ageGender: "45 / Male",
                department: "Cardiology",
                doctorName: "Dr. Amit Verma",
                requestDateTime: "23/06/2026 04:10 PM",
                admissionDate: "27/06/2026",
                lengthOfStay: "8 Days",
                admissionType: "Planned",
                status: "Assigned",
            },
        ];

    /********************************************
Name : Manish Kumar
Date : 24/06/2026
Purpose : Pagination States
*********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredRequests =
        useMemo(() => {

            return ALL_REQUEST_DATA.filter(
                (request) => {

                    const searchValue =
                        globalSearch.toLowerCase();

                    const matchesSearch =

                        request.id
                            .toLowerCase()
                            .includes(searchValue) ||

                        request.patientName
                            .toLowerCase()
                            .includes(searchValue) ||

                        request.department
                            .toLowerCase()
                            .includes(searchValue) ||

                        request.doctorName
                            .toLowerCase()
                            .includes(searchValue);

                    const matchesStatus =
                        !selectedStatus ||

                        request.status
                            .toLowerCase() ===
                        selectedStatus.name
                            .toLowerCase();

                    const formattedSelectedDate =
                        selectedDate
                            ? `${String(
                                selectedDate.getDate()
                            ).padStart(2, "0")}/${String(
                                selectedDate.getMonth() + 1
                            ).padStart(2, "0")}/${selectedDate.getFullYear()}`
                            : "";

                    const matchesDate =
                        !selectedDate ||
                        request.admissionDate.startsWith(
                            formattedSelectedDate
                        );

                    const matchesDepartment =
                        !selectedDepartment ||

                        request.department
                            .toLowerCase() ===
                        selectedDepartment.name
                            .toLowerCase();

                    const matchesDoctor =
                        !selectedDoctor ||

                        request.doctorName
                            .toLowerCase() ===
                        selectedDoctor.name
                            .toLowerCase();

                    return (

                        matchesSearch &&
                        matchesStatus &&
                        matchesDepartment &&
                        matchesDoctor &&
                        matchesDate

                    );

                }
            );

        }, [

            globalSearch,
            selectedStatus,
            selectedDepartment,
            selectedDoctor,
            selectedDate
        ]);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
        Purpose : Total Pages
    *********************************************/
    const totalPages = Math.ceil(
        filteredRequests.length /
        itemsPerPage
    );

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
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

            return filteredRequests.slice(
                startIndex,
                endIndex
            );

        }, [

            filteredRequests,
            currentPage,
            itemsPerPage,

        ]);

    /********************************************
        Name : Manish Kumar
        Date : 24/06/2026
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
        Date : 24/06/2026
        Purpose : Grid Columns
    *********************************************/
    const columns:
        ColumnActionRow<AdmissionRequestData>[] = [

            {
                key: "id",
                header: <>Patient ID</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "patientName",
                header: <>Name</>,
                className: "text-center text-nowrap",
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
                key: "requestDateTime",
                header: <>Request Date & Time</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "admissionDate",
                header: <>Admission Date</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "lengthOfStay",
                header: <>Length Of Stay</>,
                className: "text-center",
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "doctorName",
                header: <>Doctor Name</>,
                className: "text-center text-nowrap",
            },

            {
                key: "status",
                header: <>Status</>,
                className: "text-center",

                render: (row) => (

                    <div className="d-flex justify-content-center">

                        <span
                            className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Assigned"
                                ? "status-completed"
                                : "status-pending"
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

                        {row.status ===
                            "Assigned" ? (

                            <button
                                type="button"
                                className="eye"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="View Details"
                            >
                                <i className="fs-18 ri-eye-line"></i>
                            </button>

                        ) : (

                            <>

                                <button
                                    type="button"
                                    className="edit"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Assign Room & Bed"
                                    onClick={() => {

                                        setSelectedRow(
                                            row
                                        );

                                        setShowAssignModal(
                                            true
                                        );

                                    }}
                                >
                                    <i className="fs-18 ri-hotel-bed-line"></i>
                                </button>

                                <button
                                    type="button"
                                    className="delete"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Reject Request"
                                    onClick={() => {

                                        setSelectedRow(
                                            row
                                        );

                                        setShowRejectModal(
                                            true
                                        );

                                    }}
                                >
                                    <i className="fs-18 ri-close-circle-line"></i>
                                </button>

                            </>

                        )}

                    </div>

                ),
            },

        ];

    return (
        <>
            {/* Heading */}

            <h5 className="fs-18 fw-500 mt-1 mb-4">
                In Patient Admission Request
            </h5>

            {/* Filter Row */}
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

                            setCurrentPage(1);

                        }}
                    />

                    <button className="aph-search-btn outline-0">

                        <i className="ri-search-line"></i>

                    </button>

                </div>

                {/* Date Filter */}
                <div
                    className="aph-calendar-filter"
                    ref={calendarRef}
                >

                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() =>
                            setShowDateCalendar(
                                !showDateCalendar
                            )
                        }
                    >

                        <i className="ri-calendar-line"></i>

                        <span>

                            {selectedDate
                                ? `${String(
                                    selectedDate.getDate()
                                ).padStart(
                                    2,
                                    "0"
                                )}/${String(
                                    selectedDate.getMonth() + 1
                                ).padStart(
                                    2,
                                    "0"
                                )}/${selectedDate.getFullYear()}`
                                : "Date"}

                        </span>

                    </button>

                    {showDateCalendar && (

                        <div className="aph-calendar-popup">

                            <DateFilterCalendar
                                selectedDate={
                                    selectedDate
                                }
                                onDateSelect={(date) => {

                                    setSelectedDate(
                                        date
                                    );

                                    setShowDateCalendar(
                                        false
                                    );

                                    setCurrentPage(1);

                                }}
                            />

                        </div>

                    )}

                </div>


                {/* Status */}
                <div>

                    <CustomFilterDropdown
                        options={
                            STATUS_OPTIONS
                        }
                        value={
                            selectedStatus
                        }
                        placeholder="Status"
                        customClass="aph-filter-dropdown"
                        onChange={(
                            selected
                        ) => {

                            setSelectedStatus(
                                selected
                            );

                            setCurrentPage(
                                1
                            );

                        }}
                    />

                </div>

                {/* Department */}
                <div>

                    <CustomFilterDropdown
                        options={
                            DEPARTMENT_OPTIONS
                        }
                        value={
                            selectedDepartment
                        }
                        placeholder="Department"
                        customClass="aph-filter-dropdown"
                        onChange={(
                            selected
                        ) => {

                            setSelectedDepartment(
                                selected
                            );

                            setCurrentPage(
                                1
                            );

                        }}
                    />

                </div>

                {/* Doctor */}
                <div>

                    <CustomFilterDropdown
                        options={
                            DOCTOR_OPTIONS
                        }
                        value={
                            selectedDoctor
                        }
                        placeholder="Doctor"
                        customClass="aph-filter-dropdown"
                        onChange={(
                            selected
                        ) => {

                            setSelectedDoctor(
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
                        setSelectedDepartment(
                            null
                        );
                        setSelectedDoctor(
                            null
                        );
                        setSelectedDate(
                            null
                        );

                        setCurrentPage(1);

                    }}
                >

                    <i className="ri-filter-off-line"></i>

                </button>

            </div>

            {/* Grid Table */}
            <div className="d-flex flex-column">

                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                <Pagination
                    totalPages={
                        totalPages
                    }
                    currentPage={
                        currentPage
                    }
                    onPageChange={(
                        page
                    ) =>
                        setCurrentPage(
                            page
                        )
                    }
                    rowsPerPage={
                        itemsPerPage
                    }
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


            {/* Assign Room Modal */}
            <AssignRoomBedModal
                show={showAssignModal}
                handleClose={() =>
                    setShowAssignModal(
                        false
                    )
                }
                rowData={selectedRow}
            />

            {/* Reject Request Modal */}
            <RejectRequestModal
                show={showRejectModal}
                handleClose={() =>
                    setShowRejectModal(
                        false
                    )
                }
                rowData={selectedRow}
            />
        </>
    );
}


/********************************************
    Name : Manish Kumar
    Date : 24/06/2026
    Purpose : Assign Room & Bed Modal
*********************************************/
interface AssignRoomBedModalProps {
    show: boolean;
    handleClose: () => void;
    rowData: (
        Partial<Omit<AdmissionRequestData, "status">> & {
            status?: AdmissionRequestData["status"] | string;
            patientId?: string;
            roomNo?: string;
            bedNumber?: string;
        }
    ) | null;
}

export function AssignRoomBedModal({
    show,
    handleClose,
    rowData,
}: AssignRoomBedModalProps) {

    const [notes, setNotes] =
        useState("");

    const [selectedWard,
        setSelectedWard] =
        useState<DropdownOption | null>(null);
    const [reportFile, setReportFile] =
        useState<File | null>(null);

    const [selectedDepartment,
        setSelectedDepartment] =
        useState<DropdownOption | null>(null);

    const [selectedRoom,
        setSelectedRoom] =
        useState<DropdownOption | null>(null);

    const [selectedBed,
        setSelectedBed] =
        useState<DropdownOption | null>(null);

    const [selectedAdmissionDate,
        setSelectedAdmissionDate] =
        useState<Date | null>(new Date());

    const [showAdmissionDateCalendar,
        setShowAdmissionDateCalendar] =
        useState(false);

    const WARD_OPTIONS: DropdownOption[] = [
        {
            id: "general_ward_a",
            name: "General Ward A",
        },
        {
            id: "general_ward_b",
            name: "General Ward B",
        },
        {
            id: "icu_ward",
            name: "ICU Ward",
        },
        {
            id: "private_ward",
            name: "Private Ward",
        },
    ];

    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        {
            id: "cardiology",
            name: "Cardiology",
        },
        {
            id: "neurology",
            name: "Neurology",
        },
        {
            id: "orthopedics",
            name: "Orthopedics",
        },
        {
            id: "general",
            name: "General Medicine",
        },
    ];

    useEffect(() => {

        if (!show) {
            return;
        }

        const rowDepartment =
            rowData?.department
                ?.trim()
                .toLowerCase();

        const matchedDepartment =
            DEPARTMENT_OPTIONS.find(
                (option) =>
                    option.name
                        .trim()
                        .toLowerCase() ===
                    rowDepartment
            ) || null;

        setSelectedDepartment(
            matchedDepartment
        );

        const rowAdmissionDate =
            rowData?.admissionDate
                ?.trim();

        const [
            day,
            month,
            year,
        ] = rowAdmissionDate
            ? rowAdmissionDate.split("/")
            : [];

        const parsedAdmissionDate =
            day && month && year
                ? new Date(
                    Number(year),
                    Number(month) - 1,
                    Number(day)
                )
                : null;

        setSelectedAdmissionDate(
            parsedAdmissionDate &&
                !Number.isNaN(
                    parsedAdmissionDate.getTime()
                )
                ? parsedAdmissionDate
                : null
        );

    }, [
        rowData?.admissionDate,
        rowData?.department,
        show,
    ]);

    const ROOM_OPTIONS: DropdownOption[] = [
        {
            id: "room_101",
            name: "Room 101",
        },
        {
            id: "room_102",
            name: "Room 102",
        },
        {
            id: "room_201",
            name: "Room 201",
        },
        {
            id: "room_301",
            name: "Room 301",
        },
    ];

    const BED_OPTIONS: DropdownOption[] = [
        {
            id: "bed_1",
            name: "Bed 1",
        },
        {
            id: "bed_2",
            name: "Bed 2",
        },
        {
            id: "bed_3",
            name: "Bed 3",
        },
        {
            id: "bed_4",
            name: "Bed 4",
        },
    ];

    useEffect(() => {

        if (!show) {
            return;
        }

        const rowRoom =
            rowData?.roomNo
                ?.trim()
                .toLowerCase();

        const matchedRoom =
            ROOM_OPTIONS.find(
                (option) =>
                    option.name
                        .trim()
                        .toLowerCase() ===
                    rowRoom
            ) || null;

        const rowBed =
            rowData?.bedNumber
                ?.trim()
                .toLowerCase();

        const matchedBed =
            BED_OPTIONS.find(
                (option) =>
                    option.name
                        .trim()
                        .toLowerCase() ===
                    rowBed
            ) || null;

        setSelectedRoom(
            matchedRoom
        );

        setSelectedBed(
            matchedBed
        );

    }, [
        rowData?.bedNumber,
        rowData?.roomNo,
        show,
    ]);

    const handleReportUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];

        if (file) {

            setReportFile(file);

        }

    };

    const handleSave = () => {

        const payload = {

            patientName:
                rowData?.patientName,

            phoneNumber:
                rowData?.phoneNumber,

            doctor:
                rowData?.doctorName,

            ageGender:
                rowData?.ageGender,

            admissionType:
                rowData?.admissionType,

            lengthOfStay:
                rowData?.lengthOfStay,

            ward:
                selectedWard,

            department:
                selectedDepartment,

            room:
                selectedRoom,

            bed:
                selectedBed,

            admissionDate:
                selectedAdmissionDate,

            report:
                reportFile,

            notes,
        };

        console.log(
            "Assign Room & Bed :",
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

                    <Modal.Title className="fs-18 fw-400">
                        Assign Room & Bed
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <form>

                        {/* Row 1 */}
                        <div className="formRow d-flex">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Patient Name{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={
                                            rowData?.patientName || ""
                                        }
                                        disabled
                                    />

                                    <i className="ri-user-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Phone Number{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={
                                            rowData?.phoneNumber || ""
                                        }
                                        disabled
                                    />

                                    <i className="ri-phone-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Doctor{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={
                                            rowData?.doctorName || ""
                                        }
                                        disabled
                                    />

                                    <i className="ri-stethoscope-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* Row 2 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Age / Gender{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={
                                            rowData?.ageGender || ""
                                        }
                                        disabled
                                    />

                                    <i className="ri-user-star-line"></i>

                                </div>

                            </div>

                            {/* Report */}
                            <div className="formGroup">

                                <label className="customLabel">
                                    Report{" "}<span className="text-danger">*</span>
                                </label>

                                <div
                                    className="inputWrapper"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        document
                                            .getElementById("reportFile")
                                            ?.click()
                                    }
                                >

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={
                                            reportFile?.name || ""
                                        }
                                        placeholder="Select Report File"
                                        disabled
                                    />

                                    <i className="ri-attachment-2"></i>

                                </div>

                                <input
                                    id="reportFile"
                                    type="file"
                                    hidden
                                    onChange={handleReportUpload}
                                />

                            </div>

                        </div>

                        {/* Row 3 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Ward Name{" "}<span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={WARD_OPTIONS}
                                    value={selectedWard}
                                    onChange={(value) =>
                                        setSelectedWard(value)
                                    }
                                    placeholder="Select Ward"
                                />

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Department{" "}<span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={DEPARTMENT_OPTIONS}
                                    value={selectedDepartment}
                                    onChange={(value) =>
                                        setSelectedDepartment(value)
                                    }
                                    placeholder="Select Department"
                                />

                            </div>

                        </div>

                        {/* Row 4 */}
                        <div className="formRow d-flex">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Admission Type{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={
                                            rowData?.admissionType || ""
                                        }
                                        disabled
                                    />

                                    <i className="ri-hospital-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Expected Admission Date{" "}<span className="text-danger">*</span>
                                </label>

                                <div style={{ position: "relative" }}>

                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() =>
                                            setShowAdmissionDateCalendar(
                                                !showAdmissionDateCalendar
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >

                                        {selectedAdmissionDate
                                            ? `${String(
                                                selectedAdmissionDate.getDate()
                                            ).padStart(2, "0")}/${String(
                                                selectedAdmissionDate.getMonth() + 1
                                            ).padStart(2, "0")}/${selectedAdmissionDate.getFullYear()}`
                                            : "DD/MM/YYYY"}

                                    </div>

                                    <i
                                        className="ri-calendar-line"
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                        }}
                                    ></i>

                                    {showAdmissionDateCalendar && (

                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                            }}
                                        >

                                            <DateFilterCalendar
                                                selectedDate={
                                                    selectedAdmissionDate
                                                }
                                                onDateSelect={(date) => {

                                                    setSelectedAdmissionDate(
                                                        date
                                                    );

                                                    setShowAdmissionDateCalendar(
                                                        false
                                                    );

                                                }}
                                            />

                                        </div>

                                    )}

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Length Of Stay{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={
                                            rowData?.lengthOfStay || ""
                                        }
                                        disabled
                                    />

                                    <i className="ri-time-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* Row 5 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Room{" "}<span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={ROOM_OPTIONS}
                                    value={selectedRoom}
                                    onChange={(value) =>
                                        setSelectedRoom(value)
                                    }
                                    placeholder="Select Room"
                                />

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Bed{" "}<span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={BED_OPTIONS}
                                    value={selectedBed}
                                    onChange={(value) =>
                                        setSelectedBed(value)
                                    }
                                    placeholder="Select Bed"
                                />

                            </div>

                        </div>

                        {/* Row 6 */}
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
                        <div className="d-flex justify-content-between mt-3">

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleSave}
                            >
                                Save & Send to Accountant
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

/********************************************
    Name : Manish Kumar
    Date : 24/06/2026
    Purpose : Reject Request Modal
*********************************************/
interface RejectRequestModalProps {
    show: boolean;
    handleClose: () => void;
    rowData: AdmissionRequestData | null;
}

function RejectRequestModal({
    show,
    handleClose,
}: RejectRequestModalProps) {

    const [reason, setReason] =
        useState("");

    const handleReject = () => {

        console.log(
            "Request Rejected :",
            reason
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

                <Modal.Header className="aph-modal-header">

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

                    <Modal.Title className="fs-18 fw-400">
                        Request Rejection
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <form>

                        <div className="text-center">
                            <img src="/Assets/Icons/RequestRejection.svg" alt="RequestRejection" />
                            <p className="text-muted fs-16 mt-2 fw-500">Are you sure you want to deny this request?</p>
                        </div>

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Rejection Reason
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        value={reason}
                                        onChange={(e) =>
                                            setReason(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter Rejection Reason"
                                    />

                                    <i className="ri-close-circle-line"></i>

                                </div>

                            </div>

                        </div>

                        <div className="d-flex justify-content-between mt-3">

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 text-white fs-18 fw-400"
                                style={{ backgroundColor: "#E12121" }}
                                onClick={handleReject}
                            >
                                Confirm and  Send to Doctor
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border outline-0 col-md-4 text-white bg-secondary fs-18 fw-400"
                                onClick={handleClose}
                            >
                                Go Back
                            </button>

                        </div>

                    </form>

                </Modal.Body>

            </Modal>
        </>
    );
}
