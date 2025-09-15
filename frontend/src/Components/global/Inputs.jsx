import { useField } from 'formik';
import style from '../../Styles/Inputs.module.css'


const ErrorContainer = ({ error }) => {
    return (
        <div className={style.errorContainer}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className={style.errorText}>{error}</span>
        </div>
    )
}

export const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const {
        fieldStyle = "",
        labelStyle = "",
        labelText = "",
        errorStyle = "",
        ...rest
    } = props;

    return (
        <div className={(meta.touched && meta.error) ? `${style.input} ${style.error} ${style[errorStyle]}` : style.input}>
            <label
                htmlFor={props.id || props.name}
                className={`${style.inputLabel} ${style[labelStyle]} ${style[labelText]}`}
            >{label}</label>
            <input
                className={`${style.inputField} ${style[fieldStyle]}`}
                placeholder=''
                {...field}
                {...rest} />
            <ErrorContainer
                error={meta.error} />
        </div>
    );
};

export const TextAreaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { className, ...rest } = props;

    return (
        <div className={(meta.touched && meta.error) ? `${className} ${style.error}` : className}>
            <label htmlFor={props.id || props.name} className={style.inputLabel}>{label}</label>
            <textarea className={style.textAreaField} {...field} {...rest} />
            <ErrorContainer error={meta.error} />
        </div>
    );
};

export const SelectInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const { className, ...rest } = props;
    return (
        <div className={className}>
            <label htmlFor={props.id || props.name} className={style.inputLabel}>{label}</label>
            <select className={style.inputField} {...field} {...rest} />
        </div>
    );
};

export const CheckboxGroup = ({ label, options, ...props }) => {
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