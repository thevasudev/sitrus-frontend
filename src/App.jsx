import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./Layouts/adminlayout";
import ContactsTable from "./pages/admin/ContactUs";
import Faq from "./pages/admin/Faq";
import PropertiesAdmin from "./pages/admin/Property";
import TeamManager from "./pages/admin/Team";
import Login from "./pages/Login";
import RequireAuth from "./routes/RequiredAuth";
import Index from "./pages/Index";
import PropertyDetails from "./components/PropertyDetails";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* <Route index element={<div>Enquiries</div>} /> */}
            <Route index element={<ContactsTable />} />
            <Route path="properties" element={<PropertiesAdmin />} />



            <Route path="faq" element={<Faq />} />
            <Route path="team" element={<TeamManager />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
