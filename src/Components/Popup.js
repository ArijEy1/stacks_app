
import React from 'react';
import './Popup.css';
import { FaCloudsmith,FaDeploydog,FaDatabase ,FaCheckCircle,FaPencilAlt,FaExclamation,FaUserSecret,FaBox,FaFolderOpen} from "react-icons/fa";

import { Button } from '@mui/material';



const Popup = ({ stack, componentNames, onClose }) => {
  return (
    <div className="popup-container">
      {/* Display the component names with SVG icons */}
      <div className="popup-components">
        {componentNames.map((componentName) => (
          <div key={componentName}>
            {/* Use SVG icons inline */}
            {componentName === 'orchestrator' && <FaCloudsmith/>}
            {componentName === 'artifact_store' && <FaFolderOpen />}
            {componentName === 'alerter' && <FaExclamation />}
            {componentName === 'secrets_manager' && <FaUserSecret />}
            {componentName === 'container_registry' && <FaBox />}
            {componentName === 'model_deployer' && <FaDeploydog />}
            {componentName === 'data_validator' && <FaDatabase />}
            {componentName === 'experiment_tracker' && <FaCheckCircle />}
            <span>{componentName}</span>
          </div>
        ))}
      </div>

      {/* Add your icons or other content here */}
      <Button onClick={onClose} style={{color:'red'}}>Close</Button>
    </div>
  );
};

export default Popup;

