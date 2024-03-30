<template>
	<div class="home">
		<transition-loading :isShow="loadShow" />
		<div class="chart-list">
			<!--			<home-header />-->
			<div style="padding: 0 8px" class="chart-content">
				<!-- 整体布局 左 中 右 -->
				<a-row :gutter="[8, 8]" class="chart-content-row">
					<!-- 左侧 -->
					<a-col v-bind="leftRightCol" class="chart-content-col">
						<a-row class="chart-content-left">
							<a-col class="chart-content-left-item" :span="24">
								<ModuleItem title="PR处理效率" :loading="initLoading">
									<div :ref="reviewEfficient.container" class="chart-container" />
								</ModuleItem>
							</a-col>
							<a-col class="chart-content-left-item" :span="24">
								<ModuleItem title="OpenRank" :loading="initLoading">
									<div :ref="openRankChart.container" class="chart-container"></div>
								</ModuleItem>
							</a-col>
						</a-row>
						<div id="map"></div>
					</a-col>
					<!-- 中间 -->
					<a-col v-bind="centerCol" class="chart-content-col">
						<a-row class="chart-content-center">
							<a-col class="chart-content-center-item" :span="24">
								<ModuleItem :loading="initLoading">
									<div class="index-data">
										<index-num :initData="initData" />
										<radar-list :radarFirst="radarFirst" />
									</div>
								</ModuleItem>
							</a-col>
							<a-col class="chart-content-center-item" :span="24">
								<ModuleItem title="Github指数" :loading="github.loading">
									<div class="virtual-list-content">
										<list-header :titleList="titleList" />
										<new-virtual-list
											:data-source="github.dataSource"
											:loading="github.loading"
											@scroll-end="github.addData"
											class="virtual-list"
										>
											<template #item="{ item }">
												<a-tooltip placement="top" color="rgba(73, 146, 255, 0.8)">
													<template #title>
														<span>项目名：{{ item.name }}</span>
													</template>
													<div class="virtual-list-item" @click="radarFirst.chart.addRadarData(item.name)">
														<span class="virtual-list-item-col">{{ item.name }}</span>
														<span class="virtual-list-item-col">{{ item.influence }}</span>
														<span class="virtual-list-item-col">{{ item.trend }}</span>
														<span class="virtual-list-item-col">{{ item.response }}</span>
														<span class="virtual-list-item-col">{{ item.activity }}</span>
														<span class="virtual-list-item-col">{{ item.github }}</span>
													</div>
												</a-tooltip>
											</template>
										</new-virtual-list>
									</div>
								</ModuleItem>
							</a-col>
						</a-row>
					</a-col>
					<!-- 右侧 -->
					<a-col v-bind="leftRightCol" class="chart-content-col">
						<a-row class="chart-content-right">
							<a-col class="chart-content-right-item" :span="24">
								<ModuleItem title="关注度" :loading="initLoading">
									<div :ref="attentChart.container" class="chart-container"></div>
								</ModuleItem>
							</a-col>
							<a-col class="chart-content-right-item" :span="24">
								<ModuleItem title="开发者活跃度" :loading="initLoading">
									<div :ref="deverChart.container" class="chart-container"></div>
								</ModuleItem>
							</a-col>
							<a-col class="chart-content-right-item" :span="24">
								<ModuleItem title="项目活跃度" :loading="initLoading">
									<div :ref="projectChart.container" class="chart-container"></div>
								</ModuleItem>
							</a-col>
						</a-row>
					</a-col>
				</a-row>
				<!-- 背景地球 -->
				<earth-bg />
			</div>
		</div>
	</div>
	<!-- 弹窗 -->
	<chart-modal
		v-model:visible="chartModalData.visible"
		:type="chartModalData.type"
		:defaultValue="chartModalData.selectValue"
	/>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { debounce } from 'lodash';

