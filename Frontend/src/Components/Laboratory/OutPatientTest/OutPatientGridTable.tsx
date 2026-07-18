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
    Date : 10/07/2026
    Purpose : Out Patient Grid Table
*********************************************/

interface OutPatientGridTableData {
    id: string;
    patientNo: string;
    name: string;
    mobileNo: string;
    date: string;
    time: string;
    status: "Waiting for Payment" | "Delivered" | "Report Issued";
    priority: "Urgent" | "Normal";
    resultStatus: "Not Entered" | "Final" | "Partial";
}

export default function OutPatientGridTable() {
    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<DropdownOption | null>(null);
    const [selectedResultStatus, setSelectedResultStatus] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Status Options
    *********************************************/
    const statusOptions: DropdownOption[] = [
        { id: "waiting_payment", name: "Waiting for Payment" },
        { id: "delivered", name: "Delivered" },
        { id: "report_issued", name: "Report Issued" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Priority Options
    *********************************************/
    const priorityOptions: DropdownOption[] = [
        { id: "urgent", name: "Urgent" },
        { id: "normal", name: "Normal" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Result Status Options
    *********************************************/
    const resultStatusOptions: DropdownOption[] = [
        { id: "not_entered", name: "Not Entered" },
        { id: "final", name: "Final" },
        { id: "partial", name: "Partial" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Result Status Color
    *********************************************/
    const resultStatus = (
        result: string
    ) => {

        switch (result) {

            case "Not Entered":
                return "#FAFBE5";

            case "Final":
                return "#E5F4FB";

            case "Partial":
                return "#f1dd2671";

            default:
                return "#FAFBE5";

        }

    };

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Dummy Out Patient Data
    *********************************************/
    const ALL_OUT_PATIENT_DATA: OutPatientGridTableData[] = [
        {
            id: "OP001",
            patientNo: "PAT001",
            name: "Rahul Sharma",
            mobileNo: "9876543210",
            date: "10/07/2026",
            time: "10:30 AM",
            status: "Waiting for Payment",
            priority: "Urgent",
            resultStatus: "Not Entered",
        },
        {
            id: "OP002",
            patientNo: "PAT002",
            name: "Priya Singh",
            mobileNo: "9876543211",
            date: "10/07/2026",
            time: "11:00 AM",
            status: "Delivered",
            priority: "Normal",
            resultStatus: "Partial",
        },
        {
            id: "OP003",
            patientNo: "PAT003",
            name: "Amit Verma",
            mobileNo: "9876543212",
            date: "10/07/2026",
            time: "11:30 AM",
            status: "Report Issued",
            priority: "Normal",
            resultStatus: "Final",
        },
        {
            id: "OP004",
            patientNo: "PAT004",
            name: "Sneha Kapoor",
            mobileNo: "9876543213",
            date: "16/06/2026",
            time: "09:30 AM",
            status: "Waiting for Payment",
            priority: "Urgent",
            resultStatus: "Not Entered",
        },
        {
            id: "OP005",
            patientNo: "PAT005",
            name: "Vikas Kumar",
            mobileNo: "9876543214",
            date: "16/06/2026",
            time: "12:15 PM",
            status: "Delivered",
            priority: "Normal",
            resultStatus: "Partial",
        },
        {
            id: "OP006",
            patientNo: "PAT006",
            name: "Neha Gupta",
            mobileNo: "9876543215",
            date: "17/06/2026",
            time: "01:00 PM",
            status: "Report Issued",
            priority: "Urgent",
            resultStatus: "Final",
        },
        {
            id: "OP007",
            patientNo: "PAT007",
            name: "Rohan Mehta",
            mobileNo: "9876543216",
            date: "17/06/2026",
            time: "02:30 PM",
            status: "Delivered",
            priority: "Normal",
            resultStatus: "Final",
        },
        {
            id: "OP008",
            patientNo: "PAT008",
            name: "Anjali Rao",
            mobileNo: "9876543217",
            date: "18/06/2026",
            time: "10:00 AM",
            status: "Waiting for Payment",
            priority: "Urgent",
            resultStatus: "Not Entered",
        },
        {
            id: "OP009",
            patientNo: "PAT009",
            name: "Karan Joshi",
            mobileNo: "9876543218",
            date: "18/06/2026",
            time: "03:00 PM",
            status: "Report Issued",
            priority: "Normal",
            resultStatus: "Final",
        },
        {
            id: "OP010",
            patientNo: "PAT010",
            name: "Pooja Sharma",
            mobileNo: "9876543219",
            date: "19/06/2026",
            time: "04:00 PM",
            status: "Delivered",
            priority: "Urgent",
            resultStatus: "Partial",
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
        Purpose : Filter Out Patient Data
    *********************************************/
    const filteredOutPatientData = useMemo(() => {
        return ALL_OUT_PATIENT_DATA.filter((patient) => {
            const searchValue = globalSearch.toLowerCase();

            const matchesSearch =
                patient.patientNo.toLowerCase().includes(searchValue) ||
                patient.name.toLowerCase().includes(searchValue) ||
                patient.mobileNo.includes(searchValue);

            const matchesStatus =
                !selectedStatus ||
                patient.status.toLowerCase() === selectedStatus.name.toLowerCase();

            const matchesPriority =
                !selectedPriority ||
                patient.priority.toLowerCase() === selectedPriority.name.toLowerCase();

            const matchesResultStatus =
                !selectedResultStatus ||
                patient.resultStatus.toLowerCase() === selectedResultStatus.name.toLowerCase();

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesResultStatus
            );
        });
    }, [
        globalSearch,
        selectedStatus,
        selectedPriority,
        selectedResultStatus,
    ]);

    const totalPages = Math.ceil(filteredOutPatientData.length / itemsPerPage);

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredOutPatientData.slice(startIndex, endIndex);
    }, [filteredOutPatientData, currentPage, itemsPerPage]);


    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Row Actions
    *********************************************/
    const rowActions: RowAction<OutPatientGridTableData>[] = [
        {
            icon: <i className="ri-eye-line fs-18"></i>,
            tooltip: "View Details",
            className: "medical-record",
            onClick: (row) => console.log("View Details :", row),
        },
        {
            icon: <i className="ri-test-tube-line fs-18"></i>,
            tooltip: "Collect Sample",
            className: "check-in",
            onClick: (row) => console.log("Collect Sample :", row),
        },
        {
            icon: <i className="ri-file-text-line fs-18"></i>,
            tooltip: "View Report",
            className: "radiology",
            onClick: (row) => console.log("View Report :", row),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<OutPatientGridTableData>[] = [
        {
            key: "patientNo",
            header: <>Patient No</>,
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
            key: "name",
            header: <>Name</>,
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
            key: "mobileNo",
            header: <>Mobile No</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "date",
            header: <>Date</>,
            className: "text-center",
            sortable: true,
        },
        {
            key: "time",
            header: <>Time</>,
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
                        className={`${row.status === "Report Issued"
                            ? "status-paid"
                            : row.status === "Delivered"
                                ? "status-normal"
                                : "status-overdue"
                            }`}
                    >
                        {row.status}
                    </span>
                </div>
            ),
        },
        {
            key: "priority",
            header: <>Priority</>,
            className: "text-center p-0",
            sortable: true,
            icon: (<img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="sort" width={14} height={14} />),

            render: (row) => {
                const isUrgent = row.priority === "Urgent";
                const isNormal = row.priority === "Normal";

                return (
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            color: isUrgent ? "#FF4C51" : isNormal ? "#0477BF" : "inherit",
                        }}
                    >
                        {row.priority}
                        {row.priority === "Normal" ? (
                            <i className="ri-verified-badge-fill fs-16 ms-1"></i>
                        ) : (
                            <i className="ri-alert-fill fs-16 ms-1"></i>
                        )}
                    </div>
                );
            }


        },
        {
            key: "resultStatus",
            header: <>Result Status</>,
            className: "text-center p-0",
            render: (row) => (

                <div
                    className="d-flex text-muted justify-content-center align-items-center w-100 h-100"
                    style={{
                        backgroundColor:
                            resultStatus(
                                row.resultStatus
                            ),
                        color: "#FAFBE5",
                    }}
                >
                    {row.resultStatus}
                </div>

            ),
        }
    ];

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : Reset Filters
    *********************************************/
    const handleResetFilters = () => {
        setGlobalSearch("");
        setSelectedStatus(null);
        setSelectedPriority(null);
        setSelectedResultStatus(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* Heading */}
            <div className="d-flex justify-content-between align-items-center gap-4 my-4">
                <p className="fs-18 fw-500">Out Patient</p>
                <div className="Plus-btn">
                    <div className="text-white fs-14 fw-400">New Patient</div>
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
                        options={priorityOptions}
                        value={selectedPriority}
                        placeholder="Priority"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedPriority(selected);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={resultStatusOptions}
                        value={selectedResultStatus}
                        placeholder="Result Status"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedResultStatus(selected);
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