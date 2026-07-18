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
    Purpose : Biometric Devices Grid
*********************************************/
interface BiometricDeviceTableData {
    deviceId: string;
    deviceName: string;
    ipAddress: string;
    port: string;
    deviceType: string;
    status: "Connected" | "Disconnected";
}

export default function BiometricDevices() {

    const [globalSearch, setGlobalSearch] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    const [showBiometricDeviceModal, setShowBiometricDeviceModal] =
        useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        {
            id: "connected",
            name: "Connected",
        },
        {
            id: "disconnected",
            name: "Disconnected",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_BIOMETRIC_DEVICE_DATA: BiometricDeviceTableData[] = [

        {
            deviceId: "DEV001",
            deviceName: "Main Entrance Scanner",
            ipAddress: "192.168.1.10",
            port: "4370",
            deviceType: "Fingerprint Scanner",
            status: "Connected",
        },

        {
            deviceId: "DEV002",
            deviceName: "HR Department Device",
            ipAddress: "192.168.1.11",
            port: "4370",
            deviceType: "Fingerprint Scanner",
            status: "Connected",
        },

        {
            deviceId: "DEV003",
            deviceName: "Reception Device",
            ipAddress: "192.168.1.12",
            port: "4370",
            deviceType: "Face Recognition Device",
            status: "Disconnected",
        },

        {
            deviceId: "DEV004",
            deviceName: "Warehouse Scanner",
            ipAddress: "192.168.1.13",
            port: "4370",
            deviceType: "Fingerprint Scanner",
            status: "Connected",
        },

        {
            deviceId: "DEV005",
            deviceName: "Branch Office Device",
            ipAddress: "192.168.1.14",
            port: "4370",
            deviceType: "Face Recognition Device",
            status: "Disconnected",
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
        Purpose : Filtered Devices
    *********************************************/
    const filteredDevices = useMemo(() => {

        return ALL_BIOMETRIC_DEVICE_DATA.filter(
            (device) => {

                const searchValue =
                    globalSearch.toLowerCase();

                const matchesSearch =
                    device.deviceId
                        .toLowerCase()
                        .includes(searchValue) ||

                    device.deviceName
                        .toLowerCase()
                        .includes(searchValue) ||

                    device.ipAddress
                        .toLowerCase()
                        .includes(searchValue) ||

                    device.deviceType
                        .toLowerCase()
                        .includes(searchValue);

                const matchesStatus =
                    !selectedStatus ||
                    device.status.toLowerCase() ===
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
        filteredDevices.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredDevices.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredDevices,
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
    const columns: ColumnActionRow<BiometricDeviceTableData>[] = [

        {
            key: "deviceId",
            header: <>Device ID</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "deviceName",
            header: <>Device Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "ipAddress",
            header: <>IP Address</>,
            className: "text-center",
        },

        {
            key: "port",
            header: <>Port</>,
            className: "text-center",
        },

        {
            key: "deviceType",
            header: <>Device Type</>,
            className: "text-center",
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",

            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Connected"
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
            width: "260px",

            render: (row) => (
                <div className="d-flex justify-content-center gap-2 flex-wrap">

                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Sync Data"
                        onClick={() =>
                            console.log(
                                "Sync Data:",
                                row.deviceId
                            )
                        }
                    >
                        <i className="fs-18 ri-refresh-line"></i>
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
                                row.deviceId
                            )
                        }
                    >
                        <i className="fs-18 ri-pencil-ai-line"></i>
                    </button>

                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Connect"
                        onClick={() =>
                            console.log(
                                "Connect:",
                                row.deviceId
                            )
                        }
                    >
                        <i className="fs-18 ri-links-line"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Disconnect"
                        onClick={() =>
                            console.log(
                                "Disconnect:",
                                row.deviceId
                            )
                        }
                    >
                        <i className="fs-18 ri-plug-line"></i>
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
            {/* Biometric Devices Heading and Button */}
            <div
                className="d-flex justify-content-between align-items-center gap-4 mt-4 mb-4"
                style={{ maxHeight: "45px" }}
            >
                <p className="fs-18 fw-500">
                    Biometric Devices
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        setShowBiometricDeviceModal(true)
                    }
                >
                    <div className="text-white fs-14 fw-400">
                        New Device
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

            <BiometricDeviceModal
                show={showBiometricDeviceModal}
                handleClose={() =>
                    setShowBiometricDeviceModal(false)
                }
            />

        </>
    );
}

import { Modal } from "react-bootstrap";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";

interface BiometricDeviceModalProps {
    show: boolean;
    handleClose: () => void;
}

export function BiometricDeviceModal({
    show,
    handleClose,
}: BiometricDeviceModalProps) {

    /********************************************
       FORM STATE
    *********************************************/
    const [deviceName, setDeviceName] =
        useState("");

    const [ipAddress, setIpAddress] =
        useState("");

    const [port, setPort] =
        useState("");

    /********************************************
        DEVICE TYPE DROPDOWN
    *********************************************/
    const [selectedDeviceType, setSelectedDeviceType] =
        useState<DropdownOption | null>(null);

    const DEVICE_TYPE_OPTIONS: DropdownOption[] = [
        {
            id: "fingerprint_scanner",
            name: "Fingerprint Scanner",
        },
        {
            id: "face_recognition_device",
            name: "Face Recognition Device",
        },
        {
            id: "palm_scanner",
            name: "Palm Scanner",
        },
        {
            id: "iris_scanner",
            name: "Iris Scanner",
        },
    ];

    /********************************************
        HANDLE ADD
    *********************************************/
    const handleAdd = () => {

        const payload = {
            deviceName,
            deviceType:
                selectedDeviceType,
            ipAddress,
            port,
        };

        console.log(
            "Biometric Device Data :",
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
                        New Biometric Device
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="p-0">

                    <form>

                        {/* ROW 1 */}

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Device Name{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Device Name"
                                        value={deviceName}
                                        onChange={(e) =>
                                            setDeviceName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-fingerprint-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Device Type{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <CustomFormDropdown
                                    options={
                                        DEVICE_TYPE_OPTIONS
                                    }
                                    value={
                                        selectedDeviceType
                                    }
                                    onChange={(value) =>
                                        setSelectedDeviceType(
                                            value
                                        )
                                    }
                                    placeholder="Select Device Type"
                                />

                            </div>

                        </div>

                        {/* ROW 2 */}

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    IP Address{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter IP Address"
                                        value={ipAddress}
                                        onChange={(e) =>
                                            setIpAddress(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-global-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Port{" "}
                                    <span className="text-danger">
                                        *
                                    </span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="number"
                                        className="customInput"
                                        placeholder="Enter Port"
                                        value={port}
                                        onChange={(e) =>
                                            setPort(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-router-line"></i>

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