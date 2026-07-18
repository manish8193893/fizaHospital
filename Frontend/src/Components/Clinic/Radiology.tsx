import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import CustomFormDropdown, { type DropdownOption, } from "../../GlobalHelpers/CustomFormDropdown";

import "../../styles/DoctorDashboard.css"

type RadiologyRecord = {
    id: number;
    radiologyType: string;
    bodyPart: string;
    notes: string;
    isUrgent: boolean;
    isEdited: boolean;
    isDeleted: boolean;
};

export default function Radiology() {

    const [selectedBodyPart, setSelectedBodyPart] = useState<DropdownOption | null>(null);

    const [selectedRadiologyType, setSelectedRadiologyType] = useState<DropdownOption | null>(null);

    const [radiologies, setRadiologies] = useState<RadiologyRecord[]>([]);

    const [showNotesModal, setShowNotesModal] = useState(false);

    const [selectedRecord, setSelectedRecord] = useState<RadiologyRecord | null>(null);

    const [noteValue, setNoteValue] = useState("");

    /********************************************
        Name : Manish Kumar
        Date : 07/06/2026
        Purpose : Radiology TYPE OPTIONS
    *********************************************/
    const RADIOLOGY_TYPE_OPTIONS: DropdownOption[] = [
        {
            id: "X-Ray",
            name: "X-Ray",
        },
        {
            id: "CT Scan",
            name: "CT Scan",
        },
        {
            id: "MRI",
            name: "MRI",
        },
        {
            id: "Ultrasound",
            name: "Ultrasound",
        },
        {
            id: "Mammography",
            name: "Mammography",
        },
        {
            id: "PET Scan",
            name: "PET Scan",
        },
        {
            id: "Fluoroscopy",
            name: "Fluoroscopy",
        },
        {
            id: "Doppler Ultrasound",
            name: "Doppler Ultrasound",
        },
        {
            id: "DEXA Scan",
            name: "DEXA Scan",
        },
        {
            id: "Nuclear Medicine",
            name: "Nuclear Medicine",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 07/06/2026
        Purpose : RADIOLOGY OPTIONS MAPPING
    *********************************************/
    const RADIOLOGY_MAPPING: Record<
        string,
        DropdownOption[]
    > = {
        "X-Ray": [
            { id: "Chest", name: "Chest" },
            { id: "Spine", name: "Spine" },
            { id: "Hand", name: "Hand" },
            { id: "Foot", name: "Foot" },
            { id: "Pelvis", name: "Pelvis" },
        ],

        "CT Scan": [
            { id: "Brain", name: "Brain" },
            { id: "Chest", name: "Chest" },
            { id: "Abdomen", name: "Abdomen" },
            { id: "Pelvis", name: "Pelvis" },
        ],

        MRI: [
            { id: "Brain", name: "Brain" },
            { id: "Spine", name: "Spine" },
            { id: "Knee", name: "Knee" },
            { id: "Shoulder", name: "Shoulder" },
        ],

        Ultrasound: [
            { id: "Abdomen", name: "Abdomen" },
            { id: "Pelvis", name: "Pelvis" },
            { id: "Kidney", name: "Kidney" },
            { id: "Liver", name: "Liver" },
        ],

        Mammography: [
            { id: "Breast", name: "Breast" },
        ],

        "PET Scan": [
            { id: "Whole Body", name: "Whole Body" },
            { id: "Brain", name: "Brain" },
        ],

        Fluoroscopy: [
            { id: "GI Tract", name: "GI Tract" },
            { id: "Esophagus", name: "Esophagus" },
        ],

        "Doppler Ultrasound": [
            { id: "Carotid Artery", name: "Carotid Artery" },
            { id: "Leg Veins", name: "Leg Veins" },
        ],

        "DEXA Scan": [
            { id: "Hip", name: "Hip" },
            { id: "Spine", name: "Spine" },
        ],

        "Nuclear Medicine": [
            { id: "Thyroid", name: "Thyroid" },
            { id: "Heart", name: "Heart" },
        ],
    };

    const bodyPartOptions = useMemo(() => {

        if (!selectedRadiologyType)
            return [];

        return (
            RADIOLOGY_MAPPING[
            selectedRadiologyType.id
            ] || []
        );

    }, [selectedRadiologyType]);

    const handleAdd = () => {

        if (
            !selectedRadiologyType ||
            !selectedBodyPart
        ) {
            return;
        }

        const newRecord: RadiologyRecord = {
            id: Date.now(),
            radiologyType:
                selectedRadiologyType.name,
            bodyPart:
                selectedBodyPart.name,
            notes: "",
            isUrgent: false,
            isEdited: false,
            isDeleted: false,
        };

        setRadiologies((prev) => [
            ...prev,
            newRecord,
        ]);

        setSelectedRadiologyType(null);
        setSelectedBodyPart(null);
    };

    const handleUrgentToggle = (
        id: number
    ) => {

        setRadiologies((prev) =>
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

        setRadiologies((prev) =>
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
        record: RadiologyRecord
    ) => {

        setSelectedRecord(record);

        setNoteValue(
            record.notes || ""
        );

        setShowNotesModal(true);

    };

    const handleSaveNotes = () => {

        if (!selectedRecord) return;

        setRadiologies((prev) =>
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

    const handleSendToRadiology = () => {

        const payload =
            radiologies.filter(
                (item) => !item.isDeleted
            );

        console.log(
            "Radiology Payload",
            payload
        );

    };

    return (
        <>
            <div className="formContainer">

                <h5 className="fs-18 fw-500 mb-4">
                    Radiology
                </h5>

                {/* Row 1 */}

                <div className="formRow">

                    <div className="formGroup">

                        <label className="customLabel">
                            Radiology Type{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <CustomFormDropdown
                            options={RADIOLOGY_TYPE_OPTIONS}
                            value={selectedRadiologyType}
                            onChange={(value) => {
                                setSelectedRadiologyType(
                                    value
                                );

                                setSelectedBodyPart(
                                    null
                                );
                            }}
                            placeholder="Select Radiology Type"
                            required={true}
                        />

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            Body Part{" "}
                            <span className="text-danger">
                                *
                            </span>
                        </label>

                        <CustomFormDropdown
                            options={bodyPartOptions}
                            value={selectedBodyPart}
                            onChange={(value) =>
                                setSelectedBodyPart(value)
                            }
                            placeholder="Select Body Part"
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
                    radiologies.filter(
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

                                    {radiologies
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
                                                        {record.radiologyType}
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
                        onClick={handleSendToRadiology}
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
    selectedRecord: RadiologyRecord | null;
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
                    {selectedRecord?.radiologyType}
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