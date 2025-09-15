import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '../Hooks/useSession.js';

function PrivateRoute({ children }) {
  const { user, isLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login', { state: { from: location } });
    }
  }, [user, navigate, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}

export default PrivateRoute;
