import Header from "../../GlobalHelpers/Header";
import SupplierGridTable from "../../Components/Pharmacy/Supplier/SupplierGridTable";

export default function Suppliers() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Pharmacy"
        subHeading="Suppliers"
      />
      <SupplierGridTable />
    </div>
  );
}