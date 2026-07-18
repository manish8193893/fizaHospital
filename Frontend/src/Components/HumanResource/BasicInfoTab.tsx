import { useState } from "react";

import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, {type DropdownOption,} from "../../GlobalHelpers/CustomFormDropdown";

import '../../styles/HumanResource.css'


export default function BasicInfoTab() {

    /********************************************
        Name : Edit Mode State
        Date : 11/06/2026
        Purpose : ENABLE / DISABLE FORM
    *********************************************/
    const [isEditMode, setIsEditMode] =
        useState<boolean>(false);

    /********************************************
        Name : Basic Information State
        Date : 11/06/2026
        Purpose : STORE BASIC INFORMATION
    *********************************************/
    const [basicInfo, setBasicInfo] = useState({
        firstName: "Manish",
        middleName: "Kumar",
        lastName: "Kashyap",
        address: "Haldoni Mode, Greater Noida",
        phone: "8742970516",
        email: "manish8193892@gmail.com",
    });

    /********************************************
        Name : Gender State
        Date : 11/06/2026
        Purpose : STORE GENDER
    *********************************************/
    const [selectedGender, setSelectedGender] =
        useState<DropdownOption | null>({
            id: "Male",
            name: "Male",
        });

    /********************************************
        Name : Date Of Birth State
        Date : 11/06/2026
        Purpose : STORE DOB
    *********************************************/
    const [selectedDOB, setSelectedDOB] =
        useState<Date | null>(
            new Date("2003-09-10")
        );

    const [showDOBCalendar, setShowDOBCalendar] =
        useState(false);

    /********************************************
        Name : Gender Options
        Date : 11/06/2026
        Purpose : GENDER DROPDOWN OPTIONS
    *********************************************/
    const GENDER_OPTIONS: DropdownOption[] = [
        {
            id: "Male",
            name: "Male",
        },
        {
            id: "Female",
            name: "Female",
        },
        {
            id: "Other",
            name: "Other",
        },
    ];

    /********************************************
        Name : Handle Input Change
        Date : 11/06/2026
        Purpose : UPDATE FORM DATA
    *********************************************/
    const handleBasicInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setBasicInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /********************************************
        Name : Handle Edit
        Date : 11/06/2026
        Purpose : ENABLE EDIT MODE
    *********************************************/
    const handleEdit = () => {
        setIsEditMode(true);
    };

    /********************************************
        Name : Handle Cancel
        Date : 11/06/2026
        Purpose : DISABLE EDIT MODE
    *********************************************/
    const handleCancel = () => {
        setIsEditMode(false);
    };

    /********************************************
        Name : Handle Update
        Date : 11/06/2026
        Purpose : UPDATE DATA
    *********************************************/
    const handleUpdate = () => {

        const payload = {
            ...basicInfo,
            gender: selectedGender,
            dob: selectedDOB,
        };

        console.log(
            "Updated Employee Data :",
            payload
        );

        setIsEditMode(false);
    };

    return (

        <div className="formContainer p-2 rounded-1 position-relative">

            <div className="d-flex justify-content-between mb-4">

                <h5 className="fs-18 fw-500">
                    Basic Information
                </h5>

                {!isEditMode && (

                    <button className="back-btn" onClick={handleEdit}>
                        <i className="ri-pencil-ai-line fs-16"></i>
                    </button>
                )}

            </div>

            {/* Row 1 */}

            <div className="formRow">

                <div className="formGroup">

                    <label className="customLabel">
                        First Name{" "}<span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">

                        <input
                            type="text"
                            name="firstName"
                            value={basicInfo.firstName}
                            onChange={
                                handleBasicInputChange
                            }
                            disabled={!isEditMode}
                            className="customInput"
                            placeholder="Enter First Name"
                        />

                        <i className="ri-user-line"></i>

                    </div>

                </div>

                <div className="formGroup">

                    <label className="customLabel">
                        Middle Name{" "}<span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">

                        <input
                            type="text"
                            name="middleName"
                            value={basicInfo.middleName}
                            onChange={
                                handleBasicInputChange
                            }
                            disabled={!isEditMode}
                            className="customInput"
                            placeholder="Enter Middle Name"
                        />

                        <i className="ri-user-3-line"></i>

                    </div>

                </div>

                <div className="formGroup">

                    <label className="customLabel">
                        Last Name{" "}<span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">

                        <input
                            type="text"
                            name="lastName"
                            value={basicInfo.lastName}
                            onChange={
                                handleBasicInputChange
                            }
                            disabled={!isEditMode}
                            className="customInput"
                            placeholder="Enter Last Name"
                        />

                        <i className="ri-user-star-line"></i>

                    </div>

                </div>

            </div>

            {/* Row 2 */}

            <div className="formRow">

                <div className="formGroup">

                    <label className="customLabel">
                        Gender{" "}<span className="text-danger">*</span>
                    </label>

                    <div>

                        <CustomFormDropdown
                            options={
                                GENDER_OPTIONS
                            }
                            value={
                                selectedGender
                            }
                            onChange={(value) =>
                                setSelectedGender(
                                    value
                                )
                            }
                            placeholder="Select Gender"
                            disabled={!isEditMode}
                        />

                    </div>

                </div>

                <div className="formGroup">

                    <label className="customLabel">
                        Date Of Birth{" "}<span className="text-danger">*</span>
                    </label>

                    <div
                        style={{
                            position:
                                "relative",
                        }}
                    >

                        <div
                            className="customInput d-flex align-items-center"
                            onClick={() => {

                                if (
                                    !isEditMode
                                )
                                    return;

                                setShowDOBCalendar(
                                    !showDOBCalendar
                                );
                            }}
                            style={{
                                cursor:
                                    isEditMode
                                        ? "pointer"
                                        : "not-allowed",
                            }}
                        >

                            {selectedDOB
                                ? `${String(
                                    selectedDOB.getDate()
                                ).padStart(
                                    2,
                                    "0"
                                )}/${String(
                                    selectedDOB.getMonth() +
                                    1
                                ).padStart(
                                    2,
                                    "0"
                                )}/${selectedDOB.getFullYear()}`
                                : "DD/MM/YYYY"}

                        </div>

                        {showDOBCalendar &&
                            isEditMode && (

                                <div
                                    style={{
                                        position:
                                            "absolute",
                                        top: "100%",
                                        left: 0,
                                        zIndex:
                                            1000,
                                    }}
                                >

                                    <DateFilterCalendar
                                        selectedDate={
                                            selectedDOB
                                        }
                                        onDateSelect={(
                                            date
                                        ) => {

                                            setSelectedDOB(
                                                date
                                            );

                                            setShowDOBCalendar(
                                                false
                                            );
                                        }}
                                    />

                                </div>

                            )}

                    </div>

                </div>

            </div>

            {/* Row 3 */}

            <div className="formRow">

                <div className="formGroup">

                    <label className="customLabel">
                        Address{" "}<span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">

                        <input
                            type="text"
                            name="address"
                            value={
                                basicInfo.address
                            }
                            onChange={
                                handleBasicInputChange
                            }
                            disabled={!isEditMode}
                            className="customInput"
                            placeholder="Enter Address"
                        />

                        <i className="ri-map-pin-line"></i>

                    </div>

                </div>

                <div className="formGroup">

                    <label className="customLabel">
                        Phone{" "}<span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">

                        <input
                            type="text"
                            name="phone"
                            value={basicInfo.phone}
                            onChange={
                                handleBasicInputChange
                            }
                            disabled={!isEditMode}
                            className="customInput"
                            placeholder="Enter Phone"
                        />

                        <i className="ri-phone-line"></i>

                    </div>

                </div>

            </div>

            {/* Row 4 */}

            <div className="formRow">

                <div className="formGroup">

                    <label className="customLabel">
                        Email{" "}<span className="text-danger">*</span>
                    </label>

                    <div className="inputWrapper">

                        <input
                            type="email"
                            name="email"
                            value={basicInfo.email}
                            onChange={
                                handleBasicInputChange
                            }
                            disabled={!isEditMode}
                            className="customInput"
                            placeholder="Enter Email"
                        />

                        <i className="ri-mail-line"></i>

                    </div>

                </div>

            </div>

            {/* Buttons */}

            {isEditMode && (

                <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                    <button
                        type="button"
                        className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>

                </div>

            )}

        </div>
    );
}