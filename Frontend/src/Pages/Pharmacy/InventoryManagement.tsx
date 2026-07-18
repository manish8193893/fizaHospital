import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import InventoryManagementGridTable from "../../Components/Pharmacy/InventoryManagement/InventoryManagementGridTable";

export default function InventoryManagement() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Pharmacy"
        subHeading="Inventory Management"
      />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Out of Stock" value={15} icon="JAROFPILLS" color="#FF4C51" />
        <StatCard title="Medicines Expiring Soon" value={43} icon="FILECORRUPTED" color="#00BAD1" />
        <StatCard title="Low Stock Alerts" value={8} icon="BROWNCUBE" color="#FF9F43" />
        <StatCard title="Total Products" value={250} icon="BLUEUSER" color="#7367F0" />
      </div>

      <InventoryManagementGridTable/>

    </div>
  );
}