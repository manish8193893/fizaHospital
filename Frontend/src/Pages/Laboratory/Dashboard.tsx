import { Bar } from "react-chartjs-2";
import Header from "../../GlobalHelpers/Header";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    type ChartOptions,
} from "chart.js";
import StatCard from "../../GlobalHelpers/StatCrad";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);


interface Category {
    name: string;
    count: number;
    color: string;
}


export default function Dashboard() {

    const doctors = [
        { name: "Dr. Lester Palmer", department: "MRI (12 requests)", },
        { name: "Dr. Lester Palmer", department: "MRI (12 requests)", },
        { name: "Dr. Lester Palmer", department: "MRI (12 requests)", },
        { name: "Dr. Lester Palmer", department: "MRI (12 requests)", },
    ];

    const categories: Category[] = [
        {
            name: "Hematology",
            count: 42,
            color: "#00BAD1",
        },
        {
            name: "Biochemistry",
            count: 14,
            color: "#28C76F",
        },
        {
            name: "Immunology",
            count: 10,
            color: "#FF4C51",
        },
        {
            name: "Hormones",
            count: 9,
            color: "#FF9F43",
        },
    ];

    const labStatusData = {
        labels: ["Waiting", "Completed", "Cancelled", "In Progress"],
        datasets: [
            {
                data: [32, 25, 15, 8],
                backgroundColor: ["#00BAD1", "#28C76F", "#FF4C51", "#FF9F43"],
                borderRadius: {
                    topRight: 6,
                    bottomRight: 6,
                    topLeft: 0,
                    bottomLeft: 0,
                },
                borderSkipped: false,
                barThickness: 30,
            },
        ],
    };

    const labStatusOptions: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                min: 0,
                max: 40,
                grid: {
                    color: "#ECECEC",
                },
                border: {
                    display: false,
                },
                ticks: {
                    stepSize: 15,
                    color: "#999",
                    font: {
                        size: 11,
                    },
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
                    color: "#555",
                    font: {
                        size: 11,
                        weight: 600, // Changed to numeric value
                    },
                },
            },
        },
    };

    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Laboratory"
                    subHeading="Dashboard"
                />

                {/* Stat Cards */}
                <div className="d-flex gap-3 flex-wrap my-3">
                    <StatCard title="Urgent Orders" value={6} icon="REDSORTFROMBOTTOMTOTOP" color="#FF4C51" />
                    <StatCard title="Completed" value={45} icon="CYANCHECKLIST" color="#00BAD1" />
                    <StatCard title="Waiting Orders " value={39} icon="BROWNSORTBYTIME" color="#FF9F43" />
                    <StatCard title="Total Orders" value={1158} icon="VIOLETCHECKLIST" color="#7367F0" />
                </div>

                <div className="row mt-3">

                    <div className="col-lg-4">

                        <div className="card border-0 rounded-1 h-100">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-start mb-3">

                                    <div className="text-start">
                                        <p className="mb-0 fs-16 fw-600">Top Referring Doctors</p>
                                        <p className="text-muted fs-14 fw-600 mb-0">
                                            Number of requests by doctor
                                        </p>
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

                    <div className="col-lg-8">
                        <div className="card border-0 rounded-1 h-100">
                            <div className="card-body">
                                {/* Header */}
                                <div className="mb-3">
                                    <p className="mb-0 fs-16 fw-600">Top Lab Categories</p>
                                    <p className="mb-0 text-muted fs-14 fw-600">Total Orders : 180</p>
                                </div>

                                <div className="row align-items-center">
                                    {/* Category stats */}
                                    <div className="col-md-5 d-flex align-self-start">
                                        <div className="row">
                                            {categories.map((item, index) => (
                                                <div className="col-6 text-start mb-2" key={index}>
                                                    <div className="d-flex justify-content-start align-items-center gap-2">
                                                        <span
                                                            style={{
                                                                width: "10px",
                                                                height: "10px",
                                                                background: item.color,
                                                                borderRadius: "50%",
                                                            }}
                                                        ></span>
                                                        <span className="fs-14 fw-600">
                                                            {item.name.split("\n")[0]}
                                                        </span>
                                                    </div>
                                                    <h5 className="mt-1 mb-0 ps-4 fs-22 text-muted fw-600">{item.count}</h5>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Status Chart */}
                                    <div className="col-md-7">
                                        <div style={{ maxHeight: "250px", minHeight: "200px" }}>
                                            <Bar data={labStatusData} options={labStatusOptions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
