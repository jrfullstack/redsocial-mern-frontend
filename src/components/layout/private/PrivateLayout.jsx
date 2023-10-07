import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const PrivateLayout = () => {
    return (
        <>
            {/* Cabezera */}
            <Header />

            {/* Contenido principal */}
            <section className="layout__content">
                <Outlet />
            </section>

            {/* Barra Lateral */}
            <Sidebar/>
        </>
    );
};
