import Header from '../Components/Header.jsx';
import RecepieForm from '../Components/RecepieForm.jsx';
import {useState} from 'react'

const CreateRecepie = () => {
const [ingredientList, setIngredientList] = useState([])

    const createRecepie = async (inputs) => {
        try {
            const { title, imageURL, alt, portions, time, category, descriptionText, instructions } = inputs


            const recepie = {
                title,
                image: { imageURL, alt },
                description: { portions, time, category, descriptionText },
                ingredients: ingredientList,
                instructions
            }

            const res = await axios.post('http://localhost:5000/recepies/', recepie)
            if (res.data) {
                console.log(res.data)
            } else {
                console.log("Error creating recepie")
            }
        } catch (error) {
            console.log("Error creating recepie", error)
        }
    }
    return (
        <>
            <Header />
            <div>CreateRecepie</div>
            <RecepieForm createRecepie={createRecepie} setIngredientList={setIngredientList} ingredientList={ingredientList} />
            <div>
                <h3>Ingredients: </h3>
                { ingredientList>0 && ingredientList.map((ingredient, i) => {
                    return (
                        <div key={i}>
                            <p>{ingredient.amount} {ingredient.unit} {ingredient.ingredient}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CreateRecepie