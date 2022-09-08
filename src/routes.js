import HomePage from "./views/home";
import SearchResult from "./views/searchResult";

const RouteConfig = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/home",
        element: <HomePage />,
    },
    {
        path: "/search",
        element: <SearchResult />,
    },
    { path: "*", element: <HomePage /> },
];

export default RouteConfig;
