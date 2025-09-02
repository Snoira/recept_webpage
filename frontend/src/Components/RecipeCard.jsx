import style from '../Styles/RecipeCard.module.css'

const RecipeCard = ({recipe}) => {

  return (
    <div className={style.card}>
      <img src={recipe.image.URL} alt={recipe.image.alt} />
      <h2>{recipe.title}</h2>
    </div>
  )
}

export default RecipeCard