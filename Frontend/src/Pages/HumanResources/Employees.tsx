import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import EmployeeGridTable from "../../Components/HumanResource/EmployeeGridTable";

export default function Employees() {

  return (
    <div className="container-fluid p-3">

      <Header
        heading="Human Resources"
        subHeading="Employees"
      />

      {/* Stat Cards */}
      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Department" value={32} icon="SKYBLUEHOSPITALBUILDING" color="#00BAD1" />
        <StatCard title="Part Time" value={12} icon="ORANGESINGLEUSER" color="#FF9F43" />
        <StatCard title="Full Time" value={298} icon="USERCHECKROUNDED" color="#0477BF" />
        <StatCard title="Total Employees" value={342} icon="BLUEUSER" color="#7367F0" />
      </div>
      <EmployeeGridTable/>
    </div>
  );
}