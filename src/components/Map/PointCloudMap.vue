<template>
  <div class="map-container">
    这里是3D点云图
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
