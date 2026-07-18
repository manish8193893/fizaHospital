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

interface RadiologyData {
    id: string;
    visitId: string;
    radiologyDate: string;
    doctor: string;
    scanName: string;
    bodyPartName: string;
    reportName: string;
}

export default function Radiology() {

    const [globalSearch, setGlobalSearch] = useState("");

    const [selectedDoctor, setSelectedDoctor] =
        useState<DropdownOption | null>(null);

    const [selectedDate, setSelectedDate] =
        useState<Date | null>(null);

    const [showCalendar, setShowCalendar] =
        useState(false);

    const calendarRef =
        useRef<HTMLDivElement>(null);

    const [showModal, setShowModal] =
        useState(false);

    const doctorOptions: DropdownOption[] = [
        {
            id: "1",
            name: "Dr. Rajesh Sharma",
        },
        {
            id: "2",
            name: "Dr. Priya Gupta",
        },
        {
            id: "3",
            name: "Dr. Amit Verma",
        },
        {
            id: "4",
            name: "Dr. Neha Singh",
        },
    ];

    const ALL_RADIOLOGY_DATA: RadiologyData[] = [
        {
            id: "1",
            visitId: "VIS-001",
            radiologyDate: "2026-06-01",
            doctor: "Dr. Rajesh Sharma",
            scanName: "CT Scan",
            bodyPartName: "Head",
            reportName: "CT_Head_Report.pdf",
        },
        {
            id: "2",
            visitId: "VIS-002",
            radiologyDate: "2026-06-03",
            doctor: "Dr. Priya Gupta",
            scanName: "MRI",
            bodyPartName: "Spine",
            reportName: "MRI_Spine_Report.pdf",
        },
        {
            id: "3",
            visitId: "VIS-003",
            radiologyDate: "2026-06-05",
            doctor: "Dr. Amit Verma",
            scanName: "X-Ray",
            bodyPartName: "Chest",
            reportName: "Chest_Xray.pdf",
        },
        {
            id: "4",
            visitId: "VIS-004",
            radiologyDate: "2026-06-06",
            doctor: "Dr. Neha Singh",
            scanName: "Ultrasound",
            bodyPartName: "Abdomen",
            reportName: "USG_Abdomen.pdf",
        },
        {
            id: "5",
            visitId: "VIS-005",
            radiologyDate: "2026-06-08",
            doctor: "Dr. Rajesh Sharma",
            scanName: "MRI",
            bodyPartName: "Knee",
            reportName: "MRI_Knee_Report.pdf",
        },
        {
            id: "6",
            visitId: "VIS-006",
            radiologyDate: "2026-06-09",
            doctor: "Dr. Priya Gupta",
            scanName: "CT Scan",
            bodyPartName: "Chest",
            reportName: "CT_Chest_Report.pdf",
        },
        {
            id: "7",
            visitId: "VIS-007",
            radiologyDate: "2026-06-11",
            doctor: "Dr. Amit Verma",
            scanName: "PET Scan",
            bodyPartName: "Whole Body",
            reportName: "PET_Report.pdf",
        },
        {
            id: "8",
            visitId: "VIS-008",
            radiologyDate: "2026-06-12",
            doctor: "Dr. Neha Singh",
            scanName: "Mammography",
            bodyPartName: "Breast",
            reportName: "Mammography_Report.pdf",
        },
    ];

    const handleDateSelect = (
        date: Date | null
    ) => {

        setSelectedDate(date);

        setShowCalendar(false);

        setCurrentPage(1);

    };

    const [currentPage, setCurrentPage] =
        useState(1);

    const [itemsPerPage, setItemsPerPage] =
        useState(10);

    const filteredData = useMemo(() => {

        return ALL_RADIOLOGY_DATA.filter(
            (item) => {

                const searchValue =
                    globalSearch.toLowerCase();

                const matchesSearch =
                    item.visitId
                        .toLowerCase()
                        .includes(searchValue) ||
                    item.doctor
                        .toLowerCase()
                        .includes(searchValue) ||
                    item.scanName
                        .toLowerCase()
                        .includes(searchValue) ||
                    item.bodyPartName
                        .toLowerCase()
                        .includes(searchValue);

                const matchesDoctor =
                    !selectedDoctor ||
                    item.doctor ===
                    selectedDoctor.name;

                const matchesDate =
                    !selectedDate ||
                    item.radiologyDate ===
                    `${selectedDate.getFullYear()}-${String(
                        selectedDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(
                        selectedDate.getDate()
                    ).padStart(2, "0")}`;

                return (
                    matchesSearch &&
                    matchesDoctor &&
                    matchesDate
                );

            }
        );

    }, [
        globalSearch,
        selectedDoctor,
        selectedDate,
    ]);

    const totalPages = Math.ceil(
        filteredData.length /
        itemsPerPage
    );

    const visibleData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        return filteredData.slice(
            startIndex,
            startIndex +
            itemsPerPage
        );

    }, [
        filteredData,
        currentPage,
        itemsPerPage,
    ]);

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

    }, [visibleData]);

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
                setShowCalendar(false);
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

    const columns: ColumnActionRow<RadiologyData>[] = [

        {
            key: "visitId",
            header: <>Visit ID</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "radiologyDate",
            header: <>Radiology Date</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "doctor",
            header: <>Doctor</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "scanName",
            header: <>Scan Name</>,
            className: "text-center",
        },

        {
            key: "bodyPartName",
            header: <>Body Part Name</>,
            className: "text-center",
        },

        {
            key: "reportName",
            header: <>Report</>,
            className: "text-center",

            render: (row) => (
                <span className="text-primary" style={{ cursor: "pointer" }}>{row.reportName}</span>
            ),
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",

            render: () => (
                <button
                    type="button"
                    className="eye"
                    data-bs-toggle="tooltip"
                    data-bs-title="View Report"
                >
                    <i className="ri-file-list-3-line fs-18"></i>
                </button>
            ),
        },

    ];

    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedDoctor(null);
        setSelectedDate(null);
        setCurrentPage(1);

    };

    return (
        <>
            <div
                className="d-flex justify-content-between align-items-center gap-4 mt-2 mb-3"
                style={{ maxHeight: "45px" }}
            >
                <p className="fs-18 fw-500">
                    Radiology
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        setShowModal(true)
                    }
                >
                    <div className="text-white fs-14 fw-400">
                        Add Scan
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
                        options={doctorOptions}
                        value={selectedDoctor}
                        placeholder="Doctor"
                        customClass="aph-filter-dropdown"
                        onChange={(value) => {

                            setSelectedDoctor(
                                value
                            );

                            setCurrentPage(1);

                        }}
                    />

                </div>

                <div
                    className="aph-calendar-filter"
                    ref={calendarRef}
                >

                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() =>
                            setShowCalendar(
                                !showCalendar
                            )
                        }
                    >
                        <i className="ri-calendar-line"></i>

                        <span>
                            {selectedDate
                                ? `${String(
                                    selectedDate.getDate()
                                ).padStart(2, "0")}/${String(
                                    selectedDate.getMonth() + 1
                                ).padStart(2, "0")}/${selectedDate.getFullYear()}`
                                : "Date"}
                        </span>

                    </button>

                    {showCalendar && (

                        <div className="aph-calendar-popup">

                            <DateFilterCalendar
                                selectedDate={selectedDate}
                                onDateSelect={
                                    handleDateSelect
                                }
                            />

                        </div>

                    )}

                </div>

                <button
                    className="aph-filter-btn outline-0"
                    onClick={
                        handleResetFilters
                    }
                >
                    <i className="ri-filter-off-line"></i>
                </button>

            </div>

            <GlobalGridTable
                data={visibleData}
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
                onRowsPerPageChange={(
                    rows
                ) => {

                    setItemsPerPage(
                        rows
                    );

                    setCurrentPage(1);

                }}
            />

            <RadiologyModal
                show={showModal}
                handleClose={() =>
                    setShowModal(false)
                }
            />
        </>
    );
}

