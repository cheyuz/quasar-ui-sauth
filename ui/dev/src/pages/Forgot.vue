<template>
  <s-auth-layout>
    <s-forgot reset-url="/api/sasasa" reset-api="/api/sasa" />
  </s-auth-layout>
</template>

<script>
import SForgot from "../../../src/components/SForgot";
import SAuthLayout from "../../../src/components/SAuthLayout";

export default {
  name: "Forgot",
  components: {
    SForgot,
    SAuthLayout
  }
}
</script>

<style scoped>

</style>
