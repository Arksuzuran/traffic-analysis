<template>
  <div class="home">
    <Nav :selectHandler="selectHandler" :topLabelList="topLabelList" class="second-header"></Nav>
<!--    <HeadArea :info="titleInfo"></HeadArea>-->
    <MainArea :curComponent="curComponent"></MainArea>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
// import HeadArea from "@/components/HeadArea.vue";
import MainArea from "@/components/MainArea.vue";

import bus from "@/utils/emitter";
import PointCloudMap from "@/components/maps/PointCloudMap.vue";
import LinkMap from "@/components/maps/LinkMap.vue";
import PolygonMap from "@/components/maps/PolygonMap.vue";

export default {
  name: 'HomeView',
  components: {
    // HeadArea,
    Nav,
    MainArea,
  },
  data(){
    return {
      activeLabel: 0,
      topLabelList: [
        { id: 0, label: '单车密度分布', map: 'PointCloudMap'},
        { id: 1, label: '单车调度优化', map: 'LinkMap'},
        { id: 2, label: '电子围栏划片', map: 'PolygonMap'},
      ],
    }
  },
  computed: {
    curComponent() {
      return this.topLabelList[this.activeLabel].map
    }
  },
  methods: {
    selectHandler(index){
      this.activeLabel = index;
      bus.emit('updateMapType', { map: this.topLabelList[this.activeLabel].map})
    }
  },

}
</script>
<style lang="scss" scoped>
@import "@/style/_handle.scss";

.second-header{
  position: sticky;
  top: 0;
  z-index: 11;
}

</style>

