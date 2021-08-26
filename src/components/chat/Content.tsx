import React, { useState, useContext } from "react"
import { IoMdArrowBack, IoMdSend } from "react-icons/io"
import { chatContext } from "../.."
import { getInitials, getTime, getTimeLine } from "../../utils"
import { io } from "socket.io-client"

const socket = io("http://localhost:8080")

interface IProps {
    selectedChat: string
    setSelectedChat: (value: string) => void
}

export default function ChatContent({ selectedChat, setSelectedChat }: IProps) {
    const contextConsumer = useContext(chatContext)
    const profile = contextConsumer.accounts.find(profile => profile.name === selectedChat)
    const chats = contextConsumer.chats.find(chat => chat.with === selectedChat)
    const [message, setMessage] = useState("")

    const handleBack = () => {
        setSelectedChat("")
    }

    const handleSendMessage = () => {
        if (message) {
            const newMessage = {
                with: selectedChat,
                content: {
                    sender: contextConsumer.login.name,
                    message,
                    date: new Date()
                }
            }
            contextConsumer.dispatchChat(newMessage)
            socket.emit("send", newMessage, selectedChat)
            setMessage("")
        }
    }

    let timeline = ""

    return (
        <div className="chat-container">
            <div className="header">
                <IoMdArrowBack
                    className="btn-back"
                    onClick={handleBack} />
                <div
                    className="profile"
                    style={{ background: profile.profile }}>
                    {getInitials(profile.name)}
                </div>
                <span>{profile.name}</span>
            </div>
            <div className="messages">
                {
                    chats && chats.content.map(message => {
                        if (timeline !== getTimeLine(message.date)) {
                            timeline = getTimeLine(message.date)
                            return (
                                <>
                                    <span className="chat-timeline">{timeline}</span>
                                    <div className={contextConsumer.login.name === message.sender ? "outcoming" : "incoming"}>
                                        <p>{message.message}</p>
                                        <span>{getTime(message.date)}</span>
                                    </div>
                                </>
                            )
                        }
                        return (
                            <div className={contextConsumer.login.name === message.sender ? "outcoming" : "incoming"}>
                                <p>{message.message}</p>
                                <span>{getTime(message.date)}</span>
                            </div>
                        )

                    })
                }
            </div>
            <div className="send">
                <textarea
                    placeholder="Write a message"
                    onChange={e => setMessage(e.target.value)}
                    value={message} />
                <IoMdSend
                    className="btn-send"
                    onClick={handleSendMessage} />
            </div>
        </div>
    )
}
