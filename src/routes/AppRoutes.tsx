import Signature from "@components/Signature";
import { Routes, Route } from "react-router-dom";
import GuestLayout from "../layout/GuestLayout";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<GuestLayout/>}>
                <Route index element={<Signature />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;