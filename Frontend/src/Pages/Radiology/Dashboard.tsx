import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    type ChartOptions,
    type ChartData,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

import Header from '../../GlobalHelpers/Header'
import StatCard from '../../GlobalHelpers/StatCrad'

import "../../styles/Radiology.css";

export default function Dashboard() {

    const doctors = [
        { name: "Dr. Lester Palmer", department: "MRI (12 requests)", },
        { name: "Dr. Lester Palmer", department: "MRI (12 requests)", },
        { name: "Dr. Lester Palmer", department: "MRI (12 requests)", },
        { name: "Dr. Lester Palmer", department: "MRI (12 requests)", },
    ];

    const schedule = [
        { time: "9:00", title: "MRI (Patient A)", },
        { time: "10:30", title: "CT Scan (Patient B)", },
        { time: "11:15", title: "X-Ray (Patient C)", },
    ];

    const machineUsageData: ChartData<"bar"> = {
        labels: ["MRI", "CT", "X-Ray"],
        datasets: [
            {
                label: "Usage %",
                data: [80, 65, 90],
                backgroundColor: ["#00BAD1", "#28C76F", "#FF4C51"],
                borderRadius: {
                    topLeft: 0,
                    topRight: 6,
                    bottomLeft: 0,
                    bottomRight: 6,
                },
                borderSkipped: false,
                barThickness: 30,
            },
        ],
    };

    const machineUsageOptions: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.raw}%`,
                },
            },
        },
        scales: {
            x: {
                min: 0,
                max: 100,
                grid: {
                    color: "#ECECEC",
                },
                border: {
                    display: false,
                },
                ticks: {
                    stepSize: 40,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#666",
                    font: {
                        weight: "bold",
                    },
                },
            },
        },
    };



    return (
        <div className="container-fluid p-3">

            <Header
                heading="Radiology"
                subHeading="Dashboard"
            />

            <div className="d-flex gap-3 flex-wrap my-3">
                <StatCard title="Urgent Scans" value={2} icon="SORTFROMBOTTOMTOTOP" color="#FF4C51" />
                <StatCard title="Completed Scans" value={2} icon="CYANCHECKLIST" color="#00BAD1" />
                <StatCard title="Waiting Orders" value={8} icon="SORTBYTIME" color="#FF9F43" />
                <StatCard title="Total Orders" value={33} icon="VIOLETCHECKLIST" color="#7367F0" />
            </div>

            {/* Bottom Cards */}
            <div className="row mt-3 g-3">

                {/* Schedule */}
                <div className="col-lg-4">

                    <div className="card border-0 rounded-1 h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-start mb-3">

                                <div className="text-start">
                                    <h6 className="mb-0">Today's Schedule Timeline</h6>
                                    <small className="text-muted">
                                        Today's Bookings
                                    </small>
                                </div>

                            </div>

                            {schedule.map((item, index) => (
                                <div
                                    key={index}
                                    className="timeline-item d-flex align-items-start"
                                >
                                    <div className="timeline-dot"></div>

                                    <div className="ps-3">
                                        <span className='fs-16 fw-500'>{item.time}</span><i className="ri-arrow-right-long-line mx-1"></i><span className='fs-16 fw-500 text-muted'>{item.title}</span>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

                {/* Machine Usage */}
                <div className="col-lg-4">

                    <div className="card border-0 rounded-1 h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-start mb-2">

                                <div className="text-start">
                                    <h6 className="mb-0">Machine Usage</h6>
                                    <small className="text-muted">
                                        Device utilization
                                    </small>
                                </div>

                            </div>

                            <div style={{ height: "220px" }}>
                                <Bar
                                    data={machineUsageData}
                                    options={machineUsageOptions}
                                />
                            </div>

                        </div>

                    </div>

                </div>


                {/* Doctors */}
                <div className="col-lg-4">

                    <div className="card border-0 rounded-1 h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-start mb-3">

                                <div className="text-start">
                                    <h6 className="mb-0">Top Referring Doctors</h6>
                                    <small className="text-muted">
                                        Number of requests by doctor
                                    </small>
                                </div>

                            </div>

                            {doctors.map((doctor, index) => (
                                <div
                                    key={index}
                                    className="d-flex justify-content-start align-items-center py-2"
                                >
                                    <div className="me-2">
                                        <i className="ri-first-aid-kit-line fs-24 fw-500 p-2 rounded-circle" style={{ color: "#3E64AB", backgroundColor: "#A78CEA66" }}></i>
                                    </div>
                                    <div className="text-start">
                                        <h6 className="mb-0 fs-14 fw-500">{doctor.name}</h6>
                                        <span className="text-muted fs-12 fw-700">
                                            {doctor.department}
                                        </span>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
