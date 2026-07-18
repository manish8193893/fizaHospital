import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";

import Pagination from "../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow, } from "../../GlobalHelpers/GlobalGridTable";




interface PatientTableData {
    id: string;
    name: string;
    age: number;
    gender: "Male" | "Female";
    phone: string;
    patientType: "InPatient" | "OutPatient/Consultant";
    lastVisitDate: string;
}

export default function PatientGridTable() {

    const navigate = useNavigate();

    const [globalSearch, setGlobalSearch] = useState("");

    const [selectedGender, setSelectedGender] =
        useState<DropdownOption | null>(null);

    const [selectedPatientType, setSelectedPatientType] =
        useState<DropdownOption | null>(null);

    const genderOptions: DropdownOption[] = [
        {
            id: "male",
            name: "Male",
        },
        {
            id: "female",
            name: "Female",
        },
    ];

    const patientTypeOptions: DropdownOption[] = [
        {
            id: "inpatient",
            name: "InPatient",
        },
        {
            id: "outpatient",
            name: "OutPatient/Consultant",
        },
    ];

    const ALL_PATIENT_DATA: PatientTableData[] = [
        {
            id: "PT001",
            name: "Amit Sharma",
            age: 28,
            gender: "Male",
            phone: "9876543210",
            patientType: "OutPatient/Consultant",
            lastVisitDate: "15-Jun-2026",
        },
        {
            id: "PT002",
            name: "Neha Verma",
            age: 32,
            gender: "Female",
            phone: "9876543211",
            patientType: "InPatient",
            lastVisitDate: "14-Jun-2026",
        },
        {
            id: "PT003",
            name: "Rohan Gupta",
            age: 41,
            gender: "Male",
            phone: "9876543212",
            patientType: "OutPatient/Consultant",
            lastVisitDate: "13-Jun-2026",
        },
        {
            id: "PT004",
            name: "Priya Singh",
            age: 26,
            gender: "Female",
            phone: "9876543213",
            patientType: "InPatient",
            lastVisitDate: "12-Jun-2026",
        },
        {
            id: "PT005",
            name: "Ankit Jain",
            age: 37,
            gender: "Male",
            phone: "9876543214",
            patientType: "OutPatient/Consultant",
            lastVisitDate: "11-Jun-2026",
        },
        {
            id: "PT006",
            name: "Kavita Mishra",
            age: 44,
            gender: "Female",
            phone: "9876543215",
            patientType: "InPatient",
            lastVisitDate: "10-Jun-2026",
        },
        {
            id: "PT007",
            name: "Rahul Kumar",
            age: 35,
            gender: "Male",
            phone: "9876543216",
            patientType: "OutPatient/Consultant",
            lastVisitDate: "09-Jun-2026",
        },
        {
            id: "PT008",
            name: "Sneha Agarwal",
            age: 31,
            gender: "Female",
            phone: "9876543217",
            patientType: "InPatient",
            lastVisitDate: "08-Jun-2026",
        },
        {
            id: "PT009",
            name: "Vikas Yadav",
            age: 48,
            gender: "Male",
            phone: "9876543218",
            patientType: "OutPatient/Consultant",
            lastVisitDate: "07-Jun-2026",
        },
        {
            id: "PT010",
            name: "Pooja Gupta",
            age: 29,
            gender: "Female",
            phone: "9876543219",
            patientType: "InPatient",
            lastVisitDate: "06-Jun-2026",
        },
        {
            id: "PT011",
            name: "Deepak Sharma",
            age: 39,
            gender: "Male",
            phone: "9876543220",
            patientType: "OutPatient/Consultant",
            lastVisitDate: "05-Jun-2026",
        },
        {
            id: "PT012",
            name: "Nidhi Kapoor",
            age: 24,
            gender: "Female",
            phone: "9876543221",
            patientType: "InPatient",
            lastVisitDate: "04-Jun-2026",
        },
        {
            id: "PT013",
            name: "Arjun Mehta",
            age: 50,
            gender: "Male",
            phone: "9876543222",
            patientType: "OutPatient/Consultant",
            lastVisitDate: "03-Jun-2026",
        },
        {
            id: "PT014",
            name: "Ritika Saini",
            age: 34,
            gender: "Female",
            phone: "9876543223",
            patientType: "InPatient",
            lastVisitDate: "02-Jun-2026",
        },
        {
            id: "PT015",
            name: "Mohit Arora",
            age: 42,
            gender: "Male",
            phone: "9876543224",
            patientType: "OutPatient/Consultant",
            lastVisitDate: "01-Jun-2026",
        },
    ];

    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    const filteredPatients = useMemo(() => {

        return ALL_PATIENT_DATA.filter((patient) => {

            const searchValue =
                globalSearch.toLowerCase();

            const matchesSearch =
                patient.id.toLowerCase().includes(searchValue) ||
                patient.name.toLowerCase().includes(searchValue) ||
                patient.phone.toLowerCase().includes(searchValue);

            const matchesGender =
                !selectedGender ||
                patient.gender.toLowerCase() ===
                selectedGender.name.toLowerCase();

            const matchesPatientType =
                !selectedPatientType ||
                patient.patientType.toLowerCase() ===
                selectedPatientType.name.toLowerCase();

            return (
                matchesSearch &&
                matchesGender &&
                matchesPatientType
            );

        });

    }, [
        globalSearch,
        selectedGender,
        selectedPatientType,
    ]);

    const totalPages = Math.ceil(
        filteredPatients.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        return filteredPatients.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    }, [
        filteredPatients,
        currentPage,
        itemsPerPage,
    ]);

    const columns: ColumnActionRow<PatientTableData>[] = [

        {
            key: "id",
            header: <>ID</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "age",
            header: <>Age</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "gender",
            header: <>Gender</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "phone",
            header: <>Phone</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "patientType",
            header: <>Patient Type</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "lastVisitDate",
            header: <>Last Visit Date</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "180px",

            render: (row) => (
                <div className="d-flex justify-content-center gap-2">

                    {/* View */}
                    <button
                        type="button"
                        className="eye"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="View"
                        onClick={() => {
                            console.log("View :", row),
                                navigate("/patients/PatientsDetails")
                        }}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    {/* Edit */}
                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Edit"
                        onClick={() => {
                            console.log("Edit :", row),
                                navigate("/patients/PatientsDetails")
                        }}
                    >
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </button>

                    {/* Book Appointment */}
                    <button
                        type="button"
                        className="Check-In"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Book Appointment"
                        onClick={() => {
                            console.log("Book Appointment :", row),
                                navigate("/patients/PatientsDetails")
                        }}
                    >
                        <i className="fs-18 ri-calendar-schedule-line"></i>
                    </button>

                    {/* Medical Record */}
                    <button
                        type="button"
                        className="printer"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Medical Record"
                        onClick={() => {
                            console.log("Medical Record :", row),
                                navigate("/patients/PatientsDetails")
                        }}
                    >
                        <i className="fs-18 ri-health-book-line"></i>
                    </button>

                </div>
            ),
        },
    ];

    useEffect(() => {
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');

        // Initialize all tooltips
        tooltipElements.forEach((element) => {
            new bootstrap.Tooltip(element);
        });

        // Cleanup tooltips on unmount or re-render
        return () => {
            tooltipElements.forEach((element) => {
                const tooltip = bootstrap.Tooltip.getInstance(element);
                if (tooltip) {
                    tooltip.dispose();
                }
            });
        };
    }, [visibleTableData]);


    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedGender(null);
        setSelectedPatientType(null);
        setCurrentPage(1);

    };

    return (
        <>
            <div
                className="d-flex justify-content-between align-items-center gap-4 mt-4 mb-4"
                style={{ maxHeight: "45px" }}
            >
                <p className="fs-18 fw-500">
                    Patient List
                </p>

                <div
                    className="Plus-btn"
                    onClick={() =>
                        navigate("/reception/NewPatients")
                    }
                >
                    <div className="text-white fs-14 fw-400">
                        New Patient
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
                        options={genderOptions}
                        value={selectedGender}
                        placeholder="Gender"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedGender(selected);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={patientTypeOptions}
                        value={selectedPatientType}
                        placeholder="Patient Type"
                        customClass="aph-filter-dropdown"
                        onChange={(selected) => {
                            setSelectedPatientType(
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
        </>
    )
}