import { useState } from "react";
import CustomFormDropdown, {
    type DropdownOption,
} from "../../../GlobalHelpers/CustomFormDropdown";

export default function SupplierSettings() {

    const paymentOptions: DropdownOption[] = [
        { id: "15", name: "15 Days" },
        { id: "30", name: "30 Days" },
        { id: "45", name: "45 Days" },
        { id: "60", name: "60 Days" },
        { id: "90", name: "90 Days" },
        { id: "advance", name: "Advance Payment" },
        { id: "immediate", name: "Immediate" },
    ];

    const [isEditing, setIsEditing] =
        useState(false);

    const [selectedPaymentTerm, setSelectedPaymentTerm] =
        useState<DropdownOption | null>(
            paymentOptions[1]
        );

    const [formData, setFormData] =
        useState({

            bankName: "HDFC Bank",

            swiftCode: "HDFCINBBXXX",

            iban: "IN12HDFC00012345678901",

            accountNo: "123456789012",

            supplierContract:
                "Annual Medical Supply Contract",

        });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleUpdate = () => {

        console.log({

            paymentTerm:
                selectedPaymentTerm,

            ...formData,

        });

        setIsEditing(false);

    };

    const handleCancel = () => {

        setIsEditing(false);

    };

    return (
        <>

            <div className="">

                <div className="d-flex align-items-center justify-content-between mb-4">

                    <h5 className="fs-18 fw-500 mb-0">
                        Settings
                    </h5>

                    {!isEditing && (
                        <button
                            type="button"
                            className="back-btn"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >
                            <i className="ri-pencil-ai-line fs-16"></i>
                        </button>
                    )}

                </div>

                {/* ROW 1 */}

                <div className="formRow">

                    <div className="formGroup">

                        <label className="customLabel">
                            Payment Term
                        </label>

                        <CustomFormDropdown
                            options={paymentOptions}
                            value={selectedPaymentTerm}
                            onChange={setSelectedPaymentTerm}
                            placeholder="Select Payment Term"
                            disabled={!isEditing}
                        />

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            Bank Name
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="bankName"
                                className="customInput"
                                placeholder="Enter Bank Name"
                                value={formData.bankName}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />

                            <i className="ri-bank-line"></i>

                        </div>

                    </div>

                </div>

                {/* ROW 2 */}

                <div className="formRow">

                    <div className="formGroup">

                        <label className="customLabel">
                            Swift Code
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="swiftCode"
                                className="customInput"
                                placeholder="Enter Swift Code"
                                value={formData.swiftCode}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />

                            <i className="ri-code-box-line"></i>

                        </div>

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            IBAN
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="iban"
                                className="customInput"
                                placeholder="Enter IBAN"
                                value={formData.iban}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />

                            <i className="ri-secure-payment-line"></i>

                        </div>

                    </div>

                </div>

                {/* ROW 3 */}

                <div className="formRow">

                    <div className="formGroup">

                        <label className="customLabel">
                            Account No
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="accountNo"
                                className="customInput"
                                placeholder="Enter Account Number"
                                value={formData.accountNo}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />

                            <i className="ri-bank-card-line"></i>

                        </div>

                    </div>

                    <div className="formGroup">

                        <label className="customLabel">
                            Supplier Contract
                        </label>

                        <div className="inputWrapper">

                            <input
                                type="text"
                                name="supplierContract"
                                className="customInput"
                                placeholder="Enter Supplier Contract"
                                value={formData.supplierContract}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />

                            <i className="ri-file-text-line"></i>

                        </div>

                    </div>

                </div>

                <div className="d-flex justify-content-between mt-3">

                    <button
                        type="button"
                        className="py-1 px-5 border-0 rounded-0 outline-0 col-md-6 border-red text-red bg-white fs-18 fw-400"
                        onClick={() =>
                            console.log(
                                "Deactivate Supplier"
                            )
                        }
                    >
                        Deactivate
                    </button>

                </div>

                {isEditing && (

                    <div className="d-flex justify-content-between mt-5">

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    </div>

                )}

            </div>

        </>
    );
}