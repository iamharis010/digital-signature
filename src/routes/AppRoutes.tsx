import Signature from "@components/Signature";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<Signature />} />
        </Routes>
    );
}
export default AppRoutes;