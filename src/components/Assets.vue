<!-- preload all SVG into vue components here using svg-to-vue-component for rendering on canvas -->
<template>
  <div id="assets" :class="{ showAssets }">
    <MyShipSVG id="MyShipSVG" />
  </div>
</template>

<script>
  import canvasSvg from '../utils/canvasSvg.js';
  import MyShipSVG from '../../public/assets/svg/ships/myShip.svg';
  import $g from '../utils/globals.js';

  export default {
    components: {
      MyShipSVG
    },
    props: {
      showAssets: {
        type: Boolean,
        default: false, // set to true to debug, should be committed as false
      },
    },
    mounted: function (){
      // processes all the assets
      canvasSvg.init();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #assets {
    position: fixed;
    height: 100%;
    width: 100%;
    top: -1000px;
    left: -1000px;
    z-index: 9999;
    text-align: left;
  }
  #assets.showAssets {
    top: 0;
    left: 0;
  }
  #assets svg {
    height:50px;
    width:50px;
  }
  #assets > div {
    background-color: #070707;
  }
  #assets > div:nth-child(3n+1) {
    background-color: #111111;
  }
  #assets > div:nth-child(3n+2) {
    background-color:black;
  }

</style>
