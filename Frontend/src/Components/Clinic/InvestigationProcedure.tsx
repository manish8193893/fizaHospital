import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import CustomFormDropdown, { type DropdownOption, } from "../../GlobalHelpers/CustomFormDropdown";

import "../../styles/DoctorDashboard.css"

type InvestigationRecord = {
    id: number;
    investigationType: string;
    laboratory: string;
    notes: string;
    isUrgent: boolean;
    isEdited: boolean;
    isDeleted: boolean;
};

export default function InvestigationProcedure() {

    const [selectedLaboratory, setSelectedLaboratory] = useState<DropdownOption | null>(null);

    const [selectedInvestigationType, setSelectedInvestigationType] = useState<DropdownOption | null>(null);

    const [investigations, setInvestigations] = useState<InvestigationRecord[]>([]);

    const [showNotesModal, setShowNotesModal] = useState(false);

    const [selectedRecord, setSelectedRecord] = useState<InvestigationRecord | null>(null);

    const [noteValue, setNoteValue] = useState("");

    /********************************************
        Name : Manish Kumar
        Date : 07/06/2026
        Purpose : INVESTIGATION TYPE OPTIONS
    *********************************************/
    const INVESTIGATION_TYPE_OPTIONS: DropdownOption[] = [
        {
            id: "Amniotic fluid specimen",
            name: "Amniotic fluid specimen",
        },
        {
            id: "Blood Specimen",
            name: "Blood Specimen",
        },
        {
            id: "Blood",
            name: "Blood",
        },
        {
            id: "Cerebrospinal fluid",
            name: "Cerebrospinal fluid",
        },
        {
            id: "Cervical Swab",
            name: "Cervical Swab",
        },
        {
            id: "Plasma",
            name: "Plasma",
        },
        {
            id: "Semen",
            name: "Semen",
        },
        {
            id: "Saliva",
            name: "Saliva",
        },
        {
            id: "Serum",
            name: "Serum",
        },
        {
            id: "Skin",
            name: "Skin",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 07/06/2026
        Purpose : LABORATORY OPTIONS MAPPING
    *********************************************/
    const LABORATORY_MAPPING: Record<
        string,
        DropdownOption[]
    > = {
        "Amniotic fluid specimen": [
            {
                id: "Prenatal Genetics Lab",
                name: "Prenatal Genetics Lab",
            },
            {
                id: "Maternal Diagnostics Lab",
                name: "Maternal Diagnostics Lab",
            },
        ],

        "Blood Specimen": [
            {
                id: "Clinical Pathology Lab",
                name: "Clinical Pathology Lab",
            },
            {
                id: "Hematology Lab",
                name: "Hematology Lab",
            },
        ],

        Blood: [
            {
                id: "Blood Bank",
                name: "Blood Bank",
            },
            {
                id: "Biochemistry Lab",
                name: "Biochemistry Lab",
            },
        ],

        "Cerebrospinal fluid": [
            {
                id: "Neurology Lab",
                name: "Neurology Lab",
            },
            {
                id: "Microbiology Lab",
                name: "Microbiology Lab",
            },
        ],

        "Cervical Swab": [
            {
                id: "Cytology Lab",
                name: "Cytology Lab",
            },
            {
                id: "Women's Health Lab",
                name: "Women's Health Lab",
            },
        ],

        Plasma: [
            {
                id: "Coagulation Lab",
                name: "Coagulation Lab",
            },
            {
                id: "Immunology Lab",
                name: "Immunology Lab",
            },
        ],

        Semen: [
            {
                id: "Andrology Lab",
                name: "Andrology Lab",
            },
            {
                id: "Fertility Lab",
                name: "Fertility Lab",
            },
        ],

        Saliva: [
            {
                id: "Molecular Diagnostics Lab",
                name: "Molecular Diagnostics Lab",
            },
            {
                id: "Genetics Lab",
                name: "Genetics Lab",
            },
        ],

        Serum: [
            {
                id: "Serology Lab",
                name: "Serology Lab",
            },
            {
                id: "Immunology Lab",
                name: "Immunology Lab",
            },
        ],

        Skin: [
            {
                id: "Dermatopathology Lab",
                name: "Dermatopathology Lab",
            },
            {
                id: "Histopathology Lab",
                name: "Histopathology Lab",
            },
        ],
    };

    const laboratoryOptions = useMemo(() => {

        if (!selectedInvestigationType)
            return [];

        return (
            LABORATORY_MAPPING[
            selectedInvestigationType.id
            ] || []
        );

    }, [selectedInvestigationType]);

    const handleAdd = () => {

        if (
            !selectedInvestigationType ||
            !selectedLaboratory
        ) {
            return;
        }

        const newRecord: InvestigationRecord = {
            id: Date.now(),
            investigationType:
                selectedInvestigationType.name,
            laboratory:
                selectedLaboratory.name,
            notes: "",
            isUrgent: false,
            isEdited: false,
            isDeleted: false,
        };

        setInvestigations((prev) => [
            ...prev,
            newRecord,
        ]);

        setSelectedInvestigationType(null);
        setSelectedLaboratory(null);
    };

    const handleUrgentToggle = (
        id: number
    ) => {

        setInvestigations((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        isUrgent:
                            !item.isUrgent,
                    }
                    : item
            )
        );

    };

    const handleDelete = (
        id: number
    ) => {

        setInvestigations((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        isDeleted: true,
                    }
                    : item
            )
        );

    };

    const handleEdit = (
        record: InvestigationRecord
    ) => {

        setSelectedRecord(record);

        setNoteValue(
            record.notes || ""
        );

        setShowNotesModal(true);

    };

    const handleSaveNotes = () => {

        if (!selectedRecord) return;

        setInvestigations((prev) =>
            prev.map((item) =>
                item.id ===
                    selectedRecord.id
                    ? {
                        ...item,
                        notes: noteValue,
                        isEdited: true,
                    }
                    : item
            )
        );

        setShowNotesModal(false);
        setSelectedRecord(null);
        setNoteValue("");

    };

    const handleSendToLab = () => {

        const payload = {
            investigationType:
                selectedInvestigationType,
            laboratory:
                selectedLaboratory,
        };

        console.log(
            "Send To Lab :",
            payload
        );
    };

    return (
        <>
            <div className="formContainer">

                <h5 className="fs-18 fw-500 mb-4">
                    Investigation Procedure
                </h5>

                {/* Row 1 */}

                <div className="formRow">

                    <div className="formGroup">

                        <label className="customLabel">
                            Investigation Type{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <CustomFormDropdown
                            options={
                                INVESTIGATION_TYPE_OPTIONS
                            }
                            value={
                                selectedInvestigationType
                            }
                            onChange={(value) => {
                                setSelectedInvestigationType(
                                    value
                                );

                                setSelectedLaboratory(
                                    null
                                );
                            }}
                            placeholder="Select Investigation Type"
                            required={true}
                        />

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            Laboratory{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <CustomFormDropdown
                            options={
                                laboratoryOptions
                            }
                            value={
                                selectedLaboratory
                            }
                            onChange={(value) =>
                                setSelectedLaboratory(
                                    value
                                )
                            }
                            placeholder="Select Laboratory"
                            required={true}
                        />

                    </div>

                    <div className="formGroup d-flex justify-content-end align-items-start">
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="btn bg-blue text-white col-md-7"
                            style={{
                                height: "48px",
                            }}
                        >
                            <i className="ri-add-circle-line fs-18 me-2"></i>Add
                        </button>
                    </div>

                </div>

                {
                    investigations.filter(
                        (x) => !x.isDeleted
                    ).length > 0 && (
                        <div className="medicalRecordWrapper" style={{ border: "2px solid #3E64AB" }}>

                            <div className="medicalTabsWrapper">

                                <Swiper
                                    modules={[Navigation]}
                                    navigation={true}
                                    slidesPerView="auto"
                                    spaceBetween={10}
                                    className="slider p-2"
                                >

                                    {investigations
                                        .filter(
                                            (x) =>
                                                !x.isDeleted
                                        )
                                        .map((record) => (

                                            <SwiperSlide
                                                key={record.id}
                                                style={{
                                                    width: "auto",
                                                }}
                                                className=""
                                            >

                                                <div
                                                    className="border rounded-3 py-2 px-3 bg-white d-flex justify-content-between align-items-center"
                                                    style={{
                                                        minWidth:
                                                            "320px",
                                                    }}
                                                >

                                                    <div className="fw-500">
                                                        {record.investigationType}
                                                    </div>

                                                    <div className="d-flex justify-content-between gap-2">

                                                        {/* Alert */}
                                                        <button
                                                            type="button"
                                                            className="btn p-0 border-0"
                                                            onClick={() =>
                                                                handleUrgentToggle(
                                                                    record.id
                                                                )
                                                            }
                                                        >
                                                            <i
                                                                className="ri-alert-line fs-5 text-danger"
                                                                style={{
                                                                    opacity:
                                                                        record.isUrgent
                                                                            ? 1
                                                                            : 0.5,
                                                                }}
                                                            />
                                                        </button>

                                                        {/* Edit */}
                                                        <button
                                                            type="button"
                                                            className="btn p-0 border-0"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    record
                                                                )
                                                            }
                                                        >
                                                            <i
                                                                className="ri-edit-box-line fs-5 text-primary"
                                                                style={{
                                                                    opacity:
                                                                        record.isEdited
                                                                            ? 1
                                                                            : 0.5,
                                                                }}
                                                            />
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            type="button"
                                                            className="btn p-0 border-0"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    record.id
                                                                )
                                                            }
                                                        >
                                                            <i className="ri-delete-bin-7-line fs-5 text-danger" />
                                                        </button>
                                                    </div>

                                                </div>

                                            </SwiperSlide>

                                        )
                                        )
                                    }

                                </Swiper>

                            </div>
                        </div>
                    )
                }

                {/* Send To Lab Button */}

                <div className="mt-5 d-flex justify-content-end">

                    <button
                        type="button"
                        onClick={handleSendToLab}
                        className="btn bg-blue col-md-4 text-white px-5"
                        style={{
                            height: "48px",
                        }}
                    >
                        Send to Lab
                    </button>

                </div>

            </div>
            <NoteModal
                show={showNotesModal}
                onHide={() => {
                    setShowNotesModal(false);
                    setSelectedRecord(null);
                    setNoteValue("");
                }}
                selectedRecord={selectedRecord}
                noteValue={noteValue}
                setNoteValue={setNoteValue}
                onSave={handleSaveNotes}
            />
        </>
    );
}


