import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-sauth'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
