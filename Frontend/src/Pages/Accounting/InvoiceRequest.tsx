import InvoiceRequestGridTable from "../../Components/Accounting/InvoiceRequest/InvoiceRequestGridTable";
import Header from "../../GlobalHelpers/Header";



export default function InvoiceRequest() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Invoice Request"
                />

                <InvoiceRequestGridTable/>
            </div>
        </>
    )
}
