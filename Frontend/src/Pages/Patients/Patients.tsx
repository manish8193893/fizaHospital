import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import PatientGridTable from "../../Components/Patient/PatientGridTable";

export default function Patients() {
    return (
        <div className="container-fluid p-3">

            {/* Header */}
            <Header heading="Patients" />

            {/* Stat Cards */}
            <div className="d-flex gap-3 flex-wrap my-3">
                <StatCard title="OUT Patients" value={15} icon="SCREENSHARE" color="#FF4C51" />
                <StatCard title="IN Patients" value={43} icon="SLEEPING" color="#00BAD1" />
                <StatCard title="Today Visits" value={8} icon="LOGIN" color="#FF9F43" />
                <StatCard title="Total Patients" value={250} icon="BLUEUSER" color="#7367F0" />
            </div>

            <PatientGridTable />
        </div>
    )
}
