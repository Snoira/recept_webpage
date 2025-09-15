import style from "../../Styles/Button.module.css"

const Icons = {
    close: (
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
        </svg>

    )
}

const Button = ({ children, ...props }) => {
    const {
        variant = "primary",
        size = "medium",
        icon = null,
        ...rest } = props;

    return (
        <button
            className={`${style.button} ${style[variant]} ${style[size]}`}
            {...rest}>
            {icon && <span className={style.icon}>{Icons[icon]}</span>}
            {children}
        </button>
    )
}

export default Button;