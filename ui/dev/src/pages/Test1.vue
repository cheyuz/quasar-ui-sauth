<template>
  <q-page padding>

    <s-login app-name="Talent Scheduling Management" register />

  </q-page>
</template>

<script>
import SLogin from "../../../src/components/SLogin";
export default {
  name: 'Test1',
  components: {
    SLogin
  },
  setup() {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
