import { useEffect } from 'react';
import { getTokenFromLocalStorage } from './common';
import { useNavigate } from 'react-router-dom';

// Vérifie si on est déjà authentifier
function RequireAuth() {
  const navigate = useNavigate();
  const token = getTokenFromLocalStorage()

  const redirect = () => {
      if(token == null) {
          navigate('/');
      }
  }
  useEffect(() => {
    redirect()
  }, []);
}
export default RequireAuth;