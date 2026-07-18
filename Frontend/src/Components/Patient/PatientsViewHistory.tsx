import { useEffect, useMemo, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../GlobalHelpers/GlobalGridTable";



interface PatientVisitHistoryData {
    id: string;
    visitNo: string;
    visitDate: string;
    doctor: string;
    department: string;
    visitType: string;
    diagnosis: string;
}

export default function PatientsViewHistory() {

    const [globalSearch, setGlobalSearch] = useState("");

    const [selectedDepartment, setSelectedDepartment] =
        useState<DropdownOption | null>(null);

    const [selectedDoctor, setSelectedDoctor] =
        useState<DropdownOption | null>(null);

    const [selectedVisitType, setSelectedVisitType] =
        useState<DropdownOption | null>(null);

    /********************************************
        Department Filter
    *********************************************/
    const departmentOptions: DropdownOption[] = [
        { id: "cardiology", name: "Cardiology" },
        { id: "neurology", name: "Neurology" },
        { id: "orthopedics", name: "Orthopedics" },
        { id: "general_medicine", name: "General Medicine" },
        { id: "ent", name: "ENT" },
    ];

    /********************************************
        Doctor Filter
    *********************************************/
    const doctorOptions: DropdownOption[] = [
        { id: "doctor_1", name: "Dr. Rajesh Sharma" },
        { id: "doctor_2", name: "Dr. Priya Gupta" },
        { id: "doctor_3", name: "Dr. Amit Verma" },
        { id: "doctor_4", name: "Dr. Neha Singh" },
        { id: "doctor_5", name: "Dr. Vivek Kumar" },
    ];

    /********************************************
        Visit Type Filter
    *********************************************/
    const visitTypeOptions: DropdownOption[] = [
        { id: "opd", name: "OPD" },
        { id: "follow_up", name: "Follow Up" },
        { id: "emergency", name: "Emergency" },
    ];

    /********************************************
        Dummy Data
    *********************************************/
    const ALL_VISIT_HISTORY_DATA: PatientVisitHistoryData[] = [
        {
            id: "1",
            visitNo: "VIS-001",
            visitDate: "15-06-2026",
            doctor: "Dr. Rajesh Sharma",
            department: "Cardiology",
            visitType: "OPD",
            diagnosis: "Hypertension",
        },
        {
            id: "2",
            visitNo: "VIS-002",
            visitDate: "18-06-2026",
            doctor: "Dr. Priya Gupta",
            department: "Neurology",
            visitType: "Follow Up",
            diagnosis: "Migraine",
        },
        {
            id: "3",
            visitNo: "VIS-003",
            visitDate: "20-06-2026",
            doctor: "Dr. Amit Verma",
            department: "Orthopedics",
            visitType: "OPD",
            diagnosis: "Knee Pain",
        },
        {
            id: "4",
            visitNo: "VIS-004",
            visitDate: "22-06-2026",
            doctor: "Dr. Neha Singh",
            department: "ENT",
            visitType: "Emergency",
            diagnosis: "Ear Infection",
        },
        {
            id: "5",
            visitNo: "VIS-005",
            visitDate: "25-06-2026",
            doctor: "Dr. Vivek Kumar",
            department: "General Medicine",
            visitType: "Follow Up",
            diagnosis: "Diabetes",
        },
        {
            id: "6",
            visitNo: "VIS-006",
            visitDate: "27-06-2026",
            doctor: "Dr. Rajesh Sharma",
            department: "Cardiology",
            visitType: "OPD",
            diagnosis: "Chest Pain",
        },
        {
            id: "7",
            visitNo: "VIS-007",
            visitDate: "29-06-2026",
            doctor: "Dr. Priya Gupta",
            department: "Neurology",
            visitType: "Follow Up",
            diagnosis: "Vertigo",
        },
        {
            id: "8",
            visitNo: "VIS-008",
            visitDate: "30-06-2026",
            doctor: "Dr. Amit Verma",
            department: "Orthopedics",
            visitType: "Emergency",
            diagnosis: "Fracture",
        },
        {
            id: "9",
            visitNo: "VIS-009",
            visitDate: "02-07-2026",
            doctor: "Dr. Neha Singh",
            department: "ENT",
            visitType: "OPD",
            diagnosis: "Throat Infection",
        },
        {
            id: "10",
            visitNo: "VIS-010",
            visitDate: "05-07-2026",
            doctor: "Dr. Vivek Kumar",
            department: "General Medicine",
            visitType: "Follow Up",
            diagnosis: "Fever",
        },
        {
            id: "11",
            visitNo: "VIS-011",
            visitDate: "08-07-2026",
            doctor: "Dr. Rajesh Sharma",
            department: "Cardiology",
            visitType: "OPD",
            diagnosis: "Heart Checkup",
        },
        {
            id: "12",
            visitNo: "VIS-012",
            visitDate: "10-07-2026",
            doctor: "Dr. Priya Gupta",
            department: "Neurology",
            visitType: "Emergency",
            diagnosis: "Seizure",
        },
    ];

    /********************************************
        Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Filter Data
    *********************************************/
    const filteredData = useMemo(() => {

        return ALL_VISIT_HISTORY_DATA.filter((item) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                item.visitNo.toLowerCase().includes(searchValue) ||
                item.visitDate.toLowerCase().includes(searchValue) ||
                item.doctor.toLowerCase().includes(searchValue) ||
                item.department.toLowerCase().includes(searchValue) ||
                item.visitType.toLowerCase().includes(searchValue) ||
                item.diagnosis.toLowerCase().includes(searchValue);

            const matchesDepartment =
                !selectedDepartment ||
                item.department.toLowerCase() ===
                selectedDepartment.name.toLowerCase();

            const matchesDoctor =
                !selectedDoctor ||
                item.doctor.toLowerCase() ===
                selectedDoctor.name.toLowerCase();

            const matchesVisitType =
                !selectedVisitType ||
                item.visitType.toLowerCase() ===
                selectedVisitType.name.toLowerCase();

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesDoctor &&
                matchesVisitType
            );

        });

    }, [
        globalSearch,
        selectedDepartment,
        selectedDoctor,
        selectedVisitType,
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
                    bootstrap.Tooltip.getInstance(element);

                if (tooltip) {
                    tooltip.dispose();
                }

            });

        };

    }, [visibleData]);

    const columns: ColumnActionRow<PatientVisitHistoryData>[] = [

        {
            key: "visitNo",
            header: <>Visit No</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "visitDate",
            header: <>Visit Date</>,
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
            key: "department",
            header: <>Department</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "visitType",
            header: <>Visit Type</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "diagnosis",
            header: <>Diagnosis</>,
            className: "text-center",
        },

    ];

    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedDepartment(null);
        setSelectedDoctor(null);
        setSelectedVisitType(null);
        setCurrentPage(1);

    };

    return (
        <>

            <div className="d-flex justify-content-between align-items-center gap-4 my-2">
                <p className="fs-18 fw-500">Visit History</p>
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
                        options={departmentOptions}
                        value={selectedDepartment}
                        placeholder="Department"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedDepartment(selected);
                            setCurrentPage(1);

                        }}
                    />

                </div>

                <div>

                    <CustomFilterDropdown
                        options={doctorOptions}
                        value={selectedDoctor}
                        placeholder="Doctor"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedDoctor(selected);
                            setCurrentPage(1);

                        }}
                    />

                </div>

                <div>

                    <CustomFilterDropdown
                        options={visitTypeOptions}
                        value={selectedVisitType}
                        placeholder="Visit Type"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {

                            setSelectedVisitType(selected);
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
                    data={visibleData}
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

                            setItemsPerPage(rows);
                            setCurrentPage(1);

                        }}
                    />

                </div>

            </div>

        </>
    );

}