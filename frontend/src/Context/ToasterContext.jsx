import { createContext, useContext } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToasterContext = createContext()

export function ToasterProvider({ children }) {

    const successToaster = ( obj, goal ) => toast.success(`${obj}, successfully ${goal}!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const errorToaster = (err) => toast.error(`Oh, no! ${err}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })

    return (
        <ToasterContext.Provider value={{ successToaster, errorToaster }}>
            {children}
        </ToasterContext.Provider>
    )
}

export function useToaster() {
    return useContext(ToasterContext);
}