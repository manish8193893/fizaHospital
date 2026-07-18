import React, { useEffect, useMemo, useState } from "react";
import "../styles/DateFilterCalendar.css";

type Props = {
    selectedDate?: Date | null;
    onDateSelect?: (date: Date) => void;
};

type ViewMode =
    | "date"
    | "month"
    | "year"
    | "yearRange";

const months = [
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

const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

const DateFilterCalendar: React.FC<Props> = ({
    selectedDate,
    onDateSelect,
}) => {
    const today = new Date();

    // =========================================
    // INTERNAL SELECTED DATE
    // =========================================

    const [internalSelectedDate, setInternalSelectedDate] =
        useState<Date | null>(
            selectedDate || null
        );

    // =========================================
    // CURRENT CALENDAR DATE
    // =========================================

    const [currentDate, setCurrentDate] =
        useState<Date>(
            selectedDate || new Date()
        );

    // =========================================
    // VIEW MODE
    // =========================================

    const [viewMode, setViewMode] =
        useState<ViewMode>("date");

    // =========================================
    // YEAR RANGE START
    // =========================================

    const [rangeStart, setRangeStart] =
        useState(
            Math.floor(
                (selectedDate || today).getFullYear() /
                10
            ) * 10
        );

    // =========================================
    // SYNC PARENT SELECTED DATE
    // =========================================

    useEffect(() => {
        if (selectedDate) {
            setInternalSelectedDate(selectedDate);

            setCurrentDate(selectedDate);

            setRangeStart(
                Math.floor(
                    selectedDate.getFullYear() / 10
                ) * 10
            );
        }
    }, [selectedDate]);

    // =========================================
    // CALENDAR DAYS
    // =========================================

    const days = useMemo(() => {
        const year = currentDate.getFullYear();

        const month = currentDate.getMonth();

        const firstDay = new Date(
            year,
            month,
            1
        ).getDay();

        const totalDays = new Date(
            year,
            month + 1,
            0
        ).getDate();

        const arr: (Date | null)[] = [];

        // Empty Cells
        for (let i = 0; i < firstDay; i++) {
            arr.push(null);
        }

        // Actual Dates
        for (let i = 1; i <= totalDays; i++) {
            arr.push(new Date(year, month, i));
        }

        return arr;
    }, [currentDate]);

    // =========================================
    // DATE MATCH
    // =========================================

    const isSameDate = (
        d1: Date,
        d2: Date
    ) => {
        return (
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear()
        );
    };

    // =========================================
    // PREVIOUS
    // =========================================

    const handlePrev = () => {
        if (viewMode === "date") {
            setCurrentDate(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                )
            );
        }

        if (viewMode === "month") {
            setCurrentDate(
                new Date(
                    currentDate.getFullYear() - 1,
                    currentDate.getMonth(),
                    1
                )
            );
        }

        if (viewMode === "year") {
            setRangeStart(rangeStart - 12);
        }

        if (viewMode === "yearRange") {
            setRangeStart(rangeStart - 120);
        }
    };

    // =========================================
    // NEXT
    // =========================================

    const handleNext = () => {
        if (viewMode === "date") {
            setCurrentDate(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                )
            );
        }

        if (viewMode === "month") {
            setCurrentDate(
                new Date(
                    currentDate.getFullYear() + 1,
                    currentDate.getMonth(),
                    1
                )
            );
        }

        if (viewMode === "year") {
            setRangeStart(rangeStart + 12);
        }

        if (viewMode === "yearRange") {
            setRangeStart(rangeStart + 120);
        }
    };

    // =========================================
    // SELECT DATE
    // =========================================

    const handleDateSelect = (date: Date) => {
        setInternalSelectedDate(date);

        setCurrentDate(date);

        onDateSelect?.(date);
    };

    // =========================================
    // YEARS
    // =========================================

    const years = Array.from(
        { length: 12 },
        (_, i) => rangeStart + i
    );

    // =========================================
    // YEAR RANGES
    // =========================================

    const yearRanges = Array.from(
        { length: 12 },
        (_, i) => ({
            start: rangeStart + i * 10,
            end: rangeStart + i * 10 + 9,
        })
    );

    return (
        <>
            <div className="date-calendar-container">

                {/* ==========   HEADER  ============ */}

                <div className="calendar-header">
                    <button
                        className="calendar-nav-btn"
                        onClick={handlePrev}
                    >
                        &#8249;
                    </button>

                    {/* DATE VIEW */}

                    {viewMode === "date" && (
                        <button
                            className="calendar-center-btn"
                            onClick={() =>
                                setViewMode("month")
                            }
                        >
                            {
                                months[
                                currentDate.getMonth()
                                ]
                            }{" "}
                            {currentDate.getFullYear()}
                        </button>
                    )}

                    {/* MONTH VIEW */}

                    {viewMode === "month" && (
                        <button
                            className="calendar-center-btn"
                            onClick={() =>
                                setViewMode("year")
                            }
                        >
                            {currentDate.getFullYear()}
                        </button>
                    )}

                    {/* YEAR VIEW */}

                    {viewMode === "year" && (
                        <button
                            className="calendar-center-btn"
                            onClick={() =>
                                setViewMode("yearRange")
                            }
                        >
                            {years[0]} -{" "}
                            {years[years.length - 1]}
                        </button>
                    )}

                    {/* YEAR RANGE VIEW */}

                    {viewMode === "yearRange" && (
                        <button className="calendar-center-btn">
                            Select Year Range
                        </button>
                    )}

                    <button
                        className="calendar-nav-btn"
                        onClick={handleNext}
                    >
                        &#8250;
                    </button>
                </div>

                {/* ==========   DATE VIEW  ============ */}

                {viewMode === "date" && (
                    <>
                        <div className="calendar-weekdays">
                            {weekDays.map((day) => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>

                        <div className="calendar-days-grid">
                            {days.map((date, index) => {
                                if (!date) {
                                    return (
                                        <div key={index}></div>
                                    );
                                }

                                const isToday =
                                    isSameDate(date, today);

                                const isSelected =
                                    internalSelectedDate &&
                                    isSameDate(
                                        date,
                                        internalSelectedDate
                                    );

                                return (
                                    <button
                                        key={date.toISOString()}
                                        className={`calendar-day-btn ${isToday ? "calendar-current" : ""} ${isSelected ? "calendar-selected" : ""}`}
                                        onClick={() =>
                                            handleDateSelect(date)
                                        }
                                    >
                                        {date.getDate()}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* ==========   MONTH VIEW  ============ */}

                {viewMode === "month" && (
                    <div className="calendar-month-grid">
                        {months.map((month, index) => {
                            const isCurrentMonth =
                                today.getMonth() === index &&
                                today.getFullYear() ===
                                currentDate.getFullYear();

                            const isSelectedMonth =
                                internalSelectedDate &&
                                internalSelectedDate.getMonth() ===
                                index &&
                                internalSelectedDate.getFullYear() ===
                                currentDate.getFullYear();

                            return (
                                <button
                                    key={month}
                                    className={`calendar-month-btn ${isCurrentMonth ? "calendar-current" : ""} ${isSelectedMonth ? "calendar-selected" : ""}`}
                                    onClick={() => {
                                        setCurrentDate(
                                            new Date(
                                                currentDate.getFullYear(),
                                                index,
                                                1
                                            )
                                        );

                                        setViewMode("date");
                                    }}
                                >
                                    {month}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ==========   YEAR VIEW  ============ */}

                {viewMode === "year" && (
                    <div className="calendar-month-grid">
                        {years.map((year) => {
                            const isCurrentYear =
                                today.getFullYear() === year;

                            const isSelectedYear =
                                internalSelectedDate &&
                                internalSelectedDate.getFullYear() ===
                                year;

                            return (
                                <button
                                    key={year}
                                    className={`calendar-month-btn ${isCurrentYear ? "calendar-current" : ""} ${isSelectedYear ? "calendar-selected" : ""}`}
                                    onClick={() => {
                                        setCurrentDate(
                                            new Date(
                                                year,
                                                currentDate.getMonth(),
                                                1
                                            )
                                        );

                                        setViewMode("month");
                                    }}
                                >
                                    {year}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* ==========   YEAR RANGE VIEW  ============ */}

                {viewMode === "yearRange" && (
                    <div className="calendar-month-grid">
                        {yearRanges.map((range) => (
                            <button
                                key={range.start}
                                className="calendar-month-btn"
                                onClick={() => {
                                    setRangeStart(range.start);

                                    setViewMode("year");
                                }}
                            >
                                {range.start} - {range.end}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default DateFilterCalendar;