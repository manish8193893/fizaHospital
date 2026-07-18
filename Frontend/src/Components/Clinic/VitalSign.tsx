import { useEffect, useState } from "react";
import CustomFormDropdown, { type DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";

export default function VitalSign() {
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

    return (
        <div className="formContainer">

            <h5 className="fs-18 fw-500 mb-4">
                Vital Sign
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
    );
}