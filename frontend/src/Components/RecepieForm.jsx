import { useState, useEffect } from 'react'
import { Formik, Form, useField, Field, FieldArray } from 'formik'
import ConfirmDeleteModal from './ConfirmDeleteModal';
import * as Yup from "yup";
import style from '../Styles/RecipeForm.module.css'

const ENUM_UNIT = ['l', 'dl', 'cl', 'ml', 'msk', 'tsk', 'krm', 'g', 'hg', 'kg'];
const ENUM_CATEGORY = ['Bakverk', 'Frukost', 'Lunch', 'Middag', 'Efterrätt', 'Dryck', 'Snacks', 'Sallad', 'Sås', 'Vegetariskt', 'Veganskt'];


const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { className, ...rest } = props;


    return (
        <div className={(meta.touched && meta.error) ? `${className} ${style.error}` : className}>
            <label htmlFor={props.id || props.name} className={style.inputLabel}>{label}</label>
            <input className={style.inputField} {...field} {...rest} />
            <div className={style.errorContainer}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className={style.errorText}>{meta.error}</span>
            </div>

        </div>
    );
};

const TextAreaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { className, ...rest } = props;
    return (
        <div className={(meta.touched && meta.error) ? `${className} ${style.error}` : className}>
            <label htmlFor={props.id || props.name} className={style.inputLabel}>{label}</label>
            <textarea className={style.textAreaField} {...field} {...rest} />
            <div className={style.errorContainer}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span className={style.errorText}>{meta.error}</span>
            </div>
        </div>
    );
};

const SelectInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { className, ...rest } = props;
    return (
        <div className={className}>
            <label htmlFor={props.id || props.name} className={style.inputLabel}>{label}</label>
            <select className={style.inputField} {...field} {...rest} />
        </div>
    );
};


