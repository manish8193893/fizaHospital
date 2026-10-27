import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

import { SidebarProvider } from './contexts/SidebarContext';
import { useAuth } from './contexts/AuthContext';
import TitleManager from './GlobalHelpers/TitleManager';
import DashboardLayout from './layouts/DashboardLayout';

import './styles/Layout.css';
import './styles/spinner.css';

// Authentication Pages
import Login from './Pages/Authentication/Login';
import Signup from './Pages/Authentication/Signup';
import ResetPassword from './Pages/Authentication/ResetPassword';
import EmailVerification from './Pages/Authentication/EmailVerification';
import Logout from './Pages/Authentication/Logout';


// Main Dashboard Page
import Dashboard from './Pages/Dashboard/Dashboard';


// Reception Pages
import Reception from './Pages/Reception/Reception';
import Appointments from './Pages/Reception/Appointments';
import InPatient from './Pages/Reception/InPatient';
import ReceptionNewPatients from './Components/Reception/ReceptionNewPatients';


// Clinic Pages
import DoctorDashboard from './Pages/Clinic/DoctorDashboard';
import PatientDetails from './Components/Clinic/PatientDetails';
import SurgerySchedule from './Pages/Clinic/SurgerySchedule';


// Nurse Station Pages
import NurseDashboard from './Pages/NurseStation/NurseDashboard';
import NewPatients from './Pages/NurseStation/NewPatients';
import NewPatientViewDetails from './Components/NurseStation/NewPatientViewDetails';


// Human Resources Pages
import HumanResourceDashboard from './Pages/HumanResources/Dashboard';
import Employees from './Pages/HumanResources/Employees';
import NewEmployee from './Components/HumanResource/NewEmployee';
import EmployeeDetails from './Components/HumanResource/EmployeeDetails';
import Payroll from './Pages/HumanResources/Payroll';
import PayrollGenerate from './Components/HumanResource/Payroll/PayrollGenerate';
import LeaveManagement from './Pages/HumanResources/LeaveManagement';
import Attendance from './Pages/HumanResources/Attendance';
import HumanResourceReports from './Pages/HumanResources/Reports';
import Settings from './Pages/HumanResources/Settings';


// Patients Page
import Patients from './Pages/Patients/Patients';
import PatientsDetails from './Components/Patient/PatientsDetails';


// Pharmacy Pages
import PharmacyDashboard from './Pages/Pharmacy/Dashboard';
import OutPatientSale from './Pages/Pharmacy/OutPatientSale';
import OutPatientSaleView from './Components/Pharmacy/OutPatientSale/OutPatientSaleView';
import WalkInSales from './Pages/Pharmacy/WalkInSales';
import InventoryManagement from './Pages/Pharmacy/InventoryManagement';
import ReceiveOrders from './Components/Pharmacy/InventoryManagement/ReceiveOrders';
import PurchaseOrderPO from './Pages/Pharmacy/PurchaseOrderPO';
import Suppliers from './Pages/Pharmacy/Suppliers';
import SupplierDetails from './Components/Pharmacy/Supplier/SupplierDetails';
import PharmacySettings from './Pages/Pharmacy/PharmacySettings';
import PharmacyReports from './Pages/Pharmacy/Reports';


// Operations Pages
import WardDashboard from './Pages/WardManagement/Dashboard';
import WardSettings from './Pages/WardManagement/WardSettings';
import WardManagementDetails from './Components/WardManagement/WardSettings/WardManagementDetails';
import InpatientAdmissionRequest from './Pages/WardManagement/InpatientAdmissionRequest';
import OperationReports from './Pages/WardManagement/Reports';
import ManageBooking from './Pages/WardManagement/ManageBooking';
import ManageBookingDetails from './Components/WardManagement/ManageBooking/ManageBookingDetails';


// Surgical Management Pages
import SurgicalDashboard from './Pages/SurgicalManagement/Dashboard';
import SurgicalQueues from './Pages/SurgicalManagement/SurgicalQueues';
import SurgeryRequest from './Pages/SurgicalManagement/SurgeryRequest';
import SurgicalReports from './Pages/SurgicalManagement/Reports';
import SurgicalSettings from './Pages/SurgicalManagement/Settings';


// Radiology Pages
import RadiologyDashboard from './Pages/Radiology/Dashboard';
import RadiologyRequest from './Pages/Radiology/RadiologyRequest';
import RadiologyScheduling from './Pages/Radiology/Scheduling';
import RadiologyManagement from './Pages/Radiology/RadiologyManagement';
import RadiologyReports from './Pages/Radiology/Reports';


