<template>
  <div class="main-container" id="container1">
    <div class="full-screen-bg"></div>
    <component :is="curComponent"></component>
<!--    <router-view></router-view>-->
<!--    <basic-map></basic-map>-->
  </div>
</template>

<script>
import PointCloudMap from "@/components/maps/PointCloudMap.vue";
import LinkMap from "@/components/maps/LinkMap.vue";
import PolygonMap from "@/components/maps/PolygonMap.vue";

export default {
  name: "MainArea",
  props: ['curComponent'],
  components: {
    PointCloudMap,
    LinkMap,
    PolygonMap,
  },
  data() {
    return {
      selectedAnchor:'sidebar1', //默认高亮显示第一个
    }
  },
  methods: {
    scrollToAnchor(anchor) {
      // 获取对应锚点的DOM元素
      const targetElement = document.getElementById(anchor)
      // 如果找到目标元素，则执行滚动
      if (targetElement) {
        // smooth不生效
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
      // this.selectedAnchor = anchor
    },
    getScrollTop() {
      return (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) + 400;
    },
    handleScroll() {
      // 获取所有需要需要锚点定位的DOM元素
      const navContents = document.querySelectorAll('.sidebar')
      const offsetTopArr = []
      navContents.forEach(item => {
        // 获取上面DOM元素距离顶部的距离
        offsetTopArr.push(item.offsetTop)
      })
      // 获取页面滚动了距离
      const scrollTop = this.getScrollTop()
      // const scrollTop = document.getElementById('container1').scrollTop
      let navIndex = 0//需要高亮显示的元素
      for (let n = 0; n < offsetTopArr.length; n++) {
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n
        }
      }
      // 设置高亮显示
      this.selectedAnchor = `sidebar${navIndex + 1}`;
    },
    listenScroll(){
      //经测试不同电脑监听使用的可能不成功，这里可以自行选择一个监听
      //监听当滚动条发生变化时调用handleScroll设置selectedAnchor的值并传给子组件
      window.addEventListener('scroll', this.handleScroll, true)
      // window.addEventListener('onscroll', this.handleScroll, true)
      // window.addEventListener('scroll', this.handleScroll.bind(this), true)
      // this.$el.addEventListener('scroll', this.handleScroll.bind(this))
    }
  },
  computed: {
    sidebarItems(){
      return [
        { anchor: 'sidebar1', label: this.$t('category.header.overview') },
        { anchor: 'sidebar2', label: this.$t('category.header.trends') },
        { anchor: 'sidebar3', label: this.$t('category.header.metrics') },
        { anchor: 'sidebar4', label: this.$t('category.header.relatedHost') },
      ]
    },
  },
  mounted() {
    this.listenScroll()
  },
}
</script>

<style lang="scss" scoped>
@import "@/style/_handle.scss";

.main-container{
  overflow-x: hidden;
  width: 100%;
  height: 140%;
  margin: 0 auto;
  background-color: rgba(250, 250, 250, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  border-radius: 15px;
  //overflow: auto;
  //border: 1px solid rgba(255, 255, 255, 0.8);
  //box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
}
.full-screen-bg {
  background-image: url('@/assets/sami.png');
  z-index:-100;
  width:100%;
  height:100%;
  position: fixed;
  top:0;
}
</style>
