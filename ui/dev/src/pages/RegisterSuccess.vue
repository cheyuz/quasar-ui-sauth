<template>
  <s-auth-layout>
    <s-register-success />
  </s-auth-layout>
</template>

<script>
import SRegisterSuccess from "../../../src/components/SRegisterSuccess";
import SAuthLayout from "../../../src/components/SAuthLayout";
import {ref} from "vue";

export default {
  name: "RegisterSuccess",
  components: {
    SRegisterSuccess,
    SAuthLayout
  },
  setup() {
    const data = ref({
      address: ""
    });
    return {
      register(data) {
        console.log(data);
      },
      data
    };
  }
}
</script>

<style scoped>

</style>
