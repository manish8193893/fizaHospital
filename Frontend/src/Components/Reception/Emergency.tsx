import { useState } from "react";
import '../../styles/Reception.css'
import DoubleBed from '../../../public/Assets/Icons/DoubleBed.svg?react'
import CustomFormDropdown, { type DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";

interface Bed {
    id: number;
    bedNumber: string;
    isOccupied: boolean;
    patientName?: string;
    days?: number;
}

export default function Emergency() {

    const [selectedBed, setSelectedBed] = useState<number | null>(null);
    const [selectedRelationship, setSelectedRelationship] = useState<DropdownOption | null>(null);

    const RELATIONSHIP_OPTIONS: DropdownOption[] = [
        { id: "father", name: "Father", },
        { id: "mother", name: "Mother", },
        { id: "brother", name: "Brother", },
        { id: "sister", name: "Sister", },
        { id: "husband", name: "Husband", },
        { id: "wife", name: "Wife", },
        { id: "son", name: "Son", },
        { id: "daughter", name: "Daughter", },
        { id: "other", name: "Other", },
    ];

    const bedsData = [
        { id: 1, bedNumber: "No.1", isOccupied: true, patientName: "Ahmed Abdullah", days: 10, },
        { id: 2, bedNumber: "No.2", isOccupied: false, },
        { id: 3, bedNumber: "No.3", isOccupied: false, },
        { id: 4, bedNumber: "No.4", isOccupied: false, },
    ];


    const [formData, setFormData] = useState({
        searchPatient: "",
        firstName: "",
        lastName: "",
        companionName: "",
        contactNumber: "",
        relationship: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBedSelect = (bed: Bed) => {
        if (bed.isOccupied) return;

        setSelectedBed(bed.id);
    };

    const handleSendToAccounting = () => {
        const payload = {
            ...formData,
            relationship: selectedRelationship?.name ?? "",
            relationshipId: selectedRelationship?.id ?? "",
            selectedBed,
        };

        console.log(payload);
    };

    const handleCancel = () => {
        setFormData({
            searchPatient: "",
            firstName: "",
            lastName: "",
            companionName: "",
            contactNumber: "",
            relationship: "",
        });

        setSelectedRelationship(null);
        setSelectedBed(null);
    };

    return (
        <>
            <div className="formContainer">
                {/* Header */}
                <h5 className="fs-18 fw-500 mb-3">Basic Patient Details</h5>

                <form>

                    {/* ROW 1 - SEARCH PATIENT */}
                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">
                                Search Patient
                            </label>

                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="searchPatient"
                                    className="customInput"
                                    placeholder="Search Patient By Name or File No"
                                    value={formData.searchPatient}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-search-line"></i>
                            </div>
                        </div>

                    </div>


                    {/* ROW 2 */}
                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">
                                First Name <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="firstName"
                                    className="customInput"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-user-3-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">
                                Last Name <span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="lastName"
                                    className="customInput"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-user-3-line"></i>
                            </div>
                        </div>

                    </div>

                    {/* ROW 3 */}
                    <div className="formRow">

                        <div className="formGroup">
                            <label className="customLabel">
                                Patient Companion Name
                            </label>

                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="companionName"
                                    className="customInput"
                                    placeholder="Patient Companion Name"
                                    value={formData.companionName}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-user-heart-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">
                                Contact Number
                            </label>

                            <div className="inputWrapper">
                                <input
                                    type="text"
                                    name="contactNumber"
                                    className="customInput"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-phone-line"></i>
                            </div>
                        </div>

                        <div className="formGroup">
                            <label className="customLabel">
                                Relationship to Patient
                                <span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={RELATIONSHIP_OPTIONS}
                                value={selectedRelationship}
                                onChange={(value) =>
                                    setSelectedRelationship(value)
                                }
                                placeholder="Select Relationship"
                                required={true}
                            />
                        </div>

                    </div>

                    {/* AVAILABLE BEDS */}
                    <div className="mt-5">

                        <div className="d-flex justify-content-end mb-3">
                            <h6 className="fw-500">Available Beds</h6>
                        </div>

                        <div className="row g-3">

                            {bedsData.map((bed) => (
                                <div
                                    key={bed.id}
                                    className="col-lg-3 col-md-6"
                                >
                                    <div
                                        className={`emergency-bed-card ${selectedBed === bed.id ? "emergency-selected-bed" : ""
                                            } ${bed.isOccupied ? "emergency-occupied-bed" : ""
                                            }`}
                                        onClick={() => handleBedSelect(bed)}
                                    >
                                        {selectedBed === bed.id && !bed.isOccupied && (
                                            <div className="emergency-selected-bed-check">
                                                <i className="ri-check-line"></i>
                                            </div>
                                        )}

                                        <div className="text-center">

                                            <div className="mb-2 d-flex justify-content-center align-items-center gap-2">

                                                <span
                                                    className={`fs-16 fw-500 ${selectedBed === bed.id
                                                            ? "emergency-selected-bed-text"
                                                            : "text-black text-muted"
                                                        }`}
                                                >
                                                    {bed.bedNumber}
                                                </span>

                                                <div
                                                    className={
                                                        selectedBed === bed.id
                                                            ? "emergency-selected-bed-icon"
                                                            : ""
                                                    }
                                                >
                                                    <DoubleBed width={20} height={20} />
                                                </div>

                                            </div>

                                            {!bed.isOccupied ? (
                                                <span
                                                    className={`fs-13 ${selectedBed === bed.id
                                                            ? "emergency-selected-bed-text"
                                                            : "text-black text-muted"
                                                        }`}
                                                >
                                                    Available
                                                </span>
                                            ) : (
                                                <>
                                                    <div className="fs-13">
                                                        {bed.patientName}
                                                    </div>

                                                    <div className="fs-12 text-muted">
                                                        {bed.days} days
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSendToAccounting}
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                        >
                            Send to Accounting
                        </button>

                    </div>

                </form>

            </div>
        </>
    )
}
