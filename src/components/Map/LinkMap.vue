<template>
  <div class="map-container">
    这里是3D连线地图
    <div id="map"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
// 770a8ac47af75e706643abd052885dbb

export default {
  name: "LinkMap",
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
        zoom: 5.29,
        // showLabel: false,
        viewMode: '3D',
        pitch: 48,
        center: [104.780269, 34.955403],
        mapStyle: 'amap://styles/blue',
      });

      var loca = new Loca.Container({
        map,
      });

      // 呼吸点
      var scatter = new Loca.ScatterLayer({
        loca,
        zIndex: 10,
        opacity: 0.6,
        visible: true,
        zooms: [2, 22],
      });

      var pointGeo = new Loca.GeoJSONSource({
        url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/pulselink-china-city-point.json',
      });
      scatter.setSource(pointGeo);
      scatter.setStyle({
        unit: 'meter',
        size: [100000, 100000],
        borderWidth: 0,
        texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
        duration: 2000,
        animate: true,
      });
      loca.add(scatter);

      // 弧线
      var pulseLink = new Loca.PulseLinkLayer({
        // loca,
        zIndex: 10,
        opacity: 1,
        visible: true,
        zooms: [2, 22],
        depth: true,
      });

      var geo = new Loca.GeoJSONSource({
        url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-out.json',
      });

      pulseLink.setSource(geo);
      pulseLink.setStyle({
        unit: 'meter',
        dash: [40000, 0, 40000, 0],
        lineWidth: function () {
          return [20000, 1000];
        },
        height: function (index, feat) {
          return feat.distance / 3 + 10;
        },
        // altitude: 1000,
        smoothSteps: 30,
        speed: function (index, prop) {
          return 1000 + Math.random() * 200000;
        },
        flowLength: 100000,
        lineColors: function (index, feat) {
          return ['rgb(255,228,105)', 'rgb(255,164,105)', 'rgba(1, 34, 249,1)'];
        },
        maxHeightScale: 0.3, // 弧顶位置比例
        headColor: 'rgba(255, 255, 0, 1)',
        trailColor: 'rgba(255, 255,0,0)',
      });
      loca.add(pulseLink);
      loca.animate.start();


      // 点击事件处理
      var clickInfo = new AMap.Marker({
        anchor: 'bottom-center',
        position: [116.396923, 39.918203, 0],
      });
      clickInfo.setMap(map);
      clickInfo.hide();
      map.on("click", function (e) {
        var feat = pulseLink.queryFeature(e.pixel.toArray());

        if (feat) {
          clickInfo.show();
          var props = feat.properties;
          clickInfo.setPosition(feat.coordinates[1]);
          clickInfo.setContent(
              '<div style="text-align: center; height: 20px; width: 150px; color:#fff; font-size: 14px;">' +
              '速率: ' + feat.properties['ratio'] +
              '</div>'
          );
        } else {
          clickInfo.hide();
        }
      });

      // var dat = new Loca.Dat();
      // dat.addLayer(pulseLink);
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
