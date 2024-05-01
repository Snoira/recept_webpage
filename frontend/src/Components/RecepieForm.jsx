import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useState, useEffect } from 'react'

const RecepieForm = ({ createRecepie, setIngredientList, ingredientList }) => {
    const [units, setUnits] = useState('')
    const [ingredientsCount, setIngredientsCount] = useState(1);
    // const [ingredientList, setIngredientList] = useState([])

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
            // amount: Yup.number().required('Required'),
            // unit: Yup.string().required('Required'),
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



    const addIngredientField = () => {
        const ingredient = {
            amount: formik.values.amount,
            unit: formik.values.unit,
            ingredient: formik.values.ingredient
        }

        setIngredientList([...ingredientList, ingredient])
        console.log(ingredientList)

        formik.setFieldValue('amount', '');
        formik.setFieldValue('unit', '');
        formik.setFieldValue('ingredient', '');

        // setIngredientsCount(ingredientsCount + 1);
    };

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
                    <input type="text" id="title" name="title"
                        className={`form-control ${formik.touched.title ? formik.errors.title ? "is-invalid" : "is-valid" : ""}`}
                        {...formik.getFieldProps("title")} />
                </div>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="imageURL" >Image</label>
                        <input type="text" id="imageURL" name="imageURL"
                            className={`form-control ${formik.touched.imageURL ? formik.errors.imageURL ? "is-invalid" : "is-valid" : ""}`}
                            {...formik.getFieldProps("imageURL")} />
                    </div>
                    <div className='col'>
                        <label htmlFor="alt" >Alt</label>
                        <input type="text" id="alt" name="alt"
                            className={`form-control ${formik.touched.alt ? formik.errors.alt ? "is-invalid" : "is-valid" : ""}`}
                            {...formik.getFieldProps("alt")} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="portions" >Portions</label>
                        <input type="number" id="portions" name="portions"
                            className={`form-control ${formik.touched.portions ? formik.errors.portions ? "is-invalid" : "is-valid" : ""}`}
                            {...formik.getFieldProps("portions")} />
                    </div>
                    <div className='col' >
                        <label htmlFor="time" >Time</label>
                        <input type="number" id="time" name="time"
                            className={`form-control ${formik.touched.time ? formik.errors.time ? "is-invalid" : "is-valid" : ""}`}
                            {...formik.getFieldProps("time")} />
                    </div>
                    <div className='col' >
                        <label htmlFor="category" >Category</label>
                        <input type="text" id="category" name="category"
                            className={`form-control ${formik.touched.category ? formik.errors.category ? "is-invalid" : "is-valid" : ""}`}
                            {...formik.getFieldProps("category")} />
                    </div>
                </div>
                <div className='col'>
                    <label htmlFor="descriptionText">Description</label>
                    <textarea id="descriptionText" name="descriptionText"
                        className={`form-control ${formik.touched.category ? formik.errors.category ? "is-invalid" : "is-valid" : ""}`}
                        {...formik.getFieldProps("descriptionText")} />
                </div>

                {Array.from({ length: ingredientsCount }, (_, i) => (

                    <div key={i} className='row' >
                        <div className="input-group col mb-3">
                            <input type="number" id="amount" name="amount"
                                className={`form-control ${formik.touched.category ? formik.errors.category ? "is-invalid" : "is-valid" : ""}`}
                                aria-label="number input for amount and a drop down menue for unit"
                                {...formik.getFieldProps("amount")} />
                            {units.length > 0 && <>
                                <select name="unit" id="unit"
                                    className={`btn btn-outline-secondary ${formik.touched.category ? formik.errors.category ? "is-invalid" : "is-valid" : ""}`}
                                    {...formik.getFieldProps("unit")}>
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
                            <input type="text" id="ingredient" name="ingredient" placeholder='Ingredient'
                                className={`form-control ${formik.touched.ingredient ? formik.errors.ingredient ? "is-invalid" : "is-valid" : ""}`}
                                {...formik.getFieldProps("ingredient")} />
                        </div>
                    </div>

                ))}
                <button type="button" onClick={addIngredientField}>Add Ingredient</button>

                <div>
                    {/* varje steg ska skiljas på med enter och/eller siffra så att meddelandet kan göras till en array i backend */}
                    <label htmlFor="instructions">Instructions</label>
                    <textarea id="instructions" name="instructions"
                        className={`form-control ${formik.touched.instructions ? formik.errors.instructions ? "is-invalid" : "is-valid" : ""}`}
                        {...formik.getFieldProps("instructions")}
                    />
                    {formik.errors.instructions && <div>{formik.errors.instructions}</div>}
                </div>
                <div>
                    <button type="submit" onClick={()=>{formik.values}}>Create Recepie</button>
                </div>
            </form>
        </>
    )
}

export default RecepieForm