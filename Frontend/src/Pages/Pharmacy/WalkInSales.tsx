import WalkInSalesGridTable from "../../Components/Pharmacy/WalkInSales/WalkInSalesGridTable";
import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";

export default function WalkInSales() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Pharmacy"
        subHeading="Walk-In Sales"
      />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Today's Sales" value={13512} icon="BROWNDOLLARICON" color="#FF4C51" />
        <StatCard title="Total Transactions" value={2} icon="CYANDOCUMENTICON" color="#00BAD1" />
        <StatCard title="Items Sold Today" value={8} icon="BROWNBILLCHECK" color="#FF9F43" />
        <StatCard title="Refunds Today" value={10} icon="BLUEPILLS3" color="#7367F0" />
      </div>

      <WalkInSalesGridTable/>
    </div>
  );
}