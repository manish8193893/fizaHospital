import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import LeaveManagementGridTable from "../../Components/HumanResource/LeaveManagement/LeaveManagementGridTable";

export default function LeaveManagement() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Human Resources"
        subHeading="Leave Management"
      />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Employees on Leave Today" value={5} icon="BROWNDOTTEDCALENDAR" color="#FF9F43" />
        <StatCard title="Rejected Requests" value={10} icon="USERBLOCK" color="#FF4C51" />
        <StatCard title="Approved Leaves" value={18} icon="USERHANDUP" color="#00BAD1" />
        <StatCard title="Total Leave Requests" value={32} icon="FILETEXT" color="#7367F0" />
      </div>
      
      <LeaveManagementGridTable/>
    </div>
  );
}