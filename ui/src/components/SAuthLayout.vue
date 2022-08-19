<template>
  <q-layout view="lHh Lpr fff">
    <q-page class="bg-primary window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <div style="width: 400px">
            <div class="text-h3 text-white q-mb-lg text-center">{{ appName }}</div>
            <slot/>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import SLogin from "./SLogin";

export default {
  name: "SAuthLayout",
  components: {SLogin},
  props: {
    appName: {
      type: String,
      default: "Quasar App"
    }
  }
}
</script>

<style scoped>

</style>