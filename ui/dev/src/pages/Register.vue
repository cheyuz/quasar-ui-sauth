<template>
  <s-auth-layout>
    <s-register app-name="Talent Scheduling System" register-api="/api/register" v-model="data">
      <q-input label="Alamat Lengkap" outlined v-model="data.address" :rules="[val=>!!val || 'Alamat Lengkap tidak boleh kosong']" hide-bottom-space>
        <template v-slot:prepend>
          <q-icon name="home" />
        </template>
      </q-input>
    </s-register>
  </s-auth-layout>
</template>

<script>
import SRegister from "../../../src/components/SRegister";
import SAuthLayout from "../../../src/components/SAuthLayout";
import {ref} from "vue";

export default {
  name: "Register",
  components: {
    SRegister,
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
