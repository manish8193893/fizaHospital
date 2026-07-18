import Header from "../../GlobalHelpers/Header";
import ExpensesGridTable from "../../Components/Accounting/Expenses/ExpensesGridTable";


export default function Expenses() {Expenses
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Expenses"
                />

                <ExpensesGridTable/>
            </div>
        </>
    )
}
