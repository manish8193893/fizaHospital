import AttendanceGridTable from "../../Components/HumanResource/Attendance/AttendanceGridTable";
import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";

export default function Attendance() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Human Resources"
        subHeading="Attendance Table"
      />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="On Vacation" value={32} icon="BROWNDOTTEDCALENDAR" color="#FF9F43" />
        <StatCard title="Absence Today" value={12} icon="USERBLOCK" color="#FF4C51" />
        <StatCard title="Attendance Today" value={298} icon="USERHANDUP" color="#00BAD1" />
        <StatCard title="Total Employees" value={342} icon="BLUEUSER" color="#7367F0" />
      </div>

      <AttendanceGridTable/>
    </div>
  );
}