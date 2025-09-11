import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '../Hooks/useSession.js';

function PrivateRoute({ children }) {
  const { user, isLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("PrivateRoute user:", user, "isLoading:", isLoading);
    if (!user && !isLoading) {
      navigate('/login', { state: { from: location } });
    }
  }, [user, navigate, location]);

  if (!user || isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}

export default PrivateRoute;
