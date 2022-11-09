import { createContext } from "react";

const sidebarContext = createContext({})

const SidebarProvider = ({ children }) => {
    return <SidebarProvider>
        { children }
    </SidebarProvider>
}