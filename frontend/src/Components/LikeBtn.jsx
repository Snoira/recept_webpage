import { useSession } from '../Context/SessionContext'
import { useNavigate, useLocation } from 'react-router-dom';
import { useLikes } from '../Hooks/useLikes.js'
import { useState } from 'react';
import style from '../Styles/RecipeCard.module.css'



const LikeBtn = ({ recipe }) => {
    console.log("LikeBtn recipe prop:", recipe);
    const { user } = useSession()
    const { likes, unlike, like } = useLikes(recipe?._id);
    const [isLiked, setIsLiked] = useState(likes?.includes(user?._id) || false);
    const isDisabled = recipe?.author._id === user?._id;


    const navigate = useNavigate()
    const location = useLocation();

    const handleClick = () => {
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }
        if (isLiked) {
            unlike.mutate();
            setIsLiked(false);
        } else {
            like.mutate();
            setIsLiked(true);
        }
    }

    return (
        <button onClick={handleClick} disabled={isDisabled}>
            <span className={style.likes}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={`${isLiked ? 'currentColor' : 'none'}`} viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                </svg>
                {likes?.length || 0}
            </span>
        </button>
    )
}
export default LikeBtn