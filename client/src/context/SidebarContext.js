import { createContext } from "react";

export const SidebarContext = createContext({})

export const SidebarProvider = ({ children }) => {
    return <SidebarContext.Provider>
        { children }
    </SidebarContext.Provider>
}