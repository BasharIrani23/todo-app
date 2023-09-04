import { useEffect, useContext } from "react";
import { settingsContext } from "../Context/Setting";

const useForm = (callback, defaultValues = {}) => {
    const { setValues, values, sort } = useContext(settingsContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        callback({ ...values });
    };

    const handleChange = (event) => {
        let name, value;
        if (typeof event === "object") {
            name = event.target.name;
            value = event.target.value;
        } else {
            console.log("event from slider", event);

            name = sort;
            value = event;
        }

        if (parseInt(value)) {
            value = parseInt(value);
        }

        setValues((values) => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        setValues(defaultValues);
    }, [defaultValues]);

    return {
        handleChange,
        handleSubmit,
        values,
    };
};

export default useForm;
