import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Logo.css';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="logo" onClick={()=>navigate('/')} style={{cursor:"pointer"}}>
      Course<span>Hub</span>
    </div>
  );
};

export default Logo;
