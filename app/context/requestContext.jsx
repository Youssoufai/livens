import React, { createContext, useContext, useState } from "react";

const RequestContext = createContext();

export const useRequest = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
    const [request, setRequest] = useState({
        location: "",
        description: "",
        duration: "",
        allow_comment: "",
        reward: 1000,

    });

    const updateRequest = (data) => {
        setRequest((prev) => ({ ...prev, ...data }));
    };

    const resetRequest = () => {
        setRequest({
            location: "",
            description: "",
            duration: "",
            allow_comment: "1",
            reward: 1000,
        });
    };

    return (
        <RequestContext.Provider value={{ request, updateRequest, resetRequest }}>
            {children}
        </RequestContext.Provider>
    );
};
