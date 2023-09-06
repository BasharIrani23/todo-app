import { useEffect, useContext } from "react";
import { settingsContext } from "../Context/Setting";

const useForm = (callback, defaultValues = {}) => {
    const { setValues, values, sort } = useContext(settingsContext);

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
        setValues((prevValues) => ({ ...prevValues, [sort]: value }));
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
