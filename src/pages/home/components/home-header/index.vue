<template>
	<div class="home-header">
    <!-- 头部选择栏-->
    <div class="category-home-header-container">
      <!-- 按钮组 -->
      <div v-for="label in topLabelList" :key="label.id" class="category-home-header-btn"
           :class="getActiveButtonClass(label.id)" @click="handleSelect1(label.id)">
        {{ label.label }}
      </div>
    </div>
		<div class="home-header-title">共享单车调度分析系统</div>
		<div class="home-header-time">
			<span class="date-value">{{ date }}</span>
			<span class="time-value">{{ time }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue';
import { useRouter } from 'vue-router';
import Index from "@/pages/home/index.vue";

let timer: any = null;
const router = useRouter();
const time = ref<string>('--');
const date = ref<string>('--');

// 顶部筛选标签
let activeTopLabel = ref(0);
let topLabelList = reactive([
  { id: 0, label: '流入量', name: 'flowData', type: 'in'},
  { id: 1, label: '流出量', name: 'flowData', type: 'out'},
  { id: 2, label: '净变化', name: 'flowData', type: 'pure'},
  { id: 3, label: '累计变化', name: 'flowData', type: 'all'},
  { id: 4, label: '电子围栏', name: 'fence'},
  { id: 5, label: '运营区划分', name: 'opArea'},
  { id: 6, label: 'OD分析', name: 'OD'},
  { id: 7, label: '运输规划', name: 'plan'},
]);

const jumpToPath = (index) => {
  const label = topLabelList[index]
  if (label.type) {
    router.push({
      name: label.name,
      query: {
        type: label.type
      }
    });
  } else {
    router.push({
      name: label.name,
    });
  }
};

// 处理顶部标签选择事件 当前选中的是哪个标签
const handleSelect1 = (index) => {
  console.log('用户点击顶部导航栏标签', topLabelList[index])
  // 选择不重复的标签
  if (activeTopLabel.value != index) {
    activeTopLabel.value = index
    jumpToPath(index)
  }
};

// 更新被选中标签的属性
const getActiveButtonClass = (index) => {
  if (activeTopLabel.value === index) {
    return 'category-home-header-btn-active'
  }
  return ''
};

// 根据路径决定导航栏的显示
const updateLabelByRoute = () => {
  const { path, query } = router.currentRoute.value;
  if (path == '/home') {
    activeTopLabel.value = 0;
    if(query.type == 'out') {
      activeTopLabel.value = 1;
    }
    else if(query.type == 'pure') {
      activeTopLabel.value = 2;
    }
    else if(query.type == 'all') {
      activeTopLabel.value = 3;
    }
  }
  else if (path == '/home/fence') {
    activeTopLabel.value = 4;
  }
  else if (path == '/home/opArea') {
    activeTopLabel.value = 5;
  }
  else if (path == '/home/OD') {
    activeTopLabel.value = 6;
  }
  else if (path == '/home/plan') {
    activeTopLabel.value = 7;
  }
};

const getTime = () => {
  time.value = dayjs().format('dddd HH:mm:ss');
  date.value = dayjs().format('YYYY/MM/DD');
};

onMounted(() => {
	getTime();
	timer = setInterval(() => {
		getTime();
	}, 1000);
  updateLabelByRoute()
});

onBeforeUnmount(() => {
	clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.home-header {
	position: relative;
	height: 125px;
	padding-top: 3px;
	text-align: center;
	background: url('@/assets/images/home-header.png') no-repeat;
	background-size: 100% 100%;

	&-title {
    margin-top: 8px;
		font-size: 26px;
		font-weight: bold;
		color: #ffffff;
		// text-shadow: 0 0 0.5rem #0a54ea;
	}

	&-time {
		font-size: 18px;
		color: rgb(255 255 255 / 70%);

		.time-value {
			position: absolute;
			top: 45px;
			right: 30px;
		}

		.date-value {
			position: absolute;
			top: 45px;
			right: 170px;
		}
	}

  /* 顶部二级导航栏容器 */
  .category-home-header-container {
    //padding: 0 5%;
    //height: 70px;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background-color: rgba(133, 153, 255, 0.1);

    //@include background-color("cate_card_bk_color3");
  }

  /* 页面顶栏处标题 */
  .category-home-header-title {
    //margin: 0 40px;
    font-size: 30px;
    font-weight: 700;
    color: rgba(133, 233, 255, 0.9);
  }

  /* 顶栏 筛选器 组件 */
  /* === removing default button style ===*/
  /* === removing default button style ===*/
  /* 按钮基本样式 */
  .category-home-header-btn {
    margin: 0 18px;
    font-size: 16px;
    background: transparent;
    border: none;
    padding: 8px 12px;
    color: rgba(133, 227, 255, 0.9);
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
    background-color: rgba(66, 120, 255, 0.9);
    transition: .3s ease;
  }

  .category-home-header-btn:hover,
  .category-home-header-btn.category-home-header-btn-active {
    color: #ffffff;
    transition-delay: .5s;
  }

  .category-home-header-btn-active {
    font-weight: 700;
    border-radius: 10px;
    transition: .3s ease;
    background-color: rgba(74, 78, 246, 0.9);
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
    background-color: rgb(8, 2, 86);
    transition: .4s ease;
    z-index: -1;
  }

  .category-home-header-btn:hover::after,
  .category-home-header-btn.category-home-header-btn-active::after {
    height: 100%;
    transition-delay: 0.4s;
    //color: aliceblue;
  }
}

@media (max-width: 600px) {
	.home-header {
		height: 70px;

		&-time {
			font-size: 24px;

			.date-value {
				position: absolute;
				top: 30px;
				right: unset;
				left: 70px;
			}
		}
	}
}

@media (max-width: 450px) {
	.home-header {
		height: 80px;
		padding-top: 4px;
	}
}
</style>
