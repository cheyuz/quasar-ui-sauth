<template>
  <s-auth-layout>
    <s-login app-name="TSS" register register-to="/register" />
  </s-auth-layout>
</template>

<script>
import SAuthLayout from "../../../src/components/SAuthLayout";
import SLogin from "../../../src/components/SLogin";

export default {
  name: "Login",
  components: {
    SAuthLayout,
    SLogin
  },
}
</script>

<style scoped>

</style>
