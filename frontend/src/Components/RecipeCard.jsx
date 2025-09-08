import style from '../Styles/RecipeCard.module.css'
import { Link } from 'react-router-dom'

export const PlaceHolderCard = () => {
  return (
    <div className={style.card}>
      <img className={style.cardImage}
        src="https://cdn.pixabay.com/photo/2021/07/11/03/48/shish-kebab-6402804_1280.png"
        alt="stock image of three skewers" />
      <div className={style.categories}>
        <ul>
          <li>Lunch</li>
          <li>Vegetariskt</li>
        </ul>
      </div>
      <div className={style.cardContent}>
        <h2 className={style.title}>En ganska lång titel</h2>
        <p>Bengan Bakar</p>
        <span className={style.likes}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
          </svg>
          42
        </span>
      </div>
    </div>
  )
}

const RecipeCard = ({ recipe }) => {

  return (
    <Link to={`/recipe/${recipe._id}`}>
      <div className={style.card}>
        { recipe.image ?
            <img className={style.cardImage} src={recipe.image.URL} alt={recipe.image.alt} />
            : <img className={style.cardImage}
              src="https://cdn.pixabay.com/photo/2021/07/11/03/48/shish-kebab-6402804_1280.png"
              alt="stock image of three skewers" />
        }
        <div className={style.categories}>
          <ul>
            {recipe.categories && recipe.categories.map((cat, index) => (
              <li key={index} >{cat}</li>
            ))}
          </ul>
        </div>
        <div className={style.cardContent}>
          <h2 className={style.title}>{recipe.title}</h2>
          <p>{recipe.author.username}</p>
          <span className={style.likes}>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
            {recipe.likes?.length}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard