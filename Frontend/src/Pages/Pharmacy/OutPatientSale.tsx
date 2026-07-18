import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import OutPatientGridTable from "../../Components/Pharmacy/OutPatientSale/OutPatientGridTable";

export default function OutPatientSale() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Pharmacy"
        subHeading="Out-Patient Sale"
      />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Today's Sales" value={13512} icon="BROWNDOLLARICON" color="#FF4C51" />
        <StatCard title="Dispensed" value={2} icon="CYANDOCUMENTICON" color="#00BAD1" />
        <StatCard title="Pending" value={8} icon="ORANGECLOCK" color="#FF9F43" />
        <StatCard title="Total Today" value={10} icon="BLUEUSER" color="#7367F0" />
      </div>

      <OutPatientGridTable/>

    </div>
  );
}