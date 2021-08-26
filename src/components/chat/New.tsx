import React, { useContext, useState, useEffect } from "react"
import { IoMdArrowBack, IoMdClose, IoMdSearch } from "react-icons/io"
import { chatContext } from "../.."
import { findContact, getInitials, TAccount } from "../../utils"

interface IProps {
    setDisplay: (value: boolean) => void
    setSelectedChat: (value: string) => void
}

export default function NewChat({ setDisplay, setSelectedChat }: IProps) {
    const contextConsumer = useContext(chatContext)

    const [search, setSearch] = useState("")
    const [isBack, setIsBack] = useState(false)
    const [contacts, setcontacts] = useState<TAccount>([])


    const handleBack = () => {
        setIsBack(true)

        setTimeout(() => {
            setDisplay(false)
        }, 250);
    }

    const handleSelectContact = (account: string) => {
        setSelectedChat(account)
        handleBack()
    }

    useEffect(() => {
        if (search) {
            setcontacts(findContact(contextConsumer.accounts, search))
        }
        else {
            setcontacts(contextConsumer.accounts)
        }
    }, [search, contextConsumer.accounts])

    return (
        <div className={isBack ? "new-chat-container slide-out" : "new-chat-container slide-in"}>
            <div className="title">
                <IoMdArrowBack
                    className="btn-back"
                    onClick={handleBack} />
                <h3>New Chat</h3>
            </div>
            <div className="action">
                <div className="search">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search a name to start chat" />
                    {search ? <IoMdClose
                        className="btn-action"
                        onClick={() => setSearch("")} /> :
                        <IoMdSearch className="btn-action" />}
                </div>
            </div>
            {contacts.length ?
                <ul className="contacts">
                    {
                        contacts.map((account, idx) => {
                            if (account.name !== contextConsumer.login.name) {
                                return (
                                    <li
                                        key={`contact-${idx}`}
                                        onClick={() => handleSelectContact(account.name)}>
                                        <div
                                            className="profile"
                                            style={{ background: account.profile }}>
                                            {getInitials(account.name)}
                                        </div>
                                        <span>{account.name}</span>
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
                :
                <span className="no-contact">No Contact</span>
            }
        </div>
    )
}