const CheckboxGroup = ({ label, options, ...props }) => {
    const { className, ...rest } = props;
    const [field, meta] = useField(rest);
    return (
        <div className={className}>

            <label htmlFor={props.id || props.name} className={style.inputLabel}>{label}
                {/* <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="green" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg> */}
            </label>
            <ul role="group" aria-labelledby={props.id || props.name} className={style.checkboxGroup}>
                {options.map(option => (
                    <li key={option}>
                        <input type="checkbox" {...field} value={option} id={option} checked={field.value.includes(option)} onClick={() => {
                            console.log("click", option);
                        }} />
                        <label htmlFor={option} keyboardfocus={true}>
                            {/* <Field type="checkbox" name={field.name} value={option} id={option} /> */}
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const AddButton = ({onClick, description}) => {
    return (
        <button type="button" className={style.addButton} onClick={onClick}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
            </svg>
            {description}
        </button>
    )
}





const RecepieForm = () => {
    const initialValues = {
        title: "",
        portions: 4,
        description: "",
        time: "",
        categories: [],
        ingredientList: [{
            title: "",
            items: [{ amount: "", unit: "", name: "", note: "" }]
        }],
        instructions: [""],
        image: { URL: "", alt: "" }
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Required").min(2, "Must be at least 2 characters").max(100, "Must be 100 characters or less"),
        time: Yup.number().min(5, "Must be at least 5 minutes").nullable(),
        portions: Yup.number().min(1, "Must be at least 1").required("Required"),
        categories: Yup.array().of(Yup.string().oneOf(ENUM_CATEGORY)),
        ingredientList: Yup.array().of(
            Yup.object({
                title: Yup.string(),
                items: Yup.array().of(Yup.object(
                    {
                        amount: Yup.number().min(0, "Must be positive if used").nullable(),
                        unit: Yup.string().oneOf(ENUM_UNIT),
                        name: Yup.string().required("Required").max(100, "Must be 100 characters or less"),
                        note: Yup.string()
                    }
                ).required("Must have ingredients")
                )
            })
        ),
        instructions: Yup.array().of(Yup.string().required("Required")).min(1, "At least one step is required"),
        image: Yup.object({
            URL: Yup.string().url("Invalid URL"),
            alt: Yup.string()
        })
    })

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={console.log}>
            {({ values }) => (
                <Form className={style.formContainer}>
                    <div className={`${style.section} ${style.description}`}>
                        <TextInput name="title" id="title" label="Title" required={true} className={`${style.input} ${style.long}`} />
                        <TextInput name="time" id="time" label="Time (min)" type="number" min="5" step="5" placeholder="30" className={style.input} />
                        <TextInput name="portions" id="portions" label="Portions" type="number" min="1" className={style.input} />
                        <TextAreaInput name="description" id="description" label="Description" className={`${style.input} ${style.long}`} />

                    </div>

                    <div className={style.placeholderImage}>
                        <TextInput name="image.URL" id="image.URL" label="Image URL" className={style.input} />
                        <TextInput name="image.alt" id="image.alt" label="Image Alt" className={style.input} />
                    </div>

                    <CheckboxGroup name="categories" id="categories" label="Categories" options={ENUM_CATEGORY} className={`${style.section} ${style.categories}`} />

                    {/* Ingredients */}
                    <div className={`${style.section} ${style.ingredients}`}>
                        <div className={style.sectionTitle}>Ingredients</div>
                        <FieldArray name="ingredientList">
                            {arrayHelpers => (
                                <>
                                    {values.ingredientList.map((section, i) => (
                                        <div key={i} className={style.ingredientList}>
                                            <button type="button" className={style.topRemoveButton} onClick={() => arrayHelpers.remove(i)}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                            <TextInput name={`ingredientList.${i}.title`} id={`il.${i}.t`} label="Section Title" className={style.input} />

                                            <FieldArray name={`ingredientList.${i}.items`}>
                                                {itemHelpers => (
                                                    <>
                                                        {section.items.map((_, j) => (
                                                            <div key={j} className={style.formRow}>
                                                                <button type="button" className={style.removeButton} onClick={() => itemHelpers.remove(j)}>
                                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                        <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                                    </svg>
                                                                </button>
                                                                <div className={style.inputRow}>
                                                                    <span>
                                                                        <TextInput name={`ingredientList.${i}.items.${j}.amount`} id={`il.${i}.i.${j}.a`} label="Amount" type="number" min="0" className={style.inputSmall} />

                                                                        <SelectInput name={`ingredientList.${i}.items.${j}.unit`} id={`il.${i}.i.${j}.u`} label="unit" className={style.inputSmall}>
                                                                            <option value="" default disabled select>unit</option>
                                                                            {ENUM_UNIT.map(unit => (
                                                                                <option key={unit} value={unit}>{unit}</option>
                                                                            ))}
                                                                            <option value="">None</option>
                                                                        </SelectInput>
                                                                    </span>


                                                                    <TextInput name={`ingredientList.${i}.items.${j}.name`} id={`il.${i}.i.${j}.n`} label="Ingredient" className={style.input} />
                                                                    {/* <TextInput name={`ingredientList.${i}.items.${j}.note`} label="Note" className={style.input} /> */}
                                                                </div>

                                                            </div>
                                                        ))}
                                                        <AddButton type="button" className={style.addButton} onClick={() => itemHelpers.push({ amount: "", unit: "", name: "", note: "" })} description={"Add Ingredient"}/>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </div>
                                    ))}
                                    <AddButton type="button" className={style.addButton} onClick={() => arrayHelpers.push({ title: "", items: [{ amount: "", unit: "", name: "", note: "" }] })} description={"Add Section"}/>
                                </>
                            )}
                        </FieldArray>
                    </div>

                    {/* Instructions */}
                    <div className={`${style.section} ${style.instructions}`}>
                        <div className={style.sectionTitle}>Instructions</div>
                        <FieldArray name="instructions">
                            {arrayHelpers => (
                                < >
                                    {values.instructions.map((_, i) => (
                                        <div key={i} className={style.formRow}>
                                            <button type="button" className={style.removeButton} onClick={() => arrayHelpers.remove(i)}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                            <TextAreaInput name={`instructions.${i}`} id={`instructions.${i}`} label={`Step ${i + 1}`} className={style.inputLine} />
                                        </div>
                                    ))}
                                    <AddButton type="button" className={style.addButton} onClick={() => arrayHelpers.push("")} description={"Add Step"}/>
                                </>
                            )}
                        </FieldArray>

                    </div>

                    <button type="submit" className={style.submitButton}>Submit</button>
                </Form>
            )}
        </Formik>
    )
}

export default RecepieForm;


