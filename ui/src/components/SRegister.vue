<template>
  <q-card class="q-pa-lg " flat>
    <q-card-section>
      <div class="text-h6">Register</div>
    </q-card-section>
    <q-card-section>
      <q-form class="q-gutter-md" ref="form">
        <q-input outlined clearable label="Name" v-model="data.name" :rules="[val=>!!val || 'Name is required']"
                 hide-bottom-space>
          <template v-slot:prepend>
            <q-icon name="person"/>
          </template>
        </q-input>
        <slot/>
        <q-input outlined clearable v-model="data.email" type="email" label="email" :disable="loading">
          <template v-slot:prepend>
            <q-icon name="email"/>
          </template>
        </q-input>
        <q-input outlined clearable v-model="data.password" :type="passwordFieldType" label="Password"
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
      <q-btn :loading="loading" unelevated color="primary" size="lg" class="col float-right" label="Register"
             @click="submit"/>
      <div style="clear: both"></div>
    </q-card-section>
  </q-card>
</template>

<script>
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import {Notify} from "quasar";
import {api} from "../../dev/src/boot/axios";

export default {
  name: "SRegister",
  props: {
    loginTo: {
      type: String,
      default: "/login",
    },
    registerApi: {
      type: String,
      default: "/api/register",
      required: true
    },
    modelValue: {
      type: Object,
      default: () => ({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }),
      required: true
    }
  },
  emits: ["submit", "registered"],
  setup(props, {emit}) {
    const form = ref(null);
    const loading = ref(false);
    const data = computed({
      get: () => props.modelValue,
      set: val => emit("update:modelValue", val)
    });
    const visibility = ref(false);
    const passwordFieldType = ref('password');
    const visibilityIcon = ref('visibility');
    const switchVisibility = () => {
      visibility.value = !visibility.value
      passwordFieldType.value = visibility.value ? 'text' : 'password';
      visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility';
    }

    const submit = async () => {
      const valid = await form.value.validate();
      if (valid) {
        loading.value = true;
        api.post(props.registerApi, data.value)
            .then(response => {
              if (response.data.data) {

              }
              emit('registered', response.data);
            })
            .catch(error => {
              alert(error.message);
            }).finally(() => {
          loading.value = false;
        });
        emit("submit", data.value);
      }
    }

    onMounted(() => {
    });

    return {
      loading,
      data,
      visibility,
      passwordFieldType,
      visibilityIcon,
      switchVisibility,
      submit,
      form
    }
  }
}
</script>

<style scoped>

</style>