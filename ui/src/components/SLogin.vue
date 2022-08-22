<template>
  <q-card class="q-pa-lg " flat>
    <q-card-section>
      <q-form class="q-gutter-md" ref="form">
        <q-input outlined clearable v-model="email" type="email" label="email" :disable="loading"
                 :rules="[
                     val => !!val || 'Email is required',
                     val => /.+@.+\..+/.test(val) || 'Email is invalid'
                 ]"
        >
          <template v-slot:prepend>
            <q-icon name="email"/>
          </template>
        </q-input>
        <q-input outlined clearable v-model="password" :type="passwordFieldType" label="password"
                 :disable="loading" :rules="[
                     val => !!val || 'Password is required',
                 ]">
          <template v-slot:prepend>
            <q-icon name="lock"/>
          </template>
          <template v-slot:append>
            <q-icon :name="visibilityIcon" @click="switchVisibility" class="cursor-pointer"/>
          </template>
        </q-input>
      </q-form>
    </q-card-section>
    <q-card-actions class="q-px-md">
      <q-btn :loading="loading" unelevated color="primary" size="lg" class="full-width" label="Login"
             @click="submit" icon="login"/>
      <q-btn v-if="register" unelevated color="info" size="lg" class="full-width q-mt-md"
             label="Register" :to="registerTo"/>
    </q-card-actions>
    <q-card-section class="text-center q-pa-none">
      <router-link to="/">Forgot password</router-link>
    </q-card-section>
  </q-card>
</template>

<script>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Notify} from "quasar";
import {api} from "../boot/axios";

export default {
  name: "SLogin",
  props: {
    register: {
      type: Boolean,
      default: false
    },
    registerTo: {
      type: String,
      default: "/register"
    },
    loginApi: {
      type: String,
      default: "/api/login",
      required: true
    }
  },
  emits: ["success"],
  setup(props, {emit}) {
    // const auth = useAuthStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const form = ref(null);

    const visibility = ref(false);
    const passwordFieldType = ref('password');
    const visibilityIcon = ref('visibility');
    const loading = ref(false);

    const switchVisibility = () => {
      visibility.value = !visibility.value
      passwordFieldType.value = visibility.value ? 'text' : 'password';
      visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility';
    }

    const submit = async () => {
      const valid = await form.value.validate();
      if (!valid) return;

      loading.value = true;
      api.get('/sanctum/csrf-cookie').then(res => {
        api.post(props.loginApi, {
          email: email.value,
          password: password.value,
        }).then(res => {
          if (res.data.message === 'success' || res.data.success || res.data.status === 'success') {
            // auth.login(res.data.user, res.data.token, res.data.roles, res.data.roles_display);
            emit('success', res.data);

            router.push('/');
            Notify.create({
              message: 'You have successfully login to the application.',
              position: 'bottom',
              type: 'positive'
            });
          } else {
            Notify.create({
              message: res.data.message,
              position: 'top',
              type: 'negative'
            });
          }
          loading.value = false;
        }).catch(err => {
          // if 403
          if (err.response.status === 401) {
            Notify.create({
              message: 'Invalid email or password.',
              position: 'top',
              type: 'negative'
            });
          } else {
            Notify.create({
              message: err.message,
              position: 'top',
              type: 'negative'
            });
          }
          loading.value = false;
        });
      }).catch(err => {
        Notify.create({
          message: err.message,
          position: 'top',
          type: 'negative'
        });
        loading.value = false;
      });
    }

    onMounted(() => {
      // if (auth.isLoggedIn) {
      //   router.push('/');
      // }
    });

    return {
      loading,
      email, password, form,
      visibility,
      passwordFieldType,
      visibilityIcon,
      switchVisibility,
      submit,
    }
  }
}
</script>

<style scoped>

</style>