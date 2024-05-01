import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useState, useEffect } from 'react'

const RecepieForm = () => {
    const [units, setUnits] = useState('')
    const [ingredientList, setIngredientList] = useState([])

    const createRecepie = async (inputs) => {

        try {
            const { title, imageURL, alt, portions, time, category, descriptionText, instructions } = inputs

            const recepie = {
                title,
                image: {
                    imageURL,
                    alt
                },
                description: {
                    portions,
                    time,
                    category,
                    descriptionText
                },
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

    const validationSchema = Yup.object(
        {
            title: Yup.string().required('Required'),
            imageURL: Yup.string().required('Required'),
            alt: Yup.string().required('Required'),
            portions: Yup.number().required('Required'),
            time: Yup.number().required('Required'),
            category: Yup.string().required('Required'),
            descriptionText: Yup.string().required('Required'),
            ingredient: Yup.string().required('Required'),
            amount: Yup.number().required('Required'),
            unit: Yup.string().required('Required'),
            instructions: Yup.string().required('Required')
        }
    )

    const initialValues = {
        title: '',
        imageURL: '',
        alt: '',
        portions: '',
        time: '',
        category: '',
        descriptionText: '',
        ingredient: '',
        amount: '',
        unit: '',
        instructions: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { createRecepie }) => {
            console.log(values)
            // createRecepie(values)
        }
    })

    const addIngredient = (ingredient) => {
        setIngredientList([...ingredientList, ingredient])
    }

    const AddIngredientField = () => {
        const ingredient = {
            amount: formik.values.amount,
            unit: formik.values.unit,
            ingredient: formik.values.ingredient
        }



        return (
            <div className='row' >
                <div className="input-group col mb-3">
                    <input type="number" className='form-control' id="amount" name="amount" aria-label="number input for amount and a drop down menue for unit"
                    {...formik.getFieldProps("amount")} />
                    {units.length > 0 && <>
                        <select name="unit" id="unit" className='btn btn-outline-secondary' {...formik.getFieldProps("unit")}>
                            <option value=" ">Unit</option>
                            {units.length > 0 && units.map((unit, i) => {
                                return (
                                    <option key={i} value={unit}>{unit}</option>
                                )
                            })}
                        </select>
                    </>}
                </div>
                <div className='col mb-3' >
                    {/* <label htmlFor="ingredient" className='visually-hidden' >ingredient</label> */}
                    <input type="text" id="ingredient" name="ingredient" className='form-control' placeholder='Ingredient'
                    {...formik.getFieldProps("ingredient")}/>
                </div>
                <button onClick={() => {
                       const ingredient = {
                        amount: formik.values.amount,
                        unit: formik.values.unit,
                        ingredient: formik.values.ingredient
                    }
                    addIngredient(ingredient)
                    
                }}></button>
            </div>
        )
    }

    useEffect(() => {
        const fetchUnits = async () => {
            const res = await axios.get('http://localhost:5000/recepieUnits/')
            if (res.data) {
                setUnits(res.data)
            } else {
                console.log("Error fetching units")
            }
        }
        fetchUnits()
    }, [])

    return (
        <>
            <form onSubmit={formik.handleSubmit} className='form-floating'>
                <div className='col-auto'>
                    <label htmlFor="title" >Recepie Title</label>
                    <input type="text" id="title" name="title" className='form-control' />
                </div>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="imageURL" >Image</label>
                        <input type="file" id="imageURL" name="imageURL" className='form-control' />
                    </div>
                    <div className='col'>
                        <label htmlFor="alt" >Alt</label>
                        <input type="text" id="alt" name="alt" className='form-control' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="portions" >Portions</label>
                        <input type="number" id="portions" name="portions" className='form-control' />
                    </div>
                    <div className='col' >
                        <label htmlFor="time" >Time</label>
                        <input type="number" id="time" name="time" className='form-control' />
                    </div>
                    <div className='col' >
                        <label htmlFor="category" >Category</label>
                        <input type="text" id="category" name="category" className='form-control' />
                    </div>
                </div>
                <div className='col'>
                    <label htmlFor="descriptionText">Description</label>
                    <textarea id="descriptionText" name="descriptionText" className='form-control' />
                </div>

                <AddIngredientField />

                {/* <div className='row' >

                    <div className="input-group col mb-3">
                        
                        <input type="number" className='form-control' id="amount" name="amount" aria-label="number input for amount and a drop down menue for unit" />
                        {units.length > 0 && <>
                            <select name="unit" id="unit" className='btn btn-outline-secondary' >
                                <option value=" ">Unit</option>
                                {units.length > 0 && units.map((unit, i) => {
                                    return (
                                        <option key={i} value={unit}>{unit}</option>
                                    )
                                })}
                            </select>
                        </>}
                    </div>
                    <div className='col mb-3' >
                        <label htmlFor="ingredient" >ingredient</label>
                        <input type="text" id="ingredient" name="ingredient" className='form-control' placeholder='Ingredient' />
                    </div>
                    <div>
                        <button type="button" onClick={addIngredient}>Add Ingredient</button>
                    </div>
                </div> */}
                <div>
                    {/* varje steg ska skiljas på med enter och/eller siffra så att meddelandet kan göras till en array i backend */}
                    <label htmlFor="instructions">Instructions</label>
                    <textarea id="instructions" name="instructions" className='form-control' />
                </div>
                <div>
                    <button type="submit">Create Recepie</button>
                </div>
            </form>
        </>
    )
}

export default RecepieForm