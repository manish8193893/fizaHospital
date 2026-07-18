import { useMemo, useState } from "react";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";

import GlobalGridTable, {
    type ColumnActionRow,
    type RowAction,
} from "../../../GlobalHelpers/GlobalGridTable";

/********************************************
    Name : Manish Kumar
    Date : 15/06/2026
    Purpose : Available Test And Parameters Grid
*********************************************/

interface AvailableTestAndParametersTableData {
    id: string;
    testCode: string;
    testName: string;
    parametersCount: number;
    status: "Active" | "InActive";
}

export default function AvailableTestAndParameters() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "active", name: "Active" },
        { id: "inactive", name: "InActive" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Dummy Test Data
    *********************************************/
    const ALL_TEST_DATA: AvailableTestAndParametersTableData[] = [
        {
            id: "TEST001",
            testCode: "CBC001",
            testName: "Complete Blood Count",
            parametersCount: 25,
            status: "Active",
        },
        {
            id: "TEST002",
            testCode: "LFT001",
            testName: "Liver Function Test",
            parametersCount: 12,
            status: "Active",
        },
        {
            id: "TEST003",
            testCode: "KFT001",
            testName: "Kidney Function Test",
            parametersCount: 10,
            status: "Active",
        },
        {
            id: "TEST004",
            testCode: "THY001",
            testName: "Thyroid Profile",
            parametersCount: 6,
            status: "Active",
        },
        {
            id: "TEST005",
            testCode: "LIP001",
            testName: "Lipid Profile",
            parametersCount: 8,
            status: "Active",
        },
        {
            id: "TEST006",
            testCode: "HBA001",
            testName: "HbA1c Test",
            parametersCount: 3,
            status: "InActive",
        },
        {
            id: "TEST007",
            testCode: "UR001",
            testName: "Urine Routine Examination",
            parametersCount: 15,
            status: "Active",
        },
        {
            id: "TEST008",
            testCode: "PCR001",
            testName: "PCR Diagnostic Test",
            parametersCount: 7,
            status: "InActive",
        },
        {
            id: "TEST009",
            testCode: "CULT001",
            testName: "Blood Culture Test",
            parametersCount: 9,
            status: "Active",
        },
        {
            id: "TEST010",
            testCode: "PAP001",
            testName: "Pap Smear Test",
            parametersCount: 20,
            status: "InActive",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Filter Test Data
    *********************************************/
    const filteredTestData = useMemo(() => {
        return ALL_TEST_DATA.filter((test) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                test.testCode.toLowerCase().includes(searchValue) ||
                test.testName.toLowerCase().includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                test.status.toLowerCase() === selectedStatus.name.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [globalSearch, selectedStatus]);

    const totalPages = Math.ceil(filteredTestData.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredTestData.slice(startIndex, endIndex);
    }, [filteredTestData, currentPage, itemsPerPage]);


    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : Row Actions
    *********************************************/
    const rowActions: RowAction<AvailableTestAndParametersTableData>[] = [
        {
            icon: <i className="ri-pencil-ai-line fs-18"></i>,
            tooltip: "Edit Details",
            className: "test-result",
            onClick: (row) => console.log("Edit Details :", row),
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
        Date : 15/06/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<AvailableTestAndParametersTableData>[] = [
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
            key: "parametersCount",
            header: <>Parameters Count</>,
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
        }
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
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Available Test And Parameters</p>
                <div className="Plus-btn">
                    <div className="text-white fs-14 fw-400">New Test</div>
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