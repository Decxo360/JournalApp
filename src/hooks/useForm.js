import {useEffect, useMemo, useState} from "react"


export const useForm = (initialState={}, formValidations = {}) => {
  
    const [valores, setValores] = useState(initialState);
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      createValidators()
    }, [valores])
    useEffect(()=>{
        setValores(initialState)
    },[initialState])

    const reset=()=>{
        setValores(initialState);
    }

    const handleInputChange=({target})=>{
        setValores({
            ...valores,
            [target.name]:target.value
        })
    }

    const isFormValid = useMemo(()=>{

        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;
        }
        return true

    },[formValidation])

    const createValidators = () =>{
        
        const formCheckValues = {};

        for (const formField of Object.keys(formValidations)) {

            const [ fn, errorMessage] = formValidations[formField];
            formCheckValues[`${formField}Valid`] = fn(valores[formField]) ? null : errorMessage
            
        }
        setFormValidation(formCheckValues);

    }

    return{
        ...valores,
        valores,
        handleInputChange,
        reset,
        isFormValid,
        ...formValidation
    };


}