// Laboratory Pages
import LaboratoryDashboard from './Pages/Laboratory/Dashboard';
import OutPatientTest from './Pages/Laboratory/OutPatientTest';
import LaboratoryManagement from './Pages/Laboratory/LaboratoryManagement';


// Accounting Pages
import AccountingSetup from './Pages/Accounting/AccountingSetup';
import BillingAndInvoicing from './Pages/Accounting/BillingAndInvoicing';
import PaymentAndReceipts from './Pages/Accounting/PaymentAndReceipts';
import PatientFinancialRecords from './Pages/Accounting/PatientFinancialRecords';
import SupplierAndVendorAccount from './Pages/Accounting/SupplierAndVendorAccount';
import FinancialReports from './Pages/Accounting/FinancialReports';
import AccountingSettings from './Pages/Accounting/AccountingSettings';
import DoctorAccountAndSurgeryFee from './Pages/Accounting/DoctorAccountAndSurgeryFee';
import Expenses from './Pages/Accounting/Expenses';
import InvoiceRequest from './Pages/Accounting/InvoiceRequest';


// Reports Pages
import ReportDashboard from './Pages/Reports/Dashboard';
import ReportCenter from './Pages/Reports/ReportCenter';
import TemplateManagement from './Pages/Reports/TemplateManagement';


// DMS Pages
import DMSDashboard from './Pages/DMS/Dashboard';
import BirthCertificates from './Pages/DMS/BirthCertificates';
import DeathCertificates from './Pages/DMS/deathCertificates';
import DigitalArchives from './Pages/DMS/DigitalArchives';


// System Settings Pages
import SystemSetting from './Pages/SystemSettings/SystemSetting';
import RolePrivilegs from './Pages/SystemSettings/RolePrivilegs';


// Not Found Page
import NotFound from './Pages/NotFound';

