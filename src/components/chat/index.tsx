import React, { useContext, useState, useEffect } from "react"
import { IoMdSearch, IoMdClose, IoMdAdd } from "react-icons/io"
import NewChat from "./New"
import "../../styles/chat.scss"
import ChatList from "./List"
import ChatContent from "./Content"
import { io } from "socket.io-client"
import { chatContext } from "../.."
import { ISingleChat } from "../../utils"

const socket = io("http://localhost:8080")

export default function Chat() {

    const contextConsumer = useContext(chatContext)

    const [search, setSearch] = useState("")
    const [displayContact, setDisplayContact] = useState(false)
    const [selectedChat, setSelectedChat] = useState("")

    useEffect(() => {
        socket.on("receive", (data: ISingleChat) => {
            if (data.with === contextConsumer.login.name) {
                contextConsumer.dispatchChat({
                    with: data.content.sender,
                    content: {
                        sender: data.content.sender,
                        date: new Date(data.content.date),
                        message: data.content.message
                    }
                })
            }
        })

        return () => {
            socket.off("receive")
        }
    }, [contextConsumer.chats])

    return (
        <div className="chat-room-container">
            {displayContact ? <NewChat setDisplay={setDisplayContact} setSelectedChat={setSelectedChat} /> : null}
            <div className="contact-container">
                <div className="title">
                    <img src="../../assets/ic-message.svg" alt="Messaging App" />
                    <h3>Messaging</h3>
                </div>
                <div className="action">
                    <div className="search">
                        <input type="text" name="username" id="username" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search a name to start chat" />
                        {search ? <IoMdClose className="btn-action" onClick={() => setSearch("")} /> : <IoMdSearch className="btn-action" />}
                    </div>
                    <IoMdAdd className="btn-add" onClick={() => setDisplayContact(true)} />
                </div>
                <ChatList selectedChat={selectedChat} setSelectedChat={setSelectedChat} search={search} />
            </div>
            {selectedChat ? <ChatContent selectedChat={selectedChat} setSelectedChat={setSelectedChat} /> : null}
        </div>
    )
}
