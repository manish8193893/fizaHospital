import { useMemo, useState } from "react";

import Pagination from "../../GlobalHelpers/Pagination";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import GlobalGridTable, { type ColumnActionRow } from "../../GlobalHelpers/GlobalGridTable";



interface VaccineTableData {
    vaccineName: string;
    dateGiven: string;
    nextDueDate: string;
    notes: string;
}

export default function Immunization() {
    const [selectedDateGiven, setSelectedDateGiven] = useState<Date | null>(null);
    const [showDateGivenCalendar, setShowDateGivenCalendar] = useState(false);

    const [selectedNextDueDate, setSelectedNextDueDate] = useState<Date | null>(null);
    const [showNextDueDateCalendar, setShowNextDueDateCalendar] = useState(false);
    /********************************************
        Name : Manish Kumar
        Date : 06/06/2026
        Purpose : STATE VARIABLES
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    const [formData, setFormData] = useState({
        vaccineName: "",
        comments: "",
    });

    const ALL_VACCINE_DATA: VaccineTableData[] = [
        {
            vaccineName: "COVID-19 Booster",
            dateGiven: "15/01/2026",
            nextDueDate: "15/01/2027",
            notes: "Annual booster recommended.",
        },
        {
            vaccineName: "Influenza Vaccine",
            dateGiven: "10/10/2025",
            nextDueDate: "10/10/2026",
            notes: "Seasonal flu vaccination.",
        },
        {
            vaccineName: "Hepatitis B",
            dateGiven: "20/03/2025",
            nextDueDate: "N/A",
            notes: "Vaccination course completed.",
        },
    ];

    const columns: ColumnActionRow<VaccineTableData>[] = [
        {
            key: "vaccineName",
            header: <>Vaccine Name</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.vaccineName.localeCompare(b.vaccineName),
        },

        {
            key: "dateGiven",
            header: <>Date Given</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.dateGiven.localeCompare(b.dateGiven),
        },

        {
            key: "nextDueDate",
            header: <>Next Due Date</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.nextDueDate.localeCompare(b.nextDueDate),
        },

        {
            key: "notes",
            header: <>Notes</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.notes.localeCompare(b.notes),
        },

        {
            key: "action",
            header: <>Actions</>,
            className: "text-center",
            width: "120px",
            render: (row) => (
                <div className="d-flex justify-content-center gap-2">
                    <button
                        type="button"
                        className="edit"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Edit"
                        onClick={() =>
                            console.log(
                                "Edit Vaccine:",
                                row.vaccineName
                            )
                        }
                    >
                        <i className="ri-edit-box-line fs-18"></i>
                    </button>

                    <button
                        type="button"
                        className="delete"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Delete"
                        onClick={() =>
                            console.log(
                                "Delete Vaccine:",
                                row.vaccineName
                            )
                        }
                    >
                        <i className="ri-delete-bin-7-line fs-18"></i>
                    </button>
                </div>
            ),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 06/06/2026
        Purpose : PAGINATION
    *********************************************/
    const totalPages = Math.ceil(
        ALL_VACCINE_DATA.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        return ALL_VACCINE_DATA.slice(
            startIndex,
            endIndex
        );

    }, [
        currentPage,
        itemsPerPage,
    ]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        const payload = {
            vaccineName: formData.vaccineName,
            dateGiven: selectedDateGiven,
            nextDueDate: selectedNextDueDate,
            comments: formData.comments,
        };

        console.log("Immunization Data :", payload);
    };

    return (
        <div className="formContainer">

            <h5 className="fs-18 fw-500 mb-4">
                Immunization
            </h5>

            {/* Row 1 */}

            <div className="formRow">

                <div className="formGroup">
                    <label className="customLabel">
                        Vaccine Name <span className='text-danger'>*</span>
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="vaccineName"
                            placeholder="Enter Vaccine Name"
                            value={formData.vaccineName}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-shield-cross-line"></i>
                    </div>
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Date Given <span className='text-danger'>*</span>
                    </label>

                    <div style={{ position: "relative" }}>
                        <div
                            className="customInput d-flex align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                setShowDateGivenCalendar(!showDateGivenCalendar)
                            }
                        >
                            {selectedDateGiven
                                ? `${String(selectedDateGiven.getDate()).padStart(2, "0")}/${String(selectedDateGiven.getMonth() + 1).padStart(2, "0")}/${selectedDateGiven.getFullYear()}`
                                : "DD/MM/YYYY"}
                        </div>

                        {showDateGivenCalendar && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    zIndex: 1000,
                                    marginTop: "4px",
                                }}
                            >
                                <DateFilterCalendar
                                    selectedDate={selectedDateGiven}
                                    onDateSelect={(date) => {
                                        setSelectedDateGiven(date);
                                        setShowDateGivenCalendar(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Next Due Date <span className='text-danger'>*</span>
                    </label>

                    <div style={{ position: "relative" }}>
                        <div
                            className="customInput d-flex align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                setShowNextDueDateCalendar(!showNextDueDateCalendar)
                            }
                        >
                            {selectedNextDueDate
                                ? `${String(selectedNextDueDate.getDate()).padStart(2, "0")}/${String(selectedNextDueDate.getMonth() + 1).padStart(2, "0")}/${selectedNextDueDate.getFullYear()}`
                                : "DD/MM/YYYY"}
                        </div>

                        {showNextDueDateCalendar && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    zIndex: 1000,
                                    marginTop: "4px",
                                }}
                            >
                                <DateFilterCalendar
                                    selectedDate={selectedNextDueDate}
                                    onDateSelect={(date) => {
                                        setSelectedNextDueDate(date);
                                        setShowNextDueDateCalendar(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Row 2 */}

            <div className="formRow">

                <div className="formGroup">
                    <label className="customLabel">
                        Comments
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="comments"
                            placeholder="Enter Comments"
                            value={formData.comments}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-chat-1-line"></i>
                    </div>
                </div>

            </div>

            {/* Add Button */}

            <div className="mt-5 d-flex justify-content-end">
                <button
                    type="button"
                    onClick={handleAdd}
                    className="btn bg-blue col-md-4 text-white px-5"
                    style={{
                        height: "48px",
                    }}
                >
                    Add
                </button>
            </div>

            {/* Grid Table */}
            <div className="d-flex flex-column mt-3">

                <h5 className="fw-500 text-black fs-18 mb-2">Immunization</h5>

                <GlobalGridTable
                    data={visibleTableData}
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

        </div>
    );
}