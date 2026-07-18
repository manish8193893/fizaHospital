import { useEffect, useMemo, useState } from "react";
import * as bootstrap from "bootstrap";

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
    Purpose : Laboratory Management Grid
*********************************************/

interface LabManagementTableData {
    id: string;
    testCode: string;
    testName: string;
    category: string;
    price: number;
    specimenType: string;
    tat: string;
    parametersCount: number;
    status: "Active" | "InActive";
}

export default function LabManagement() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);
    const [selectedSpecimenType, setSelectedSpecimenType] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "active", name: "Active" },
        { id: "inactive", name: "InActive" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Category Options
    *********************************************/
    const categoryOptions: DropdownOption[] = [
        { id: "hematology", name: "Hematology" },
        { id: "biochemistry", name: "Biochemistry" },
        { id: "microbiology", name: "Microbiology" },
        { id: "pathology", name: "Pathology" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Specimen Type Options
    *********************************************/
    const specimenOptions: DropdownOption[] = [
        { id: "blood", name: "Blood" },
        { id: "urine", name: "Urine" },
        { id: "serum", name: "Serum" },
        { id: "swab", name: "Swab" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Dummy Laboratory Data
    *********************************************/
    const ALL_LAB_DATA: LabManagementTableData[] = [
        {
            id: "LAB001",
            testCode: "CBC001",
            testName: "Complete Blood Count",
            category: "Hematology",
            price: 500,
            specimenType: "Blood",
            tat: "24 Hours",
            parametersCount: 25,
            status: "Active",
        },
        {
            id: "LAB002",
            testCode: "LFT001",
            testName: "Liver Function Test",
            category: "Biochemistry",
            price: 800,
            specimenType: "Serum",
            tat: "48 Hours",
            parametersCount: 12,
            status: "Active",
        },
        {
            id: "LAB003",
            testCode: "KFT001",
            testName: "Kidney Function Test",
            category: "Biochemistry",
            price: 700,
            specimenType: "Blood",
            tat: "24 Hours",
            parametersCount: 10,
            status: "Active",
        },
        {
            id: "LAB004",
            testCode: "UR001",
            testName: "Urine Routine Examination",
            category: "Pathology",
            price: 300,
            specimenType: "Urine",
            tat: "12 Hours",
            parametersCount: 15,
            status: "Active",
        },
        {
            id: "LAB005",
            testCode: "CULT001",
            testName: "Blood Culture Test",
            category: "Microbiology",
            price: 1200,
            specimenType: "Blood",
            tat: "72 Hours",
            parametersCount: 8,
            status: "Active",
        },
        {
            id: "LAB006",
            testCode: "THY001",
            testName: "Thyroid Profile",
            category: "Biochemistry",
            price: 900,
            specimenType: "Serum",
            tat: "24 Hours",
            parametersCount: 6,
            status: "InActive",
        },
        {
            id: "LAB007",
            testCode: "WID001",
            testName: "Widal Test",
            category: "Microbiology",
            price: 400,
            specimenType: "Blood",
            tat: "24 Hours",
            parametersCount: 5,
            status: "Active",
        },
        {
            id: "LAB008",
            testCode: "PAP001",
            testName: "Pap Smear Test",
            category: "Pathology",
            price: 1500,
            specimenType: "Swab",
            tat: "5 Days",
            parametersCount: 20,
            status: "InActive",
        },
        {
            id: "LAB009",
            testCode: "HBA001",
            testName: "HbA1c Test",
            category: "Biochemistry",
            price: 600,
            specimenType: "Blood",
            tat: "24 Hours",
            parametersCount: 3,
            status: "Active",
        },
        {
            id: "LAB010",
            testCode: "PCR001",
            testName: "PCR Diagnostic Test",
            category: "Microbiology",
            price: 2000,
            specimenType: "Swab",
            tat: "48 Hours",
            parametersCount: 7,
            status: "InActive",
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
        Purpose : Filter Laboratory Data
    *********************************************/
    const filteredLabData = useMemo(() => {
        return ALL_LAB_DATA.filter((lab) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                lab.testCode.toLowerCase().includes(searchValue) ||
                lab.testName.toLowerCase().includes(searchValue) ||
                lab.category.toLowerCase().includes(searchValue) ||
                lab.specimenType.toLowerCase().includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                lab.status.toLowerCase() === selectedStatus.name.toLowerCase();

            const matchesCategory =
                !selectedCategory ||
                lab.category.toLowerCase() === selectedCategory.name.toLowerCase();

            const matchesSpecimen =
                !selectedSpecimenType ||
                lab.specimenType.toLowerCase() === selectedSpecimenType.name.toLowerCase();

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory &&
                matchesSpecimen
            );
        });
    }, [
        globalSearch,
        selectedStatus,
        selectedCategory,
        selectedSpecimenType,
    ]);

    const totalPages = Math.ceil(filteredLabData.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredLabData.slice(startIndex, endIndex);
    }, [filteredLabData, currentPage, itemsPerPage]);

    // Note: Ensure you include your JSX return statement here.
    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
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
        Date : 10/07/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<LabManagementTableData>[] = [
        {
            key: "testCode",
            header: <>Test Code</>,
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
            key: "testName",
            header: <>Test Name</>,
            className: "text-center text-nowrap",
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
            key: "price",
            header: <>Price</>,
            className: "text-center",
            sortable: true,
            render: (row) => <div>₹ {row.price}</div>,
        },
        {
            key: "specimenType",
            header: <>Specimen Type</>,
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
            key: "tat",
            header: <>TAT</>,
            className: "text-center text-nowrap",
            sortable: true,
        },
        {
            key: "parametersCount",
            header: <>Parameters Count</>,
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
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Row Actions
    *********************************************/
    const rowActions: RowAction<LabManagementTableData>[] = [
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
            icon: <i className="ri-price-tag-3-line fs-18"></i>,
            tooltip: "Set Price",
            className: "check-in",
            onClick: (row) => console.log("Set Price :", row),
        },
        {
            icon: <i className="ri-settings-3-line fs-18"></i>,
            tooltip: "Manage Parameters",
            className: "radiology",
            onClick: (row) => console.log("Manage Parameters :", row),
        },
        {
            icon: <i className="ri-forbid-line fs-18"></i>,
            tooltip: "Disable",
            className: "skipDose",
            onClick: (row) => console.log("Disable :", row),
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
        setSelectedSpecimenType(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Laboratory Management</p>
                <div className="Plus-btn">
                    <div className="text-white fs-14 fw-400">New Service</div>
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

                <div>
                    <CustomFilterDropdown
                        options={specimenOptions}
                        value={selectedSpecimenType}
                        placeholder="Specimen Type"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedSpecimenType(selected);
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
                    rowActions={rowActions}
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