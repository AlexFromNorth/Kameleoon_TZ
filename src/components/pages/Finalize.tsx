import React from "react";
import { useNavigate } from "react-router-dom";

import Back from "../../assets/Back.svg";

const Finalize = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h3>Finalize</h3>
      <h4>Spring promotion</h4>

      <div className="btn__back" onClick={() => navigate(-1)}>
        <img src={Back} alt="" />
        <button>
          Back
        </button>
      </div>

    </div>
  );
};

export default Finalize;
