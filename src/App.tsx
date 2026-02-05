import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DataManagement from './pages/DataManagement';
import MachineLearning from './pages/MachineLearning';
import Analysis from './pages/Analysis';
import UserManagement from './pages/UserManagement';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'data':
        return <DataManagement />;
      case 'ml':
        return <MachineLearning />;
      case 'analysis':
        return <Analysis />;
      case 'users':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
