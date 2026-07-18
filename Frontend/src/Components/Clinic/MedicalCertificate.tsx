import { useState } from "react";
import TinyEditor from "../TinyEditor";

export default function MedicalCertificate() {

    const [formData, setFormData] = useState({
        certificateName: "",
        certificateDetails: "",
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

    const handleSave = () => {

        const payload = {
            certificateName: formData.certificateName,
            certificateDetails: formData.certificateDetails,
        };

        console.log(
            "Medical Certificate Data :",
            payload
        );
    };

    return (
        <div className="formContainer">

            <h5 className="fs-18 fw-500 mb-4">
                Medical Certificate
            </h5>

            {/* Row 1 */}

            <div className="formRow">

                <div className="formGroup">

                    <label className="customLabel">
                        Certificate Name <span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">
                        <input
                            type="text"
                            name="certificateName"
                            placeholder="Enter Certificate Name"
                            value={formData.certificateName}
                            onChange={handleInputChange}
                            className="customInput"
                        />
                        <i className="ri-file-text-line"></i>
                    </div>

                </div>

            </div>

            {/* Row 2 */}

            <div className="formRow">

                <div
                    className="formGroup"
                    style={{ width: "100%" }}
                >

                    <label className="customLabel">
                        Certificate Details <span className="text-danger">*</span>
                    </label>

                    <TinyEditor
                        value={formData.certificateDetails}
                        onChange={(content) =>
                            setFormData((prev) => ({
                                ...prev,
                                certificateDetails: content,
                            }))
                        }
                    />

                </div>

            </div>

            {/* Save Button */}

            <div className="mt-5 d-flex justify-content-end">

                <button
                    type="button"
                    onClick={handleSave}
                    className="btn bg-blue col-md-6 text-white px-5"
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