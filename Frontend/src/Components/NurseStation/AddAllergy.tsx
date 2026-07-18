import { useMemo, useState } from "react";

import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, { type DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";


import type { ColumnActionRow } from "../../GlobalHelpers/GlobalGridTable";
import GlobalGridTable from "../../GlobalHelpers/GlobalGridTable";
import Pagination from "../../GlobalHelpers/Pagination";

/********************************************
    Name : Allergy Table Types
    Date : 06/06/2026
    Purpose : ALLERGY TABLE DATA TYPE
*********************************************/
interface AllergyTableData {
    allergyType: string;
    allergen: string;
    reaction: string;
    severity: "Critical" | "Mild" | "Moderate" | "Severe";
    dateNoted: string;
    notes: string;
}

export default function AddAllergy() {
    const [selectedAllergyType, setSelectedAllergyType] = useState<DropdownOption | null>(null);
    const [selectedSeverity, setSelectedSeverity] = useState<DropdownOption | null>(null);

    const [selectedDateNoted, setSelectedDateNoted] = useState<Date | null>(null);
    const [showDateNotedCalendar, setShowDateNotedCalendar] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 06/06/2026
        Purpose : STATE VARIABLES
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    const [formData, setFormData] = useState({
        allergen: "",
        reaction: "",
        comment: "",
    });

    const ALLERGY_TYPE_OPTIONS: DropdownOption[] = [
        { id: "Drug Allergy", name: "Drug Allergy" },
        { id: "Environmental Allergy", name: "Environmental Allergy" },
        { id: "Food Allergy", name: "Food Allergy" },
        { id: "Insect Allergy", name: "Insect Allergy" },
        { id: "Latex Allergy", name: "Latex Allergy" },
        { id: "Other Allergy", name: "Other Allergy" },
    ];

    const SEVERITY_OPTIONS: DropdownOption[] = [
        { id: "Critical", name: "Critical" },
        { id: "Mild", name: "Mild" },
        { id: "Moderate", name: "Moderate" },
        { id: "Severe", name: "Severe" },
    ];

    const ALL_ALLERGY_DATA: AllergyTableData[] = [
        {
            allergyType: "Food Allergy",
            allergen: "Peanuts",
            reaction: "Skin Rash",
            severity: "Severe",
            dateNoted: "15/03/2026",
            notes: "Avoid all peanut-containing products.",
        },
        {
            allergyType: "Drug Allergy",
            allergen: "Penicillin",
            reaction: "Breathing Difficulty",
            severity: "Critical",
            dateNoted: "22/01/2026",
            notes: "Immediate medical attention required if exposed.",
        },
        {
            allergyType: "Environmental Allergy",
            allergen: "Pollen",
            reaction: "Sneezing & Watery Eyes",
            severity: "Moderate",
            dateNoted: "10/04/2026",
            notes: "Symptoms worsen during spring season.",
        },
    ];

    /********************************************
        Name : Allergy Table Columns
        Date : 06/06/2026
        Purpose : ALLERGY GRID COLUMNS
    *********************************************/
    const columns: ColumnActionRow<AllergyTableData>[] = [
        {
            key: "allergyType",
            header: <>Allergy Type</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.allergyType.localeCompare(b.allergyType),
        },

        {
            key: "allergen",
            header: <>Allergen</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.allergen.localeCompare(b.allergen),
        },

        {
            key: "reaction",
            header: <>Reaction</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.reaction.localeCompare(b.reaction),
        },

        {
            key: "severity",
            header: <>Severity</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.severity.localeCompare(b.severity),

            render: (row) => {
                const severityStyles = {
                    Critical: "status-cancelled",
                    Severe: "status-pending",
                    Moderate: "status-confirmed",
                    Mild: "status-paid",
                };

                return (
                    <div className="flex justify-center">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${severityStyles[row.severity]}`}
                        >
                            {row.severity}
                        </span>
                    </div>
                );
            },
        },

        {
            key: "dateNoted",
            header: <>Date Noted</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.dateNoted.localeCompare(b.dateNoted),
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
                            console.log("Edit Allergy:", row.allergen)
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
                            console.log("Delete Allergy:", row.allergen)
                        }
                    >
                        <i className="ri-delete-bin-7-line fs-18"></i>
                    </button>
                </div>
            ),
        },
    ];


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /********************************************
        Name : Manish Kumar
        Date : 06/06/2026
        Purpose : PAGINATION
    *********************************************/
    const totalPages = Math.ceil(
        ALL_ALLERGY_DATA.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        return ALL_ALLERGY_DATA.slice(
            startIndex,
            endIndex
        );

    }, [
        currentPage,
        itemsPerPage,
    ]);

    const handleAdd = () => {
        const payload = {
            allergyType: selectedAllergyType,
            severity: selectedSeverity,
            dateNoted: selectedDateNoted,
            ...formData,
        };

        console.log("Allergy Data :", payload);
    };


    return (
        <div className="formContainer">

            <h5 className="fs-18 fw-500 mb-4">
                Allergies
            </h5>

            {/* Row 1 */}

            <div className="formRow">

                <div className="formGroup">
                    <label className="customLabel">
                        Allergy Type <span className='text-danger'>*</span>
                    </label>

                    <CustomFormDropdown
                        options={ALLERGY_TYPE_OPTIONS}
                        value={selectedAllergyType}
                        onChange={(value) => setSelectedAllergyType(value)}
                        placeholder="Select Allergy Type"
                        required={true}
                    />
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Allergen <span className='text-danger'>*</span>
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="allergen"
                            placeholder="Enter Allergen"
                            value={formData.allergen}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-virus-line"></i>
                    </div>
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Reaction <span className='text-danger'>*</span>
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="reaction"
                            placeholder="Enter Reaction"
                            value={formData.reaction}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-alert-line"></i>
                    </div>
                </div>

            </div>

            {/* Row 2 */}

            <div className="formRow">

                <div className="formGroup">
                    <label className="customLabel">
                        Severity <span className='text-danger'>*</span>
                    </label>

                    <CustomFormDropdown
                        options={SEVERITY_OPTIONS}
                        value={selectedSeverity}
                        onChange={(value) => setSelectedSeverity(value)}
                        placeholder="Select Severity"
                        required={true}
                    />
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Date Noted <span className='text-danger'>*</span>
                    </label>

                    <div style={{ position: "relative" }}>
                        <div
                            className="customInput d-flex align-items-center"
                            onClick={() =>
                                setShowDateNotedCalendar(!showDateNotedCalendar)
                            }
                            style={{ cursor: "pointer" }}
                        >
                            {selectedDateNoted
                                ? `${String(selectedDateNoted.getDate()).padStart(2, "0")}/${String(selectedDateNoted.getMonth() + 1).padStart(2, "0")}/${selectedDateNoted.getFullYear()}`
                                : "DD/MM/YYYY"}
                        </div>

                        {showDateNotedCalendar && (
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
                                    selectedDate={selectedDateNoted}
                                    onDateSelect={(date) => {
                                        setSelectedDateNoted(date);
                                        setShowDateNotedCalendar(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Comment
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="comment"
                            placeholder="Enter Comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-chat-1-line"></i>
                    </div>
                </div>

            </div>

            {/* Button */}

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

                <h5 className="fw-500 text-black fs-18 mb-2">Allergy</h5>

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