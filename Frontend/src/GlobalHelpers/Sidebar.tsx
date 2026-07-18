import { useEffect, useState, type CSSProperties } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import type { MenuItem } from '../types/sidebar';
import '../styles/Layout.css';

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMatches = (targetPath?: string): boolean => {
    if (!targetPath) return false;

    const currentPath = location.pathname.replace(/\/$/, '') || '/';
    const normalizedTarget = targetPath.replace(/\/$/, '') || '/';

    return (
      currentPath === normalizedTarget ||
      currentPath.startsWith(`${normalizedTarget}/`)
    );
  };

  const getActiveSubItemId = (item: MenuItem): string | null => {
    if (!item.subItems?.length) return null;

    const matchingSubItem = [...item.subItems]
      .filter((subItem) => pathMatches(subItem.path))
      .sort((first, second) => second.path.length - first.path.length)[0];

    return matchingSubItem?.id ?? null;
  };

  const activeAccordionId =
    menuItems.find((item) => item.subItems?.length && getActiveSubItemId(item))
      ?.id ?? null;

  const [expandedAccordionId, setExpandedAccordionId] = useState<string | null>(
    activeAccordionId
  );

  useEffect(() => {
    setExpandedAccordionId(activeAccordionId);
  }, [activeAccordionId]);

  return (
    <aside className="sidebar bg-white border-end">
      <div className="sidebar-header d-flex justify-content-center align-items-center">
        <img
          src="/Assets/Images/ApnaHospital.png"
          alt="Hospital Logo"
          className="hospital-logo-img"
        />
      </div>

      <Accordion
        activeKey={expandedAccordionId}
        className="sidebar-menu"
        flush
        onSelect={(eventKey) => {
          setExpandedAccordionId(typeof eventKey === 'string' ? eventKey : null);
        }}
      >
        {menuItems.map((item) => {
          const activeSubItemId = getActiveSubItemId(item);
          const activeSubItemIndex =
            item.subItems?.findIndex((subItem) => subItem.id === activeSubItemId) ??
            -1;
          const hasActiveSubItem = activeSubItemIndex >= 0;
          const isAccordionSelected =
            expandedAccordionId === item.id || activeAccordionId === item.id;
          const isDirectItemSelected = pathMatches(item.path);

          return item.subItems?.length ? (
            <Accordion.Item
              eventKey={item.id}
              key={item.id}
              className={`sidebar-accordion-item ${isAccordionSelected ? 'is-selected' : ''
                }`}
            >
              <Accordion.Header
                onClick={() => {
                  if (item.path) {
                    navigate(item.path);
                  }
                }}
                className={`sidebar-accordion-header ${isAccordionSelected ? 'is-selected' : ''
                  }`}
              >
                <span
                  className="sidebar-menu-icon"
                  style={{
                    WebkitMaskImage: `url(${item.icon})`,
                    maskImage: `url(${item.icon})`,
                  }}
                  aria-hidden="true"
                />
                <span className="sidebar-menu-label">{item.label}</span>

                {item.badge && (
                  <span className="badge bg-danger ms-auto">
                    {item.badge}
                  </span>
                )}
              </Accordion.Header>

              <Accordion.Body className="sidebar-submenu-wrap">
                <ul
                  className={`sidebar-submenu list-unstyled m-0 ${hasActiveSubItem ? 'has-active-subitem' : ''
                    }`}
                  style={
                    {
                      '--active-subitem-offset': `${activeSubItemIndex * 56}px`,
                    } as CSSProperties
                  }
                >
                  {hasActiveSubItem && (
                    <span
                      className="sidebar-submenu-indicator"
                      aria-hidden="true"
                    />
                  )}
                  {item.subItems.map((subItem) => {
                    const isSubItemActive = activeSubItemId === subItem.id;

                    return (
                      <li key={subItem.id}>
                        <NavLink
                          to={subItem.path}
                          className={`sidebar-submenu-link ${isSubItemActive ? 'is-active' : ''
                            }`}
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          ) : (
            <NavLink
              key={item.id}
              to={item.path || '#'}
              className={`sidebar-nav-link ${isDirectItemSelected ? 'is-active' : ''
                }`}
              onClick={() => setExpandedAccordionId(null)}
            >
              <span
                className="sidebar-menu-icon"
                style={{
                  WebkitMaskImage: `url(${item.icon})`,
                  maskImage: `url(${item.icon})`,
                }}
                aria-hidden="true"
              />
              <span className="sidebar-menu-label">{item.label}</span>

              {item.badge && (
                <span className="badge bg-danger ms-auto">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </Accordion>
    </aside>
  );
};

export default Sidebar;
