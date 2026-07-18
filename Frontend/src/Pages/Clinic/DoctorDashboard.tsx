import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import DoctorDashboardGridTable from "../../Components/Clinic/DoctorDashboardGridTable";

export default function DoctorDashboard() {
  return (
    <div className="container-fluid p-3">

      {/* Header */}
      <Header heading="Clinic" subHeading="Doctor Dashboard" />

      {/* Stat Cards */}
      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="No-Shows" value={2} icon="USERBLOCK" color="#FF4C51" />
        <StatCard title="Checked-In Patients" value={2} icon="USERHANDUP" color="#00BAD1" />
        <StatCard title="Today Appointment" value={8} icon="ORANGECLOCK" color="#FF9F43" />
        <StatCard title="Total Patients" value={10} icon="BLUEUSER" color="#7367F0" />
      </div>

      <DoctorDashboardGridTable/>
    </div>
  )
}
