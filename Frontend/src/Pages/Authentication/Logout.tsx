import Header from "../../GlobalHelpers/Header";
import UnderDevelopment from "../UnderDevelopment";


export default function Logout() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Logout"
                />

                <UnderDevelopment title="Logout" />
            </div>
        </>
    )
}
