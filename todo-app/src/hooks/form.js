import { useEffect, useContext } from "react";
import { SettingsContext } from "../Context/Setting/index";

const useForm = (callback, defaultValues = {}) => {
    // Replace 'sort' with 'sortField'
    const { setValues, values, sortField } = useContext(SettingsContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        callback({ ...values });
    };

    const handleChange = (event) => {
        const { name, value: eventValue } = event.target;
        const parsedValue = parseInt(eventValue, 10);
        const value = isNaN(parsedValue) ? eventValue : parsedValue;

        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSliderChange = (value) => {
        setValues((prevValues) => ({ ...prevValues, [sortField]: value }));
    };

    useEffect(() => {
        setValues(defaultValues);
    }, [defaultValues, setValues]);

    return {
        handleChange,
        handleSubmit,
        handleSliderChange,
        values,
    };
};

export default useForm;
