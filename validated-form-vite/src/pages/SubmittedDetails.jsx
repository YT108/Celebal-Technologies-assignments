import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SubmittedDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No data submitted.</p>;

  return (
    <div>
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default SubmittedDetails;
