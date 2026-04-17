import React, { createContext, useContext, useState } from "react";

const RequestContext = createContext();

export const useRequest = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
    const [request, setRequest] = useState({
        location: "",
        description: "",
        duration: "",
        allow_comment: "1",
        reward: 1000,
    });

    const [requestId, setRequestId] = useState(null); // ✅ store backend request ID

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
        setRequestId(null); // reset ID too
    };

    const saveRequestId = (id:string) => {
        setRequestId(id);
    };

    return (
        <RequestContext.Provider
            value={{ request, updateRequest, resetRequest, requestId, saveRequestId }}
        >
            {children}
        </RequestContext.Provider>
    );
};
