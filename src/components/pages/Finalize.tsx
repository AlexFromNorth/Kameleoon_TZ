import React from 'react'
import { useNavigate } from 'react-router-dom';


const Finalize = () => {
  const navigate = useNavigate()


  return (
    <div className="container">
      <h3>Finalize</h3>
      <h4>Spring promotion</h4>
      <button className='btn__back' onClick={() => navigate(-1)}>Back</button>

    </div>
  );
};


export default Finalize