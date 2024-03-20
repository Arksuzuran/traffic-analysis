<template>
  <div class="map-container">
    这里是多边形划片地图
    <div id="map"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
// 770a8ac47af75e706643abd052885dbb

export default {
  name: "BikeMap",
  props: [],
  components: {},
  data() {
    return {
      center: [114.341232, 30.567523]
    }
  },
  computed: {},
  methods: {
    initAMap() {
      var map = new AMap.Map('map', {
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
      // var dat = new Loca.Dat();
      // dat.addLayer(pl);
    },
  },
  mounted() {
    this.initAMap();
  },
  unmounted() {
    this.map?.destroy();
  },
}
</script>

<style lang="scss" scoped>
@import "@/style/handle";

#map{
  padding: 0;
  margin: 0;
  width: 1100px;
  height: 800px;
}
/* 隐藏高德logo  */
.amap-logo {
  display: none !important;
}
/* 隐藏高德版权  */
.amap-copyright {
  display: none !important;
}
.map-container {
  margin: 20px;
}
</style>
