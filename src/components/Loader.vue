<template>
  <div id="loader" class="h-screen">
    <div id="arc"></div>
    <p>Loading</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    color: {
      type: String,
      required: false,
      default: '#000000',
    },
  },
};
</script>

<style scoped>
#loader {
  font-size: 11px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
}
#arc {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border-top: 3px solid gray;
  border-bottom: 3px solid #D3d3d3;
  border-right: 3px solid #D3D3D3;
  border-left: 3px solid #D3D3D3;
  position: absolute;
  z-index: 300;
  /* top: calc(50% - 30px);
  left: calc(50% - 30px); */
  animation-name: load;
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes load {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
