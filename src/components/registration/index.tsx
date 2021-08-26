import React, { useContext, useRef, useState } from "react"
import { generateProfile, isAccountExist } from "../../utils"
import Accounts from "./Account"
import "../../styles/register.scss"
import Errors from "./Error"
import { chatContext } from "../.."

export default function Register() {
    const [errors, setErrors] = useState<string[]>([])
    const [username, setUsername] = useState("")
    const usernameRef = useRef(null)
    const contextConsumer = useContext(chatContext)

    const handleSubmit = () => {
        if (!username) {
            setErrors(prev => [...prev, "Username is required"])
        }
        else if (isAccountExist(username, contextConsumer.accounts)) {
            setErrors(prev => [...prev, "Account is already exist"])
        }
        else {
            contextConsumer.dispatchAccount({
                type: "ADD_USER",
                payloads: { name: username, profile: generateProfile() }
            })
            setUsername("")
        }
        usernameRef.current.focus()
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
        if (errors.length && event.target.value) {
            setErrors([])
        }
    }

    return (
        <div className="register-container">
            <div className="left">
                <div className="title">
                    <img src="../../assets/ic-message.svg" alt="Messaging App" />
                    <h1>Messaging</h1>
                    <p>Simple chat app to connect and have a good time with your friends</p>
                </div>
                <div className="form">
                    <h3>Create Account</h3>
                    <label htmlFor="username">Username<span className="required-mobile">*</span></label>
                    <div className="username-wrapper">
                        <input
                            ref={usernameRef}
                            type="text"
                            name="username"
                            id="username"
                            value={username} onChange={handleUsernameChange} />
                        <span className="required-info">!</span>
                    </div>
                    {errors ?
                        <Errors data={errors} /> : null
                    }
                    <button className="btn-add" onClick={handleSubmit}>Add User</button>
                </div>
            </div>
            <div className="right">
                <h3>Registered Accounts</h3>
                <span className="register-info">Select one of the accounts to login with</span>
                <Accounts />
            </div>
        </div>
    )
}
