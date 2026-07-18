import Header from "../../GlobalHelpers/Header";
import SettingGridTable from "../../Components/SurgicalManagement/Settings/SettingGridTable";


export default function Settings() {
    return (
        <div className="container-fluid p-3">

            <Header
                heading="Surgical Management"
                subHeading="Settings"
            />

            <SettingGridTable/>

        </div>
    )
}
