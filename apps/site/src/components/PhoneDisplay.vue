<template>
  <div class="base">
    <div class="phone will-change-transform transform-none md:transform-cpu"></div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      colors: {
        backdrop: "#262626",
        nav: "#171717",
        txt: "#ffffff",
        card: "#404040",
        progress: "#10b981",
        delete: "#dc2626"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.base {
  width: 200px;
  height: 300px;
  margin: 40px;
}

.phone {
  width: 100%;
  height: 100%;
  background: url("../assets/phone.webp");
  background-size: contain;
  background-repeat: no-repeat;
  /* perspective function in transform property */
  transform-style: preserve-3d;

  @media (min-width: 768px) {
    transform: rotateX(30deg) rotateY(20deg);
  }
}
</style>
