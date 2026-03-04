import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Search from './pages/Search';
import ProjectDetail from './pages/ProjectDetail';
import DashboardOperator from './pages/DashboardOperator';
import DashboardBuyer from './pages/DashboardBuyer';
import DashboardAdmin from './pages/DashboardAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/dashboard-operator" element={<DashboardOperator />} />
        <Route path="/dashboard-buyer" element={<DashboardBuyer />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;