<template>
  <div class="head-container">
    <!--  粒子效果背景  -->
    <div class="head-background">
      <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options="options" />
    </div>
    <div class="info-container">
      <div class="info-category"> Trafformer </div>
      <div class="info-name"> {{ info.label }} </div>
      <div class="info-slogan"> Research and Practice </div>
    </div>
    <div class="search-bar-container">
    </div>
  </div>
</template>

<script>
import { loadFull } from "tsparticles";
import { pclOption } from '@/settings/particles/circle'

export default {
  name: 'HeadArea',
  props: ['info', 'host'],
  components: {
  },
  data(){
    return{

    }
  },
  computed:{
    options(){
      return pclOption
    },
  },
  methods: {
    async particlesInit(engine) {
      await loadFull(engine);
    },
    async particlesLoaded(container) {
      console.log("[粒子效果引擎] Particles container loaded", container)
    },
  },
  mounted() {
    // console.log(this.$i18n.locale)
  }
}

</script>

<style lang="scss" scoped>
@import "@/style/_handle.scss";

.head-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 270px;
  padding: 10px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 阴影效果，可选 */
  position: relative;
  overflow: hidden;
  //flex-wrap: nowrap; /* 禁止换行 */
  //background-color: rgba(234, 162, 90, 0.5);
}

.head-background{
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(234, 233, 232, 0.5);
  opacity: 0.4;
  //filter: blur(1px);
  background-size: cover;
  background-position: center center;
  z-index: -10;
}
#tsparticles {
  overflow: hidden;
  //position: absolute;
  width: 100%;
  height: 270px;
  //background-color: #323031;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

.info-container {
  flex: 1;
  margin-right: 20px;
  text-align: left;
  padding-left: 10%;
}

.info-category{
  font-size: 32px;
  font-weight: 600;
  margin: 0 10px;
  text-shadow: 2px 2px 2px 2px white;
  @include color("main_color3");
}

.info-name{
  margin: 2px 10px;
  font-size: 44px;
  font-weight: 800;
  //text-shadow: 0 0 1px #808080;
  text-shadow: 0 1px 1px white;
  //white-space: nowrap;      /* 禁止换行 */
  overflow: hidden;         /* 隐藏溢出部分 */
  text-overflow: ellipsis;  /* 显示省略号 */
  display: inline-block;    /* 使省略号生效在行内元素上 */
  max-width: 800px;
  max-height: 190px;
  @include color("border_style2");
}

.info-slogan{
  margin: 0 10px;
  font-size: 18px;
  font-weight: 700;
  @include color("border_style2");
}

.search-bar-container {
  flex: 1;
}
</style>
