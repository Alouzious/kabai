import { Outlet } from "react-router-dom";
import IndabaXNavbar from "../components/indabax/IndabaXNavbar";
import IndabaXFooter from "../components/indabax/IndabaXFooter";

export default function IndabaXLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <IndabaXNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <IndabaXFooter />
    </div>
  );
}
