import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />

        <main className="flex-grow-1">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
