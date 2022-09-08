import "./App.css";

import { BrowserRouter, useRoutes } from "react-router-dom";
import RouteConfig from "./routes";

const Root = () => {
    const element = useRoutes(RouteConfig);

    return element;
};

function App() {
    return (
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    );
}

export default App;
