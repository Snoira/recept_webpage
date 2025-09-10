import { useFavorites } from '../Hooks/useFavorites.js';
import { useSession } from '../Context/SessionContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FavoriteBtn = ({ recipeId }) => {
    const { user } = useSession();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div>
                <button onClick={() => navigate('/login')} className="btn btn-primary">
                    Save as favorite
                </button>
            </div>
        );
    }
    const { favorites, addFavorite, removeFavorite } = useFavorites(recipeId);
    const [isFavorite, setIsFavorite] = useState(favorites?.some(id => id.toString() === recipeId) || false);

    const handleFavorite = () => {
        if (isFavorite) {
            removeFavorite();
            setIsFavorite(false);
        } else {
            addFavorite();
            setIsFavorite(true);
        }
    };

    return (
        <div>
            <button onClick={handleFavorite}
                className={`btn ${isFavorite ? 'btn-secondary' : 'btn-primary'}`}
            >
                {isFavorite ? "Remove from favorites" : "Save as favorite"}
            </button>
        </div>
    )
}

export default FavoriteBtn;