export const ADD_CHAT = '@@chat/ADD_CHAT'
export const PUSH_MESSAGE = '@@chat/PUSH_MESSAGE'

export const addChat = () => ({
  type: ADD_CHAT,
})
export const pushMessage = (chatId, messageId) => ({
  type: PUSH_MESSAGE,
  chatId,
  messageId,
})