interface RadiologyModalProps {
    show: boolean;
    handleClose: () => void;
}

export function RadiologyModal({
    show,
    handleClose,
}: RadiologyModalProps) {

    const [selectedScan, setSelectedScan] =
        useState<DropdownOption | null>(null);

    const [selectedBodyPart, setSelectedBodyPart] =
        useState<DropdownOption | null>(null);

    const [selectedScanDate, setSelectedScanDate] =
        useState<Date | null>(null);

    const [showScanDateCalendar, setShowScanDateCalendar] =
        useState(false);

    const [file, setFile] =
        useState<File | null>(null);

    const SCAN_OPTIONS: DropdownOption[] = [
        {
            id: "1",
            name: "CT Scan",
        },
        {
            id: "2",
            name: "MRI",
        },
        {
            id: "3",
            name: "X-Ray",
        },
        {
            id: "4",
            name: "Ultrasound",
        },
        {
            id: "5",
            name: "PET Scan",
        },
    ];

    const BODY_PART_OPTIONS: DropdownOption[] = [
        {
            id: "1",
            name: "Head",
        },
        {
            id: "2",
            name: "Chest",
        },
        {
            id: "3",
            name: "Abdomen",
        },
        {
            id: "4",
            name: "Spine",
        },
        {
            id: "5",
            name: "Knee",
        },
    ];

    const handleFileSelect = (
        selectedFile: File
    ) => {

        setFile(selectedFile);

    };

    const handleSave = () => {

        const payload = {

            scanName:
                selectedScan,

            bodyPartName:
                selectedBodyPart,

            scanDate:
                selectedScanDate,

            file,

        };

        console.log(
            "Save Scan Data :",
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
                    Add Scan
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Scan Name
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={SCAN_OPTIONS}
                                value={selectedScan}
                                onChange={(value) =>
                                    setSelectedScan(
                                        value
                                    )
                                }
                                placeholder="Select Scan"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Body Part Name
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={
                                    BODY_PART_OPTIONS
                                }
                                value={
                                    selectedBodyPart
                                }
                                onChange={(value) =>
                                    setSelectedBodyPart(
                                        value
                                    )
                                }
                                placeholder="Select Body Part"
                            />

                        </div>

                    </div>

                    {/* ROW 2 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Date Of Scan
                                <span className="text-danger">*</span>
                            </label>

                            <div
                                style={{
                                    position:
                                        "relative",
                                }}
                            >

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowScanDateCalendar(
                                            !showScanDateCalendar
                                        )
                                    }
                                    style={{
                                        cursor:
                                            "pointer",
                                    }}
                                >

                                    {selectedScanDate
                                        ? `${String(
                                            selectedScanDate.getDate()
                                        ).padStart(2, "0")}/${String(
                                            selectedScanDate.getMonth() + 1
                                        ).padStart(2, "0")}/${selectedScanDate.getFullYear()}`
                                        : "DD/MM/YYYY"}

                                </div>

                                <i
                                    className="ri-calendar-line"
                                    style={{
                                        position:
                                            "absolute",
                                        right:
                                            "15px",
                                        top:
                                            "50%",
                                        transform:
                                            "translateY(-50%)",
                                        pointerEvents:
                                            "none",
                                        zIndex: 2,
                                    }}
                                ></i>

                                {showScanDateCalendar && (

                                    <div
                                        style={{
                                            position:
                                                "absolute",
                                            top:
                                                "100%",
                                            left: 0,
                                            zIndex:
                                                1000,
                                            marginTop:
                                                "4px",
                                        }}
                                    >

                                        <DateFilterCalendar
                                            selectedDate={
                                                selectedScanDate
                                            }
                                            onDateSelect={(
                                                date
                                            ) => {

                                                setSelectedScanDate(
                                                    date
                                                );

                                                setShowScanDateCalendar(
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
                                Upload File
                                <span className="text-danger">*</span>
                            </label>

                            <div
                                className="uploadBox"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "radiologyFile"
                                        )
                                        ?.click()
                                }
                            >

                                {file ? (

                                    <span>
                                        {
                                            file.name
                                        }
                                    </span>

                                ) : (

                                    <p>
                                        Upload File
                                    </p>

                                )}

                            </div>

                            <input
                                id="radiologyFile"
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                style={{
                                    display:
                                        "none",
                                }}
                                onChange={(e) =>
                                    e.target
                                        .files &&
                                    handleFileSelect(
                                        e.target
                                            .files[0]
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="d-flex justify-content-between mt-5">

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-6 bg-blue text-white fs-18 fw-400"
                            onClick={handleSave}
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-5 border-red text-red bg-white fs-18 fw-400"
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