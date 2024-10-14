import { reactive } from 'vue'
import { io } from 'socket.io-client'

// الحصول على المتغيرات البيئية مباشرة من process.env
const URL =
  process.env.SOCKET_URL || 'https://api-nemrh-test.cmt-saudi.com:3303'
console.log('Socket URL:', URL)

function getCookie(name) {
  if (typeof document !== 'undefined') {
    let cookieArray = document.cookie.split('; ')
    let cookie = cookieArray.find((row) => row.startsWith(name + '='))
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
  }
  return null
}

let userId = getCookie('nemrh_website_user_uid')

if (!userId) {
  userId = getCookie('nemrh_website_user_id')
}

export const state = reactive({
  connected: false,
  qrCode: null,
  userId: userId,
  readyToSendMessages: false,
})

export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
  socket.emit('delete_session', userId)
})

socket.on(`qr_${userId}`, (e) => {
  state.qrCode = e
})

socket.on(`whatsapp_ready_${userId}`, (e) => {
  state.readyToSendMessages = e
})

export function restartSocket() {
  if (socket.connected) {
    socket.disconnect()
    state.qrCode = null
  }
  socket.connect()
}
