import type { SidebarConfig } from '../types/sidebar';

const icons = {
  accounting: '/Assets/Icons/SidebarIcons/Accounting.svg',
  clinic: '/Assets/Icons/SidebarIcons/Clinick.svg',
  dashboard: '/Assets/Icons/SidebarIcons/Dashboard.svg',
  humanResources: '/Assets/Icons/SidebarIcons/HumanResource.svg',
  laboratory: '/Assets/Icons/SidebarIcons/Laboratory.svg',
  logout: '/Assets/Icons/SidebarIcons/logout.svg',
  nurseStation: '/Assets/Icons/SidebarIcons/NurseStation.svg',
  wardManagement: '/Assets/Icons/SidebarIcons/WardManagement.svg',
  patients: '/Assets/Icons/SidebarIcons/Patients.svg',
  pharmacy: '/Assets/Icons/SidebarIcons/Pharmacy.svg',
  radiology: '/Assets/Icons/SidebarIcons/Radiology.svg',
  reception: '/Assets/Icons/SidebarIcons/Reception.svg',
  reports: '/Assets/Icons/SidebarIcons/Reports.svg',
  dms: '/Assets/Icons/SidebarIcons/DMS.svg',
  settings: '/Assets/Icons/SidebarIcons/Settings.svg',
  surgicalManagement: '/Assets/Icons/SidebarIcons/SurgicalManagement.svg',
};

