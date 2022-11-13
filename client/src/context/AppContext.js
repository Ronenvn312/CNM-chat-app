import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [email, setEmail] = useState("")
    const [displayNameInChatFeed, setDisplayNameInChatFeed] = useState("")
    const [currentUser, setCurrentUser] = useState({})

    const getOneUserByEmail = async () => {
        const user = await axios.get(`http://localhost:5000/api/auth/users/${email}`)
        setCurrentUser(user.data)
    }
    useEffect(() => {
        if (email !== "") {
            getOneUserByEmail()
            console.log("Email have been changed!")
        } else {
            // alert("Please Login First!")
            console.log("Some thing wrong with useEffect in AppContext!")
        }
    }, [email])

    // console.log(currentUser)

    return <AppContext.Provider value={{
        currentUser,
        displayNameInChatFeed,
        setEmail,
        setDisplayNameInChatFeed
    }}>
        {children}
    </AppContext.Provider>
}