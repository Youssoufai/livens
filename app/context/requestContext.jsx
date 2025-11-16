// context/RequestContext.jsx
import React, { createContext, useContext, useState } from "react";

const RequestContext = createContext();

export const useRequest = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
    const [requestData, setRequestData] = useState({
        location: "",
        description: "",
        duration: "",
        allow_comment: "1",
        reward: "1000",
    });

    const updateRequest = (data) => {
        setRequestData((prev) => ({ ...prev, ...data }));
    };

    const resetRequest = () => {
        setRequestData({
            location: "",
            description: "",
            duration: "",
            allow_comment: "1",
            reward: "1000",
        });
    };

    return (
        <RequestContext.Provider value={{ requestData, updateRequest, resetRequest }}>
            {children}
        </RequestContext.Provider>
    );
};
