import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";
import { Modal } from "react-bootstrap";

import Pagination from "../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../GlobalHelpers/CustomFilterDropdown";
import CustomFormDropdown, {
    type DropdownOption,
} from "../../GlobalHelpers/CustomFormDropdown";

import GlobalGridTable, {
    type ColumnActionRow,
} from "../../GlobalHelpers/GlobalGridTable";



import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";

interface LabResultData {
    id: string;
    visitNo: string;
    testDate: string;
    doctor: string;
    testResult: string;
    status: "Complete" | "Pending";
}

export default function PatientsLabResults() {

    const [globalSearch, setGlobalSearch] = useState("");

    const [selectedDoctor, setSelectedDoctor] = useState<DropdownOption | null>(null);

    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [showCalendar, setShowCalendar] = useState(false);

    const calendarRef = useRef<HTMLDivElement>(null);

    const [showModal, setShowModal] = useState(false);

    const doctorOptions: DropdownOption[] = [
        { id: "1", name: "Dr. Rajesh Sharma" },
        { id: "2", name: "Dr. Priya Gupta" },
        { id: "3", name: "Dr. Amit Verma" },
        { id: "4", name: "Dr. Neha Singh" },
    ];

    const statusOptions: DropdownOption[] = [
        { id: "complete", name: "Complete" },
        { id: "pending", name: "Pending" },
    ];

    const ALL_LAB_RESULTS: LabResultData[] = [
        {
            id: "1",
            visitNo: "VIS-001",
            testDate: "2026-06-01",
            doctor: "Dr. Rajesh Sharma",
            testResult: "Blood Test",
            status: "Complete",
        },
        {
            id: "2",
            visitNo: "VIS-002",
            testDate: "2026-06-03",
            doctor: "Dr. Priya Gupta",
            testResult: "Urine Test",
            status: "Pending",
        },
        {
            id: "3",
            visitNo: "VIS-003",
            testDate: "2026-06-05",
            doctor: "Dr. Amit Verma",
            testResult: "CBC Report",
            status: "Complete",
        },
        {
            id: "4",
            visitNo: "VIS-004",
            testDate: "2026-06-06",
            doctor: "Dr. Neha Singh",
            testResult: "Liver Function Test",
            status: "Pending",
        },
        {
            id: "5",
            visitNo: "VIS-005",
            testDate: "2026-06-08",
            doctor: "Dr. Rajesh Sharma",
            testResult: "Kidney Profile",
            status: "Complete",
        },
        {
            id: "6",
            visitNo: "VIS-006",
            testDate: "2026-06-09",
            doctor: "Dr. Priya Gupta",
            testResult: "Blood Sugar",
            status: "Pending",
        },
        {
            id: "7",
            visitNo: "VIS-007",
            testDate: "2026-06-11",
            doctor: "Dr. Amit Verma",
            testResult: "Thyroid Test",
            status: "Complete",
        },
        {
            id: "8",
            visitNo: "VIS-008",
            testDate: "2026-06-12",
            doctor: "Dr. Neha Singh",
            testResult: "Vitamin D",
            status: "Pending",
        },
    ];

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date);
        setShowCalendar(false);
        setCurrentPage(1);
    };


    const [currentPage, setCurrentPage] =
        useState(1);

    const [itemsPerPage, setItemsPerPage] =
        useState(10);

    const filteredData = useMemo(() => {

        return ALL_LAB_RESULTS.filter((item) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                item.visitNo.toLowerCase().includes(searchValue) ||
                item.doctor.toLowerCase().includes(searchValue) ||
                item.testResult.toLowerCase().includes(searchValue);

            const matchesDoctor =
                !selectedDoctor ||
                item.doctor === selectedDoctor.name;

            const matchesStatus =
                !selectedStatus ||
                item.status === selectedStatus.name;

            const matchesDate =
                !selectedDate ||
                item.testDate ===
                `${selectedDate.getFullYear()}-${String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0")}-${String(
                    selectedDate.getDate()
                ).padStart(2, "0")}`;

            return (
                matchesSearch &&
                matchesDoctor &&
                matchesStatus &&
                matchesDate
            );

        });

    }, [
        globalSearch,
        selectedDoctor,
        selectedStatus,
        selectedDate,
    ]);

    const totalPages = Math.ceil(
        filteredData.length / itemsPerPage
    );

    const visibleData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        return filteredData.slice(
            startIndex,
            startIndex + itemsPerPage
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

    }, [visibleData]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const columns: ColumnActionRow<LabResultData>[] = [

        {
            key: "visitNo",
            header: <>Visit No</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "testDate",
            header: <>Test Date</>,
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
            key: "testResult",
            header: <>Test Result</>,
            className: "text-center",
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",

            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Complete"
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
        setSelectedStatus(null);
        setSelectedDate(null);
        setCurrentPage(1);

    };

    return (
        <>
            <div
                className="d-flex justify-content-between align-items-center gap-4 mt-2 mb-3"
                style={{ maxHeight: "45px" }}
            >
                <p className="fs-18 fw-500">Lab Results</p>

                <div className="Plus-btn" onClick={() => setShowModal(true)}>
                    <div className="text-white fs-14 fw-400">Add Test</div>
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
                        options={doctorOptions}
                        value={selectedDoctor}
                        placeholder="Doctor"
                        customClass="aph-filter-dropdown"
                        onChange={(value) => {
                            setSelectedDoctor(value);
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
                        onChange={(value) => {
                            setSelectedStatus(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Date Filter */}
                <div className="aph-calendar-filter" ref={calendarRef}>
                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <i className="ri-calendar-line"></i>
                        <span>
                            {selectedDate
                                ? `${String(selectedDate.getDate()).padStart(2, "0")}/${String(selectedDate.getMonth() + 1).padStart(2, "0")}/${selectedDate.getFullYear()}`
                                : "Date"}
                        </span>
                    </button>

                    {showCalendar && (
                        <div className="aph-calendar-popup">
                            <DateFilterCalendar
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                            />
                        </div>
                    )}
                </div>


                <button
                    className="aph-filter-btn outline-0"
                    onClick={handleResetFilters}
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
                onRowsPerPageChange={(rows) => {
                    setItemsPerPage(rows);
                    setCurrentPage(1);
                }}
            />

            <LabResultModal
                show={showModal}
                handleClose={() =>
                    setShowModal(false)
                }
            />
        </>
    );
}

interface LabResultModalProps {
    show: boolean;
    handleClose: () => void;
}

export function LabResultModal({
    show,
    handleClose,
}: LabResultModalProps) {

    const [selectedTest, setSelectedTest] = useState<DropdownOption | null>(null);

    const [testDate, setTestDate] = useState("");

    const [file, setFile] = useState<File | null>(null);

    const [selectedTestDate, setSelectedTestDate] = useState<Date | null>(null);

    const [showTestDateCalendar, setShowTestDateCalendar] = useState(false);

    const TEST_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Blood Test" },
        { id: "2", name: "Urine Test" },
        { id: "3", name: "CBC Report" },
        { id: "4", name: "Thyroid Test" },
        { id: "5", name: "Vitamin D Test" },
    ];

    const handleFileSelect = (
        selectedFile: File
    ) => {
        setFile(selectedFile);
    };

    const handleSave = () => {

        const payload = {
            testName: selectedTest,
            testDate,
            file,
        };

        console.log(
            "Save Test Data :",
            payload
        );

        handleClose();

    };

    const handleSaveAndNew = () => {

        const payload = {
            testName: selectedTest,
            testDate: selectedTestDate,
            file,
        };

        console.log(
            "Save & New Test Data :",
            payload
        );

        setSelectedTest(null);
        setTestDate("");
        setFile(null);

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
                    Add Test
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    {/* ROW 1 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Test Name
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={TEST_OPTIONS}
                                value={selectedTest}
                                onChange={(value) =>
                                    setSelectedTest(value)
                                }
                                placeholder="Select Test"
                            />

                        </div>

                    </div>

                    {/* ROW 2 */}

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Date Of Test{" "}
                                <span className="text-danger">*</span>
                            </label>

                            <div style={{ position: "relative" }}>

                                <div
                                    className="customInput d-flex align-items-center"
                                    onClick={() =>
                                        setShowTestDateCalendar(
                                            !showTestDateCalendar
                                        )
                                    }
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    {selectedTestDate
                                        ? `${String(
                                            selectedTestDate.getDate()
                                        ).padStart(2, "0")}/${String(
                                            selectedTestDate.getMonth() + 1
                                        ).padStart(2, "0")}/${selectedTestDate.getFullYear()}`
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
                                        zIndex: 2,
                                    }}
                                ></i>

                                {showTestDateCalendar && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            zIndex: 1000,
                                            marginTop: "4px",
                                        }}
                                    >
                                        <DateFilterCalendar
                                            selectedDate={
                                                selectedTestDate
                                            }
                                            onDateSelect={(date) => {

                                                setSelectedTestDate(
                                                    date
                                                );

                                                setShowTestDateCalendar(
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
                                            "labResultFile"
                                        )
                                        ?.click()
                                }
                            >
                                {file ? (
                                    <span>
                                        {file.name}
                                    </span>
                                ) : (
                                    <p>
                                        Upload File
                                    </p>
                                )}
                            </div>

                            <input
                                id="labResultFile"
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                style={{
                                    display: "none",
                                }}
                                onChange={(e) =>
                                    e.target.files &&
                                    handleFileSelect(
                                        e.target.files[0]
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="d-flex justify-content-between mt-5">

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-3 bg-blue text-white fs-18 fw-400"
                            onClick={handleSave}
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-5 border-blue text-blue bg-white fs-18 fw-400"
                            onClick={handleSaveAndNew}
                        >
                            Save & New
                        </button>

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-3 border-red text-red bg-white fs-18 fw-400"
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