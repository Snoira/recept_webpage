import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import api from '../api'

const RecepieForm = ({ createRecepie, addSubRecepie }) => {
    const [recepiesByUser, setRecepiesByUser] = useState([])

    const validationSchema = Yup.object(
        {
            title: Yup.string().required('Required'),
            imageURL: Yup.string().required('Required'),
            alt: Yup.string().required('Required'),
            portions: Yup.number().required('Required'),
            time: Yup.number().required('Required'),
            category: Yup.string().required('Required'),
            descriptionText: Yup.string().required('Required'),
            ingredients: Yup.string().required('Required'),
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
        ingredients: '',
        instructions: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            await createRecepie(values)
        }
    })

    useEffect(() => {
        const getRecepiesByUser = async () => {
            const response = await api.post('http://localhost:5000/recepies/user')
            if (response.status === 200) {
                setRecepiesByUser(response.data)
            } else {
                console.log('Error getting recepies by user')
            }
        }
    })

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
                        className={`form-control ${formik.touched.descriptionText ? formik.errors.descriptionText ? "is-invalid" : "is-valid" : ""}`}
                        {...formik.getFieldProps("descriptionText")} />
                </div>
                <div>
                    <label htmlFor="ingredients" >List of ingredients. Amount-unit-ingredient, separate the ingredients with enter. </label>
                    <textarea id='ingredients' name='ingredients' placeholder='Amount-unit-ingredient'
                        className={`form-control ${formik.touched.ingredients ? formik.errors.ingredients ? "is-invalid" : "is-valid" : ""}`}
                        {...formik.getFieldProps("ingredients")} />
                </div>
                {recepiesByUser > 0 ? <div>
                    <p>Would you like to incorporate one of your existing recepies into this one?</p>
                    <select name="subRecepies" id="subRecepies">
                        {recepiesByUser.map(recepie => {
                            return <option value={recepie._id}>{recepie.title}</option>
                        })}
                    </select>
                    <button onClick={() => { addSubRecepie(document.getElementById('subRecepies').value) }}>Add SubRecepie</button>
                </div> : null}
                <div>
                    {/* varje steg ska skiljas på med enter och/eller siffra så att meddelandet kan göras till en array i backend */}
                    <label htmlFor="instructions">Instructions, separate each step with enter. If you've added an existing recepie to this one, write "subrecepie" on the step you want the recepie to be prepared.</label>
                    <textarea id="instructions" name="instructions"
                        className={`form-control ${formik.touched.instructions ? formik.errors.instructions ? "is-invalid" : "is-valid" : ""}`}
                        {...formik.getFieldProps("instructions")}
                    />
                    {formik.errors.instructions && <div>{formik.errors.instructions}</div>}
                </div>
                <div>
                    <button type="submit" onClick={() => { formik.values }}>Create Recepie</button>
                </div>
            </form>
        </>
    )
}

export default RecepieForm