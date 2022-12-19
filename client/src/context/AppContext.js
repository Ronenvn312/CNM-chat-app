import { createContext, useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client"
import { searchRoute } from '../utils/APIRoutes'
const socket = io.connect("http://localhost:5000")

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
    const [email, setEmail] = useState("")
    const [displayNameInChatFeed, setDisplayNameInChatFeed] = useState("")
    const [groupId, setGroupId] = useState("")
    const [usersOnServer, setUsersOnServer] = useState([])
    const [showWelcome, setShowWelcome] = useState(true)

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const getAllUserOnServer = async () => {
        const users = await axios.get("http://localhost:5000/api/auth/users")
        setUsersOnServer(users.data)
    }
    const searchUser = async () => {
       axios.get("http://localhost:5000/api/auth/search", { search: searchTerm, _id: usersOnServer._id })
       .then(res => setSearchResults(res))
    }
    useEffect(() => {

        if (email !== "") {
            getAllUserOnServer()
        }
        if (searchTerm !== "") {
            searchUser()
        }
    }, [email, searchTerm])


    return <AppContext.Provider value={{
        email,
        displayNameInChatFeed,
        setEmail,
        setDisplayNameInChatFeed,
        socket,
        setGroupId,
        groupId,
        usersOnServer,
        showWelcome,
        setShowWelcome,
        setSearchTerm, searchResults, searchTerm
    }}>
        {children}
    </AppContext.Provider>
}