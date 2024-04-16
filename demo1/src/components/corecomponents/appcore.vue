<template>
  <canvas ref="webglRef"> </canvas>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import AppCore from "./appcore";

const webglRef = ref<HTMLCanvasElement | null>(null);

let appCore: AppCore;

function windowResize() {
  appCore.engine.resize();
}

onMounted(() => {
  if (webglRef.value) {
    appCore = new AppCore(webglRef.value);
    window.addEventListener("resize", windowResize);
  }
});
onUnmounted(() => {
  window.removeEventListener("resize", windowResize);
});
</script>
