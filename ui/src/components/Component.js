import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'SAuth',

  setup () {
    return () => h(QBadge, {
      class: 'SAuth',
      label: 'SAuth'
    })
  }
}
