import { useState } from 'react'
import Login from './Login'
import ChangeMerchant from './ChangeMerchant'
export default function Auth() {
    const [step, setStep] = useState(1)
    return (
        <>
            {step === 1 && <Login setStep={setStep}/>}
            {step === 2 && <ChangeMerchant />}
        </>
    )
}