import { useEffect, useMemo, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";


/********************************************
    Name : Manish Kumar
    Date : 12/07/2026
    Purpose : Supplier And Vendor Account Grid Table
*********************************************/

interface SupplierAndVendorAccountTableData {
    id: string;
    vendorName: string;
    vendorType:
    | "Medication"
    | "Pharmacy"
    | "Staff Salaries"
    | "Electricity and Water Bill";
    contactPerson: string;
    contactNumber: string;
    lastPaymentDate: string;
    totalDue: number;
    status: "Paid" | "Partial" | "Draft";
}

export default function SupplierAndVendorAccountGridTable() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedVendorType, setSelectedVendorType] =
        useState<DropdownOption | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(
        null
    );

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Vendor Type Options
    *********************************************/
    const vendorTypeOptions: DropdownOption[] = [
        {
            id: "medication",
            name: "Medication",
        },
        {
            id: "pharmacy",
            name: "Pharmacy",
        },
        {
            id: "staff_salaries",
            name: "Staff Salaries",
        },
        {
            id: "electricity_water",
            name: "Electricity and Water Bill",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        {
            id: "paid",
            name: "Paid",
        },
        {
            id: "partial",
            name: "Partial",
        },
        {
            id: "draft",
            name: "Draft",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Dummy Vendor Account Data
    *********************************************/
    const ALL_VENDOR_ACCOUNT_DATA: SupplierAndVendorAccountTableData[] = [
        {
            id: "VEN001",
            vendorName: "Apollo Medication Suppliers",
            vendorType: "Medication",
            contactPerson: "Rajesh Kumar",
            contactNumber: "9876543210",
            lastPaymentDate: "12/07/2026",
            totalDue: 0,
            status: "Paid",
        },
        {
            id: "VEN002",
            vendorName: "City Pharmacy Store",
            vendorType: "Pharmacy",
            contactPerson: "Amit Sharma",
            contactNumber: "9865321470",
            lastPaymentDate: "16/06/2026",
            totalDue: 25000,
            status: "Partial",
        },
        {
            id: "VEN003",
            vendorName: "Hospital HR Payroll",
            vendorType: "Staff Salaries",
            contactPerson: "Neha Verma",
            contactNumber: "9812345678",
            lastPaymentDate: "17/06/2026",
            totalDue: 150000,
            status: "Draft",
        },
        {
            id: "VEN004",
            vendorName: "Power And Water Services",
            vendorType: "Electricity and Water Bill",
            contactPerson: "Suresh Singh",
            contactNumber: "9898989898",
            lastPaymentDate: "18/06/2026",
            totalDue: 18000,
            status: "Partial",
        },
        {
            id: "VEN005",
            vendorName: "MediCare Distribution",
            vendorType: "Medication",
            contactPerson: "Pankaj Gupta",
            contactNumber: "9823456789",
            lastPaymentDate: "19/06/2026",
            totalDue: 0,
            status: "Paid",
        },
        {
            id: "VEN006",
            vendorName: "Wellness Pharmacy",
            vendorType: "Pharmacy",
            contactPerson: "Anil Mehta",
            contactNumber: "9765432109",
            lastPaymentDate: "20/06/2026",
            totalDue: 50000,
            status: "Draft",
        },
        {
            id: "VEN007",
            vendorName: "Utility Management Services",
            vendorType: "Electricity and Water Bill",
            contactPerson: "Vikas Rao",
            contactNumber: "9786543210",
            lastPaymentDate: "21/06/2026",
            totalDue: 12000,
            status: "Partial",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Filter Vendor Account Data
    *********************************************/
    const filteredVendorAccountData = useMemo(() => {
        return ALL_VENDOR_ACCOUNT_DATA.filter((vendor) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                vendor.vendorName.toLowerCase().includes(searchValue) ||
                vendor.contactPerson.toLowerCase().includes(searchValue) ||
                vendor.contactNumber.includes(searchValue);

            const matchesVendorType =
                !selectedVendorType ||
                vendor.vendorType.toLowerCase() ===
                selectedVendorType.name.toLowerCase();

            const matchesStatus =
                !selectedStatus ||
                vendor.status.toLowerCase() === selectedStatus.name.toLowerCase();

            return matchesSearch && matchesVendorType && matchesStatus;
        });
    }, [globalSearch, selectedVendorType, selectedStatus]);

    const totalPages = Math.ceil(
        filteredVendorAccountData.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredVendorAccountData.slice(startIndex, endIndex);
    }, [filteredVendorAccountData, currentPage, itemsPerPage]);

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Initialize Bootstrap Tooltips
    *********************************************/
    useEffect(() => {
        const tooltipElements = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]'
        );

        tooltipElements.forEach((element) => {
            new bootstrap.Tooltip(element);
        });

        return () => {
            tooltipElements.forEach((element) => {
                const tooltip = bootstrap.Tooltip.getInstance(element);
                if (tooltip) {
                    tooltip.dispose();
                }
            });
        };
    }, [visibleTableData]);

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<SupplierAndVendorAccountTableData>[] = [
        {
            key: "vendorName",
            header: <>Vendor Name</>,
            className: "text-center text-nowrap",
            sortable: true,
            icon: (
                <img
                    src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg"
                    alt="sort"
                    width={14}
                    height={14}
                />
            ),
        },
        {
            key: "vendorType",
            header: <>Vendor Type</>,
            className: "text-center text-nowrap",
            render: (row) => {
                const vendorConfig = {
                    "Medication": { icon: "ri-capsule-line", bg: "#F1EDFF", color: "#6F42C1" },
                    "Pharmacy": { icon: "ri-medicine-bottle-line", bg: "#EAF8EF", color: "#1B8F4D" },
                    "Staff Salaries": { icon: "ri-user-settings-line", bg: "#E8F3FF", color: "#0477BF" },
                    "Electricity and Water Bill": { icon: "ri-flashlight-line", bg: "#FFF7E6", color: "#F59E0B" },
                }[row.vendorType];

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className="px-3 py-1 rounded-pill text-xs fw-medium d-flex align-items-center gap-1"
                            style={{
                                backgroundColor: vendorConfig.bg,
                                color: vendorConfig.color,
                            }}
                        >
                            <i className={`${vendorConfig.icon} fs-15`}></i>
                            {row.vendorType}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "contactPerson",
            header: <>Contact Person</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "contactNumber",
            header: <>Contact Number</>,
            className: "text-center",
        },
        {
            key: "lastPaymentDate",
            header: <>Last Payment Date</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "totalDue",
            header: <>Total Due</>,
            className: "text-center",
            render: (row) => (
                <span>
                    {row.totalDue === 0 ? "₹ 0" : `₹ ${row.totalDue.toLocaleString()}`}
                </span>
            ),
        },
        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            render: (row) => {
                const statusConfig = {
                    Paid: { bg: "#EAF8EF", color: "#1B8F4D", icon: "ri-checkbox-circle-line" },
                    Partial: { bg: "#FFF7E6", color: "#F59E0B", icon: "ri-time-line" },
                    Draft: { bg: "#F1EDFF", color: "#6F42C1", icon: "ri-draft-line" },
                }[row.status];

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className="px-3 py-1 rounded-pill text-xs fw-medium d-flex align-items-center gap-1"
                            style={{
                                backgroundColor: statusConfig.bg,
                                color: statusConfig.color,
                            }}
                        >
                            <i className={`${statusConfig.icon} fs-15`}></i>
                            {row.status}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            render: (row) => (
                <div className="d-flex justify-content-center gap-2">
                    {/* View Details */}
                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View Details"
                        onClick={() => console.log("View Details :", row)}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    {/* Make Payment (Conditional) */}
                    {row.status !== "Paid" && (
                        <button
                            type="button"
                            className="edit"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Make Payment"
                            onClick={() => console.log("Make Payment :", row)}
                        >
                            <i className="ri-hand-coin-line fs-18"></i>
                        </button>
                    )}
                </div>
            ),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 12/07/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedVendorType(null);
        setSelectedStatus(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Supplier And Vendor Account</p>
            </div>

            {/* Filter Row */}
            <div className="aph-modal-filter-row mb-4">
                {/* Global Search */}
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

                {/* Vendor Type Filter */}
                <div>
                    <CustomFilterDropdown
                        options={vendorTypeOptions}
                        value={selectedVendorType}
                        placeholder="Vendor Type"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedVendorType(selected);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                {/* Status Filter */}
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

                {/* Reset */}
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