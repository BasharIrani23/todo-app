import React, { useContext } from "react";
import { AuthContext } from "../../Context/Auth/index";

const Auth = ({ capability, children }) => {
    const { can } = useContext(AuthContext);

    return <div>{can(capability) && children}</div>;
};

export default Auth;
