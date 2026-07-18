// DoctorAvailability.tsx

import { useMemo, useState } from "react";
import "../../styles/DoctorAvailability.css";

interface DoctorAvailabilityProps {
    minDate?: Date | null;
    maxDate?: Date | null;
    showTimePicker?: boolean;
    onDateSelect?: (date: Date | null) => void;
}

interface SelectedDateType {
    day: number;
    month: number;
    year: number;
}

interface CalendarDateType {
    day: number;
    currentMonth: boolean;
    fullDate: Date;
}

export default function DoctorAvailability({
    minDate = null,
    maxDate = null,
    showTimePicker = true,
    onDateSelect,
}: DoctorAvailabilityProps) {

    const today = new Date();

    const getInitialDate = (): Date => {

        const baseDate =
            minDate ||
            maxDate ||
            new Date();

        return new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            1
        );
    };

    const [currentDate, setCurrentDate] =
        useState<Date>(getInitialDate());

    const [selectedDate, setSelectedDate] =
        useState<SelectedDateType | null>(null);

    const [selectedTime, setSelectedTime] =
        useState<string | null>(null);

    // Current visible month/year
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Calendar calculations
    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    const prevMonthDays = new Date(
        year,
        month,
        0
    ).getDate();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const days = [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ];

    // Remove time from date
    const normalizeDate = (date: Date): Date => {

        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    };

    // Check same date
    const isSameDate = (
        date1: Date,
        date2: Date
    ): boolean => {

        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    // Generate all calendar dates
    const dates = useMemo<CalendarDateType[]>(() => {

        const generatedDates: CalendarDateType[] = [];

        // Previous month dates
        for (let i = firstDay; i > 0; i--) {

            generatedDates.push({
                day: prevMonthDays - i + 1,
                currentMonth: false,
                fullDate: new Date(
                    year,
                    month - 1,
                    prevMonthDays - i + 1
                ),
            });
        }

        // Current month dates
        for (let i = 1; i <= daysInMonth; i++) {

            generatedDates.push({
                day: i,
                currentMonth: true,
                fullDate: new Date(year, month, i),
            });
        }

        // Next month dates
        let nextDay = 1;

        while (generatedDates.length < 42) {

            generatedDates.push({
                day: nextDay,
                currentMonth: false,
                fullDate: new Date(
                    year,
                    month + 1,
                    nextDay
                ),
            });

            nextDay++;
        }

        return generatedDates;

    }, [
        firstDay,
        prevMonthDays,
        daysInMonth,
        month,
        year
    ]);

    // Check disabled dates
    const isDateDisabled = (date: Date): boolean => {

        const normalized = normalizeDate(date);

        if (
            minDate &&
            normalized < normalizeDate(minDate)
        ) {
            return true;
        }

        if (
            maxDate &&
            normalized > normalizeDate(maxDate)
        ) {
            return true;
        }

        return false;
    };

    // Navigation checks
    const canGoPrevMonth = (): boolean => {

        if (!minDate) return true;

        const prevMonth = new Date(
            year,
            month - 1,
            1
        );

        return (
            prevMonth >=
            new Date(
                minDate.getFullYear(),
                minDate.getMonth(),
                1
            )
        );
    };

    const canGoNextMonth = (): boolean => {

        if (!maxDate) return true;

        const nextMonth = new Date(
            year,
            month + 1,
            1
        );

        return (
            nextMonth <=
            new Date(
                maxDate.getFullYear(),
                maxDate.getMonth(),
                1
            )
        );
    };

    // Month navigation
    const handlePrevMonth = (): void => {

        if (!canGoPrevMonth()) return;

        setCurrentDate(
            new Date(year, month - 1, 1)
        );
    };

    const handleNextMonth = (): void => {

        if (!canGoNextMonth()) return;

        setCurrentDate(
            new Date(year, month + 1, 1)
        );
    };

    // Generate time slots
    const generateTimeSlots = (): string[] => {

        const slots: string[] = [];

        for (let hour = 0; hour < 24; hour++) {

            for (
                let min = 0;
                min < 60;
                min += 15
            ) {

                const formattedMin =
                    String(min).padStart(2, "0");

                const period =
                    hour >= 12 ? "PM" : "AM";

                const twelveHour =
                    hour % 12 === 0
                        ? 12
                        : hour % 12;

                const formattedHour =
                    String(twelveHour).padStart(2, "0");

                slots.push(
                    `${formattedHour}:${formattedMin} ${period}`
                );
            }
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    // Check disabled time slot
    const isTimeDisabled = (time: string): boolean => {

        if (!selectedDate) return false;

        const selectedFullDate = new Date(
            selectedDate.year,
            selectedDate.month,
            selectedDate.day
        );

        // Only apply time restrictions for TODAY
        if (!isSameDate(selectedFullDate, today)) {
            return false;
        }

        const [timePart, period] =
            time.split(" ");

        let [hours, minutes] =
            timePart.split(":").map(Number);

        if (period === "PM" && hours !== 12) {
            hours += 12;
        }

        if (period === "AM" && hours === 12) {
            hours = 0;
        }

        const slotMinutes =
            hours * 60 + minutes;

        const currentMinutes =
            today.getHours() * 60 +
            today.getMinutes();

        // MIN DATE SCENARIO
        // Disable past time slots
        if (minDate) {

            return slotMinutes < currentMinutes;
        }

        // MAX DATE SCENARIO
        // Disable future time slots
        if (maxDate) {

            return slotMinutes > currentMinutes;
        }

        return false;
    };

    // Example unavailable/dayoff dates
    const unavailableDates = [10, 18];
    const doctorDayOff = [25];

    return (
        <div className="doctor-availability">

            {/* LEFT SIDE */}
            <div className="calendar-section">

                {/* Header */}
                <div className="calendar-header">

                    <h3 className="mb-0">
                        {monthNames[month]} {year}
                    </h3>

                    <div className="nav-buttons">

                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            disabled={!canGoPrevMonth()}
                            className={
                                !canGoPrevMonth()
                                    ? "disabled-nav"
                                    : ""
                            }
                        >
                            <i
                                className="ri-arrow-left-circle-fill"
                                style={{ color: "#3E64AB" }}
                            ></i>
                        </button>

                        <button
                            type="button"
                            onClick={handleNextMonth}
                            disabled={!canGoNextMonth()}
                            className={
                                !canGoNextMonth()
                                    ? "disabled-nav"
                                    : ""
                            }
                        >
                            <i
                                className="ri-arrow-right-circle-fill"
                                style={{ color: "#3E64AB" }}
                            ></i>
                        </button>

                    </div>
                </div>

                {/* Legend */}
                <div className="legend">

                    <div className="legend-item">
                        <span className="dot red"></span>

                        <p className="mb-0">
                            Not Available
                        </p>
                    </div>

                    <div className="legend-item">
                        <span className="dot gray"></span>

                        <p className="mb-0">
                            doctor day-off
                        </p>
                    </div>

                </div>

                {/* Days */}
                <div className="days-row">

                    {days.map((day) => (
                        <div
                            key={day}
                            className="day-name"
                        >
                            {day}
                        </div>
                    ))}

                </div>

                {/* Dates */}
                <div className="dates-grid">

                    {dates.map((date, index) => {

                        const isSelected =
                            selectedDate &&
                            isSameDate(
                                date.fullDate,
                                new Date(
                                    selectedDate.year,
                                    selectedDate.month,
                                    selectedDate.day
                                )
                            );

                        const isUnavailable =
                            unavailableDates.includes(
                                date.day
                            ) &&
                            date.currentMonth;

                        const isDayOff =
                            doctorDayOff.includes(
                                date.day
                            ) &&
                            date.currentMonth;

                        const disabled =
                            isDateDisabled(
                                date.fullDate
                            );

                        return (
                            <div
                                key={index}
                                className={`
                                    date-cell
                                    ${!date.currentMonth ? "inactive" : ""}
                                    ${isSelected ? "selected" : ""}
                                    ${isUnavailable ? "unavailable" : ""}
                                    ${isDayOff ? "dayoff" : ""}
                                    ${disabled ? "disabled-date" : ""}
                                `}
                                onClick={() => {

                                    if (
                                        disabled ||
                                        !date.currentMonth
                                    ) {
                                        return;
                                    }

                                    setSelectedDate({
                                        day: date.day,
                                        month:
                                            date.fullDate.getMonth(),
                                        year:
                                            date.fullDate.getFullYear(),
                                    });
                                    onDateSelect?.(date.fullDate);

                                    setSelectedTime(null);
                                }}
                            >
                                {date.day}
                            </div>
                        );
                    })}

                </div>

            </div>

            {/* RIGHT SIDE */}
            {showTimePicker && (
                <div className="time-picker-section">

                    <h4>Time Picker</h4>

                    <div className="selected-time-box">
                        {selectedTime || "--:--"}
                    </div>

                    <div className="time-slots">

                        {timeSlots.map((time) => {

                            const disabled =
                                isTimeDisabled(time);

                            return (
                                <div
                                    key={time}
                                    className={`
                                    time-slot
                                    ${selectedTime === time
                                            ? "active-time"
                                            : ""
                                        }
                                    ${disabled
                                            ? "disabled-time"
                                            : ""
                                        }
                                `}
                                    onClick={() => {

                                        if (disabled) return;

                                        setSelectedTime(time);
                                    }}
                                >
                                    {time}
                                </div>
                            );
                        })}

                    </div>

                </div>
            )}
        </div>
    );
}