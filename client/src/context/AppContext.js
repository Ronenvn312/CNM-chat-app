import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [ email, setEmail ] = useState("")
    const [currentUser, setCurrentUser] = useState({})
    // console.log(email)

    const getOneUserByEmail = async () => {
        const user = await axios.get(`http://localhost:5000/api/auth/users/${email}`)
        setCurrentUser(user.data)
    }
    useEffect(() => {
        if(email !== "") {
            getOneUserByEmail()
            console.log("Email have been changed!")
        } else {
            console.log("i dont know!")
        }
    },[email])

    // console.log(currentUser)

    return <AppContext.Provider value={ {currentUser,setEmail} }>
        {children}
    </AppContext.Provider>
}