interface IAccount {
    name: string
    profile?: string
}

interface IChatContent {
    sender: string
    message: string
    date: Date
}

interface ISingleChat {
    with: string
    content: IChatContent
}

interface IChat {
    with: string
    content: IChatContent[]
}

type TAccount = IAccount[]

type TChat = IChat[]

type TContext = {
    dispatchAccount: (action: TActionUser) => void,
    dispatchChat: (payloads: ISingleChat) => void,
    accounts: TAccount,
    dispatchLogin: (action: IAccount) => void,
    login: IAccount | null,
    chats: TChat
}

type TActionUser = {
    type: "ADD_USER" | "DELETE_USER"
    payloads: IAccount
}

const getInitials = (name: string) => {
    const nameParts = name.split(" ")
    if (nameParts.length === 1) {
        return nameParts[0].substring(0, 1).toUpperCase()
    }
    return nameParts[0].substring(0, 1).toUpperCase() + nameParts[nameParts.length - 1].substring(0, 1).toUpperCase()
}

const number255 = () => {
    return Math.round(Math.random() * 255)
}

const generateProfile = () => {
    return `rgb(${number255()},${number255()},${number255()})`
}

const findContact = (contacts: IAccount[], keyword: string) => {
    return contacts.filter(contact => contact.name.match(new RegExp(`${keyword}`, "i")))
}

const isChatExist = (value: string, chats: TChat) => {
    return chats.findIndex(chat => chat.with === value) !== -1
}

const isAccountExist = (value: string, accounts: TAccount) => {
    return accounts.findIndex(account => account.name.toLocaleLowerCase() === value.toLocaleLowerCase()) !== -1
}

const findChat = (chats: IChat[], keyword: string) => {
    return chats.filter(chat => {
        if (chat.with.match(new RegExp(`${keyword}`, "i"))) {
            return chat
        }
    })
}

const twoDigit = (value: number) => {
    return value.toString().length > 1 ? value : `0${value}`
}

const getTime = (date: Date) => {
    return `${twoDigit(date.getHours())}.${twoDigit(date.getMinutes())}`
}

const getDifDate = (date: Date) => {
    return Math.round((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24))
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const getTimeLine = (date: Date) => {
    const prevDays = ["Today", "Yesterday"]
    const diff = getDifDate(date)
    if (diff < 2) {
        return prevDays[diff]
    }
    if (diff < 7) {
        return DAYS[diff]
    }

    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}


export { getInitials, generateProfile, isAccountExist, isChatExist, findContact, findChat, getTime, getTimeLine }
export type { IAccount, ISingleChat, IChat, IChatContent, TAccount, TActionUser, TChat, TContext }