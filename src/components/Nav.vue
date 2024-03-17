<template>
  <div class="main-container">
    <!-- 顶部二级导航栏 -->
    <div class="category-home-header-container">
      <div class="category-home-header-title"> 共享单车流量分析模型 </div>
      <!-- 按钮组 -->
      <div v-for="label in topLabelList" :key="label.id" class="category-home-header-btn"
           :class="getActiveButtonClass(label.id)" @click="handleSelect1(label.id)">
        {{ label.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondHeader",
  props: ['selectHandler', 'topLabelList'],
  components: {},
  data() {
    return {
      // 顶部筛选标签
      activeTopLabel: 0,
    }
  },
  methods: {
    // 处理顶部标签选择事件 当前选中的是哪个标签
    handleSelect1(index) {
      console.log('用户点击顶部导航栏标签', this.topLabelList[index].label)
      // 如果重复选择某个标签 那么视为取消选中 则默认退回到“精选”标签下
      if (this.activeTopLabel === index) {
        this.activeTopLabel = 0
      }
      // 选择不重复的标签
      else {
        this.activeTopLabel = index
      }
      this.selectHandler(this.activeTopLabel)
    },
    // 更新被选中标签的属性
    getActiveButtonClass(index) {
      if (this.activeTopLabel === index) {
        return 'category-home-header-btn-active'
      }
      return ''
    },
  },
  computed: {

  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
@import "@/style/_handle.scss";

.main-container {

}
/* 顶部二级导航栏容器 */
.category-home-header-container {
  padding: 0 6%;
  height: 70px;

  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;

  @include background-color("cate_card_bk_color3");
}

/* 页面顶栏处标题 */
.category-home-header-title {
  margin: 0 40px;
  font-size: 30px;
  font-weight: 700;
  color: rgba(255, 133, 133, 0.9);
}

/* 顶栏 筛选器 组件 */
/* === removing default button style ===*/
/* === removing default button style ===*/
/* 按钮基本样式 */
.category-home-header-btn {
  margin: 0 8px;

  font-size: 16px;
  background: transparent;
  border: none;
  padding: 8px 12px;
  color: rgba(255, 133, 133, 0.9);
  //text-transform: uppercase;
  position: relative;
  transition: .5s ease;
  cursor: pointer;
}

.category-home-header-btn::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: rgba(255, 66, 66, 0.9);
  transition: .3s ease;
}

.category-home-header-btn:hover,
.category-home-header-btn.category-home-header-btn-active {
  color: #ffffff;
  transition-delay: .5s;
}

.category-home-header-btn-active {
  border-radius: 10px;
  transition: .3s ease;
  background-color: rgb(255, 97, 97);
}

.category-home-header-btn:hover::before,
.category-home-header-btn.category-home-header-btn-active::before {
  width: 100%;
}

.category-home-header-btn::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  border-radius: 10px;
  //@include background-color("main-color3");
  background-color: rgb(86, 14, 2);
  transition: .4s ease;
  z-index: -1;
}

.category-home-header-btn:hover::after,
.category-home-header-btn.category-home-header-btn-active::after {
  height: 100%;
  transition-delay: 0.4s;
  //color: aliceblue;
}
</style>