import indexImg from '@/assets/images/index-bg.png';
import centerImg from '@/assets/images/center.png';
import headerImg from '@/assets/images/home-header.png';
import mapImg from '@/assets/images/map.png';
import lbxImg from '@/assets/images/lbx.png';
import jtImg from '@/assets/images/jt.png';

import HomeHeader from './components/home-header/index.vue';
import EarthBg from './components/earth-bg/index.vue';
import ChartModal from './components/chart-modal/index.vue';
import ListHeader from './components/list-header/index.vue';
import IndexNum from './components/index-num/index.vue';
import RadarList from './components/radar-list/index.vue';

import useOpenRank from './composables/use-open-rank';
import useReviewEfficient from './composables/use-review-efficient';
import useChartModal from './composables/use-chart-modal';
import useGithub from './composables/use-github';
import useRadar from './composables/use-radar';

import useOptionStore from '@/store/option';
import useInitData from '@/store/initData';

import { titleList, leftRightCol, centerCol } from './config';

import { getInit, getOptions } from './service';

const chartModalData = useChartModal();
const openRankChart = useOpenRank({ showHandler: chartModalData.changeVisible, type: 2 });
const deverChart = useOpenRank({ showHandler: chartModalData.changeVisible, type: 3 });
const attentChart = useOpenRank({ showHandler: chartModalData.changeVisible, type: 4 });
const projectChart = useOpenRank({ showHandler: chartModalData.changeVisible, type: 5 });
const reviewEfficient = useReviewEfficient(chartModalData.changeVisible);
const github = useGithub();
const radarFirst = useRadar();

const optionStore = useOptionStore();
const initDataStore = useInitData();

/**
 * @description 处理全部图表的缩放
 */
const chartResize = debounce(() => {
	openRankChart.chart.resizeChart();
	reviewEfficient.chart.resizeChart();
	radarFirst.chart.resizeChart();
	deverChart.chart.resizeChart();
	attentChart.chart.resizeChart();
	projectChart.chart.resizeChart();
}, 500);

const loadShow = ref<boolean>(true);
const imgCount = 6;
let curCount = 0;
const addImgCount = () => {
	curCount++;
	if (curCount === imgCount) {
		loadShow.value = false;
	}
};

const loadImg = () => {
	const imgArr = [indexImg, centerImg, headerImg, mapImg, lbxImg, jtImg];
	imgArr.forEach(item => {
		const newImage = new Image();
		newImage.src = item;
		newImage.onload = () => {
			addImgCount();
		};
	});
};

const getOptionsData = async () => {
	const res = await getOptions();
	if (res.code === 200) {
		optionStore.option = res.data || [];
	}
};

const initData = reactive({
	openRank: 0,
	gitHub: 0
});

const initLoading = ref<boolean>(false);
const getInitData = async () => {
	initLoading.value = true;
	const res = await getInit();
	if (res.code === 200) {
		nextTick(() => {
			initDataStore.list = res.data.list || [];
			openRankChart.chart.initChart(res.data.list, 'openrank');
			deverChart.chart.initChart(res.data.list, 'developer_activity');
			attentChart.chart.initChart(res.data.list, 'project_attention');
			projectChart.chart.initChart(res.data.list, 'project_activity');
			reviewEfficient.chart.initChart(res.data.list);
			radarFirst.chart.initChart(res.data.list);
		});
		initData.openRank = res.data.other.openrankAverage;
		initData.gitHub = res.data.other.githubAverage;
	}
	initLoading.value = false;
};

