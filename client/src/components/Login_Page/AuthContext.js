import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [studentId, setStudent] = useState("");

    return (
        <AuthContext.Provider value={{ studentId, setStudent }}>
            {children}
        </AuthContext.Provider>
    );
};