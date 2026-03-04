import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Search from './pages/Search';
import ProjectDetail from './pages/ProjectDetail';
import DashboardOperator from './pages/DashboardOperator';
import DashboardBuyer from './pages/DashboardBuyer';
import DashboardAdmin from './pages/DashboardAdmin';
import CreateProject from './pages/CreateProject';
import ManageLots from './pages/ManageLots';
import AdvancedSearch from './pages/AdvancedSearch';
import ProjectComparator from './pages/ProjectComparator';
import MyPurchasesDetail from './pages/MyPurchasesDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages Publiques */}
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        
        {/* Portail Opérateur */}
        <Route path="/dashboard-operator" element={<DashboardOperator />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/manage-lots/:id?" element={<ManageLots />} />
        
        {/* Portail Acheteur */}
        <Route path="/dashboard-buyer" element={<DashboardBuyer />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/compare" element={<ProjectComparator />} />
        <Route path="/my-purchase/:id?" element={<MyPurchasesDetail />} />
        
        {/* Portail Admin */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        
        {/* TODO: 5 pages restantes à ajouter dans la prochaine session */}
        {/* - ValidationQueue */}
        {/* - DetailedExam */}
        {/* - ManageOperators */}
        {/* - DashboardMinistry */}
        {/* - MinistryReporting */}
      </Routes>
    </Router>
  );
}

export default App;