let map = null
const initMap = async () => {
	map = new AMap.Map('map', {
		zoom: 11.57,
		center: [114.341232,30.567523],
		// showLabel: false,
		pitch: 45,
		rotation: -163,
		viewMode: '3D',
		showLabel: false,
		mapStyle: 'amap://styles/grey',
	});

	var loca = new Loca.Container({
		map,
	});

	loca.ambLight = {
		intensity: 0.3,
		color: '#fff',
	};
	loca.dirLight = {
		intensity: 1.2,
		color: '#fff',
		target: [0, 1, 0],
		position: [0, -1, 1],
	};
	loca.pointLight = {
		color: 'rgb(100,100,100)',
		position: [114.2517, 30.552128, 20000],
		intensity: 1.6,
		// 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
		distance: 100000,
	};

	var geo = new Loca.GeoJSONSource({
		url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/wh_car.json',
	});

	var ll = new Loca.GridLayer({
		// loca,
		zIndex: 10,
		opacity: 1,
		visible: true,
		zooms: [2, 22],
		acceptLight: true,
		// shinniness: 0,
		// cullface: 'none',
		// depth: true,
		// hasSide: true,
	});

	var colors = ['#FAE200', '#D27E37', '#C53634', '#C12B6E', '#A92E9A', '#67238A', '#211A50', '#18244E'].reverse();
	var heights = [100, 200, 400, 600, 800, 1400, 1800, 4000];
	ll.setSource(geo);
	ll.setStyle({
		unit: 'meter',
		radius:66,
		gap: 0,
		altitude: 100,
		height: function (index, feature) {
			var ranks = feature.coordinates && feature.coordinates.length || 0;
			return ranks < 5 ?
				heights[0] : ranks < 10 ?
					heights[1] : ranks < 20 ?
						heights[2] : ranks < 30 ?
							heights[3] : ranks < 50 ?
								heights[4] : ranks < 80 ?
									heights[5] : ranks < 100 ?
										heights[6] : heights[7];
		},
		topColor: function (index, feature) {
			var ranks = feature.coordinates && feature.coordinates.length || 0;
			return ranks < 5 ?
				colors[0] : ranks < 10 ?
					colors[1] : ranks < 20 ?
						colors[2] : ranks < 30 ?
							colors[3] : ranks < 50 ?
								colors[4] : ranks < 80 ?
									colors[5] : ranks < 100 ?
										colors[6] : colors[7];
		},
		sideTopColor: function (index, feature) {
			var ranks = feature.coordinates && feature.coordinates.length || 0;
			return ranks < 5 ?
				colors[0] : ranks < 10 ?
					colors[1] : ranks < 20 ?
						colors[2] : ranks < 30 ?
							colors[3] : ranks < 50 ?
								colors[4] : ranks < 80 ?
									colors[5] : ranks < 100 ?
										colors[6] : colors[7];
		},
		sideBottomColor: function (index, feature) {
			var ranks = feature.coordinates && feature.coordinates.length || 0;
			return ranks < 5 ?
				colors[0] : ranks < 10 ?
					colors[1] : ranks < 20 ?
						colors[2] : ranks < 30 ?
							colors[3] : ranks < 50 ?
								colors[4] : ranks < 80 ?
									colors[5] : ranks < 100 ?
										colors[6] : colors[7];
		}
	});
	loca.add(ll);

	// 高度升起动画
	map.on('complete', function () {
		setTimeout(function () {
			ll.show(500);
			ll.addAnimate({
				key: 'height',
				value: [0, 1],
				duration: 500,
				easing: 'Linear',
				transform: 500,
				random: true,
				delay: 10000,
			});
		}, 800);
	});
	loca.animate.start();

	// 图例
	var lengend = new Loca.Legend({
		loca: loca,
		title: {
			label: '单车需求量',
			fontColor: 'rgba(255,255,255,0.4)',
			fontSize: '16px',
		},
		style: {
			backgroundColor: 'rgba(255,255,255,0.1)',
			left: '20px',
			bottom: '40px',
			fontSize: '12px',
		},
		dataMap: [
			{ label: 100, color: colors[7] },
			{ label: 80, color: colors[6] },
			{ label: 50, color: colors[5] },
			{ label: 40, color: colors[4] },
			{ label: 30, color: colors[3] },
			{ label: 20, color: colors[2] },
			{ label: 10, color: colors[1] },
			{ label: 5, color: colors[0] },
		],
	});
	// // 控制条
	// var dat = new Loca.Dat();
	// dat.addLight(loca.ambLight, loca, '环境光');
	// dat.addLight(loca.dirLight, loca, '平行光');
	// dat.addLight(loca.pointLight, loca, '点光');
	// dat.addLayer(ll, '车辆图层');
};

