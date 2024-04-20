<template>
    <div class="loader"></div>
</template>

<script setup lang="ts">

</script>

<style scoped>

/* HTML: <div class="loader"></div> */
.loader {
  --s: 25px;
  --_d: calc(0.353*var(--s));
  
  height: calc(var(--s) + var(--_d));
  aspect-ratio: 1;
  display: grid;
}
.loader:before {
  content: "";
  height: 100%;
  margin: auto 0;
  clip-path: polygon(var(--_d) 0,100% 0,100% calc(100% - var(--_d)),calc(100% - var(--_d)) 100%,0 100%,0 var(--_d));
  background:
    conic-gradient(from -90deg at var(--s) var(--_d),
     #fff 135deg,#666 0 270deg,#aaa 0);
  animation: l3 .8s infinite alternate;
}
@keyframes l3{
  100% {height:40%}
}
</style>