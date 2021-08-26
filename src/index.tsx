import React, { createContext, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Register from "./components/registration"
import Chat from "./components/chat"
import { IAccount, isChatExist, ISingleChat, TAccount, TActionUser, TChat, TContext } from "./utils"

const chatContext = createContext<TContext | null>(null)

const Main = () => {
    const [accounts, setAccounts] = useState<TAccount>([])
    const [chats, setChats] = useState<TChat>([])
    const [login, setLogin] = useState<IAccount | null>(null)

    const dispatchChat = (newChat: ISingleChat) => {

        if (!isChatExist(newChat.with, chats)) {
            return setChats([...chats, {
                with: newChat.with,
                content: [newChat.content]
            }])
        }
        else {
            const updatedChat: TChat = chats.map(chat => {
                if (chat.with === newChat.with) {
                    return {
                        with: chat.with,
                        content: [...chat.content, newChat.content]
                    }
                }
                return chat
            })
            return setChats(updatedChat)
        }
    }

    const dispatchAccount = (action: TActionUser) => {
        let newAccounts: TAccount;
        switch (action.type) {
            case "ADD_USER":
                newAccounts = [...accounts, action.payloads]
                localStorage.setItem("accounts", JSON.stringify(newAccounts))
                return setAccounts(newAccounts)
            case "DELETE_USER":
                newAccounts = accounts.filter(account => account.name !== action.payloads.name)
                localStorage.setItem("accounts", JSON.stringify(newAccounts))
                return setAccounts(newAccounts)
            default:
                return accounts
        }
    }

    const dispatchLogin = (account: IAccount) => {
        return setLogin(account)
    }

    useEffect(() => {
        if (localStorage.getItem("accounts")) {
            setAccounts(JSON.parse(localStorage.getItem("accounts")))
        }
    }, [])

    return (
        <chatContext.Provider value={{ dispatchAccount, dispatchLogin, accounts, login, dispatchChat, chats }}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Register />} />
                    <Route exact path="/chat-room" render={() => <Chat />} />
                </Switch>
            </BrowserRouter>
        </chatContext.Provider>
    )
}

ReactDOM.render(<Main />, document.getElementById("root"))

export { chatContext }