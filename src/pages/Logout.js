import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';
import { toast } from 'react-hot-toast';

const Logout = () => {
  const { unsetUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    unsetUser();
    navigate('/');
    toast.success('Logout successful');
  }, [unsetUser, navigate]);

  return null;
};

export default Logout;

