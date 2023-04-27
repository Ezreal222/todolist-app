import React from 'react';

const Layout = ({ children }) => {
  return (
    <div
      className="bg-success p-2 text-dark bg-opacity-10"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  );
};

export default Layout;
