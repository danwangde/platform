<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "./style/element-ui.css";
@import "./style/scroll.css";
@import "./style/reset.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #00233e;
  /*text-align: center;*/
  color: #2c3e50;
 /* position: relative;
  height:969px;
  background-color: #fff;*/
}
.icon {

      width: 1em;
      height: 1em;
      font-size: 18px;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;

}
</style>
