import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarMenuOptions } from "../data/sidebarOptions";
import "../styles/Breadcrumb.css";

interface BreadcrumbItem {
    label: string;
    path: string;
    isCurrent: boolean;
}

const Breadcrumb: React.FC = () => {
    const { pathname } = useLocation();

    const breadcrumbs = useMemo(() => {
        const items: BreadcrumbItem[] = [];

        // Dashboard
        if (pathname === "/dashboard") {
            items.push({
                label: "Home",
                path: "/dashboard",
                isCurrent: true,
            });

            return items;
        }

        // Home
        items.push({
            label: "Home",
            path: "/dashboard",
            isCurrent: false,
        });

        for (const menu of sidebarMenuOptions.menuItems) {
            // -------------------------
            // Menu without submenus
            // -------------------------
            if (!menu.subItems && menu.path) {
                if (pathname.startsWith(menu.path)) {
                    items.push({
                        label: menu.label,
                        path: menu.path,
                        isCurrent: true,
                    });

                    return items;
                }
            }

            // -------------------------
            // Menu with submenus
            // -------------------------
            if (menu.subItems) {
                const matchedSubmenu = [...menu.subItems]
                    .filter((sub) => pathname.startsWith(sub.path))
                    .sort((a, b) => b.path.length - a.path.length)[0];

                const isMenuRootPath = !!menu.path && pathname === menu.path;

                if (!matchedSubmenu && !isMenuRootPath) continue;

                let parentRoute = menu.path || "";

                const dashboardRoute = menu.subItems.find(
                    (sub) =>
                        sub.path.toLowerCase().endsWith("/dashboard") ||
                        sub.label.toLowerCase() === "dashboard"
                );

                if (dashboardRoute) {
                    parentRoute = dashboardRoute.path;
                } else if (menu.subItems.length > 0) {
                    parentRoute = menu.subItems[0].path;
                }

                items.push({
                    label: menu.label,
                    path: parentRoute,
                    isCurrent: isMenuRootPath,
                });

                if (matchedSubmenu && matchedSubmenu.label.toLowerCase() !== menu.label.toLowerCase()) {
                    items.push({
                        label: matchedSubmenu.label,
                        path: matchedSubmenu.path,
                        isCurrent: true,
                    });
                } else if (isMenuRootPath) {
                    items[items.length - 1].isCurrent = true;
                }

                return items;
            }
        }

        return items;
    }, [pathname]);

    return (
        <div className="breadcrumb-wrapper">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb custom-breadcrumb mb-0">
                    {breadcrumbs.map((crumb, index) => {
                        if (crumb.isCurrent) {
                            return (
                                <li key={index} className="breadcrumb-item active current-page">
                                    {crumb.label}
                                </li>
                            );
                        }

                        return (
                            <li key={index} className="breadcrumb-item">
                                <Link to={crumb.path}>{crumb.label}</Link>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
