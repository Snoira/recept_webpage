import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import ConfirmDeleteModal from './ConfirmDeleteModal';
import * as Yup from "yup";

const RecepieForm = ({ recepie, submitFunction, deleteFunction, handleEditMode, setShowCreateRecepie }) => {
    const [questionDelete, setQuestionDelete] = useState(false);

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

    const initialValuesCreateRec = {
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

    const initialValuesEditRec = recepie ? {
        title: recepie.title,
        imageURL: recepie.image.imageURL,
        alt: recepie.image.alt,
        portions: recepie.description.portions,
        time: recepie.description.time,
        category: recepie.description.category,
        descriptionText: recepie.description.descriptionText,
        ingredients: recepie.ingredientList.map((item) => {
            if (!item) return '';
            else if (!item.amount && !item.unit) return item.ingredient;
            else return `${item.amount}-${item.unit}-${item.ingredient}`;
        }).join('\n'),
        instructions: recepie.instructionList.join('\n')
    } : null

    const initialValues = recepie ? initialValuesEditRec : initialValuesCreateRec

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            await submitFunction(values)
        }
    })

    const showModal = () => {
        setQuestionDelete(true)
    }

    const closeModal = () => {
        setQuestionDelete(false)
    }

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
                    <button type="submit" onClick={() => { formik.values }}>{recepie ? "Update Recepie" : "Create Recepie"}</button>
                </div>
            </form>
            {recepie &&
                <>
                    <button onClick={showModal}>Delete Recepie</button>
                    <button onClick={handleEditMode}>Cancel</button>
                </>
            }
            <ConfirmDeleteModal closeModal={closeModal} deleteFunction={deleteFunction} recepie={recepie} questionDelete={questionDelete} />
        </>
    )
}

export default RecepieForm