<template>
  <v-container>
    <div class="text__center">
      <h1>403</h1>
      <h2>Access Denied</h2>
    </div>
  </v-container>
</template>
<style lang="scss" scoped>
.text__center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 5cm;
    // background-image: url(../../assets/wave.png);
    // color: rgba(255, 255, 255, 0.1);
    // background-size: 250px 250px;
    // background-repeat: repeat-x;
    // background-clip: text;
    // animation: animateWave 10s linear infinite;
  }
  h2 {
    text-align: center;
    text-transform: uppercase;
    font-size: 2cm;
  }
//   @keyframes animateWave {
//     0% {
//       background-position: 0 bottom;
//     }
//     40% {
//       background-position: 400px top;
//     }
//     80% {
//       background-position: 800px top;
//     }
//     100% {
//       background-position: 1200 bottom;
//     }
//   }
}
</style>