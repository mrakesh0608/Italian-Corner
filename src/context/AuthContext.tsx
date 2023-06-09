import React, { createContext, useContext, useReducer, useEffect } from 'react';

import * as firebase from '#src/firebase';
import { useInitUser } from '#src/hooks/useInitUser';

interface contextProps {
    dispatch?: any,
    user: any,
    isNewUser: boolean,
    theme: string | 'Light' | 'Dark',
    cart: object,
    address: string,
    otpLastTime?: any,
    bill?: object
}

const initialValues = {
    user: null,
    isNewUser: false,
    theme: 'Light',
    cart: {},
    address: "",
    bill: {}
}

export const AuthContext = createContext<contextProps>(initialValues);

export function useAuthContext() {

    const context = useContext(AuthContext)

    if (!context) throw Error('useAuthContext must be used inside an AuthContextProvider')

    return context
}

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'INIT':
            return { ...initialValues }
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'SET_INFO':
            return { ...state, ...action.payload }
        case 'SET_IS_NEW_USER':
            return { ...state, isNewUser: action.payload }
        case 'SET_ADDRESS':
            return { ...state, address: action.payload }
        case 'SET_BILL':
            return { ...state, bill: action.payload }
        case 'SET_THEME':
            firebase.updateUser({ theme: action.payload });
            return { ...state, theme: action.payload }
        case 'SET_OTP_TIME':
            return { ...state, otpLastTime: new Date() }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialValues)

    useInitUser({ ...state, dispatch });

    useEffect(() => {
        // console.log('AuthContext state:', JSON.stringify(state, null, 2));
    }, [state]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}