import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import InPatientAdmissionRequestGridTable from "../../Components/WardManagement/InPatientAdmissionRequest/InPatientAdmissionRequestGridTable";

export default function InpatientAdmissionRequest() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Ward Management"
        subHeading="Inpatient Admission Request"
      />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Available Beds" value={8} icon="REDDOUBLEBED" color="#FF4C51" />
        <StatCard title="Pending Requests" value={8} icon="ORANGESINGLEUSER" color="#FF9F43" />
        <StatCard title="Approved Today" value={2} icon="CYANCHECK" color="#00BAD1" />
        <StatCard title="Total Requests" value={3} icon="VIOLETBUILDING" color="#7367F0" />
      </div>

      <InPatientAdmissionRequestGridTable/>

    </div>
  );
}