function ProtectedLayout() {
  const { isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="auth-loading d-flex align-items-center justify-content-center min-vh-100" role="status">Checking your session…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

function PublicOnlyLayout() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <div className="auth-loading d-flex align-items-center justify-content-center min-vh-100" role="status">Checking your session…</div>;
  }

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

function RequireAuth() {
  const { isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="auth-loading d-flex align-items-center justify-content-center min-vh-100" role="status">Checking your session…</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}


function App() {
  return (
    <SidebarProvider>
      <TitleManager />

      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route element={<PublicOnlyLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<RequireAuth />}>
          <Route path="/email-verification" element={<EmailVerification />} />
        </Route>


        <Route element={<ProtectedLayout />}>

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />


          {/* Reception */}
          <Route path="/reception">
            <Route index element={<Reception />} />
            <Route path="Appointments" element={<Appointments />} />
            <Route path="InPatient" element={<InPatient />} />
            <Route path="NewPatients" element={<ReceptionNewPatients />} />
          </Route>


          {/* Clinic */}
          <Route path="/clinic">
            <Route path="DoctorDashboard" element={<DoctorDashboard />} />
            <Route path="DoctorDashboard/View-Edit" element={<PatientDetails />} />
            <Route path="SurgerySchedule" element={<SurgerySchedule />} />
          </Route>


          {/* Nurse Station */}
          <Route path="/nurse-station">
            <Route path="NurseDashboard" element={<NurseDashboard />} />
            <Route path="NewPatient" element={<NewPatients />} />
            <Route path="NewPatient/ViewDetails" element={<NewPatientViewDetails />} />
          </Route>


          {/* Human Resources */}
          <Route path="/human-resources">
            <Route path="Dashboard" element={<HumanResourceDashboard />} />
            <Route path="Employees" element={<Employees />} />
            <Route path="Employees/NewEmployee" element={<NewEmployee />} />
            <Route path="Employees/View-Edit" element={<EmployeeDetails />} />
            <Route path="Payroll" element={<Payroll />} />
            <Route path="Payroll/CreatePayroll" element={<PayrollGenerate />} />
            <Route path="LeaveManagement" element={<LeaveManagement />} />
            <Route path="Attendance" element={<Attendance />} />
            <Route path="Reports" element={<HumanResourceReports />} />
            <Route path="Settings" element={<Settings />} />
          </Route>


          {/* Patients */}
          <Route path="/patients">
            <Route index element={<Patients />} />
            <Route path="PatientsDetails" element={<PatientsDetails />} />
          </Route>


          {/* Pharmacy */}
          <Route path="/pharmacy">
            <Route path="Dashboard" element={<PharmacyDashboard />} />
            <Route path="OutPatientSale" element={<OutPatientSale />} />
            <Route path="OutPatientSale/View" element={<OutPatientSaleView />} />
            <Route path="WalkInSales" element={<WalkInSales />} />
            <Route path="InventoryManagement" element={<InventoryManagement />} />
            <Route path="InventoryManagement/ReceiveOrders" element={<ReceiveOrders />} />
            <Route path="PurchaseOrderPO" element={<PurchaseOrderPO />} />
            <Route path="Suppliers" element={<Suppliers />} />
            <Route path="Suppliers/SupplierDetails" element={<SupplierDetails />} />
            <Route path="Settings" element={<PharmacySettings />} />
            <Route path="Reports" element={<PharmacyReports />} />
          </Route>


          {/* Ward Management */}
          <Route path="/ward-management">
            <Route path="Dashboard" element={<WardDashboard />} />
            <Route path="WardSettings" element={<WardSettings />} />
            <Route path="WardSettings/view" element={<WardManagementDetails />} />
            <Route path="InpatientAdmissionRequest" element={<InpatientAdmissionRequest />} />
            <Route path="Reports" element={<OperationReports />} />
            <Route path="ManageBooking" element={<ManageBooking />} />
            <Route path="ManageBooking/ViewDetails" element={<ManageBookingDetails />} />
          </Route>


          {/* Surgical Management */}
          <Route path="/surgical-management">
            <Route path="Dashboard" element={<SurgicalDashboard />} />
            <Route path="SurgicalQueues" element={<SurgicalQueues />} />
            <Route path="SurgeryRequest" element={<SurgeryRequest />} />
            <Route path="Settings" element={<SurgicalSettings />} />
            <Route path="Reports" element={<SurgicalReports />} />
          </Route>


          {/* Radiology */}
          <Route path="/radiology">
            <Route path="Dashboard" element={<RadiologyDashboard />} />
            <Route path="RadiologyRequest" element={<RadiologyRequest />} />
            <Route path="Scheduling" element={<RadiologyScheduling />} />
            <Route path="RadiologyManagement" element={<RadiologyManagement />} />
            <Route path="Reports" element={<RadiologyReports />} />
          </Route>


          {/* Laboratory */}
          <Route path="/laboratory">
            <Route path="Dashboard" element={<LaboratoryDashboard />} />
            <Route path="OutpatientTest" element={<OutPatientTest />} />
            <Route path="LaboratoryManagement" element={<LaboratoryManagement />} />
          </Route>


          {/* Accounting */}
          <Route path="/accounting">
            <Route index element={<AccountingSetup />} />
            <Route path="BillingAndInvoicing" element={<BillingAndInvoicing />} />
            <Route path="PaymentAndReceipts" element={<PaymentAndReceipts />} />
            <Route path="PatientFinancialRecords" element={<PatientFinancialRecords />} />
            <Route path="SupplierVendorAccounts" element={<SupplierAndVendorAccount />} />
            <Route path="FinancialReports" element={<FinancialReports />} />
            <Route path="AccountingSettings" element={<AccountingSettings />} />
            <Route path="DoctorAccountsAndSurgeryFee" element={<DoctorAccountAndSurgeryFee />} />
            <Route path="Expenses" element={<Expenses />} />
            <Route path="InvoiceRequest" element={<InvoiceRequest />} />
          </Route>


          {/* Reports */}
          <Route path="/reports">
            <Route path="Dashboard" element={<ReportDashboard />} />
            <Route path="ReportsCenter" element={<ReportCenter />} />
            <Route path="TemplateManagement" element={<TemplateManagement />} />
          </Route>


          {/* DMS */}
          <Route path="/dms">
            <Route path="Dashboard" element={<DMSDashboard />} />
            <Route path="BirthCertificates" element={<BirthCertificates />} />
            <Route path="DeathCertificates" element={<DeathCertificates />} />
            <Route path="DigitalArchive" element={<DigitalArchives />} />
          </Route>


          {/* System Settings */}
          <Route path="/settings">
            <Route path="SystemSettings" element={<SystemSetting />} />
            <Route path="RolePrivileges" element={<RolePrivilegs />} />
          </Route>


          {/* Logout */}
          <Route path="/logout" element={<Logout />} />


          {/* Not Found */}
          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>

    </SidebarProvider>
  );
}

export default App;
