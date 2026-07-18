import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sidebarMenuOptions } from "../data/sidebarOptions";

const findTitle = (pathname: string): string => {
    let matchedTitle = "HMS";
    let longestMatch = 0;

    for (const item of sidebarMenuOptions.menuItems) {
        // Check main menu item
        if (item.path && pathname.startsWith(item.path)) {
            if (item.path.length > longestMatch) {
                matchedTitle = item.label;
                longestMatch = item.path.length;
            }
        }

        // Check submenu items
        if (item.subItems) {
            for (const subItem of item.subItems) {
                if (
                    subItem.path &&
                    pathname.startsWith(subItem.path) &&
                    subItem.path.length > longestMatch
                ) {
                    matchedTitle = subItem.label;
                    longestMatch = subItem.path.length;
                }
            }
        }
    }

    return matchedTitle;
};

const TitleManager = () => {
    const location = useLocation();

    useEffect(() => {
        const title = findTitle(location.pathname);
        document.title = title === "HMS" ? "HMS" : `${title}`;
    }, [location.pathname]);

    return null;
};

export default TitleManager;