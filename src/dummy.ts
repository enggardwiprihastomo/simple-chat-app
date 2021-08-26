import { TAccount, TChat } from "./utils"

const CHATS: TChat = [
    {
        with: "",
        content: [
            {
                sender: "Name",
                date: new Date(),
                message: "Message"
            }
        ]
    }
]

const ACCOUNTS: TAccount = [
    {
        name: "Name",
        profile: "rgb(0,0,0)"
    }
]

export { CHATS, ACCOUNTS }