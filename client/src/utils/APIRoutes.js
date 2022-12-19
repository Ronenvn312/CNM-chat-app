const host = "http://localhost:5000"
export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const getUserRoute = `${host}/api/auth/user`

export const getAllUsersRoute = `${host}/api/auth/users`
export const verifiEmailRoute = `${host}/api/auth/verify-email`
export const resendEmailRoute = `${host}/api/auth/resendEmail`
export const searchRoute = `${host}/api/auth/search`
// const router for chat 
export const accessChatRoute = `${host}/api/chat/accessChat`
export const fetchChatsRoute = `${host}/api/chat/groups`
export const fetchGroupsRoute = `${host}/api/chat/fetchGroups`
export const createGroupChatRoute = `${host}/api/chat/createGroupChat`
export const renameGroupRoute = `${host}/api/chat/renameGroup`
export const addToGroupRoute = `${host}/api/chat/addToGroup`
export const removeFromGroupRoute = `${host}/api/chat/removeFromGroup`
export const getChatByIdRoute = `${host}/api/chat/getChatById`
// router for message
export const sendMessageRoute = `${host}/api/messagae/addToGroup`
export const getMessageRoute = `${host}/api/message/removeFromGroup`