export const sidebarMenuOptions: SidebarConfig = {
  menuItems: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: icons.dashboard,
      path: '/dashboard',
    },
    {
      id: 'reception',
      label: 'Reception',
      icon: icons.reception,
      subItems: [
        {
          id: 'reception-main',
          label: 'Reception',
          path: '/reception',
          icon: icons.reception,
        },
        {
          id: 'appointments',
          label: 'Appointments',
          path: '/reception/Appointments',
          icon: icons.reception,
        },
        {
          id: 'inpatient',
          label: 'InPatient',
          path: '/reception/InPatient',
          icon: icons.reception,
        },
      ],
    },
    {
      id: 'clinic',
      label: 'Clinic',
      icon: icons.clinic,
      subItems: [
        {
          id: 'doctor-dashboard',
          label: 'Doctor Dashboard',
          path: '/clinic/DoctorDashboard',
          icon: icons.clinic,
        },
        {
          id: 'surgery-schedule',
          label: 'Surgery Schedule',
          path: '/clinic/SurgerySchedule',
          icon: icons.clinic,
        },
      ],
    },
    {
      id: 'nurse-station',
      label: 'Nurse Station',
      icon: icons.nurseStation,
      subItems: [
        {
          id: 'nurse-dashboard',
          label: 'Nurse Dashboard',
          path: '/nurse-station/NurseDashboard',
          icon: icons.nurseStation,
        },
        {
          id: 'new-patient',
          label: 'New Patient',
          path: '/nurse-station/NewPatient',
          icon: icons.nurseStation,
        },
      ],
    },
    {
      id: 'human-resources',
      label: 'Human Resources',
      icon: icons.humanResources,
      subItems: [
        {
          id: 'hr-dashboard',
          label: 'Dashboard',
          path: '/human-resources/Dashboard',
          icon: icons.humanResources,
        },
        {
          id: 'employees',
          label: 'Employees',
          path: '/human-resources/Employees',
          icon: icons.humanResources,
        },
        {
          id: 'payroll',
          label: 'Payroll',
          path: '/human-resources/Payroll',
          icon: icons.humanResources,
        },
        {
          id: 'leave-management',
          label: 'Leave Management',
          path: '/human-resources/LeaveManagement',
          icon: icons.humanResources,
        },
        {
          id: 'attendance',
          label: 'Attendance',
          path: '/human-resources/Attendance',
          icon: icons.humanResources,
        },
        {
          id: 'hr-reports',
          label: 'Reports',
          path: '/human-resources/Reports',
          icon: icons.humanResources,
        },
        {
          id: 'hr-settings',
          label: 'Settings',
          path: '/human-resources/Settings',
          icon: icons.humanResources,
        },
      ],
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: icons.patients,
      path: '/patients',
    },
    {
      id: 'pharmacy',
      label: 'Pharmacy',
      icon: icons.pharmacy,
      subItems: [
        {
          id: 'pharmacy-dashboard',
          label: 'Dashboard',
          path: '/pharmacy/Dashboard',
          icon: icons.pharmacy,
        },
        {
          id: 'out-patient-sale',
          label: 'Out-Patient Sale',
          path: '/pharmacy/OutPatientSale',
          icon: icons.pharmacy,
        },
        {
          id: 'walk-in-sales',
          label: 'Walk-In Sales',
          path: '/pharmacy/WalkInSales',
          icon: icons.pharmacy,
        },
        {
          id: 'inventory-management',
          label: 'Inventory Management',
          path: '/pharmacy/InventoryManagement',
          icon: icons.pharmacy,
        },
        {
          id: 'purchase-order-po',
          label: 'Purchase Order - PO',
          path: '/pharmacy/PurchaseOrderPO',
          icon: icons.pharmacy,
        },
        {
          id: 'suppliers',
          label: 'Suppliers',
          path: '/pharmacy/Suppliers',
          icon: icons.pharmacy,
        },
        {
          id: 'pharmacy-settings',
          label: 'Pharmacy Settings',
          path: '/pharmacy/Settings',
          icon: icons.pharmacy,
        },
        {
          id: 'pharmacy-reports',
          label: 'Reports',
          path: '/pharmacy/Reports',
          icon: icons.pharmacy,
        },
      ],
    },
    {
      id: 'ward-management',
      label: 'Ward Management',
      icon: icons.wardManagement,
      subItems: [
        {
          id: 'ward-dashboard',
          label: 'Dashboard',
          path: '/ward-management/Dashboard',
          icon: icons.wardManagement,
        },
        {
          id: 'ward-settings',
          label: 'Ward Settings',
          path: '/ward-management/WardSettings',
          icon: icons.wardManagement,
        },
        {
          id: 'inpatient-admission-request',
          label: 'Inpatient Admission Request',
          path: '/ward-management/InpatientAdmissionRequest',
          icon: icons.wardManagement,
        },
        {
          id: 'manage-booking',
          label: 'Manage Booking',
          path: '/ward-management/ManageBooking',
          icon: icons.wardManagement,
        },
        {
          id: 'operation-reports',
          label: 'Reports',
          path: '/ward-management/Reports',
          icon: icons.wardManagement,
        },
      ],
    },
    {
      id: 'surgical-management',
      label: 'Surgical Management',
      icon: icons.surgicalManagement,
      subItems: [
        {
          id: 'surgical-dashboard',
          label: 'Dashboard',
          path: '/surgical-management/Dashboard',
          icon: icons.surgicalManagement,
        },
        {
          id: 'surgical-queues',
          label: 'Surgical Queues',
          path: '/surgical-management/SurgicalQueues',
          icon: icons.surgicalManagement,
        },
        {
          id: 'surgery-request',
          label: 'Surgery Request',
          path: '/surgical-management/SurgeryRequest',
          icon: icons.surgicalManagement,
        },
        {
          id: 'surgery-settings',
          label: 'Settings',
          path: '/surgical-management/Settings',
          icon: icons.surgicalManagement,
        },
        {
          id: 'surgery-reports',
          label: 'Reports',
          path: '/surgical-management/Reports',
          icon: icons.surgicalManagement,
        },
      ],
    },
    {
      id: 'radiology',
      label: 'Radiology',
      icon: icons.radiology,
      subItems: [
        {
          id: 'radiology-dashboard',
          label: 'Dashboard',
          path: '/radiology/Dashboard',
          icon: icons.radiology,
        },
        {
          id: 'radiology-request',
          label: 'Radiology Request',
          path: '/radiology/RadiologyRequest',
          icon: icons.radiology,
        },
        {
          id: 'radiology-scheduling',
          label: 'Scheduling',
          path: '/radiology/Scheduling',
          icon: icons.radiology,
        },
        {
          id: 'radiology-management',
          label: 'Radiology Management',
          path: '/radiology/RadiologyManagement',
          icon: icons.radiology,
        },
        {
          id: 'radiology-reports',
          label: 'Reports',
          path: '/radiology/Reports',
          icon: icons.radiology,
        },

      ],
    },
    {
      id: 'laboratory',
      label: 'Laboratory',
      icon: icons.laboratory,
      subItems: [
        {
          id: 'laboratory-dashboard',
          label: 'Dashboard',
          path: '/laboratory/Dashboard',
          icon: icons.laboratory,
        },
        {
          id: 'outpatient-test',
          label: 'Outpatient Test',
          path: '/laboratory/OutpatientTest',
          icon: icons.laboratory,
        },
        {
          id: 'laboratory-management',
          label: 'Laboratory Management',
          path: '/laboratory/LaboratoryManagement',
          icon: icons.laboratory,
        },
      ],
    },
    {
      id: 'accounting',
      label: 'Accounting',
      icon: icons.accounting,
      path:"/accounting",
      subItems: [
        {
          id: 'billing-invoicing',
          label: 'Billing & Invoicing',
          path: '/accounting/BillingAndInvoicing',
          icon: icons.accounting,
        },
        {
          id: 'payment-receipts',
          label: 'Payment & Receipts',
          path: '/accounting/PaymentAndReceipts',
          icon: icons.accounting,
        },
        {
          id: 'patient-financial-records',
          label: 'Patient Financial Records',
          path: '/accounting/PatientFinancialRecords',
          icon: icons.accounting,
        },
        {
          id: 'supplier-vendor-accounts',
          label: 'Supplier/Vendor Accounts',
          path: '/accounting/SupplierVendorAccounts',
          icon: icons.accounting,
        },
        {
          id: 'financial-reports',
          label: 'Financial Reports',
          path: '/accounting/FinancialReports',
          icon: icons.accounting,
        },
        {
          id: 'accounting-settings',
          label: 'Accounting Settings',
          path: '/accounting/AccountingSettings',
          icon: icons.accounting,
        },
        {
          id: 'doctor-accounts-surgery-fee',
          label: 'Doctor Accounts & Surgery Fee',
          path: '/accounting/DoctorAccountsAndSurgeryFee',
          icon: icons.accounting,
        },
        {
          id: 'expenses',
          label: 'Expenses',
          path: '/accounting/Expenses',
          icon: icons.accounting,
        },
        {
          id: 'invoice-request',
          label: 'Invoice Request',
          path: '/accounting/InvoiceRequest',
          icon: icons.accounting,
        },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: icons.reports,
      subItems: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          path: '/reports/Dashboard',
          icon: icons.reports,
        },
        {
          id: 'reports-center',
          label: 'Reports Center',
          path: '/reports/ReportsCenter',
          icon: icons.reports,
        },
        {
          id: 'template-management',
          label: 'Template Management',
          path: '/reports/TemplateManagement',
          icon: icons.reports,
        },
      ],
    },
    {
      id: 'dms',
      label: 'DMS',
      icon: icons.dms,
      subItems: [
        {
          id: 'dms-dashboard',
          label: 'Dashboard',
          path: '/dms/Dashboard',
          icon: icons.dms,
        },
        {
          id: 'birth-certificates',
          label: 'Birth Certificates',
          path: '/dms/BirthCertificates',
          icon: icons.dms,
        },
        {
          id: 'death-certificates',
          label: 'Death Certificates',
          path: '/dms/DeathCertificates',
          icon: icons.dms,
        },
        {
          id: 'digital-archive',
          label: 'Digital Archive',
          path: '/dms/DigitalArchive',
          icon: icons.dms,
        },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: icons.settings,
      subItems: [
        {
          id: 'system-settings',
          label: 'System Settings',
          path: '/settings/SystemSettings',
          icon: icons.settings,
        },
        {
          id: 'role-privileges',
          label: 'Role Privileges',
          path: '/settings/RolePrivileges',
          icon: icons.settings,
        },
      ],
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: icons.logout,
      path: '/logout',
    },
  ],
};
