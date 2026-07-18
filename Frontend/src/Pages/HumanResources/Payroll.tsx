import PayrollGridTable from "../../Components/HumanResource/Payroll/PayrollGridTable";
import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";

export default function Payroll() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Human Resources"
        subHeading="Payroll"
      />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Pending Salaries" value={28} icon="CARDSEARCH" />
        <StatCard title="Paid Salaries" value={120} icon="CARDSEND" />
        <StatCard title="Total Salaries This Month" value={210500} icon="BANKNOTE" />
        <StatCard title="Total Employees" value={148} icon="USERSGROUPTWOROUNDED" />
      </div>

      <PayrollGridTable/>

    </div>
  );
}