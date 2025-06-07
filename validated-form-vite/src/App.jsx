import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import SubmittedDetails from './pages/SubmittedDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/submitted" element={<SubmittedDetails />} />
    </Routes>
  );
};

export default App;
