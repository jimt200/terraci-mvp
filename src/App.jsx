import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";

// Pages existantes
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import ProjectDetail from "./pages/ProjectDetail";
import DashboardOperator from "./pages/DashboardOperator";
import DashboardBuyer from "./pages/DashboardBuyer";
import DashboardAdmin from "./pages/DashboardAdmin";
import CreateProject from "./pages/CreateProject";
import ManageLots from "./pages/ManageLots";
import AdvancedSearch from "./pages/AdvancedSearch";
import ProjectComparator from "./pages/ProjectComparator";
import MyPurchasesDetail from "./pages/MyPurchasesDetail";

// Nouvelles pages
import ValidationQueue from "./pages/ValidationQueue";
import DetailedExam from "./pages/DetailedExam";
import ManageOperators from "./pages/ManageOperators";
import DashboardMinistry from "./pages/DashboardMinistry";
import MinistryReporting from "./pages/MinistryReporting";
import OperatorProfile from "./pages/OperatorProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/comparator" element={<ProjectComparator />} />

        {/* Dashboards */}
        <Route path="/dashboard-operator" element={<DashboardOperator />} />
        <Route path="/dashboard-buyer" element={<DashboardBuyer />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-ministry" element={<DashboardMinistry />} />

        {/* Pages opérateur */}
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/manage-lots/:id" element={<ManageLots />} />
        <Route path="/operator/:id" element={<OperatorProfile />} />

        {/* Pages acheteur */}
        <Route path="/my-purchases/:id" element={<MyPurchasesDetail />} />

        {/* Pages admin */}
        <Route path="/validation-queue" element={<ValidationQueue />} />
        <Route path="/detailed-exam/:id" element={<DetailedExam />} />
        <Route path="/manage-operators" element={<ManageOperators />} />

        {/* Pages ministère */}
        <Route path="/ministry-reporting" element={<MinistryReporting />} />
      </Routes>

      {/* Navbar mobile fixe en bas — visible sur toutes les pages */}
      <BottomNav />
    </Router>
  );
}