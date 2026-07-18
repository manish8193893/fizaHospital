import React, { useEffect, useRef, useState } from "react";

import { useSidebar } from '../contexts/SidebarContext';

import '../styles/Header.css';
import ConfirmationModal from "../GlobalHelpermodal/GlobalHelperModal";

interface HeaderProps {
  heading: string;
  subHeading?: string;
}

const Header: React.FC<HeaderProps> = ({ heading, subHeading }) => {
  const { sidebarVisible, toggleSidebar } = useSidebar();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);


  return (
    <>
      <header className="d-flex justify-content-between align-items-center px-4 bg-white header-container">

        {/* Left Menu */}
        <button className="btn border-0" onClick={toggleSidebar}>
          {sidebarVisible ? (
            <i className="ri-menu-line fs-4"></i>
          ) : (
            <i className="ri-expand-right-fill fs-4"></i>
          )}
        </button>

        {/* Center Title */}
        <div className="text-center">
          <span className="fw-bold" style={{ letterSpacing: "0.05rem" }}>{heading}{ }</span>
          {subHeading && (
            <>
              <span className="header-heading">/&nbsp;</span>
              <span className="header-subheading">{subHeading}</span>
            </>
          )}
        </div>

        {/* Right Icons */}
        <div className="header-right">

          {/* Desktop View */}
          <div className="desktop-actions d-flex justify-content-between align-items-center gap-3">
            <div className="user-profile">
              <span className="header-avatar">M</span>
              <div className="user-name">Manish Kashyap</div>
            </div>

            <i className="ri-moon-line theme-toggle-btn" />
            <i className="ri-mail-ai-line fs-24 mail-icon text-muted" />
            <i className="ri-notification-2-line fs-24 text-muted" />
            <i
              className="ri-logout-circle-r-line fs-24 text-danger"
              onClick={() => setShowConfirmationModal(true)}
            />
          </div>

          {/* Mobile / Tablet View */}
          <div
            className="mobile-profile"
            ref={profileRef}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-box">
              <span className="header-avatar text-white">M</span>
              <span>Manish Kashyap</span>
              <i className="ri-arrow-down-s-line" />
            </div>

            <div className={`profile-dropdown ${showProfileMenu ? "show" : ""}`}>
              <p className="welcome-text">Welcome back!</p>

              <div className="profile-item">
                <i className="ri-account-circle-line" />
                Profile
              </div>
              <div
                className="profile-item"
                onClick={() => setDarkMode(!darkMode)}
              >
                <i className={darkMode ? "ri-sun-line" : "ri-moon-line"} />
                {darkMode ? "Light Mode" : "Dark Mode"}
              </div>

              <div className="profile-item">
                <i className="ri-notification-line" />
                Notifications
              </div>
              <div className="profile-item">
                <i className="ri-settings-line" />
                Account Settings
              </div>
              <div className="profile-item">
                <i className="ri-customer-service-2-line" />
                Support Center
              </div>
              <div className="profile-item logout" onClick={() => setShowConfirmationModal(true)}>
                <i className="ri-logout-box-r-line" />
                Log Out
              </div>
            </div>
          </div>

        </div>

      </header>
      <ConfirmationModal
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        variant="logout"
      />
    </>
  );
};

export default Header;