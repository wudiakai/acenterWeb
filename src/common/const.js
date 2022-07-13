/* eslint-disable no-unused-vars */
import { EventBus } from '@/event-bus.js'
// export const SERVER_URL = 'http://localhost:2022'
export const SERVER_URL = 'http://10.1.79.81:2022'

export default {
  SERVER_URL
}

export function highLightButton(id) {
  EventBus.$emit('hightlight', id)
}
