import Header from "../../GlobalHelpers/Header";
import SupplierAndVendorAccountGridTable from "../../Components/Accounting/SupplierAndVendorAccount/SupplierAndVendorAccountGridTable";


export default function SupplierAndVendorAccount() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Supplier & Vendor Account"
                />

                <SupplierAndVendorAccountGridTable/>
            </div>
        </>
    )
}
