import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Use the functional form of useState to conditionally set the initial state
    const [studentId, setStudent] = useState(() => {
        const storedStudentId = localStorage.getItem('studentId');
        return storedStudentId || "DAMN"; // Set the initial state to an empty string if not found in local storage
    });

    // Update local storage whenever studentId changes
    useEffect(() => {
        localStorage.setItem('studentId', studentId);
    }, [studentId]);

    return (
        <AuthContext.Provider value={{ studentId, setStudent }}>
            {children}
        </AuthContext.Provider>
    );
};