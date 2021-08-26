import React, { useEffect, useState, useContext } from "react"
import { chatContext } from "../.."
import { findChat, getInitials, getTime, TChat } from "../../utils"

interface IProps {
    search: string
    selectedChat: string
    setSelectedChat: (value: string) => void
}

export default function ChatList({ search, selectedChat, setSelectedChat }: IProps) {
    const contextConsumer = useContext(chatContext)
    const [chats, setChats] = useState<TChat>([])

    useEffect(() => {
        if (search) {
            setChats(findChat(contextConsumer.chats, search))
        }
        else {
            setChats(contextConsumer.chats)
        }
    }, [search, contextConsumer.chats])

    return chats.length ?
        <ul className="chats">
            {
                chats.map((chat, idx) => {
                    const lastMessage = chat.content[chat.content.length - 1]
                    const background = contextConsumer.accounts.find(account => account.name === chat.with).profile
                    return (
                        <li key={`chat-${idx}`} onClick={() => setSelectedChat(chat.with)} className={selectedChat === chat.with ? "active-chat" : null}>
                            <div className="profile" style={{ background }}>
                                {getInitials(chat.with)}
                            </div>
                            <div className="highlight">
                                <span>{chat.with}</span>
                                <p>{lastMessage.message}</p>
                            </div>
                            <span className="time">{getTime(lastMessage.date)}</span>
                        </li>
                    )
                })
            }
        </ul>
        :
        <span className="no-chat">No chat</span>
}
