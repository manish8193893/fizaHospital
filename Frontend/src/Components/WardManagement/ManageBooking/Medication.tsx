import { useState } from "react";

import GlobalGridTable, { type ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";
import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown, {
    type DropdownOption,
} from "../../../GlobalHelpers/CustomFilterDropdown";


interface MedicationData {
    medicationDosage: string;
    administrationInstruction: string;
    scheduledTime: string;
    actualTime: string;
    nextDose: string;
    status: string;
    administeredBy: string;
}

export default function Medication() {

    /********************************************
        Name    : Manish Kumar
        Date    : 25/06/2026
        Purpose : Filters States
    *********************************************/
    const [searchText, setSearchText] = useState("");
    const [selectedStatus, setSelectedStatus] =
        useState<DropdownOption | null>(null);

    /********************************************
        Name    : Manish Kumar
        Date    : 25/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState(1);

    const [itemsPerPage, setItemsPerPage] =
        useState(5);

    /********************************************
        Name    : Manish Kumar
        Date    : 25/06/2026
        Purpose : Status Options
    *********************************************/
    const STATUS_OPTIONS: DropdownOption[] = [

        {
            id: "given",
            name: "Given",
        },

        {
            id: "waiting",
            name: "Waiting",
        },

        {
            id: "skipped",
            name: "Skipped",
        },

    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 25/06/2026
        Purpose : Medication Data
    *********************************************/
    const ALL_MEDICATION_DATA:
        MedicationData[] = [

            {
                medicationDosage:
                    "Paracetamol 500mg",
                administrationInstruction:
                    "Before Meal - Oral",
                scheduledTime:
                    "08:00 AM",
                actualTime:
                    "08:05 AM",
                nextDose:
                    "04:00 PM",
                status:
                    "Given",
                administeredBy:
                    "Nurse Anita",
            },

            {
                medicationDosage:
                    "Ceftriaxone 1g (IV)",
                administrationInstruction:
                    "Intravenous",
                scheduledTime:
                    "10:00 AM",
                actualTime:
                    "--",
                nextDose:
                    "10:00 PM",
                status:
                    "Waiting",
                administeredBy:
                    "Nurse Rahul",
            },

            {
                medicationDosage:
                    "Omeprazole 20mg",
                administrationInstruction:
                    "Before Meal",
                scheduledTime:
                    "07:00 AM",
                actualTime:
                    "07:02 AM",
                nextDose:
                    "07:00 AM Tomorrow",
                status:
                    "Given",
                administeredBy:
                    "Nurse Priya",
            },

            {
                medicationDosage:
                    "Insulin Rapid",
                administrationInstruction:
                    "Subcutaneous",
                scheduledTime:
                    "01:00 PM",
                actualTime:
                    "--",
                nextDose:
                    "09:00 PM",
                status:
                    "Skipped",
                administeredBy:
                    "Nurse Neha",
            },

            {
                medicationDosage:
                    "Amoxicillin 500mg",
                administrationInstruction:
                    "After Meal",
                scheduledTime:
                    "09:00 AM",
                actualTime:
                    "09:03 AM",
                nextDose:
                    "09:00 PM",
                status:
                    "Given",
                administeredBy:
                    "Nurse Kavita",
            },

        ];

    /********************************************
        Name    : Manish Kumar
        Date    : 25/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredData =
        ALL_MEDICATION_DATA.filter((item) => {

            const matchesSearch =
                item.medicationDosage
                    .toLowerCase()
                    .includes(
                        searchText.toLowerCase()
                    ) ||
                item.administeredBy
                    .toLowerCase()
                    .includes(
                        searchText.toLowerCase()
                    );

            const matchesStatus =
                !selectedStatus ||
                item.status ===
                selectedStatus.name;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    const paginatedData =
        filteredData.slice(
            (currentPage - 1) *
            itemsPerPage,
            currentPage *
            itemsPerPage
        );

    const totalPages = Math.ceil(
        filteredData.length /
        itemsPerPage
    );

    /********************************************
        Name    : Manish Kumar
        Date    : 25/06/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {

        setSearchText("");
        setSelectedStatus(null);
        setCurrentPage(1);

    };

    /********************************************
        Name    : Manish Kumar
        Date    : 25/06/2026
        Purpose : Table Columns
    *********************************************/
    const columns: ColumnActionRow<MedicationData>[] = [

        {
            key: "medicationDosage",
            header: <>Medication & Dosage</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "administrationInstruction",
            header: <>Administration Instruction</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "scheduledTime",
            header: <>Scheduled Time</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "actualTime",
            header: <>Actual Time</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "nextDose",
            header: <>Next Dose</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",

            render: (row) => (

                <div className="d-flex justify-content-center">

                    <span
                        className={`${row.status === "Given"
                            ? "status-completed"
                            : row.status === "Waiting"
                                ? "status-pending"
                                : "status-cancelled"
                            }`}
                    >
                        {row.status}
                    </span>

                </div>

            ),
        },

        {
            key: "administeredBy",
            header: <>Administered By</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
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
                    data-bs-title="View Medication Details"
                >
                    <i className="ri-eye-line fs-18"></i>
                </button>

            ),
        },

    ];

    return (

        <>

            {/* Filter Row */}
            <div className="aph-modal-filter-row mb-4">

                {/* Global Search */}
                <div className="aph-filter-search">

                    <input
                        type="text"
                        placeholder="Search..."
                        className="aph-search-input"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setCurrentPage(1);
                        }}
                    />

                    <button className="aph-search-btn outline-0">
                        <i className="ri-search-line"></i>
                    </button>

                </div>


                {/* Status Filter */}
                <div>

                    <CustomFilterDropdown
                        options={STATUS_OPTIONS}
                        value={selectedStatus}
                        customClass="aph-filter-dropdown"
                        onChange={(value) => {

                            setSelectedStatus(
                                value
                            );

                            setCurrentPage(1);

                        }}
                        placeholder="Status"
                    />

                </div>

                {/* Reset Filter */}
                <button
                    className="aph-filter-btn outline-0"
                    onClick={handleResetFilters}
                >
                    <i className="ri-filter-off-line"></i>
                </button>

            </div>

            {/* Grid */}
            <div className="bg-white rounded-3 p-3">

                <GlobalGridTable
                    data={paginatedData}
                    columns={
                        columns
                    }
                    currentPage={
                        currentPage
                    }
                    pageSize={
                        itemsPerPage
                    }
                />

                <Pagination
                    totalPages={
                        totalPages
                    }
                    currentPage={
                        currentPage
                    }
                    onPageChange={(page) =>
                        setCurrentPage(page)
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

        </>

    );
}