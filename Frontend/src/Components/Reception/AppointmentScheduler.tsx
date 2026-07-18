import { useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import DoctorAvailability from "./DoctorAvailability";
import CustomFormDropdown, { type DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";
import "../../styles/AppointmentScheduler.css";

interface Props {
    onBack: () => void;
    onContinue: (data: any) => void;
}

export default function AppointmentScheduler({
    onBack,
    onContinue
}: Props) {

    const [selectedClinic, setSelectedClinic] = useState("");
    const [clinicSearch, setClinicSearch] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState<DropdownOption | null>(null);
    const [filterDate, setFilterDate] = useState<Date | null>(null);
    const calendarRef = useRef<FullCalendar>(null);

    const clinics = [
        "Cardiology",
        "Pediatrics",
        "Gynecology",
        "Orthopedics",
        "General Medicine",
    ];

    const doctorsByClinic: any = {
        "General Medicine": [
            "Dr Ahmed",
            "Dr Yousif"
        ],
        Cardiology: [
            "Dr Ali",
            "Dr Hasan"
        ],
        Orthopedics: [
            "Dr Omar"
        ]
    };

    const calendarEvents = useMemo(() => {
        return [
            {
                title: "Manish Kumar / Consultant",
                start: "2026-06-14T08:00:00"
            }
        ];
    }, []);

    const filteredClinics = useMemo(() => {
        if (!clinicSearch.trim()) return clinics;

        const search = clinicSearch.toLowerCase();

        return [...clinics].sort((a, b) => {
            const aMatch = a.toLowerCase().includes(search) ? 1 : 0;
            const bMatch = b.toLowerCase().includes(search) ? 1 : 0;

            return bMatch - aMatch;
        });
    }, [clinicSearch]);

    const doctors =
        doctorsByClinic[selectedClinic] || [];

    return (
        <div className="card mt-4 border-0" style={{ boxShadow: '0 12px 30px rgba(0, 0, 0, 0.18)', borderRadius: '16px' }}>
            <div className="card-body">

                <div className="row">

                    {/* LEFT */}

                    <div className="col-lg-8 col-md-8 col-sm-12 mb-4">

                        <FullCalendar
                            ref={calendarRef}
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin,
                            ]}
                            height="130vh"
                            initialView="dayGridMonth"
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,list"
                            }}
                            buttonText={{
                                today: 'Today',
                                month: 'month',
                                week: 'Week',
                                day: 'Day',
                                listWeek: 'list', // Changes generic text to 'List Week'
                            }}
                            selectable
                            editable={false}
                            events={calendarEvents}
                        />

                    </div>

                    {/* RIGHT */}

                    <div className="col-lg-4 col-md-4 col-sm-12">

                        <div className="mb-3">
                            <label className="form-label">Doctor</label>

                            <CustomFormDropdown
                                options={doctors.map((doctor:any) => ({
                                    id: doctor,
                                    name: doctor,
                                }))}
                                value={selectedDoctor}
                                placeholder="Select Doctor"
                                onChange={setSelectedDoctor}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Search Clinic</label>

                            <div className="aph-filter-search w-100">
                                <input
                                    type="text"
                                    placeholder="Search Clinic..."
                                    className="aph-search-input form-control"
                                    value={clinicSearch}
                                    onChange={(e) => setClinicSearch(e.target.value)}
                                />

                                <button className="aph-search-btn">
                                    <i className="ri-search-line"></i>
                                </button>
                            </div>
                        </div>

                        <div className="clinic-list">
                            {filteredClinics.map((clinic) => (
                                <label
                                    key={clinic}
                                    className={`clinic-item d-flex align-items-center justify-content-end ${selectedClinic === clinic ? "active" : ""
                                        }`}
                                    onClick={() => {
                                        setSelectedClinic(clinic);
                                        setSelectedDoctor(null);
                                    }}
                                >
                                    <span className="clinic-name me-3">{clinic}</span>

                                    <input
                                        type="radio"
                                        name="clinic"
                                        checked={selectedClinic === clinic}
                                        onChange={() => setSelectedClinic(clinic)}
                                        className="clinic-radio"
                                    />

                                    <span className="custom-circle d-flex justify-content-center align-items-center"><i className="ri-check-fill"></i></span>
                                </label>
                            ))}
                        </div>

                        {/* Added w-100 to force full width, and p-3 padding to give the inner calendar breathing room */}
                        <div className="w-100">

                            <p className="fw-500 fs-18 ps-1 mb-2">
                                Doctor Availability
                            </p>

                            {/* Wrapped the component in a full-width container with overflow protection */}
                            <div className="w-100" style={{ overflowX: 'auto' }}>
                                <DoctorAvailability
                                    // minDate={new Date()}
                                    showTimePicker={false}
                                    onDateSelect={setFilterDate}
                                />
                            </div>

                        </div>


                        <button
                            className="bg-blue text-white border-0 rounded-2 py-2 w-100 mt-3"
                            onClick={() => {
                                if (!filterDate || !calendarRef.current) return;

                                const api = calendarRef.current.getApi();

                                api.gotoDate(filterDate);
                                api.changeView("timeGridDay");
                            }}
                        >
                            Apply
                        </button>

                    </div>

                </div>

                <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                    <button
                        className="aph-modal-btn-height border border-secondary outline-0 col-md-4 text-secondary bg-white fs-18 fw-400"
                        onClick={onBack}
                    >
                        Back
                    </button>

                    <button
                        className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                        onClick={() =>
                            onContinue({
                                clinic: selectedClinic,
                                doctor: selectedDoctor
                            })
                        }
                    >
                        Continue
                    </button>

                </div>

            </div>
        </div>
    );
}