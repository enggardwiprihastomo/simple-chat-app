import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { IoMdClose } from "react-icons/io"
import { getInitials, IAccount } from "../../utils"
import { chatContext } from "../../index"

export default function Accounts() {
    const contextConsumer = useContext(chatContext)
    const history = useHistory()

    const handleDeleteAccount = (account: IAccount) => {
        contextConsumer.dispatchAccount({
            type: "DELETE_USER", payloads: account
        })
    }

    const handleSelectAccount = (account: IAccount) => {
        contextConsumer.dispatchLogin(account)
        history.push("/chat-room")
    }

    return contextConsumer.accounts.length ?
        <ul className="accounts">
            {
                contextConsumer.accounts.map((account, idx) => (
                    <li
                        key={`account-${idx}`}
                        onClick={() => handleSelectAccount(account)}>
                        <div
                            className="profile"
                            style={{ background: account.profile }}>
                            {getInitials(account.name)}
                        </div>
                        <span>{account.name}</span>
                        <IoMdClose
                            className="btn-close"
                            onClick={() => handleDeleteAccount(account)} />
                    </li>
                ))
            }
        </ul>
        : <span className="no-account">There is no account yet</span>
}