type NoteModalProps = {
    show: boolean;
    onHide: () => void;
    selectedRecord: InvestigationRecord | null;
    noteValue: string;
    setNoteValue: React.Dispatch<
        React.SetStateAction<string>
    >;
    onSave: () => void;
};

export function NoteModal({
    show,
    onHide,
    selectedRecord,
    noteValue,
    setNoteValue,
    onSave,
}: NoteModalProps) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            backdrop="static"
            contentClassName="aph-modal-content"
            backdropClassName="aph-modal-backdrop"
        >
            <Modal.Header className="aph-modal-header mb-3">

                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                    style={{
                        position: "absolute",
                        right: "2.6rem",
                        top: "2.7rem",
                    }}
                    onClick={onHide}
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    {selectedRecord?.investigationType}
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <div className="formGroup mb-1">

                    <label className="fs-18 text-black fw-400 mb-1">
                        Note
                    </label>

                    <div className="inputWrapper rounded-0">

                        <textarea
                            rows={5}
                            value={noteValue}
                            onChange={(e) =>
                                setNoteValue(
                                    e.target.value
                                )
                            }
                            className="form-control rounded-0"
                        />

                    </div>

                </div>

            </Modal.Body>

            <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                <button
                    type="button"
                    onClick={onSave}
                    className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                >
                    Done
                </button>

                <button
                    type="button"
                    onClick={onHide}
                    className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                >
                    Cancel
                </button>

            </div>

        </Modal>
    );
}