import { reactive } from 'vue'
import { io } from 'socket.io-client'

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

const URL = 'https://api-nemrh-test.cmt-saudi.com:3303'

export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
  // console.log('test')
  socket.emit('delete_session', userId)
})

socket.on(`qr_${userId}`, (e) => {
  state.qrCode = e
  // console.log(state.qrCode)
})

socket.on(`whatsapp_ready_${userId}`, (e) => {
  state.readyToSendMessages = e
  // console.log(e)
})

export function restartSocket() {
  if (socket.connected) {
    socket.disconnect()
    state.qrCode = null
    // console.log(state.connected)
    // console.log(state.qrCode)
  }
  socket.connect()
  // console.log(state.connected)
}
