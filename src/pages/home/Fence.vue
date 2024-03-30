<template>
	<div class="home">
		<transition-loading :isShow="loadShow" />
		<div class="chart-list">
			<!--			<home-header />-->
			<div style="padding: 0 8px" class="chart-content">
				<!-- 整体布局 左 中 右 -->
					<div id="map"></div>
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
        zoom: 14.2,
        viewMode: '3D',
        pitch: 0,
        mapStyle: 'amap://styles/blue',
        center: [117.055098, 36.666299],
        showBuildingBlock: false,
        showLabel: false,
    });

    var loca = (window.loca = new Loca.Container({
        map,
    }));

    loca.ambLight = {
        intensity: 0.3,
        color: '#fff',
    };
    loca.dirLight = {
        intensity: 0.6,
        color: '#fff',
        target: [0, 0, 0],
        position: [0, -1, 1],
    };
    loca.pointLight = {
        color: 'rgb(100,100,100)',
        position: [120.24289, 30.341335, 20000],
        intensity: 3,
        distance: 50000,
    };
    var geo = new Loca.GeoJSONSource({
        url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/jinan_districts.json',
    });

    var colors = [
        '#F7E11F',
        '#FAC200',
        '#FC7A00',
        '#E2191C',
        '#CD1750',
        '#AD0D7F',
        '#7B0CA7',
        '#323076',
        '#1F1E4A',
    ].reverse();
    var height = [1000, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000];
    var pl = new Loca.PolygonLayer({
        zIndex: 120,
        opacity: 1,
        shininess: 1,
    });

    pl.setSource(geo);
    pl.setStyle({
        height: 0,
        topColor: function (index, feature) {
            return colors[index % 9]
        },
        // label配置即AMap.LabelMarker的配置
        label: {
            text: {
                // 每个配置项都可通过回调函数动态配置
                content: (index, feat) => feat.properties.name,
                offset: [0, 10],
                style: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    fillColor: '#F7EB84',
                    strokeColor: '#000',
                    strokeWidth: 2,
                    padding: '2, 5',
                },
            },
        },
        // 通过labelAltitude控制标注相对于图形顶面的海拔高度，单位同altitude配置项，默认为0
        labelAltitude: 0
    });
    pl.setCustomCenter([117.055098, 36.666299]);
    loca.add(pl);

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
