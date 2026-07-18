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
    Purpose : Biometric Settings Grid
*********************************************/
interface BiometricSettingsTableData {
    id: string;
    autoSyncInterval: string;
    defaultWorkHours: string;
    lateThreshold: string;
    overtimeCalculation: string;
    status: "Active" | "Not Active";
}

export default function BiometricSettings() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showBiometricSettingsModal, setShowBiometricSettingsModal] =
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
    const ALL_BIOMETRIC_SETTINGS_DATA: BiometricSettingsTableData[] = [

        {
            id: "BS001",
            autoSyncInterval: "Every 15 Minutes",
            defaultWorkHours: "8 Hours / Day",
            lateThreshold: "15 Minutes",
            overtimeCalculation: "After 8 Hours",
            status: "Active",
        },

        {
            id: "BS002",
            autoSyncInterval: "Every 30 Minutes",
            defaultWorkHours: "8 Hours / Day",
            lateThreshold: "10 Minutes",
            overtimeCalculation: "After 8 Hours",
            status: "Active",
        },

        {
            id: "BS003",
            autoSyncInterval: "Every 1 Hour",
            defaultWorkHours: "9 Hours / Day",
            lateThreshold: "20 Minutes",
            overtimeCalculation: "After 9 Hours",
            status: "Not Active",
        },

        {
            id: "BS004",
            autoSyncInterval: "Every 45 Minutes",
            defaultWorkHours: "8 Hours / Day",
            lateThreshold: "30 Minutes",
            overtimeCalculation: "After 8 Hours",
            status: "Active",
        },

        {
            id: "BS005",
            autoSyncInterval: "Every 2 Hours",
            defaultWorkHours: "10 Hours / Day",
            lateThreshold: "15 Minutes",
            overtimeCalculation: "After 10 Hours",
            status: "Not Active",
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
        Purpose : Filtered Biometric Settings
    *********************************************/
    const filteredBiometricSettings =
        useMemo(() => {

            return ALL_BIOMETRIC_SETTINGS_DATA.filter(
                (setting) => {

                    const searchValue =
                        globalSearch.toLowerCase();

                    const matchesSearch =
                        setting.autoSyncInterval
                            .toLowerCase()
                            .includes(searchValue) ||

                        setting.defaultWorkHours
                            .toLowerCase()
                            .includes(searchValue) ||

                        setting.lateThreshold
                            .toLowerCase()
                            .includes(searchValue) ||

                        setting.overtimeCalculation
                            .toLowerCase()
                            .includes(searchValue);

                    const matchesStatus =
                        !selectedStatus ||
                        setting.status.toLowerCase() ===
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
        filteredBiometricSettings.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredBiometricSettings.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredBiometricSettings,
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
    const columns: ColumnActionRow<BiometricSettingsTableData>[] = [

        {
            key: "autoSyncInterval",
            header: <>Auto Sync Interval</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "defaultWorkHours",
            header: <>Default Work Hours</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "lateThreshold",
            header: <>Late Threshold</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "overtimeCalculation",
            header: <>Overtime Calculation</>,
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
            width: "180px",

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
            {/* Biometric Settings Heading and Button */}

            <div
                className="d-flex justify-content-between align-items-center gap-4 mt-4 mb-4"
                style={{ maxHeight: "45px" }}
            >
                <p className="fs-18 fw-500">
                    Biometric Settings
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        setShowBiometricSettingsModal(true)
                    }
                >
                    <div className="text-white fs-14 fw-400">
                        New Biometric Setting
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

            <BiometricSettingsModal
                show={showBiometricSettingsModal}
                handleClose={() =>
                    setShowBiometricSettingsModal(false)
                }
            />

        </>
    );
}

import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

interface BiometricSettingsModalProps {
    show: boolean;
    handleClose: () => void;
}

export function BiometricSettingsModal({
    show,
    handleClose,
}: BiometricSettingsModalProps) {

    /********************************************
       FORM STATE
    *********************************************/
    const [autoSyncInterval, setAutoSyncInterval] =
        useState("");

    const [defaultWorkHours, setDefaultWorkHours] =
        useState("");

    const [lateThreshold, setLateThreshold] =
        useState("");

    const [overtimeCalculation, setOvertimeCalculation] =
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
            autoSyncInterval,
            defaultWorkHours,
            lateThreshold,
            overtimeCalculation,
            status: selectedStatus,
        };

        console.log(
            "Biometric Settings Data :",
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
                        New Biometric Setting
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="p-0">

                    <form>

                        {/* ROW 1 */}

                        <div className="formRow d-flex">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Auto Sync Interval{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Auto Sync Interval"
                                        value={autoSyncInterval}
                                        onChange={(e) =>
                                            setAutoSyncInterval(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-refresh-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Default Work Hours{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Default Work Hours"
                                        value={defaultWorkHours}
                                        onChange={(e) =>
                                            setDefaultWorkHours(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-time-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Late Threshold{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Late Threshold"
                                        value={lateThreshold}
                                        onChange={(e) =>
                                            setLateThreshold(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-alarm-warning-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* ROW 2 */}

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Overtime Calculation{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Overtime Calculation"
                                        value={overtimeCalculation}
                                        onChange={(e) =>
                                            setOvertimeCalculation(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-timer-line"></i>

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