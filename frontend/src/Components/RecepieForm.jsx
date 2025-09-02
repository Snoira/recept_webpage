import { useNavigate } from 'react-router-dom'
import { Formik, Form, useField, FieldArray } from 'formik'
import * as Yup from "yup";
import style from '../Styles/RecipeForm.module.css'
import apiClient from '../api.jsx';
import { AxiosError } from 'axios';
import { useSession } from '../Context/SessionContext.jsx';

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
            </label>
            <ul role="group" aria-labelledby={props.id || props.name} className={style.checkboxGroup}>
                {options.map(option => (
                    <li key={option}>
                        <input type="checkbox" {...field} value={option} id={option} checked={field.value.includes(option)} />
                        <label htmlFor={option} keyboardfocus={true}>
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const AddButton = ({ onClick, description }) => {
    return (
        <button type="button" className={style.addButton} onClick={onClick}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
            </svg>
            {description}
        </button>
    )
}

const ErrorMessage = ({ message }) => {
    return (
        <div className={style.arrayError}>
            <svg className="w-4 h-4 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {message}
        </div>
    );
};

const RecepieForm = () => {
    const { refreshToken } = useSession()
    const navigate = useNavigate();

    const initialValues = {
        title: "",
        portions: 4,
        description: "",
        time: "",
        categories: [],
        ingredients: [{
            title: "",
            items: [{ amount: "", unit: "", name: "", note: "" }]
        }],
        instructions: [""],
        image: { URL: "", alt: "" }
    }

    const cleanUpValues = (values) => {

        const steps = values.instructions
            .map(step => step.trim())
            .filter(step => step !== "")

        return {
            ...values,
            title: values.title.trim(),
            description: values.description.trim(),
            time: values.time === "" ? null : values.time,
            ingredients: values.ingredients.map(section => ({
                ...section,
                title: section.title === "" ? null : section.title.trim(),
                items: section.items.map(item => ({
                    ...item,
                    amount: (item.amount === "" || item.amount <= 0) ? null : item.amount,
                    unit: item.unit === "" ? null : item.unit,
                    name: item.name.trim(),
                    note: item.note === "" ? null : item.note,
                }))
            })),
            instructions: [{
                title: null,
                steps
            }],
            image: {
                URL: values.image.URL.trim() === "" ? null : values.image.URL,
                alt: values.image.alt.trim() === "" ? null : values.image.alt,
            }
        }
    }

    const validationSchema = Yup.object({
        title: Yup.string().trim().required("Required").min(2, "Must be at least 2 characters").max(100, "Must be 100 characters or less"),
        time: Yup.number().min(5, "Must be at least 5 minutes").max(1440, "Must be 1440 minutes (24 hours) or less"),
        portions: Yup.number().min(1, "Must be at least 1").max(100, "Must be 100 or less").required("Required"),
        description: Yup.string().trim().max(1000, "Must be 1000 characters or less").required("Required"),
        categories: Yup.array().of(Yup.string().oneOf(ENUM_CATEGORY)).max(5, "Max 5 categories"),
        ingredients: Yup.array().of(
            Yup.object({
                title: Yup.string().trim().max(100, "Must be 100 characters or less"),
                items: Yup.array().of(Yup.object(
                    {
                        amount: Yup.number().min(0.5, "Must be at least 0.5").max(1000, "Must be 1000 or less").test(
                            "amount-required-if-unit",
                            "Amount must be used if unit is specified",
                            function (value) {
                                const { unit } = this.parent;
                                if (unit && unit !== "") {
                                    return value !== null && value > 0;
                                }
                                return true;
                            }
                        ),
                        unit: Yup.string().oneOf(ENUM_UNIT),
                        name: Yup.string().trim().required("Required").min(2, "Must be at least 2 characters").max(100, "Must be 100 characters or less"),
                        note: Yup.string().trim().max(100, "Must be 100 characters or less")
                    }
                ).required("Must have ingredients")
                ).min(1, "At least one ingredient is required").max(100, "Max 100 ingredients"),
            })
        ).min(1, "At least one ingredient section is required"),
        instructions: Yup.array().of(Yup.string().trim().required("Required").min(5, "Must be at least 5 characters").max(500, "Must be 500 characters or less")).min(1, "At least one step is required").max(50, "Max 50 steps"),
        image: Yup.object({
            URL: Yup.string().trim().url("Invalid URL"), //säkerhetstänk här?? samma med framtida ändring till filuppladdning. 
            alt: Yup.string().trim().min(2, "Must be at least 2 characters").max(500, "Must be 500 characters or less")
        })
    })

    const createRecipe = async (values) => {
        try {
            console.log("Creating recipe with values:", values)
            const cleanValues = cleanUpValues(values)
            console.log("Cleaned values:", cleanValues)

            const res = await apiClient.post(`/recepies/create`, cleanValues)
            console.log("Recipe created:", res.data)
            navigate(`/recepie/${res.data._id}`)

        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    console.log("401 error, trying to refresh token")
                    const isRefreshed = await refreshToken()
                    if (isRefreshed) {
                        console.log("Token refreshed, retrying recipe creation")
                        return createRecipe(values)
                    }
                    return navigate('/login', { state: { from: location } })

                }
                console.log("Error creating recipe:", error.response.data.message)
            }
            console.log("Error creating recipe:", error)
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createRecipe}>
            {({ values, errors, touched }) => (
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
                        <FieldArray name="ingredients">
                            {arrayHelpers => (
                                <>
                                    {(errors.ingredients && values.ingredients.length < 1) && <ErrorMessage message={errors.ingredients} />}
                                    {values.ingredients.map((section, i) => (
                                        <div key={i} className={style.ingredientGroup}>
                                            <button type="button" className={style.topRemoveButton} onClick={() => arrayHelpers.remove(i)}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                            <TextInput name={`ingredients.${i}.title`} id={`il.${i}.t`} label="Ingredient Group" className={style.input} />
                                            {(errors.ingredients?.[i]?.items && typeof errors.ingredients[i].items === 'string') && <ErrorMessage message={errors.ingredients[i].items} />}
                                            <FieldArray name={`ingredients.${i}.items`}>
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
                                                                        <TextInput name={`ingredients.${i}.items.${j}.amount`} id={`il.${i}.i.${j}.a`} label="Amount" type="number" min="0" step="0.1" className={style.inputSmall} />

                                                                        <SelectInput name={`ingredients.${i}.items.${j}.unit`} id={`il.${i}.i.${j}.u`} label="unit" className={style.inputSmall}>
                                                                            <option value="" default disabled select>unit</option>
                                                                            {ENUM_UNIT.map(unit => (
                                                                                <option key={unit} value={unit}>{unit}</option>
                                                                            ))}
                                                                            <option value="">None</option>
                                                                        </SelectInput>
                                                                    </span>


                                                                    <TextInput name={`ingredients.${i}.items.${j}.name`} id={`il.${i}.i.${j}.n`} label="Ingredient" className={style.input} />
                                                                    {/* <TextInput name={`ingredients.${i}.items.${j}.note`} label="Note" className={style.input} /> */}
                                                                </div>

                                                            </div>
                                                        ))}
                                                        <AddButton type="button" className={style.addButton} onClick={() => itemHelpers.push({ amount: "", unit: "", name: "", note: "" })} description={"Add Ingredient"} />
                                                    </>
                                                )}
                                            </FieldArray>
                                        </div>
                                    ))}
                                    <AddButton type="button" className={style.addButton} onClick={() => arrayHelpers.push({ title: "", items: [{ amount: "", unit: "", name: "", note: "" }] })} description={"Add Section"} />
                                </>
                            )}
                        </FieldArray>
                    </div>

                    {/* Instructions */}
                    <div className={`${style.section} ${style.instructions}`}>
                        <div className={style.sectionTitle}>Instructions</div>

                        <FieldArray name="instructions">
                            {arrayHelpers => (
                                <>
                                    {(errors.instructions && values.instructions.length < 1) && <ErrorMessage message={errors.instructions} />}
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
                                    <AddButton type="button" className={style.addButton} onClick={() => arrayHelpers.push("")} description={"Add Step"} />
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


