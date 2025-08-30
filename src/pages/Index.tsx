import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';

type Page = 'landing' | 'dashboard';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigateToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'landing' ? (
        <Landing onNavigateToDashboard={handleNavigateToDashboard} />
      ) : (
        <Dashboard onNavigateToLanding={handleNavigateToLanding} />
      )}
    </div>
  );
};

export default Index;
