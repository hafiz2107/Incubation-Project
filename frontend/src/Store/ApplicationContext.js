import { useState, createContext } from 'react'

export const ApplicationContext = createContext(null)

function SetApplication ({children}){
    const [applicationDetails , setApplicationDetails] = useState({})
    return(
        <ApplicationContext.Provider value={{applicationDetails , setApplicationDetails}}>
            {children}
        </ApplicationContext.Provider>
    )
}
export default SetApplication