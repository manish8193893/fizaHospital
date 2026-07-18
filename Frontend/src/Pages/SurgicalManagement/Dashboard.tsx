import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import WardDashboard from "../../Components/WardManagement/Dashboard/WardDashboard";


export default function Dashboard() {
    return (
        <div className="container-fluid p-3">

            <Header
                heading="Surgical Management"
                subHeading="Dashboard"
            />

            <div className="d-flex gap-3 flex-wrap my-3">
                <StatCard title="Active Surgeries" value={2} icon="REDHEARTBEAT" color="#FF4C51" />
                <StatCard title="Occupied Rooms" value={8} icon="ORANGESINGLEUSER" color="#FF9F43" />
                <StatCard title="Available Rooms" value={2} icon="CYANCHECK" color="#00BAD1" />
                <StatCard title="Total Wards" value={11} icon="VIOLETBUILDING" color="#7367F0" />
            </div>

            <WardDashboard/>
        </div>
    )
}
