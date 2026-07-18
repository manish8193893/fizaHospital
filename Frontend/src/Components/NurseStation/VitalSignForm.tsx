import { useEffect, useMemo, useState } from "react";

import type { ColumnActionRow } from "../../GlobalHelpers/GlobalGridTable";
import CustomFormDropdown, { type DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";


import GlobalGridTable from "../../GlobalHelpers/GlobalGridTable";
import { Pagination } from "../../GlobalHelpers/Pagination";

interface VitalSignsTableData {
    systolicBP: string;
    diastolicBP: string;
    temperature: string;
    weight: string;
    height: string;
    bmi: string;
    heartRate: string;
    respiratoryRate: string;
    bloodSugar: string;
    spo2: string;
    mobility: string;
    oxygenSupplementation: string;
    trauma: string;
    comment: string;
}

export default function VitalSignForm() {
    const [formData, setFormData] = useState({
        systolicBP: "",
        diastolicBP: "",
        temperature: "",
        weight: "",
        height: "",
        bmi: "",
        heartRate: "",
        respiratoryRate: "",
        bloodSugar: "",
        spo2: "",
        mobility: "",
        oxygenSupplementation: "No",
        trauma: "No",
        comment: "",
    });

    const MOBILITY_OPTIONS: DropdownOption[] = [
        { id: "Assisted", name: "Assisted" },
        { id: "Bedridden", name: "Bedridden" },
        { id: "Independant", name: "Independant" },
        { id: "Normal", name: "Normal" },
        { id: "Wheelchair", name: "Wheelchair" },
        { id: "With Walker", name: "With Walker" },
    ];

    const [selectedMobility, setSelectedMobility] = useState<DropdownOption | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const weight = Number(formData.weight);
        const heightCm = Number(formData.height);

        if (weight && heightCm) {
            const heightMeter = heightCm / 100;
            const bmi = (
                weight /
                (heightMeter * heightMeter)
            ).toFixed(2);

            setFormData((prev) => ({
                ...prev,
                bmi,
            }));
        }
    }, [formData.weight, formData.height]);

    const ALL_VITAL_SIGNS_DATA: VitalSignsTableData[] = [
        {
            systolicBP: "120",
            diastolicBP: "80",
            temperature: "98.6°F",
            weight: "72 kg",
            height: "175 cm",
            bmi: "23.5",
            heartRate: "72 bpm",
            respiratoryRate: "16",
            bloodSugar: "95 mg/dL",
            spo2: "98%",
            mobility: "Independent",
            oxygenSupplementation: "No",
            trauma: "No",
            comment: "Stable condition",
        },
        {
            systolicBP: "135",
            diastolicBP: "88",
            temperature: "99.1°F",
            weight: "80 kg",
            height: "178 cm",
            bmi: "25.2",
            heartRate: "78 bpm",
            respiratoryRate: "18",
            bloodSugar: "110 mg/dL",
            spo2: "97%",
            mobility: "Assisted",
            oxygenSupplementation: "Yes",
            trauma: "No",
            comment: "Requires observation",
        },
        {
            systolicBP: "145",
            diastolicBP: "92",
            temperature: "100.2°F",
            weight: "85 kg",
            height: "170 cm",
            bmi: "29.4",
            heartRate: "88 bpm",
            respiratoryRate: "20",
            bloodSugar: "140 mg/dL",
            spo2: "95%",
            mobility: "Wheelchair",
            oxygenSupplementation: "Yes",
            trauma: "Yes",
            comment: "Post-trauma monitoring",
        },
    ];

    const columns: ColumnActionRow<VitalSignsTableData>[] = [
        {
            key: "systolicBP",
            header: <>Systolic BP</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.systolicBP.localeCompare(b.systolicBP),
        },
        {
            key: "diastolicBP",
            header: <>Diastolic BP</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.diastolicBP.localeCompare(b.diastolicBP),
        },
        {
            key: "temperature",
            header: <>Temperature</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.temperature.localeCompare(b.temperature),
        },
        {
            key: "weight",
            header: <>Weight</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.weight.localeCompare(b.weight),
        },
        {
            key: "height",
            header: <>Height</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.height.localeCompare(b.height),
        },
        {
            key: "bmi",
            header: <>BMI</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.bmi.localeCompare(b.bmi),
        },
        {
            key: "heartRate",
            header: <>Heart Rate</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.heartRate.localeCompare(b.heartRate),
        },
        {
            key: "respiratoryRate",
            header: <>Respiratory Rate</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.respiratoryRate.localeCompare(
                    b.respiratoryRate
                ),
        },
        {
            key: "bloodSugar",
            header: <>Blood Sugar</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.bloodSugar.localeCompare(b.bloodSugar),
        },
        {
            key: "spo2",
            header: <>SpO₂</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.spo2.localeCompare(b.spo2),
        },
        {
            key: "mobility",
            header: <>Mobility</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.mobility.localeCompare(b.mobility),
        },
        {
            key: "oxygenSupplementation",
            header: <>Oxygen Supplementation</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.oxygenSupplementation.localeCompare(
                    b.oxygenSupplementation
                ),
        },
        {
            key: "trauma",
            header: <>Trauma</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.trauma.localeCompare(b.trauma),
        },
        {
            key: "comment",
            header: <>Comment</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.comment.localeCompare(b.comment),
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
                            console.log("Edit Vital Signs:", row)
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
                            console.log("Delete Vital Signs:", row)
                        }
                    >
                        <i className="ri-delete-bin-7-line fs-18"></i>
                    </button>
                </div>
            ),
        },
    ];

    const totalPages = Math.ceil(
        ALL_VITAL_SIGNS_DATA.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        return ALL_VITAL_SIGNS_DATA.slice(
            startIndex,
            endIndex
        );

    }, [
        currentPage,
        itemsPerPage,
    ]);


    return (
        <>
            <div className="formContainer">

                <h5 className="fs-18 fw-500 mb-4">
                    Vital Signs Form
                </h5>

                {/* Row 1 */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Systolic B.P <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="systolicBP"
                                placeholder="Enter Systolic B.P"
                                value={formData.systolicBP}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-heart-pulse-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Diastolic B.P <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="diastolicBP"
                                placeholder="Enter Diastolic B.P"
                                value={formData.diastolicBP}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-heart-pulse-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Temperature (°C) <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="temperature"
                                placeholder="Enter Temperature"
                                value={formData.temperature}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-temp-hot-line"></i>
                        </div>
                    </div>

                </div>

                {/* Row 2 */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Weight (Kg) <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="weight"
                                placeholder="Enter Weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-scales-2-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Height (cm) <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="height"
                                placeholder="Enter Height"
                                value={formData.height}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-ruler-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            BMI (Kg/m²)
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                readOnly
                                disabled
                                placeholder="Automatic Calculated"
                                value={formData.bmi}
                                className="customInput"
                            />
                            <i className="ri-calculator-line"></i>
                        </div>
                    </div>

                </div>

                {/* Row 3 */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Heart Rate <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="heartRate"
                                placeholder="Enter Heart Rate"
                                value={formData.heartRate}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-heart-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Respiratory Rate <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="respiratoryRate"
                                placeholder="Enter Respiratory Rate"
                                value={formData.respiratoryRate}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-lungs-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Blood Sugar <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="bloodSugar"
                                placeholder="Enter Blood Sugar"
                                value={formData.bloodSugar}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-test-tube-line"></i>
                        </div>
                    </div>

                </div>

                {/* Row 4 */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            SPO2 <span className='text-danger'>*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="number"
                                name="spo2"
                                placeholder="Enter SPO2"
                                value={formData.spo2}
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-mental-health-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Mobility <span className='text-danger'>*</span>
                        </label>

                        <CustomFormDropdown
                            options={MOBILITY_OPTIONS}
                            value={selectedMobility}
                            onChange={(value) => setSelectedMobility(value)}
                            placeholder="Select Mobility"
                            required={true}
                        />
                    </div>

                </div>

                {/* Row 5 */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Oxygen Supplementation <span className='text-danger'>*</span>
                        </label>

                        <div className="d-flex gap-4 mt-2">
                            <label>
                                <input
                                    type="radio"
                                    checked={
                                        formData.oxygenSupplementation === "Yes"
                                    }
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            oxygenSupplementation: "Yes",
                                        })
                                    }
                                />{" "}
                                Yes
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    checked={
                                        formData.oxygenSupplementation === "No"
                                    }
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            oxygenSupplementation: "No",
                                        })
                                    }
                                />{" "}
                                No
                            </label>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Trauma <span className='text-danger'>*</span>
                        </label>

                        <div className="d-flex gap-4 mt-2">
                            <label>
                                <input
                                    type="radio"
                                    checked={formData.trauma === "Yes"}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            trauma: "Yes",
                                        })
                                    }
                                />{" "}
                                Yes
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    checked={formData.trauma === "No"}
                                    onChange={() =>
                                        setFormData({
                                            ...formData,
                                            trauma: "No",
                                        })
                                    }
                                />{" "}
                                No
                            </label>
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
                                onChange={handleChange}
                                className="customInput"
                            />
                            <i className="ri-chat-1-line"></i>
                        </div>
                    </div>

                </div>

                <div className="mt-5 d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn bg-blue col-md-4 text-white px-5"
                        style={{
                            height: "48px",
                        }}
                    >
                        Save
                    </button>
                </div>

            </div>

            <div className="d-flex flex-column mt-3">

                <h5 className="fw-500 text-black fs-18 mb-2">
                    Current Vitals Table
                </h5>

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
        </>
    );
}