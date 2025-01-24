import React from 'react';
import UploadBook from './components/UploadBook';
import Library from './components/Library';

const App: React.FC = () => {
  return (
    <div>
      <UploadBook />
      <Library />
    </div>
  );
};

export default App;
