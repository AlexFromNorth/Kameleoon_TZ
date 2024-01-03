import React from 'react'
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate()

  return (
    <div className="container">
      <h3>Results</h3>
      <h4>Spring promotion</h4>
      <button className='btn__back' onClick={() => navigate(-1)}>Back</button>

    </div>
  );
}

export default Results