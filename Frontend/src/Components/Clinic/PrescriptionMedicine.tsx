import { useState } from "react";

import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, {
    type DropdownOption,
} from "../../GlobalHelpers/CustomFormDropdown";

export default function PrescriptionMedicine() {

    const [selectedUnit, setSelectedUnit] =
        useState<DropdownOption | null>(null);

    const [selectedFrequency, setSelectedFrequency] =
        useState<DropdownOption | null>(null);

    const [selectedFoodRelation, setSelectedFoodRelation] =
        useState<DropdownOption | null>(null);

    const [selectedRoute, setSelectedRoute] =
        useState<DropdownOption | null>(null);

    const [selectedStartDate, setSelectedStartDate] =
        useState<Date | null>(null);

    const [showStartDateCalendar, setShowStartDateCalendar] =
        useState(false);

    const [formData, setFormData] = useState({
        medicine: "",
        dosage: "",
        noOfDays: "",
        totalQty: "",
        instruction: "",
    });

    const UNIT_OPTIONS: DropdownOption[] = [
        { id: "Capsule", name: "Capsule" },
        { id: "Drop", name: "Drop" },
        { id: "IU", name: "IU" },
        { id: "mg", name: "mg" },
        { id: "ml", name: "ml" },
        { id: "TableSpoon", name: "TableSpoon" },
        { id: "Tablet", name: "Tablet" },
        { id: "TeaSpoon", name: "TeaSpoon" },
        { id: "Unit", name: "Unit" },
    ];

    const FREQUENCY_OPTIONS: DropdownOption[] = [
        { id: "1/Day", name: "1/Day" },
        { id: "2/Day", name: "2/Day" },
        { id: "3/Day", name: "3/Day" },
        { id: "4/Day", name: "4/Day" },
        { id: "Once in 2 Days", name: "Once in 2 Days" },
        { id: "Once in 3 Days", name: "Once in 3 Days" },
        { id: "Every Morning", name: "Every Morning" },
        { id: "Every Night", name: "Every Night" },
        { id: "Twice Weekly", name: "Twice Weekly" },
        { id: "Three Times Weekly", name: "Three Times Weekly" },
        { id: "Weekly", name: "Weekly" },
        { id: "SOS", name: "SOS" },
    ];

    const FOOD_RELATION_OPTIONS: DropdownOption[] = [
        { id: "After Food", name: "After Food" },
        { id: "Before Food", name: "Before Food" },
        { id: "Empty Stomach", name: "Empty Stomach" },
        { id: "With Food", name: "With Food" },
    ];

    const ROUTE_OPTIONS: DropdownOption[] = [
        { id: "Buccal", name: "Buccal" },
        { id: "Inhalation", name: "Inhalation" },
        { id: "Intradermal", name: "Intradermal" },
        { id: "Intramuscular", name: "Intramuscular" },
        { id: "Intravenous", name: "Intravenous" },
        { id: "Nasal", name: "Nasal" },
        { id: "Ophthalmic", name: "Ophthalmic" },
        { id: "Oral", name: "Oral" },
        { id: "Otic", name: "Otic" },
        { id: "Rectal", name: "Rectal" },
        { id: "Subcutaneous", name: "Subcutaneous" },
        { id: "Sublingual", name: "Sublingual" },
        { id: "Topical", name: "Topical" },
        { id: "Transdermal", name: "Transdermal" },
        { id: "Vaginal", name: "Vaginal" },
    ];

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveAndSend = () => {

        const payload = {
            medicine: formData.medicine,
            dosage: formData.dosage,
            unit: selectedUnit,
            frequency: selectedFrequency,
            noOfDays: formData.noOfDays,
            foodRelation: selectedFoodRelation,
            route: selectedRoute,
            startDate: selectedStartDate,
            totalQty: formData.totalQty,
            instruction: formData.instruction,
        };

        console.log("Prescription Data :", payload);
    };

    return (
        <div className="formContainer">

            <h5 className="fs-18 fw-500 mb-4">
                Prescription Medicine
            </h5>

            {/* Row 1 */}

            <div className="formRow">

                <div className="formGroup">
                    <label className="customLabel">
                        Medicine <span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="medicine"
                            placeholder="Enter Medicine"
                            value={formData.medicine}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-capsule-line"></i>
                    </div>
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Dosage <span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="dosage"
                            placeholder="Enter Dosage"
                            value={formData.dosage}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-flask-line"></i>
                    </div>
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Unit <span className="text-danger">*</span>
                    </label>

                    <CustomFormDropdown
                        options={UNIT_OPTIONS}
                        value={selectedUnit}
                        onChange={(value) =>
                            setSelectedUnit(value)
                        }
                        placeholder="Select Unit"
                        required={true}
                    />
                </div>

            </div>

            {/* Row 2 */}

            <div className="formRow">

                <div className="formGroup">
                    <label className="customLabel">
                        Frequency <span className="text-danger">*</span>
                    </label>

                    <CustomFormDropdown
                        options={FREQUENCY_OPTIONS}
                        value={selectedFrequency}
                        onChange={(value) =>
                            setSelectedFrequency(value)
                        }
                        placeholder="Select Frequency"
                        required={true}
                    />
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        No. of Days <span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="number"
                            name="noOfDays"
                            placeholder="Enter No. of Days"
                            value={formData.noOfDays}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-calendar-line"></i>
                    </div>
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Food Relation <span className="text-danger">*</span>
                    </label>

                    <CustomFormDropdown
                        options={FOOD_RELATION_OPTIONS}
                        value={selectedFoodRelation}
                        onChange={(value) =>
                            setSelectedFoodRelation(value)
                        }
                        placeholder="Select Food Relation"
                        required={true}
                    />
                </div>

            </div>

            {/* Row 3 */}

            <div className="formRow">

                <div className="formGroup">
                    <label className="customLabel">
                        Route <span className="text-danger">*</span>
                    </label>

                    <CustomFormDropdown
                        options={ROUTE_OPTIONS}
                        value={selectedRoute}
                        onChange={(value) =>
                            setSelectedRoute(value)
                        }
                        placeholder="Select Route"
                        required={true}
                    />
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Start Date <span className="text-danger">*</span>
                    </label>

                    <div style={{ position: "relative" }}>

                        <div
                            className="customInput d-flex align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                setShowStartDateCalendar(
                                    !showStartDateCalendar
                                )
                            }
                        >
                            {selectedStartDate
                                ? `${String(
                                    selectedStartDate.getDate()
                                ).padStart(2, "0")}/${String(
                                    selectedStartDate.getMonth() + 1
                                ).padStart(2, "0")}/${selectedStartDate.getFullYear()}`
                                : "DD/MM/YYYY"}
                        </div>

                        {showStartDateCalendar && (
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
                                    selectedDate={selectedStartDate}
                                    onDateSelect={(date) => {
                                        setSelectedStartDate(date);
                                        setShowStartDateCalendar(false);
                                    }}
                                />
                            </div>
                        )}

                    </div>
                </div>

                <div className="formGroup">
                    <label className="customLabel">
                        Total Qty <span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="number"
                            name="totalQty"
                            placeholder="Enter Total Qty"
                            value={formData.totalQty}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-stack-line"></i>
                    </div>
                </div>

            </div>

            <div className="formRow">
                <div className="formGroup">
                    <label className="customLabel">
                        Instruction
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="instruction"
                            placeholder="Enter Instruction"
                            value={formData.instruction}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-file-list-3-line"></i>
                    </div>
                </div>
            </div>

            {/* Button */}

            <div className="mt-5 d-flex justify-content-end">

                <button
                    type="button"
                    onClick={handleSaveAndSend}
                    className="btn bg-blue col-md-4 text-white px-5"
                    style={{
                        height: "48px",
                    }}
                >
                    Save & Send
                </button>

            </div>

        </div>
    );
}