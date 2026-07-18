import { useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, {
    type DropdownOption,
} from "../../../GlobalHelpers/CustomFormDropdown";

import styles from "../../../styles/SurgicalQueueCalendar.module.css";

/********************************************
    Name : Manish Kumar
    Purpose : OT Scheduling
*********************************************/

interface ScheduledData {
    id: string;
    fileNo: string;
    patientName: string;
    surgeryName: string;
    surgeryDate: string;
    surgeryTime: string;
    department: string;
    lengthOfStay: number;
    numberOfOperationDone: number;
    doctorName: string[];
    isAddNewDoctor: boolean;
    isStartOperation: boolean;
    isEndOperation: boolean;
    isCancelOperation: boolean;
    isAddLogUsedItems: boolean;
    isAddNewSurgery: boolean;
    isAddReport: boolean;
    operationStatus:
    | "Waiting"
    | "In Progress"
    | "Completed"
    | "Cancelled";
    bedNumber: string;
    roomNumber: string;
}


export default function OTScheduling() {

    /********************************************
        Calendar Reference
    *********************************************/
    const calendarRef = useRef<FullCalendar>(null);

    /********************************************
        States
    *********************************************/
    const [filterDate, setFilterDate] = useState<Date | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<DropdownOption | null>(null);

    /********************************************
        Department Colors
    *********************************************/
    const departmentColors = [
        "#00BCD4",
        "#FF9800",
        "#4CAF50",
        "#9C27B0",
        "#E91E63",
        "#607D8B",
        "#795548",
        "#009688",
        "#F44336",
        "#673AB7",
        "#8BC34A",
    ];

    const eventColors = [
        "#4F7CF3",
        "#00BCD4",
        "#FF9800",
        "#4CAF50",
        "#9C27B0",
        "#E91E63",
        "#795548",
        "#607D8B",
        "#3F51B5",
        "#8BC34A",
    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Department Options
    *********************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "cardiology", name: "Cardiology", },
        { id: "orthopedics", name: "Orthopedics", },
        { id: "neurology", name: "Neurology", },
        { id: "general", name: "General Surgery", },
        { id: "urology", name: "Urology", },
        { id: "ent", name: "ENT", },
        { id: "gynecology", name: "Gynecology", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 27/06/2026
        Purpose : Doctor Options
    *********************************************/
    const DOCTOR_OPTIONS: DropdownOption[] = [
        { id: "doctor1", name: "Dr. Amit Sharma", },
        { id: "doctor2", name: "Dr. Neha Kapoor", },
        { id: "doctor3", name: "Dr. Ravi Kumar", },
        { id: "doctor4", name: "Dr. Pooja Verma", },
        { id: "doctor5", name: "Dr. Vivek Singh", },
    ];

    const [selectedDepartments, setSelectedDepartments] = useState<string[]>(["ALL", ...DEPARTMENT_OPTIONS.map(item => item.name),]);

    /********************************************
            Name : Manish Kumar
            Date : 27/06/2026
            Purpose : Dummy Scheduled Surgery Data
        *********************************************/
    const ALL_SCHEDULED_DATA: ScheduledData[] = [

        {
            id: "SCH001",
            fileNo: "FIL001",
            patientName: "Manish Kashyap",
            surgeryName: "Appendectomy",
            surgeryDate: "27/06/2026",
            surgeryTime: "09:00 AM",
            department: "General Surgery",
            lengthOfStay: 3,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Amit Sharma",
            ],
            isAddNewDoctor: true,
            isStartOperation: true,
            isEndOperation: false,
            isCancelOperation: true,
            isAddLogUsedItems: false,
            isAddNewSurgery: false,
            isAddReport: false,
            operationStatus: "Waiting",
            bedNumber: "13",
            roomNumber: "2",
        },

        {
            id: "SCH002",
            fileNo: "FIL002",
            patientName: "Rahul Sharma",
            surgeryName: "Heart Bypass",
            surgeryDate: "27/06/2026",
            surgeryTime: "10:30 AM",
            department: "Cardiology",
            lengthOfStay: 8,
            numberOfOperationDone: 2,
            doctorName: [
                "Dr. Neha Kapoor",
                "Dr. Ravi Kumar",
            ],
            isAddNewDoctor: true,
            isStartOperation: false,
            isEndOperation: true,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: true,
            isAddReport: false,
            operationStatus: "In Progress",
            bedNumber: "15",
            roomNumber: "3",
        },

        {
            id: "SCH003",
            fileNo: "FIL003",
            patientName: "Priya Verma",
            surgeryName: "Gallbladder Removal",
            surgeryDate: "27/06/2026",
            surgeryTime: "11:30 AM",
            department: "General Surgery",
            lengthOfStay: 4,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Vivek Singh",
            ],
            isAddNewDoctor: false,
            isStartOperation: false,
            isEndOperation: false,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: false,
            isAddReport: true,
            operationStatus: "Completed",
            bedNumber: "11",
            roomNumber: "1",
        },

        {
            id: "SCH004",
            fileNo: "FIL004",
            patientName: "Ankit Verma",
            surgeryName: "Hip Replacement",
            surgeryDate: "28/06/2026",
            surgeryTime: "08:00 AM",
            department: "Orthopedics",
            lengthOfStay: 6,
            numberOfOperationDone: 2,
            doctorName: [
                "Dr. Amit Sharma",
                "Dr. Pooja Verma",
            ],
            isAddNewDoctor: true,
            isStartOperation: false,
            isEndOperation: true,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: true,
            isAddReport: false,
            operationStatus: "In Progress",
            bedNumber: "9",
            roomNumber: "4",
        },

        {
            id: "SCH005",
            fileNo: "FIL005",
            patientName: "Riya Sharma",
            surgeryName: "Knee Replacement",
            surgeryDate: "28/06/2026",
            surgeryTime: "12:00 PM",
            department: "Orthopedics",
            lengthOfStay: 5,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Ravi Kumar",
            ],
            isAddNewDoctor: true,
            isStartOperation: true,
            isEndOperation: false,
            isCancelOperation: true,
            isAddLogUsedItems: false,
            isAddNewSurgery: false,
            isAddReport: false,
            operationStatus: "Waiting",
            bedNumber: "18",
            roomNumber: "5",
        },

        {
            id: "SCH006",
            fileNo: "FIL006",
            patientName: "Neha Gupta",
            surgeryName: "Brain Tumor Surgery",
            surgeryDate: "28/06/2026",
            surgeryTime: "02:30 PM",
            department: "Neurology",
            lengthOfStay: 10,
            numberOfOperationDone: 3,
            doctorName: [
                "Dr. Neha Kapoor",
                "Dr. Amit Sharma",
            ],
            isAddNewDoctor: false,
            isStartOperation: false,
            isEndOperation: false,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: false,
            isAddReport: true,
            operationStatus: "Completed",
            bedNumber: "20",
            roomNumber: "6",
        },

        {
            id: "SCH007",
            fileNo: "FIL007",
            patientName: "Karan Mehta",
            surgeryName: "Kidney Stone Removal",
            surgeryDate: "29/06/2026",
            surgeryTime: "09:30 AM",
            department: "Urology",
            lengthOfStay: 2,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Vivek Singh",
            ],
            isAddNewDoctor: true,
            isStartOperation: true,
            isEndOperation: false,
            isCancelOperation: true,
            isAddLogUsedItems: false,
            isAddNewSurgery: false,
            isAddReport: false,
            operationStatus: "Waiting",
            bedNumber: "7",
            roomNumber: "2",
        },

        {
            id: "SCH008",
            fileNo: "FIL008",
            patientName: "Aman Singh",
            surgeryName: "Spinal Fusion",
            surgeryDate: "29/06/2026",
            surgeryTime: "11:00 AM",
            department: "Neurology",
            lengthOfStay: 9,
            numberOfOperationDone: 2,
            doctorName: [
                "Dr. Ravi Kumar",
                "Dr. Pooja Verma",
            ],
            isAddNewDoctor: true,
            isStartOperation: false,
            isEndOperation: true,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: true,
            isAddReport: false,
            operationStatus: "In Progress",
            bedNumber: "14",
            roomNumber: "7",
        },

        {
            id: "SCH009",
            fileNo: "FIL009",
            patientName: "Rohit Sharma",
            surgeryName: "ENT Microsurgery",
            surgeryDate: "30/06/2026",
            surgeryTime: "08:30 AM",
            department: "ENT",
            lengthOfStay: 1,
            numberOfOperationDone: 1,
            doctorName: [
                "Dr. Amit Sharma",
            ],
            isAddNewDoctor: false,
            isStartOperation: false,
            isEndOperation: false,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: false,
            isAddReport: true,
            operationStatus: "Completed",
            bedNumber: "4",
            roomNumber: "1",
        },

        {
            id: "SCH010",
            fileNo: "FIL010",
            patientName: "Pooja Singh",
            surgeryName: "C-Section",
            surgeryDate: "30/06/2026",
            surgeryTime: "01:30 PM",
            department: "Gynecology",
            lengthOfStay: 4,
            numberOfOperationDone: 2,
            doctorName: [
                "Dr. Neha Kapoor",
            ],
            isAddNewDoctor: true,
            isStartOperation: false,
            isEndOperation: true,
            isCancelOperation: false,
            isAddLogUsedItems: true,
            isAddNewSurgery: true,
            isAddReport: false,
            operationStatus: "In Progress",
            bedNumber: "22",
            roomNumber: "8",
        },

    ];

    /********************************************
        Handle Department Checkbox
    *********************************************/
    const handleDepartmentToggle = (department: string) => {
        if (department === "ALL") {
            if (selectedDepartments.includes("ALL")) {
                setSelectedDepartments([]);
            } else {
                setSelectedDepartments([
                    "ALL",
                    ...DEPARTMENT_OPTIONS.map((x) => x.name),
                ]);
            }
            return;
        }

        let updatedDepartments = selectedDepartments.filter((item) => item !== "ALL");

        if (updatedDepartments.includes(department)) {
            updatedDepartments = updatedDepartments.filter((item) => item !== department);
        } else {
            updatedDepartments.push(department);
        }

        if (updatedDepartments.length === DEPARTMENT_OPTIONS.length) {
            updatedDepartments = [
                "ALL",
                ...DEPARTMENT_OPTIONS.map((x) => x.name),
            ];
        }

        setSelectedDepartments(updatedDepartments);
    };

    /********************************************
        Convert Date
    *********************************************/
    const convertToCalendarDate = (date: string, time: string) => {
        const [day, month, year] = date.split("/");
        const [clock, modifier] = time.split(" ");
        let [hour, minute] = clock.split(":").map(Number);

        if (modifier === "PM" && hour !== 12) {
            hour += 12;
        }

        if (modifier === "AM" && hour === 12) {
            hour = 0;
        }

        return `${year}-${month}-${day}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
    };

    /********************************************
        Calendar Events
    *********************************************/
    const calendarEvents = useMemo(() => {
        return ALL_SCHEDULED_DATA
            .filter((item) => {
                const matchesDoctor =
                    !selectedDoctor ||
                    item.doctorName.some(
                        (doctor) => doctor.toLowerCase() === selectedDoctor.name.toLowerCase()
                    );

                const matchesDepartment =
                    selectedDepartments.includes("ALL") ||
                    selectedDepartments.includes(item.department);

                return matchesDoctor && matchesDepartment;
            })
            .map((item, index) => ({
                id: item.id,
                title: `${item.patientName} / ${item.surgeryName}`,
                start: convertToCalendarDate(item.surgeryDate, item.surgeryTime),
                extendedProps: {
                    bgColor: eventColors[index % eventColors.length],
                    patientName: item.patientName,
                    surgeryName: item.surgeryName,
                    department: item.department,
                    doctors: item.doctorName,
                    status: item.operationStatus,
                    room: item.roomNumber,
                    bed: item.bedNumber,
                },
            }));
    }, [selectedDoctor, selectedDepartments]);

    return (
        <div className="card mt-4 border-0 rounded-0">
            <div className="card-body">

                <div className="row">

                    {/* ====================== LEFT ====================== */}

                    <div className="col-lg-8 col-md-8 col-sm-12 mb-4">

                        <FullCalendar
                            ref={calendarRef}
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin,
                            ]}
                            initialView="dayGridMonth"
                            selectable
                            editable={false}
                            events={calendarEvents}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,list",
                            }}
                            buttonText={{
                                today: "Today",
                                month: "Month",
                                week: "Week",
                                day: "Day",
                                list: "List",
                            }}
                            eventColor="#3E64AB"
                            eventTextColor="#fff"
                            height="132vh"
                            eventClick={(info) => {

                                console.log(info.event.extendedProps);

                            }}

                            eventContent={(info) => {
                                const props = info.event.extendedProps;

                                // MONTH VIEW
                                if (info.view.type === "dayGridMonth") {
                                    return (
                                        <div className={styles.monthEventCard} style={{ background: props.bgColor }}>
                                            <div className={styles.monthEventTime}>{info.timeText}</div>
                                            <div className={styles.monthEventPatient}>{props.patientName}</div>
                                            <div className={styles.monthEventDepartment}>{props.department}</div>
                                            <div className={styles.monthEventDoctor}>{props.doctors.join(", ")}</div>
                                        </div>
                                    );
                                }

                                // WEEK VIEW
                                if (info.view.type === "timeGridWeek") {
                                    return (
                                        <div className={styles.weekEventCard} style={{ background: props.bgColor }}>
                                            {/* <div className={styles.weekEventTime}>{info.timeText}</div> */}
                                            <div className={`${styles.weekEventPatient} text-nowrap`}>{props.patientName}</div>
                                            <div className={styles.weekEventDepartment}>{props.department}</div>
                                            {/* <div className={styles.weekEventDoctor}>{props.doctors.join(", ")}</div> */}
                                        </div>
                                    );
                                }

                                // DAY VIEW
                                if (info.view.type === "timeGridDay") {
                                    return (
                                        <div className={`${styles.dayEventCard} d-flex gap-0`} style={{ background: props.bgColor }}>
                                            <div className={`${styles.dayEventTime} border-end pe-2`}><b>Time:{" "}</b>{info.timeText}</div>
                                            <div className={`${styles.dayEventPatient} border-end px-2`}><b>Patient Name:{" "}</b>{props.patientName}</div>
                                            <div className={`${styles.dayEventDepartment} ps-2`}><b>Department:{" "}</b>{props.department}</div>
                                            {/* <div className={`${styles.dayEventDoctor} ps-2`}><b>Doctor:{" "}</b>{props.doctors.join(", ")}</div> */}
                                        </div>
                                    );
                                }

                                // LIST VIEW
                                if (info.view.type === "list") {
                                    return (
                                        <div className={styles.listEventCard} style={{ background: props.bgColor }}>
                                            <div className={styles.listEventTime}>{info.timeText}</div>
                                            <div className={styles.listEventPatient}>{props.patientName}</div>
                                            <div className={styles.listEventDepartment}><b>Department:{"  "}</b>{props.department}</div>
                                            <div className={styles.listEventDoctor}><b>Doctor:{"  "}</b>{props.doctors.join(", ")}</div>
                                        </div>
                                    );
                                }

                                return null;
                            }}
                        />

                    </div>

                    {/* ====================== RIGHT ====================== */}
                    <div className="col-lg-4 col-md-4 col-sm-12">

                        <div>

                            <p className="fw-500 fs-18 mb-2">
                                Doctor Availability
                            </p>

                            <div
                                className="w-100"
                                style={{
                                    overflowX: "auto",
                                }}
                            >
                                <DateFilterCalendar
                                    selectedDate={filterDate}
                                    onDateSelect={setFilterDate}
                                />
                            </div>

                        </div>

                        {/* Apply */}

                        <button
                            className="bg-blue text-white border-0 aph-modal-btn-height w-100 my-3"
                            onClick={() => {

                                if (
                                    !filterDate ||
                                    !calendarRef.current
                                )
                                    return;

                                const api =
                                    calendarRef.current.getApi();

                                api.gotoDate(filterDate);

                                api.changeView("timeGridDay");

                            }}
                        >
                            Apply
                        </button>

                        {/* Doctor */}

                        <div className="mb-4">

                            <label className="form-label fw-500">
                                Doctor
                            </label>

                            <CustomFormDropdown
                                options={DOCTOR_OPTIONS}
                                value={selectedDoctor}
                                placeholder="Select Doctor"
                                onChange={setSelectedDoctor}
                            />

                        </div>

                        {/* Department */}

                        <div className="card border-0 rounded-3">

                            <div className="card-body border-0 p-0">

                                <h5 className="fs-18 fw-500 mb-3">
                                    Departments
                                </h5>

                                <div className="d-flex flex-column gap-2">

                                    <div
                                        className={`${styles.departmentItem} d-flex align-items-center mt-2`}
                                        onClick={() => handleDepartmentToggle("ALL")}
                                    >

                                        <div
                                            className={`${styles.departmentCheckbox} ${selectedDepartments.includes("ALL")
                                                ? "active"
                                                : ""
                                                }`}
                                            style={{
                                                backgroundColor: selectedDepartments.includes("ALL")
                                                    ? "#495057"
                                                    : "#fff",
                                                borderColor: "#495057",
                                            }}
                                        >
                                            {selectedDepartments.includes("ALL") && (
                                                <i className="ri-check-line"></i>
                                            )}
                                        </div>

                                        <span className={`${styles.departmentName} ms-3 fw-600`}>
                                            View All
                                        </span>

                                    </div>

                                    {DEPARTMENT_OPTIONS.map(
                                        (
                                            department,
                                            index
                                        ) => {

                                            const color =
                                                departmentColors[
                                                index %
                                                departmentColors.length
                                                ];

                                            return (

                                                <div
                                                    key={department.id}
                                                    className={`${styles.departmentItem} d-flex align-items-center`}
                                                    onClick={() => handleDepartmentToggle(department.name)}
                                                >

                                                    <div
                                                        className={`${styles.departmentCheckbox} ${selectedDepartments.includes(department.name)
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                        style={{
                                                            backgroundColor: selectedDepartments.includes(department.name)
                                                                ? color
                                                                : "#fff",
                                                            borderColor: color,
                                                        }}
                                                    >
                                                        {selectedDepartments.includes(department.name) && (
                                                            <i className="ri-check-line"></i>
                                                        )}
                                                    </div>

                                                    <span className={`${styles.departmentName} ms-3`}>
                                                        {department.name}
                                                    </span>

                                                </div>

                                            );

                                        }
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}