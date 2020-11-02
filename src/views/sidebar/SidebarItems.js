import { urls } from "../../components/Router";

function SidebarItems() {
    return [
        {
            name: "Feature Toggles",
            route: urls.featureTogglesURL,
        },
        {
            name: "About",
            route: urls.aboutURL,
        }
    ];
}

export default SidebarItems;