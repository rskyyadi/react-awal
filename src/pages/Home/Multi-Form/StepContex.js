import React, {useState} from 'react'
import MultiFormJs from './MultiFormJs'


export const multistepContext = React.createContext()


const StepContex = () => { 
    const [currentStep, setStep] = useState(1)
    const [userData, setUserData] = useState([])
    const [finalData, setFinalData] = useState([])

    return (
        <div>
            <multistepContext.Provider value={{currentStep, setStep, userData, setUserData, finalData, setFinalData}}>
                <MultiFormJs />
            </multistepContext.Provider>
        </div>
    )
}
export default StepContex;