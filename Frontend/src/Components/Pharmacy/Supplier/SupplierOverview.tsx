import { useState } from "react";

import CustomFormDropdown, { type DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";


/********************************************
    Name : Manish Kumar
    Date : 21/06/2026
    Purpose : SupplierOverview
*********************************************/
export default function SupplierOverview() {

    const [isEditMode, setIsEditMode] = useState(false);

    const [selectedPaymentTerm, setSelectedPaymentTerm] = useState<DropdownOption | null>(
        { id: "30", name: "30 Days", }
    );

    const [formData, setFormData] = useState(
        {
            contactPerson: "Manish Kashyap",
            mobileNumber: "+91 9876543210",
            email: "supplier@gmail.com",
            currentBalance: "15000",
            address: "Sector 62, Noida, Uttar Pradesh",
            notes: "Preferred supplier for office inventory.",
        }
    );

    const paymentOptions: DropdownOption[] = [
        { id: "15", name: "15 Days" },
        { id: "30", name: "30 Days" },
        { id: "45", name: "45 Days" },
        { id: "60", name: "60 Days" },
        { id: "90", name: "90 Days" },
        { id: "advance", name: "Advance Payment" },
        { id: "immediate", name: "Immediate" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Handle Input Change
    *********************************************/
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Handle Update
    *********************************************/
    const handleUpdate = () => {
        const payload = {
            ...formData,
            paymentTerm: selectedPaymentTerm,
        };

        console.log("Supplier Overview Data :", payload);
        setIsEditMode(false);
    };

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Handle Cancel
    *********************************************/
    const handleCancel = () => {
        setIsEditMode(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fs-18 fw-500">
                    Overview
                </h5>

                {!isEditMode && (
                    <button
                        type="button"
                        className="back-btn"
                        onClick={() =>
                            setIsEditMode(true)
                        }
                    >
                        <i className="ri-pencil-ai-line fs-16"></i>
                    </button>
                )}

            </div>

            <form>

                {/* ROW 1 */}

                <div className="formRow">

                    <div className="formGroup">

                        <label className="customLabel">
                            Contact Person{" "}<span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="contactPerson"
                                className="customInput"
                                value={formData.contactPerson}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />

                            <i className="ri-user-line"></i>

                        </div>

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            Mobile Number{" "}<span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="mobileNumber"
                                className="customInput"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />

                            <i className="ri-phone-line"></i>

                        </div>

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            Email{" "}<span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="email"
                                name="email"
                                className="customInput"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />

                            <i className="ri-mail-line"></i>

                        </div>

                    </div>

                </div>

                {/* ROW 2 */}

                <div className="formRow">

                    <div className="formGroup">

                        <label className="customLabel">
                            Current Balance{" "}<span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="currentBalance"
                                className="customInput"
                                value={formData.currentBalance}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />

                            <i className="ri-wallet-3-line"></i>

                        </div>

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            Address{" "}<span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="address"
                                className="customInput"
                                value={formData.address}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />

                            <i className="ri-map-pin-line"></i>

                        </div>

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            Payment Term{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <CustomFormDropdown
                            options={paymentOptions}
                            value={selectedPaymentTerm}
                            onChange={
                                setSelectedPaymentTerm
                            }
                            placeholder="Select Payment Term"
                            disabled={!isEditMode}
                        />

                    </div>

                </div>

                {/* ROW 3 */}

                <div className="formRow">

                    <div className="formGroup">

                        <label className="customLabel">
                            Notes
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="notes"
                                className="customInput"
                                value={formData.notes}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />

                            <i className="ri-file-text-line"></i>

                        </div>

                    </div>

                </div>
                {
                    isEditMode && (

                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={
                                    handleUpdate
                                }
                            >
                                Update
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                onClick={
                                    handleCancel
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    )
                }

            </form>

        </>
    );
}