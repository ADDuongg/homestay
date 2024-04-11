import { React, createContext, useContext, useState } from "react";


export const AdminContext = createContext();


/* const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setAccessToken: () => { },
})


export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        
    })
    const [accessToken, _setAccessToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setAccessToken = (token) => {
        _setAccessToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        }
        else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    return (
        <StateContext.Provider value={{
            user,
            accessToken,
            setUser,
            setAccessToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useContextAPI = () =>  useContext(StateContext) ; */