import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import BillingAndInvoiceGridTable from "../../Components/Accounting/BillingAndInvoice/BillingAndInvoiceGridTable";


export default function BillingAndInvoicing() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Billing & Invoicing"
                />

                {/* Stat Cards */}
                <div className="d-flex gap-3 flex-wrap my-3">
                    <StatCard title="Total Income" value={6} icon="BROWNDOLLARICON" color="#FF4C51" />
                    <StatCard title="Paid" value={45} icon="BLUEBILLCHEC" color="#00BAD1" />
                    <StatCard title="Pending " value={39} icon="ORANGECLOCK" color="#FF9F43" />
                    <StatCard title="Total Invoice" value={1158} icon="VIOLETBILL" color="#7367F0" />
                </div>

                <BillingAndInvoiceGridTable />
            </div>
        </>
    )
}
