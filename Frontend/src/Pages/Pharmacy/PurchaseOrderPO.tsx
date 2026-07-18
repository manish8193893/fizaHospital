import Header from "../../GlobalHelpers/Header";
import PurchaseOrderGridTable from "../../Components/Pharmacy/PurchaseOrder/PurchaseOrderGridTable";

export default function PurchaseOrderPO() {
  return (
    <div className="container-fluid p-3">

      <Header heading="Pharmacy" subHeading="Purchase Order - PO" />

      <PurchaseOrderGridTable />
    </div>
  );
}