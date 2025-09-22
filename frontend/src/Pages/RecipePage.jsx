import { useParams } from 'react-router-dom'
import { useRecipeById } from '../Hooks/useRecipe'
import { useSession } from '../Hooks/useSession'
import FavoriteBtn from '../Components/FavoriteBtn';
import LikeBtn from '../Components/LikeBtn';
import CommentSection from '../Components/CommentSection';
import style from '../Styles/pages/RecipePage.module.css'

const RecipePage = () => {
    const { recipeId } = useParams()
    const { recipe, isLoading, error } = useRecipeById(recipeId);
    const { user } = useSession();

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading recipe</div>
    if (!recipe) return <div>Recipe not found</div>

    const isAuthor = user?._id === recipe.author._id;

    return (
        <div className={style.pageContainer}>
            <header className={style.recipeHeader}>
                <img
                    className={style.recipeImage}
                    src={recipe.image?.URL || "https://cdn.pixabay.com/photo/2021/07/11/03/48/shish-kebab-6402804_1280.png"}
                    alt={recipe.image?.alt || recipe.title} />


                <div className={style.recipeHeaderContent}>
                    <h4>
                        {recipe.author.fullName}
                        {/* TODO: gör class och style (you) med after istället */}
                        {isAuthor && <span> (You)</span>}
                        {/* lägg till rating */}
                    </h4>
                    <h1>{recipe.title}</h1>
                    {/* <h1>One morning, when Gregor Samsa woke from troubled dreams, he found himself</h1> */}
                    <p>{recipe.description}</p>
                    {/* <p>A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks.</p> */}
                    <div className={style.recipeStats}>
                        <div>
                            <h4>Cook time</h4>
                            <span> {recipe.time} min</span>
                        </div>
                        <div>
                            <h4>Serves</h4>
                            <span>{recipe.portions}</span>
                        </div>
                    </div>
                    <div className={style.recipeActions}>
                        {/* <FavoriteBtn recipeId={recipe._id} />
                        <LikeBtn recipe={recipe} /> */}
                    </div>
                </div>
            </header>
        
            <section className={style.recipeMain}>
                {/* ingredients */}
                <div className={style.ingredients}>
                    <h3>Ingredients:</h3>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div className={style.ingredientGroup} key={ingredient.title ?? index}>
                            {ingredient.title && <h5>{ingredient.title}</h5>}
                            <ul>
                                {ingredient.items.map((item, itemIndex) => (
                                    <li key={item.name}>
                                        <span>{item.amount} {item.unit} {item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* instructions */}
                <div className={style.instructions}>
                    <h3>Instructions:</h3>
                    <ol>
                        {recipe.instructions.map((step, index) => (
                            <li className={style.step} key={index}>
                                <span className={style.stepNumber}>{index + 1}.</span>{step}
                                {/* <span className={style.stepContent}>{step}</span> */}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
            <section className={style.commentSectionWrapper}>
                <h3>Comments</h3>
                <CommentSection recipeId={recipe._id} />
            </section>

        </div >
    )
}

export default RecipePage