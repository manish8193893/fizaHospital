import type { ReactNode } from 'react';
import Footer from '../GlobalHelpers/Footer';
import { sidebarMenuOptions } from '../data/sidebarOptions';
import '../styles/Layout.css';
import Sidebar from '../GlobalHelpers/Sidebar';
import { useSidebar } from '../contexts/SidebarContext';
import Breadcrumb from '../GlobalHelpers/Breadcrumb';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarLoading?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const { sidebarVisible } = useSidebar();

  return (
    <div className="dashboard-container d-flex">
      {sidebarVisible && <Sidebar menuItems={sidebarMenuOptions.menuItems} />}
      <main className={`main-content grow d-flex flex-column ${!sidebarVisible ? 'sidebar-hidden' : ''}`}>
        <Breadcrumb />
        <div className="main-page-right-layout grow">{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