onMounted(() => {
	loadImg();
	getOptionsData();
	getInitData();
	github.addData();
	initMap();
	window.addEventListener('resize', chartResize);
});

onBeforeUnmount(() => {
	map?.destroy();
	window.removeEventListener('resize', chartResize);
});
</script>

<style lang="scss" scoped>

.home {
	position: relative;
	width: 100%;
	height: 100%;
	background: url('@/assets/images/index-bg.png') no-repeat;
	background-size: 100% 100%;

  // 地图组件大小
  #map{
    padding: 0;
    margin: 0;
    width: 98%;
    height: 95%;
  }

	.chart-list {
		height: 100%;

		.chart-content {
			height: calc(100% - 77px);
			margin-top: 12px;

			.chart-content-row,
			.chart-content-col {
				height: 100%;
			}

			.chart-container {
				width: 100%;
				height: 100%;
			}

			.virtual-list-content {
				display: flex;
				flex-direction: column;
				height: 98%;
				padding: 0 8px;

				.virtual-list-item {
					display: flex;
					gap: 8px;
					align-items: center;
					padding: 4px;
					color: rgb(255 255 255);
					cursor: pointer;

					&:hover {
						color: #68d8ff;
						background: rgb(255 255 255 / 10%);
					}

					&-col {
						width: 16%;
						overflow: hidden;
						text-align: center;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					&-col:nth-child(1) {
						width: 19.5%;
						text-align: left;
					}
				}
			}

			&-left {
				flex-direction: column;
				row-gap: 8px !important;
				height: 100%;

				&-item:nth-child(1) {
					flex: 2;
				}

				&-item:nth-child(2) {
					flex: 1;
				}
			}

			&-center {
				flex-direction: column;
				row-gap: 8px !important;
				height: 100%;

				&-item:nth-child(1) {
					flex: 2;

					.index-data {
						display: flex;
						flex-direction: column;
						height: 100%;
						margin: 0 16px;
					}
				}

				&-item:nth-child(2) {
					flex: 1;
				}
			}

			&-right {
				flex-direction: column;
				row-gap: 8px !important;
				height: 100%;

				&-item {
					flex: 1;
				}
			}
		}
	}
}

// 小屏幕下的样式
@media (max-width: 576px) {
	.home {
		height: unset;
		background: #060c20;

		.chart-content {
			.chart-content-col:first-child {
				height: 1000px !important;
			}

			&-left,
			&-center {
				&-item {
					flex: 1 !important;
				}
			}

			.chart-content-col:nth-child(2) {
				height: 1500px !important;
			}

			.chart-content-col:nth-child(3) {
				height: 1500px !important;
			}
		}
	}
}
</style>

<style lang="scss">
.ant-tooltip-inner {
	min-height: unset;
}

.tooltip-review {
	// width: 80%;
	overflow: hidden;

	.tooltip-title {
		width: 180px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tooltip-btn {
		width: max-content;
		padding: 2px 5px;
		margin: 5px 5px 0 0;
		color: #ffffff;
		cursor: pointer;
		background-color: #ff6e76;
		border-radius: 4px;
	}

	.tooltip-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.tooltip-label-icon {
		display: flex;
		align-items: center;
		margin-right: 5px;
		overflow: hidden;

		.tooltip-label {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.tooltip-icon {
			width: 6px;
			height: 6px;
			margin-right: 5px;
			border-radius: 50%;
		}
	}

	.tooltip-value {
		flex: 1;
		flex-shrink: 0;
		font-size: 15px;
		font-weight: bold;
		color: #666666;
	}
}
</style>
