<template>
  <div class="home">
    <Nav :selectHandler="selectHandler" :topLabelList="topLabelList" class="second-header"></Nav>
<!--    <HeadArea :info="titleInfo"></HeadArea>-->
    <MainArea></MainArea>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import HeadArea from "@/components/HeadArea.vue";
import MainArea from "@/components/MainArea.vue";

import bus from "@/utils/emitter";

export default {
  name: 'HomeView',
  components: {
    HeadArea,
    Nav,
    MainArea,
  },
  data(){
    return {
      activeLabel: 0,
      topLabelList: [
        { id: 0, label: '流出量', type: 'out'},
        { id: 1, label: '流入量', type: 'in'},
        { id: 2, label: '流量总和', type: 'all'},
        { id: 3, label: '', type: 'conference'},
      ],
    }
  },
  computed: {
    titleInfo() {
      return {
        type: 'Academic',
        label: this.topLabelList[this.activeLabel].label,
        slogan: 'References Hub',
      }
    },
  },
  methods: {
    selectHandler(index){
      this.activeLabel = index;
      bus.emit('updateMapType', { type: this.type})
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

