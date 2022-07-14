import { EventBus } from '@/js/event-bus'

export function highLightButton(id) {
  EventBus.$emit('hightlight', id)
}
