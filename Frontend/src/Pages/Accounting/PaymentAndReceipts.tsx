import Header from "../../GlobalHelpers/Header";
import PaymentAndReceiptsGridTable from "../../Components/Accounting/PaymentAndReceipts/PaymentAndReceiptsGridTable";



export default function PaymentAndReceipts() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Payment & Receipts"
                />

                <PaymentAndReceiptsGridTable/>
            </div>
        </>
    )
}
