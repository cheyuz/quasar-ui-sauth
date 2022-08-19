<template>
  <q-card class="q-pa-lg" flat>
    <q-card-section>
      <div class="text-h6">Reset Password</div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md" ref="form">
        <p>Input your new password:</p>
        <q-input outlined clearable v-model="data.password" :type="passwordFieldType" label="New Password"
                 :disable="loading" :rules="[val=>!!val || 'Password is required']" hide-bottom-space>
          <template v-slot:prepend>
            <q-icon name="lock"/>
          </template>
          <template v-slot:append>
            <q-icon :name="visibilityIcon" @click="switchVisibility" class="cursor-pointer"/>
          </template>
        </q-input>
        <q-input outlined clearable v-model="data.password_confirmation" :type="passwordFieldType"
                 label="Password Confirmation"
                 :disable="loading" :rules="[
                     val=>!!val || 'Password confirmation is required',
                     val=>val === data.password || 'Password confirmation does not match password'
                     ]" hide-bottom-space>
          <template v-slot:prepend>
            <q-icon name="lock"/>
          </template>
          <template v-slot:append>
            <q-icon :name="visibilityIcon" @click="switchVisibility" class="cursor-pointer"/>
          </template>
        </q-input>
      </q-form>
    </q-card-section>
    <q-card-section>
      <q-btn label="Back to Login" flat class="col" icon="arrow_left" :to="loginTo"/>
      <q-btn :loading="loading" unelevated color="primary" size="lg" class="col float-right" label="Reset Password"
             @click="submit"/>
      <div style="clear: both"></div>
    </q-card-section>
  </q-card>
</template>

<script>
import {ref} from "vue";
import {api} from "src/boot/axios";

export default {
  name: "SResetPassword",
  props: {
    loginTo: {
      type: String,
      default: "/login"
    },
    resetApi: {
      type: String,
      default: "/api/auth/reset"
    }
  },
  setup(props, {emit}) {
    const loading = ref(false);
    const data = ref({
      password: "",
      password_confirmation: "",
    });

    const visibility = ref(false);
    const passwordFieldType = ref('password');
    const visibilityIcon = ref('visibility');
    const switchVisibility = () => {
      visibility.value = !visibility.value
      passwordFieldType.value = visibility.value ? 'text' : 'password';
      visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility';
    }

    const submit = () => {
      loading.value = true;
      api.post(props.resetApi, data.value)
          .then(res => {
            if (res.data.success)
              emit('success', res.data.message);
          })
          .catch(err => {
            alert(err.message);
            loading.value = false;
          })
    }
    return {
      visibility,
      passwordFieldType,
      visibilityIcon,
      switchVisibility,
      data,
      loading,
      submit
    }
  }
}
</script>

<style scoped>

</style>