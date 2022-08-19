<template>
  <s-auth-layout>
    <s-reset-password/>
  </s-auth-layout>
</template>

<script>
import SAuthLayout from "../../../src/components/SAuthLayout";
import SResetPassword from "../../../src/components/SResetPassword";
import {ref} from "vue";

export default {
  name: "ResetPassword",
  components: {
    SAuthLayout,
    SResetPassword
  },
  setup() {
    return{

    }
  }
}
</script>

<style scoped>

</style>
