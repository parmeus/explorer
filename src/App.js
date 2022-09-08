import "./App.css";

import { useRoutes, HashRouter } from "react-router-dom";
import RouteConfig from "./routes";

const Root = () => {
    const element = useRoutes(RouteConfig);

    return element;
};

function App() {
    return (
        <HashRouter>
            <Root />
        </HashRouter>
    );
}

export default App;
