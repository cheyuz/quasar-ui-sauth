<template>
  <q-card class="q-pa-lg" flat>
    <q-card-section>
      <div class="text-h6">Forgot Password</div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md" ref="form">
        <p>
          Enter your email address and we will send you a link to reset your password.
        </p>
        <q-input
            label="Email"
            name="email"
            type="email"
            v-model="email"
            outlined
            class="q-mb-md"
            :rules="[
                val => !!val || 'Email is required',
                val => /.+@.+\..+/.test(val) || 'Email is invalid'
            ]"
            hide-bottom-space
        />
        <q-btn
            icon="send"
            label="Send Reset Link"
            color="primary"
            @click="send"
            class="q-mb-md"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import {ref} from "vue";
import {api} from "src/boot/axios";
import {useRouter} from "vue-router";

export default {
  name: "SForgot",
  props: {
    resetApi: {
      type: String,
      default: "/api/reset-password",
      required: true,
    },
    resetUrl: {
      type: String,
      default: "/reset-password",
      required: true,
    }
  },
  setup(props) {
    const form = ref(null);
    const email = ref('');
    const router = useRouter();

    const send = async () => {
      const valid = await form.value.validate();
      if(valid){
        api.post(props.resetApi, {
          email: email.value
        }).then(res => {
          if(res.data.success){
            console.log('Success');
            // push to reset password page
            router.push(props.resetUrl);
          } else {
            alert(res.data.message);
          }
        }).catch(res => {
          alert(res.message);
        });
      }
    };

    return {
      email,
      form,
      send
    }
  }
}
</script>

<style scoped>

</style>