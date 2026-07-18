import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "../../GlobalHelpers/Pagination";
import GlobalGridTable, {
    type ColumnActionRow,
    type RowAction,
} from "../../GlobalHelpers/GlobalGridTable";



/********************************************
    Name : Manish Kumar
    Date : 08/06/2026
    Purpose : Nurse Medication Dashboard
*********************************************/
interface NursePatientTableData {
    fileNo: string;
    name: string;
    clinic: string;
    floor: string;
    bedRoom: string;
    diagnosis: string;
    medicationSchedule: string;
    nextDose: string;
    status: "DueSoon" | "OverDue" | "Skipped";
}

export default function NurseDashboardGridTable() {

    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Filters State
    *********************************************/
    const [globalSearch, setGlobalSearch] = useState("");

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Dummy Data
    *********************************************/
    const ALL_PATIENT_DATA: NursePatientTableData[] = [
        {
            fileNo: "F1001",
            name: "Manish Kashyap",
            clinic: "General Medicine",
            floor: "1st Floor",
            bedRoom: "Bed-12",
            diagnosis: "Hypertension",
            medicationSchedule: "08:00 AM",
            nextDose: "02:00 PM",
            status: "DueSoon",
        },
        {
            fileNo: "F1002",
            name: "Aisha Noor",
            clinic: "Cardiology",
            floor: "2nd Floor",
            bedRoom: "Room-205",
            diagnosis: "Arrhythmia",
            medicationSchedule: "09:00 AM",
            nextDose: "01:00 PM",
            status: "OverDue",
        },
        {
            fileNo: "F1003",
            name: "Ahmed Ali",
            clinic: "Neurology",
            floor: "3rd Floor",
            bedRoom: "Bed-08",
            diagnosis: "Migraine",
            medicationSchedule: "10:00 AM",
            nextDose: "04:00 PM",
            status: "Skipped",
        },
        {
            fileNo: "F1004",
            name: "Fatima Hassan",
            clinic: "Orthopedics",
            floor: "2nd Floor",
            bedRoom: "Room-210",
            diagnosis: "Fracture",
            medicationSchedule: "08:30 AM",
            nextDose: "02:30 PM",
            status: "DueSoon",
        },
        {
            fileNo: "F1005",
            name: "Yousef Ali",
            clinic: "Pulmonology",
            floor: "4th Floor",
            bedRoom: "Bed-22",
            diagnosis: "Asthma",
            medicationSchedule: "07:00 AM",
            nextDose: "01:00 PM",
            status: "OverDue",
        },
        {
            fileNo: "F1006",
            name: "Sara Mahmood",
            clinic: "General Medicine",
            floor: "1st Floor",
            bedRoom: "Room-103",
            diagnosis: "Fever",
            medicationSchedule: "09:30 AM",
            nextDose: "03:30 PM",
            status: "DueSoon",
        },
        {
            fileNo: "F1007",
            name: "Omar Farooq",
            clinic: "Cardiology",
            floor: "2nd Floor",
            bedRoom: "Bed-15",
            diagnosis: "Heart Failure",
            medicationSchedule: "06:00 AM",
            nextDose: "12:00 PM",
            status: "Skipped",
        },
        {
            fileNo: "F1008",
            name: "Noor Faisal",
            clinic: "Dermatology",
            floor: "5th Floor",
            bedRoom: "Room-501",
            diagnosis: "Psoriasis",
            medicationSchedule: "11:00 AM",
            nextDose: "05:00 PM",
            status: "DueSoon",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Pagination State
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Filtered Data
    *********************************************/
    const filteredPatients = useMemo(() => {

        const searchValue = globalSearch.toLowerCase();

        return ALL_PATIENT_DATA.filter((patient) =>
            patient.fileNo.toLowerCase().includes(searchValue) ||
            patient.name.toLowerCase().includes(searchValue) ||
            patient.clinic.toLowerCase().includes(searchValue) ||
            patient.floor.toLowerCase().includes(searchValue) ||
            patient.bedRoom.toLowerCase().includes(searchValue) ||
            patient.diagnosis.toLowerCase().includes(searchValue) ||
            patient.medicationSchedule.toLowerCase().includes(searchValue) ||
            patient.nextDose.toLowerCase().includes(searchValue) ||
            patient.status.toLowerCase().includes(searchValue)
        );

    }, [globalSearch]);

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Pagination
    *********************************************/
    const totalPages = Math.ceil(
        filteredPatients.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        return filteredPatients.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredPatients,
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Columns
    *********************************************/
    const columns: ColumnActionRow<NursePatientTableData>[] = [
        {
            key: "fileNo",
            header: <>File No</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.fileNo.localeCompare(b.fileNo),
        },
        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.name.localeCompare(b.name),
        },
        {
            key: "clinic",
            header: <>Clinic</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.clinic.localeCompare(b.clinic),
        },
        {
            key: "floor",
            header: <>Floor</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.floor.localeCompare(b.floor),
        },
        {
            key: "bedRoom",
            header: <>Bed / Room</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.bedRoom.localeCompare(b.bedRoom),
        },
        {
            key: "diagnosis",
            header: <>Diagnosis</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "medicationSchedule",
            header: <>Medication Schedule</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "nextDose",
            header: <>Next Dose</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,

            render: (row) => {

                const statusStyles = {
                    "DueSoon": "status-paid",
                    OverDue: "status-cancelled",
                    Skipped: "status-pending",
                };

                return (
                    <div className="flex justify-center">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                        >
                            {row.status}
                        </span>
                    </div>
                );
            },
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : Row Actions
    *********************************************/
    const rowActions: RowAction<NursePatientTableData>[] = [
        {
            icon: <i className="ri-file-list-3-line fs-18"></i>,
            tooltip: "View Details",
            className: "medical-record",
            onClick: (row) => {
                console.log("View Details :", row);
                navigate("/clinic/View-Edit");
            },
        },
        {
            icon: <i className="ri-capsule-line fs-18"></i>,
            tooltip: "Give Medication",
            className: "check-in",
            onClick: (row) => {
                console.log("Give Medication :", row);
                navigate("/clinic/View-Edit");
            },
        },
        {
            icon: <i className="ri-close-circle-line fs-18"></i>,
            tooltip: "Skip Dose",
            className: "skipDose",
            onClick: (row) => {
                console.log("Skip Dose :", row);
                navigate("/clinic/View-Edit");
            },
        },
        {
            icon: <i className="ri-heart-pulse-line fs-18"></i>,
            tooltip: "Update Vitals",
            className: "test-result",
            onClick: (row) => {
                console.log("Update Vitals :", row);
                navigate("/clinic/View-Edit");
            },
        },
    ];

    return (
        <>
            {/* FILTER ROW */}
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

            </div>

            {/* GRID TABLE */}
            <div className="d-flex flex-column">

                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    rowActions={rowActions}
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
                            setItemsPerPage(rows);
                            setCurrentPage(1);
                        }}
                    />
                </div>

            </div>
        </>
    );
}