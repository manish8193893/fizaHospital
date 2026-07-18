/************************************************************
  Name : Manish Kumar
  Date : 28/05/2026
  Purpose : Design the  UI and Implement the functionality
*************************************************************/
import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import AppointmentGridTable from "../../Components/Reception/AppointmentGridTable";


export default function Appointments() {

  return (
    <div className="container-fluid p-3">

      {/* Header */}
      <Header heading="Reception" subHeading="Appointment" />

      {/* Stat Cards */}
      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Pending Appointment" value={6} icon="ORANGEDOTTEDCLOCK" color="#FF9F43" />
        <StatCard title="Appointment Today" value={45} icon="PINKCALENDAR" color="#FF4C51" />
        <StatCard title="Confirmed Appointment " value={39} icon="BLUECALENDAR" color="#00BAD1" />
        <StatCard title="Total Patients" value={1158} icon="BLUEUSER" color="#7367F0" />
      </div>

      {/* Appointment Filters | New Appointment Modal | Appointment Grid Table */}
      <AppointmentGridTable />
    </div >
  )
}