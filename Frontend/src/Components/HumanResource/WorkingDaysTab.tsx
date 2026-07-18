import { useState } from "react";

import CustomFormDropdown, { type DropdownOption, } from "../../GlobalHelpers/CustomFormDropdown";

import '../../styles/HumanResource.css'

interface MultipleShiftData {
    day: string;
    shiftType: string;
    startTime: string;
    endTime: string;
}

export default function WorkingDaysTab() {

    /********************************************
        Name : Edit Mode State
        Date : 11/06/2026
        Purpose : ENABLE / DISABLE FORM
    *********************************************/
    const [isEditMode, setIsEditMode] =
        useState<boolean>(false);

    /********************************************
        Name : Working Days State
        Date : 11/06/2026
        Purpose : STORE SELECTED WORKING DAYS
    *********************************************/
    const [selectedDays, setSelectedDays] =
        useState<string[]>([
            "Monday",
            "Wednesday",
            "Friday",
        ]);

    /********************************************
        Name : Shift State
        Date : 11/06/2026
        Purpose : STORE SHIFT TYPE
    *********************************************/
    const [selectedShift, setSelectedShift] =
        useState<DropdownOption | null>({
            id: "Multiple Shift",
            name: "Multiple Shift",
        });

    const [selectedShiftType,
        setSelectedShiftType] =
        useState<DropdownOption | null>(null);

    /********************************************
        Name : Fixed Shift Time State
        Date : 11/06/2026
        Purpose : STORE FIXED SHIFT TIMINGS
    *********************************************/
    const [startTime, setStartTime] =
        useState("");

    const [endTime, setEndTime] =
        useState("");

    /********************************************
        Name : Multiple Shift State
        Date : 11/06/2026
        Purpose : STORE MULTIPLE SHIFT DATA
    *********************************************/
    const [multipleShiftData,
        setMultipleShiftData] =
        useState<MultipleShiftData[]>([
            {
                day: "Monday",
                shiftType: "Morning Shift",
                startTime: "07:00 AM",
                endTime: "03:00 PM",
            },
            {
                day: "Wednesday",
                shiftType: "Afternoon Shift",
                startTime: "03:00 PM",
                endTime: "11:00 PM",
            },
            {
                day: "Friday",
                shiftType: "Night Shift",
                startTime: "11:00 PM",
                endTime: "07:00 AM",
            },
        ]);

    /********************************************
        Name : Working Days List
        Date : 11/06/2026
        Purpose : AVAILABLE WORKING DAYS
    *********************************************/
    const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    /********************************************
        Name : Shift Options
        Date : 11/06/2026
        Purpose : SHIFT OPTIONS
    *********************************************/
    const SHIFT_OPTIONS: DropdownOption[] = [
        {
            id: "Fixed Shift",
            name: "Fixed Shift",
        },
        {
            id: "Multiple Shift",
            name: "Multiple Shift",
        },
    ];

    /********************************************
        Name : Shift Type Options
        Date : 11/06/2026
        Purpose : SHIFT TYPE OPTIONS
    *********************************************/
    const SHIFT_TYPE_OPTIONS: DropdownOption[] = [
        {
            id: "Morning Shift",
            name: "Morning Shift",
        },
        {
            id: "Afternoon Shift",
            name: "Afternoon Shift",
        },
        {
            id: "Night Shift",
            name: "Night Shift",
        },
    ];

    /********************************************
        Name : Handle Day Selection
        Date : 11/06/2026
        Purpose : TOGGLE WORKING DAYS
    *********************************************/
    const handleDaySelection = (
        day: string
    ) => {

        if (!isEditMode) return;

        setSelectedDays((prev) => {

            if (prev.includes(day)) {

                return prev.filter(
                    (item) => item !== day
                );

            }

            return [...prev, day];

        });

    };

    /********************************************
        Name : Handle Shift Type Change
        Date : 11/06/2026
        Purpose : AUTO SET SHIFT TIME
    *********************************************/
    const handleShiftTypeChange = (
        value: DropdownOption | null
    ) => {

        setSelectedShiftType(value);

        if (!value) return;

        if (
            value.id === "Morning Shift"
        ) {

            setStartTime("07:00 AM");
            setEndTime("03:00 PM");

        }

        if (
            value.id === "Afternoon Shift"
        ) {

            setStartTime("03:00 PM");
            setEndTime("11:00 PM");

        }

        if (
            value.id === "Night Shift"
        ) {

            setStartTime("11:00 PM");
            setEndTime("07:00 AM");

        }

    };

    /********************************************
        Name : Handle Multiple Shift Change
        Date : 11/06/2026
        Purpose : UPDATE MULTIPLE SHIFT TABLE
    *********************************************/
    const handleMultipleShiftChange = (
        day: string,
        shift: string
    ) => {

        if (!isEditMode) return;

        let start = "";
        let end = "";

        if (shift === "Morning Shift") {
            start = "07:00 AM";
            end = "03:00 PM";
        }

        if (shift === "Afternoon Shift") {
            start = "03:00 PM";
            end = "11:00 PM";
        }

        if (shift === "Night Shift") {
            start = "11:00 PM";
            end = "07:00 AM";
        }

        setMultipleShiftData((prev) => {

            const existing =
                prev.find(
                    (item) =>
                        item.day === day
                );

            if (existing) {

                return prev.map(
                    (item) =>
                        item.day === day
                            ? {
                                ...item,
                                shiftType: shift,
                                startTime: start,
                                endTime: end,
                            }
                            : item
                );

            }

            return [
                ...prev,
                {
                    day,
                    shiftType: shift,
                    startTime: start,
                    endTime: end,
                },
            ];

        });

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
            workingDays: selectedDays,
            shift: selectedShift,
            shiftType: selectedShiftType,
            startTime,
            endTime,
            multipleShiftData,
        };

        console.log(
            "Updated Working Days :",
            payload
        );

        setIsEditMode(false);
    };

    return (

        <div className="formContainer p-2 rounded-1 position-relative">

            {/* Edit Button */}
            <div className="d-flex justify-content-between mb-4">

                <h5 className="fs-18 fw-500">
                    Working Days & Shift
                </h5>

                {!isEditMode && (

                    <button className="back-btn" onClick={handleEdit}>
                        <i className="ri-pencil-ai-line fs-16"></i>
                    </button>
                )}

            </div>


            {/* DAY BUTTONS */}

            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">

                {DAYS.map((day) => (

                    <button
                        key={day}
                        type="button"
                        onClick={() =>
                            handleDaySelection(day)
                        }
                        disabled={!isEditMode}
                        style={{
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            height: "55px",
                            background:
                                selectedDays.includes(day)
                                    ? "#7367F0"
                                    : "#7367F029",
                            color:
                                selectedDays.includes(day)
                                    ? "#FFFFFF"
                                    : "#7367F0",
                            fontWeight: 500,
                            opacity:
                                isEditMode
                                    ? 1
                                    : 0.8,
                        }}
                    >
                        {day}
                    </button>

                ))}

            </div>

            {/* SHIFT DROPDOWN */}

            <div className="formRow">

                <div className="formGroup">

                    <label className="customLabel">
                        Shift{" "}<span className='text-danger'>*</span>
                    </label>

                    <div
                        style={{
                            pointerEvents:
                                isEditMode
                                    ? "auto"
                                    : "none",
                            opacity:
                                isEditMode
                                    ? 1
                                    : 0.7,
                        }}
                    >

                        <CustomFormDropdown
                            options={
                                SHIFT_OPTIONS
                            }
                            value={
                                selectedShift
                            }
                            onChange={(value) =>
                                setSelectedShift(
                                    value
                                )
                            }
                            disabled={!isEditMode}
                            placeholder="Select Shift"
                        />

                    </div>

                </div>

            </div>

            {/* MULTIPLE SHIFT TABLE */}

            {selectedShift?.id ===
                "Multiple Shift" && (

                    <div className="table-responsive mt-4">

                        <table className="table table-bordered align-middle">

                            <thead>

                                <tr>

                                    <th className="text-center text-muted">
                                        #
                                    </th>

                                    <th className="text-center text-muted">
                                        Day
                                    </th>

                                    <th className="text-center text-muted">
                                        Shift Type
                                    </th>

                                    <th className="text-center text-muted">
                                        Start Time
                                    </th>

                                    <th className="text-center text-muted">
                                        End Time
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {selectedDays.map(
                                    (
                                        day,
                                        index
                                    ) => {

                                        const row =
                                            multipleShiftData.find(
                                                (
                                                    item
                                                ) =>
                                                    item.day ===
                                                    day
                                            );

                                        return (

                                            <tr
                                                key={
                                                    day
                                                }
                                            >

                                                <td className="text-center align-middle">
                                                    {index + 1}
                                                </td>

                                                <td className="text-center align-middle">
                                                    {day}
                                                </td>

                                                <td
                                                    className="text-center align-middle"
                                                    style={{
                                                        minWidth:
                                                            "220px",
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            pointerEvents:
                                                                isEditMode
                                                                    ? "auto"
                                                                    : "none",
                                                            opacity:
                                                                isEditMode
                                                                    ? 1
                                                                    : 0.7,
                                                        }}
                                                    >

                                                        <CustomFormDropdown
                                                            options={
                                                                SHIFT_TYPE_OPTIONS
                                                            }
                                                            value={
                                                                row?.shiftType
                                                                    ? {
                                                                        id: row.shiftType,
                                                                        name: row.shiftType,
                                                                    }
                                                                    : null
                                                            }
                                                            disabled={!isEditMode}
                                                            onChange={(value) =>
                                                                handleMultipleShiftChange(
                                                                    day,
                                                                    value?.id || ""
                                                                )
                                                            }
                                                            placeholder="Select Shift"
                                                        />

                                                    </div>

                                                </td>

                                                <td className="text-center align-middle">

                                                    <div className="inputWrapper">

                                                        <input
                                                            value={
                                                                row?.startTime || ""
                                                            }
                                                            className="customInput text-center"
                                                            disabled
                                                        />

                                                        <i className="ri-play-circle-line"></i>

                                                    </div>

                                                </td>

                                                <td className="text-center align-middle">

                                                    <div className="inputWrapper">

                                                        <input
                                                            value={
                                                                row?.endTime || ""
                                                            }
                                                            className="customInput text-center"
                                                            disabled
                                                        />

                                                        <i className="ri-stop-circle-line"></i>

                                                    </div>

                                                </td>

                                            </tr>

                                        );
                                    }
                                )}

                            </tbody>

                        </table>

                    </div>

                )
            }

            {
                selectedShift?.id === "Fixed Shift" && (

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Shift Type{" "}<span className='text-danger'>*</span>
                            </label>

                            <CustomFormDropdown
                                options={SHIFT_TYPE_OPTIONS}
                                value={selectedShiftType}
                                onChange={handleShiftTypeChange}
                                placeholder="Select Shift Type"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Start Time
                            </label>

                            <div className="inputWrapper">
                                <input
                                    value={startTime}
                                    className="customInput"
                                    disabled
                                />
                                <i className="ri-time-line"></i>
                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                End Time
                            </label>

                            <div className="inputWrapper">
                                <input
                                    value={endTime}
                                    className="customInput"
                                    disabled
                                />
                                <i className="ri-time-line"></i>
                            </div>

                        </div>

                    </div>

                )
            }

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