import NewPatientDashboardGridTable from '../../Components/NurseStation/NewPatientDashboardGridTable'
import Header from '../../GlobalHelpers/Header'
import StatCard from '../../GlobalHelpers/StatCrad'

export default function NewPatients() {
  return (
    <div className="container-fluid p-3">

      {/* Header */}
      <Header heading="Nurse Station" subHeading="New Patients" />

      {/* Stat Cards */}
      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Waiting Patients" value={6} icon="ORANGECLOCK" color="#FF9F43" />
        <StatCard title="Room Number" value={2} icon="ORANGESOFA" color="#FF4C51" />
        <StatCard title="Floors" value={2} icon="SKYBLUEHOSPITALBUILDING" color="#00BAD1" />
        <StatCard title="Patients" value={4} icon="BLUEUSER" color="#7367F0" />
      </div>
      <NewPatientDashboardGridTable />
    </div>
  )
}
