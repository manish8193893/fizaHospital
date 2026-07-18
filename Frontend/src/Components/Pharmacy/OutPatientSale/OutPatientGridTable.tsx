import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import GlobalGridTable, { type ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";


import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import { useNavigate } from "react-router-dom";

interface OPDData {
    id: string;
    rxNumber: string;
    name: string;
    genderAge: string;
    doctor: string;
    dateTime: string;
    status: "Waiting" | "Dispensed";
}

export default function OutPatientGridTable() {

    const [globalSearch, setGlobalSearch] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [selectedStatus, setSelectedStatus] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const navigate = useNavigate();

    const doctorOptions = [
        { id: "1", name: "Dr. Rajesh Sharma" },
        { id: "2", name: "Dr. Priya Gupta" },
        { id: "3", name: "Dr. Amit Verma" },
    ];

    const statusOptions = [
        { id: "waiting", name: "Waiting" },
        { id: "dispensed", name: "Dispensed" },
    ];

    const ALL_OPD_DATA: OPDData[] = [
        {
            id: "RX001",
            rxNumber: "RX-1001",
            name: "Aarav Sharma",
            genderAge: "Male / 28",
            doctor: "Dr. Rajesh Sharma",
            dateTime: "2026-06-01 10:30",
            status: "Waiting",
        },
        {
            id: "RX002",
            rxNumber: "RX-1002",
            name: "Priya Verma",
            genderAge: "Female / 32",
            doctor: "Dr. Priya Gupta",
            dateTime: "2026-06-01 11:00",
            status: "Dispensed",
        },
        {
            id: "RX003",
            rxNumber: "RX-1003",
            name: "Rohit Singh",
            genderAge: "Male / 40",
            doctor: "Dr. Amit Verma",
            dateTime: "2026-06-02 09:15",
            status: "Waiting",
        },
        {
            id: "RX004",
            rxNumber: "RX-1004",
            name: "Neha Gupta",
            genderAge: "Female / 26",
            doctor: "Dr. Neha Singh",
            dateTime: "2026-06-02 12:45",
            status: "Dispensed",
        },
        {
            id: "RX005",
            rxNumber: "RX-1005",
            name: "Vikram Mehta",
            genderAge: "Male / 35",
            doctor: "Dr. Rajesh Sharma",
            dateTime: "2026-06-03 10:10",
            status: "Waiting",
        },
        {
            id: "RX006",
            rxNumber: "RX-1006",
            name: "Anjali Kapoor",
            genderAge: "Female / 29",
            doctor: "Dr. Priya Gupta",
            dateTime: "2026-06-03 11:20",
            status: "Dispensed",
        },
        {
            id: "RX007",
            rxNumber: "RX-1007",
            name: "Suresh Yadav",
            genderAge: "Male / 45",
            doctor: "Dr. Amit Verma",
            dateTime: "2026-06-04 09:30",
            status: "Waiting",
        },
        {
            id: "RX008",
            rxNumber: "RX-1008",
            name: "Kavya Nair",
            genderAge: "Female / 22",
            doctor: "Dr. Neha Singh",
            dateTime: "2026-06-04 10:50",
            status: "Dispensed",
        },
        {
            id: "RX009",
            rxNumber: "RX-1009",
            name: "Manish Kashyap",
            genderAge: "Male / 30",
            doctor: "Dr. Rajesh Sharma",
            dateTime: "2026-06-05 08:40",
            status: "Waiting",
        },
        {
            id: "RX010",
            rxNumber: "RX-1010",
            name: "Simran Kaur",
            genderAge: "Female / 27",
            doctor: "Dr. Priya Gupta",
            dateTime: "2026-06-05 11:15",
            status: "Dispensed",
        },
        {
            id: "RX011",
            rxNumber: "RX-1011",
            name: "Amit Joshi",
            genderAge: "Male / 38",
            doctor: "Dr. Amit Verma",
            dateTime: "2026-06-06 09:25",
            status: "Waiting",
        },
        {
            id: "RX012",
            rxNumber: "RX-1012",
            name: "Pooja Sharma",
            genderAge: "Female / 31",
            doctor: "Dr. Neha Singh",
            dateTime: "2026-06-06 10:45",
            status: "Dispensed",
        },
        {
            id: "RX013",
            rxNumber: "RX-1013",
            name: "Ravi Kumar",
            genderAge: "Male / 36",
            doctor: "Dr. Rajesh Sharma",
            dateTime: "2026-06-07 09:10",
            status: "Waiting",
        },
        {
            id: "RX014",
            rxNumber: "RX-1014",
            name: "Sneha Reddy",
            genderAge: "Female / 24",
            doctor: "Dr. Priya Gupta",
            dateTime: "2026-06-07 11:30",
            status: "Dispensed",
        },
        {
            id: "RX015",
            rxNumber: "RX-1015",
            name: "Deepak Singh",
            genderAge: "Male / 42",
            doctor: "Dr. Amit Verma",
            dateTime: "2026-06-08 10:05",
            status: "Waiting",
        },
    ];

    const filteredData = useMemo(() => {

        return ALL_OPD_DATA.filter((item) => {

            const search = globalSearch.toLowerCase();

            const matchesSearch =
                item.rxNumber.toLowerCase().includes(search) ||
                item.name.toLowerCase().includes(search) ||
                item.doctor.toLowerCase().includes(search);

            const matchesDoctor =
                !selectedDoctor || item.doctor === selectedDoctor.name;

            const matchesStatus =
                !selectedStatus || item.status === selectedStatus.name;

            const matchesDate =
                !selectedDate ||
                item.dateTime.startsWith(
                    `${selectedDate.getFullYear()}-${String(
                        selectedDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(
                        selectedDate.getDate()
                    ).padStart(2, "0")}`
                );

            return matchesSearch && matchesDoctor && matchesStatus && matchesDate;

        });

    }, [ALL_OPD_DATA, globalSearch, selectedDoctor, selectedStatus, selectedDate]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const visibleData = useMemo(() => {

        const start = (currentPage - 1) * itemsPerPage;

        return filteredData.slice(start, start + itemsPerPage);

    }, [filteredData, currentPage, itemsPerPage]);

    const columns: ColumnActionRow<OPDData>[] = [

        {
            key: "rxNumber",
            header: <>Rx Number</>,
            className: "text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
        },

        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
        },

        {
            key: "genderAge",
            header: <>Gender / Age</>,
            className: "text-center",
        },

        {
            key: "doctor",
            header: <>Doctor</>,
            className: "text-center",
        },

        {
            key: "dateTime",
            header: <>Date & Time</>,
            className: "text-center",
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            render: (row) => (
                <span
                    className={`px-3 py-1 rounded-pill ${row.status === "Waiting"
                        ? "status-pending"
                        : "status-confirmed"
                        }`}
                >
                    {row.status}
                </span>
            ),
        },

        {
            key: "action",
            header: <>Action</>,
            className: "",
            render: (row) => (
                <div className="d-flex justify-content-start gap-2">

                    <button
                        type="button"
                        className="eye"
                        onClick={()=>navigate("/pharmacy/OutPatientSale/View")}
                        data-bs-toggle="tooltip"
                        data-bs-title="View"
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    {row.status === "Dispensed" && (
                        <button
                            type="button"
                            className="aph-filter-btn bg-blue text-white"
                            onClick={() => console.log("Dispensed:", row)}
                        >
                            Dispensed
                        </button>
                    )}

                </div>
            )
        },
    ];

    const handleDateSelect = (date: Date | null) => {
        setSelectedDate(date);
        setShowCalendar(false);
        setCurrentPage(1);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleResetFilters = () => {

        setGlobalSearch("");
        setSelectedDoctor(null);
        setSelectedStatus(null);
        setSelectedDate(null);
        setCurrentPage(1);

    };

    useEffect(() => {
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltips = Array.from(tooltipElements).map((element) => new bootstrap.Tooltip(element));

        return () => {
            tooltips.forEach((tooltip) => tooltip.dispose());
        };
    }, [visibleData]);


    return (
        <>
            <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                <h5 className="fs-18 fw-500">Out Patient Sales</h5>
            </div>

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
                    <button className="aph-search-btn">
                        <i className="ri-search-line"></i>
                    </button>
                </div>

                <div>
                    <CustomFilterDropdown
                        options={doctorOptions}
                        value={selectedDoctor}
                        placeholder="Doctor"
                        customClass="aph-filter-dropdown"
                        onChange={(val) => {
                            setSelectedDoctor(val);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={statusOptions}
                        value={selectedStatus}
                        placeholder="Status"
                        customClass="aph-filter-dropdown"
                        onChange={(val) => {
                            setSelectedStatus(val);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="aph-calendar-filter" ref={calendarRef}>
                    <button className="aph-filter-btn outline-0" onClick={() => setShowCalendar(!showCalendar)}>
                        <i className="ri-calendar-line" />
                        <span>
                            {selectedDate
                                ? `${String(selectedDate.getDate()).padStart(2, "0")}/${String(selectedDate.getMonth() + 1).padStart(2, "0")}/${selectedDate.getFullYear()}`
                                : "Date"}
                        </span>
                    </button>

                    {showCalendar && (
                        <div className="aph-calendar-popup">
                            <DateFilterCalendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                        </div>
                    )}
                </div>

                <button
                    className="aph-filter-btn outline-0"
                    onClick={handleResetFilters}
                >
                    <i className="ri-filter-off-line"></i>
                </button>
            </div>

            <div className="d-flex flex-column">
                {/* TABLE */}
                <GlobalGridTable
                    data={visibleData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                {/* PAGINATION */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(r) => {
                        setItemsPerPage(r);
                        setCurrentPage(1);
                    }}
                />
            </div>
        </>
    );

}