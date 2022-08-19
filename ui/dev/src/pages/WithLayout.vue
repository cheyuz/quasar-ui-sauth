<template>
  <s-auth-layout>
    <s-login app-name="Talent Scheduling Management" register/>
  </s-auth-layout>
</template>

<script>
import SAuthLayout from "../../../src/components/SAuthLayout";
import SLogin from "../../../src/components/SLogin";

export default {
  name: 'Test1',
  components: {
    SAuthLayout,
    SLogin
  },
  setup() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
