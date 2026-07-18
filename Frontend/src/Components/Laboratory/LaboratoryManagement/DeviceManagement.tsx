import {  useMemo, useState } from "react";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";

import GlobalGridTable, {
    type ColumnActionRow,
    type RowAction,
} from "../../../GlobalHelpers/GlobalGridTable";

/********************************************
    Name : Manish Kumar
    Date : 10/07/2026
    Purpose : Device Management Grid
*********************************************/

interface DeviceManagementTableData {
    id: string;
    deviceName: string;
    category: string;
    ipAddress: string;
    port: string;
    status: "Connected" | "DisConnected";
    supportTest: string;
}

export default function DeviceManagement() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "active", name: "Connected" },
        { id: "inActive", name: "DisConnected" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Category Options
    *********************************************/
    const categoryOptions: DropdownOption[] = [
        { id: "analyzer", name: "Analyzer" },
        { id: "monitoring", name: "Monitoring" },
        { id: "imaging", name: "Imaging" },
        { id: "diagnostic", name: "Diagnostic" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Dummy Device Data
    *********************************************/
    const ALL_DEVICE_DATA: DeviceManagementTableData[] = [
        {
            id: "DEV001",
            deviceName: "CBC Analyzer",
            category: "Analyzer",
            ipAddress: "192.168.1.10",
            port: "8080",
            status: "Connected",
            supportTest: "CBC, ESR",
        },
        {
            id: "DEV002",
            deviceName: "Biochemistry Analyzer",
            category: "Analyzer",
            ipAddress: "192.168.1.11",
            port: "8081",
            status: "Connected",
            supportTest: "LFT, KFT, Lipid Profile",
        },
        {
            id: "DEV003",
            deviceName: "Patient Monitor",
            category: "Monitoring",
            ipAddress: "192.168.1.12",
            port: "9000",
            status: "Connected",
            supportTest: "ECG, SPO2, BP",
        },
        {
            id: "DEV004",
            deviceName: "Ultrasound Machine",
            category: "Imaging",
            ipAddress: "192.168.1.13",
            port: "7000",
            status: "Connected",
            supportTest: "Ultrasound Scan",
        },
        {
            id: "DEV005",
            deviceName: "X-Ray Machine",
            category: "Imaging",
            ipAddress: "192.168.1.14",
            port: "7001",
            status: "DisConnected",
            supportTest: "Digital X-Ray",
        },
        {
            id: "DEV006",
            deviceName: "PCR Analyzer",
            category: "Diagnostic",
            ipAddress: "192.168.1.15",
            port: "8085",
            status: "Connected",
            supportTest: "PCR Testing",
        },
        {
            id: "DEV007",
            deviceName: "Blood Gas Analyzer",
            category: "Analyzer",
            ipAddress: "192.168.1.16",
            port: "8086",
            status: "DisConnected",
            supportTest: "Blood Gas Analysis",
        },
        {
            id: "DEV008",
            deviceName: "ECG Machine",
            category: "Monitoring",
            ipAddress: "192.168.1.17",
            port: "9001",
            status: "Connected",
            supportTest: "ECG Test",
        },
        {
            id: "DEV009",
            deviceName: "CT Scan Machine",
            category: "Imaging",
            ipAddress: "192.168.1.18",
            port: "7010",
            status: "Connected",
            supportTest: "CT Imaging",
        },
        {
            id: "DEV010",
            deviceName: "Automated Microscope",
            category: "Diagnostic",
            ipAddress: "192.168.1.19",
            port: "8089",
            status: "DisConnected",
            supportTest: "Microscopy Tests",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Filter Device Data
    *********************************************/
    const filteredDeviceData = useMemo(() => {
        return ALL_DEVICE_DATA.filter((device) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                device.deviceName.toLowerCase().includes(searchValue) ||
                device.category.toLowerCase().includes(searchValue) ||
                device.ipAddress.toLowerCase().includes(searchValue) ||
                device.supportTest.toLowerCase().includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                device.status.toLowerCase() === selectedStatus.name.toLowerCase();

            const matchesCategory =
                !selectedCategory ||
                device.category.toLowerCase() === selectedCategory.name.toLowerCase();

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [globalSearch, selectedStatus, selectedCategory]);

    const totalPages = Math.ceil(filteredDeviceData.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredDeviceData.slice(startIndex, endIndex);
    }, [filteredDeviceData, currentPage, itemsPerPage]);


    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Row Actions
    *********************************************/
    const rowActions: RowAction<DeviceManagementTableData>[] = [
        {
            icon: <i className="ri-eye-line fs-18"></i>,
            tooltip: "View Details",
            className: "medical-record",
            onClick: (row) => console.log("View Details :", row),
        },
        {
            icon: <i className="ri-pencil-ai-line fs-18"></i>,
            tooltip: "Edit Details",
            className: "test-result",
            onClick: (row) => console.log("Edit Details :", row),
        },
        {
            icon: <i className="ri-link-m fs-18"></i>,
            tooltip: "Test Connection",
            className: "radiology",
            onClick: (row) => console.log("Test Connection :", row),
        },
        {
            icon: <i className="ri-toggle-line fs-18"></i>,
            tooltip: "Enable / Disable",
            className: "skipDose",
            onClick: (row) => console.log("Enable / Disable :", row),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<DeviceManagementTableData>[] = [
        {
            key: "deviceName",
            header: <>Device Name</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="SquareSortVertical"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "category",
            header: <>Category</>,
            className: "text-center",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="SquareSortVertical"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "ipAddress",
            header: <>IP Address</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "port",
            header: <>Port</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            render: (row) => (
                <div className="d-flex justify-content-center">
                    <span
                        className={`px-3 py-1 rounded-pill text-xs fw-medium ${row.status === "Connected"
                                ? "status-confirmed"
                                : "status-cancelled"
                            }`}
                    >
                        {row.status}
                    </span>
                </div>
            ),
        },
        {
            key: "supportTest",
            header: <>Support Test</>,
            className: "text-center",
            render: (row) => (
                <div
                    title={row.supportTest}
                    className="text-truncate mx-auto"
                    style={{
                        maxWidth: "220px",
                        cursor: "pointer",
                    }}
                >
                    {row.supportTest}
                </div>
            ),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedStatus(null);
        setSelectedCategory(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Device Management</p>
                <div className="Plus-btn">
                    <div className="text-white fs-14 fw-400">New Device</div>
                    <img
                        src="/Assets/Icons/WhitePlusCircle.svg"
                        alt="WhitePlusCircle"
                        width={22}
                        height={22}
                    />
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

                <div>
                    <CustomFilterDropdown
                        options={categoryOptions}
                        value={selectedCategory}
                        placeholder="Category"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedCategory(selected);
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
                    rowActions={rowActions}
                />

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows) => {
                        setItemsPerPage(rows);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </>
    );
}