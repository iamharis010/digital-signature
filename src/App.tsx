import { Suspense } from "react";
import "./App.css";
import AppRoutes from "@routes/AppRoutes";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_ID);
function App() {
    return (
        <Suspense>
            <AppRoutes />
        </Suspense>
    );
}

export default App;
